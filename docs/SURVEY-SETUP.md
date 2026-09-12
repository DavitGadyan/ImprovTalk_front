# Survey storage — setup

Ten minutes, once. The survey renders and returns a result without any of this;
only the write is skipped until it is done.

## 1. Create the project

[supabase.com](https://supabase.com) → New project. Free tier. Pick a region near
most of your traffic — GA4 says Armenia and Europe today, so `eu-central` is the
sensible default.

## 2. Create the table and lock it down

SQL Editor → New query → paste and run. **Use
[`survey-setup.sql`](survey-setup.sql)** rather than the block below — it is the
same schema, made idempotent, with `pgcrypto` created before its first use and
`search_path = public, extensions` on the definer functions so `digest()`
resolves wherever Supabase put the extension. The block below is kept because it
is what the running project was built from:

```sql
create table public.survey_responses (
  id              uuid primary key default gen_random_uuid(),
  submitted_at    timestamptz not null default now(),
  version         int  not null default 3,

  goal            text not null,
  goal_other      text,
  -- One of the fifteen ids in content/survey.ts, or null if they skipped it.
  persona         text,
  blend           jsonb not null,

  age_band        text,
  gender          text,
  country         text,

  wanted_feature  text,
  expectation     text,

  variant         text,
  utm_content     text,
  -- One of PRICE_BANDS' slugs in content/survey.ts, or null if skipped.
  willingness_to_pay text
);

-- One-way hash of the submitter's address. Never the address itself, and
-- computed inside Postgres so the browser neither sees nor sends it.
alter table public.survey_responses add column ip_hash text;
create index on public.survey_responses (ip_hash);

alter table public.survey_responses enable row level security;

-- The anon key ships in the browser. With the two functions below it does not
-- need table access at all, so there is no policy of any kind: no insert, no
-- select, no update, no delete. Everything goes through security-definer RPCs.

-- The salt. Not readable by anon; only the definer functions see it.
create table if not exists private_config (k text primary key, v text not null);
alter table private_config enable row level security;
insert into private_config (k, v)
  values ('ip_salt', encode(gen_random_bytes(32), 'hex'))
  on conflict (k) do nothing;

create extension if not exists pgcrypto;

create or replace function ip_fingerprint() returns text
language sql security definer stable set search_path = public as $$
  select encode(digest(
    coalesce(
      split_part(current_setting('request.headers', true)::json->>'x-forwarded-for', ',', 1),
      'unknown'
    ) || (select v from private_config where k = 'ip_salt'),
    'sha256'), 'hex');
$$;

-- Insert. Takes the whole payload as one object so the column list lives in
-- one place, and stamps the fingerprint server-side.
create or replace function survey_submit(payload jsonb) returns void
language plpgsql security definer set search_path = public as $$
begin
  insert into survey_responses (
    version, goal, goal_other, persona, blend,
    age_band, gender, country, wanted_feature, expectation,
    variant, utm_content, willingness_to_pay, ip_hash
  ) values (
    coalesce((payload->>'version')::int, 3),
    payload->>'goal', payload->>'goal_other', payload->>'persona',
    payload->'blend',
    payload->>'age_band', payload->>'gender', payload->>'country',
    payload->>'wanted_feature', payload->>'expectation',
    payload->>'variant', payload->>'utm_content',
    payload->>'willingness_to_pay',
    ip_fingerprint()
  );
end;
$$;

-- Returns a boolean and nothing else. No row is ever exposed.
create or replace function survey_already_submitted() returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from survey_responses where ip_hash = ip_fingerprint());
$$;

revoke all on function survey_submit(jsonb) from public;
revoke all on function survey_already_submitted() from public;
grant execute on function survey_submit(jsonb) to anon;
grant execute on function survey_already_submitted() to anon;

-- Keep the free text from being used as storage by someone with the key.
alter table public.survey_responses
  add constraint wanted_feature_len check (char_length(wanted_feature) <= 2000),
  add constraint expectation_len    check (char_length(expectation)    <= 2000),
  add constraint goal_other_len     check (char_length(goal_other)     <=  200),
  add constraint persona_len        check (char_length(persona)        <=   60),
  add constraint willingness_to_pay_len check (char_length(willingness_to_pay) <= 40);
```

**Already ran an earlier version?** The v3 survey sends one new key. Run this
once, then re-run the `create or replace function survey_submit` block above —
the RPC silently ignores keys it does not insert, so skipping this loses the
answer with no error:

```sql
alter table public.survey_responses add column if not exists willingness_to_pay text;
```

## 3. Verify the lock, before shipping

**This is the step that matters.** If SELECT succeeds, the key you just published
reads every respondent's answers.

Settings → API → copy the **anon / public** key, then in a terminal:

```bash
URL="https://YOUR-PROJECT.supabase.co"
ANON="your-anon-key"
H=(-H "apikey: $ANON" -H "Authorization: Bearer $ANON" -H "Content-Type: application/json")

# 1. Insert through the function. Should return 204.
curl -s -o /dev/null -w "submit: %{http_code}\n" -X POST "$URL/rest/v1/rpc/survey_submit" \
  "${H[@]}" -d '{"payload":{"goal":"shyness","blend":{"red":25,"blue":25,"yellow":25,"green":25}}}'

# 2. The address check. Should now return true, from the same machine.
curl -s -X POST "$URL/rest/v1/rpc/survey_already_submitted" "${H[@]}" -d '{}'; echo

# 3. The table itself must stay shut. Expect `[]` — NOT your row.
curl -s "$URL/rest/v1/survey_responses?select=*" "${H[@]}"; echo

# 4. And the salt must be unreachable. Expect `[]` — NOT the salt.
curl -s "$URL/rest/v1/private_config?select=*" "${H[@]}"; echo
```

`submit: 204`, `true`, and **an empty array from both reads** is correct.

**Read the body, not the status code.** These tables have RLS enabled with no
policies at all, and the browser key is the `anon` role. PostgREST does not
reject that with 401 — it runs the query, RLS filters every row out, and it
returns **`200 []`**. So a 200 proves nothing on its own:

| Response | Meaning |
|---|---|
| `200 []` | Correct. RLS is doing its job. |
| `200 [{…}]` | **Critical.** The key you published reads your data. Stop. |
| `401` / `404` | Also fine — not exposed, or not created yet. |

An earlier version of this document told you to expect 401 or 404 here. That is
wrong for this design and reports a false alarm on a correctly locked table.

`private_config` is the decisive one, because it always holds exactly one row
(`ip_salt`) — so an empty array there can only mean RLS blocked the read.
`survey_responses` may be legitimately empty, which makes `[]` ambiguous until
you have inserted a test row and tried to read it back in the same run.

`scripts/verify-survey.sh` does all four checks and judges them on the body:

```bash
./scripts/verify-survey.sh --write    # insert a row, then try to read it back
```

If step 3 returns your row, the key you just published reads every respondent's
answers — stop and remove the select policy. If step 4 returns the salt, the
fingerprints are reversible: an IPv4 space is small enough to brute-force
against a known salt in minutes.

Delete the test row from the table editor afterwards.

## 4. Give the site the keys

Both are `NEXT_PUBLIC_*` and inlined at build time, so they must exist wherever
the build runs.

Locally, `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

In CI, add both as repository secrets and pass them to the build step in
`.github/workflows/deploy.yml`.

**Never put the `service_role` key anywhere.** It bypasses RLS entirely. It is
not needed for any of this.

## 5. Reading the answers

Table editor → `survey_responses`. Sort, filter, and **Export CSV** from the
toolbar. For the questions actually worth asking:

```sql
-- Which of the fifteen personas actually turn up, and in what numbers?
select goal, persona, count(*)
from survey_responses group by 1,2 order by 3 desc;

-- Which goal, and how does the colour blend differ inside it?
select goal, count(*),
       round(avg((blend->>'red')::int))    as red,
       round(avg((blend->>'blue')::int))   as blue,
       round(avg((blend->>'yellow')::int)) as yellow,
       round(avg((blend->>'green')::int))  as green
from survey_responses group by goal order by count desc;

-- What would people pay for Max, and does the answer differ by goal?
select willingness_to_pay, goal, count(*)
from survey_responses
where willingness_to_pay is not null
group by 1,2 order by 3 desc;

-- Which video sent the people who finished the survey?
select utm_content, goal, count(*)
from survey_responses
where utm_content is not null
group by 1,2 order by 3 desc;

-- The free text is the most valuable column. Read it, do not aggregate it.
select submitted_at, goal, wanted_feature, expectation
from survey_responses order by submitted_at desc limit 50;
```

That last one is where persona sixteen comes from.

## Retention

Nothing deletes these rows automatically. `/privacy/` promises deletion on
request, so when someone asks, find them by `submitted_at` and the free text they
quote — there is no email address and no identifier to look them up by, which is
deliberate. If you would rather not hold them indefinitely, add a scheduled job:

```sql
delete from survey_responses where submitted_at < now() - interval '24 months';
```

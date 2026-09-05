# Survey storage — setup

Ten minutes, once. The survey renders and returns a result without any of this;
only the write is skipped until it is done.

## 1. Create the project

[supabase.com](https://supabase.com) → New project. Free tier. Pick a region near
most of your traffic — GA4 says Armenia and Europe today, so `eu-central` is the
sensible default.

## 2. Create the table and lock it down

SQL Editor → New query → paste and run:

```sql
create table public.survey_responses (
  id              uuid primary key default gen_random_uuid(),
  submitted_at    timestamptz not null default now(),
  version         int  not null default 2,

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
  utm_content     text
);

alter table public.survey_responses enable row level security;

-- The anon key ships in the browser. It may add a row and do nothing else:
-- no select, no update, no delete. There is deliberately no select policy.
create policy "anon can insert only"
  on public.survey_responses
  for insert
  to anon
  with check (true);

-- Keep the free text from being used as storage by someone with the key.
alter table public.survey_responses
  add constraint wanted_feature_len check (char_length(wanted_feature) <= 2000),
  add constraint expectation_len    check (char_length(expectation)    <= 2000),
  add constraint goal_other_len     check (char_length(goal_other)     <=  200),
  add constraint persona_len        check (char_length(persona)        <=   60);
```

## 3. Verify the lock, before shipping

**This is the step that matters.** If SELECT succeeds, the key you just published
reads every respondent's answers.

Settings → API → copy the **anon / public** key, then in a terminal:

```bash
URL="https://YOUR-PROJECT.supabase.co"
ANON="your-anon-key"

# Should return 201
curl -s -o /dev/null -w "insert: %{http_code}\n" -X POST "$URL/rest/v1/survey_responses" \
  -H "apikey: $ANON" -H "Authorization: Bearer $ANON" \
  -H "Content-Type: application/json" -H "Prefer: return=minimal" \
  -d '{"goal":"shyness","blend":{"red":25,"blue":25,"yellow":25,"green":25}}'

# Should return 200 with an EMPTY array — not your row
curl -s "$URL/rest/v1/survey_responses?select=*" \
  -H "apikey: $ANON" -H "Authorization: Bearer $ANON"
```

`insert: 201` and `[]` is correct. **If the second command returns your row, stop
and fix the policy** — there should be no `for select` policy on this table.

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

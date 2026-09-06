-- ImprovTalk survey storage — paste this whole file into
-- Supabase → SQL Editor → New query → Run.
--
-- This is the SQL from docs/SURVEY-SETUP.md step 2, with two ordering/scope
-- fixes marked [FIX] below. Safe to re-run: every statement is idempotent
-- except the constraints at the end, which are guarded.

-- ---------------------------------------------------------------- [FIX 1] --
-- pgcrypto must exist BEFORE gen_random_bytes() and digest() are called.
-- The doc's version created it after its first use. On Supabase it is normally
-- pre-installed in the `extensions` schema, so this is usually a no-op — but
-- when it is not, the private_config insert below fails with
-- "function gen_random_bytes(integer) does not exist".
create extension if not exists pgcrypto with schema extensions;

-- ------------------------------------------------------------------ table --
create table if not exists public.survey_responses (
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
  utm_content     text,

  -- One-way hash of the submitter's address. Never the address itself, and
  -- computed inside Postgres so the browser neither sees nor sends it.
  ip_hash         text
);

create index if not exists survey_responses_ip_hash_idx
  on public.survey_responses (ip_hash);

alter table public.survey_responses enable row level security;

-- The publishable/anon key ships in the browser. With the two functions below
-- it needs no table access at all, so there is NO policy of any kind: no
-- insert, no select, no update, no delete. Everything goes through
-- security-definer RPCs.

-- ------------------------------------------------------------------- salt --
create table if not exists public.private_config (
  k text primary key,
  v text not null
);
alter table public.private_config enable row level security;

insert into public.private_config (k, v)
  values ('ip_salt', encode(extensions.gen_random_bytes(32), 'hex'))
  on conflict (k) do nothing;

-- -------------------------------------------------------------- functions --
-- [FIX 2] search_path is `public, extensions`, not `public`.
-- pgcrypto's digest() lives in the `extensions` schema on Supabase. With
-- `set search_path = public` the function cannot see it and every call fails
-- with "function digest(text, unknown) does not exist" — which surfaces as a
-- 404/500 on the RPC and looks exactly like the function not existing.
create or replace function public.ip_fingerprint() returns text
language sql security definer stable set search_path = public, extensions as $$
  select encode(digest(
    coalesce(
      split_part(current_setting('request.headers', true)::json->>'x-forwarded-for', ',', 1),
      'unknown'
    ) || (select v from private_config where k = 'ip_salt'),
    'sha256'), 'hex');
$$;

-- Insert. Takes the whole payload as one object so the column list lives in
-- one place, and stamps the fingerprint server-side.
create or replace function public.survey_submit(payload jsonb) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  insert into survey_responses (
    version, goal, goal_other, persona, blend,
    age_band, gender, country, wanted_feature, expectation,
    variant, utm_content, ip_hash
  ) values (
    coalesce((payload->>'version')::int, 2),
    payload->>'goal', payload->>'goal_other', payload->>'persona',
    payload->'blend',
    payload->>'age_band', payload->>'gender', payload->>'country',
    payload->>'wanted_feature', payload->>'expectation',
    payload->>'variant', payload->>'utm_content',
    ip_fingerprint()
  );
end;
$$;

-- Returns a boolean and nothing else. No row is ever exposed.
create or replace function public.survey_already_submitted() returns boolean
language sql security definer stable set search_path = public, extensions as $$
  select exists (select 1 from survey_responses where ip_hash = ip_fingerprint());
$$;

-- ------------------------------------------------------------------ grants --
revoke all on function public.survey_submit(jsonb) from public;
revoke all on function public.survey_already_submitted() from public;
revoke all on function public.ip_fingerprint() from public;
grant execute on function public.survey_submit(jsonb) to anon;
grant execute on function public.survey_already_submitted() to anon;

-- ------------------------------------------------------------- constraints --
-- Keeps the free text from being used as storage by someone with the key.
do $$
begin
  alter table public.survey_responses
    add constraint wanted_feature_len check (char_length(wanted_feature) <= 2000);
exception when duplicate_object then null; end $$;
do $$
begin
  alter table public.survey_responses
    add constraint expectation_len check (char_length(expectation) <= 2000);
exception when duplicate_object then null; end $$;
do $$
begin
  alter table public.survey_responses
    add constraint goal_other_len check (char_length(goal_other) <= 200);
exception when duplicate_object then null; end $$;
do $$
begin
  alter table public.survey_responses
    add constraint persona_len check (char_length(persona) <= 60);
exception when duplicate_object then null; end $$;

#!/usr/bin/env bash
# Verify the survey storage is set up AND locked down.
#
#   ./scripts/verify-survey.sh            # read-only checks
#   ./scripts/verify-survey.sh --write    # also inserts a row and tries to read it back
#
# Reads credentials from .env.local. Run from the repo root.
#
# WHAT COUNTS AS LOCKED DOWN
# --------------------------
# The tables have RLS enabled and NO policies, and the browser key is `anon`.
# PostgREST does not reject that with 401 — it runs the query, RLS filters every
# row out, and it returns 200 with an empty array. So the status code proves
# nothing; only the BODY does. An earlier version of this script (and step 3 of
# docs/SURVEY-SETUP.md) checked for 401/404 and reported a false alarm on 200.
#
#   200 []                -> correct. RLS is doing its job.
#   200 [{...rows...}]    -> CRITICAL. The published key reads your data.
#   401 / 404             -> also fine (table not exposed / not created).
set -uo pipefail

cd "$(dirname "$0")/.." || exit 1
[ -f .env.local ] || { echo "no .env.local"; exit 1; }
set -a; . ./.env.local; set +a

URL="${NEXT_PUBLIC_SUPABASE_URL:-}"
KEY="${NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:-${NEXT_PUBLIC_SUPABASE_ANON_KEY:-}}"
[ -n "$URL" ] && [ -n "$KEY" ] || { echo "URL or key missing from .env.local"; exit 1; }

H=(-H "apikey: $KEY" -H "Authorization: Bearer $KEY" -H "Content-Type: application/json")
fail=0
ok()  { printf '  \033[32mPASS\033[0m  %s\n' "$1"; }
bad() { printf '  \033[31mFAIL\033[0m  %s\n' "$1"; fail=1; }

# Prints "<http_code>|<body>" for a GET.
get() { curl -s --max-time 20 -w '|%{http_code}' "$1" "${H[@]}"; }

# Is this response safe? Safe = 401, 404, or a 200 whose body is an empty array.
judge() { # $1 label, $2 body, $3 code, $4 what a row would mean
  case "$3" in
    401|404) ok "$1 is not reachable with the public key (http $3)"; return ;;
  esac
  case "$(printf '%s' "$2" | tr -d ' \n\r')" in
    '[]') ok "$1 is RLS-locked (http 200, empty array — correct)" ;;
    '') bad "$1 returned an empty response (http $3) — check manually" ;;
    *)  bad "$1 RETURNED ROWS (http $3). $4"
        printf '        %s\n' "$(printf '%s' "$2" | head -c 300)" ;;
  esac
}

echo "Project: $(printf '%s' "$URL" | sed -E 's#https://([^.]{0,6}).*#\1#')…  key: $(printf '%s' "$KEY" | cut -c1-15)…"
echo

# ---------------------------------------------------------------- functions --
if [ "${1:-}" = "--write" ]; then
  c=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 -X POST \
        "$URL/rest/v1/rpc/survey_submit" "${H[@]}" \
        -d '{"payload":{"goal":"shyness","goal_other":"VERIFY-SCRIPT-TEST-ROW","blend":{"red":25,"blue":25,"yellow":25,"green":25}}}')
  [ "$c" = "204" ] && ok "survey_submit inserted a row (204)" \
                   || bad "survey_submit returned $c, expected 204"
else
  # There is no non-destructive way to prove survey_submit exists: PostgREST
  # matches an RPC by its argument names, so a probe with `{}` does not match
  # survey_submit(payload jsonb) and comes back 404 "function not found" even
  # when the function is there. Any call that WOULD match inserts a row. So
  # read-only mode reports it as unchecked and leans on the boolean RPC below,
  # which proves the schema and the salt both exist.
  printf '  \033[33mSKIP\033[0m  survey_submit — needs --write to test (a matching call inserts a row)\n'
fi

body=$(curl -s --max-time 20 -X POST "$URL/rest/v1/rpc/survey_already_submitted" "${H[@]}" -d '{}')
case "$body" in
  true|false) ok "survey_already_submitted returns a boolean ($body)" ;;
  *)          bad "survey_already_submitted: $(printf '%s' "$body" | head -c 200)" ;;
esac

# -------------------------------------------------------------- the locks --
# private_config is the decisive test: it always holds exactly one row
# (ip_salt), so an empty array can only mean RLS blocked it.
r=$(get "$URL/rest/v1/private_config?select=*")
judge "private_config (the IP salt)" "${r%|*}" "${r##*|}" \
      "THE SALT IS EXPOSED — fingerprints are reversible by brute force."

r=$(get "$URL/rest/v1/survey_responses?select=*&limit=5")
judge "survey_responses" "${r%|*}" "${r##*|}" \
      "THE PUBLIC KEY READS EVERY RESPONDENT'S ANSWERS."

if [ "${1:-}" = "--write" ]; then
  echo
  echo "  NOTE: a test row was inserted (goal_other = VERIFY-SCRIPT-TEST-ROW)."
  echo "        Delete it from the Supabase table editor. It also marks this"
  echo "        machine as 'already submitted', hiding the tips popup here."
fi

echo
[ "$fail" = "0" ] && echo "All checks passed." || echo "Some checks failed — see above."
exit "$fail"

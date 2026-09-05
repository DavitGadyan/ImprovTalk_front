'use client'

import { SURVEY_VERSION, type Blend, type GoalSlug } from '@/content/survey'

/**
 * Survey submission.
 *
 * Supabase's REST endpoint over plain fetch rather than @supabase/supabase-js.
 * The SDK is ~40KB gzipped to do one POST, and this is the first non-Google
 * outbound call in the whole app — worth keeping it to the request itself.
 *
 * The anon key is public by design. It is safe here *only* because the table's
 * RLS policy grants INSERT and nothing else — see docs/SURVEY-SETUP.md. If that
 * policy is wrong, this key reads everyone's answers. Verify it before shipping.
 *
 * Both values are NEXT_PUBLIC_* and inlined at build time by the static export.
 * When they are absent the survey still runs and the result still renders; only
 * the write is skipped. That is deliberate: the respondent's half of the
 * exchange must not depend on our storage being configured.
 */
const URL_ = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const KEY_ = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const submitEnabled = Boolean(URL_ && KEY_)

export type SurveyPayload = {
  goal: GoalSlug
  goal_other: string | null
  /** Which of the fifteen personas, where the family narrows to one. */
  persona: string | null
  blend: Blend
  age_band: string | null
  gender: string | null
  country: string | null
  wanted_feature: string | null
  expectation: string | null
  /** Which persona page they were on, so answers tie back to the split. */
  variant: string | null
  /** utm_content, so a survey answer ties back to the video that sent them. */
  utm_content: string | null
}

export type SubmitResult = { ok: true } | { ok: false; reason: string }

export async function submitSurvey(payload: SurveyPayload): Promise<SubmitResult> {
  if (!submitEnabled) return { ok: false, reason: 'not-configured' }

  try {
    const res = await fetch(`${URL_}/rest/v1/survey_responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: KEY_,
        Authorization: `Bearer ${KEY_}`,
        /* Ask PostgREST not to echo the row back. We have no read policy, and
           requesting a representation we are not permitted to see turns a
           successful insert into a 401. */
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ ...payload, version: SURVEY_VERSION }),
    })

    if (!res.ok) {
      return { ok: false, reason: `http-${res.status}` }
    }
    return { ok: true }
  } catch {
    /* Offline, blocked by an extension, or CORS. The respondent still gets
       their result — losing one row matters less than losing their trust. */
    return { ok: false, reason: 'network' }
  }
}

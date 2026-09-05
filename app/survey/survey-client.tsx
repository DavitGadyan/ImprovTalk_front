'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChoiceGroup, Checkbox, Honeypot, Legend, Select, Slider, TextArea } from '@/components/ui/field'
import {
  AGE_BANDS,
  COLORS,
  COUNTRY_CODES,
  EVEN_BLEND,
  GENDERS,
  GOALS,
  STORAGE_KEY,
  blendSummary,
  countryName,
  goalBySlug,
  normalise,
  personaById,
  personasFor,
  ranked,
  situationFor,
  type Blend,
  type GoalSlug,
} from '@/content/survey'
import { submitEnabled, submitSurvey } from '@/lib/supabase'
import { track } from '@/lib/analytics'

/**
 * The goal question stays at seven options because fifteen on one screen is a
 * wall. The fifteen personas live behind it: pick a family, and the next step
 * narrows inside it. Families with a single persona skip that step and assign
 * it, so the column is populated either way.
 */
const TAIL = ['Style', 'About you', 'Where', 'Wishes', 'Done'] as const

export function SurveyClient() {
  const [step, setStep] = useState(0)
  const [started, setStarted] = useState(false)

  const [goal, setGoal] = useState<GoalSlug | null>(null)
  const [goalOther, setGoalOther] = useState('')
  const [persona, setPersona] = useState<string | null>(null)
  const [raw, setRaw] = useState<Blend>({ ...EVEN_BLEND })
  const [ageBand, setAgeBand] = useState('')
  const [gender, setGender] = useState('')
  const [country, setCountry] = useState('')
  const [feature, setFeature] = useState('')
  const [expectation, setExpectation] = useState('')
  const [consent, setConsent] = useState(false)
  const [honey, setHoney] = useState('')

  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)

  const blend = useMemo(() => normalise(raw), [raw])
  const options = useMemo(() => personasFor(goal), [goal])
  const steps = useMemo(
    () => ['Goal', ...(options.length > 1 ? ['Closest'] : []), ...TAIL],
    [options.length],
  )
  const current = steps[Math.min(step, steps.length - 1)]

  /* Already answered on this device: go straight to their result rather than
     asking again. Storage failing is not fatal — they simply retake it. */
  useEffect(() => {
    try {
      const prev = localStorage.getItem(STORAGE_KEY)
      if (!prev) return
      const p = JSON.parse(prev) as { goal: GoalSlug; blend: Blend; persona?: string | null }
      if (p?.goal) {
        setGoal(p.goal)
        setRaw(p.blend ?? EVEN_BLEND)
        setPersona(p.persona ?? null)
        setDone(true)
      }
    } catch {
      /* private mode or blocked storage — treat as a first visit */
    }
  }, [])

  const begin = () => {
    if (started) return
    setStarted(true)
    track('survey_start')
  }

  const go = (next: number) => {
    begin()
    setStep(next)
    track('survey_step', { step: steps[next] ?? String(next) })
  }

  const chooseGoal = (v: GoalSlug) => {
    setGoal(v)
    /* A family with one persona has nothing to ask, so assign it here rather
       than showing a question with a single answer. */
    const only = personasFor(v)
    setPersona(only.length === 1 ? only[0]!.id : null)
    begin()
  }

  const countryOptions = useMemo(
    () =>
      COUNTRY_CODES.map((c) => ({ value: c, label: countryName(c) })).sort((a, b) =>
        a.label.localeCompare(b.label),
      ),
    [],
  )

  async function onSubmit() {
    if (!goal || !consent || sending) return
    setSending(true)

    /* A filled honeypot is a bot. Show the same result rather than an error —
       telling it that it failed only teaches it to try again. */
    if (!honey) {
      const params = new URLSearchParams(typeof window === 'undefined' ? '' : window.location.search)
      await submitSurvey({
        goal,
        goal_other: goal === 'other' ? goalOther.trim() || null : null,
        persona,
        blend,
        age_band: ageBand || null,
        gender: gender || null,
        country: country || null,
        wanted_feature: feature.trim() || null,
        expectation: expectation.trim() || null,
        variant: (() => {
          try {
            return localStorage.getItem('improvtalk-variant')
          } catch {
            return null
          }
        })(),
        utm_content: params.get('utm_content'),
      })
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ goal, blend, persona }))
    } catch {
      /* not fatal — they can retake it */
    }

    track('survey_complete', { goal })
    setSending(false)
    setDone(true)
  }

  if (done && goal) {
    return (
      <Result
        goal={goal}
        blend={blend}
        personaId={persona}
        onRetake={() => {
          setDone(false)
          setStep(0)
        }}
      />
    )
  }

  const canAdvance =
    current === 'Goal'
      ? Boolean(goal) && (goal !== 'other' || goalOther.trim().length > 1)
      : true

  return (
    <div className="mx-auto max-w-[42rem]">
      <Progress step={step} steps={steps} />

      <div className="mt-10">
        {current === 'Goal' && (
          <>
            <Legend hint="One answer. It decides which tips you get at the end.">
              What are you working on?
            </Legend>
            <ChoiceGroup
              name="goal"
              legend="What are you working on?"
              value={goal}
              onChange={chooseGoal}
              options={GOALS.map((g) => ({ value: g.slug, label: g.label, hint: g.hint }))}
            />
            {goal === 'other' && (
              <div className="mt-4">
                <TextArea
                  id="goal-other"
                  label="In your own words"
                  placeholder="What would you want to get better at?"
                  value={goalOther}
                  onChange={setGoalOther}
                  maxLength={200}
                  rows={3}
                />
              </div>
            )}
          </>
        )}

        {current === 'Closest' && (
          <>
            <Legend hint="Skip it if none of them are you — the rest of the answers still work.">
              Which is closest?
            </Legend>
            <ChoiceGroup
              name="persona"
              legend="Which is closest?"
              value={persona}
              onChange={setPersona}
              options={options.map((p) => ({ value: p.id, label: p.label, hint: p.hint }))}
            />
          </>
        )}

        {current === 'Style' && (
          <>
            <Legend hint="Drag to roughly how you are. There is no right answer, and the four add up to 100%.">
              How do you come across?
            </Legend>
            <div className="grid gap-3">
              {COLORS.map((c) => (
                <Slider
                  key={c.key}
                  label={c.label}
                  hint={c.you}
                  hex={c.hex}
                  value={raw[c.key]}
                  percent={blend[c.key]}
                  onChange={(v) => setRaw((r) => ({ ...r, [c.key]: v }))}
                />
              ))}
            </div>
          </>
        )}

        {current === 'About you' && (
          <>
            <Legend hint="Optional, and it stays anonymous. It tells us who the app is actually for.">
              About you
            </Legend>
            <div className="grid gap-3">
              <Select
                id="age"
                label="Age"
                value={ageBand}
                onChange={setAgeBand}
                placeholder="Select…"
                options={AGE_BANDS.map((a) => ({ value: a, label: a }))}
              />
              <Select
                id="gender"
                label="Gender"
                value={gender}
                onChange={setGender}
                placeholder="Select…"
                options={GENDERS.map((g) => ({ value: g, label: g }))}
              />
            </div>
          </>
        )}

        {current === 'Where' && (
          <>
            <Legend hint="Country only. We never ask for anything more precise.">Where are you?</Legend>
            <Select
              id="country"
              label="Country"
              value={country}
              onChange={setCountry}
              placeholder="Select…"
              options={countryOptions}
            />
          </>
        )}

        {current === 'Wishes' && (
          <>
            <Legend hint="This is the part we read most closely.">What would make it worth using?</Legend>
            <div className="grid gap-5">
              <TextArea
                id="feature"
                label="The one feature you most want"
                placeholder="Anything. Even if it sounds obvious."
                value={feature}
                onChange={setFeature}
              />
              <TextArea
                id="expectation"
                label="What do you expect from an app like this?"
                placeholder="What would have to be true for you to keep using it?"
                value={expectation}
                onChange={setExpectation}
              />
            </div>
          </>
        )}

        {current === 'Done' && (
          <>
            <Legend hint="Then your tips download straight away — no email, no waiting.">
              One last thing
            </Legend>
            <Honeypot value={honey} onChange={setHoney} />
            <Checkbox id="consent" checked={consent} onChange={setConsent}>
              I am happy for ImprovTalk to store these answers to help build the app. No
              name, no email, nothing that identifies me.{' '}
              <Link href="/privacy/" className="text-accent underline underline-offset-4">
                How we handle data
              </Link>
            </Checkbox>
            {!submitEnabled && (
              <p className="mt-4 text-[13px] text-subtle">
                Storage is not configured in this build, so nothing will be recorded — you
                will still get your tips.
              </p>
            )}
          </>
        )}
      </div>

      <div className="mt-10 flex items-center gap-3">
        {step > 0 && (
          <Button variant="outline" onClick={() => go(step - 1)}>
            Back
          </Button>
        )}
        {step < steps.length - 1 ? (
          <Button variant="solid" disabled={!canAdvance} onClick={() => go(step + 1)}>
            Continue
          </Button>
        ) : (
          <Button variant="brand" disabled={!consent || sending} onClick={onSubmit}>
            {sending ? 'Sending…' : 'See my result'}
          </Button>
        )}
        {step > 0 && step < steps.length - 1 && (
          <button
            type="button"
            onClick={() => go(step + 1)}
            className="ml-auto text-[13px] text-subtle underline underline-offset-4 hover:text-ink"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  )
}

function Progress({ step, steps }: { step: number; steps: readonly string[] }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle">
        <span>
          Step {step + 1} of {steps.length}
        </span>
        <span>{steps[step]}</span>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500 ease-[var(--ease-out-soft)]"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  )
}

function Result({
  goal,
  blend,
  personaId,
  onRetake,
}: {
  goal: GoalSlug
  blend: Blend
  personaId: string | null
  onRetake: () => void
}) {
  const g = goalBySlug(goal)!
  const persona = personaById(personaId)
  const top = ranked(blend)[0]!
  const second = ranked(blend)[1]!
  const [building, setBuilding] = useState(false)

  /* The PDF writer is imported here and nowhere else, so it is fetched only by
     people who finished the survey and never by anyone loading a landing page. */
  async function onDownload() {
    setBuilding(true)
    try {
      const { downloadTipsPdf } = await import('@/lib/tips-pdf')
      downloadTipsPdf({ goal, personaId, blend })
      track('tips_download', { goal })
    } finally {
      setBuilding(false)
    }
  }

  return (
    <div className="mx-auto max-w-[42rem]">
      <p className="eyebrow" style={{ color: top.hex }}>
        {top.label} · {second.label}
      </p>
      <h2 className="display-md mt-4 text-ink">{blendSummary(blend)}</h2>

      <div className="mt-8 flex h-3 w-full overflow-hidden rounded-full">
        {ranked(blend).map((c) => (
          <div key={c.key} style={{ width: `${blend[c.key]}%`, background: c.hex }} />
        ))}
      </div>

      <p
        className="mt-8 border-l-2 pl-5 text-[17px] leading-relaxed text-ink-soft"
        style={{ borderColor: top.hex }}
      >
        {persona ? persona.situation : situationFor(goal, blend)}
      </p>
      {persona && (
        <p className="mt-4 pl-5 text-[15px] leading-relaxed text-muted">
          {situationFor(goal, blend)}
        </p>
      )}

      <div className="mt-8 grid gap-3">
        {ranked(blend)
          .slice(0, 2)
          .map((c) => (
            <div key={c.key} className="rounded-2xl border border-line p-5">
              <p className="text-[15px] font-medium" style={{ color: c.hex }}>
                {blend[c.key]}% {c.label}
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{c.you}</p>
              <p className="mt-2 text-[13px] text-subtle">
                Works with: {c.wants}. Struggles with: {c.hates}.
              </p>
            </div>
          ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-line-strong bg-surface">
        <div className="h-1 w-full" style={{ background: top.hex }} />
        <div className="p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
            Your tips
          </p>
          <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">
            A one-page PDF: four moves for {g.label.toLowerCase()}, the one to start with,
            and where to begin in the app — written for how you come across, not for
            everyone.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button variant="solid" size="sm" onClick={onDownload} disabled={building}>
              {building ? 'Preparing…' : 'Download your tips'}
            </Button>
            {g.page && (
              <Button asChild variant="outline" size="sm">
                <Link href={g.page}>See the app</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onRetake}
        className="mt-8 text-[13px] text-subtle underline underline-offset-4 hover:text-ink"
      >
        Take it again
      </button>
    </div>
  )
}

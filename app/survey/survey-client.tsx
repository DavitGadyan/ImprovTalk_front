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
import { cn } from '@/lib/utils'
import { Confetti } from '@/components/ui/confetti'

/**
 * The goal question stays at seven options because fifteen on one screen is a
 * wall. The fifteen personas live behind it: pick a family, and the next step
 * narrows inside it. Families with a single persona skip that step and assign
 * it, so the column is populated either way.
 */
const TAIL = ['Style', 'About you', 'Where', 'Wishes', 'Done'] as const

export function SurveyClient({
  inDialog = false,
  onComplete,
}: {
  inDialog?: boolean
  /** Lets a host dialog know the answers are safely away. */
  onComplete?: () => void
} = {}) {
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
  /* Non-null when the write failed. The result is still shown — they answered
     the questions and have earned the PDF — but the failure is not hidden. */
  const [saveError, setSaveError] = useState<string | null>(null)

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
    let failed: string | null = null
    if (!honey) {
      const params = new URLSearchParams(typeof window === 'undefined' ? '' : window.location.search)
      const res = await submitSurvey({
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
      /* Previously discarded. A 500, a CORS failure or an ad blocker threw the
         answers away and still showed confetti. */
      if (!res.ok && res.reason !== 'not-configured') failed = res.reason
    }
    setSaveError(failed)

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ goal, blend, persona }))
    } catch {
      /* not fatal — they can retake it */
    }

    track('survey_complete', { goal })
    setSending(false)
    setDone(true)
    onComplete?.()
  }

  if (done && goal) {
    return (
      <Result
        goal={goal}
        blend={blend}
        personaId={persona}
        inDialog={inDialog}
        saveError={saveError}
        onRetake={() => {
          /* A retake has to be a clean one. Leaving the answers in place meant
             the form came back pre-filled with consent still ticked, and
             finishing it wrote a second row for the same person. */
          try {
            localStorage.removeItem(STORAGE_KEY)
          } catch {
            /* nothing stored to clear */
          }
          setGoal(null)
          setGoalOther('')
          setPersona(null)
          setRaw({ ...EVEN_BLEND })
          setAgeBand('')
          setGender('')
          setCountry('')
          setFeature('')
          setExpectation('')
          setConsent(false)
          setSaveError(null)
          /* Without this, begin() short-circuits and the second attempt never
             fires survey_start — retakes show as unmatched completions. */
          setStarted(false)
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

  /*
   * Enter moves forward. Picking a pill with the mouse leaves focus nowhere
   * useful, so the handler sits on the wrapper and reads the current step's
   * own guard rather than relying on a focused control.
   *
   * A textarea keeps Enter for newlines, and the select keeps it for its own
   * open/close behaviour.
   */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' || e.shiftKey) return
    const el = e.target as HTMLElement
    if (el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') return
    /* A focused button or link should do its own thing, not this. */
    if (el.tagName === 'BUTTON' || el.tagName === 'A') return

    e.preventDefault()
    if (current === 'Done') {
      if (consent && !sending) void onSubmit()
    } else if (canAdvance) {
      go(step + 1)
    }
  }

  return (
    <div className="mx-auto max-w-[42rem]" onKeyDown={onKeyDown}>
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
  inDialog,
  saveError,
  onRetake,
}: {
  goal: GoalSlug
  blend: Blend
  personaId: string | null
  /** Inside the popup the download is the only action — a link out of a modal
      loses the result, and "take it again" has nothing to return to. */
  inDialog?: boolean
  /** Non-null when the write failed. It has to be reported here: submitting
      always advances to this screen, so an alert left behind on the form step
      was never mounted and nobody ever saw it. */
  saveError?: string | null
  onRetake: () => void
}) {
  const g = goalBySlug(goal)!
  const persona = personaById(personaId)
  const top = ranked(blend)[0]!
  const second = ranked(blend)[1]!
  const [building, setBuilding] = useState(false)

  /* The PDF writer is imported here and nowhere else, so it is fetched only by
     people who finished the survey and never by anyone loading a landing page. */
  const [pdfError, setPdfError] = useState(false)

  async function onDownload() {
    setBuilding(true)
    setPdfError(false)
    try {
      const { downloadTipsPdf } = await import('@/lib/tips-pdf')
      downloadTipsPdf({ goal, personaId, blend })
      track('tips_download', { goal })
    } catch {
      /* A stale deploy or an offline tab fails the chunk fetch. Without this the
         button just flips back to its label at the last step of the funnel. */
      setPdfError(true)
    } finally {
      setBuilding(false)
    }
  }

  return (
    <div className={cn('mx-auto max-w-[42rem]', inDialog && 'result-rise')}>
      {inDialog && <Confetti />}
      {saveError && (
        <p
          role="alert"
          className="mb-6 rounded-2xl border border-practice/40 bg-practice/10 px-5 py-4 text-[14px] leading-relaxed text-ink-soft"
        >
          Your tips are ready, but we could not save your answers ({saveError}).
          Nothing is lost on your side — download the PDF below.
        </p>
      )}
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
            Three pages, written for how you come across. Four moves for{' '}
            {g.label.toLowerCase()}, the one to start with, and three scenarios to
            practise in, in order.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button variant="solid" size="sm" onClick={onDownload} disabled={building}>
              {building ? 'Preparing…' : 'Download your tips'}
            </Button>
            {!inDialog && g.page && (
              <Button asChild variant="outline" size="sm">
                <Link href={g.page}>See the app</Link>
              </Button>
            )}
          </div>
          {pdfError && (
            <p role="alert" className="mt-4 text-[13px] leading-relaxed text-practice">
              The tips file did not build. Reload the page and press it again — your
              answers are saved on this device.
            </p>
          )}
        </div>
      </div>

      {!inDialog && (
        <button
          type="button"
          onClick={onRetake}
          className="mt-8 text-[13px] text-subtle underline underline-offset-4 hover:text-ink"
        >
          Take it again
        </button>
      )}
    </div>
  )
}

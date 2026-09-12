'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { LogoMark } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { useBackdropClose } from '@/components/ui/use-backdrop-close'
import { SurveyClient } from '@/app/survey/survey-client'
import { STORAGE_KEY } from '@/content/survey'
import { clearDwell, dwellSoFar, watchDwell } from '@/lib/dwell'
import { alreadySubmitted } from '@/lib/supabase'
import { track } from '@/lib/analytics'

/**
 * Visible reading time before the offer opens, accumulated across pages.
 *
 * 50 seconds — long enough that they have actually read something, short enough
 * that a normal session reaches it. 2.5 minutes was the first value and almost
 * nobody got there: measured on the live site, the counter needs ~155s of
 * visible time from landing, which is longer than most sessions last.
 *
 * `?dwell=<seconds>` overrides it for one page load, so testing never needs a
 * code change: /?dwell=5 fires almost at once and this value stays put.
 */
const AFTER_MS = 50_000

function threshold(): number {
  if (typeof window === 'undefined') return AFTER_MS
  const raw = new URLSearchParams(window.location.search).get('dwell')
  const secs = raw ? Number(raw) : NaN
  return Number.isFinite(secs) && secs > 0 ? secs * 1000 : AFTER_MS
}

const DISMISS_KEY = 'improvtalk-tips-popup-dismissed'

/**
 * "No" has to stick, and it has to stick even where localStorage throws —
 * private windows, and browsers set to block site data. So the refusal is
 * written twice: localStorage to keep it for good, sessionStorage to at least
 * hold it for the rest of this visit if the first one failed.
 */
function refused(): boolean {
  try {
    if (localStorage.getItem(DISMISS_KEY) || localStorage.getItem(STORAGE_KEY)) return true
  } catch {
    /* fall through to the session check */
  }
  try {
    if (sessionStorage.getItem(DISMISS_KEY)) return true
  } catch {
    /* nothing persists here; the offer may reappear on a later page */
  }
  return false
}

/** Clears every trace, so a test flag or a reset actually starts from zero. */
function forget() {
  for (const store of [
    () => localStorage,
    () => sessionStorage,
  ]) {
    try {
      store().removeItem(DISMISS_KEY)
    } catch {
      /* nothing to clear here */
    }
  }
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* nothing to clear */
  }
  clearDwell()
}

/** Why it is not showing — see `window.__improvtalkPopup.status()`. */
function reason(): string | null {
  try {
    if (localStorage.getItem(STORAGE_KEY)) return 'already completed the survey'
    if (localStorage.getItem(DISMISS_KEY)) return 'dismissed for good on this device'
  } catch {
    /* fall through */
  }
  try {
    if (sessionStorage.getItem(DISMISS_KEY)) return 'closed earlier on this device'
  } catch {
    /* fall through */
  }
  return null
}

/**
 * Closing it is a permanent no.
 *
 * Someone who shuts the dialog on sight has answered the question, and asking
 * again next week is how a popup becomes the reason people stop coming back.
 * So it goes to localStorage and survives closing the laptop.
 *
 * sessionStorage is written too, because a private window or a browser set to
 * block site data throws on the first call — and that is exactly the context
 * where a popup that keeps returning is most irritating.
 *
 * What it cannot cover: a different browser, a different device, or cleared
 * site data. The IP check catches some of that, but only for people who
 * actually submitted.
 */
function remember() {
  try {
    localStorage.setItem(DISMISS_KEY, '1')
  } catch {
    /* the session record below still stops this visit */
  }
  try {
    sessionStorage.setItem(DISMISS_KEY, '1')
  } catch {
    /* nothing persists here; the dialog stays shut for this page either way */
  }
}

/**
 * The timed offer.
 *
 * Opens once, after someone has actually read for a while, and carries the
 * whole exchange: the offer, the form, and the PDF at the end. It reuses
 * <SurveyClient> rather than reimplementing the seven steps, so there is one
 * form in the codebase and Supabase only has one shape to accept.
 *
 * Rules it will not break:
 *  - Never on /survey/, where the same form is already the page.
 *  - Never over another dialog. The install panel is the conversion; a second
 *    modal on top of it would bury the thing we actually measure.
 *  - Never twice. Dismissed or completed, it stays gone.
 */
export function TipsPopup() {
  const pathname = usePathname()
  const ref = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  const [started, setStarted] = useState(false)
  /* Raised instead of closing when there are answers to lose. */
  const [confirming, setConfirming] = useState(false)
  /* Set when the survey has been submitted. After that there is nothing to
     lose, and asking "closing throws them away" would simply be untrue. */
  const [completed, setCompleted] = useState(false)

  /*
   * Diagnosis, because the failure is silent by nature: a popup that does not
   * appear looks identical whether it is waiting, suppressed, or broken.
   * `__improvtalkPopup.status()` says which, and `.reset()` clears it.
   */
  useEffect(() => {
    const w = window as unknown as Record<string, unknown>
    w.__improvtalkPopup = {
      status: () => ({
        suppressedBecause: reason(),
        msWatched: dwellSoFar(),
        msNeeded: threshold(),
        tabVisible: document.visibilityState === 'visible',
      }),
      reset: () => {
        forget()
        location.reload()
      },
    }
  }, [])

  useEffect(() => {
    if (pathname?.startsWith('/survey')) return

    /* An explicit test flag has to beat a previous dismissal. Without this,
       ?dwell= silently does nothing for anyone who has ever closed the popup —
       which is everyone who has tested it once. */
    const params = new URLSearchParams(window.location.search)
    if (params.has('dwell') || params.get('popup') === 'reset') forget()
    else if (refused()) return

    return watchDwell(threshold(), async () => {
      /* Someone mid-install is not someone to interrupt. Try again on the
         next page, where the dwell total is already past the threshold. */
      if (document.querySelector('dialog[open]')) return

      /* Cleared storage, or a second device on the same connection. The check
         runs here rather than on mount so it costs nothing for the many
         visitors who never reach the threshold. */
      if (await alreadySubmitted()) {
        remember()
        return
      }

      setOpen(true)
      track('tips_popup_shown')
    })
  }, [pathname])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    else if (!open && el.open) el.close()
  }, [open])

  /* showModal() makes the page inert but does not stop it scrolling — a wheel
     or a trackpad swipe still moves the document behind the dialog. Lock the
     body while it is open and put the previous value back afterwards, rather
     than assuming it was ''. */
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  /* Every route out is final, so anything with answers in it asks first. The
     guard used to be on the backdrop only, which meant Escape or the x six
     questions in destroyed the lot and suppressed the popup for good. */
  /* Set before an intentional close so the dialog's own close event, which the
     guard below also listens to, does not treat it as an Escape and re-open. */
  const allowClose = useRef(false)

  const close = useCallback(() => {
    allowClose.current = true
    setOpen(false)
    setConfirming(false)
    clearDwell()
    remember()
  }, [])

  const requestClose = useCallback(() => {
    if (started && !completed) setConfirming(true)
    else close()
  }, [started, completed, close])

  /* Only the offer screen closes on a backdrop click. Losing four answered
     questions to a stray click is the worst thing this component could do —
     and a text selection that ended on the dialog's edge used to count as one
     (see use-backdrop-close.ts). */
  const backdrop = useBackdropClose(
    ref,
    useCallback(() => {
      if (!started) track('tips_popup_dismiss')
      requestClose()
    }, [requestClose, started]),
  )

  return (
    <dialog
      ref={ref}
      /* Escape fires the dialog's own close event; re-open it if there is
         something to confirm, so the keypress cannot bypass the guard. */
      onClose={() => {
        if (allowClose.current) {
          allowClose.current = false
          return
        }
        if (started && !completed) {
          setConfirming(true)
          ref.current?.showModal()
        } else {
          close()
        }
      }}
      onPointerDown={backdrop.onPointerDown}
      onClick={backdrop.onClick}
      aria-labelledby="tips-dialog-title"
      /* m-auto is not decoration: the UA stylesheet centres a modal <dialog>
         with margin:auto, and Tailwind's preflight resets margin to 0, which
         pins it to the top-left corner. No `relative` either: a modal dialog is
         position:fixed in the top layer, and overriding that put the card in
         normal flow at the top of the document — open it after scrolling and
         you saw a blurred page with no dialog on it. The confetti canvas is
         absolutely positioned against the dialog, which fixed still provides. */
      className="pop-in m-auto max-h-[calc(100dvh-2rem)] w-[min(40rem,calc(100vw-2rem))] overflow-y-auto rounded-card border border-line bg-surface p-0 text-ink backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      {/* Nothing at all until it opens. The gate used to sit below the header,
          so the logo, the close button and the accessible-name heading still
          shipped in the exported HTML of all 22 pages. */}
      {open && (
      <div className="p-7 md:p-9">
        {/* The visible heading changes with the branch — offer, form, confirm,
            result — so the dialog's accessible name lives here instead. It used
            to point at the offer heading, which unmounts the moment the form
            starts, leaving the dialog nameless for the whole survey. */}
        <h2 id="tips-dialog-title" className="sr-only">
          Free personal tips from ImprovTalk
        </h2>
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <LogoMark size={38} />
            <span className="text-small font-medium text-ink">ImprovTalk</span>
          </div>
          <button
            type="button"
            onClick={() => {
              if (!started) track('tips_popup_dismiss')
              requestClose()
            }}
            aria-label="Close"
            className="-mr-2 -mt-2 flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-muted hover:bg-surface-elev hover:text-ink"
          >
            {/* Quiet, not red. Closing is the normal way out, and a red x made
                people hesitate over it — the same reason the app's End & score
                stopped being a red link. */}
            <Icon name="close" className="text-xl" />
          </button>
        </div>

        {/* A closed <dialog> still ships its contents in the exported HTML, so
            the offer used to appear on all 22 pages for anything that reads
            markup rather than pixels. Nothing renders until it opens. */}
        {confirming && (
          <div className="mt-7">
            <h2 className="display-md text-ink">
              Discard your answers?
            </h2>
            <p className="mt-4 text-body text-ink">
              You have already answered some questions. Closing now throws them away,
              and this will not open again.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button variant="brand" onClick={() => setConfirming(false)}>
                Keep going
              </Button>
              <button
                type="button"
                onClick={() => {
                  track('tips_popup_dismiss')
                  close()
                }}
                className="rounded-full border border-line px-5 py-2.5 text-small font-medium text-muted transition-colors hover:border-muted hover:text-ink"
              >
                Discard
              </button>
            </div>
          </div>
        )}

        {/*
          Hidden rather than unmounted. Rendering the confirm *instead of* the
          form threw away every answer the moment it appeared, so "Keep going"
          came back to question one — the exact loss the guard exists to prevent.
        */}
        <div hidden={confirming}>
        {started ? (
          <div className="mt-8">
            <SurveyClient
              inDialog
              onComplete={() => setCompleted(true)}
              /* The download is the end of the exchange. A beat later the
                 dialog goes, so nobody is left looking for a way out — and by
                 then the answers are in Supabase and the file is on its way. */
              onDownloaded={() => window.setTimeout(close, 1000)}
            />
          </div>
        ) : (
          <div className="mt-7">
            {/*
              "Selected" is the client's call, made twice. Everyone who reads for
              50 seconds sees this, so nobody has been selected in any real
              sense — one word ("You are invited") makes it true if App Review
              or a consumer-protection question ever lands on it.
            */}
            <h2 className="display-md text-ink">
              You have been selected for a personal assessment
            </h2>
            <p className="mt-3 text-body text-ink">
              Specialised hints for your situation.
            </p>

            <ul className="mt-7 grid gap-3">
              {['No email', 'No sign-up', 'Free PDF with your hints'].map((line, i) => (
                <li
                  key={line}
                  className="tick-row flex items-center gap-3 text-small text-ink"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  {/* A bare check in the success colour, not a badge. The tinted
                      bubble read as an app sticker; the glyph on its own reads
                      as a spec sheet. */}
                  <Icon name="check" className="shrink-0 text-lg text-success" />
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button
                variant="brand"
                onClick={() => {
                  setStarted(true)
                  track('tips_popup_start')
                }}
              >
                Get my hints
              </Button>
            </div>
          </div>
        )}
        </div>
      </div>
      )}
    </dialog>
  )
}

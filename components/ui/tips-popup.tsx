'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { LogoMark } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { SurveyClient } from '@/app/survey/survey-client'
import { STORAGE_KEY } from '@/content/survey'
import { clearDwell, watchDwell } from '@/lib/dwell'
import { track } from '@/lib/analytics'

/** 2.5 minutes of visible reading, accumulated across pages. */
const AFTER_MS = 150_000

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

function remember() {
  try {
    localStorage.setItem(DISMISS_KEY, '1')
  } catch {
    /* no permanent record — the session one below still stops this visit */
  }
  try {
    sessionStorage.setItem(DISMISS_KEY, '1')
  } catch {
    /* nothing to do */
  }
}

/**
 * The timed offer.
 *
 * Opens once, after someone has actually read for a while, and carries the
 * whole exchange: the offer, the form, and the PDF at the end. It reuses
 * <SurveyClient> rather than reimplementing the six steps, so there is one
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

  useEffect(() => {
    if (pathname?.startsWith('/survey')) return

    if (refused()) return

    return watchDwell(AFTER_MS, () => {
      /* Someone mid-install is not someone to interrupt. Try again on the
         next page, where the dwell total is already past the threshold. */
      if (document.querySelector('dialog[open]')) return
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

  /* Every route out of this dialog is final — the No button, the Close button,
     Escape, and a backdrop click. It opens once per visitor or not at all. */
  const close = useCallback(() => {
    setOpen(false)
    clearDwell()
    remember()
  }, [])

  const onBackdrop = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      /* Only the offer screen closes on a backdrop click. Losing four answered
         questions to a stray click is the worst thing this component could do. */
      if (e.target === ref.current && !started) {
        track('tips_popup_dismiss')
        close()
      }
    },
    [close, started],
  )

  return (
    <dialog
      ref={ref}
      onClose={close}
      onClick={onBackdrop}
      aria-labelledby="tips-title"
      /* m-auto is not decoration: the UA stylesheet centres a modal <dialog>
         with margin:auto, and Tailwind's preflight resets margin to 0, which
         pins it to the top-left corner. */
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(40rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-line bg-surface p-0 text-ink backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="p-7 md:p-9">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <LogoMark size={38} />
            <span className="text-[15px] font-medium text-ink">ImprovTalk</span>
          </div>
          <button
            type="button"
            onClick={() => {
              if (!started) track('tips_popup_dismiss')
              close()
            }}
            aria-label="Close"
            className="-mr-2 -mt-1 rounded-full px-3 py-1.5 text-[13px] text-subtle transition-colors hover:text-ink"
          >
            Close
          </button>
        </div>

        {started ? (
          <div className="mt-8">
            <SurveyClient />
          </div>
        ) : (
          <div className="mt-7">
            {/*
              The offer. This is the one string to change if you want the
              "you have been selected" framing instead — everyone who reads for
              2.5 minutes sees this, so nobody has actually been selected, and
              saying so is a claim App Review and consumer-protection rules both
              read literally.
            */}
            <h2 id="tips-title" className="display-md text-ink">
              Free personal tips, written for how you come across
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              You have been reading for a few minutes, so here is the thing we made for
              people who do. Six questions, ninety seconds, and you get a one-page PDF
              built from your own answers — not a generic list.
            </p>

            <ul className="mt-6 grid gap-2.5 text-[14.5px] text-muted">
              <li>· What your situation actually is, said back to you</li>
              <li>· Four moves for it, and the one to start with</li>
              <li>· Where to begin in the app</li>
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                variant="brand"
                onClick={() => {
                  setStarted(true)
                  track('tips_popup_start')
                }}
              >
                Get my tips
              </Button>
              <button
                type="button"
                onClick={() => {
                  track('tips_popup_dismiss')
                  close()
                }}
                className="rounded-full border border-line-strong px-5 py-2.5 text-[13.5px] font-medium text-muted transition-colors hover:border-muted hover:text-ink"
              >
                No, don&rsquo;t ask again
              </button>
            </div>

            <p className="mt-6 border-t border-line pt-5 text-[12.5px] leading-relaxed text-subtle">
              No email address, no account. Nothing here identifies you, and the PDF is
              built in your own browser. Say no and this will not open again.
            </p>
          </div>
        )}
      </div>
    </dialog>
  )
}

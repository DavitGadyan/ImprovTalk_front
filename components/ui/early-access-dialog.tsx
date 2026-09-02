'use client'

import { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { LogoMark } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { isLive, iosHref, SUPPORT_EMAIL } from '@/content/links'
import { track } from '@/lib/analytics'
import { usePlatform } from '@/lib/platform'

/**
 * The install panel.
 *
 * There is no email capture here, deliberately. A signup form only earns its
 * place if someone is going to act on what it collects; otherwise it takes an
 * address in exchange for a promise nobody will keep, and costs a conversion
 * that would otherwise have gone straight to TestFlight.
 *
 * So the panel does one thing: get the visitor onto their phone. A TestFlight
 * link is inert on a laptop, which is the entire reason the QR exists.
 *
 * Built on native <dialog> for focus trapping, Escape-to-close, an inert
 * background and a backdrop, with no dependency.
 */
export function EarlyAccessDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const platform = usePlatform()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) {
      el.showModal()
      track('qr_reveal')
    } else if (!open && el.open) {
      el.close()
    }
  }, [open])

  const onBackdrop = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === ref.current) onClose()
    },
    [onClose],
  )

  const betaLive = isLive.testflight || isLive.ios
  const isAndroid = platform === 'android'

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={onBackdrop}
      aria-labelledby="ea-title"
      /* m-auto is not decoration: the UA stylesheet centres a modal <dialog>
         with margin:auto, and Tailwind's preflight resets margin to 0, which
         pins it to the top-left corner. */
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(32rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-line bg-surface p-0 text-ink backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="p-7 md:p-9">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <LogoMark size={40} />
            <div>
              {/*
                A <p>, not an <h2>. The dialog is mounted inside the hero, so an
                h2 here lands ahead of the first real section in source order and
                a crawler reads the page's opening heading as "Get early access".
                aria-labelledby still names the dialog, so nothing is lost.
              */}
              <p id="ea-title" className="text-lg font-semibold text-ink">
                {isAndroid ? 'iPhone first' : 'Get early access'}
              </p>
              <p className="mt-0.5 text-[13px] text-subtle">
                {isAndroid ? 'iPhone only for now' : 'Free, on TestFlight'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-m-2 shrink-0 rounded-full p-2 text-subtle transition-colors hover:text-ink"
          >
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
              <path
                d="m3.5 3.5 9 9m0-9-9 9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </button>
        </div>

        {isAndroid ? (
          <p className="mt-7 text-[15px] leading-relaxed text-muted">
            ImprovTalk is on iPhone for now. Open improvtalk.vip on an iPhone and the beta
            installs from there in about a minute.
          </p>
        ) : (
          <div className="mt-7 flex items-center gap-5">
            <div className="shrink-0 rounded-xl bg-white p-2.5">
              <Image
                src="/qr-get.svg"
                alt=""
                width={112}
                height={112}
                className="size-28"
                unoptimized
              />
            </div>
            <div>
              <p className="text-[15px] font-medium text-ink">Scan with your iPhone</p>
              <p className="mt-2 text-[13px] leading-relaxed text-subtle">
                TestFlight installs on the phone itself, so the code opens the page there. About
                a minute, and it is free.
              </p>
              {betaLive && (
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <a
                    href={iosHref()}
                    onClick={() => track('testflight_click', { source: 'dialog' })}
                  >
                    Or open the link
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}

        <p className="mt-7 border-t border-line pt-5 text-[12.5px] text-subtle">
          Trouble installing?{' '}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-accent underline underline-offset-4"
          >
            {SUPPORT_EMAIL}
          </a>
        </p>
      </div>
    </dialog>
  )
}

'use client'

import { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { EarlyAccessForm } from '@/components/ui/early-access-form'
import { LogoMark } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { isLive, iosHref } from '@/content/links'
import { track } from '@/lib/analytics'
import { usePlatform } from '@/lib/platform'

/**
 * The install panel, behind one click.
 *
 * What this panel is for changed when the TestFlight link went live. It used to
 * collect an address because there was nowhere to send anyone. Now there is, and
 * the useful thing on a desktop is the QR — a TestFlight link is inert on a
 * laptop, so the job is getting the visitor onto their phone.
 *
 * Android still needs the address: TestFlight is iOS-only, and there is nothing
 * to install on Android yet.
 *
 * Built on native <dialog>, which brings focus trapping, Escape-to-close, an
 * inert background and a backdrop with no dependency and none of the
 * focus-management bugs a hand-rolled modal collects.
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

  /* Backdrop clicks land on the dialog element itself, so compare the target. */
  const onBackdrop = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === ref.current) onClose()
    },
    [onClose],
  )

  const betaLive = isLive.testflight || isLive.ios
  const showQr = betaLive && platform !== 'android'
  /*
   * The form stays available even with the beta link live. A TestFlight public
   * link refuses testers whenever the group has no approved build, and the
   * visitor cannot tell that from our side — without a fallback they would just
   * bounce off Apple's "not accepting any new testers" page with nothing to do.
   */
  const showForm = true

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={onBackdrop}
      aria-labelledby="ea-title"
      /* m-auto is not decoration: the UA stylesheet centres a modal <dialog>
         with margin:auto, and Tailwind's preflight resets margin to 0, which
         pins it to the top-left corner. */
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(34rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-line bg-surface p-0 text-ink backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="p-7 md:p-9">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <LogoMark size={40} />
            <div>
              <h2 id="ea-title" className="text-lg font-semibold text-ink">
                {betaLive ? 'Join the beta' : 'Get early access'}
              </h2>
              <p className="mt-0.5 text-[13px] text-subtle">
                {betaLive ? 'Free, on TestFlight, iPhone only for now' : 'TestFlight, iPhone first'}
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

        {showQr && (
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
                TestFlight only works on the phone itself, so the code opens the install page
                there. It takes about a minute.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-4">
                <a
                  href={iosHref()}
                  onClick={() => track('notify_click', { target: 'testflight_dialog' })}
                >
                  Or open the link
                </a>
              </Button>
            </div>
          </div>
        )}

        {showQr && showForm && <div className="mt-8 border-t border-line pt-7" />}

        {showForm && (
          <div className={showQr ? '' : 'mt-7'}>
            {betaLive && (
              <p className="mb-4 text-[13px] leading-relaxed text-subtle">
                {platform === 'android'
                  ? 'On Android? The beta is iPhone only for now. Leave your address and we will tell you the moment it is ready.'
                  : 'Beta places are limited. If TestFlight says it is not taking testers, leave your address and we will let you in as soon as a place opens.'}
              </p>
            )}
            <EarlyAccessForm />
          </div>
        )}
      </div>
    </dialog>
  )
}

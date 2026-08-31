'use client'

import { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { EarlyAccessForm } from '@/components/ui/early-access-form'
import { LogoMark } from '@/components/ui/logo'
import { track } from '@/lib/analytics'

/**
 * Early-access panel: the email form and the scan code, behind one click.
 *
 * The QR used to sit in the hero, where it competed with the headline and asked
 * people to scan before they knew what the product was. Here it appears at the
 * moment someone has already decided they want it, next to the alternative —
 * leave an address, or scan to carry on with the phone you will install on.
 *
 * Built on native <dialog>, which brings focus trapping, Escape-to-close, inert
 * background and a backdrop with no dependency and no focus-management bugs of
 * my own making.
 */
export function EarlyAccessDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)

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

  /* Backdrop clicks land on the dialog itself, so compare the target. */
  const onBackdrop = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === ref.current) onClose()
    },
    [onClose],
  )

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
                Get early access
              </h2>
              <p className="mt-0.5 text-[13px] text-subtle">TestFlight, iPhone first</p>
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

        <div className="mt-7">
          <EarlyAccessForm />
        </div>

        <div className="mt-8 flex items-center gap-5 border-t border-line pt-7">
          <div className="shrink-0 rounded-xl bg-white p-2.5">
            <Image
              src="/qr-get.svg"
              alt=""
              width={96}
              height={96}
              className="size-24"
              unoptimized
            />
          </div>
          <div>
            <p className="text-[14px] font-medium text-ink">Or carry on with your phone</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-subtle">
              Scan this and the install page opens on the device you will actually use it on.
            </p>
          </div>
        </div>
      </div>
    </dialog>
  )
}

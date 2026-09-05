'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { STORAGE_KEY } from '@/content/survey'

const DISMISS_KEY = 'improvtalk-survey-dismissed'

/**
 * The entry prompt.
 *
 * Deliberately not a modal and deliberately not in front of the install CTA.
 * TestFlight is the conversion; putting a survey in its way would trade the
 * thing we measure for the thing we are curious about.
 *
 * Hidden once dismissed, and hidden entirely for anyone who already answered.
 */
export function SurveyPrompt() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) || localStorage.getItem(STORAGE_KEY)) return
    } catch {
      /* blocked storage — show it; the worst case is asking twice */
    }
    setShow(true)
  }, [])

  if (!show) return null

  return (
    <div className="container-page">
      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-medium text-ink">
            Ninety seconds, and you get a one-page PDF written for how you come across.
          </p>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-subtle">
            Six questions, no email address. It also tells us who the app is actually for.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <Link
            href="/survey/"
            className="text-sm font-medium text-accent underline underline-offset-4"
          >
            Take it
          </Link>
          <button
            type="button"
            onClick={() => {
              setShow(false)
              try {
                localStorage.setItem(DISMISS_KEY, '1')
              } catch {
                /* not fatal — it reappears next visit */
              }
            }}
            className="text-sm text-subtle transition-colors hover:text-ink"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  )
}

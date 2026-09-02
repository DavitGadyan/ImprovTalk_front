'use client'

import { useEffect, useState } from 'react'
import { trackingEnabled } from '@/content/analytics'
import { Button } from '@/components/ui/button'

const KEY = 'improvtalk-consent'
type Choice = 'granted' | 'denied'

/**
 * Consent banner for Google Consent Mode v2.
 *
 * Only rendered when a tag is actually configured — an unconfigured site sets
 * no identifiers, so asking permission for nothing would be theatre.
 *
 * A stored choice is replayed on load rather than re-asked, and declining is a
 * real choice that sticks: it is one click, in the same visual weight as
 * accepting, because a reject button hidden behind a settings panel is not
 * consent.
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  function apply(choice: Choice) {
    window.gtag?.('consent', 'update', {
      ad_storage: choice,
      analytics_storage: choice,
      ad_user_data: choice,
      ad_personalization: choice,
    })
  }

  function choose(choice: Choice) {
    try {
      localStorage.setItem(KEY, choice)
    } catch {
      /* not fatal — the banner simply reappears next visit */
    }
    apply(choice)
    setVisible(false)
  }

  useEffect(() => {
    if (!trackingEnabled) return
    let stored: string | null = null
    try {
      stored = localStorage.getItem(KEY)
    } catch {
      /* private mode or blocked storage — treat as undecided */
    }

    if (stored === 'granted') {
      apply('granted')
    } else if (stored !== 'denied') {
      setVisible(true)
    }
  }, [])

  if (!trackingEnabled || !visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie choices"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-canvas/95 backdrop-blur-md"
    >
      <div className="container-page flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        {/*
          Kept short deliberately. This bar is fixed to the bottom, spans the
          viewport and only paints after hydration, which made it the LCP element
          on mobile — the metric was being set by a cookie notice rather than by
          the hero. Fewer words is a smaller paint area and a better banner.
        */}
        <p className="max-w-md text-[13px] leading-relaxed text-muted">
          Analytics and ads cookies. Nothing loads until you accept.{' '}
          <a href="/privacy/" className="text-accent underline underline-offset-4">
            How we handle data
          </a>
        </p>
        <div className="flex shrink-0 items-center gap-2.5">
          <Button variant="outline" size="sm" onClick={() => choose('denied')}>
            Decline
          </Button>
          <Button size="sm" onClick={() => choose('granted')}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  )
}

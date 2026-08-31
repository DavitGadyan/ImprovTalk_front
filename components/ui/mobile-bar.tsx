'use client'

import { useEffect, useState } from 'react'
import { LogoMark } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { iosHref, isLive } from '@/content/links'
import { usePlatform } from '@/lib/platform'
import { cn } from '@/lib/utils'

/**
 * Sticky install bar, small screens only.
 *
 * Most traffic is mobile, where the header CTA is hidden and the hero button
 * scrolls away within one swipe — leaving a long page with no way to act on it.
 * The bar appears once the hero CTA is off screen so it never competes with it,
 * and it hides again over the final CTA for the same reason.
 */
export function MobileBar() {
  const [show, setShow] = useState(false)
  const platform = usePlatform()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const nearBottom =
        y + window.innerHeight > document.documentElement.scrollHeight - 900
      setShow(y > 620 && !nearBottom)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Android must never be pointed at an iOS-only beta; /get handles both. */
  const href = isLive.ios
    ? iosHref()
    : isLive.testflight && platform === 'ios'
      ? iosHref()
      : '/get/'

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 backdrop-blur-md sm:hidden',
        'transition-transform duration-300 ease-[var(--ease-out-soft)]',
        'pb-[env(safe-area-inset-bottom)]',
        show ? 'translate-y-0' : 'translate-y-full',
      )}
      /* Keeps it out of the tab order and off screen readers while hidden.
         React 19 supports `inert` as a real boolean prop. */
      aria-hidden={!show}
      inert={!show}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <LogoMark size={38} className="rounded-[22.5%]" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-medium text-ink">ImprovTalk</span>
          <span className="block truncate text-[11px] text-subtle">
            Free to start · 3 a week
          </span>
        </span>
        <Button asChild size="sm" className="shrink-0">
          <a href={href}>{isLive.ios ? 'Get' : 'Notify me'}</a>
        </Button>
      </div>
    </div>
  )
}

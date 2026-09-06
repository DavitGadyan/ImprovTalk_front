'use client'

import { useEffect, useState } from 'react'
import { Icon } from '@/components/ui/icon'
import { LogoMark } from '@/components/ui/logo'
import { cn } from '@/lib/utils'

/**
 * A way back to the call to action once it has scrolled away — on phones.
 *
 * On wider screens the header carries the pill, so this only mounts below
 * `md`. Slides in from the right once the hero CTA leaves the viewport, and
 * stays for the rest of the page.
 *
 * It scrolls back rather than opening the panel itself. The hero carries the
 * context for the decision; dropping someone into an install dialog from
 * halfway down a page they were still reading is a worse ask, not a faster one.
 */
export function ScrollCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero-cta')
    if (!hero) return

    /* Watching the CTA itself rather than a scroll offset: the hero's height
       changes with viewport and font size, so any fixed threshold would be
       wrong on most screens. */
    const watch = new IntersectionObserver(([e]) => setShow(!e?.isIntersecting), {
      threshold: 0,
    })
    watch.observe(hero)
    return () => watch.disconnect()
  }, [])

  const toTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to the top to get early access"
      /* Hidden from the tab order while off screen, so keyboard users do not
         land on a control they cannot see. */
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={cn(
        'fixed right-4 top-[4.75rem] z-40 inline-flex items-center gap-2.5 rounded-full md:hidden',
        'bg-accent py-2.5 pl-2.5 pr-4 text-small font-semibold text-on-accent',
        'transition-[transform,opacity] duration-500 ease-[var(--ease-out-soft)]',
        show
          ? 'translate-x-0 opacity-100 animate-[cta-pulse_3s_cubic-bezier(0.22,1,0.36,1)_infinite]'
          : 'pointer-events-none translate-x-[130%] opacity-0',
      )}
    >
      <LogoMark size={22} />
      <span>Get early access</span>
      <Icon name="arrow_upward" className="text-base" />
    </button>
  )
}

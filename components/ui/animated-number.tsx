'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * A number that counts up when it scrolls into view.
 *
 * The subtlety here is server rendering. The obvious implementation starts at
 * zero and animates to the value — which means the exported HTML says "0 things
 * worth mentioning", and that is exactly what crawlers and answer engines read.
 * The whole point of the structured-data work was to be quoted accurately.
 *
 * So the real value is rendered first, and the count is only ever introduced on
 * the client: if the element is off screen at hydration it is reset to zero
 * invisibly and counts up when reached. Anything already on screen at load keeps
 * its value rather than resetting to zero in front of the reader.
 */
export function AnimatedNumber({
  value,
  duration = 1100,
  format = (n: number) => n.toLocaleString('en'),
  className,
}: {
  value: number
  duration?: number
  format?: (n: number) => string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState(value)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = el.getBoundingClientRect()
    const onScreenNow = rect.top < window.innerHeight && rect.bottom > 0
    /* Only rewind what the reader cannot see. */
    if (!onScreenNow) {
      setDisplay(0)
      setArmed(true)
    }
  }, [])

  useEffect(() => {
    if (!armed || !inView) return
    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      /* easeOutExpo — fast to begin with, so the number is legible early and
         the last stretch reads as settling rather than still loading. */
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setDisplay(Math.round(value * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [armed, inView, value, duration])

  return (
    <span ref={ref} className={className}>
      {format(display)}
    </span>
  )
}

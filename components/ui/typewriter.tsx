'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * One line that types itself, holds, clears, and types the next — for a
 * handful of short claims that should be read one at a time.
 *
 * The export carries the first phrase in full, so there is text before
 * hydration and for anything that does not run scripts. The full list is
 * also there for assistive tech, once, in a visually hidden element; the
 * animated line is hidden from it, so nobody hears letters arrive. Under
 * reduced motion the line does not type: it shows one phrase at a time and
 * swaps every few seconds.
 */
export function Typewriter({
  phrases,
  className,
  typeMs = 55,
  holdMs = 1700,
  clearMs = 28,
}: {
  phrases: string[]
  className?: string
  typeMs?: number
  holdMs?: number
  clearMs?: number
}) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [shown, setShown] = useState(phrases[0] ?? '')
  const [phase, setPhase] = useState<'typing' | 'holding' | 'clearing'>('holding')

  useEffect(() => {
    const phrase = phrases[index] ?? ''
    let t: ReturnType<typeof setTimeout>
    if (reduced) {
      /* No letters: one phrase, then the next. */
      setShown(phrase)
      t = setTimeout(() => setIndex((i) => (i + 1) % phrases.length), holdMs + 1500)
      return () => clearTimeout(t)
    }
    if (phase === 'typing') {
      if (shown.length < phrase.length) {
        t = setTimeout(() => setShown(phrase.slice(0, shown.length + 1)), typeMs)
      } else {
        setPhase('holding')
      }
    } else if (phase === 'holding') {
      t = setTimeout(() => setPhase('clearing'), holdMs)
    } else {
      if (shown.length > 0) {
        t = setTimeout(() => setShown(shown.slice(0, -1)), clearMs)
      } else {
        setIndex((i) => (i + 1) % phrases.length)
        setPhase('typing')
      }
    }
    return () => clearTimeout(t)
  }, [phase, shown, index, phrases, reduced, typeMs, holdMs, clearMs])

  return (
    <div className={cn('relative', className)}>
      <p className="sr-only">{phrases.join('. ')}.</p>
      <p aria-hidden="true" className="display-md min-h-[1.2em] text-ink">
        {shown}
        <span
          className={cn(
            'ml-1 inline-block h-[0.9em] w-[0.08em] translate-y-[0.12em] bg-gold align-baseline',
            !reduced && 'caret-blink',
          )}
        />
      </p>
    </div>
  )
}

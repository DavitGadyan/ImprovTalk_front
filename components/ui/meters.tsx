'use client'

import { motion } from 'framer-motion'
import { viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * Score bars and delivery meters.
 *
 * These animate their width from 0 on first view. framer-motion's
 * reducedMotion="user" turns that into an instant paint for anyone who asked
 * their OS for less motion, so the value is never hidden behind an animation.
 */
export function ScoreBar({
  name,
  value,
  weight,
  hue = 'var(--color-accent)',
  className,
}: {
  name: string
  value: number
  weight?: number
  hue?: string
  className?: string
}) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-ink">
          {name}
          {weight !== undefined && (
            <span className="numeric ml-2 text-xs text-subtle">{Math.round(weight * 100)}%</span>
          )}
        </span>
        <span className="numeric text-sm font-semibold text-ink">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-raised">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: hue }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

export function Meter({ name, note, value }: { name: string; note: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate text-[13px] font-medium text-ink-soft">{name}</span>
          <span className="shrink-0 text-[11px] text-subtle">{note}</span>
        </div>
        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-raised">
          <motion.div
            className="h-full rounded-full bg-ink-soft/70"
            initial={{ width: 0 }}
            whileInView={{ width: `${value}%` }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </div>
  )
}

/** A static waveform. Bars are deterministic so server and client markup match. */
export function Waveform({ bars = 28, className }: { bars?: number; className?: string }) {
  return (
    <div className={cn('flex h-8 items-center gap-[3px]', className)} aria-hidden="true">
      {Array.from({ length: bars }, (_, i) => {
        // Deterministic height — no Math.random, which would differ between the
        // static export and the browser. Rounded to an integer on purpose:
        // React serialises the raw float differently on server and client
        // (42.1631% vs 42.16307132302113%), which is itself a hydration
        // mismatch even though the value is deterministic.
        const h = Math.round(18 + Math.abs(Math.sin(i * 1.7) * 82))
        return (
          <span
            key={i}
            className="w-[3px] shrink-0 rounded-full bg-accent/60"
            style={{ height: `${h}%` }}
          />
        )
      })}
    </div>
  )
}

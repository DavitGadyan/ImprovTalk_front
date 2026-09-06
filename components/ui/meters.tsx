'use client'

import { motion } from 'framer-motion'
import { viewportOnce } from '@/lib/motion'

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
            <span className="numeric ml-2 text-xs text-muted">{Math.round(weight * 100)}%</span>
          )}
        </span>
        <span className="numeric text-sm font-semibold text-ink">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-elev">
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
          <span className="truncate text-small font-medium text-ink">{name}</span>
          <span className="shrink-0 text-micro text-muted">{note}</span>
        </div>
        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-surface-elev">
          <motion.div
            className="h-full rounded-full bg-accent"
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

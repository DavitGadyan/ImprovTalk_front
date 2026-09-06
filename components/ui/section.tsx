'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeUp, stagger, viewportOnce } from '@/lib/motion'

/**
 * The shell every block on the page uses.
 *
 * Two band tones only — the page ground and the one lifted surface — separated
 * by a hairline, with a numbered chapter pill beside each heading. The curved
 * band tops and the tinted "brand" band are gone: B has exactly two surfaces,
 * and a third grey or a saturated wash is the thing that made the page look
 * like a template.
 */

export type Tone = 'canvas' | 'surface'

const tones: Record<Tone, string> = {
  canvas: 'bg-canvas',
  surface: 'bg-surface',
}

export function Section({
  id,
  index,
  label,
  title,
  intro,
  children,
  className,
  align = 'left',
  tone = 'canvas',
}: {
  id?: string
  /** Chapter number shown in the pill. */
  index?: number
  label?: string
  title?: React.ReactNode
  intro?: React.ReactNode
  children?: React.ReactNode
  className?: string
  align?: 'center' | 'left'
  tone?: Tone
}) {
  return (
    <section
      id={id}
      className={cn('relative border-t border-line py-20 md:py-28 lg:py-32', tones[tone], className)}
    >
      <div className="container-page">
        {(label || title || intro) && (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className={cn(
              'mb-12 md:mb-16',
              align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl',
            )}
          >
            {(label || index !== undefined) && (
              <motion.div
                variants={fadeUp}
                className={cn(
                  'mb-5 flex items-center gap-4',
                  align === 'center' && 'justify-center',
                )}
              >
                {label && <span className="eyebrow">{label}</span>}
                {index !== undefined && (
                  <>
                    <span aria-hidden="true" className="h-px flex-1 bg-line" />
                    <span
                      aria-hidden="true"
                      className="numeric rounded-full border border-line px-2.5 py-0.5 text-micro font-semibold text-muted"
                    >
                      {String(index).padStart(2, '0')}
                    </span>
                  </>
                )}
              </motion.div>
            )}
            {title && (
              <motion.h2 variants={fadeUp} className="display-lg text-ink">
                {title}
              </motion.h2>
            )}
            {intro && (
              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-2xl text-body text-muted md:text-lg"
              >
                {intro}
              </motion.p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  )
}

/** One-off reveal for content outside a Section header. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

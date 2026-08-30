'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeUp, stagger, viewportOnce } from '@/lib/motion'

/**
 * The shell every block on the page uses.
 *
 * Structure follows the reference case-study layouts in design_examples/:
 * alternating full-bleed bands, a numbered chapter pill beside each heading,
 * and a curved lip where one band meets the next. The horizontal banding is
 * what stops a long page reading as one undifferentiated scroll — it was the
 * single biggest difference between those references and a flat page.
 */

export type Tone = 'canvas' | 'raised' | 'deep' | 'brand'

const tones: Record<Tone, string> = {
  canvas: 'bg-canvas',
  raised: 'bg-surface',
  deep: 'bg-[#070c17]',
  /* The one saturated band. Solid, not a gradient — the references use flat
     brand colour for these, and a wash would fight the rationing rule. */
  brand: 'bg-[#171034]',
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
  hue,
  tone = 'canvas',
  curved = false,
}: {
  id?: string
  /** Chapter number shown in the pill, as in the reference layouts. */
  index?: number
  label?: string
  title?: React.ReactNode
  intro?: React.ReactNode
  children?: React.ReactNode
  className?: string
  align?: 'center' | 'left'
  hue?: string
  tone?: Tone
  /** Rounds the top of the band so it overlaps the one above it. */
  curved?: boolean
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative py-20 md:py-28 lg:py-32',
        tones[tone],
        curved && 'rounded-t-[2.5rem] md:rounded-t-[4rem]',
        className,
      )}
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
                {label && (
                  <span className="eyebrow" style={hue ? { color: hue } : undefined}>
                    {label}
                  </span>
                )}
                {index !== undefined && (
                  <>
                    <span aria-hidden="true" className="h-px flex-1 bg-line-strong/70" />
                    <span
                      aria-hidden="true"
                      className="numeric rounded-full border border-line-strong px-2.5 py-0.5 text-[11px] font-semibold text-subtle"
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
                className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
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

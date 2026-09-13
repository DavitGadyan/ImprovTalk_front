'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/section'
import { Ticker } from '@/components/ui/ticker'
import { fadeUp, stagger, viewportOnce } from '@/lib/motion'
import type { Persona } from '@/content/personas'

const hues = [
  'var(--color-accent)',
  'var(--color-danger)',
  'var(--color-warn)',
  'var(--color-gold)',
]

/**
 * "It is fixable" — the reassurance beat, and for some personas the hook itself.
 * The second-language and out-of-practice variants lead with this section.
 *
 * Set a step larger than the rest of the page, and the four claims run past
 * once more as a line of display type, so nobody scrolls by them.
 */
export function Learnable({ persona, index }: { persona: Persona; index: number }) {
  const { label, title, intro, points } = persona.learnable
  return (
    <Section
      id="learnable"
      index={index}
      tone="canvas"
      label={label}
      title={title}
      intro={<span className="text-lg md:text-xl">{intro}</span>}
    >
      <Ticker items={points.map((p) => p.title)} className="mb-14 md:mb-20" />

      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-x-12 gap-y-12 sm:grid-cols-2"
      >
        {points.map((p, i) => (
          <motion.li key={p.title} variants={fadeUp}>
            {/* Colour on a dot, not a bar: a signal, not chrome. */}
            <span
              aria-hidden="true"
              className="mb-5 block size-2.5 rounded-full"
              style={{ backgroundColor: hues[i % hues.length] }}
            />
            <h3 className="text-xl font-bold text-ink md:text-2xl">{p.title}</h3>
            <p className="mt-3 max-w-md text-body leading-relaxed text-muted md:text-lg">{p.body}</p>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}

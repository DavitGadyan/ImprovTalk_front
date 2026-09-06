'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/section'
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
 */
export function Learnable({ persona, index }: { persona: Persona; index: number }) {
  const { label, title, intro, points } = persona.learnable
  return (
    <Section id="learnable" index={index} tone="canvas" label={label} title={title} intro={intro}>
      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-x-12 gap-y-9 sm:grid-cols-2"
      >
        {points.map((p, i) => (
          <motion.li key={p.title} variants={fadeUp}>
            {/* Colour on a dot, not a bar: a signal, not chrome. */}
            <span
              aria-hidden="true"
              className="mb-4 block size-2 rounded-full"
              style={{ backgroundColor: hues[i % hues.length] }}
            />
            <h3 className="text-body font-semibold text-ink">{p.title}</h3>
            <p className="mt-2.5 text-small text-muted">{p.body}</p>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}

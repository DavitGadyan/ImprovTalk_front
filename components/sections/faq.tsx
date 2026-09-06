'use client'

import { motion } from 'framer-motion'
import { Icon } from '@/components/ui/icon'
import { Section } from '@/components/ui/section'
import { fadeUp, stagger, viewportOnce } from '@/lib/motion'
import type { Persona } from '@/content/personas'

/**
 * Native <details>. No state, no library — keyboard accessible, works before
 * hydration, and findable by the browser's own in-page search, which a
 * div-based accordion is not.
 */
export function Faq({ persona, index }: { persona: Persona; index: number }) {
  return (
    <Section id="faq" index={index} label="Questions" title="Before you ask.">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-3xl divide-y divide-line border-y border-line"
      >
        {persona.faq.map((f) => (
          <motion.details key={f.q} variants={fadeUp} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 marker:hidden">
              <h3 className="text-body font-medium text-ink">{f.q}</h3>
              <Icon
                name="add"
                className="shrink-0 text-xl text-muted transition-transform duration-300 group-open:rotate-45"
              />
            </summary>
            <p className="mt-3 max-w-2xl pr-10 text-small text-muted">{f.a}</p>
          </motion.details>
        ))}
      </motion.div>
    </Section>
  )
}

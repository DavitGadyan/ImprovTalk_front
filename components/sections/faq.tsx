'use client'

import { motion } from 'framer-motion'
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
    <Section id="faq" index={index} tone="raised" curved label="Questions" title="Before you ask.">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-3xl divide-y divide-line border-y border-line"
      >
        {persona.faq.map((f) => (
          <motion.details key={f.q} variants={fadeUp} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[16px] font-medium text-ink marker:hidden">
              {f.q}
              <span
                aria-hidden="true"
                className="relative size-4 shrink-0 text-subtle transition-transform duration-300 group-open:rotate-45"
              >
                <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
              </span>
            </summary>
            <p className="mt-3 max-w-2xl pr-10 text-[15px] leading-relaxed text-muted">{f.a}</p>
          </motion.details>
        ))}
      </motion.div>
    </Section>
  )
}

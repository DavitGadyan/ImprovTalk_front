'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/section'
import { howItWorks } from '@/content/features'
import { fadeUp, stagger, viewportOnce } from '@/lib/motion'

export function HowItWorks() {
  return (
    <Section
      id="how"
      index={2}
      tone="canvas"
      label="How it works"
      title="Three minutes, start to feedback."
      intro="No setup, no scripts to memorise. Pick something to walk into and start talking."
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-8 md:grid-cols-3 md:gap-10"
      >
        {howItWorks.map((s) => (
          <motion.div key={s.step} variants={fadeUp} className="relative">
            <span
              className="numeric block font-[family-name:var(--font-display)] text-5xl font-semibold leading-none text-transparent"
              style={{ WebkitTextStroke: '1px var(--color-line-strong)' }}
              aria-hidden="true"
            >
              {s.step}
            </span>
            <h3 className="mt-5 text-xl font-semibold text-ink">{s.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

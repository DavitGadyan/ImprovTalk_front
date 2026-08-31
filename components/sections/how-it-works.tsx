'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/section'
import { ScenarioFilm } from '@/components/sections/scenario-film'
import { fadeUp, stagger, viewportOnce } from '@/lib/motion'
import type { Persona } from '@/content/personas'

/**
 * Mechanism, then proof of it.
 *
 * The scenario films used to be their own band, but they are a demonstration of
 * exactly what these three steps describe — showing them anywhere else made the
 * reader take the explanation on trust for another two screens.
 */
export function HowItWorks({ persona, index }: { persona: Persona; index: number }) {
  const { label, title, intro, steps } = persona.how
  return (
    <Section id="how" index={index} tone="deep" curved label={label} title={title} intro={intro}>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-8 md:grid-cols-3 md:gap-10"
      >
        {steps.map((s, i) => (
          <motion.div key={s.title} variants={fadeUp}>
            <span
              className="numeric block font-[family-name:var(--font-display)] text-5xl font-semibold leading-none text-transparent"
              style={{ WebkitTextStroke: '1px var(--color-line-strong)' }}
              aria-hidden="true"
            >
              0{i + 1}
            </span>
            <h3 className="mt-5 text-xl font-semibold text-ink">{s.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-16">
        <ScenarioFilm />
      </div>
    </Section>
  )
}

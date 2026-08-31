'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/section'
import { popIn, stagger, viewportOnce } from '@/lib/motion'
import type { Persona } from '@/content/personas'

/** "Recognise me" — the first job of the page. Copy comes from the persona. */
export function Problem({ persona, index }: { persona: Persona; index: number }) {
  const { label, title, intro, points } = persona.problem
  return (
    <Section id="problem" index={index} tone="raised" curved label={label} title={title} intro={intro}>
      <motion.ol
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3"
      >
        {points.map((p, i) => (
          <motion.li
            key={p.title}
            variants={popIn}
            className="bg-canvas p-7 transition-colors duration-300 hover:bg-white/[0.025] md:p-8"
          >
            <span className="numeric text-[11px] font-semibold tracking-[0.16em] text-subtle">
              0{i + 1}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-ink">{p.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.body}</p>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/section'
import { fadeUp, popIn, stagger, viewportOnce } from '@/lib/motion'

const points = [
  {
    title: 'You rehearse in your head',
    body: 'Where you are articulate, never interrupted, and the other person says exactly what you expected.',
  },
  {
    title: 'Then it happens live',
    body: 'They answer sideways. You fill the gap with "so, yeah" and hear yourself doing it.',
  },
  {
    title: 'And nobody tells you why',
    body: 'The conversation just quietly goes flat. No feedback, no replay, nothing to work on.',
  },
]

export function Gap() {
  return (
    <Section
      id="gap"
      index={1}
      tone="raised"
      curved
      label="Why it's hard"
      title={<>Reading about conversation doesn&rsquo;t make you better at it.</>}
      intro="Talking is a motor skill. It improves the way motor skills improve — repetition, under pressure, with someone telling you what actually went wrong."
    >
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

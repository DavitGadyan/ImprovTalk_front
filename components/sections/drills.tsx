'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/section'
import { drills } from '@/content/features'
import { fadeUp, staggerFast, viewportOnce } from '@/lib/motion'

export function Drills() {
  return (
    <Section
      id="drills"
      index={6}
      tone="raised"
      curved
      label="Solo drills"
      title="Sharpen one moment at a time."
      intro="Short, structured reps for the specific situation you keep getting wrong — not a whole conversation, just the part that matters."
    >
      <motion.ul
        variants={staggerFast}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
      >
        {drills.map((d) => (
          <motion.li key={d.id} variants={fadeUp} className="group bg-canvas p-6">
            <h3 className="text-[15px] font-semibold text-ink">{d.name}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">{d.note}</p>
            <code className="mt-4 block font-mono text-[10.5px] text-subtle">{d.id}</code>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}

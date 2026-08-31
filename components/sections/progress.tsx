'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/section'
import { fadeUp, stagger, viewportOnce } from '@/lib/motion'
import { AnimatedNumber } from '@/components/ui/animated-number'

const figures = [
  { label: 'Day streak', value: '12', hue: 'var(--color-learn)' },
  { label: 'Avg charisma', value: '71', hue: 'var(--color-accent)' },
  { label: 'Best session', value: '88', hue: 'var(--color-stats)' },
  { label: 'Sessions', value: '46', hue: 'var(--color-simulate)' },
]

/* A deterministic upward-drifting trend. No Math.random — the export and the
   browser must render identical markup. */
const trend = [38, 44, 41, 52, 49, 58, 61, 57, 66, 64, 73, 71, 78, 82]

export function Progress() {
  return (
    <Section
      id="progress"
      index={9}
      tone="deep"
      curved
      label="Your progress"
      hue="var(--color-stats)"
      title="Proof that it is working."
      intro="One session tells you very little. Forty tells you whether the thing you have been working on actually moved."
    >
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <motion.dl
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-8"
        >
          {figures.map((f) => (
            <motion.div key={f.label} variants={fadeUp}>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
                {f.label}
              </dt>
              <dd
                className="numeric mt-2 font-[family-name:var(--font-display)] text-5xl font-semibold leading-none"
                style={{ color: f.hue }}
              >
                <AnimatedNumber value={Number(f.value)} />
              </dd>
            </motion.div>
          ))}
        </motion.dl>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="panel p-6 md:p-8"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
            Charisma score · last 14 sessions
          </p>
          <div className="mt-7 flex h-40 items-end gap-1.5" aria-hidden="true">
            {trend.map((v, i) => (
              <motion.span
                key={i}
                className="flex-1 rounded-t-sm"
                style={{
                  backgroundColor:
                    i === trend.length - 1 ? 'var(--color-stats)' : 'var(--color-raised)',
                }}
                initial={{ height: 0 }}
                whileInView={{ height: `${v}%` }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>
          <p className="mt-5 text-sm text-muted">
            <span className="font-medium text-stats">+18 points</span> over six weeks, mostly from
            cutting fillers and slowing down.
          </p>
        </motion.div>
      </div>
    </Section>
  )
}

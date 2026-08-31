'use client'

import { motion } from 'framer-motion'
import { Section, Reveal } from '@/components/ui/section'
import { venues } from '@/content/features'
import { stats } from '@/content/catalogs'
import { fadeUp, staggerFast, viewportOnce } from '@/lib/motion'

const dials = [
  { name: 'Their mood', options: ['Good', 'Neutral', 'Bad'], active: 1 },
  { name: 'How open', options: ['Open', 'Neutral', 'Guarded', 'Cold'], active: 2 },
  { name: 'Guard level', options: ['Low', 'Medium', 'High'], active: 1 },
  { name: 'Friends there', options: ['1-on-1', 'One friend', 'A group'], active: 1 },
]

export function LivePractice() {
  return (
    <Section
      id="practice"
      index={4}
      tone="deep"
      curved
      label="Live practice"
      hue="var(--color-practice)"
      title={<>Eighteen places. One conversation at a time.</>}
      intro={`${stats.liveScenarios} written scenarios across ${stats.liveVenues} venues — and you set who is standing in front of you before you start.`}
    >
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <motion.ul
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-wrap gap-2"
          >
            {venues.map((v) => (
              <motion.li
                key={v}
                variants={fadeUp}
                className="rounded-full border border-line-strong px-3.5 py-1.5 text-[13px] text-ink-soft"
              >
                {v}
              </motion.li>
            ))}
          </motion.ul>

          <Reveal delay={0.1}>
            <p className="mt-10 max-w-xl text-[15px] leading-relaxed text-muted">
              It answers in voice, in real time. It hesitates, it interrupts, and it can decide it
              is not interested — because a partner who agrees with everything teaches you nothing.
              Stall out and you can ask for a hint without leaving the scene.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="panel p-6 md:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
              Before you start
            </p>
            <div className="mt-6 space-y-6">
              {dials.map((d) => (
                <div key={d.name}>
                  <p className="mb-2.5 text-[13px] font-medium text-ink-soft">{d.name}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {d.options.map((o, i) => (
                      <span
                        key={o}
                        className={
                          i === d.active
                            ? 'rounded-full bg-ink px-3 py-1.5 text-[12px] font-medium text-canvas'
                            : 'rounded-full border border-line-strong px-3 py-1.5 text-[12px] text-subtle'
                        }
                      >
                        {o}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

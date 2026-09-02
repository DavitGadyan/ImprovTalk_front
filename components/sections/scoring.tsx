'use client'

import { motion } from 'framer-motion'
import { Section, Reveal } from '@/components/ui/section'
import { DeviceFrame, DeviceStage } from '@/components/ui/device-frame'
import { ScoreBar, Meter } from '@/components/ui/meters'
import { pillars, deliveryMeters, exampleCharismaScore } from '@/content/features'
import { fadeUp, stagger, viewportOnce } from '@/lib/motion'
import type { Persona } from '@/content/personas'

/* Deterministic upward drift. No Math.random — the export and the browser must
   render identical markup. */
const trend = [38, 44, 41, 52, 49, 58, 61, 57, 66, 64, 73, 71, 78, 82]

/**
 * The trust beat, and the one thing competitors do not have.
 *
 * The progress chart used to be its own section. It belongs here: it is the
 * evidence that the score means something over time, and on its own it was a
 * chart with no argument attached.
 */
export function Scoring({ persona, index }: { persona: Persona; index: number }) {
  const { label, title, intro, proof } = persona.scoring
  return (
    <Section
      id="scoring"
      index={index}
      tone="brand"
      curved
      label={label}
      hue="var(--color-accent)"
      title={title}
      intro={intro}
    >
      <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <DeviceStage>
            <ScoreScreen />
          </DeviceStage>
        </Reveal>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.div variants={fadeUp} className="space-y-5">
            {pillars.map((p) => (
              <ScoreBar key={p.name} name={p.name} value={p.value} weight={p.weight} hue={p.hue} />
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="panel mt-9 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
              Tap any score
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-lg leading-snug text-ink">
              &ldquo;7 fillers in 3 minutes; pace 142&nbsp;wpm; target band 130&ndash;160.&rdquo;
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {deliveryMeters.map((m) => (
              <Meter key={m.name} name={m.name} note={m.note} value={m.value} />
            ))}
          </motion.div>

          {/* Absorbed from the old progress section. */}
          <motion.div variants={fadeUp} className="panel mt-9 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
              Last 14 sessions
            </p>
            <div className="mt-5 flex h-24 items-end gap-1.5" aria-hidden="true">
              {trend.map((v, i) => (
                <motion.span
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{
                    backgroundColor: i === trend.length - 1 ? 'var(--color-stats)' : 'var(--color-raised)',
                  }}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${v}%` }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </div>
            <p className="mt-4 text-sm text-muted">{proof}</p>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}

function ScoreScreen() {
  return (
    <DeviceFrame tilt="left" label="ImprovTalk score result screen">
      <div className="pb-4 pt-1 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-subtle">
          Charisma score
        </p>
        <p className="numeric mt-2 font-[family-name:var(--font-display)] text-[64px] font-semibold leading-none text-ink">
          {exampleCharismaScore}
        </p>
        <p className="mt-2 text-[11px] text-stats">+6 on your baseline</p>
      </div>

      <div className="panel space-y-4 p-4">
        {pillars.map((p) => (
          <ScoreBar key={p.name} name={p.name} value={p.value} hue={p.hue} />
        ))}
      </div>

      <div className="mt-3 panel p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-practice">
          Say it better
        </p>
        <p className="mt-2 text-[12px] leading-relaxed text-subtle line-through decoration-practice/50">
          &ldquo;So, yeah, that&rsquo;s pretty cool I guess.&rdquo;
        </p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">
          &ldquo;Forty minutes each way — what do you do with that time?&rdquo;
        </p>
      </div>
    </DeviceFrame>
  )
}

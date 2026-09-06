'use client'

import { motion } from 'framer-motion'
import { Section, Reveal } from '@/components/ui/section'
import { ScoreBar, Meter } from '@/components/ui/meters'
import { RENDERS } from '@/lib/renders'
import { pillars, deliveryMeters } from '@/content/features'
import { fadeUp, stagger, viewportOnce } from '@/lib/motion'
import type { Persona } from '@/content/personas'

/* Deterministic upward drift. No Math.random — the export and the browser must
   render identical markup. */
const trend = [38, 44, 41, 52, 49, 58, 61, 57, 66, 64, 73, 71, 78, 82]

/**
 * The trust beat, and the one thing competitors do not have.
 *
 * The score screen on the left is the app's own (cropped from the case-study
 * render, not drawn); the bars on the right are how that number is built —
 * the three pillars and their real weights, then the delivery meters that come
 * from the recording. The progress chart used to be its own section. It belongs
 * here: it is the evidence that the score means something over time.
 */
export function Scoring({ persona, index }: { persona: Persona; index: number }) {
  const { label, title, intro, proof } = persona.scoring
  const r = RENDERS['score-screen']
  return (
    <Section id="scoring" index={index} label={label} title={title} intro={intro}>
      <div className="grid items-start gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="mx-auto w-full max-w-[22rem] lg:mx-0">
          <img
            src={r.src}
            srcSet={r.srcSet}
            sizes="(min-width: 1024px) 22rem, 100vw"
            width={r.width}
            height={r.height}
            alt={r.alt}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-card"
          />
        </Reveal>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.div variants={fadeUp} className="space-y-5">
            {pillars.map((p) => (
              <ScoreBar key={p.name} name={p.name} value={p.value} weight={p.weight} hue={p.hue} />
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="panel mt-9 p-6">
            <p className="eyebrow">Tap any score</p>
            <p className="mt-3 text-lg font-medium leading-snug text-ink">
              &ldquo;7 fillers in 3 minutes; pace 142&nbsp;wpm; target band 130&ndash;160.&rdquo;
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {deliveryMeters.map((m) => (
              <Meter key={m.name} name={m.name} note={m.note} value={m.value} />
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="panel mt-9 p-6">
            <p className="eyebrow">Last 14 sessions</p>
            <div className="mt-5 flex h-24 items-end gap-1.5" aria-hidden="true">
              {trend.map((v, i) => (
                <motion.span
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{
                    backgroundColor:
                      i === trend.length - 1 ? 'var(--color-success)' : 'var(--color-surface-elev)',
                  }}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${v}%` }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </div>
            <p className="mt-4 text-small text-muted">{proof}</p>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}

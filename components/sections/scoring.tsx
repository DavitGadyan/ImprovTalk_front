'use client'

import { motion } from 'framer-motion'
import { Section, Reveal } from '@/components/ui/section'
import { DeviceFrame, DeviceStage } from '@/components/ui/device-frame'
import { ScoreBar, Meter } from '@/components/ui/meters'
import { pillars, deliveryMeters } from '@/content/features'
import { fadeUp, stagger, viewportOnce } from '@/lib/motion'

export function Scoring() {
  return (
    <Section
      id="scoring"
      index={4}
      tone="brand"
      curved
      label="Every score shows its work"
      hue="var(--color-accent)"
      title="A number you can argue with."
      intro="Most coaching apps hand you a verdict. This one hands you the evidence — every score opens up to the raw measurements behind it, so you can disagree on the facts."
    >
      <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <DeviceStage>
            <ScoreScreen />
          </DeviceStage>
        </Reveal>

        <div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.h3 variants={fadeUp} className="display-md text-ink">
              The formula is fixed and public.
            </motion.h3>
            <motion.p variants={fadeUp} className="mt-4 text-[15px] leading-relaxed text-muted">
              The Charisma Score is computed on the server from your audio and transcript, with
              weights that never move. Same session, same number — every time.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 space-y-5">
              {pillars.map((p) => (
                <ScoreBar
                  key={p.name}
                  name={p.name}
                  value={p.value}
                  weight={p.weight}
                  hue={p.hue}
                />
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 panel p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
                Tap any score
              </p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-lg leading-snug text-ink">
                &ldquo;7 fillers in 3 minutes; pace 142&nbsp;wpm; target band 130&ndash;160.&rdquo;
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Delivery is measured, not guessed. Pace, pauses, filler count, pitch and volume
                steadiness come from acoustic analysis of the recording itself.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {deliveryMeters.map((m) => (
                <Meter key={m.name} name={m.name} note={m.note} value={m.value} />
              ))}
            </motion.div>
          </motion.div>
        </div>
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
          77
        </p>
        <p className="mt-2 text-[11px] text-stats">+6 on your baseline</p>
      </div>

      <div className="panel space-y-4 p-4">
        {pillars.map((p) => (
          <ScoreBar key={p.name} name={p.name} value={p.value} hue={p.hue} />
        ))}
      </div>

      <div className="mt-3 panel p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-learn">
          What worked
        </p>
        <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">
          You picked up the detail about her commute and made it the next question. That is the
          whole move.
        </p>
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

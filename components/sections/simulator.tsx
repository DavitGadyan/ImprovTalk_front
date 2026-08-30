'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Section, Reveal } from '@/components/ui/section'
import { stats } from '@/content/catalogs'
import { fadeUp, stagger, viewportOnce } from '@/lib/motion'

/**
 * Model rows mirror the picker in apps/mobile/app/cafe-simulator.
 *
 * Deliberately no prices or benchmark grades: per-token pricing changes often
 * enough that any figure printed here would be wrong within months, and the
 * app's own letter grades are computed live. The relative spread is the point,
 * so it is shown as a spectrum instead of numbers we would have to maintain.
 */
const models = [
  { name: 'Claude Opus 4.7', depth: 5 },
  { name: 'GPT-5', depth: 5 },
  { name: 'Claude Sonnet 4.6', depth: 4 },
  { name: 'Claude Haiku 4.5', depth: 2 },
  { name: 'GPT-5 nano', depth: 1 },
]

export function Simulator() {
  return (
    <Section
      id="simulator"
      index={5}
      tone="canvas"
      label="Watch it played out"
      hue="var(--color-simulate)"
      title={<>{stats.simScenarios} scenarios, run by AI, graded by AI.</>}
      intro={`Not every rep has to be yours. Set two AI characters loose on a scenario across ${stats.simVenues} venues, watch it round by round, and read the coach's notes on what turned it.`}
    >
      {/*
        The one piece of existing art that survives this palette — a generated
        illustration from the app's own assets. The other three in that folder
        are warm flat-vector work in an unrelated style and would break the
        system, so they are deliberately unused.
      */}
      <Reveal>
        <div className="relative mb-14 overflow-hidden rounded-2xl border border-line">
          <Image
            src="/hero-minds.jpg"
            alt="Two figures in profile facing each other, a glowing outline of a brain between them"
            width={1536}
            height={1024}
            className="h-56 w-full object-cover object-center md:h-72"
            priority={false}
          />
          {/* Fade the plate into the page so it reads as part of the canvas. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, var(--color-canvas) 2%, transparent 55%), linear-gradient(to right, var(--color-canvas) 0%, transparent 28%, transparent 72%, var(--color-canvas) 100%)',
            }}
          />
        </div>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="panel overflow-hidden">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
                Pick the model
              </p>
              <p className="text-[11px] text-subtle">Faster &middot;&middot;&middot; Deeper</p>
            </div>
            <ul>
              {models.map((m, i) => (
                <li
                  key={m.name}
                  className={`flex items-center justify-between gap-4 px-5 py-3.5 ${
                    i === 0 ? 'bg-raised/40' : ''
                  }`}
                >
                  <span className="truncate text-[13.5px] text-ink">{m.name}</span>
                  <span className="flex shrink-0 items-center gap-1" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, d) => (
                      <span
                        key={d}
                        className="size-1.5 rounded-full"
                        style={{
                          backgroundColor:
                            d < m.depth ? 'var(--color-simulate)' : 'var(--color-raised)',
                        }}
                      />
                    ))}
                  </span>
                  <span className="sr-only">{`Depth ${m.depth} of 5`}</span>
                </li>
              ))}
            </ul>
            <p className="border-t border-line px-5 py-3.5 text-[11px] leading-relaxed text-subtle">
              The app shows live grade, latency and cost per model before you run.
            </p>
          </div>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col justify-center"
        >
          <motion.p variants={fadeUp} className="text-[15px] leading-relaxed text-muted">
            The simulator is where the scoring rubric earns its keep. A coach, a panel and a
            director grade every round, so you see the same evidence applied to someone else&rsquo;s
            conversation — which is a much easier place to notice a mistake than in your own.
          </motion.p>
          <motion.dl variants={fadeUp} className="mt-10 grid grid-cols-2 gap-8">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
                Scenarios
              </dt>
              <dd className="numeric mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold text-ink">
                {stats.simScenarios}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
                Venues
              </dt>
              <dd className="numeric mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold text-ink">
                {stats.simVenues}
              </dd>
            </div>
          </motion.dl>
        </motion.div>
      </div>
    </Section>
  )
}

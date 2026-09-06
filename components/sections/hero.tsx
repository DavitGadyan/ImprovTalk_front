'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { DeviceCluster } from '@/components/ui/device-frame'
import { InstallBlock } from '@/components/ui/install'
import { Waveform } from '@/components/ui/meters'
import { fadeUp, stagger } from '@/lib/motion'
import type { Persona } from '@/content/personas'

export function Hero({ persona }: { persona: Persona }) {
  /*
   * The device drifts up slightly as the page scrolls, at a different rate from
   * the text beside it. Small on purpose — 60px over a full viewport — because
   * parallax that outruns the scroll reads as a broken page rather than depth.
   *
   * useReducedMotion returns null on the server and resolves after hydration,
   * so the transform is neutralised rather than conditionally applied; swapping
   * the hook call itself would break the rules of hooks.
   */
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const deviceY = useTransform(scrollY, [0, 900], [0, reduced ? 0 : -60])

  const { eyebrow, headline, sub, note } = persona.hero

  return (
    <section className="relative overflow-hidden pb-20 pt-8 md:pb-28 md:pt-12">
      {/*
        A lighter stage behind the device.

        The phone bezel is #05080f on a #0b1220 canvas — barely three points of
        luminance apart, so the device had no edge to read against and dissolved
        into the page. This puts a lighter plate underneath it, with the violet
        bloom on top, so the dark screen finally has something to sit on. The
        rest of the page stays near-black.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-6%] top-[2%] hidden h-[46rem] w-[42rem] rounded-[6rem] lg:block"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 40%, #1b2440 0%, #141c30 45%, transparent 78%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[-8%] hidden size-[46rem] rounded-full opacity-40 blur-[120px] lg:block"
        style={{
          background:
            'radial-gradient(circle, rgba(175,82,222,0.5) 0%, rgba(88,86,214,0.22) 42%, transparent 70%)',
        }}
      />

      <div className="container-page relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          {/*
            Rendered at its final state, not animated in.

            This column starts above the fold on every load, so a fade from
            opacity 0 buys a reveal nobody is there to see and costs the metric
            that matters: Lighthouse cannot record the LCP of an invisible
            element, so the h1's paint was being deferred until the JS had
            downloaded, hydrated and run a 0.55s animation — 3.2s instead of
            1.2s on a throttled phone. Sections below the fold still animate on
            scroll, where the reveal is the point.
          */}
          <motion.div variants={stagger} initial="visible" animate="visible">
            <motion.p variants={fadeUp} className="mb-6">
              <span className="eyebrow">{eyebrow}</span>
            </motion.p>

            <motion.h1 variants={fadeUp} className="display-xl text-ink">
              {headline.top}
              <br />
              {headline.bottom}
              <span className="relative inline-block">
                {headline.emphasis}
                {/* Gradient place 1 of 3. */}
                <span
                  aria-hidden="true"
                  className="rule-brand absolute -bottom-1.5 left-0 w-full md:-bottom-2"
                />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-lg text-lg leading-relaxed text-muted"
            >
              {sub}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8" id="hero-cta">
              <InstallBlock />
            </motion.div>

            <motion.p variants={fadeUp} className="mt-6 text-sm text-subtle">
              {note}
            </motion.p>
          </motion.div>

          {/* Also above the fold, and a large LCP candidate in its own right.
              The scroll parallax stays — it does not gate the first paint. */}
          <motion.div style={{ y: deviceY }}>
            <DeviceCluster
              frontLabel="ImprovTalk live practice screen"
              front={<LivePracticeScreen />}
              back={<HomeScreen />}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/** A live-practice screen, rebuilt in the app's own palette. */
function LivePracticeScreen() {
  return (
    <>
      <div className="flex items-center justify-between pb-4 pt-1">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-practice">
          Live practice
        </span>
        <span className="numeric text-[11px] text-subtle">02:14</span>
      </div>

      <div className="panel p-3.5">
        <div className="flex items-center gap-3">
          <div
            className="size-9 shrink-0 rounded-full"
            style={{ background: 'linear-gradient(140deg, #ff9500, #ff2d55 55%, #af52de)' }}
          />
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium text-ink">Coffee shop · queue</p>
            <p className="truncate text-[11px] text-subtle">Guarded · warming up</p>
          </div>
        </div>

        <p className="mt-3.5 text-[12.5px] leading-relaxed text-ink-soft">
          &ldquo;It&rsquo;s the only place near work that gets the milk right. You&rsquo;re not from
          around here, are you?&rdquo;
        </p>
      </div>

      <div className="mt-3 rounded-2xl border border-accent/25 bg-accent/10 p-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">Hint</p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">
          She gave you an opening. Answer it, then hand one back.
        </p>
      </div>

      <div className="mt-5 flex flex-col items-center gap-3">
        <Waveform bars={22} className="w-full" />
        <div
          className="flex h-14 w-full items-center justify-center rounded-full text-[13px] font-semibold text-white"
          style={{ background: 'linear-gradient(100deg, #ff2d55, #af52de)' }}
        >
          Hold to talk
        </div>
        <p className="text-[10.5px] text-subtle">Release to send · cut in anytime</p>
      </div>
    </>
  )
}

/** The home screen, shown on the back device of the cluster. */
/** Streak, score and rate, as glyphs rather than emoji. */
const STATS = [
  { label: '12', hue: 'var(--color-learn)', d: 'M13 2L4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5z' },
  { label: '71', hue: 'var(--color-accent)', d: 'M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5z' },
  { label: '38%', hue: 'var(--color-practice)', d: 'M12 21c3.9 0 6.5-2.5 6.5-6 0-3.9-3.5-5.6-3.5-9.5-2 1-3 2.7-3 4.5-1.2-.6-1.8-1.7-1.8-3C8.2 8.4 5.5 10.6 5.5 15c0 3.5 2.6 6 6.5 6z' },
] as const

function HomeScreen() {
  const tiles = [
    { name: 'Simulate', hue: 'var(--color-simulate)' },
    { name: 'Practice', hue: 'var(--color-practice)' },
    { name: 'Learn', hue: 'var(--color-learn)' },
    { name: 'Drills', hue: 'var(--color-accent)' },
    { name: 'Stats', hue: 'var(--color-stats)' },
    { name: 'History', hue: '#8e8e93' },
  ]
  return (
    <>
      {/* Drawn, not typed. Emoji render as a different typeface on every OS —
          colour, weight and baseline all shift — so a mockup that is meant to
          look like the app looks like three pasted stickers instead. */}
      <div className="flex items-center justify-between pb-4 pt-1">
        {STATS.map((s) => (
          <span key={s.label} className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="size-3" fill="none" aria-hidden="true">
              <path
                d={s.d}
                stroke={s.hue}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="numeric text-[11px] text-ink-soft">{s.label}</span>
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {tiles.map((t) => (
          <div key={t.name} className="panel p-3">
            <span className="block size-6 rounded-lg" style={{ backgroundColor: t.hue }} />
            <span className="mt-2.5 block text-[12px] font-medium text-ink">{t.name}</span>
          </div>
        ))}
      </div>
      <div className="panel mt-3 p-3">
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-subtle">
          Last run
        </p>
        <p className="mt-1.5 text-[12px] text-ink-soft">Coffee shop · 77/100</p>
      </div>
    </>
  )
}

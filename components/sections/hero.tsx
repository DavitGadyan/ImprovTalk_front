'use client'

import { motion } from 'framer-motion'
import { DeviceCluster } from '@/components/ui/device-frame'
import { InstallBlock } from '@/components/ui/install'
import { Waveform } from '@/components/ui/meters'
import { fadeUp, stagger } from '@/lib/motion'
import { stats } from '@/content/catalogs'

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-8 md:pb-28 md:pt-12">
      {/*
        A single soft violet bloom behind the phone. This is light, not a
        gradient wash — it sits under one element and never touches the type.
      */}
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
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="mb-6">
              <span className="eyebrow">Practice out loud</span>
            </motion.p>

            <motion.h1 variants={fadeUp} className="display-xl text-ink">
              Talk like you&rsquo;ve
              <br />
              done this{' '}
              <span className="relative inline-block">
                before.
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
              A voice-first AI coach you actually speak to. Hold the button, have the conversation,
              and get scored on what you said <em className="not-italic text-ink-soft">and</em> how
              you said it.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8">
              <InstallBlock />
            </motion.div>

            <motion.p variants={fadeUp} className="mt-6 text-sm text-subtle">
              Free to start — {stats.freeWeekly} conversations a week. No card to try it.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
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
      <div className="flex items-center justify-between pb-4 pt-1">
        <span className="numeric text-[11px] text-ink-soft">⚡ 12</span>
        <span className="numeric text-[11px] text-ink-soft">★ 71</span>
        <span className="numeric text-[11px] text-ink-soft">🔥 38%</span>
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

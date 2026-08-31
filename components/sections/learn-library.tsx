'use client'

import { motion } from 'framer-motion'
import { Section, Reveal } from '@/components/ui/section'
import { catalogs, TOTAL_LIBRARY_ITEMS, stats } from '@/content/catalogs'
import { fadeUp, staggerFast, viewportOnce } from '@/lib/motion'
import { AnimatedNumber } from '@/components/ui/animated-number'

export function LearnLibrary() {
  return (
    <Section
      id="library"
      index={8}
      tone="canvas"
      label="Something to talk about"
      hue="var(--color-learn)"
      title={<><AnimatedNumber value={TOTAL_LIBRARY_ITEMS} /> things worth mentioning.</>}
      intro="Half of being interesting is having something to say. The library is the part of the app you use when you are not practising — small, specific things you can actually bring up."
    >
      <motion.ul
        variants={staggerFast}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
      >
        {catalogs.map((c) => (
          <motion.li
            key={c.name}
            variants={fadeUp}
            className="group flex items-baseline justify-between gap-4 bg-canvas px-5 py-4 transition-colors duration-300 hover:bg-white/[0.025]"
          >
            <span className="min-w-0">
              <span
                className="block text-[10px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: c.hue ?? 'var(--color-subtle)' }}
              >
                {c.label}
              </span>
              <span className="mt-1 block truncate text-[14px] text-ink">{c.name}</span>
            </span>
            <span className="numeric shrink-0 font-[family-name:var(--font-display)] text-lg font-semibold text-ink-soft">
              <AnimatedNumber value={c.count} duration={900} />
            </span>
          </motion.li>
        ))}
      </motion.ul>

      <Reveal delay={0.1}>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-subtle">
          Plus {stats.countries} countries with {stats.facePhotos} faces and {stats.audioClips}{' '}
          audio clips for guessing where someone is from, and a live coach you can just call and
          talk to — no score, no pressure.
        </p>
      </Reveal>
    </Section>
  )
}

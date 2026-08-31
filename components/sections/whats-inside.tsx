'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Section, Reveal } from '@/components/ui/section'
import { AnimatedNumber } from '@/components/ui/animated-number'
import { catalogs, stats, TOTAL_LIBRARY_ITEMS } from '@/content/catalogs'
import { fadeUp, staggerFast, viewportOnce } from '@/lib/motion'
import type { Persona } from '@/content/personas'

/**
 * Depth, in one section.
 *
 * Live practice, the simulator, the drills and the library were four separate
 * sections making a single point: there is a real product behind this. Four
 * arguments for one claim is three too many, so they are one stat row and the
 * number wall — which does the persuading on its own, because these counts are
 * not the kind of thing anyone fakes.
 *
 * Every figure is counted from the app's shipped data files.
 */
const headline = [
  { value: stats.liveScenarios, label: 'live scenarios' },
  { value: stats.simScenarios, label: 'simulator runs' },
  { value: TOTAL_LIBRARY_ITEMS, label: 'things to talk about' },
  { value: 3, label: 'languages' },
]

export function WhatsInside({ persona, index }: { persona: Persona; index: number }) {
  const { label, title, intro } = persona.inside
  return (
    <Section id="inside" index={index} tone="canvas" label={label} hue="var(--color-learn)" title={title} intro={intro}>
      <Reveal>
        <div className="relative mb-14 overflow-hidden rounded-2xl border border-line">
          <Image
            src="/hero-minds.jpg"
            alt="Two figures in profile facing each other, a glowing outline of a brain between them"
            width={1536}
            height={1024}
            className="h-44 w-full object-cover object-center md:h-56"
          />
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

      <motion.dl
        variants={staggerFast}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mb-14 grid grid-cols-2 gap-8 lg:grid-cols-4"
      >
        {headline.map((h) => (
          <motion.div key={h.label} variants={fadeUp}>
            <dd className="numeric font-[family-name:var(--font-display)] text-4xl font-semibold text-ink md:text-5xl">
              <AnimatedNumber value={h.value} />
            </dd>
            <dt className="mt-2 text-[13px] text-subtle">{h.label}</dt>
          </motion.div>
        ))}
      </motion.dl>

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
            className="flex items-baseline justify-between gap-4 bg-canvas px-5 py-4 transition-colors duration-300 hover:bg-white/[0.025]"
          >
            <span className="truncate text-[14px] text-ink">{c.name}</span>
            <span className="numeric shrink-0 font-[family-name:var(--font-display)] text-lg font-semibold text-ink-soft">
              <AnimatedNumber value={c.count} duration={900} />
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}

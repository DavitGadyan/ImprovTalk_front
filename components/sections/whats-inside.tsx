'use client'

import { motion } from 'framer-motion'
import { Section, Reveal } from '@/components/ui/section'
import { AnimatedNumber } from '@/components/ui/animated-number'
import { RENDERS } from '@/lib/renders'
import { KNOWLEDGE, catalogs, stats, TOTAL_LIBRARY_ITEMS } from '@/content/catalogs'
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
  { value: KNOWLEDGE.principles, label: 'techniques to learn' },
  { value: TOTAL_LIBRARY_ITEMS, label: 'things to talk about' },
  { value: 3, label: 'languages' },
]

/*
 * The Learn half of this section.
 *
 * Two different things sit under one heading and they answer different
 * questions: the method teaches you *how* to talk, the library gives you
 * *something* to talk about. Stating them separately is the point — the
 * catalogue counts alone read as trivia rather than as a reason to open the app.
 */
const learn = [
  {
    title: `${KNOWLEDGE.principles} techniques, one at a time`,
    body: `Distilled from ${KNOWLEDGE.sources} sources on conversation, rapport, humour and reading a room. You get the core of a shelf of books without reading the shelf, and each one arrives in the scene where you would actually use it.`,
    hue: 'var(--color-warn)',
  },
  {
    title: 'Art, music, film, places, people',
    body: 'Paintings and sculpture, songs and genres, films and the scenes worth quoting, world attractions, gestures, symbols, what jobs are really like. Enough to have something to say when the conversation turns to any of it.',
    hue: 'var(--color-accent)',
  },
  {
    title: 'Read the room, on purpose',
    body: 'Deduction, gestures, accents, insider terms, what different countries do differently. The observation half of a conversation, which is the half nobody teaches.',
    hue: 'var(--color-gold)',
  },
]

export function WhatsInside({ persona, index }: { persona: Persona; index: number }) {
  const { label, title, intro } = persona.inside
  const r = RENDERS['home']
  return (
    <Section id="inside" index={index} label={label} title={title} intro={intro}>
      {/* The Home screen beside the numbers: six destinations, and how much sits
          behind each. The render is the app's, not a drawing of it. */}
      <div className="mb-14 grid items-center gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
        <Reveal className="mx-auto w-full max-w-[16rem] lg:mx-0">
          <img
            src={r.src}
            srcSet={r.srcSet}
            sizes="(min-width: 1024px) 16rem, 60vw"
            width={r.width}
            height={r.height}
            alt={r.alt}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-card"
          />
        </Reveal>

        <motion.dl
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-8"
        >
          {headline.map((h) => (
            <motion.div key={h.label} variants={fadeUp}>
              <dd className="numeric text-4xl font-bold text-ink md:text-5xl">
                <AnimatedNumber value={h.value} />
              </dd>
              <dt className="mt-2 text-small text-muted">{h.label}</dt>
            </motion.div>
          ))}
        </motion.dl>
      </div>

      <motion.div
        variants={staggerFast}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mb-14 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3"
      >
        {learn.map((l) => (
          <motion.div key={l.title} variants={fadeUp} className="bg-canvas p-6">
            {/* Colour on a dot, not a bar: a signal, not chrome. */}
            <span
              aria-hidden="true"
              className="mb-4 block size-2 rounded-full"
              style={{ background: l.hue }}
            />
            <h3 className="text-body font-semibold text-ink">{l.title}</h3>
            <p className="mt-2.5 text-small text-muted">{l.body}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.ul
        variants={staggerFast}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
      >
        {catalogs.map((c) => (
          <motion.li
            key={c.name}
            variants={fadeUp}
            className="flex items-baseline justify-between gap-4 bg-canvas px-5 py-4 transition-colors duration-300 hover:bg-surface"
          >
            <span className="truncate text-small text-ink">{c.name}</span>
            <span className="numeric shrink-0 text-lg font-bold text-ink">
              <AnimatedNumber value={c.count} duration={900} />
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}

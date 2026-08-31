'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/section'
import { fadeUp, stagger, viewportOnce } from '@/lib/motion'

/**
 * Why practising alone works.
 *
 * This is the core argument of the product, so it sits early rather than being
 * buried. Language is deliberately plain — short words, short sentences — because
 * the reader is often someone who finds conversation hard, and dense marketing
 * prose is the wrong register for that.
 *
 * The three-language claim is verified: a live session takes a
 * `conversation_language` of english | spanish | russian, and the AI partner is
 * instructed to reply only in it. Note what is NOT claimed — the app's own
 * interface is English only, and the 195 nationalities change her accent in
 * English, not the language she speaks.
 */
const points = [
  {
    title: 'Practise in three languages',
    body: 'English, Spanish or Russian. Pick one before you start and she answers only in that language. Your feedback comes back in it too.',
    hue: 'var(--color-accent)',
  },
  {
    title: 'Nobody is watching',
    body: 'It is your phone, in your room. No stranger to face, no friend to explain yourself to. You can be bad at it in private, which is the only way anyone gets good at it.',
    hue: 'var(--color-practice)',
  },
  {
    title: 'On your own schedule',
    body: 'After work. Late at night. Sunday morning. You do not have to go out to practise going out, and you do not have to wait for the weekend.',
    hue: 'var(--color-learn)',
  },
  {
    title: 'As many tries as you want',
    body: 'Run the same opening twenty times and hear what changes. That much repetition does not exist in real life — you get one go, then the moment is gone.',
    hue: 'var(--color-simulate)',
  },
  {
    title: 'Warm up before it counts',
    body: 'Do two or three rounds before you head out, so you arrive already talking. Most people use the first real person of the night as their warm-up.',
    hue: 'var(--color-stats)',
  },
  {
    title: 'Fixes the things that actually go wrong',
    body: 'Mumbling. Talking too fast. Going blank. These are the ordinary problems beginners have, and they are the ones repetition fixes fastest.',
    hue: 'var(--color-accent)',
  },
]

export function WhyAloneWorks() {
  return (
    <Section
      id="why"
      index={3}
      tone="raised"
      curved
      label="Why practising alone works"
      title="The hard part is getting enough tries."
      intro="Real life gives you one attempt, no replay, and no idea what went wrong. This gives you as many as you want, in private, with the answer at the end."
    >
      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {points.map((p) => (
          <motion.li key={p.title} variants={fadeUp}>
            <span
              aria-hidden="true"
              className="mb-4 block h-0.5 w-9 rounded-full"
              style={{ backgroundColor: p.hue }}
            />
            <h3 className="text-[17px] font-semibold text-ink">{p.title}</h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{p.body}</p>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}

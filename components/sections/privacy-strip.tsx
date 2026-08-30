'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Section } from '@/components/ui/section'
import { fadeUp, stagger, viewportOnce } from '@/lib/motion'

/* Every claim here is from ImprovTalk/docs/privacy.md. Do not add one that isn't. */
const promises = [
  {
    title: 'Audio is deleted in 24 hours',
    body: 'Recordings upload only when you end a session, and are hard-deleted 24 hours after scoring finishes.',
  },
  {
    title: 'The microphone is off outside a session',
    body: 'No background listening, no ambient capture. It records on the session screen and nowhere else.',
  },
  {
    title: 'No contacts, calendar, photos or location',
    body: 'None of it is collected. There are no advertising SDKs and no analytics SDKs that ingest your transcripts.',
  },
  {
    title: 'You can take it all back',
    body: 'Export a full JSON dump of your sessions, delete a single conversation, or delete the account outright.',
  },
]

export function PrivacyStrip() {
  return (
    <Section
      id="privacy"
      index={9}
      tone="canvas"
      label="Your voice, your data"
      title="Audio is deleted 24 hours after scoring."
      intro="You are handing an app recordings of yourself trying and failing to be charming. That deserves a straight answer about where it goes."
    >
      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-x-12 gap-y-8 sm:grid-cols-2"
      >
        {promises.map((p) => (
          <motion.li key={p.title} variants={fadeUp} className="border-l-2 border-line pl-5">
            <h3 className="text-[15px] font-semibold text-ink">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
          </motion.li>
        ))}
      </motion.ul>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-10 text-sm text-subtle"
      >
        The full detail is in the{' '}
        <Link href="/privacy/" className="text-accent underline underline-offset-4">
          privacy policy
        </Link>
        .
      </motion.p>
    </Section>
  )
}

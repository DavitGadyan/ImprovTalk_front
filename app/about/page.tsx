import type { Metadata } from 'next'
import Link from 'next/link'
import { PageShell } from '@/components/ui/page-shell'
import { SUPPORT_EMAIL } from '@/content/links'
import { stats, TOTAL_LIBRARY_ITEMS } from '@/content/catalogs'
import { pillars, deliveryMeters, VOICE_WEIGHT } from '@/content/features'
import { breadcrumbLd, pageJsonLd } from '@/lib/jsonld'

const TITLE = 'About ImprovTalk'
const DESCRIPTION =
  'Who makes ImprovTalk, what the conversation method is built on, how the score is actually calculated, and what we deliberately do not claim.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/about/' },
  openGraph: { url: '/about/', title: `${TITLE} · ImprovTalk`, description: DESCRIPTION },
}

const pct = (n: number) => `${Math.round(n * 100)}%`

export default function AboutPage() {
  const ld = pageJsonLd([
    breadcrumbLd([
      ['Home', '/'],
      ['About', '/about/'],
    ]),
  ])

  return (
    <PageShell
      title="About ImprovTalk"
      breadcrumb={[['Home', '/']]}
      intro="What this is, how it works underneath, and which parts of it are measured rather than guessed."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />

      <h2>What it is</h2>
      <p>
        ImprovTalk is a voice-first conversation coach for iPhone. You hold a button and
        talk to an AI that answers back in real time, in a scene you pick — a café
        queue, a gym, a networking room — and afterwards you get a score with the
        working shown.
      </p>
      <p>
        It exists because conversation is a motor skill and real life is a terrible place
        to practise one. You get a single attempt, no feedback on what went wrong, and a
        social cost for every fumble. Nobody would learn an instrument that way.
      </p>

      <h2>Who makes it</h2>
      <p>
        ImprovTalk is built and run independently, not by a large company. There is no
        content team and no outsourced blog — everything on this site is written by the
        people building the app, which is also why it can tell you exactly which line of
        the scoring pipeline a number comes from.
      </p>
      <p>
        Support goes to a person, not a queue:{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Every email is read.
      </p>

      <h2>What the method is built on</h2>
      <p>
        The conversation technique the app coaches — and everything in{' '}
        <Link href="/blog/">the writing here</Link> — comes from a distilled corpus we
        assembled: fourteen curated sources on approach, framing, humour, observation and
        handling a no, classified into rules rather than kept as prose. The single
        largest source was a set of several hundred short coaching videos, topic-tagged
        so recurring principles could be separated from one-off opinions.
      </p>
      <p>
        We do not name those sources on the site, and that is deliberate. The distillation
        is ours; citing the material it came from would imply endorsements nobody gave.
      </p>
      <p>On top of that sits the content you actually practise against:</p>
      <ul>
        <li>
          {stats.liveScenarios} live practice scenarios across {stats.liveVenues} venues,
          and {stats.simScenarios} simulator scenes across {stats.simVenues}.
        </li>
        <li>
          {stats.countries} nationalities, each with a phonetic greeting and a joke, which
          shape who the AI partner is and how she sounds — they change her accent, not the
          language she speaks.
        </li>
        <li>
          A reference library of {TOTAL_LIBRARY_ITEMS.toLocaleString('en')} items across
          25 catalogues, for when you run out of things to talk about.
        </li>
      </ul>

      <h2>How the score is actually calculated</h2>
      <p>
        Most apps in this category give you one number and no way to check it. Here is
        ours, in full.
      </p>
      <p>
        <strong>The words</strong> are graded against a fixed rubric on three axes:{' '}
        {pillars.map((p, i) => (
          <span key={p.name}>
            {i > 0 ? (i === pillars.length - 1 ? ' and ' : ', ') : ''}
            {p.name} ({pct(p.weight)})
          </span>
        ))}
        .
      </p>
      <p>
        <strong>The delivery</strong> is measured from the recording itself — not
        inferred, measured — and combines{' '}
        {deliveryMeters.map((m, i) => (
          <span key={m.name}>
            {i > 0 ? (i === deliveryMeters.length - 1 ? ' and ' : ', ') : ''}
            {m.name.toLowerCase()} ({pct(m.weight)})
          </span>
        ))}
        . Pitch comes from acoustic analysis, pace from word timings, filler density from
        a fixed marker list counted per hundred words.
      </p>
      <p>
        The two halves are blended, with delivery counting for {pct(VOICE_WEIGHT)} of the
        headline number.{' '}
        <Link href="/how-to-start-a-conversation/">The method pages</Link> explain what to
        do with the result.
      </p>

      <h2>What we do not claim</h2>
      <p>
        This is the part most product pages leave out, and it is the part worth reading.
      </p>
      <ul>
        <li>
          <strong>The score is not fully deterministic.</strong> The measured delivery
          half is — the same recording produces the same numbers. The rubric half is a
          model judgement made the same way every time, which is not the same thing as
          identical every time.
        </li>
        <li>
          <strong>The app&rsquo;s interface is English only.</strong> Conversations run in
          English, Spanish or Russian. The menus do not.
        </li>
        <li>
          <strong>We publish no ratings or testimonials.</strong> There are none yet.
          Inventing them is both a policy violation and a lie.
        </li>
        <li>
          <strong>No numbers we have not counted.</strong> Every figure on this site is
          counted from the app&rsquo;s own data files. When a count changes, the site
          changes — we corrected one downward recently rather than leave it flattering.
        </li>
      </ul>

      <h2>How the AI partner behaves</h2>
      <p>
        She has agency. She can be guarded, uninterested, or done with the conversation,
        and a soft no or a hard no is a scored outcome rather than a failure state.
        Noticing one early scores better than talking through it.
      </p>
      <p>
        The app will not coach coercion, and it is built to decline it. That is a product
        decision, not a legal disclaimer — reading a no is the actual skill.
      </p>

      <h2>Privacy, briefly</h2>
      <p>
        Your voice is used to score the session and nothing else. The microphone is not
        active outside a session screen, no contacts, calendar, photos or location are
        collected, and the app ships no advertising SDKs. The{' '}
        <Link href="/privacy/">privacy policy</Link> has the detail, and{' '}
        <Link href="/support/">support</Link> covers export and deletion.
      </p>
    </PageShell>
  )
}

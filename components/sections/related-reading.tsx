import Link from 'next/link'
import { Section } from '@/components/ui/section'
import { posts } from '@/content/posts'
import type { Persona } from '@/content/personas'

/**
 * Closes the topic cluster.
 *
 * Each post already links up to the persona page written for the same reader.
 * Without this block the link only ran one way, which wastes most of the value:
 * a landing page with nothing pointing out of it looks like a dead end to a
 * crawler, and these four pages spent months noindexed precisely because nothing
 * distinguished them. The posts are what makes them distinct.
 *
 * No chapter number — the numbered running order belongs to the argument, and
 * this sits after it.
 */
export function RelatedReading({ persona }: { persona: Persona }) {
  const mine = posts.filter((p) => p.personaPath === persona.path)
  const others = posts.filter((p) => p.personaPath !== persona.path)
  const shown = [...mine, ...others].slice(0, 3)

  return (
    <Section
      id="reading"
      tone="raised"
      label="Read first"
      title="How to actually do it"
      intro="The technique itself, written out — openers, what to notice, and how long you have."
    >
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {shown.map((p) => (
          <Link
            key={p.slug}
            href={p.path}
            className="group block rounded-2xl border border-line bg-canvas p-6 transition-colors hover:border-line-strong"
          >
            <h3 className="font-[family-name:var(--font-display)] text-[17px] font-semibold leading-snug tracking-[-0.02em] text-ink transition-colors group-hover:text-accent">
              {p.title}
            </h3>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{p.excerpt}</p>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-[15px] text-muted">
        Or start with{' '}
        <Link
          href="/how-to-start-a-conversation/"
          className="text-accent underline underline-offset-4"
        >
          the method in four moves
        </Link>
        .
      </p>
    </Section>
  )
}

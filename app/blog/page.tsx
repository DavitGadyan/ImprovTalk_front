import type { Metadata } from 'next'
import Link from 'next/link'
import { PageShell } from '@/components/ui/page-shell'
import { posts } from '@/content/posts'
import { blogLd, breadcrumbLd, pageJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'How to actually talk to people',
  description:
    'Conversation technique, written plainly: how to open, what to notice, how to read the window, and how to hear a no.',
  alternates: { canonical: '/blog/' },
  openGraph: {
    type: 'website',
    url: '/blog/',
    title: 'How to actually talk to people · ImprovTalk',
    description:
      'Conversation technique, written plainly: how to open, what to notice, how to read the window, and how to hear a no.',
  },
}

const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export default function BlogIndex() {
  const ld = pageJsonLd([
    blogLd,
    breadcrumbLd([
      ['Home', '/'],
      ['Blog', '/blog/'],
    ]),
  ])

  return (
    <PageShell
      title="How to actually talk to people"
      breadcrumb={[['Home', '/']]}
      intro="The moves themselves — how to open, what to notice, how long you have, and how to hear a no. No scripts, because scripts are the thing that makes people sound like they are reading."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />

      <p>
        Start with{' '}
        <Link href="/how-to-start-a-conversation/">the method in four moves</Link> if you
        want the whole thing in one place.
      </p>

      <ul className="not-prose mt-10 list-none space-y-0 pl-0">
        {posts.map((p) => (
          <li key={p.slug} className="border-t border-line py-7 first:border-t-0 first:pt-0">
            <Link href={p.path} className="group block no-underline">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold leading-snug tracking-[-0.02em] text-ink transition-colors group-hover:text-accent">
                {p.title}
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.excerpt}</p>
              <p className="mt-3 text-[12px] text-subtle">
                <time dateTime={p.date}>{longDate(p.date)}</time>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}

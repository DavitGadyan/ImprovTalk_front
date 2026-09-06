import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'
import { Icon } from '@/components/ui/icon'
import { posts, type Post } from '@/content/posts'
import { blogLd, breadcrumbLd, pageJsonLd } from '@/lib/jsonld'

const TITLE = 'How to actually talk to people'
const DESCRIPTION =
  'The technique itself — how to open, what to notice, how long you have, and how to hear a no. No scripts.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/blog/' },
  openGraph: { type: 'website', url: '/blog/', title: `${TITLE} · ImprovTalk`, description: DESCRIPTION },
}

function Meta({ post }: { post: Post }) {
  return (
    <div className="flex items-center gap-3">
      {/* A grey pill with a coloured dot: the category's hue is a signal on a
          glyph, not a text colour — the same rule the app's rows follow. */}
      <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-micro font-semibold uppercase tracking-[0.13em] text-muted">
        <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: post.hue }} />
        {post.category}
      </span>
      <span className="text-caption text-muted">{post.minutes} min read</span>
    </div>
  )
}

/* The first post gets the wide treatment. A grid where every card is identical
   gives the eye nowhere to land. */
function Featured({ post }: { post: Post }) {
  return (
    <Link
      href={post.path}
      className="group grid overflow-hidden rounded-card border border-line bg-surface transition-colors hover:border-muted md:grid-cols-[1.05fr_1fr]"
    >
      <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[300px]">
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(min-width: 768px) 52vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas/70 via-transparent to-transparent" />
      </div>

      <div className="flex flex-col justify-center gap-4 p-7 md:p-10">
        <Meta post={post} />
        <h2 className="display-md text-ink transition-colors group-hover:text-accent-text">
          {post.title}
        </h2>
        <p className="text-small leading-relaxed text-muted">{post.excerpt}</p>
        <span className="mt-1 inline-flex items-center gap-1 text-small font-medium text-accent-text">
          Read it <Icon name="arrow_forward" />
        </span>
      </div>
    </Link>
  )
}

function Card({ post }: { post: Post }) {
  return (
    <Link
      href={post.path}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface transition-colors hover:border-muted"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/85 via-surface/10 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <Meta post={post} />
        <h3 className="text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-accent-text">
          {post.title}
        </h3>
        <p className="text-small leading-relaxed text-muted">{post.excerpt}</p>
      </div>
    </Link>
  )
}

export default function BlogIndex() {
  /* posts is a non-empty module-level literal, so these are safe. */
  const featured = posts[0]!
  const rest = posts.slice(1)
  const ld = pageJsonLd([blogLd, breadcrumbLd([['Home', '/'], ['Blog', '/blog/']])])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Header />

      <main id="main" className="container-page pb-24 pt-16 md:pb-32 md:pt-24">
        <div className="max-w-3xl">
          <p className="eyebrow">The method</p>
          <h1 className="display-lg mt-4 text-ink">How to actually talk to people</h1>
          <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
            How to open, what to notice, how long you have, and how to hear a no.
            No scripts — scripts are what make people sound like they are reading.
          </p>
        </div>

        <div className="mt-14">
          <Featured post={featured} />
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Card key={p.slug} post={p} />
          ))}
        </div>

        <div className="panel mt-16 p-8 text-center">
          <p className="text-small leading-relaxed text-ink">
            All four moves in one place, with the films.
          </p>
          <Link
            href="/how-to-start-a-conversation/"
            className="mt-4 inline-flex items-center gap-1 text-small font-medium text-accent-text underline underline-offset-4"
          >
            How to start a conversation <Icon name="arrow_forward" />
          </Link>
        </div>
      </main>

      <Footer />
    </>
  )
}

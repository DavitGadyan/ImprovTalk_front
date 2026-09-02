import Link from 'next/link'
import { PageShell } from '@/components/ui/page-shell'
import { PostFilm } from '@/components/ui/post-film'
import { scenarios } from '@/content/media'
import type { Post } from '@/content/posts'
import { blogPostingLd, breadcrumbLd, pageJsonLd, videoLd } from '@/lib/jsonld'

const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

/**
 * Shell for a blog post.
 *
 * Wraps PageShell so a post inherits the same prose styling as the legal pages —
 * there is no second typography system to keep in sync. The graph carries the
 * BlogPosting, the breadcrumb, and the film's VideoObject when the post uses one,
 * all composed through pageJsonLd so the @id references to #organization and
 * #website resolve rather than dangling.
 */
export function BlogPost({ post, children }: { post: Post; children: React.ReactNode }) {
  const film = post.film ? scenarios.find((s) => s.slug === post.film) : undefined

  const ld = pageJsonLd([
    blogPostingLd(post),
    breadcrumbLd([
      ['Home', '/'],
      ['Blog', '/blog/'],
      [post.title, post.path],
    ]),
    ...(film ? [videoLd(film)] : []),
  ])

  return (
    <PageShell
      title={post.title}
      updated={longDate(post.date)}
      intro={post.excerpt}
      breadcrumb={[
        ['Home', '/'],
        ['Blog', '/blog/'],
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />

      {post.film && <PostFilm slug={post.film} />}

      {children}

      <aside className="mt-14 rounded-2xl border border-line-strong bg-surface p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
          Practise this
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
          Reading about an opener and saying one out loud are different skills. You can
          run this on your phone against an AI that answers back, as many times as you
          like, and nobody hears it.
        </p>
        <Link
          href={post.personaPath}
          className="mt-5 inline-block text-sm font-medium text-accent underline underline-offset-4"
        >
          {post.personaLabel} →
        </Link>
      </aside>
    </PageShell>
  )
}

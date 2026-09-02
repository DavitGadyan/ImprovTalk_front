import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'
import { PostFilm } from '@/components/ui/post-film'
import { scenarios } from '@/content/media'
import { posts, type Post } from '@/content/posts'
import { blogPostingLd, breadcrumbLd, pageJsonLd, videoLd } from '@/lib/jsonld'
import { PROSE } from '@/components/ui/prose'

const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })


export function BlogPost({ post, children }: { post: Post; children: React.ReactNode }) {
  const film = post.film ? scenarios.find((s) => s.slug === post.film) : undefined
  const idx = posts.findIndex((p) => p.slug === post.slug)
  const next = posts[(idx + 1) % posts.length]!

  const ld = pageJsonLd([
    blogPostingLd(post),
    breadcrumbLd([['Home', '/'], ['Blog', '/blog/'], [post.title, post.path]]),
    ...(film ? [videoLd(film)] : []),
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Header />

      <main id="main">
        {/* Cover. The image is the first thing on the page, not an afterthought. */}
        <div className="relative h-[38vh] min-h-[260px] w-full overflow-hidden md:h-[46vh]">
          <Image
            src={post.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[center_30%]"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-canvas/25 via-canvas/55 to-canvas" />
        </div>

        <article className="container-page relative z-10 -mt-24 pb-24 md:-mt-32 md:pb-32">
          <div className="mx-auto max-w-[46rem]">
            <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-subtle">
              <ol className="flex flex-wrap items-center gap-x-2">
                <li>
                  <Link href="/" className="transition-colors hover:text-ink">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/blog/" className="transition-colors hover:text-ink">
                    Blog
                  </Link>
                </li>
              </ol>
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              <span
                className="rounded-full border px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.13em]"
                style={{
                  color: post.hue,
                  borderColor: `color-mix(in srgb, ${post.hue} 40%, transparent)`,
                }}
              >
                {post.category}
              </span>
              <span className="text-[12.5px] text-subtle">{post.minutes} min read</span>
              <span className="text-[12.5px] text-subtle" aria-hidden="true">
                ·
              </span>
              <time dateTime={post.date} className="text-[12.5px] text-subtle">
                {longDate(post.date)}
              </time>
            </div>

            <h1 className="display-md mt-5 text-ink">{post.title}</h1>

            <p className="mt-6 border-l-2 border-line-strong pl-5 text-[18px] leading-relaxed text-muted">
              {post.excerpt}
            </p>

            {post.film && <PostFilm slug={post.film} />}

            <div className={PROSE}>{children}</div>

            <aside className="mt-16 overflow-hidden rounded-2xl border border-line-strong bg-surface">
              {/* The post's own category hue, not the brand gradient — that is
                  rationed to three places as site chrome and this would be a fourth. */}
              <div className="h-1 w-full" style={{ background: post.hue }} />
              <div className="p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
                  Practise this
                </p>
                <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">
                  Reading an opener and saying one out loud are different skills.
                  Practise it on your phone, as often as you like. Nobody hears you.
                </p>
                <Link
                  href={post.personaPath}
                  className="mt-5 inline-block text-sm font-medium text-accent underline underline-offset-4"
                >
                  {post.personaLabel} →
                </Link>
              </div>
            </aside>

            <Link
              href={next.path}
              className="group mt-6 flex items-center gap-5 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
            >
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                <Image src={next.image} alt="" fill sizes="64px" className="object-cover" unoptimized />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
                  Read next
                </p>
                <p className="mt-1.5 font-[family-name:var(--font-display)] text-[16px] font-semibold leading-snug tracking-[-0.02em] text-ink transition-colors group-hover:text-accent">
                  {next.title}
                </p>
              </div>
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  )
}

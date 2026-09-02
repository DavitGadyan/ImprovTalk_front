import { scenarios, videoSrc, posterSrc } from '@/content/media'

/**
 * A single scenario film inside a blog post.
 *
 * Unlike the homepage band (components/sections/scenario-film.tsx) this does not
 * mount the <video> on an IntersectionObserver. It does not need to: preload="none"
 * means the browser fetches nothing but the poster until someone presses play, and
 * keeping the real <video> in the static HTML is what lets the VideoObject markup
 * describe an element that actually exists on the page. Server component, no JS.
 */
export function PostFilm({ slug }: { slug: string }) {
  const s = scenarios.find((x) => x.slug === slug)
  if (!s) return null

  return (
    <figure className="not-prose my-10">
      <div className="overflow-hidden rounded-2xl border border-line bg-surface">
        <video
          className="block aspect-video w-full"
          poster={posterSrc(s.slug)}
          preload="none"
          controls
          playsInline
          muted
          aria-label={s.alt}
        >
          <source src={videoSrc(s.slug)} type="video/mp4" />
        </video>
      </div>
      <figcaption className="mt-3 text-[13px] leading-relaxed text-subtle">
        <span className="font-medium text-ink-soft">{s.label}.</span> {s.caption}
      </figcaption>
    </figure>
  )
}

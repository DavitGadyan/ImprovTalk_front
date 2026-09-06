import { InstallBlock } from '@/components/ui/install'
import { RENDERS } from '@/lib/renders'
import type { Persona } from '@/content/personas'

/**
 * Text left, the product right — one render, not a drawn phone.
 *
 * The render is the score screen with the Hold-to-speak disc: the one place the
 * brand gradient is allowed in design B, so the signature arrives with the
 * product instead of as chrome. It is a plain <img> with its real dimensions,
 * fetched at high priority: it is the LCP candidate and nothing about it should
 * wait for JavaScript.
 *
 * No entrance animation on this column. It starts above the fold on every
 * load, so a fade from opacity 0 buys a reveal nobody sees and defers the h1's
 * paint until hydration.
 */
export function Hero({ persona }: { persona: Persona }) {
  const { eyebrow, headline, sub, note } = persona.hero
  const r = RENDERS['score-disc']

  return (
    <section className="relative pb-16 pt-8 md:pb-24 md:pt-14">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="mb-6">
              <span className="eyebrow">{eyebrow}</span>
            </p>

            <h1 className="display-xl text-ink">
              {headline.top}
              <br />
              {headline.bottom}
              {/* The app's own hero cut is Satoshi italic; the emphasis borrows it. */}
              <em className="italic">{headline.emphasis}</em>
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted">{sub}</p>

            <div className="mt-8" id="hero-cta">
              <InstallBlock />
            </div>

            <p className="mt-6 text-small text-muted">{note}</p>
          </div>

          <div className="mx-auto w-full max-w-[30rem] lg:max-w-none">
            <img
              src={r.src}
              srcSet={r.srcSet}
              sizes="(min-width: 1024px) 42vw, (min-width: 640px) 30rem, 100vw"
              width={r.width}
              height={r.height}
              alt={r.alt}
              fetchPriority="high"
              decoding="async"
              className="h-auto w-full rounded-card"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

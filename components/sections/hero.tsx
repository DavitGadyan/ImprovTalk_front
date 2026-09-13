import { InstallBlock } from '@/components/ui/install'
import { PhoneDemo } from '@/components/ui/phone-demo'
import { Ripples } from '@/components/ui/ripples'
import type { Persona } from '@/content/personas'

/**
 * Text left, the product right — a drawn iPhone with the Practice screen in
 * it, floating on the page with nothing around it, over a field of faint
 * ripples, turning slowly with the app running in it once it is in view.
 *
 * The still inside the phone is a plain <img> with its real dimensions,
 * fetched at high priority: it is the LCP candidate and nothing about it
 * waits for JavaScript. The clip only loads on the first hover.
 *
 * No entrance animation on this column. It starts above the fold on every
 * load, so a fade from opacity 0 buys a reveal nobody sees and defers the h1's
 * paint until hydration.
 */
export function Hero({ persona }: { persona: Persona }) {
  const { eyebrow, headline, sub, note } = persona.hero

  return (
    <section className="relative overflow-hidden pb-16 pt-8 md:pb-24 md:pt-14">
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

          <div className="relative mx-auto w-full max-w-[17rem] py-6 sm:max-w-[19rem] lg:max-w-[20rem] lg:py-10 [perspective:1600px]">
            <Ripples className="absolute left-1/2 top-1/2 h-auto w-[230%] max-w-none -translate-x-1/2 -translate-y-1/2" />
            <PhoneDemo priority turn className="relative" />
          </div>
        </div>
      </div>
    </section>
  )
}

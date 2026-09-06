import { InstallBlock } from '@/components/ui/install'
import type { Persona } from '@/content/personas'

/**
 * The closing ask.
 *
 * The same action the hero made, repeated once at the end for the reader who
 * needed the whole argument first — one card, the violet pill, the App Store
 * badge, and nothing the hero did not already promise.
 */
export function CtaBand({ persona }: { persona: Persona }) {
  return (
    <section className="border-t border-line py-20 md:py-28" aria-labelledby="cta-title">
      <div className="container-page">
        <div className="panel grid items-center gap-8 p-8 md:grid-cols-[1.2fr_1fr] md:p-12">
          <div>
            <p className="eyebrow">Before it counts</p>
            <h2 id="cta-title" className="display-md mt-4 text-ink">
              Practise the conversation before you have it.
            </h2>
            <p className="mt-4 max-w-md text-body text-muted">
              {persona.hero.note} Three conversations a week, and nobody hears you.
            </p>
          </div>
          <InstallBlock compact />
        </div>
      </div>
    </section>
  )
}

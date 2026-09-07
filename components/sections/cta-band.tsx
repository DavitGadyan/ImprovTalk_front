import { InstallBlock } from '@/components/ui/install'
import { stats } from '@/content/catalogs'
import type { Persona } from '@/content/personas'

/**
 * The closing ask.
 *
 * The same action the hero made, repeated once at the end for the reader who
 * needed the whole argument first — one card, the violet pill, the App Store
 * badge, and nothing the hero did not already promise.
 */
/* The free allowance, spelled out from the counted value so this band and the
   JSON-LD Offer can never disagree. */
const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven'] as const
const freeWeekly = WORDS[stats.freeWeekly] ?? String(stats.freeWeekly)

export function CtaBand({ persona }: { persona: Persona }) {
  const allowance = freeWeekly.charAt(0).toUpperCase() + freeWeekly.slice(1)
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
              {persona.hero.note} {allowance} conversations a week, and nobody hears you.
            </p>
          </div>
          <InstallBlock compact />
        </div>
      </div>
    </section>
  )
}

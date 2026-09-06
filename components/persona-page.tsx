import { Header } from '@/components/sections/header'
import { Hero } from '@/components/sections/hero'
import { ProductBento } from '@/components/sections/product-bento'
import { CtaBand } from '@/components/sections/cta-band'
import { Problem } from '@/components/sections/problem'
import { Learnable } from '@/components/sections/learnable'
import { HowItWorks } from '@/components/sections/how-it-works'
import { Scoring } from '@/components/sections/scoring'
import { WhatsInside } from '@/components/sections/whats-inside'
import { Faq } from '@/components/sections/faq'
import { Footer } from '@/components/sections/footer'
import { RelatedReading } from '@/components/sections/related-reading'
import { SurveyPrompt } from '@/components/ui/survey-prompt'
import { ScrollCta } from '@/components/ui/scroll-cta'
import { VariantTag } from '@/components/variant-tag'
import { homeJsonLd } from '@/lib/jsonld'
import type { Persona, SectionKey } from '@/content/personas'

/**
 * One page, five personas.
 *
 * Copy and running order come from the persona; the components are shared. That
 * keeps the variable under test to the message alone, and means a fix to the
 * scoring section is a fix in all five.
 */
const SECTIONS: Record<
  SectionKey,
  (p: { persona: Persona; index: number }) => React.ReactNode
> = {
  problem: Problem,
  learnable: Learnable,
  how: HowItWorks,
  scoring: Scoring,
  inside: WhatsInside,
  faq: Faq,
}

export function PersonaPage({ persona }: { persona: Persona }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd(persona.faq)) }}
      />
      <VariantTag slug={persona.slug} />
      <Header />
      <main id="main">
        <Hero persona={persona} />
        {/* The product itself, straight after the promise. Not part of the
            persona running order: every reader gets the screens before the
            argument, whichever section that argument leads with. */}
        <ProductBento />
        {persona.order.map((key, i) => {
          const S = SECTIONS[key]
          /* Chapter numbers follow the running order, so they read 01..06 in
             every variant even though the sections themselves are reordered. */
          return (
            <div key={key}>
              <S persona={persona} index={i + 1} />
              {/* After the first section: past the hero, before the argument
                  has been made, and never in front of the install CTA. */}
              {i === 0 && <div className="pb-4"><SurveyPrompt /></div>}
            </div>
          )
        })}
        <RelatedReading persona={persona} />
        <CtaBand persona={persona} />
      </main>
      <Footer />
      <ScrollCta />
    </>
  )
}

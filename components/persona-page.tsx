import { Header } from '@/components/sections/header'
import { Hero } from '@/components/sections/hero'
import { Problem } from '@/components/sections/problem'
import { Learnable } from '@/components/sections/learnable'
import { HowItWorks } from '@/components/sections/how-it-works'
import { Scoring } from '@/components/sections/scoring'
import { WhatsInside } from '@/components/sections/whats-inside'
import { Faq } from '@/components/sections/faq'
import { Footer } from '@/components/sections/footer'
import { RelatedReading } from '@/components/sections/related-reading'
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
        {persona.order.map((key, i) => {
          const S = SECTIONS[key]
          /* Chapter numbers follow the running order, so they read 01..06 in
             every variant even though the sections themselves are reordered. */
          return <S key={key} persona={persona} index={i + 1} />
        })}
        <RelatedReading persona={persona} />
      </main>
      <Footer />
      <ScrollCta />
    </>
  )
}

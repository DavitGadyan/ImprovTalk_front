import { Header } from '@/components/sections/header'
import { Hero } from '@/components/sections/hero'
import { Gap } from '@/components/sections/gap'
import { HowItWorks } from '@/components/sections/how-it-works'
import { ScenarioFilm } from '@/components/sections/scenario-film'
import { WhyAloneWorks } from '@/components/sections/why-alone-works'
import { LivePractice } from '@/components/sections/live-practice'
import { Scoring } from '@/components/sections/scoring'
import { Simulator } from '@/components/sections/simulator'
import { Drills } from '@/components/sections/drills'
import { LearnLibrary } from '@/components/sections/learn-library'
import { Progress } from '@/components/sections/progress'
import { Faq } from '@/components/sections/faq'
import { FinalCta } from '@/components/sections/final-cta'
import { Footer } from '@/components/sections/footer'
import { MobileBar } from '@/components/ui/mobile-bar'
import { homeJsonLd } from '@/lib/jsonld'

/**
 * Section order is the argument, in order: here is the gap, here is how the
 * product closes it, here is the evidence it works, here is what it costs you
 * to find out. Scoring sits in the middle because it is the one thing
 * competitors do not have.
 */
export default function HomePage() {
  return (
    <>
      {/* One @graph rather than loose blocks, so the @id cross-references
          between Organization, WebSite, the app and the FAQ actually resolve. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd()) }}
      />
      <Header />
      <main id="main">
        <Hero />
        <Gap />
        <HowItWorks />
        {/* Renders nothing until content/media.ts has a video. */}
        <ScenarioFilm />
        <WhyAloneWorks />
        <LivePractice />
        <Scoring />
        <Simulator />
        <Drills />
        <LearnLibrary />
        <Progress />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar />
    </>
  )
}

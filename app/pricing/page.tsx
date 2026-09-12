import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'
import { InstallBlock } from '@/components/ui/install'
import { FeatureList } from '@/components/sections/feature-list'
import { PlanTable } from '@/components/sections/plan-table'
import { breadcrumbLd, faqLd, pageJsonLd } from '@/lib/jsonld'
import { MAX_SAVINGS, PRICES, PRICING_FAQ, priceLine } from '@/content/pricing'

const TITLE = 'Pricing & Features'
const DESCRIPTION = `Every screen in the app and what it gives you, and the three plans: Free, Pro from ${priceLine('pro', 'week')}, Max from ${priceLine('max', 'week')}. Weekly or monthly, cancel any time.`

export const metadata: Metadata = {
  title: 'Pricing',
  description: DESCRIPTION,
  alternates: { canonical: '/pricing/' },
  openGraph: { url: '/pricing/', title: `${TITLE} · ImprovTalk`, description: DESCRIPTION },
}

export default function PricingPage() {
  const ld = pageJsonLd([
    breadcrumbLd([
      ['Home', '/'],
      ['Pricing', '/pricing/'],
    ]),
    faqLd(PRICING_FAQ),
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Header />

      <main id="main" className="container-page pb-24 pt-14 md:pb-32 md:pt-20">
        <nav aria-label="Breadcrumb" className="mb-6 text-small text-muted">
          <ol className="flex flex-wrap items-center gap-x-2">
            <li>
              <Link href="/" className="transition-colors hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-muted">Pricing</li>
          </ol>
        </nav>

        <div className="max-w-3xl">
          <span className="eyebrow">Plans and features</span>
          <h1 className="display-lg mt-5 text-ink">Pricing &amp; Features</h1>
          <p className="mt-5 max-w-2xl text-body text-muted md:text-lg">
            Six things on the home screen, and what each of them gives you. Then the three
            plans. Free is a real tier, not a trial; Pro is {priceLine('pro', 'week')} or{' '}
            {priceLine('pro', 'month')}, Max is {priceLine('max', 'week')} or{' '}
            {priceLine('max', 'month')}, cancelled from your App Store account.
          </p>
        </div>

        {/* ------------------------------------------------ the six tiles -- */}
        <section aria-labelledby="tiles-heading" className="mt-20 md:mt-28">
          <h2 id="tiles-heading" className="display-md text-ink">
            What is on the home screen
          </h2>
          <p className="mt-4 max-w-2xl text-body text-muted">
            In the app&rsquo;s own order. Open one to read what it does; the screenshots are
            the app&rsquo;s own screens, and where there is no screenshot yet, there is no
            picture.
          </p>

          <div className="mt-12">
            <FeatureList />
          </div>
        </section>

        {/* ---------------------------------------------------- the plans -- */}
        <section aria-labelledby="plans-heading" className="mt-24 md:mt-32">
          <h2 id="plans-heading" className="display-md text-ink">
            Three plans
          </h2>
          <p className="mt-4 max-w-2xl text-body text-muted">
            Prices in {PRICES.currency}, billed weekly or monthly — monthly is up to {MAX_SAVINGS}%
            less per week. There is no yearly plan yet.
          </p>
          <div className="mt-12">
            <PlanTable />
          </div>
          <div className="mt-12">
            <InstallBlock />
          </div>
        </section>

        {/* -------------------------------------------------------- faq -- */}
        <section aria-labelledby="faq-heading" className="mt-24 md:mt-32">
          <h2 id="faq-heading" className="display-md text-ink">
            Billing questions
          </h2>
          <dl className="mt-10 max-w-3xl divide-y divide-line border-y border-line">
            {PRICING_FAQ.map((f) => (
              <div key={f.q} className="py-6">
                <dt className="text-body font-bold text-ink">{f.q}</dt>
                <dd className="mt-2 text-body text-muted">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <Footer />
    </>
  )
}

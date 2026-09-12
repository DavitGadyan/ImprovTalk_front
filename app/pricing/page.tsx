import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'
import { Icon } from '@/components/ui/icon'
import { InstallBlock } from '@/components/ui/install'
import { PlanTable } from '@/components/sections/plan-table'
import { RealTalkTools } from '@/components/sections/real-talk'
import { RENDERS } from '@/lib/renders'
import { breadcrumbLd, faqLd, pageJsonLd } from '@/lib/jsonld'
import { PRICES, PRICING_FAQ, TILES, price } from '@/content/pricing'
import { cn } from '@/lib/utils'

const TITLE = 'Pricing & Features'
const DESCRIPTION = `Every screen in the app and what it gives you, and the three plans: Free, Pro at ${price('pro')} a week, Max at ${price('max')}. Billed weekly, cancel any time.`

export const metadata: Metadata = {
  title: 'Pricing',
  description: DESCRIPTION,
  alternates: { canonical: '/pricing/' },
  openGraph: { url: '/pricing/', title: `${TITLE} · ImprovTalk`, description: DESCRIPTION },
}

const PLAN_LABEL = { free: 'Free', pro: 'Pro', max: 'Max' } as const

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
            plans. Free is a real tier, not a trial; Pro is {price('pro')} a week and Max is{' '}
            {price('max')}, both billed weekly and cancelled from your App Store account.
          </p>
        </div>

        {/* ------------------------------------------------ the six tiles -- */}
        <section aria-labelledby="tiles-heading" className="mt-20 md:mt-28">
          <h2 id="tiles-heading" className="display-md text-ink">
            What is on the home screen
          </h2>
          <p className="mt-4 max-w-2xl text-body text-muted">
            In the app&rsquo;s own order. The screenshots are the app&rsquo;s own screens; where
            there is no screenshot yet, there is no picture.
          </p>

          <ol className="mt-12 grid gap-4 md:gap-5">
            {TILES.map((t, i) => {
              const r = t.render ? RENDERS[t.render] : null
              const flip = i % 2 === 1
              return (
                <li
                  key={t.title}
                  className={cn(
                    'panel grid gap-8 p-6 md:p-8',
                    r && 'md:grid-cols-2 md:items-center',
                  )}
                >
                  <div className={cn(r && flip && 'md:order-2')}>
                    <div className="flex items-center gap-3">
                      <span className="flex size-11 items-center justify-center rounded-full border border-line">
                        <Icon name={t.icon} className="text-[22px] text-ink" />
                      </span>
                      <h3 className="text-xl font-bold text-ink">{t.title}</h3>
                      <span className="ml-auto inline-flex items-center gap-1.5 text-micro font-semibold uppercase tracking-[0.13em] text-muted">
                        <span
                          aria-hidden="true"
                          className={cn(
                            'size-1.5 rounded-full',
                            t.from === 'free' && 'bg-success',
                            t.from === 'pro' && 'bg-warn',
                            t.from === 'max' && 'bg-accent',
                          )}
                        />
                        {t.from === 'free' ? 'Free' : `From ${PLAN_LABEL[t.from]}`}
                      </span>
                    </div>
                    <p className="mt-4 text-body text-muted">{t.body}</p>
                    {t.title === 'Real Talk' && (
                      <div className="mt-6">
                        <RealTalkTools compact />
                      </div>
                    )}
                  </div>
                  {r && (
                    <figure className={cn(flip && 'md:order-1')}>
                      <img
                        src={r.src}
                        srcSet={r.srcSet}
                        sizes="(min-width: 768px) 40vw, 100vw"
                        width={r.width}
                        height={r.height}
                        alt={r.alt}
                        loading="lazy"
                        decoding="async"
                        className="mx-auto h-auto w-full max-w-[22rem] rounded-card"
                      />
                    </figure>
                  )}
                </li>
              )
            })}
          </ol>
        </section>

        {/* ---------------------------------------------------- the plans -- */}
        <section aria-labelledby="plans-heading" className="mt-24 md:mt-32">
          <h2 id="plans-heading" className="display-md text-ink">
            Three plans
          </h2>
          <p className="mt-4 max-w-2xl text-body text-muted">
            Prices in {PRICES.currency}, per {PRICES.period}. There is no monthly or yearly plan.
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

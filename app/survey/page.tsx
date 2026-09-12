import type { Metadata } from 'next'
import { PageShell } from '@/components/ui/page-shell'
import { breadcrumbLd, pageJsonLd } from '@/lib/jsonld'
import { SurveyClient } from './survey-client'

const TITLE = 'What are you working on?'
const DESCRIPTION =
  'Ninety seconds, no email. Tell us what you are practising and how you come across, and get tips written for that.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/survey/' },
  openGraph: { url: '/survey/', title: `${TITLE} · ImprovTalk`, description: DESCRIPTION },
}

export default function SurveyPage() {
  const ld = pageJsonLd([
    breadcrumbLd([
      ['Home', '/'],
      ['Survey', '/survey/'],
    ]),
  ])

  return (
    <PageShell
      bare
      title={TITLE}
      breadcrumb={[['Home', '/']]}
      intro="Ninety seconds, seven questions, no email address. Your result appears at the end — we are not going to send it to you later."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <div className="mt-4">
        <SurveyClient />
      </div>
    </PageShell>
  )
}

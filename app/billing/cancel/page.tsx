import type { Metadata } from 'next'
import { PageShell } from '@/components/ui/page-shell'
import { SUPPORT_EMAIL } from '@/content/links'

export const metadata: Metadata = {
  title: 'Checkout cancelled',
  robots: { index: false, follow: false },
}

export default function BillingCancelPage() {
  return (
    <PageShell title="Checkout cancelled" intro="Nothing was charged.">
      <p>
        You can pick a plan again any time from the Plans screen in the app. The free tier keeps
        working in the meantime.
      </p>
      <p>
        If something went wrong during checkout, tell us at{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
      <p>
        <a href="improvtalk://">Open ImprovTalk</a>
      </p>
    </PageShell>
  )
}

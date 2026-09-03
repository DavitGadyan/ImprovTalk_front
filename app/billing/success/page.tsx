import type { Metadata } from 'next'
import { PageShell } from '@/components/ui/page-shell'
import { SUPPORT_EMAIL } from '@/content/links'

export const metadata: Metadata = {
  title: 'Subscription confirmed',
  description:
    'Your ImprovTalk subscription is active. Open the app to start practising, or contact support if anything looks wrong.',
  robots: { index: false, follow: false },
}

/*
 * Stripe's success_url. Currently configured as https://s1mpleai.org/billing/success
 * in ImprovTalk/services/api/app/deps/settings.py:74 — that setting must be
 * pointed at this host before checkout goes live, or customers land on a 404
 * immediately after paying.
 */
export default function BillingSuccessPage() {
  return (
    <PageShell title="You're in." intro="Your subscription is active.">
      <p>
        Head back to the ImprovTalk app — your new conversation limit is already applied. If it has
        not appeared, force-close the app and reopen it, or pull to refresh on the Plans screen.
      </p>
      <p>
        Nothing showing after a minute or two? Email{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and we will sort it out.
      </p>
      <p>
        <a href="improvtalk://">Open ImprovTalk</a>
      </p>
    </PageShell>
  )
}

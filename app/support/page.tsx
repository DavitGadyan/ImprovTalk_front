import type { Metadata } from 'next'
import { PageShell } from '@/components/ui/page-shell'
import { SUPPORT_EMAIL } from '@/content/links'
import { faqs } from '@/content/faq'

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with ImprovTalk — installing, billing, account deletion and data export.',
}

export default function SupportPage() {
  return (
    <PageShell
      title="Support"
      intro="Email is the fastest way to reach a person. We read everything."
    >
      <p>
        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-lg">
          {SUPPORT_EMAIL}
        </a>
      </p>

      <h2>Common requests</h2>
      <h3>Delete my account and data</h3>
      <p>
        In the app: Settings → Account → Delete. The account is hard-deleted after a 30-day grace
        window. If you cannot get into the app, email us from the address on the account and we will
        do it for you.
      </p>

      <h3>Export my data</h3>
      <p>
        Settings → Export. We email you a signed JSON dump of your sessions, transcripts and scores.
      </p>

      <h3>Billing and refunds</h3>
      <p>
        Subscriptions bought on iPhone are managed by Apple — cancel or request a refund through
        your App Store account. We cannot issue Apple refunds on your behalf, but email us if
        something has gone wrong and we will help you sort it out.
      </p>

      <h3>The app cannot hear me</h3>
      <p>
        Check that ImprovTalk has microphone permission in your phone&rsquo;s system settings, and
        that no other app is holding the microphone. Sessions need a working internet connection —
        the conversation runs in real time.
      </p>

      <h2>Questions we get a lot</h2>
      {faqs.map((f) => (
        <div key={f.q}>
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}
    </PageShell>
  )
}

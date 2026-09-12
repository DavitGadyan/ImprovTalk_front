import type { Metadata } from 'next'
import { PageShell } from '@/components/ui/page-shell'
import { SUPPORT_EMAIL } from '@/content/links'
import { breadcrumbLd, pageJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'What ImprovTalk collects, how long it keeps it, and how to get it deleted.',
  alternates: { canonical: '/privacy/' },
  openGraph: { url: '/privacy/' },
}

/*
 * Every factual claim on this page comes from ImprovTalk/docs/privacy.md — the
 * retention windows, the deletion job, the OpenAI terms and the user rights are
 * all things the app actually implements. Do not add a claim here that the app
 * does not do; this is the URL App Review checks.
 */
export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy policy"
      updated="30 August 2026"
      intro="You are handing this app recordings of your own voice. Here is exactly what happens to them."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageJsonLd([
              breadcrumbLd([
                ['Home', '/'],
                ['Privacy policy', '/privacy/'],
              ]),
            ]),
          ),
        }}
      />
      <h2>What we collect</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Examples</th>
            <th>Retention</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Account</td>
            <td>Email, sign-in provider, display name</td>
            <td>Until you delete the account</td>
          </tr>
          <tr>
            <td>Voice</td>
            <td>Recorded session audio</td>
            <td><strong>Not stored.</strong> Held in memory to score, then discarded</td>
          </tr>
          <tr>
            <td>Transcripts</td>
            <td>Session text and word timings</td>
            <td>Until you delete them</td>
          </tr>
          <tr>
            <td>Scores</td>
            <td>Numeric metrics and rubric output</td>
            <td>Until you delete them</td>
          </tr>
          <tr>
            <td>Subscription</td>
            <td>Apple or Google receipt IDs, status</td>
            <td>Kept for billing history</td>
          </tr>
          <tr>
            <td>Usage</td>
            <td>Session counts, screen events</td>
            <td>18 months, rolling</td>
          </tr>
          <tr>
            <td>Diagnostics</td>
            <td>Crash logs, against a hashed user ID</td>
            <td>90 days</td>
          </tr>
        </tbody>
      </table>

      <h2>The early-access list</h2>
      <p>
        If you give us your email address on this website to request TestFlight access, we use it
        for one thing: sending you the invite and telling you when the app is available on your
        platform. We do not add you to a marketing list, and we do not pass it on. Ask us at any
        time and we will delete it.
      </p>

      <h2>What the app does not collect</h2>
      <ul>
        <li>No contacts, calendar, photos or location.</li>
        <li>No microphone access outside an active session screen.</li>
        <li>No advertising SDKs.</li>
        <li>No third-party analytics SDKs that ingest your transcripts.</li>
      </ul>

      <h2>This website</h2>
      <p>
        The app and this website are separate, and it would be misleading to describe them as
        one. The four points above are about the <strong>app</strong>. This website is a
        different thing: it uses Google Analytics to see which pages people read, and Google
        Ads to see which adverts brought them here.
      </p>
      <p>
        Neither loads until you accept the banner. Decline and no analytics or advertising
        cookies are set at all — everything is denied by default, and the choice is stored on
        your own device so you are not asked again. This has no bearing on the app, which ships
        neither.
      </p>

      <h2>How audio is handled</h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Audio is recorded on your device during a session.</li>
        <li>
          When the session ends it is sent to our server, transcribed, and measured for pace,
          pauses, filler words, pitch and volume steadiness.
        </li>
        <li>
          The recording is held in memory for that request only. It is not written to storage,
          and there is no audio file on our servers to delete afterwards.
        </li>
        <li>What is kept is the transcript and the numbers derived from it.</li>
      </ol>
      <p>
        Transcription uses OpenAI as a processor, so the audio passes through their systems under
        their terms as part of scoring. Transcripts and scores stay until you delete them or delete
        your account, at which point they are removed.
      </p>
      <p>
        One honest caveat: server request logs can contain transcript text and are kept for 14 days
        on a rolling basis for debugging. They are not searchable by account and are not used for
        anything else, but a deletion request does not reach them before they expire on their own.
      </p>

      <h2>The survey on this site</h2>
      <p>
        If you fill in the <a href="/survey/">survey</a>, we store what you told us: your goal,
        which of the situations you picked as closest, the four-colour split you set, and — only if
        you chose to answer — an age band, a gender, a country, and what you said you would pay for
        the Max plan. Plus the two free-text answers,
        which are the ones we actually read. Your tips PDF is built in your own browser from those
        answers; it is not generated on a server and no copy of it is kept.
      </p>
      <p>
        We do not ask for your name or your email. We do store a{' '}
        <strong>one-way hash of your IP address</strong> — not the address itself, which never
        reaches us and is never sent by your browser. It is computed inside the database, salted
        with a secret we hold, and used for exactly one thing: not asking you again if you have
        already answered. It cannot be turned back into your address, and nothing else is derived
        from it. That still has a trade-off worth stating:{' '}
        <strong>we cannot look your answers up on request</strong>, because there is nothing
        readable to look them up by. If you want a response removed, email{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with roughly when you submitted it
        and what you wrote, and we will find and delete it by hand.
      </p>
      <p>
        Answers are stored in Supabase (EU region) and used to decide what to build and who the app
        is for. They are not sold, not shared, and not used for advertising. Submitting is optional
        and nothing on this site is gated behind it.
      </p>

      <h2>Your rights, in the app</h2>
      <ul>
        <li><strong>Delete your account</strong> — Settings → Account → Delete. Hard-deleted after a 30-day grace period.</li>
        <li><strong>Export your data</strong> — Settings → Export. Emails you a signed JSON dump of your sessions, transcripts and scores.</li>
        <li><strong>Delete a single session</strong> — from that session&rsquo;s detail screen.</li>
      </ul>

      <h2>Processing by OpenAI</h2>
      <p>
        Conversations run on OpenAI&rsquo;s Realtime API. Inputs and outputs are not used to train
        their models by default, and their abuse-monitoring logs are retained for no more than 30
        days. We pursue Zero Data Retention for eligible endpoints where our organisation tier
        supports it.
      </p>

      <h2>Children</h2>
      <p>
        ImprovTalk is not directed at children and is not intended for anyone under 13. We do not
        knowingly collect data from children.
      </p>

      <h2>Contact</h2>
      <p>
        Questions, or a request to delete something, go to{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </PageShell>
  )
}

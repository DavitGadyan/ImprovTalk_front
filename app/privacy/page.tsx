import type { Metadata } from 'next'
import { PageShell } from '@/components/ui/page-shell'
import { SUPPORT_EMAIL } from '@/content/links'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'What ImprovTalk collects, how long it keeps it, and how to get it deleted.',
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
            <td><strong>24 hours after scoring</strong>, then hard-deleted</td>
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

      <h2>What we do not collect</h2>
      <ul>
        <li>No contacts, calendar, photos or location.</li>
        <li>No microphone access outside an active session screen.</li>
        <li>No advertising SDKs.</li>
        <li>No third-party analytics SDKs that ingest your transcripts.</li>
      </ul>

      <h2>How audio is handled</h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Audio is recorded locally on your device during a session.</li>
        <li>It uploads to our storage only when the session ends.</li>
        <li>A worker transcribes it and extracts acoustic features, which takes roughly 60–90 seconds.</li>
        <li>The recording is marked for deletion 24 hours later.</li>
        <li>A nightly job hard-deletes the file and clears its storage reference.</li>
      </ol>
      <p>
        Short clips from your weakest moments may be kept for up to 7 days so the replay screen can
        play them back, then deleted; after that the replay degrades to transcript only. Paid users
        can opt in to extended 30-day audio retention in Settings. It is off by default.
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

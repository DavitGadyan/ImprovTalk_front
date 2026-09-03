import type { Metadata } from 'next'
import { GetClient } from './get-client'

export const metadata: Metadata = {
  title: 'Get the app',
  description:
    'Install ImprovTalk on iPhone. Scan the code or open the TestFlight link — free to start, no card, about a minute.',
  /* A redirector has no business in search results. */
  robots: { index: false, follow: true },
}

export default function GetPage() {
  return <GetClient />
}

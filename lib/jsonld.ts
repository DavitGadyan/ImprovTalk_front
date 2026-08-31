import { site } from '@/content/site'
import { faqs } from '@/content/faq'
import { stats, TOTAL_LIBRARY_ITEMS } from '@/content/catalogs'

/**
 * Structured data.
 *
 * Answer engines and search both read this before they read the prose, so it is
 * the highest-leverage place to state plainly what the product is. Everything
 * here is generated from the same content files the page renders, so the schema
 * cannot drift from what a visitor actually sees — which is exactly the kind of
 * mismatch that gets structured data ignored or penalised.
 *
 * Deliberately absent: `aggregateRating`. There are no real reviews yet, and
 * inventing them is both a Google policy violation and a lie.
 */

const LOGO = `${site.url}/icon-512.png`

export const organizationLd = {
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: { '@type': 'ImageObject', url: LOGO, width: 512, height: 512 },
  email: site.supportEmail,
  description: site.description,
  /* `sameAs` is omitted until real profiles exist — an empty or wrong entity
     link is worse for disambiguation than none. */
}

export const websiteLd = {
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { '@id': `${site.url}/#organization` },
  inLanguage: 'en',
}

export const softwareLd = {
  '@type': 'SoftwareApplication',
  '@id': `${site.url}/#app`,
  name: site.name,
  applicationCategory: 'EducationalApplication',
  applicationSubCategory: 'Communication skills training',
  operatingSystem: 'iOS 16.0 or later',
  description: site.description,
  url: site.url,
  image: `${site.url}/og.png`,
  screenshot: `${site.url}/og.png`,
  publisher: { '@id': `${site.url}/#organization` },
  /* The three languages a conversation can actually run in — verified against
     CONVERSATION_LANGUAGES in the API, not the app's UI language, which is
     English only. */
  inLanguage: ['en', 'es', 'ru'],
  featureList: [
    'Live voice conversation practice with an AI partner',
    'Conversations in English, Spanish or Russian',
    `${stats.liveScenarios} live scenarios across ${stats.liveVenues} venues`,
    `${stats.simScenarios} AI-vs-AI simulator scenarios across ${stats.simVenues} venues`,
    'Charisma Score from fluency, confidence and improvisation',
    'Acoustic delivery analysis: pace, pauses, filler words, pitch, volume',
    'Every score shows the measurements behind it',
    `Reference library of ${TOTAL_LIBRARY_ITEMS.toLocaleString('en')} conversation topics`,
    'Solo drills for interviews, networking, storytelling and tough feedback',
    'Audio deleted 24 hours after scoring',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
    description: `Free to start — ${stats.freeWeekly} AI conversations a week`,
  },
}

/**
 * Built from the FAQ actually rendered on the page. Google requires FAQPage
 * markup to match visible content, and each persona ships its own questions —
 * a single shared block would describe a page the visitor is not looking at.
 */
export function faqLd(entries: readonly { q: string; a: string }[] = faqs) {
  return {
    '@type': 'FAQPage',
    '@id': `${site.url}/#faq`,
    mainEntity: entries.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/** One graph rather than several loose blocks, so the @id references resolve. */
export function homeJsonLd(faqEntries?: readonly { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationLd, websiteLd, softwareLd, faqLd(faqEntries)],
  }
}

export function pageJsonLd(extra: Record<string, unknown>[] = []) {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationLd, websiteLd, ...extra],
  }
}

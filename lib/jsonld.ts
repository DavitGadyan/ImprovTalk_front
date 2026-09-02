import { site } from '@/content/site'
import { faqs } from '@/content/faq'
import { stats, TOTAL_LIBRARY_ITEMS } from '@/content/catalogs'
import {
  scenarios,
  videoSrc,
  posterSrc,
  FILM_UPLOAD_DATE,
  FILM_WIDTH,
  FILM_HEIGHT,
  type Scenario,
} from '@/content/media'
import type { Post } from '@/content/posts'

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
    'Your voice is used to score the session and nothing else',
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

/* ------------------------------------------------------------------ *
 * Nodes for the pages beyond the persona landing pages.
 * All of these compose through pageJsonLd() so the @id references to
 * #organization and #website resolve inside a single graph.
 * ------------------------------------------------------------------ */

/**
 * VideoObject for a scenario film.
 *
 * These are self-hosted, so `contentUrl` points at our own mp4 and there is no
 * `embedUrl` — Google accepts either, and an embed URL we do not have would be a
 * fabricated field. Duration and dimensions were measured with ffprobe against
 * the shipped files rather than copied from the source specs, which differ.
 */
export function videoLd(s: Scenario) {
  return {
    '@type': 'VideoObject',
    '@id': `${site.url}/#video-${s.slug}`,
    name: `${s.label} — conversation practice scenario`,
    description: s.caption,
    thumbnailUrl: `${site.url}${posterSrc(s.slug)}`,
    contentUrl: `${site.url}${videoSrc(s.slug)}`,
    uploadDate: FILM_UPLOAD_DATE,
    duration: s.duration,
    width: FILM_WIDTH,
    height: FILM_HEIGHT,
    publisher: { '@id': `${site.url}/#organization` },
  }
}

export const allVideosLd = scenarios.map(videoLd)

/** HowTo. `steps` is [name, text] so callers cannot drift from what renders. */
export function howToLd(opts: {
  id: string
  name: string
  description: string
  steps: readonly (readonly [string, string])[]
}) {
  return {
    '@type': 'HowTo',
    '@id': `${site.url}/${opts.id}/#howto`,
    name: opts.name,
    description: opts.description,
    step: opts.steps.map(([name, text], i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name,
      text,
    })),
  }
}

/** BreadcrumbList. Pass paths with trailing slashes, matching trailingSlash. */
export function breadcrumbLd(trail: readonly (readonly [string, string])[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${site.url}${path}`,
    })),
  }
}

export function blogPostingLd(post: Post) {
  return {
    '@type': 'BlogPosting',
    '@id': `${site.url}${post.path}#post`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: `${site.url}${post.path}`,
    inLanguage: 'en',
    /* Authored and published by the company. There is no personal byline on this
       site, and inventing one to satisfy a schema field would be a fabrication. */
    author: { '@id': `${site.url}/#organization` },
    publisher: { '@id': `${site.url}/#organization` },
    isPartOf: { '@id': `${site.url}/blog/#blog` },
    image: `${site.url}/og.png`,
  }
}

export const blogLd = {
  '@type': 'Blog',
  '@id': `${site.url}/blog/#blog`,
  name: `${site.name} — how to actually talk to people`,
  description:
    'Conversation technique: how to open, what to notice, how to read the window, and how to hear a no.',
  url: `${site.url}/blog/`,
  publisher: { '@id': `${site.url}/#organization` },
  inLanguage: 'en',
}

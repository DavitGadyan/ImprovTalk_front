import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

/* Required under output: 'export' — see the note in sitemap.ts. */
export const dynamic = 'force-static'

/**
 * The goal is to be read and cited, including by answer engines, so the
 * permissions below are deliberate rather than inherited from a default.
 *
 * Google-Extended in particular is opt-out by omission in most people's minds
 * but opt-in by absence in practice: without naming it, Gemini and AI Overviews
 * still use the content. Naming it makes the intent explicit and reviewable.
 */
export default function robots(): MetadataRoute.Robots {
  /* Redirector and post-payment pages have no search or citation value. */
  const disallow = ['/get/', '/billing/']

  const aiCrawlers = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-User',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    'Applebot-Extended',
    'CCBot',
    'Bytespider',
    'meta-externalagent',
  ]

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: '/', disallow })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}

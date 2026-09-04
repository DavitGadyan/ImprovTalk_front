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
  /*
   * Nothing is disallowed, and that is deliberate.
   *
   * `/get/` (the store redirector) and `/billing/*` (post-payment) carry
   * `noindex` in their metadata, which is the stronger and more precise signal —
   * but only if the page can be fetched. Disallowing them meant Googlebot never
   * read the noindex, and `/get/` is linked from the footer of every page, so
   * Search Console reports it as "Indexed, though blocked by robots.txt": the
   * bare URL in the index with no content behind it, which is the outcome the
   * Disallow was meant to prevent. Crawl budget is not a consideration at
   * seventeen pages.
   */

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
      { userAgent: '*', allow: '/' },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}

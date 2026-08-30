import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

/* Required under output: 'export' — see the note in sitemap.ts. */
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      /* Redirector and post-payment pages have no search value. */
      disallow: ['/get/', '/billing/'],
    },
    sitemap: `${site.url}/sitemap.xml`,
  }
}

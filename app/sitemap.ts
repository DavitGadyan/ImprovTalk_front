import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

/* Works under output: 'export' — Next emits a static sitemap.xml at build time. */
/* Required under output: 'export' — without it Next treats this as a dynamic
   route handler and the build fails when collecting page data. */
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/privacy/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${site.url}/terms/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${site.url}/support/`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]
}

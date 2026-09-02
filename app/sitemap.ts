import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { allPersonas, DEFAULT, personas } from '@/content/personas'
import { posts } from '@/content/posts'

/* Works under output: 'export' — Next emits a static sitemap.xml at build time. */
/* Required under output: 'export' — without it Next treats this as a dynamic
   route handler and the build fails when collecting page data. */
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  /* The four persona pages other than the canonical one. They were omitted while
     they were noindex split arms; they are indexable landing pages now, each
     written for a different search intent, so they belong here. */
  const variants: MetadataRoute.Sitemap = allPersonas
    .filter((p) => p.path !== personas[DEFAULT].path)
    .map((p) => ({
      url: `${site.url}${p.path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  /* The blog. Metadata comes from content/posts.ts, so a new post appears here
     the moment it is registered — there is no second list to forget. */
  const blog: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.url}${p.path}`,
    lastModified: new Date(p.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${site.url}/how-to-start-a-conversation/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...variants,
    { url: `${site.url}/about/`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${site.url}/blog/`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    ...blog,
    { url: `${site.url}/privacy/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${site.url}/terms/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${site.url}/support/`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]
}

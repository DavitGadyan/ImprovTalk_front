import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { allPersonas, DEFAULT, personas } from '@/content/personas'
import { posts } from '@/content/posts'
import { lastModified } from '@/lib/lastmod'

/* Works under output: 'export' — Next emits a static sitemap.xml at build time. */
/* Required under output: 'export' — without it Next treats this as a dynamic
   route handler and the build fails when collecting page data. */
export const dynamic = 'force-static'

/* Copy and layout both come from shared section components, so a change to any
   of them really is a change to every persona page. */
const SHARED = ['components/sections', 'components/persona-page.tsx']

/** `/second-language/` → `app/second-language/page.tsx`; `/` → `app/page.tsx`. */
const pageFile = (path: string) => `app${path}page.tsx`

export default function sitemap(): MetadataRoute.Sitemap {
  /* The four persona pages other than the canonical one. They were omitted while
     they were noindex split arms; they are indexable landing pages now, each
     written for a different search intent, so they belong here. */
  const variants: MetadataRoute.Sitemap = allPersonas
    .filter((p) => p.path !== personas[DEFAULT].path)
    .map((p) => ({
      url: `${site.url}${p.path}`,
      lastModified: lastModified(`content/personas/${p.slug}.ts`, pageFile(p.path), ...SHARED),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  /* The blog. Metadata comes from content/posts.ts, so a new post appears here
     the moment it is registered — there is no second list to forget. */
  const blog: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.url}${p.path}`,
    /* The post's own date, not git's: an edit to the shared prose styles is not
       a change to the article, and claiming it is is the exact overstatement
       this file was fixed to stop making. */
    lastModified: new Date(p.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  return [
    {
      url: `${site.url}/`,
      lastModified: lastModified(
        `content/personas/${DEFAULT}.ts`,
        pageFile(personas[DEFAULT].path),
        ...SHARED,
      ),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${site.url}/how-to-start-a-conversation/`,
      lastModified: lastModified(pageFile('/how-to-start-a-conversation/')),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...variants,
    {
      url: `${site.url}/about/`,
      lastModified: lastModified(pageFile('/about/')),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${site.url}/blog/`,
      lastModified: lastModified(pageFile('/blog/'), 'content/posts.ts'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...blog,
    {
      url: `${site.url}/privacy/`,
      lastModified: lastModified(pageFile('/privacy/')),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${site.url}/terms/`,
      lastModified: lastModified(pageFile('/terms/')),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${site.url}/support/`,
      lastModified: lastModified(pageFile('/support/')),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}

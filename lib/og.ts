import { site } from '@/content/site'

/**
 * The Open Graph fields every page shares.
 *
 * Next merges metadata shallowly: a page that sets `openGraph` at all
 * replaces the layout's whole object, images and siteName included. Every
 * page here sets at least its `url`, so every page was shipping without an
 * og:image — measured on the export, only the noindex pages had one. Spread
 * this first, then the page's own fields.
 */
export const OG: { type: 'website'; siteName: string; images: { url: string; width: number; height: number; alt: string }[] } = {
  type: 'website',
  siteName: site.name,
  images: [{ url: '/og.png', width: 1200, height: 630, alt: site.name }],
}

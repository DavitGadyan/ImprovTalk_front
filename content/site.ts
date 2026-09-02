/**
 * Single source of truth for site-level facts.
 *
 * Everything the page, the metadata, the sitemap and the legal pages need
 * lives here so a domain or contact change is a one-line edit.
 */
export const site = {
  name: 'ImprovTalk',
  tagline: 'Talk like you have done this before.',
  /* Kept under 160 characters so it survives intact in search results. */
  description:
    'ImprovTalk is a voice-first AI communication coach. Practise real conversations out loud and get scored on what you said and how you said it.',
  url: 'https://improvtalk.vip',
  locale: 'en',
  supportEmail: 'davidgadyan92@gmail.com',
  /* Company/legal entity name for the legal pages. */
  legalEntity: 'ImprovTalk',
  /*
   * Google Search Console ownership token.
   *
   * Paste the content value from Search Console's "HTML tag" method here — just
   * the token, not the whole tag. Leave it empty and no meta tag is emitted.
   *
   * Use the HTML tag method rather than the Google Analytics one: our gtag
   * config call is afterInteractive, so Next moves it into the JS bundle and it
   * is not in the served HTML, which is where the GA verifier looks. The file
   * method also works but adds a file that must never be deleted.
   */
  googleSiteVerification: '',
} as const

export const nav = [
  { href: '/#how', label: 'How it works' },
  { href: '/#scoring', label: 'Scoring' },
  { href: '/#inside', label: 'Library' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/blog/', label: 'Blog' },
] as const

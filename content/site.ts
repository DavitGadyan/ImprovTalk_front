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
  url: 'https://improvtalk.s1mpleai.org',
  locale: 'en',
  supportEmail: 'support@s1mpleai.org',
  /* Company/legal entity name for the legal pages. */
  legalEntity: 'ImprovTalk',
} as const

export const nav = [
  { href: '#how', label: 'How it works' },
  { href: '#scoring', label: 'Scoring' },
  { href: '#library', label: 'Library' },
  { href: '#faq', label: 'FAQ' },
] as const

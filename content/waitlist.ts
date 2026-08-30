/**
 * Early-access capture.
 *
 * The site is a static export with no backend, so submissions need somewhere to
 * go. Set ENDPOINT to a form service that emails you (Web3Forms, Formspree,
 * Tally, …) and the form POSTs there.
 *
 * While ENDPOINT is empty the form still works: it falls back to opening the
 * visitor's mail client with everything pre-filled. That is worse for
 * conversion, but it is never a dead end and needs no third party.
 *
 * DELIVER_TO is deliberately the support address on your own domain rather than
 * a personal Gmail. It ends up in the same inbox once you forward it, but a
 * personal address sitting in public HTML gets scraped and spammed within days.
 */
export const waitlist = {
  /** e.g. 'https://api.web3forms.com/submit' — see docs/EARLY-ACCESS.md */
  ENDPOINT: '',
  /** Extra fields the chosen service needs, e.g. { access_key: '…' }. */
  FIELDS: {} as Record<string, string>,
  DELIVER_TO: 'support@s1mpleai.org',
  SUBJECT: 'ImprovTalk — TestFlight early access request',
} as const

export const hasEndpoint = Boolean(waitlist.ENDPOINT)

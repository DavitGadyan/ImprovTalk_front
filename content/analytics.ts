/**
 * Analytics and Ads configuration — the only file to edit when the IDs exist.
 *
 * While every value below is empty, nothing loads: no gtag script, no consent
 * banner, no network calls to Google. That keeps the site shippable and lawful
 * by default, and means a missing ID degrades to "no tracking" rather than to a
 * broken page.
 */
export const analytics = {
  /** GA4 measurement ID for the improvtalk.vip web stream. */
  GA4_ID: 'G-TQHK0W81XE',

  /**
   * Google Ads conversion ID.
   *
   * Configured as a destination on the same Google tag as GA4, so it loads
   * through the existing gtag — and therefore inherits the Consent Mode
   * defaults set before that library initialises. Pasting the snippet Ads
   * offers instead would load it outside that gate.
   */
  ADS_ID: 'AW-18052428576',

  /**
   * Ads conversion labels, full 'AW-XXXXXXXXX/AbC-D_efG' form.
   *
   * These must be created in Google Ads first — one conversion action each. The
   * AW- ID on its own is not enough to record a conversion.
   */
  CONVERSIONS: {
    /** Primary: someone left an address for TestFlight access. */
    earlyAccess: 'AW-18052428576/4jb2CJySoescEKDmiKBD',
    /** Weak: someone clicked an install CTA while the app is still pre-launch. */
    notifyClick: '',
  },
} as const

export const hasGA = Boolean(analytics.GA4_ID)
export const hasAds = Boolean(analytics.ADS_ID)
/** Nothing is loaded, and no banner shown, unless at least one tag is configured. */
export const trackingEnabled = hasGA || hasAds

/**
 * GA4 event names, kept here so call sites cannot drift from the reports.
 *
 * The distinction that matters for bidding:
 *
 *   early_access_submit  A server confirmed it has the address. This is the
 *                        only real conversion, and the only one worth
 *                        optimising spend against.
 *   early_access_intent  The visitor's mail client was opened with a
 *                        pre-filled message. We cannot know whether they
 *                        pressed send, so this must never be counted as a
 *                        conversion — it would silently inflate the number.
 *   notify_click         Someone clicked an install CTA. Interest, not a lead.
 */
export type TrackEvent =
  | 'early_access_submit'
  | 'early_access_intent'
  | 'notify_click'
  | 'qr_reveal'
  | 'scenario_play'

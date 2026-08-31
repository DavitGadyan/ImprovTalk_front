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

  /** Google Ads conversion ID, e.g. 'AW-XXXXXXXXX'. */
  ADS_ID: '',

  /**
   * Ads conversion labels, full 'AW-XXXXXXXXX/AbC-D_efG' form.
   *
   * These must be created in Google Ads first — one conversion action each. The
   * AW- ID on its own is not enough to record a conversion.
   */
  CONVERSIONS: {
    /** Primary: someone left an address for TestFlight access. */
    earlyAccess: '',
    /** Weak: someone clicked an install CTA while the app is still pre-launch. */
    notifyClick: '',
  },
} as const

export const hasGA = Boolean(analytics.GA4_ID)
export const hasAds = Boolean(analytics.ADS_ID)
/** Nothing is loaded, and no banner shown, unless at least one tag is configured. */
export const trackingEnabled = hasGA || hasAds

/** GA4 event names. Kept here so the call sites cannot drift from the reports. */
export type TrackEvent =
  | 'early_access_submit'
  | 'notify_click'
  | 'qr_reveal'
  | 'scenario_play'

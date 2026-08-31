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
 *   testflight_click  The visitor left for TestFlight. This is the acquisition
 *                     event and the only conversion — the closest thing to an
 *                     install the website can see, since what happens on
 *                     Apple's side is invisible from here.
 *   notify_click      Someone opened the install panel. Interest, not
 *                     acquisition; useful as a denominator against the above.
 *   qr_reveal         The panel was opened.
 *   scenario_play     A scenario film was played.
 */
export type TrackEvent =
  | 'testflight_click'
  | 'notify_click'
  | 'qr_reveal'
  | 'scenario_play'

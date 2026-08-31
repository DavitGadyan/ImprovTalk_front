'use client'

import { analytics, trackingEnabled, type TrackEvent } from '@/content/analytics'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Fire a GA4 event and, where a matching Ads conversion label exists, the Ads
 * conversion too.
 *
 * Safe to call unconditionally. If tracking is not configured, or the visitor
 * declined consent (in which case gtag is loaded but storage is denied), this
 * does nothing rather than throwing.
 */
export function track(event: TrackEvent, params: Record<string, unknown> = {}) {
  if (!trackingEnabled || typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', event, params)

  /*
   * Both routes to acquiring a user map to the primary conversion: leaving for
   * TestFlight, and leaving an address. They are the same outcome reached
   * differently — an iPhone visitor installs directly, an Android visitor (or
   * anyone hitting a closed beta) hands over an address instead. Counting only
   * the form would have recorded nothing at all once the beta opened, because
   * the people it works best for never touch the form.
   */
  const label =
    event === 'early_access_submit' || event === 'testflight_click'
      ? analytics.CONVERSIONS.earlyAccess
      : event === 'notify_click'
        ? analytics.CONVERSIONS.notifyClick
        : ''

  if (label) window.gtag('event', 'conversion', { send_to: label, ...params })
}

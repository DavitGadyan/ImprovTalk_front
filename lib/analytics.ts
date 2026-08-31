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
let currentVariant = ''

/**
 * Records which persona variant this visitor is seeing.
 *
 * Sent as a GA4 user property so it persists across sessions, and attached to
 * every event below. Comparing by page_path alone would work today but breaks
 * the moment a URL changes, and loses anyone returning by a different route.
 */
export function setVariant(slug: string) {
  currentVariant = slug
  if (!trackingEnabled || typeof window === 'undefined' || !window.gtag) return
  window.gtag('set', 'user_properties', { variant: slug })
}

export function track(event: TrackEvent, params: Record<string, unknown> = {}) {
  if (!trackingEnabled || typeof window === 'undefined' || !window.gtag) return

  const withVariant = { ...params, variant: currentVariant }
  window.gtag('event', event, withVariant)

  /*
   * Leaving for TestFlight is the conversion. There is no form to submit any
   * more — an address nobody was going to act on bought a broken submit button
   * and cost a click that would otherwise have gone straight to the beta.
   */
  const label =
    event === 'testflight_click'
      ? analytics.CONVERSIONS.earlyAccess
      : event === 'notify_click'
        ? analytics.CONVERSIONS.notifyClick
        : ''

  if (label) window.gtag('event', 'conversion', { send_to: label, ...withVariant })
}

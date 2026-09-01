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

const TXN_KEY = 'improvtalk-txn'

/**
 * A per-session id for de-duplicating conversions.
 *
 * The conversion fires on every exit to TestFlight, so someone who clicks,
 * comes back and clicks again would be counted twice. Google Ads dedupes on
 * transaction_id, which makes the count "sessions that converted" rather than
 * "times a link was clicked".
 *
 * Ads' own Count: One setting only dedupes within a single ad click, so it does
 * nothing for organic visitors — who have no gclid to group by. Without this,
 * GA4 and Ads would report different numbers and neither would obviously be
 * wrong.
 *
 * sessionStorage on purpose: a genuine return visit tomorrow is a new session
 * and should count again. Storage being unavailable is not fatal — the
 * conversion still fires, it just is not deduped.
 */
function transactionId(): string | undefined {
  if (typeof window === 'undefined') return undefined
  try {
    let id = sessionStorage.getItem(TXN_KEY)
    if (!id) {
      id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
      sessionStorage.setItem(TXN_KEY, id)
    }
    return id
  } catch {
    return undefined
  }
}

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

  if (!label) return

  const txn = transactionId()
  window.gtag('event', 'conversion', {
    send_to: label,
    ...withVariant,
    /* Same id for the whole session, so repeat clicks collapse into one
       conversion rather than inflating the number Ads bids against. */
    ...(txn ? { transaction_id: `${event}-${txn}` } : {}),
  })
}

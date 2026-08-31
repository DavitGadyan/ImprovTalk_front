'use client'

import Script from 'next/script'
import { analytics, hasGA, hasAds, trackingEnabled } from '@/content/analytics'

/**
 * Google tags with Consent Mode v2.
 *
 * Ordering is the part that is easy to get wrong and impossible to see when it
 * is wrong: the `consent default` call must run BEFORE the gtag library loads,
 * or the library initialises with storage already granted and the denial never
 * applies. That is why the defaults go in a `beforeInteractive` script and the
 * library itself in `afterInteractive`.
 *
 * Everything is denied until the visitor accepts. Google has required Consent
 * Mode v2 for EEA traffic since March 2024 — without it, EEA conversion data is
 * degraded and it breaches Ads policy.
 *
 * Renders nothing at all when no IDs are configured, so an unconfigured site
 * ships with no third-party requests and needs no banner.
 */
export function GoogleTags() {
  if (!trackingEnabled) return null

  // GA4 is the primary tag when present; otherwise Ads bootstraps gtag.
  const bootstrapId = hasGA ? analytics.GA4_ID : analytics.ADS_ID

  return (
    <>
      <Script id="consent-default" strategy="beforeInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
gtag('js', new Date());
        `}
      </Script>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${bootstrapId}`}
        strategy="afterInteractive"
      />

      <Script id="gtag-config" strategy="afterInteractive">
        {`
${hasGA ? `gtag('config', '${analytics.GA4_ID}', { anonymize_ip: true });` : ''}
${hasAds ? `gtag('config', '${analytics.ADS_ID}');` : ''}
        `}
      </Script>
    </>
  )
}

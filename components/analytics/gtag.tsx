'use client'

import Script from 'next/script'
import { analytics, hasGA, hasAds, trackingEnabled } from '@/content/analytics'

/**
 * Google tags with Consent Mode v2.
 *
 * Ordering is the part that is easy to get wrong and impossible to see when it
 * is wrong: the `consent default` call must run BEFORE the gtag library loads,
 * or the library initialises with storage already granted and the denial never
 * applies. That is why the defaults are an inline script in the document
 * itself, run by the parser, and the library loads lazyOnload.
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
      {/*
        The consent defaults, inlined in the document itself — not through
        next/script. Two reasons. One, an inline script in the server HTML
        runs as the parser reaches it, earlier than beforeInteractive's queue.
        Two, hydration: wallet extensions (Leather was the one seen) inject
        their provider <script> before the first <script> in <body>, and React
        pairs same-tag nodes positionally, so a consent <Script> element got
        the extension's node and every script after it shifted by one — a
        hydration error on every dev load. Inside a hidden div's innerHTML
        the script is markup, not a React element: React compares the div's
        innerHTML once, and suppressHydrationWarning tells it that the
        extension's addition inside it is expected. The div itself never
        re-renders, so nothing is ever patched over it.
      */}
      <div
        hidden
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `<script id="consent-default">
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
</script>`,
        }}
      />

      {/*
        lazyOnload, not afterInteractive.

        afterInteractive makes Next emit <link rel="preload" as="script"> for
        this in <head>, which hands a third-party analytics library
        critical-path priority: a fresh DNS + TCP + TLS handshake to
        googletagmanager.com, then a large script competing with our own CSS and
        JS, before anything paints. Measured on a throttled phone it cost 2.9s
        of FCP and 8.5s of DOMContentLoaded — it was the entire mobile
        performance problem, not the fonts or the animation library.

        The trade: page_view fires after load rather than during it, so a
        visitor who bounces inside ~2s may go uncounted. Conversions are
        unaffected — testflight_click fires on a tap, long after load.
      */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${bootstrapId}`}
        strategy="lazyOnload"
      />

      <Script id="gtag-config" strategy="lazyOnload">
        {`
(function () {
  // Recover the referrer the variant redirect consumed, so untagged traffic is
  // still attributed to Instagram, YouTube or wherever it actually came from
  // instead of to this site itself. Stashed by components/variant-assign.tsx.
  var ref = null;
  try {
    ref = sessionStorage.getItem('improvtalk-ref');
    if (ref) sessionStorage.removeItem('improvtalk-ref');
  } catch (e) {}
  var extra = ref ? { page_referrer: ref } : {};
${hasGA ? `  gtag('config', '${analytics.GA4_ID}', Object.assign({ anonymize_ip: true }, extra));` : ''}
${hasAds ? `  gtag('config', '${analytics.ADS_ID}', extra);` : ''}
})();
        `}
      </Script>
    </>
  )
}

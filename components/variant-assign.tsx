import Script from 'next/script'
import { personas, ACTIVE_SPLIT, DEFAULT } from '@/content/personas'

const KEY = 'improvtalk-variant'

/**
 * Random, sticky assignment across the personas in the live split.
 *
 * Runs beforeInteractive so the redirect happens ahead of first paint — a
 * client-side swap after hydration would show the wrong copy for a beat, which
 * is both worse than no test and impossible to un-see once noticed.
 *
 * THE PART THAT MATTERS: the redirect carries location.search and location.hash
 * through unchanged. Drop the query string and every gclid goes with it — Google
 * Ads attribution breaks silently, conversions stop matching clicks, and it
 * reads as a targeting problem rather than a bug. Paid traffic is the entire
 * reason this test exists.
 *
 * Storage is first-party and functional, covered by functionality_storage in the
 * consent defaults. It deliberately does not wait on analytics consent, which
 * starts denied — gating on that would make most visitors flash on every load.
 */
export function VariantAssign() {
  const paths: Record<string, string> = Object.fromEntries(
    Object.entries(personas).map(([slug, p]) => [slug, p.path]),
  )

  const js = `
(function () {
  try {
    var PATHS = ${JSON.stringify(paths)};
    var SPLIT = ${JSON.stringify(ACTIVE_SPLIT)};
    var KEY = ${JSON.stringify(KEY)};
    var HOME = ${JSON.stringify(personas[DEFAULT].path)};

    // Only the canonical page assigns. Landing straight on a variant — from an
    // ad, or a shared link — must never be redirected away from it.
    if (location.pathname !== HOME) return;

    var qs = new URLSearchParams(location.search);
    var forced = qs.get('v');

    var chosen;
    if (forced && PATHS[forced]) {
      chosen = forced;                     // ?v= overrides everything, incl. personas outside the split
    } else {
      var stored = null;
      try { stored = localStorage.getItem(KEY); } catch (e) {}
      // A stored choice only counts while that persona is still in the split.
      if (stored && SPLIT.indexOf(stored) !== -1) {
        chosen = stored;
      } else {
        chosen = SPLIT[Math.floor(Math.random() * SPLIT.length)];
        try { localStorage.setItem(KEY, chosen); } catch (e) {}
      }
    }

    var target = PATHS[chosen];
    if (!target || target === HOME) return;

    // Stash the real referrer before leaving. location.replace() makes the
    // destination's document.referrer this page, and gtag only fires after the
    // redirect — so without this, anyone arriving untagged from Instagram,
    // YouTube or a shared link is recorded as a self-referral and the true
    // source is lost. UTM'd traffic is unaffected either way, since UTMs win
    // over referrer.
    try {
      var ref = document.referrer;
      if (ref && ref.indexOf(location.host) === -1) {
        sessionStorage.setItem('improvtalk-ref', ref);
      }
    } catch (e) {}

    // search + hash preserved: this is what keeps gclid alive.
    location.replace(target + location.search + location.hash);
  } catch (e) {
    // Any failure leaves the visitor on the default page, which is a working
    // page. A broken experiment must never become a broken site.
  }
})();
  `.trim()

  return (
    <Script id="variant-assign" strategy="beforeInteractive">
      {js}
    </Script>
  )
}

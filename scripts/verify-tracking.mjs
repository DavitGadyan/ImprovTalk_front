#!/usr/bin/env node
/**
 * Tracking invariants, checked against the built export.
 *
 * Run after any change that touches layout, the persona pages, the install
 * dialog or analytics — the money path is easy to break silently, because a
 * missing id or a renamed handler still builds, still renders, and still looks
 * completely fine.
 *
 *   npm run build && node scripts/verify-tracking.mjs
 *
 * This is deliberately a static check on out/ rather than a browser test: it
 * needs no dependencies, runs in CI in under a second, and catches the
 * regressions that actually happen (an id removed, a label changed, a script
 * strategy flipped). It cannot prove a request reached Google — for that, load
 * the site in a fresh browser profile and watch the network for
 * `/g/collect` (GA4) and `/pagead/conversion/` (Ads) after clicking through the
 * install dialog. A reused profile will under-report GA4: the client throttles
 * repeat page_views inside one session, which reads as "analytics is broken"
 * and is not.
 */
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const OUT = 'out'
const read = (p) => readFileSync(join(OUT, p), 'utf8')

const GA4 = 'G-TQHK0W81XE'
const ADS = 'AW-18052428576'
const CONVERSION_LABEL = '4jb2CJySoescEKDmiKBD'

/* Every page that renders a persona, i.e. carries the install path. */
const PERSONA_PAGES = [
  'index.html',
  'second-language/index.html',
  'meeting-people/index.html',
  'speaking-up/index.html',
  'out-of-practice/index.html',
]

/* Pages that must still load the tags even though they cannot convert. */
const CONTENT_PAGES = [
  'blog/index.html',
  'blog/how-to-stop-saying-um/index.html',
  'how-to-start-a-conversation/index.html',
  'support/index.html',
]

const failures = []
const check = (name, ok, detail = '') => {
  if (!ok) failures.push(detail ? `${name} — ${detail}` : name)
}

if (!existsSync(OUT)) {
  console.error('out/ not found. Run `npm run build` first.')
  process.exit(1)
}

const home = read('index.html')

// --- tag identity -----------------------------------------------------------
// The library src is inlined in the HTML as a preload hint; the Ads config call
// and the conversion label are afterInteractive, so Next moves them into the JS
// bundle. Look in both rather than assuming either.
const bundles = [...home.matchAll(/\/_next\/static\/chunks\/[^"']+\.js/g)].map((m) => m[0])
const bundleText = bundles
  .map((b) => {
    try {
      return read(b.replace(/^\//, ''))
    } catch {
      return ''
    }
  })
  .join('')
const everything = home + bundleText
check('GA4 measurement id present', everything.includes(GA4))
check('Ads conversion id present', everything.includes(ADS))
check(
  'Ads conversion label reachable from the bundle',
  bundleText.includes(CONVERSION_LABEL),
  'CONVERSIONS.earlyAccess is what makes a click count as a conversion',
)
check('testflight_click event name intact', bundleText.includes('testflight_click'))
check('transaction_id dedup intact', bundleText.includes('transaction_id'))

// --- consent mode -----------------------------------------------------------
/*
 * Next injects the gtag library at runtime, so there is no script tag in the
 * HTML to order against. What can be asserted is that the defaults are inlined
 * in the static document at all — that is what `beforeInteractive` produces, and
 * an afterInteractive default would not appear here.
 */
check(
  'consent defaults are inlined (beforeInteractive)',
  home.includes("gtag('consent', 'default'"),
  'if these move to afterInteractive the first hits go out unconsented',
)
check('consent defaults wait for an update', home.includes('wait_for_update'))
for (const key of ['ad_storage', 'analytics_storage', 'ad_user_data', 'ad_personalization']) {
  check(`${key} defaults to denied`, new RegExp(`${key}:\\s*'denied'`).test(home))
}
check(
  'functionality_storage granted',
  /functionality_storage:\s*'granted'/.test(home),
  'the variant assignment depends on it and must not wait for consent',
)

// --- the install path -------------------------------------------------------
for (const page of PERSONA_PAGES) {
  const html = read(page)
  check(`${page}: hero CTA id`, html.includes('id="hero-cta"'), 'the floating pill observes this')
  check(`${page}: install dialog present`, html.includes('<dialog'))
  check(`${page}: TestFlight link present`, html.includes('testflight.apple.com'))
  check(`${page}: loads gtag`, html.includes(GA4))
}

for (const page of CONTENT_PAGES) {
  const html = read(page)
  check(`${page}: loads gtag`, html.includes(GA4), 'content pages still need page_view')
}

// --- the variant redirect ---------------------------------------------------
const split = home.match(/SPLIT = (\[[^\]]*\])/)
check('variant split is declared', !!split)
if (split) {
  const arms = JSON.parse(split[1].replace(/\\"/g, '"'))
  check(
    'a multi-arm split does not run while variants are indexable',
    arms.length === 1 || !read('second-language/index.html').includes('rel="canonical" href="https://improvtalk.vip/second-language/"'),
    `SPLIT=${JSON.stringify(arms)} would redirect crawlers off / into a page that canonicals to itself`,
  )
}

// --- report -----------------------------------------------------------------
if (failures.length) {
  console.error(`\n✗ ${failures.length} tracking check(s) failed:\n`)
  for (const f of failures) console.error(`  - ${f}`)
  console.error('')
  process.exit(1)
}
console.log('✓ tracking invariants intact (tags, consent defaults, install path, split)')

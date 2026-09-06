/**
 * Install destinations — the ONLY file to edit at launch.
 *
 * The app is pre-launch and iPhone only — there is no Android build, so nothing
 * here references Play. The iOS path degrades gracefully:
 *
 *   APP_STORE_URL -> TESTFLIGHT_URL -> support mailto
 *
 * Set the store URLs at launch and every button, badge and the /get redirect
 * follow automatically. The QR code never needs regenerating, because it
 * encodes /get rather than a store URL.
 */

/** From ImprovTalk/apps/mobile/eas.json -> submit.production.ios.ascAppId */
import { site } from '@/content/site'

export const IOS_APP_ID = '6774918599'
/** TODO at launch: `https://apps.apple.com/app/id${IOS_APP_ID}` */
export const APP_STORE_URL = ''
/**
 * TestFlight PUBLIC link. Must look like https://testflight.apple.com/join/XXXXXXXX
 *
 * Create it in App Store Connect: your app -> TestFlight -> a group with
 * External Testing -> enable Public Link.
 *
 * Do NOT put an appstoreconnect.apple.com URL here. Those are admin pages behind
 * an Apple developer login — every visitor would hit a sign-in wall, and it
 * would look fine to you because you are already signed in.
 */
/*
   * The public TestFlight link. Verified working: the beta accepts testers and
   * has been installed from.
   *
   * An earlier comment here claimed Apple was refusing new testers and said the
   * email form stayed visible beside it as a fallback. Both halves were wrong —
   * the beta is open, and that form was deliberately removed in f3cffb5.
   */
export const TESTFLIGHT_URL = 'https://testflight.apple.com/join/TRmKruWt'

/** Re-exported from site.ts so the address is defined exactly once. */
export const SUPPORT_EMAIL = site.supportEmail

/** Where the QR points. Stable across launch — /get does the routing. */
export const GET_URL = 'https://improvtalk.vip/get/'

export const NOTIFY_MAILTO =
  `mailto:${SUPPORT_EMAIL}` +
  '?subject=' + encodeURIComponent('ImprovTalk — tell me when it launches') +
  '&body=' + encodeURIComponent(
    "I'd like to know when ImprovTalk is available.\n",
  )

export const iosHref = () => APP_STORE_URL || TESTFLIGHT_URL || NOTIFY_MAILTO

export const isLive = {
  ios: Boolean(APP_STORE_URL),
  testflight: Boolean(TESTFLIGHT_URL),
}

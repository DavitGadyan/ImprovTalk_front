/**
 * Install destinations — the ONLY file to edit at launch.
 *
 * The app is pre-launch: it is not listed on either store yet (verified — an
 * iTunes lookup for 6774918599 returns no results, and Google Play 404s for
 * com.improvtalk.app). So every install path degrades gracefully:
 *
 *   iOS      APP_STORE_URL -> TESTFLIGHT_URL -> support mailto
 *   Android  PLAY_STORE_URL -> support mailto
 *
 * Set the store URLs at launch and every button, badge and the /get redirect
 * follow automatically. The QR code never needs regenerating, because it
 * encodes /get rather than a store URL.
 */

/** From ImprovTalk/apps/mobile/eas.json -> submit.production.ios.ascAppId */
export const IOS_APP_ID = '6774918599'
/** From ImprovTalk/apps/mobile/app.config.ts -> ios.bundleIdentifier / android.package */
export const ANDROID_PACKAGE = 'com.improvtalk.app'

/** TODO at launch: `https://apps.apple.com/app/id${IOS_APP_ID}` */
export const APP_STORE_URL = ''
/** TODO at launch: `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}` */
export const PLAY_STORE_URL = ''
/** TODO: App Store Connect -> TestFlight -> Public Link. Looks like https://testflight.apple.com/join/XXXXXXXX */
export const TESTFLIGHT_URL = ''

export const SUPPORT_EMAIL = 'support@s1mpleai.org'

/** Where the QR points. Stable across launch — /get does the routing. */
export const GET_URL = 'https://improvtalk.vip/get/'

export const NOTIFY_MAILTO =
  `mailto:${SUPPORT_EMAIL}` +
  '?subject=' + encodeURIComponent('ImprovTalk — tell me when it launches') +
  '&body=' + encodeURIComponent(
    "I'd like to know when ImprovTalk is available.\n\nWhich phone do you use? (iPhone / Android)\n",
  )

export const iosHref = () => APP_STORE_URL || TESTFLIGHT_URL || NOTIFY_MAILTO
export const androidHref = () => PLAY_STORE_URL || NOTIFY_MAILTO

export const isLive = {
  ios: Boolean(APP_STORE_URL),
  android: Boolean(PLAY_STORE_URL),
  testflight: Boolean(TESTFLIGHT_URL),
}

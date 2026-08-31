'use client'

import Image from 'next/image'

import { useEffect, useState } from 'react'
import { LogoMark } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { track } from '@/lib/analytics'
import {
  iosHref,
  androidHref,
  isLive,
  NOTIFY_MAILTO,
  SUPPORT_EMAIL,
} from '@/content/links'

type Platform = 'ios' | 'android' | 'other' | 'unknown'

function detect(): Platform {
  if (typeof navigator === 'undefined') return 'unknown'
  const ua = navigator.userAgent
  // iPadOS 13+ reports itself as a Mac, so the touch-point check is required.
  const iOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (/Macintosh/.test(ua) && typeof document !== 'undefined' && navigator.maxTouchPoints > 1)
  if (iOS) return 'ios'
  if (/Android/i.test(ua)) return 'android'
  return 'other'
}

/**
 * The QR destination.
 *
 * Redirects only when there is a real store or TestFlight URL to redirect to.
 * While the app is pre-launch every path falls back to visible buttons, so a
 * scan never lands on a blank page or a dead link. The links themselves live in
 * content/links.ts — this component reads them and never hardcodes a URL.
 */
export function GetClient() {
  const [platform, setPlatform] = useState<Platform>('unknown')
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    const p = detect()
    setPlatform(p)

    const target =
      p === 'ios' && (isLive.ios || isLive.testflight)
        ? iosHref()
        : p === 'android' && isLive.android
          ? androidHref()
          : null

    if (target) {
      /*
       * Fire before navigating away. gtag uses sendBeacon, which survives the
       * unload — but only if the call happens first. A QR scan lands straight
       * here and is forwarded automatically, so without this the most direct
       * install route on the whole site would record nothing.
       */
      track('testflight_click', { source: 'get_redirect', platform: p })
      setRedirecting(true)
      window.location.replace(target)
    }
  }, [])

  return (
    <main
      id="main"
      className="container-page flex min-h-dvh flex-col items-center justify-center py-16 text-center"
    >
      <LogoMark size={72} className="rounded-[22.5%] shadow-[0_16px_44px_-14px_rgba(175,82,222,0.75)]" />

      <h1 className="display-md mt-7 text-ink">
        {redirecting ? 'Taking you there…' : 'Get ImprovTalk'}
      </h1>

      <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
        {redirecting
          ? 'If nothing happens, use the button below.'
          : 'A voice-first AI communication coach. Practise out loud, get scored on the evidence.'}
      </p>

      <div className="mt-9 flex w-full max-w-xs flex-col gap-3">
        {platform === 'android' && !isLive.android ? (
          <p className="text-[14px] leading-relaxed text-muted">
            ImprovTalk is on iPhone while it is in beta. The Android build is coming — check
            back soon.
          </p>
        ) : (
          <>
            <Button asChild size="lg">
              <a
                href={isLive.ios || isLive.testflight ? iosHref() : NOTIFY_MAILTO}
                onClick={() =>
                  isLive.ios || isLive.testflight
                    ? track('testflight_click', { source: 'get_button' })
                    : track('notify_click', { source: 'get_button' })
                }
              >
                {isLive.ios
                  ? 'Download on the App Store'
                  : isLive.testflight
                    ? 'Join the TestFlight beta'
                    : 'Get notified at launch'}
              </a>
            </Button>
            {/* Switches to the Android view, which carries the form — better
                than dumping the visitor into a mail client. */}
            {!isLive.android && (
              <Button variant="outline" size="lg" onClick={() => setPlatform('android')}>
                I&rsquo;m on Android
              </Button>
            )}
          </>
        )}
      </div>

      {/* Desktop visitors scan with the phone they will install on. */}
      {platform === 'other' && (
        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="rounded-2xl bg-white p-3">
            <Image src="/qr-get.svg" alt="" width={132} height={132} className="size-32" unoptimized />
          </div>
          <p className="max-w-[15rem] text-[13px] leading-relaxed text-subtle">
            Scan this with your phone to open this page there.
          </p>
        </div>
      )}

      <p className="mt-14 text-[13px] text-subtle">
        Trouble installing?{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-accent underline underline-offset-4">
          {SUPPORT_EMAIL}
        </a>
      </p>
    </main>
  )
}

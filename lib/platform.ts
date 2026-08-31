'use client'

import { useEffect, useState } from 'react'

export type Platform = 'ios' | 'android' | 'desktop' | 'unknown'

/**
 * Which device is this.
 *
 * The iPadOS check is the part that is easy to get wrong: since iPadOS 13 an
 * iPad reports itself as a Mac, so user-agent alone misses every iPad. The
 * touch-point count is what separates a real Mac from an iPad pretending to be
 * one.
 */
export function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'unknown'
  const ua = navigator.userAgent
  const iOS =
    /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
  if (iOS) return 'ios'
  if (/Android/i.test(ua)) return 'android'
  return 'desktop'
}

/**
 * Starts as 'unknown' on purpose. The export is prerendered, so a value guessed
 * at build time would be wrong for most visitors and would flip after hydration.
 * Callers should treat 'unknown' as "behave safely for everyone" — which here
 * means opening the panel rather than firing someone at a TestFlight link their
 * device cannot use.
 */
export function usePlatform(): Platform {
  const [platform, setPlatform] = useState<Platform>('unknown')
  useEffect(() => setPlatform(detectPlatform()), [])
  return platform
}

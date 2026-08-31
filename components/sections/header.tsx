'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { nav } from '@/content/site'
import { iosHref, isLive } from '@/content/links'
import { usePlatform } from '@/lib/platform'
import { cn } from '@/lib/utils'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const platform = usePlatform()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /*
   * A TestFlight link does nothing off an iPhone, so only iOS gets it directly.
   * Everyone else goes to /get, which resolves the platform and either forwards
   * or shows the scan code. Sending a desktop visitor to TestFlight lands them
   * on "open this on your device", which is a dead end.
   */
  const ctaHref = isLive.ios
    ? iosHref()
    : isLive.testflight && platform === 'ios'
      ? iosHref()
      : '/get/'

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-colors duration-300',
        scrolled && 'border-b border-line bg-canvas/85 backdrop-blur-md',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-20">
        <Link href="/" className="rounded-md" aria-label="ImprovTalk home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button asChild size="sm" className="hidden sm:inline-flex">
          <a href={ctaHref}>{isLive.ios ? 'Get the app' : 'Get early access'}</a>
        </Button>
      </div>
    </header>
  )
}

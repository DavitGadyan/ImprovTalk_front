'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { nav } from '@/content/site'
import { iosHref, isLive, NOTIFY_MAILTO } from '@/content/links'
import { cn } from '@/lib/utils'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const ctaHref = isLive.ios || isLive.testflight ? iosHref() : NOTIFY_MAILTO

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

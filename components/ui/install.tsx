'use client'

import { useState } from 'react'


import { Button } from '@/components/ui/button'
import { iosHref, isLive } from '@/content/links'
import { cn } from '@/lib/utils'
import { EarlyAccessDialog } from '@/components/ui/early-access-dialog'
import { track } from '@/lib/analytics'
import { usePlatform } from '@/lib/platform'

/**
 * Install block: primary action plus both store badges.
 *
 * Nothing here is a dead end. While the store URLs in content/links.ts are
 * empty, the badges render disabled with an honest "coming soon" and the
 * primary action falls back to the support mailto.
 */

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M16.4 12.8c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.9-3-.8c-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.6 2.3 2.8 2.2 1.1 0 1.6-.7 2.9-.7s1.7.7 2.9.7c1.2 0 2-1.1 2.7-2.2.9-1.2 1.2-2.5 1.3-2.5 0 0-2.1-.8-2.1-3.6zM14.2 5.9c.6-.8 1-1.9.9-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-.9 2.9 1 0 2.1-.5 2.7-1.3z" />
    </svg>
  )
}


function StoreBadge({
  live,
  href,
  glyph,
  top,
  bottom,
  onClick,
}: {
  live: boolean
  href: string
  glyph: React.ReactNode
  top: string
  bottom: string
  onClick?: () => void
}) {
  const inner = (
    <>
      {glyph}
      <span className="text-left leading-tight">
        <span className="block text-[10px] uppercase tracking-wider text-subtle">{top}</span>
        <span className="block text-[13px] font-medium text-ink">{bottom}</span>
      </span>
    </>
  )

  const base =
    'inline-flex items-center gap-2.5 rounded-xl border border-line-strong px-4 py-2.5 text-ink transition-colors'

  if (!live) {
    return (
      <span className={cn(base, 'cursor-default opacity-55')} aria-disabled="true">
        {inner}
      </span>
    )
  }
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(base, 'hover:border-ink/40 hover:bg-raised/50')}
    >
      {inner}
    </a>
  )
}

export function InstallBlock({
  className,
  compact = false,
  align = 'left',
  badgesOnly = false,
}: {
  className?: string
  compact?: boolean
  align?: 'left' | 'center'
  /** Drops the primary button — for places that already have their own CTA,
      like the final section, where the email form is the action. */
  badgesOnly?: boolean
}) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const platform = usePlatform()

  const anyStoreLive = isLive.ios
  /*
   * One label, everywhere. "Join the beta" and "Get early access" described the
   * same click, and two names for one action makes a page feel assembled by
   * different people. It only changes once the app is genuinely on the store.
   */
  const primaryLabel = anyStoreLive ? 'Get the app' : 'Get early access'

  /*
   * A TestFlight link only does anything on an iPhone. Sent to a desktop it
   * renders a page telling you to open it on your device — a dead end, and it
   * would also make the QR unreachable, since the QR is the thing that gets a
   * desktop visitor onto their phone in the first place.
   *
   * So: iOS goes straight there in one tap. Everyone else, including 'unknown'
   * before hydration resolves, opens the panel, which carries the QR and the
   * QR for anyone who is not already on the phone.
   */
  const directToStore = isLive.ios || (isLive.testflight && platform === 'ios')

  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center',
        className,
      )}
    >
      {!badgesOnly && (
        <div
          className={cn(
            'flex flex-wrap items-center gap-3',
            align === 'center' && 'justify-center',
          )}
        >
          {directToStore ? (
            <Button asChild size="lg">
              <a
                href={iosHref()}
                onClick={() => track('testflight_click', { source: 'hero' })}
              >
                {primaryLabel}
              </a>
            </Button>
          ) : (
            <Button
              size="lg"
              /* The attention halo lives here, on the one action the page is
                 actually asking for — not on every gradient button. */
              className="animate-[brand-pan_6s_ease-in-out_infinite,cta-pulse_3s_cubic-bezier(0.22,1,0.36,1)_infinite]"
              onClick={() => {
                track('notify_click', { target: 'install_panel' })
                setDialogOpen(true)
              }}
            >
              {primaryLabel}
            </Button>
          )}
          {!compact && (
            <Button asChild variant="ghost" size="lg">
              <a href="#how">See how it works</a>
            </Button>
          )}
        </div>
      )}

      <div
        className={cn(
          'flex flex-wrap items-center gap-2.5',
          align === 'center' && 'justify-center',
        )}
      >
        <StoreBadge
          live={isLive.ios}
          href={iosHref()}
          glyph={<AppleGlyph />}
          top={isLive.ios ? 'Download on the' : 'Coming soon to'}
          bottom="App Store"
          onClick={() => track('notify_click', { target: 'app_store_badge' })}
        />
      </div>

      <EarlyAccessDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  )
}

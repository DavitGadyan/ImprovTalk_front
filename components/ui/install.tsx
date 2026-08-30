'use client'

import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { iosHref, androidHref, isLive, NOTIFY_MAILTO } from '@/content/links'
import { cn } from '@/lib/utils'

/**
 * Install block: primary action, both store badges, and the scan code.
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

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M3.6 2.4c-.3.3-.5.8-.5 1.4v16.4c0 .6.2 1.1.5 1.4l.1.1 9.2-9.2v-.2L3.7 2.3l-.1.1zM16 15.3l-3.1-3.1v-.2L16 8.9l.1.1 3.6 2.1c1.1.6 1.1 1.6 0 2.2L16.1 15.2l-.1.1zM15.3 16 12.2 12.9 3 22.1c.4.4 1 .4 1.7 0l10.6-6.1M15.3 8 4.7 1.9C4 1.5 3.4 1.6 3 2l9.2 9.1L15.3 8z" />
    </svg>
  )
}

function StoreBadge({
  live,
  href,
  glyph,
  top,
  bottom,
}: {
  live: boolean
  href: string
  glyph: React.ReactNode
  top: string
  bottom: string
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
    <a href={href} className={cn(base, 'hover:border-ink/40 hover:bg-raised/50')}>
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
  const anyStoreLive = isLive.ios || isLive.android
  const primaryHref = isLive.ios ? iosHref() : isLive.testflight ? iosHref() : NOTIFY_MAILTO
  const primaryLabel = anyStoreLive
    ? 'Get the app'
    : isLive.testflight
      ? 'Join the beta'
      : 'Get notified at launch'

  return (
    <div
      className={cn(
        'flex flex-col gap-6 sm:flex-row sm:items-center',
        align === 'center' && 'sm:justify-center',
        className,
      )}
    >
      <div className={cn('flex flex-col gap-4', align === 'center' && 'items-center')}>
        {!badgesOnly && (
          <div
            className={cn(
              'flex flex-wrap items-center gap-3',
              align === 'center' && 'justify-center',
            )}
          >
            <Button asChild size="lg">
              <a href={primaryHref}>{primaryLabel}</a>
            </Button>
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
          />
          <StoreBadge
            live={isLive.android}
            href={androidHref()}
            glyph={<PlayGlyph />}
            top={isLive.android ? 'Get it on' : 'Coming soon to'}
            bottom="Google Play"
          />
        </div>
      </div>

      {/* Desktop only — scanning the screen you are reading is not a thing.
          The white padding is part of the quiet zone: the file carries 2
          modules and this contributes the rest. 112px is the size the
          generator verifies a successful decode at. */}
      <div className="hidden shrink-0 flex-col items-center gap-2 lg:flex">
        <div className="rounded-xl bg-white p-3">
          <Image src="/qr-get.svg" alt="" width={112} height={112} className="size-28" unoptimized />
        </div>
        <span className="text-[11px] leading-tight text-subtle">
          Scan to
          <br />
          install
        </span>
      </div>
    </div>
  )
}

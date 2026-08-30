import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Logo mark — the actual app icon.
 *
 * This is ImprovTalk/apps/mobile/assets/icon.png (the 1254px source the iOS and
 * Android icons are built from), resized to 256px for the web. Using the real
 * icon rather than a redrawn approximation means the browser tab, the install
 * badge and the icon on the user's home screen are visibly the same product.
 *
 * It carries the brand gradient itself, which is gradient place 3 of 3.
 */
export function LogoMark({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <Image
      src="/icon.png"
      alt=""
      width={size}
      height={size}
      /* Matches the iOS superellipse closely enough at these sizes. */
      className={cn('shrink-0 rounded-[22.5%]', className)}
      priority
      unoptimized
    />
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'font-[family-name:var(--font-display)] text-[17px] font-semibold tracking-[-0.035em] text-ink',
        className,
      )}
    >
      ImprovTalk
    </span>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark size={28} />
      <Wordmark />
    </span>
  )
}

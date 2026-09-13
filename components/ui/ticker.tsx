import { cn } from '@/lib/utils'

/**
 * A running line of short phrases, full-bleed, in display type — the site's
 * way of making four short claims impossible to scroll past. The content is
 * rendered twice so the loop has no seam; the second copy is hidden from
 * assistive tech and from in-page search results being doubled.
 */
export function Ticker({ items, className }: { items: string[]; className?: string }) {
  const line = (hidden: boolean) => (
    <span aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span className="display-md whitespace-nowrap px-6 text-ink md:px-10">{t}</span>
          <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-gold" />
        </span>
      ))}
    </span>
  )
  return (
    <div
      className={cn(
        'relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-line py-5 md:py-7',
        className,
      )}
    >
      <div className="marquee flex w-max">
        {line(false)}
        {line(true)}
      </div>
    </div>
  )
}

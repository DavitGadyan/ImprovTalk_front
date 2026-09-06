'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/ui/logo'
import { nav } from '@/content/site'
import { cn } from '@/lib/utils'

/**
 * Below `md` there was no navigation at all — no menu, no links, just the logo —
 * so a phone visitor had to scroll the whole landing page to reach the footer.
 * The menu is a native <dialog>, which brings the focus trap, the Escape key and
 * an inert background with it rather than reimplementing all three.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (open && !el.open) el.showModal()
    else if (!open && el.open) el.close()
  }, [open])

  /* Send focus back where it came from, or the next Tab starts at the top. */
  const close = useCallback(() => {
    setOpen(false)
    toggleRef.current?.focus()
  }, [])

  /*
   * Four of the five links are hashes on `/`, so "current" means the whole
   * landing page for those and an exact path for the rest.
   */
  const isCurrent = (href: string) =>
    href.startsWith('/#') ? pathname === '/' : pathname === href

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
              aria-current={isCurrent(item.href) ? 'page' : undefined}
              className={cn(
                'py-2 text-sm transition-colors hover:text-ink',
                isCurrent(item.href) ? 'text-ink' : 'text-muted',
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="-mr-2 flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-raised/50 md:hidden"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => {
          if (e.target === dialogRef.current) close()
        }}
        aria-label="Menu"
        /* m-auto is not decoration: the UA centres a modal <dialog> with
           margin:auto, and Tailwind's preflight resets it to 0. */
        className="m-auto w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-line bg-surface p-0 text-ink backdrop:bg-black/70 backdrop:backdrop-blur-sm md:hidden"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <Logo />
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="-mr-2 flex size-11 items-center justify-center rounded-full text-subtle transition-colors hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <nav className="grid p-2" aria-label="Main">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={close}
              aria-current={isCurrent(item.href) ? 'page' : undefined}
              className={cn(
                'rounded-xl px-4 py-3.5 text-[15px] transition-colors hover:bg-raised/50',
                isCurrent(item.href) ? 'text-ink' : 'text-ink-soft',
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </dialog>
    </header>
  )
}

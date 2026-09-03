import type { Metadata } from 'next'
import Link from 'next/link'
import { LogoMark } from '@/components/ui/logo'

export const metadata: Metadata = {
  title: 'Page not found',
  description:
    'That page does not exist. Try the method pages, the blog, or head back to the homepage.',
}

export default function NotFound() {
  return (
    <main className="container-page flex min-h-dvh flex-col items-center justify-center py-16 text-center">
      <LogoMark size={56} className="rounded-[22.5%]" />
      <h1 className="display-md mt-7 text-ink">This page went quiet.</h1>
      <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
        The link is broken or the page has moved.
      </p>
      <Link
        href="/"
        className="mt-8 text-sm text-accent underline underline-offset-4"
      >
        Back to the start
      </Link>
    </main>
  )
}

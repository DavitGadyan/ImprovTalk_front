import Link from 'next/link'
import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'

/**
 * Shell for the prose pages (legal, support, billing).
 *
 * Prose styling is written out rather than pulled from @tailwindcss/typography:
 * the plugin's defaults are tuned for light backgrounds and would need almost
 * as much overriding as this costs to write.
 */
export function PageShell({
  title,
  updated,
  intro,
  breadcrumb,
  children,
}: {
  title: string
  updated?: string
  intro?: string
  /** [label, href] pairs, excluding the current page. Renders a visible trail. */
  breadcrumb?: readonly (readonly [string, string])[]
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main id="main" className="container-page py-16 md:py-24">
        <div className="max-w-2xl">
          {breadcrumb ? (
            <nav aria-label="Breadcrumb" className="text-sm text-subtle">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 pl-0">
                {breadcrumb.map(([label, href]) => (
                  <li key={href} className="flex items-center gap-2">
                    <Link href={href} className="transition-colors hover:text-ink">
                      {label}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </li>
                ))}
                <li className="text-muted">{title}</li>
              </ol>
            </nav>
          ) : (
            <Link href="/" className="text-sm text-subtle transition-colors hover:text-ink">
              ← Back
            </Link>
          )}
          <h1 className="display-md mt-6 text-ink">{title}</h1>
          {updated && (
            <p className="mt-3 text-[13px] text-subtle">Last updated {updated}</p>
          )}
          {intro && <p className="mt-6 text-[15px] leading-relaxed text-muted">{intro}</p>}

          <div
            className="mt-10 space-y-6 text-[15px] leading-relaxed text-muted
              [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4
              [&_h2]:mb-3 [&_h2]:mt-12 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink
              [&_h3]:mb-2 [&_h3]:mt-8 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-ink-soft
              [&_li]:mb-2
              [&_strong]:font-medium [&_strong]:text-ink-soft
              [&_table]:w-full [&_table]:border-collapse [&_table]:text-[13.5px]
              [&_td]:border-t [&_td]:border-line [&_td]:py-2.5 [&_td]:pr-4 [&_td]:align-top
              [&_th]:border-b [&_th]:border-line-strong [&_th]:pb-2.5 [&_th]:pr-4 [&_th]:text-left
              [&_th]:text-[11px] [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-[0.12em] [&_th]:text-subtle
              [&_ul]:list-disc [&_ul]:pl-5"
          >
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

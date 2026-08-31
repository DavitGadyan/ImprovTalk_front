import Link from 'next/link'
import { Logo, LogoMark, Wordmark } from '@/components/ui/logo'
import { site } from '@/content/site'
import { SUPPORT_EMAIL } from '@/content/links'

export function Footer() {
  return (
    <footer className="hairline-top bg-canvas pt-14">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-subtle">
              A voice-first AI communication coach. Practise out loud, get scored on the evidence.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterCol title="Product">
              <FooterLink href="/#how">How it works</FooterLink>
              <FooterLink href="/#scoring">Scoring</FooterLink>
              <FooterLink href="/#library">Library</FooterLink>
              <FooterLink href="/get/">Get the app</FooterLink>
            </FooterCol>
            <FooterCol title="Legal">
              <FooterLink href="/privacy/">Privacy</FooterLink>
              <FooterLink href="/terms/">Terms</FooterLink>
            </FooterCol>
            <FooterCol title="Contact">
              <FooterLink href="/support/">Support</FooterLink>
              <FooterLink href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</FooterLink>
            </FooterCol>
          </div>
        </div>

      </div>

      {/*
        Closing band. Every reference layout in design_examples/ ends on one —
        a dark bar carrying the wordmark and the URL — which gives the page a
        definite bottom edge instead of trailing off into link columns.
      */}
      <div className="mt-14 bg-[#05080f] py-7">
        <div className="container-page flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-subtle">
            © {new Date().getFullYear()} {site.legalEntity}. All rights reserved.
          </p>
          <span className="flex items-center gap-2.5">
            <LogoMark size={22} />
            <Wordmark className="text-[15px]" />
            <span className="text-[15px] text-subtle">· improvtalk.vip</span>
          </span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
        {title}
      </h3>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith('mailto:')
  return (
    <li>
      {external ? (
        <a href={href} className="text-sm text-muted transition-colors hover:text-ink">
          {children}
        </a>
      ) : (
        <Link href={href} className="text-sm text-muted transition-colors hover:text-ink">
          {children}
        </Link>
      )}
    </li>
  )
}

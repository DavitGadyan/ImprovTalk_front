import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Providers } from './providers'
import { GoogleTags } from '@/components/analytics/gtag'
import { VariantAssign } from '@/components/variant-assign'
import { ConsentBanner } from '@/components/analytics/consent-banner'
import { site } from '@/content/site'
import './globals.css'

/**
 * Fonts are self-hosted rather than pulled from Google.
 *
 * It keeps a third-party origin off the critical path for LCP, works in CI and
 * offline, and means no visitor IP is handed to another company just to render
 * a headline. Both files are latin-subset variable woff2, ~93KB for the pair.
 *
 * The declared range is 400..600 — Inter Tight's upper bound here. Asking for
 * 700+ anywhere in the CSS would trigger synthetic bolding, which smears the
 * letterforms badly at display sizes.
 */
const interTight = localFont({
  src: '../public/fonts/InterTight-latin-var.woff2',
  weight: '400 600',
  style: 'normal',
  display: 'swap',
  variable: '--font-inter-tight',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
  adjustFontFallback: 'Arial',
})

const inter = localFont({
  src: '../public/fonts/Inter-latin-var.woff2',
  weight: '400 600',
  style: 'normal',
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
  adjustFontFallback: 'Arial',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'ImprovTalk — a voice-first AI communication coach',
    template: '%s · ImprovTalk',
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: 'ImprovTalk — a voice-first AI communication coach',
    description: site.description,
    url: site.url,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'ImprovTalk' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ImprovTalk — a voice-first AI communication coach',
    description: site.description,
    images: ['/og.png'],
  },
  ...(site.googleSiteVerification
    ? { verification: { google: site.googleSiteVerification } }
    : {}),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#0b1220',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${inter.variable}`}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-canvas"
        >
          Skip to content
        </a>
        <VariantAssign />
        <GoogleTags />
        <Providers>{children}</Providers>
        <ConsentBanner />
      </body>
    </html>
  )
}

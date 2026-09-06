import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Providers } from './providers'
import { GoogleTags } from '@/components/analytics/gtag'
import { VariantAssign } from '@/components/variant-assign'
import { ConsentBanner } from '@/components/analytics/consent-banner'
import { TipsPopup } from '@/components/ui/tips-popup'
import { site } from '@/content/site'
import './globals.css'

/**
 * The typeface is self-hosted rather than pulled from Google.
 *
 * It keeps a third-party origin off the critical path for LCP, works in CI and
 * offline, and means no visitor IP is handed to another company just to render
 * a headline.
 *
 * One family: Satoshi Variable, the face the app ships (theme.ts FONT). Display
 * and body are the same cut, as they are in the app. The upright file carries
 * every weight 300..900, so 700 is a real bold; the italic is a second file
 * because a variable font cannot slant itself.
 */
const satoshi = localFont({
  src: [
    { path: '../public/fonts/Satoshi-Variable.woff2', weight: '300 900', style: 'normal' },
    { path: '../public/fonts/Satoshi-VariableItalic.woff2', weight: '300 900', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-satoshi',
  /*
   * Not preloaded. Both files total ~84KB and would be fetched at the very top
   * of the critical path, competing with the CSS and the first JS chunk on a
   * slow connection. display:'swap' means text paints immediately in the
   * fallback either way, and adjustFontFallback keeps the swap from shifting
   * layout — so the preload was buying nothing and costing first paint.
   */
  preload: false,
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
  themeColor: '#000000',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={satoshi.variable}>
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
        <TipsPopup />
      </body>
    </html>
  )
}

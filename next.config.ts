import type { NextConfig } from 'next'

/**
 * Static export, served by GitHub Pages (.github/workflows/deploy.yml). There
 * is no Node process at runtime: no SSR, no route handlers, no middleware, no
 * image optimizer.
 *
 * `trailingSlash: true` makes the export emit `out/privacy/index.html` rather
 * than `out/privacy.html`, which is the only shape Pages serves as a directory
 * index. The cost is that Pages answers `/privacy` (no slash) with a 301 to
 * `/privacy/` — so every internal link, sitemap entry and canonical carries
 * the slash, and the smoke job in deploy.yml asserts that the canonical URLs
 * answer 200 with no redirect at all. A slashless URL is a "Page with
 * redirect" in Search Console, never a fault in the site.
 *
 * `headers()` is a no-op under static export; Pages sets its own.
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
}

export default nextConfig

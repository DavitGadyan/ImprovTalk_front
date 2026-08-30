import type { NextConfig } from 'next'

/**
 * Static export.
 *
 * The site is served from a Cloud Storage bucket behind the existing Google
 * Cloud load balancer, so there is no Node process at runtime: no SSR, no route
 * handlers, no middleware, no image optimizer.
 *
 * `trailingSlash: true` makes the export emit `out/privacy/index.html` rather
 * than `out/privacy.html`. GCLB backend buckets resolve a request for
 * `/privacy/` to `privacy/index.html` via the bucket's MainPageSuffix, which is
 * the only directory-index behaviour that works reliably there. See
 * docs/DEPLOY.md — this is verified right after the first deploy.
 *
 * `headers()` is a no-op under static export, so security headers are set as
 * object metadata on the bucket instead (also in docs/DEPLOY.md).
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

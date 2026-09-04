import { execFileSync } from 'node:child_process'

/**
 * Real last-modified dates for the sitemap, read from git.
 *
 * Every URL used to carry the build timestamp, which told Google that all
 * seventeen pages changed on every deploy. A sitemap whose lastmod is always
 * "now" is one Google stops believing, and that matters here more than usual:
 * the persona landing pages have almost no internal links, so the sitemap is
 * the main thing pointing at them.
 *
 * Needs full history — the deploy workflow checks out with fetch-depth: 0. On a
 * shallow clone, or outside a repo, git returns nothing and this falls back to
 * the build date, which is the old behaviour rather than a broken build.
 *
 * Build-time only. It uses node:child_process, so it must never be pulled into
 * a client component; app/sitemap.ts is its single caller.
 */
const BUILD_DATE = new Date()

export function lastModified(...paths: string[]): Date {
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...paths], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    if (!iso) return BUILD_DATE
    const d = new Date(iso)
    return Number.isNaN(d.getTime()) ? BUILD_DATE : d
  } catch {
    return BUILD_DATE
  }
}

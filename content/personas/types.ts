/**
 * One landing page, five audiences.
 *
 * A shy person, someone blanking in a second language, someone trying to meet
 * people, someone freezing in meetings, and someone out of practice are not the
 * same reader. Said generically a page speaks to none of them, so the copy and
 * the running order both come from here while the components stay shared.
 */
export type SectionKey = 'problem' | 'learnable' | 'how' | 'scoring' | 'inside' | 'faq'

export type Point = { title: string; body: string }

export type SectionCopy = {
  label: string
  title: string
  intro?: string
}

export type Persona = {
  /** Stable id. Sent to GA4 as the `variant` parameter — do not rename lightly. */
  slug: string
  /** Trailing slash, matching the export's trailingSlash: true. */
  path: string
  meta: { title: string; description: string }
  hero: {
    eyebrow: string
    /** Rendered as: top / bottom + emphasis, with the brand rule under emphasis. */
    headline: { top: string; bottom: string; emphasis: string }
    sub: string
    note: string
  }
  problem: SectionCopy & { points: Point[] }
  learnable: SectionCopy & { points: Point[] }
  how: SectionCopy & { steps: Point[] }
  scoring: SectionCopy & { proof: string }
  inside: SectionCopy
  faq: { q: string; a: string }[]
  /** Section running order. Differs per persona — each leads with its own hook. */
  order: SectionKey[]
}

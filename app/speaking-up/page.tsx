import type { Metadata } from 'next'
import { PersonaPage } from '@/components/persona-page'
import { personas } from '@/content/personas'
import { site } from '@/content/site'

const persona = personas.speaking

/**
 * A split-test variant and campaign landing page.
 *
 * noindex with a canonical back to `/`: five near-identical pages would
 * otherwise compete with each other in search and split the signal the
 * structured-data work exists to concentrate. It is also kept out of sitemap.ts.
 */
export const metadata: Metadata = {
  title: persona.meta.title,
  description: persona.meta.description,
  robots: { index: false, follow: true },
  alternates: { canonical: site.url },
}

export default function Page() {
  return <PersonaPage persona={persona} />
}

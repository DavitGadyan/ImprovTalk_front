import type { Metadata } from 'next'
import { PersonaPage } from '@/components/persona-page'
import { personas } from '@/content/personas'

const persona = personas.social

/**
 * A campaign landing page, and indexable in its own right.
 *
 * It was noindex with a canonical back to `/` while it was one arm of a live
 * split. The split is paused (see content/personas/index.ts), and the copy here
 * is genuinely distinct — its own headline, section order and FAQ, written for a
 * different search intent — so it earns its own place in the index rather than
 * competing with the homepage for the same query.
 */
export const metadata: Metadata = {
  title: persona.meta.title,
  description: persona.meta.description,
  alternates: { canonical: persona.path },
  openGraph: {
    url: persona.path,
    title: persona.meta.title,
    description: persona.meta.description,
  },
}

export default function Page() {
  return <PersonaPage persona={persona} />
}

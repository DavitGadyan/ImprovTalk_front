import type { Metadata } from 'next'
import { PersonaPage } from '@/components/persona-page'
import { personas } from '@/content/personas'

export const metadata: Metadata = {
  title: {
    absolute: 'Practise conversations out loud with an AI — ImprovTalk',
  },
  alternates: { canonical: '/' },
  openGraph: { url: '/' },
}

/**
 * The canonical page. Renders the default persona server-side so crawlers,
 * answer engines and anyone with JavaScript off all get a complete document —
 * the variant assignment redirects on top of this, it does not replace it.
 */
export default function HomePage() {
  return <PersonaPage persona={personas.shy} />
}

import { PersonaPage } from '@/components/persona-page'
import { personas } from '@/content/personas'

/**
 * The canonical page. Renders the default persona server-side so crawlers,
 * answer engines and anyone with JavaScript off all get a complete document —
 * the variant assignment redirects on top of this, it does not replace it.
 */
export default function HomePage() {
  return <PersonaPage persona={personas.shy} />
}

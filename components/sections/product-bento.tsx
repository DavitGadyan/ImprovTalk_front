import { Section } from '@/components/ui/section'
import { RENDERS, type RenderName } from '@/lib/renders'

/**
 * The product, as it ships: a bento of real screens straight after the hero.
 *
 * Every tile is a crop of the case-study composite (scripts/crop-renders.mjs),
 * so what the page shows is what the app draws. The captions are the case
 * study's own one-liners — what each screen decides, not what it looks like.
 * The renders already carry their frames, grounds and corner radii; nothing is
 * added around them.
 */
const TILES: { name: RenderName; caption: string; span: string }[] = [
  {
    name: 'live-session',
    caption: 'Live session — the portrait is the content, the disc is the only control.',
    span: 'lg:col-span-4',
  },
  {
    name: 'score-screen',
    caption: 'The score — the number stands on the page; delivery is measured from the voice.',
    span: 'lg:col-span-2',
  },
  {
    name: 'setup-rows',
    caption: 'Setup — one line per setting, a red mark on what is required.',
    span: 'lg:col-span-2',
  },
  {
    name: 'choice-list',
    caption: 'Disposition — one list, the chosen row outlined.',
    span: 'lg:col-span-2',
  },
  {
    name: 'plan-max',
    caption: 'Plans — Max first, and recommended.',
    span: 'lg:col-span-2',
  },
  {
    name: 'tab-bar',
    caption: 'Four surfaces — Home, Practice, Learn, History.',
    span: 'lg:col-span-3',
  },
  {
    name: 'icon-strip',
    caption: 'On the home screen, next to everything else.',
    span: 'lg:col-span-3',
  },
]

export function ProductBento() {
  return (
    <Section
      id="product"
      label="Inside the app"
      title="Set up. Talk. Get scored."
      intro="Four surfaces and one journey: pick a scene, hold the disc and speak, then read the score and what to do about it."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
        {TILES.map(({ name, caption, span }, i) => {
          const r = RENDERS[name]
          return (
            <li key={name} className={span}>
              <figure>
                <img
                  src={r.src}
                  srcSet={r.srcSet}
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                  width={r.width}
                  height={r.height}
                  alt={r.alt}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-auto w-full rounded-card"
                />
                <figcaption className="mt-3 text-caption text-muted">{caption}</figcaption>
              </figure>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

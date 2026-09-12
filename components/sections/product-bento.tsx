'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Section } from '@/components/ui/section'
import { RENDERS, type RenderName } from '@/lib/renders'
import { easeOutSoft, popIn, stagger, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * The product, as it ships: a bento of real screens straight after the hero.
 *
 * Every tile is a crop of the case-study composite (scripts/crop-renders.mjs),
 * so what the page shows is what the app draws. The captions are the case
 * study's own one-liners — what each screen decides, not what it looks like.
 *
 * Two things the crops cannot do on their own, so the cells do them:
 *
 *  - The composite's ground is #0A0A0A, and the panels in one row are not all
 *    the same height (272 vs 236 on the two strips). Each cell has a fixed
 *    aspect, `bg-surface` behind, and the image covers it — a short strip no
 *    longer leaves a 14px gap, and a stray ground edge reads as card.
 *  - `score-screen` was exported on a blurred beige photograph rather than a
 *    dark card. The render script swaps that photo for the card colour by rule
 *    (scripts/crop-renders.mjs, GROUND_SWAP), so the tile is a phone on the
 *    same #1F1F1F as its neighbours, and the phone measures centred in it.
 *
 * Motion is three layers, all transform/opacity: a staggered reveal, a hover
 * lift with a hint of the old device tilt, and a slow scroll drift on the two
 * tall tiles in opposite directions. All of it goes still under
 * prefers-reduced-motion.
 */
const TILES: {
  name: RenderName
  caption: string
  span: string
  aspect: string
  /** Strips are cards already; letterboxing them in surface is invisible. */
  fit?: 'cover' | 'contain'
  drift?: 1 | -1
}[] = [
  {
    name: 'live-session',
    caption: 'Live session — the portrait is the content, the disc is the only control.',
    span: 'sm:col-span-2 lg:col-span-4',
    aspect: 'aspect-[4/3] lg:aspect-[1400/1235]',
    drift: -1,
  },
  {
    name: 'score-screen',
    caption: 'The score — the number stands on the page; delivery is measured from the voice.',
    span: 'lg:col-span-2',
    aspect: 'aspect-[3/4] lg:aspect-[992/1800]',
    drift: 1,
  },
  {
    name: 'setup-rows',
    caption: 'Setup — one line per setting, a red mark on what is required.',
    span: 'lg:col-span-2',
    aspect: 'aspect-[3/4] lg:aspect-[992/1040]',
  },
  {
    name: 'choice-list',
    caption: 'Disposition — one list, the chosen row outlined.',
    span: 'lg:col-span-2',
    aspect: 'aspect-square lg:aspect-[992/1040]',
  },
  {
    /* Back by the owner's choice: three cards from one band, one row height.
       The price on it is published now (content/pricing.ts). Its "131
       scenarios" is the app's own paywall figure and is stale — the counted
       pro set is 15, not the 9 that number assumes — but it is a screenshot of
       the app's screen, not site copy, and goes when the card is re-exported. */
    name: 'plan-max',
    caption: 'Plans — Max first, and recommended.',
    span: 'lg:col-span-2',
    aspect: 'aspect-square lg:aspect-[992/1040]',
  },
  {
    name: 'tab-bar',
    caption: 'Four surfaces — Home, Practice, Learn, History.',
    span: 'sm:col-span-2 lg:col-span-3',
    aspect: 'aspect-[5/1] lg:aspect-[11/2]',
    fit: 'contain',
  },
  {
    name: 'icon-strip',
    caption: 'On the home screen, next to everything else.',
    span: 'sm:col-span-2 lg:col-span-3',
    aspect: 'aspect-[5/1] lg:aspect-[11/2]',
    fit: 'contain',
  },
]

export function ProductBento() {
  const ref = useRef<HTMLUListElement>(null)
  const reduced = useReducedMotion()

  /* The section's own scroll range, so the drift starts as it enters and ends
     as it leaves rather than tracking the whole page. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const up = useTransform(scrollYProgress, [0, 1], [24, -24])
  const down = useTransform(scrollYProgress, [0, 1], [-24, 24])
  /* Under reduced motion the drift is a constant zero rather than absent: the
     export carries the drift's first frame inline, and only a value that is
     actually set on the client overwrites it. */
  const still = useMotionValue(0)

  return (
    <Section
      id="product"
      label="Inside the app"
      title="Set up. Talk. Get scored."
      intro="Four surfaces and one journey: pick a scene, hold the disc and speak, then read the score and what to do about it."
    >
      <motion.ul
        ref={ref}
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5 [perspective:1200px]"
      >
        {TILES.map(({ name, caption, span, aspect, fit, drift }) => (
          <Tile
            key={name}
            name={name}
            caption={caption}
            className={span}
            aspect={aspect}
            fit={fit}
            y={!drift ? undefined : reduced ? still : drift < 0 ? up : down}
            lift={!reduced}
          />
        ))}
      </motion.ul>
    </Section>
  )
}

function Tile({
  name,
  caption,
  className,
  aspect,
  fit = 'cover',
  y,
  lift,
}: {
  name: RenderName
  caption: string
  className?: string
  aspect: string
  fit?: 'cover' | 'contain'
  y?: MotionValue<number>
  lift: boolean
}) {
  const r = RENDERS[name]
  return (
    <motion.li
      variants={popIn}
      whileHover={lift ? { y: -6, rotateX: 2, rotateY: -2 } : undefined}
      transition={{ duration: 0.35, ease: easeOutSoft }}
      style={{ transformStyle: 'preserve-3d' }}
      className={className}
    >
      <motion.figure style={y ? { y } : undefined}>
        <div className={cn('overflow-hidden rounded-card bg-surface', aspect)}>
          <img
            src={r.src}
            srcSet={r.srcSet}
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
            width={r.width}
            height={r.height}
            alt={r.alt}
            loading="lazy"
            decoding="async"
            className={cn('size-full object-center', fit === 'contain' ? 'object-contain' : 'object-cover')}
          />
        </div>
        <figcaption className="mt-3 text-caption text-muted">{caption}</figcaption>
      </motion.figure>
    </motion.li>
  )
}

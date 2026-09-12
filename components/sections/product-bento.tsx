'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Section } from '@/components/ui/section'
import { PlanCardMock } from '@/components/ui/plan-card-mock'
import { RENDERS, type RenderName } from '@/lib/renders'
import { easeOutSoft, popIn, stagger, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * The product, as it ships: a bento of real screens straight after the hero.
 *
 * Row 1 is one card with two phones on it — the live session and the score,
 * cut out of their panels with alpha (scripts/crop-renders.mjs, CUTOUTS) so
 * they can share a ground, centred, and turned to face each other: the left
 * phone's left edge nearer, the right phone's right edge nearer. In CSS a
 * positive rotateY brings the left edge toward the viewer, so the left phone
 * is +θ and the right −θ. θ eases from 20° to 10° across the section's own
 * scroll range, so the pair opens as it passes and never leaves the centre.
 *
 * Rows 2 and 3 are crops of the case-study composite. The panels in a row
 * are not all the same height (the two strips are 272 and 236), so each cell
 * has a fixed aspect, `bg-surface` behind, and the image covers it. The Max
 * card is drawn from content/pricing.ts rather than cropped: the render shows
 * the paywall as it was before the plans changed (see PlanCardMock).
 *
 * Motion: a staggered reveal, a hover lift with a hint of the old device
 * tilt, and the facing angle on scroll. All transform/opacity, and all of it
 * goes still under prefers-reduced-motion — the angle becomes a constant, not
 * an absent style, because the export carries the first frame inline and
 * only a value that is set on the client overwrites it.
 */
const TILES: {
  name: RenderName
  caption: string
  span: string
  aspect: string
  /** Strips are cards already; letterboxing them in surface is invisible. */
  fit?: 'cover' | 'contain'
}[] = [
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
]

const STRIPS: typeof TILES = [
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

const FACING = 14

export function ProductBento() {
  const ref = useRef<HTMLUListElement>(null)
  const reduced = useReducedMotion()

  /* The section's own scroll range, so the angle opens as it enters and
     settles as it leaves rather than tracking the whole page. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const openLeft = useTransform(scrollYProgress, [0, 1], [FACING + 6, FACING - 4])
  const openRight = useTransform(scrollYProgress, [0, 1], [-FACING - 6, -FACING + 4])
  const stillLeft = useMotionValue(FACING)
  const stillRight = useMotionValue(-FACING)

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
        <PairTile
          left={reduced ? stillLeft : openLeft}
          right={reduced ? stillRight : openRight}
          lift={!reduced}
        />
        {TILES.map((t) => (
          <Tile key={t.name} {...t} lift={!reduced} />
        ))}
        <Card className="lg:col-span-2" caption="Plans — Max first, and recommended." lift={!reduced}>
          <div className="aspect-square overflow-hidden rounded-card bg-surface lg:aspect-[992/1040]">
            <PlanCardMock />
          </div>
        </Card>
        {STRIPS.map((t) => (
          <Tile key={t.name} {...t} lift={!reduced} />
        ))}
      </motion.ul>
    </Section>
  )
}

/** One cell: the lift on hover, the reveal in the stagger, a caption below. */
function Card({
  className,
  caption,
  lift,
  children,
}: {
  className?: string
  caption: string
  lift: boolean
  children: React.ReactNode
}) {
  return (
    <motion.li
      variants={popIn}
      whileHover={lift ? { y: -6, rotateX: 2, rotateY: -2 } : undefined}
      transition={{ duration: 0.35, ease: easeOutSoft }}
      style={{ transformStyle: 'preserve-3d' }}
      className={className}
    >
      <figure>
        {children}
        <figcaption className="mt-3 text-caption text-muted">{caption}</figcaption>
      </figure>
    </motion.li>
  )
}

function Tile({
  name,
  caption,
  span,
  aspect,
  fit = 'cover',
  lift,
}: (typeof TILES)[number] & { lift: boolean }) {
  const r = RENDERS[name]
  return (
    <Card className={span} caption={caption} lift={lift}>
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
    </Card>
  )
}

/* The two phones slide in from their outer sides as the tile lands. */
const fromLeft = { hidden: { opacity: 0, x: -48 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOutSoft } } }
const fromRight = { hidden: { opacity: 0, x: 48 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOutSoft } } }

function PairTile({
  left,
  right,
  lift,
}: {
  left: MotionValue<number>
  right: MotionValue<number>
  lift: boolean
}) {
  const a = RENDERS['live-session-phone']
  const b = RENDERS['score-screen-phone']
  const phone =
    'h-full w-auto max-w-[44%] object-contain drop-shadow-[0_30px_40px_rgb(0_0_0/0.55)]'
  return (
    <Card
      className="sm:col-span-2 lg:col-span-6"
      caption="Live session, then the score — the portrait is the content and the disc the only control; the number stands on the page, and delivery is measured from the voice."
      lift={lift}
    >
      <div className="relative aspect-[5/6] overflow-hidden rounded-card bg-surface [perspective:1400px] sm:aspect-[4/3] lg:aspect-[5/3]">
        <div className="absolute inset-0 flex items-center justify-center gap-[5%] px-[8%] py-[4%]">
          <motion.img
            variants={fromLeft}
            style={{ rotateY: left }}
            src={a.src}
            srcSet={a.srcSet}
            sizes="(min-width: 1024px) 22vw, 40vw"
            width={a.width}
            height={a.height}
            alt={a.alt}
            loading="lazy"
            decoding="async"
            className={phone}
          />
          <motion.img
            variants={fromRight}
            style={{ rotateY: right }}
            src={b.src}
            srcSet={b.srcSet}
            sizes="(min-width: 1024px) 22vw, 40vw"
            width={b.width}
            height={b.height}
            alt={b.alt}
            loading="lazy"
            decoding="async"
            className={phone}
          />
        </div>
      </div>
    </Card>
  )
}

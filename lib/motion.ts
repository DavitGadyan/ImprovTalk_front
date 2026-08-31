import type { Variants } from 'framer-motion'

/**
 * Shared motion vocabulary.
 *
 * Motion here has one job: guide the eye down a long page. Everything is short,
 * soft and single-direction — nothing bounces, nothing loops in the reader's
 * peripheral vision while they are trying to read a paragraph.
 *
 * <MotionConfig reducedMotion="user"> in app/providers.tsx collapses all of it
 * to instant state changes for anyone who asked their OS for less motion, and
 * globals.css neutralises the CSS animations for the same people.
 */

export const easeOutSoft = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOutSoft } },
}

/**
 * For cards and tiles. The small scale change is what separates "landed" from
 * "faded in" — at 0.96 it reads as arriving, and going lower starts to look
 * like a popup.
 */
export const popIn: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easeOutSoft },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easeOutSoft } },
}

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
}

/** Fires once, slightly before the element is fully in view. */
export const viewportOnce = { once: true, amount: 0.2 } as const

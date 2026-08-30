'use client'

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * reducedMotion="user" is the important line: every framer-motion animation on
 * the site collapses to an instant state change for anyone whose OS asks for
 * less motion. Together with the media query in globals.css that covers the
 * whole page without any component having to opt in.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.4 }}>
      {children}
    </MotionConfig>
  )
}

'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, type MotionValue } from 'framer-motion'
import { IPhone } from '@/components/ui/iphone'
import { CLIP } from '@/lib/clip'
import { easeOutSoft } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * A drawn iPhone with the app running in it.
 *
 * At rest it shows a still: the poster, a real <img> with its dimensions and
 * alt, so it is in the export and is the LCP candidate where it sits in the
 * hero. The clip is not loaded until the phone is on screen: the first time
 * it is mostly in view the <video> mounts and plays, muted and looping —
 * the app, running — and it pauses out of view. Hovering brings the phone
 * a little closer. With `turn`, the phone also yaws slowly back and forth
 * (globals.css `phone-turn`), the reflection crossing the glass in step.
 *
 * Reduced motion: nothing autoplays and nothing turns; hovering still plays,
 * because that is the reader's own gesture.
 */
export function PhoneDemo({
  className,
  rotateY,
  priority = false,
  tilt,
  turn = false,
}: {
  className?: string
  /** A scroll-driven or constant angle from the parent. */
  rotateY?: MotionValue<number> | number
  /** The hero's still is above the fold: fetch it first. */
  priority?: boolean
  /** A resting rotateX. */
  tilt?: number
  /** The slow turn, for a phone that stands on its own. */
  turn?: boolean
}) {
  const reduced = useReducedMotion()
  const video = useRef<HTMLVideoElement>(null)
  const root = useRef<HTMLDivElement>(null)
  const [wanted, setWanted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [hover, setHover] = useState(false)

  const play = useCallback(() => {
    setWanted(true)
    setPlaying(true)
  }, [])
  const stop = useCallback(() => {
    setPlaying(false)
    const v = video.current
    if (!v) return
    v.pause()
    v.currentTime = 0
  }, [])

  /* The <video> mounts on the first request; from then on `playing` drives it. */
  useEffect(() => {
    const v = video.current
    if (!v) return
    if (playing) void v.play().catch(() => {})
    else v.pause()
  }, [playing, wanted])

  /* In view, the app runs; out of view it rests on the poster frame. */
  useEffect(() => {
    if (reduced) return
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e) return
        if (e.isIntersecting) play()
        else stop()
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced, play, stop])

  const device = (
    <IPhone>
      <img
        src={CLIP.poster}
        width={CLIP.width}
        height={CLIP.height}
        alt={CLIP.alt}
        fetchPriority={priority ? 'high' : undefined}
        loading={priority ? undefined : 'lazy'}
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
      {wanted && (
        <video
          ref={video}
          src={CLIP.src}
          poster={CLIP.poster}
          width={CLIP.width}
          height={CLIP.height}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover"
        />
      )}
    </IPhone>
  )

  return (
    <motion.div
      ref={root}
      className={cn('relative', className)}
      style={{ rotateY: rotateY ?? 0, rotateX: tilt ?? 0, transformStyle: 'preserve-3d' }}
      animate={hover && !reduced ? { scale: 1.04, z: 30 } : { scale: 1, z: 0 }}
      transition={{ duration: 0.6, ease: easeOutSoft }}
      onPointerEnter={(e) => {
        if (e.pointerType !== 'mouse') return
        setHover(true)
        play()
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== 'mouse') return
        setHover(false)
      }}
    >
      {turn ? <div className="phone-turn">{device}</div> : device}
    </motion.div>
  )
}

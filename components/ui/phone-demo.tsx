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
 * hero. The clip is not loaded until it is wanted: on a pointer device the
 * first hover mounts the <video> and plays it, and the phone comes toward
 * the reader; leaving pauses it and returns to the first frame — which is
 * the poster, so nothing jumps. On touch there is no hover, so the clip
 * plays while the phone is mostly in view and pauses when it is not.
 *
 * Reduced motion: nothing autoplays and the phone does not move; hovering
 * still plays, because that is the reader's own gesture.
 */
export function PhoneDemo({
  className,
  rotateY,
  priority = false,
  tilt,
}: {
  className?: string
  /** A scroll-driven or constant angle from the parent; the hover squares it up. */
  rotateY?: MotionValue<number> | number
  /** The hero's still is above the fold: fetch it first. */
  priority?: boolean
  /** A resting rotateX, for the hero's slight lean. */
  tilt?: number
}) {
  const reduced = useReducedMotion()
  const video = useRef<HTMLVideoElement>(null)
  const root = useRef<HTMLDivElement>(null)
  const [wanted, setWanted] = useState(false)
  const [hover, setHover] = useState(false)

  const play = useCallback(() => {
    setWanted(true)
    const v = video.current
    if (v) void v.play().catch(() => {})
  }, [])
  const stop = useCallback(() => {
    const v = video.current
    if (!v) return
    v.pause()
    v.currentTime = 0
  }, [])

  /* The <video> mounts after the first play request; play once it can. */
  useEffect(() => {
    if (!wanted || !hover) return
    const v = video.current
    if (v) void v.play().catch(() => {})
  }, [wanted, hover])

  /* Touch: no hover to wait for, so the clip runs while the phone is in view. */
  useEffect(() => {
    if (reduced) return
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e) return
        if (e.isIntersecting) {
          setWanted(true)
          setHover(true)
        } else {
          setHover(false)
          stop()
        }
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced, stop])

  return (
    <motion.div
      ref={root}
      className={cn('relative', className)}
      style={{ rotateY: rotateY ?? 0, rotateX: tilt ?? 0, transformStyle: 'preserve-3d' }}
      animate={hover && !reduced ? { scale: 1.06, z: 40 } : { scale: 1, z: 0 }}
      transition={{ duration: 0.45, ease: easeOutSoft }}
      onPointerEnter={(e) => {
        if (e.pointerType !== 'mouse') return
        setHover(true)
        play()
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== 'mouse') return
        setHover(false)
        stop()
      }}
    >
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
    </motion.div>
  )
}

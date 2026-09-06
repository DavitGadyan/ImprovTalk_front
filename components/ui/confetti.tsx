'use client'

import { useEffect, useRef } from 'react'

/**
 * A one-shot confetti burst for the moment the result appears.
 *
 * Hand-rolled on a canvas rather than pulled from a package: the whole burst is
 * about forty lines of physics, and canvas-confetti is 25KB to do it. It also
 * has to live inside a <dialog>, where a fixed-position library canvas ends up
 * behind the modal — this one is absolutely positioned in the dialog's own
 * stacking context.
 *
 * Cancelled entirely under prefers-reduced-motion: a burst of moving particles
 * is exactly what that setting exists to stop.
 */

/* The four data colours and white — the same values as the tokens in
   globals.css, spelled out because a canvas cannot read a CSS variable. */
const COLORS = ['#ff6b6b', '#ffd166', '#7de2a6', '#849cff', '#e0b84a', '#ffffff']

type Piece = {
  x: number
  y: number
  vx: number
  vy: number
  rot: number
  vr: number
  w: number
  h: number
  color: string
}

export function Confetti({ count = 90 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.scale(dpr, dpr)

    /* Two vents rather than one centre point: a single origin reads as an
       explosion, two reads as a celebration. */
    const pieces: Piece[] = Array.from({ length: count }, (_, i) => {
      const left = i % 2 === 0
      const angle = (left ? -60 : -120) * (Math.PI / 180) + (Math.random() - 0.5) * 0.9
      const speed = 5 + Math.random() * 6
      return {
        x: left ? w * 0.12 : w * 0.88,
        y: h * 0.34,
        vx: Math.cos(angle) * speed * (left ? 1 : -1),
        vy: Math.sin(angle) * speed,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        w: 5 + Math.random() * 5,
        h: 8 + Math.random() * 6,
        color: COLORS[i % COLORS.length]!,
      }
    })

    let frame = 0
    let raf = 0
    const GRAVITY = 0.22
    const DRAG = 0.992
    const LIFE = 170

    const draw = () => {
      frame += 1
      ctx.clearRect(0, 0, w, h)
      const fade = Math.max(0, 1 - Math.max(0, frame - LIFE * 0.55) / (LIFE * 0.45))

      for (const p of pieces) {
        p.vy += GRAVITY
        p.vx *= DRAG
        p.x += p.vx
        p.y += p.vy
        p.rot += p.vr

        ctx.save()
        ctx.globalAlpha = fade
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        /* Scaling height by the rotation fakes a flat strip tumbling in 3D. */
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.rot)))
        ctx.restore()
      }

      if (frame < LIFE) raf = requestAnimationFrame(draw)
      else ctx.clearRect(0, 0, w, h)
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [count])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 size-full"
    />
  )
}

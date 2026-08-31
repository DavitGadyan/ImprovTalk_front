'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { scenarios, videoSrc, posterSrc, hasScenarioFilms } from '@/content/media'
import { fadeUp, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { track } from '@/lib/analytics'

/**
 * Scenario films, with a location switcher.
 *
 * Rendered inside the How it works section rather than as its own band: it is a
 * demonstration of the three steps described just above it, and separating the
 * two made the reader take the explanation on trust for another two screens.
 *
 * Playback model: each clip plays once and then advances to the next location,
 * so the band walks a visitor through all four without them touching anything.
 * That is why there is no `loop` — a looping video never fires `ended`, so it
 * could never hand over to the next one.
 *
 * Loading discipline:
 *   1. Nothing is fetched until the band scrolls into view, so a visitor who
 *      never reaches it downloads no video at all.
 *   2. Only the selected scenario is mounted — switching costs one file, not
 *      four. The set is ~11 MB; a visitor pays ~3 MB per clip they actually see.
 *   3. Posters are plain <img>, so there is always something to look at.
 */
export function ScenarioFilm() {
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(false)
  /** Sticky intent: survives switching clips, so auto-advance keeps rolling. */
  const [wantsPlay, setWantsPlay] = useState(false)

  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReducedMotion(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* Start once the band is reached, unless the visitor asked for less motion. */
  useEffect(() => {
    if (inView && !reducedMotion) setWantsPlay(true)
  }, [inView, reducedMotion])

  /**
   * Drive the element from state after every clip swap.
   *
   * If the visitor has unmuted, autoplay of the *next* clip is blocked by the
   * browser — an unmuted video may not start on its own. Rather than silently
   * stalling, fall back to muted and keep going.
   */
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = muted
    if (!wantsPlay) return
    void v.play().catch(() => {
      v.muted = true
      setMuted(true)
      void v.play().catch(() => setWantsPlay(false))
    })
  }, [active, inView, wantsPlay, muted])

  const goTo = useCallback((i: number) => {
    setActive(((i % scenarios.length) + scenarios.length) % scenarios.length)
  }, [])

  if (!hasScenarioFilms) return null
  const current = scenarios[active]
  if (!current) return null

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) {
      setWantsPlay(true)
      return
    }
    if (v.paused) {
      setWantsPlay(true)
      void v.play()
    } else {
      v.pause()
      setWantsPlay(false)
    }
  }

  const toggleMute = () => {
    const v = videoRef.current
    const next = !muted
    if (v) v.muted = next
    setMuted(next)
  }

  return (
    <div ref={sectionRef} className="relative">
      <div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="eyebrow">Pick somewhere to walk into</p>
            <div role="tablist" aria-label="Scenario location" className="flex flex-wrap gap-2">
              {scenarios.map((s, i) => (
                <button
                  key={s.slug}
                  role="tab"
                  type="button"
                  aria-selected={i === active}
                  onClick={() => goTo(i)}
                  className={cn(
                    'rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors',
                    i === active
                      ? 'border-transparent bg-ink font-medium text-canvas'
                      : 'border-line-strong text-muted hover:border-ink/40 hover:text-ink',
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-line bg-[#05080f]">
            {/* Fixed 16:9 box, so switching clips never shifts the page. */}
            <div className="relative aspect-video">
              {inView ? (
                <video
                  /* Keyed on slug so React swaps the element rather than reusing
                     one whose source changed underneath it. */
                  key={current.slug}
                  ref={videoRef}
                  className="absolute inset-0 size-full object-cover"
                  poster={posterSrc(current.slug)}
                  muted={muted}
                  playsInline
                  preload="auto"
                  aria-label={current.alt}
                  onPlay={() => {
                    setPlaying(true)
                    track('scenario_play', { scenario: current.slug })
                  }}
                  onPause={() => setPlaying(false)}
                  onEnded={() => goTo(active + 1)}
                >
                  <source src={videoSrc(current.slug)} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={posterSrc(current.slug)}
                  alt={current.alt}
                  className="absolute inset-0 size-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              )}

              {/* Click anywhere on the picture to play or pause. A real button,
                  so it is reachable by keyboard and announced properly. */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? 'Pause the scene' : 'Play the scene'}
                className={cn(
                  'absolute inset-0 flex items-center justify-center transition-colors',
                  playing ? 'bg-transparent hover:bg-[#070c17]/20' : 'bg-[#070c17]/45',
                )}
              >
                {!playing && (
                  <span className="flex items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-sm font-medium text-canvas">
                    <PlayIcon />
                    Play the scene
                  </span>
                )}
              </button>

              {/* Controls sit above the click layer. */}
              <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                <ControlButton
                  onClick={togglePlay}
                  label={playing ? 'Pause the scene' : 'Play the scene'}
                >
                  {playing ? <PauseIcon /> : <PlayIcon />}
                  <span>{playing ? 'Pause' : 'Play'}</span>
                </ControlButton>

                <ControlButton
                  onClick={toggleMute}
                  label={muted ? 'Unmute the scene' : 'Mute the scene'}
                >
                  {muted ? <MutedIcon /> : <SoundIcon />}
                  <span>{muted ? 'Unmute' : 'Mute'}</span>
                </ControlButton>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className="max-w-xl text-sm leading-relaxed text-subtle">{current.caption}</p>
            <p className="text-[12px] text-subtle/80">
              {active + 1} of {scenarios.length} · plays the next one automatically
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function ControlButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#05080f]/75 px-3.5 py-2 text-[12px] font-medium text-ink backdrop-blur-sm transition-colors hover:bg-[#05080f]/95"
    >
      {children}
    </button>
  )
}

/* Inline icons — four small glyphs do not justify a dependency. */
const ic = 'size-3.5 shrink-0'

function PlayIcon() {
  return (
    <svg viewBox="0 0 16 16" className={ic} fill="currentColor" aria-hidden="true">
      <path d="M4.5 2.6v10.8c0 .5.6.8 1 .5l8.2-5.4c.4-.2.4-.8 0-1L5.5 2.1c-.4-.3-1 0-1 .5z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 16 16" className={ic} fill="currentColor" aria-hidden="true">
      <rect x="3.5" y="2.5" width="3.5" height="11" rx="1.1" />
      <rect x="9" y="2.5" width="3.5" height="11" rx="1.1" />
    </svg>
  )
}

function SoundIcon() {
  return (
    <svg viewBox="0 0 16 16" className={ic} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M8.5 2.5 4.8 5.5H2.5v5h2.3l3.7 3z" fill="currentColor" stroke="none" />
      <path d="M11 5.5a3.4 3.4 0 0 1 0 5M13 3.5a6.2 6.2 0 0 1 0 9" strokeLinecap="round" />
    </svg>
  )
}

function MutedIcon() {
  return (
    <svg viewBox="0 0 16 16" className={ic} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M8.5 2.5 4.8 5.5H2.5v5h2.3l3.7 3z" fill="currentColor" stroke="none" />
      <path d="m11 6 3.5 4M14.5 6 11 10" strokeLinecap="round" />
    </svg>
  )
}

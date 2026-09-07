'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FILM_HEIGHT, FILM_WIDTH, scenarios, videoSrc, posterSrc, hasScenarioFilms } from '@/content/media'
import { Icon } from '@/components/ui/icon'
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
            {/* Not a tablist. role="tab" promises aria-controls, a tabpanel,
                roving tabindex and arrow keys; none of that was here, so a
                screen reader announced "tab 1 of 4" and the arrows did nothing.
                Four toggle buttons is what this actually is. */}
            <div role="group" aria-label="Scenario location" className="flex flex-wrap gap-2">
              {scenarios.map((s, i) => (
                <button
                  key={s.slug}
                  type="button"
                  aria-pressed={i === active}
                  onClick={() => goTo(i)}
                  className={cn(
                    'rounded-full border px-3.5 py-2 text-caption transition-colors',
                    i === active
                      ? 'border-accent bg-accent font-semibold text-on-accent'
                      : 'border-line text-muted hover:border-muted hover:text-ink',
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-card border border-line bg-canvas">
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
                  width={FILM_WIDTH}
                  height={FILM_HEIGHT}
                  className="absolute inset-0 size-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              )}

              {/* Click anywhere on the picture to play or pause. A real button,
                  so it is reachable by keyboard and announced properly. */}
              {/* The click-anywhere layer duplicates the Play control below it,
                  so it is a mouse affordance only. Two buttons with the same
                  name, back to back, is a worse keyboard experience than one. */}
              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={togglePlay}
                className={cn(
                  'absolute inset-0 flex items-center justify-center transition-colors',
                  playing ? 'bg-transparent hover:bg-canvas/20' : 'bg-canvas/45',
                )}
              >
                {!playing && (
                  <span className="flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-small font-semibold text-on-accent">
                    <Icon name="play_arrow" filled className="text-xl" />
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
                  <Icon name={playing ? 'pause' : 'play_arrow'} filled className="text-lg" />
                  <span>{playing ? 'Pause' : 'Play'}</span>
                </ControlButton>

                <ControlButton
                  onClick={toggleMute}
                  label={muted ? 'Unmute the scene' : 'Mute the scene'}
                >
                  <Icon name={muted ? 'volume_off' : 'volume_up'} className="text-lg" />
                  <span>{muted ? 'Unmute' : 'Mute'}</span>
                </ControlButton>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className="max-w-xl text-small text-muted">{current.caption}</p>
            <p className="text-caption text-muted">
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
      className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas/75 px-3.5 py-2 text-caption font-medium text-ink backdrop-blur-sm transition-colors hover:bg-canvas/95"
    >
      {children}
    </button>
  )
}

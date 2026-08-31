import { cn } from '@/lib/utils'

/**
 * A phone shell that real markup renders inside.
 *
 * There are no usable screenshots of the app — the images in the ImprovTalk
 * repo root are debug captures, Duolingo reference and competitor screenshots.
 * So rather than fake a photo, the screens here are built as HTML in the app's
 * own palette: crisp at any density, themable, and honest about being a
 * representation.
 *
 * GEOMETRY — matches a current iPhone (17 / 16 Pro class) rather than being
 * sized by whatever content it happens to hold, which made earlier versions
 * look stubby:
 *   screen aspect ratio  9 : 19.5   (1206 x 2622 px on device)
 *   screen corner radius ~13.7% of screen width
 *   Dynamic Island       ~31% of screen width
 *   bezel                even on all four sides
 * The outer shell therefore lands at ~2.09:1, the real device ratio including
 * bezels. Content sits top-aligned with a tab bar pinned to the bottom, so the
 * empty middle reads as screen rather than as a layout gap.
 *
 * `tilt` gives the perspective treatment every reference layout in
 * design_examples/ uses — none of them show a phone flat and straight on. The
 * rotation is CSS 3D on a perspective ancestor, so the markup inside stays
 * selectable, accessible and sharp at any zoom.
 */
export type Tilt = 'none' | 'left' | 'right'

/*
 * Near-upright with a slight turn, as in design_examples/Evoli.pdf where the
 * hero phones stand almost vertical. The previous 15deg yaw read as a graphic
 * rather than as a phone standing on a surface — at that angle the near edge
 * foreshortens enough that the screen stops looking rectangular.
 */
const tilts: Record<Tilt, string> = {
  none: '',
  left: 'rotateY(7deg) rotateX(2deg) rotateZ(-1.5deg)',
  right: 'rotateY(-7deg) rotateX(2deg) rotateZ(1.5deg)',
}

const TABS = ['Home', 'Practice', 'Learn', 'History'] as const

export function DeviceFrame({
  children,
  className,
  label,
  tilt = 'none',
  scale = 1,
  activeTab = 0,
}: {
  children: React.ReactNode
  className?: string
  label?: string
  tilt?: Tilt
  scale?: number
  activeTab?: number
}) {
  const transform = [tilts[tilt], scale !== 1 ? `scale(${scale})` : ''].filter(Boolean).join(' ')

  return (
    <div
      className={cn(
        // p-[3.3%] keeps the bezel proportional when the frame scales down.
        'relative w-full max-w-[300px] rounded-[3rem] border border-line-strong/70 bg-[#05080f] p-[3.3%]',
        'shadow-[0_44px_100px_-34px_rgba(0,0,0,0.95)]',
        className,
      )}
      style={transform ? { transform, transformStyle: 'preserve-3d' } : undefined}
      role="img"
      aria-label={label ?? 'ImprovTalk app screen'}
    >
      <div className="relative flex aspect-[9/19.5] flex-col overflow-hidden rounded-[2.4rem] bg-canvas">
        {/* Status bar + Dynamic Island */}
        <div className="relative flex h-[6.8%] shrink-0 items-center justify-between px-[7%] pt-[1.5%]">
          <span className="numeric text-[10px] font-semibold text-ink">9:41</span>
          <div className="absolute left-1/2 top-[14%] h-[26px] w-[31%] -translate-x-1/2 rounded-full bg-[#05080f]" />
          <div className="flex items-center gap-1">
            <span className="block h-2 w-3.5 rounded-[2px] border border-ink-soft/70" />
            <span className="block h-2 w-2 rounded-full bg-ink-soft/70" />
          </div>
        </div>

        {/* Content — top aligned, clipped like a real screen. */}
        <div className="min-h-0 flex-1 overflow-hidden px-[5.5%] pt-[2%]">{children}</div>

        {/* Tab bar, matching the app's Home / Practice / Learn / History. */}
        <div className="shrink-0 border-t border-line px-[5%] pb-[5%] pt-[3.5%]">
          <div className="flex items-end justify-between">
            {TABS.map((t, i) => (
              <span key={t} className="flex flex-1 flex-col items-center gap-1">
                <span
                  className="block size-[14px] rounded-md"
                  style={{
                    backgroundColor: i === activeTab ? 'var(--color-accent)' : 'transparent',
                    border: i === activeTab ? 'none' : '1.5px solid var(--color-subtle)',
                    opacity: i === activeTab ? 1 : 0.55,
                  }}
                />
                <span
                  className="text-[7.5px]"
                  style={{
                    color: i === activeTab ? 'var(--color-accent)' : 'var(--color-subtle)',
                  }}
                >
                  {t}
                </span>
              </span>
            ))}
          </div>
          {/* Home indicator */}
          <span className="mx-auto mt-[6%] block h-[3px] w-[34%] rounded-full bg-ink-soft/45" />
        </div>
      </div>

      {/* Edge highlight — sells the tilt as a physical object rather than a skew. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[3rem]"
        style={{
          background:
            'linear-gradient(105deg, rgba(255,255,255,0.14) 0%, transparent 22%, transparent 78%, rgba(255,255,255,0.07) 100%)',
        }}
      />
    </div>
  )
}

/** Establishes the shared vanishing point for tilted frames. */
export function DeviceStage({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn('[perspective:1800px]', className)}>{children}</div>
}

/**
 * Two overlapping phones, as in the reference hero layouts — a back device
 * peeking out behind the primary one. The back device is decorative and hidden
 * from assistive tech; the front one carries the label.
 */
export function DeviceCluster({
  front,
  back,
  frontLabel,
  className,
}: {
  front: React.ReactNode
  back: React.ReactNode
  frontLabel?: string
  className?: string
}) {
  return (
    <DeviceStage className={cn('relative', className)}>
      {/*
        The offset is kept small on purpose: at +18% the back device's right
        edge landed past the viewport and the hero's overflow-hidden sliced it
        into what looked like a stray card.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-8 hidden w-full max-w-[300px] opacity-40 sm:block"
        style={{ transform: 'translateX(7%) rotateY(-10deg) rotateZ(2.5deg) scale(0.86)' }}
      >
        <DeviceFrame label="" activeTab={0}>
          {back}
        </DeviceFrame>
      </div>
      <div className="relative">
        <DeviceFrame tilt="right" label={frontLabel} activeTab={1}>
          {front}
        </DeviceFrame>
      </div>
    </DeviceStage>
  )
}

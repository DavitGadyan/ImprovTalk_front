/**
 * Concentric dotted rings behind a subject, after the reference: faint,
 * phone-shaped, fading outward, breathing slowly (globals.css `ripple`).
 * Decorative — hidden from assistive tech, never in the way of the pointer.
 */
export function Ripples({ className }: { className?: string }) {
  const rings = Array.from({ length: 12 }, (_, i) => i)
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 1000"
      className={className}
      style={{ pointerEvents: 'none' }}
    >
      <g className="ripple" fill="none" stroke="var(--color-muted)" strokeDasharray="2 7" strokeLinecap="round">
        {rings.map((i) => {
          const w = 240 + i * 62
          const h = 500 + i * 42
          return (
            <rect
              key={i}
              x={500 - w / 2}
              y={500 - h / 2}
              width={w}
              height={h}
              rx={w * 0.22}
              strokeWidth={1.75}
              opacity={0.42 * (1 - i / 13)}
            />
          )
        })}
      </g>
    </svg>
  )
}

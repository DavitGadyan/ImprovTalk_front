import { cn } from '@/lib/utils'

/**
 * An iPhone, drawn to the current Pro's proportions (149.6 × 71.5 mm, a
 * titanium band around black glass, the Dynamic Island).
 *
 * The case study's renders are phones painted in perspective on their own
 * cards, which is why two of them could never be made to face each other and
 * why a video cannot play inside one. This is a flat device in CSS, sized in
 * container units so every radius and inset scales with the width: the
 * screen is a real rectangle a still or a video fills, and any angle it
 * takes is exactly the one set on it.
 *
 * Layers, outside in: the titanium band (a brushed vertical gradient with
 * light at both ends, and a sheen that travels as the phone turns), the
 * black glass front with a faint radial lift, the screen inset from it, the
 * island over the screen, a diagonal glass reflection, the four side
 * buttons just outside the band, and a deep soft shadow with a faint glow.
 * `children` is the screen; `className` sizes the device.
 */
export function IPhone({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn('phone relative w-full', className)}
      style={{ aspectRatio: '71.5 / 149.6', containerType: 'inline-size', transformStyle: 'preserve-3d' }}
    >
      {/* Side buttons: action, volume up, volume down; power on the right. */}
      <span aria-hidden="true" className="phone-button absolute -left-[0.9cqw] top-[17cqw] h-[6cqw] w-[1.6cqw] rounded-l-[0.6cqw]" />
      <span aria-hidden="true" className="phone-button absolute -left-[0.9cqw] top-[29cqw] h-[12cqw] w-[1.6cqw] rounded-l-[0.6cqw]" />
      <span aria-hidden="true" className="phone-button absolute -left-[0.9cqw] top-[44cqw] h-[12cqw] w-[1.6cqw] rounded-l-[0.6cqw]" />
      <span aria-hidden="true" className="phone-button absolute -right-[0.9cqw] top-[34cqw] h-[19cqw] w-[1.6cqw] rounded-r-[0.6cqw]" />

      {/* The titanium band. */}
      <div className="phone-band absolute inset-0 rounded-[16.5cqw]" />

      {/* The glass front, and the screen inside it. */}
      <div className="phone-glass absolute inset-[1.7cqw] rounded-[15cqw]">
        <div className="absolute inset-[2.6cqw] overflow-hidden rounded-[12.4cqw] bg-black">
          <div className="absolute inset-0">{children}</div>
          {/* The island, sized to cover the one the recordings carry. */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[2.6cqw] h-[6.8cqw] w-[25cqw] -translate-x-1/2 rounded-full bg-black"
          />
          <span aria-hidden="true" className="phone-sheen pointer-events-none absolute inset-0" />
        </div>
      </div>
    </div>
  )
}

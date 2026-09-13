import { cn } from '@/lib/utils'

/**
 * An iPhone 13, drawn.
 *
 * The case study's renders are phones painted in perspective on their own
 * cards, which is why two of them could never be made to face each other and
 * why a video cannot play inside one. This is a flat device in CSS — the
 * 13's proportions (71.5 × 146.7 mm body, a 160 × 34 pt notch on a 390 pt
 * screen, ~12 % screen radius) — so the screen is a real rectangle a still or
 * a video fills, and any angle it takes is exactly the one set on it. The
 * notch is drawn a little deeper than the 13's so it also covers the Dynamic
 * Island the recordings carry (they were made on a 14 Pro).
 *
 * The body is graphite: a 135° gradient with a lighter rim and a hair of
 * outer edge in the box-shadow stack, the four side buttons as bars just
 * outside the body, a diagonal glass highlight over the screen, and a soft
 * shadow beneath. `children` is the screen; `className` sizes the device.
 */
export function IPhone({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn('relative aspect-[71.5/146.7] w-full', className)}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Side buttons: mute, volume up, volume down on the left; power on the right. */}
      <span aria-hidden="true" className="absolute -left-[1.1%] top-[15%] h-[3.6%] w-[1.4%] rounded-l-[2px] bg-[#232326]" />
      <span aria-hidden="true" className="absolute -left-[1.1%] top-[22%] h-[7.2%] w-[1.4%] rounded-l-[2px] bg-[#232326]" />
      <span aria-hidden="true" className="absolute -left-[1.1%] top-[31%] h-[7.2%] w-[1.4%] rounded-l-[2px] bg-[#232326]" />
      <span aria-hidden="true" className="absolute -right-[1.1%] top-[24%] h-[10.5%] w-[1.4%] rounded-r-[2px] bg-[#232326]" />

      {/* The body. */}
      <div
        className="absolute inset-0 rounded-[15%] bg-[linear-gradient(135deg,#2c2c30_0%,#151517_45%,#0b0b0d_100%)]"
        style={{
          boxShadow:
            'inset 0 0 0 1.5px #3a3a3e, inset 0 0 0 3px #17171a, 0 0 0 1px #4a4a4f, 0 30px 60px -20px rgb(0 0 0 / 0.8), 0 60px 120px -30px rgb(0 0 0 / 0.6)',
        }}
      />

      {/* The screen, inset from the body; the notch over it; the glass over both. */}
      <div className="absolute inset-[3.4%] overflow-hidden rounded-[12%] bg-black">
        <div className="absolute inset-0">{children}</div>
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-[4.6%] w-[41%] -translate-x-1/2 rounded-b-[1.1rem] bg-black"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.09)_0%,rgb(255_255_255/0.03)_38%,transparent_42%,transparent_100%)]"
        />
      </div>
    </div>
  )
}

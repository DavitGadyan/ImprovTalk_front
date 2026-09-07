'use client'

import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

type Variant = 'brand' | 'solid' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  /*
   * The primary action: the brand ramp, white text — the only gradient fill on
   * the site, which is what keeps it reading as the thing to press rather than
   * as decoration. Background-position is animated rather than transitioned on
   * hover, because the two would fight over the same property; hover lifts and
   * brightens instead.
   *
   * The attention halo is deliberately NOT here: this variant is also used by
   * the consent banner's Accept button, and a pulsing Accept is a consent dark
   * pattern — visual pressure on a choice that has to be freely given. Opt
   * into the halo per call site instead.
   */
  brand:
    'text-white [background-image:var(--gradient-brand-cta)] bg-[length:200%_100%] ' +
    'animate-[brand-pan_6s_ease-in-out_infinite] ' +
    'shadow-[0_8px_30px_-10px_rgba(175,82,222,0.6)] ' +
    'transition-transform duration-300 ' +
    'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985]',
  solid: 'bg-ink text-canvas hover:opacity-90 active:scale-[0.985]',
  outline: 'border border-line text-ink hover:border-muted hover:bg-surface active:scale-[0.985]',
  ghost: 'text-muted hover:bg-surface hover:text-ink',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-small',
  md: 'h-12 px-6 text-small',
  lg: 'h-14 px-8 text-body',
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'brand', size = 'md', asChild, children, ...props },
  ref,
) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap',
        'transition-all duration-200 ease-[var(--ease-out-soft)]',
        'disabled:cursor-not-allowed disabled:opacity-55 disabled:active:scale-100',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  )
})

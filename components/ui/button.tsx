'use client'

import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

type Variant = 'brand' | 'solid' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  /*
   * The primary action: the flat violet pill with black text, exactly the
   * app's PrimaryButton. No gradient, no glow — when the accent appears on one
   * thing per view it says "press this"; on every button it was decoration.
   * Pressed state is opacity, as it is on every Pressable in the app.
   *
   * The attention halo is deliberately NOT here: this variant is also used by
   * the consent banner's Accept button, and a pulsing Accept is a consent dark
   * pattern. Opt into the halo per call site instead.
   */
  brand: 'bg-accent text-on-accent hover:opacity-90 active:opacity-80 active:scale-[0.985]',
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

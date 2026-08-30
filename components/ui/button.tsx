'use client'

import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

type Variant = 'brand' | 'solid' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  /*
   * Gradient place 2 of 3. This is the only element on the site that gets a
   * gradient fill, which is what keeps it reading as the primary action rather
   * than as decoration.
   */
  brand:
    'text-white [background-image:var(--gradient-brand)] bg-[length:140%_100%] bg-left hover:bg-right ' +
    'transition-[background-position,transform] duration-500 active:scale-[0.985] ' +
    'shadow-[0_8px_30px_-10px_rgba(175,82,222,0.6)]',
  solid: 'bg-ink text-canvas hover:bg-white active:scale-[0.985]',
  outline:
    'border border-line-strong text-ink hover:border-ink/45 hover:bg-raised/50 active:scale-[0.985]',
  ghost: 'text-ink-soft hover:text-ink hover:bg-raised/50',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-8 text-base',
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
        'inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap',
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

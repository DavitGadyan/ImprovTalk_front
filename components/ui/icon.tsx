import { ICONS, type IconName } from '@/lib/icons'
import { cn } from '@/lib/utils'

/**
 * One glyph from the app's own icon family.
 *
 * Material Symbols Rounded, subset to the names in lib/icons.ts and addressed by
 * codepoint, so a name that is not baked fails at the type level rather than
 * as a missing-glyph box in the browser. Outlined at rest; `filled` for the
 * active state, which is how the app's tab bar does it.
 *
 * Decorative by default. Pass `label` when the glyph is the only content of a
 * control, and it becomes an accessible image.
 */
export function Icon({
  name,
  filled = false,
  label,
  className,
}: {
  name: IconName
  filled?: boolean
  label?: string
  className?: string
}) {
  return (
    <span
      className={cn('ms', className)}
      data-filled={filled ? '' : undefined}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {String.fromCodePoint(ICONS[name])}
    </span>
  )
}

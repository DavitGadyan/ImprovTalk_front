import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/*
 * tailwind-merge only knows Tailwind's own names. The site's body scale —
 * text-body / text-small / text-caption / text-micro — is declared in
 * globals.css, so without this it read them as text COLOURS, put them in the
 * same group as text-on-accent / text-muted, and dropped whichever came first:
 * every violet pill rendered white text, every nav link lost its size. Naming
 * them as font sizes here is what lets a size and a colour coexist in one cn().
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': ['text-body', 'text-small', 'text-caption', 'text-micro'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

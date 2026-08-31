import type { Persona, SectionKey } from './types'
import { shy } from './shy'
import { language } from './language'
import { social } from './social'
import { speaking } from './speaking'
import { rusty } from './rusty'

export type { Persona, SectionKey } from './types'

export const personas = { shy, language, social, speaking, rusty } as const
export type PersonaSlug = keyof typeof personas

/** The canonical page. Everything else is noindex and canonicals back to it. */
export const DEFAULT: PersonaSlug = 'shy'

/**
 * Personas currently in the live random split.
 *
 * Two at a time on purpose. Splitting traffic N ways gives each arm 1/N of it,
 * and separating a real difference from noise needs roughly 1,500–3,000 visitors
 * per arm — a five-way split would need 10–15k before it said anything, and with
 * five arms one would look like a winner by chance.
 *
 * Rotate the challenger by editing this array. The personas left out are not
 * wasted: they stay reachable by URL as campaign landing pages, where matching
 * the ad to the page pays off immediately and needs no statistical power.
 */
export const ACTIVE_SPLIT: PersonaSlug[] = ['shy', 'language']

export const allPersonas = Object.values(personas) as Persona[]

export function personaByPath(path: string): Persona {
  return allPersonas.find((p) => p.path === path) ?? personas[DEFAULT]
}

export const sectionOrderOf = (p: Persona): SectionKey[] => p.order

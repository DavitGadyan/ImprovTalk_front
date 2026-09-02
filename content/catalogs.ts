/**
 * The Learn library.
 *
 * Every count here was read straight out of the shipped data files in
 * ImprovTalk/packages/shared/reference/*.json (and nationality_assets/index.json
 * for countries) — not estimated. If a catalog grows, re-count before editing.
 *
 * The eyebrow strings are the app's own labels from apps/mobile/app/learn.tsx.
 */
export type Catalog = { label: string; name: string; count: number; hue?: string }

export const catalogs: Catalog[] = [
  { label: 'BE MORE CONFIDENT', name: 'Charisma training', count: 26, hue: 'var(--color-learn)' },
  { label: 'GUESS THEIR COUNTRY', name: 'Countries', count: 195, hue: 'var(--color-accent)' },
  { label: 'HEAR THE ACCENT', name: 'Accents in English', count: 29 },
  { label: 'TALK ABOUT MOVIES', name: 'Famous movies', count: 380, hue: 'var(--color-simulate)' },
  { label: 'FAMOUS SONGS', name: 'Songs', count: 263 },
  { label: 'WHAT TATTOOS MEAN', name: 'Tattoos', count: 372, hue: 'var(--color-practice)' },
  { label: 'FAMOUS PLACES', name: 'World attractions', count: 204 },
  { label: 'FUN FACTS', name: 'Bizarre country facts', count: 197 },
  { label: 'TALK ABOUT ART', name: 'Famous paintings', count: 195 },
  { label: 'WHAT SYMBOLS MEAN', name: 'Amulets & pendants', count: 146 },
  { label: 'FAMOUS PEOPLE', name: 'People worth knowing', count: 139 },
  { label: 'FAMOUS STATUES', name: 'Sculptures', count: 71 },
  { label: 'READ THE HAND', name: 'Palm reading', count: 67 },
  { label: '"WHAT DO YOU DO?"', name: 'Professions & jokes', count: 56, hue: 'var(--color-learn)' },
  { label: 'TYPES OF MUSIC', name: 'Music genres', count: 55 },
  { label: 'USEFUL WORDS', name: 'Insider terms', count: 50 },
  { label: 'KNOW THE SIGNS', name: 'Relationship terms', count: 45 },
  { label: 'WHAT HER HANDS SAY', name: 'Gestures', count: 38 },
  { label: 'READ PEOPLE', name: 'The art of deduction', count: 24, hue: 'var(--color-stats)' },
  { label: 'ROMANTIC MOVIE MOMENTS', name: 'Screen romance', count: 23 },
  { label: 'READ THE CUP', name: 'Coffee cup reading', count: 21 },
  { label: 'STAR SIGNS', name: 'Horoscope', count: 20 },
]

/** 2,571 reference items + 195 countries. Verified by counting the JSON. */
export const TOTAL_LIBRARY_ITEMS = 2766

/** Numbers used in the copy. All verified against the repo. */
export const stats = {
  liveScenarios: 70,
  liveVenues: 13,
  /* Served, not shelved: the 19 files the loader reads hold 225 scenarios, but
     15 carry `disabled: true` and are filtered out before any of them reach a
     user. Counted from orchestrator.py's own _LOCATION_FILES list. */
  simScenarios: 210,
  simVenues: 19,
  countries: 195,
  facePhotos: 631,
  audioClips: 195,
  charismaExercises: 26,
  freeWeekly: 3,
} as const

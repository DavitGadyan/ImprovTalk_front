/**
 * What Practice contains, counted from the app's data files on 14 Sep 2026.
 *
 * Three directories feed the Practice hub (apps/mobile/app/practice.tsx):
 *
 *  - packages/shared/pickup/*.json — 14 files, 71 scenes: 12 approach venues
 *    (bar 5, beach 12, coffeeshop 9, festival 4, grocery 3, gym 8, mall 3,
 *    park 7, staff 6 — "On the Clock" in the app, street 5, swimmingpool 3,
 *    university 4 — "Campus"), plus freeimprov (1) and custom (1, Max).
 *  - packages/shared/locations/*.json — 8 files, 41 scenes: bar 5 (Pro),
 *    cafe 7, gym 4, office 4, park 5 (approach venues; bar, gym and park
 *    merge with the pickup venue of the same name — `merged.bar` in
 *    src/ui/venueOrder.ts), and the three groups below: pressure 5 (Pro),
 *    date 6 (Max), reverse 5 (Max).
 *  - packages/shared/scenarios/*.json — 16 improv and drill scenarios
 *    (content/scenarios.ts carries them one by one).
 *
 * So: approach scenes 69 + 25 = 94 across 14 venues; 5 + 6 + 5 in the three
 * named groups; 16 drills; Free Improv and Custom Practice as single nodes —
 * 128 scenes a user can start, in 17 venue groups. Titles, subtitles and
 * scene names are verbatim from the files. The intro line is the hub's own.
 */

export type PlanKey = 'free' | 'pro' | 'max'

export type PracticeMode = {
  key: 'approach' | 'pressure' | 'date' | 'reverse' | 'drills'
  /** The app's own group title (locations/*.json `title`), or ours for the composite groups. */
  title: string
  /** The app's own subtitle, verbatim, where the group has one. */
  subtitle?: string
  from: PlanKey
  scenes: number
  /** Scene titles verbatim from the files; a sample where the set is large. */
  examples: string[]
  /** What it trains — the site's sentence. */
  trains: string
}

/** The Practice hub's own intro (practice.tsx:243), verbatim. */
export const PRACTICE_INTRO =
  'Real-world locations and settings to practice improvisation, deduction and emotional intelligence to create rapport with a person.'

export const APPROACH = { scenes: 94, venues: 14 } as const

export const PRACTICE_MODES: PracticeMode[] = [
  {
    key: 'approach',
    title: 'Approach',
    from: 'pro',
    scenes: APPROACH.scenes,
    examples: ['Bar', 'Beach', 'Café', 'Coffee Shop', 'Gym', 'Park', 'Festival', 'Campus', 'Office', 'Street'],
    trains:
      'Opening with someone who did not expect you, reading what her scene card and her dials are telling you, and getting to a number or a plan — or a clean exit.',
  },
  {
    key: 'pressure',
    title: 'Situational Pressure',
    subtitle: 'Stay calm when someone comes at you',
    from: 'pro',
    scenes: 5,
    examples: ['Jealous Boyfriend', 'Angry Relative', 'Drunk Person', 'Police Stop', 'Street Hustler'],
    trains:
      'Holding your composure when the other person is not calm: de-escalating without backing down, and leaving with the situation smaller than you found it.',
  },
  {
    key: 'date',
    title: 'Date',
    subtitle: 'She said yes. Listen, then close.',
    from: 'max',
    scenes: 6,
    examples: ['First date, coffee', 'Dinner', 'Drinks after work', 'Walk in the park', 'Gallery date', 'Second date, cocktail bar'],
    trains:
      'The evening after the approach worked. Most of it is listening; the close is the next date, never a phone number.',
  },
  {
    key: 'reverse',
    title: 'Reverse Role',
    subtitle: 'He’s opening. Hold your frame.',
    from: 'max',
    scenes: 5,
    examples: ['The regular', 'The nervous one', 'Won’t take the first no', 'The shy one', 'Friend of a friend'],
    trains:
      'The other side of everything above: he approaches, with his persistence and smoothness on dials, and you are scored on reading him, holding your frame, and saying yes or no cleanly.',
  },
  {
    key: 'drills',
    title: 'Improv and drills',
    from: 'pro',
    scenes: 16,
    examples: ['Yes, And', 'Questions Only', 'Random Improv', 'Status Game', 'Rejection Catch', 'Tough feedback'],
    trains:
      'The reflexes under all of it: accepting what you are given, keeping something running, holding your ground without getting louder.',
  },
]

/** Where a persona puts a mode first; the rest keep the app's order. */
export const modesFor = (lead?: PracticeMode['key']) =>
  lead ? [...PRACTICE_MODES].sort((a, b) => (a.key === lead ? -1 : b.key === lead ? 1 : 0)) : PRACTICE_MODES

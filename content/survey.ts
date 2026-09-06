/**
 * The persona survey.
 *
 * Every marketing artefact in this repo is built on five personas that were
 * reasoned from the product rather than from anyone who wants it. This is the
 * cheapest way to start replacing that with answers.
 *
 * The colour model is not invented here. It is the product's own — COLOR_TRAITS
 * in services/api/app/services/simulator/blends.py, where the same four colours
 * drive the AI partner's behaviour and are stored per user as `suitor_color`.
 * The wording below is that wording, with the pronouns neutralised: the original
 * describes the AI target, and here it describes the respondent.
 */

export type GoalSlug =
  | 'shyness'
  | 'language'
  | 'socialising'
  | 'dating'
  | 'practice'
  | 'reset'
  | 'other'

export type ColorKey = 'red' | 'blue' | 'yellow' | 'green'

/* ---------------------------------------------------------------- goals -- */

export type Goal = {
  slug: GoalSlug
  label: string
  /** Shown under the label. What this person would actually say. */
  hint: string
  /** Which of the five families in docs/PERSONAS-15.md. */
  family: string
  /** Which tips PDF they receive. `other` resolves to socialising. */
  tips: Exclude<GoalSlug, 'other'>
  /** Landing page this persona already has, where one exists. */
  page?: string
  hue: string
}

export const GOALS: Goal[] = [
  {
    slug: 'dating',
    label: 'Dating and relationships',
    hint: 'Getting there, holding it, or telling how it is going.',
    family: 'Dating',
    tips: 'dating',
    hue: 'var(--color-danger)',
  },
  {
    slug: 'shyness',
    label: 'Overcome shyness',
    hint: 'You freeze, and the right words arrive an hour later.',
    family: 'Social',
    tips: 'shyness',
    page: '/',
    hue: 'var(--color-danger)',
  },
  {
    slug: 'socialising',
    label: 'Meeting people and socialising',
    hint: 'The first thirty seconds are the hard part.',
    family: 'Social',
    tips: 'socialising',
    page: '/meeting-people/',
    hue: 'var(--color-warn)',
  },
  {
    slug: 'language',
    label: 'Speaking a second language',
    hint: 'Fine on paper. Three words out loud.',
    family: 'Language',
    tips: 'language',
    page: '/second-language/',
    hue: 'var(--color-accent)',
  },
  {
    slug: 'practice',
    label: 'Speaking up at work',
    hint: 'Interviews, meetings, client calls, difficult conversations.',
    family: 'Work',
    tips: 'practice',
    page: '/speaking-up/',
    hue: 'var(--color-success)',
  },
  {
    slug: 'reset',
    label: 'Getting back after a break',
    hint: 'You used to be fine at this.',
    family: 'Reset',
    tips: 'reset',
    page: '/out-of-practice/',
    hue: 'var(--color-gold)',
  },
  {
    slug: 'other',
    label: 'Type your situation',
    hint: 'None of these fit. Say it in your own words.',
    family: 'Social',
    /* Resolves to Socializer by design — the broadest family, and the free text
       is the more valuable output anyway. Read those monthly. */
    tips: 'socialising',
    hue: 'var(--color-muted)',
  },
]

export const goalBySlug = (s: string) => GOALS.find((g) => g.slug === s)

/* --------------------------------------------------------------- colours -- */

export type Color = {
  key: ColorKey
  label: string
  /** Second person, so it reads as a description of the respondent. */
  you: string
  wants: string
  hates: string
  hex: string
}

export const COLORS: Color[] = [
  {
    key: 'red',
    label: 'Direct',
    you: 'You decide quickly and get to the point. You would rather be told the thing than walked to it.',
    wants: 'directness, brevity, getting to the point',
    hates: 'filler, hedging, slow ramps',
    hex: '#ff6b6b',
  },
  {
    key: 'blue',
    label: 'Analytical',
    you: 'You want the real reason and the specifics. You open slowly and you notice when someone is performing.',
    wants: 'accuracy, specifics, the real reason',
    hates: 'hype, charm without substance',
    hex: '#849cff',
  },
  {
    key: 'yellow',
    label: 'Expressive',
    you: 'You run on energy and story. You light up when someone laughs with you and you build on what they give you.',
    wants: 'energy, story, being seen',
    hates: 'flatness, judgment, transactional talk',
    hex: '#ffd166',
  },
  {
    key: 'green',
    label: 'Steady',
    you: 'You take your time and consider people. Slow to open, and you walk away from anyone who rushes you.',
    wants: 'patience, consideration, time to warm up',
    hates: 'pressure, urgency, being pushed',
    hex: '#7de2a6',
  },
]

export type Blend = Record<ColorKey, number>

export const EVEN_BLEND: Blend = { red: 25, blue: 25, yellow: 25, green: 25 }

/**
 * Normalise four raw slider values to percentages summing to exactly 100.
 *
 * Mirrors blend_summary() in blends.py, including the rounding problem: four
 * rounded percentages routinely sum to 99 or 101, so the remainder is pushed
 * onto the largest component where it is least visible.
 */
export function normalise(raw: Blend): Blend {
  const total = COLORS.reduce((t, c) => t + Math.max(0, raw[c.key]), 0)
  if (total <= 0) return { ...EVEN_BLEND }

  const out = {} as Blend
  for (const c of COLORS) out[c.key] = Math.round((Math.max(0, raw[c.key]) / total) * 100)

  const drift = 100 - COLORS.reduce((t, c) => t + out[c.key], 0)
  if (drift !== 0) {
    const biggest = [...COLORS].sort((a, b) => out[b.key] - out[a.key])[0]!
    out[biggest.key] += drift
  }
  return out
}

/** Sorted high to low, matching blend_summary()'s output order. */
export const ranked = (b: Blend) =>
  [...COLORS].sort((x, y) => b[y.key] - b[x.key])

/** "60% Blue + 30% Green + 5% Red + 5% Yellow" */
export const blendSummary = (b: Blend) =>
  ranked(b)
    .map((c) => `${b[c.key]}% ${c.label}`)
    .join(' + ')

/* ------------------------------------------------------------ demographics -- */

export const AGE_BANDS = ['Under 18', '18–24', '25–34', '35–44', '45–54', '55+', 'Prefer not to say']

export const GENDERS = ['Male', 'Female', 'Non-binary', 'Prefer not to say']

/**
 * ISO 3166-1 alpha-2. Names are rendered at runtime with Intl.DisplayNames so
 * this file stays small and the list appears in the visitor's own language.
 */
export const COUNTRY_CODES =
  'AE,AF,AL,AM,AR,AT,AU,AZ,BA,BD,BE,BG,BR,BY,CA,CH,CL,CN,CO,CR,CY,CZ,DE,DK,DO,DZ,EC,EE,EG,ES,ET,FI,FR,GB,GE,GH,GR,GT,HK,HR,HU,ID,IE,IL,IN,IQ,IR,IS,IT,JO,JP,KE,KG,KH,KR,KW,KZ,LB,LK,LT,LU,LV,MA,MD,MK,MM,MN,MX,MY,NG,NL,NO,NP,NZ,OM,PA,PE,PH,PK,PL,PT,PY,QA,RO,RS,RU,SA,SE,SG,SI,SK,TH,TN,TR,TW,UA,US,UY,UZ,VE,VN,ZA'
    .split(',')

export function countryName(code: string): string {
  try {
    const dn = new Intl.DisplayNames(['en'], { type: 'region' })
    return dn.of(code) ?? code
  } catch {
    return code
  }
}

/* ----------------------------------------------------------------- result -- */

/**
 * The explicit situation sentence.
 *
 * The brief was that the result must say plainly what this person's situation
 * is, not hand back a generic type. Goal gives the family; the dominant colour
 * decides which version of that family they are — a blue-dominant person
 * choosing Dating is a different problem from a yellow-dominant one, and the
 * whole point of asking both is to say so.
 */
const SITUATION: Record<Exclude<GoalSlug, 'other'>, Partial<Record<ColorKey, string>> & { base: string }> = {
  shyness: {
    base: 'You are not short of things to say. You are short of time to say them in.',
    blue: 'You compose the whole sentence before you open your mouth, and the moment closes while you are still drafting.',
    green: 'You wait for a clean opening that never quite arrives, and the conversation moves on without you.',
    red: 'You know exactly what you think. Saying it in a room full of people is the part that stalls.',
    yellow: 'One-to-one you are fine. It is the group that flattens you.',
  },
  language: {
    base: 'You have a speaking gap, not a vocabulary gap.',
    blue: 'You are translating before you speak, and accuracy is costing you the four seconds the conversation needed.',
    green: 'You keep answers short to stay safe, which means less practice, which makes the next one harder.',
    red: 'You are used to being the decisive one, and answering in three words does not sound like you.',
    yellow: 'You are funny in your own language and flat in this one, which is the most frustrating version of this.',
  },
  socialising: {
    base: 'The first thirty seconds are the only hard part, and nobody practises the first thirty seconds.',
    blue: 'You over-prepare the opener and the moment passes while you are still evaluating it.',
    green: 'You wait to be approached, which works until you are somewhere nobody knows you.',
    red: 'You open fine and lose interest when it does not go somewhere quickly.',
    yellow: 'You are good once it is running. Starting from silence is the bit that costs you.',
  },
  dating: {
    base: 'You can do the parts either side. It is the middle of the conversation that is the problem.',
    blue: 'You read the situation carefully and hesitate, and hesitation reads as disinterest.',
    green: 'You give it time and space, which is right — but you rarely say the thing that moves it on.',
    red: 'You are direct, which works early and can read as pressure later. The skill is noticing when to slow down.',
    yellow: 'You are warm and quick, and can fill a silence that the other person needed.',
  },
  practice: {
    base: 'Nobody at work will tell you how you sound, so nothing changes on its own.',
    blue: 'Your content is right and your delivery is losing the room before the point lands.',
    green: 'You are measured and easy to talk over. Being heard is a pace problem, not a volume one.',
    red: 'You get to the point and speed up under pressure, and the room stops following.',
    yellow: 'You have energy and lose the thread. Structure is the thing to practise.',
  },
  reset: {
    base: 'Nothing changed about you. Only how often you get to practise.',
    blue: 'You are analysing conversations that used to be automatic, and the analysis is the friction.',
    green: 'You need a warm-up you are not currently getting anywhere.',
    red: 'You still know what to say. The gap is between deciding and saying it out loud.',
    yellow: 'You used to run on other people’s energy, and there has been less of it around.',
  },
}

export function situationFor(goal: GoalSlug, blend: Blend): string {
  const g = goalBySlug(goal)
  const key = (g?.tips ?? 'socialising') as Exclude<GoalSlug, 'other'>
  const top = ranked(blend)[0]!.key
  const set = SITUATION[key]
  return set[top] ?? set.base
}

/* -------------------------------------------------------------- personas -- */

/**
 * The fifteen personas from docs/PERSONAS-15.md, offered as a second question
 * once a goal is chosen.
 *
 * Fifteen options on one screen is a wall, and the families are what differ in
 * messaging — so the goal question stays at seven and this narrows inside it.
 * Where a family has only one persona it is assigned without asking.
 *
 * `situation` is said straight back to the respondent, so each one is written
 * against that persona's never-list in the taxonomy: nobody in the Reset or
 * Language families is told they are starting, learning or a beginner, and
 * nobody in Dating is told they are behind.
 */
export type Persona = {
  id: string
  goal: GoalSlug
  label: string
  /** One line underneath, in the words they would use. */
  hint: string
  /** Named back to them on the result screen and in the PDF. */
  situation: string
}

export const PERSONAS: Persona[] = [
  /* Dating */
  {
    id: 'late-starter',
    goal: 'dating',
    label: 'I have not really dated much',
    hint: 'Less a technique problem than a practice problem.',
    situation:
      'You did not get the decade of low-stakes practice most people got, and the gap that opens is one of repetitions rather than of anything about you. Repetitions are the one part of this that can be manufactured.',
  },
  {
    id: 'back-after-relationship',
    goal: 'dating',
    label: 'Back out after a long relationship',
    hint: 'You were fine at this once.',
    situation:
      'You are resuming. What moved on is the format, not your ability to talk to someone, and the format is the easy half. What accounts for the rest is the reps you have not had in years.',
  },
  {
    id: 'apps-not-in-person',
    goal: 'dating',
    label: 'Good in text, flat in person',
    hint: 'The messaging goes well. The room does not.',
    situation:
      'Writing well is a real skill and you have it. It does not transfer because text gives you unlimited time to compose and a room gives you about four seconds — so the thing to practise is the clock, not the material.',
  },
  {
    id: 'first-date-freeze',
    goal: 'dating',
    label: 'The date is fine, then it stalls',
    hint: 'The first ten minutes are good. The next forty are not.',
    situation:
      'You can get there and the opening works. It is the middle that goes quiet, which is why another list of questions has never fixed it — running out of questions was never what was happening.',
  },
  {
    id: 'reading-interest',
    goal: 'dating',
    label: 'I cannot tell how it is going',
    hint: 'So you push on, or you leave when it was fine.',
    situation:
      'Not being able to read where you are makes you over-correct in one direction or the other. This is a question of attention rather than of decoding anyone, and it is the one thing a tunable partner can actually rehearse with you.',
  },

  /* Social */
  {
    id: 'freeze-and-replay',
    goal: 'shyness',
    label: 'Freezing, then replaying it later',
    hint: 'The right words arrive an hour afterwards.',
    situation:
      'The words arrive an hour late because your attention was doing two jobs at once — holding the conversation and watching yourself hold it. That is a load problem, and load comes down with repetition.',
  },
  {
    id: 'first-thirty-seconds',
    goal: 'socialising',
    label: 'The opening is the hard part',
    hint: 'Fine once it is running. Starting is the problem.',
    situation:
      'You are fine once a conversation is moving. The first thirty seconds end you, and they are the one stretch nobody ever gets to rehearse before it counts.',
  },

  /* Language */
  {
    id: 'fluent-on-paper',
    goal: 'language',
    label: 'I read it fine and cannot speak it',
    hint: 'Comfortable on paper. Three words out loud.',
    situation:
      'This is a speaking gap, not a vocabulary gap. You have never had an hour of low-stakes talking in it, because everything available teaches words and leaves the repetitions for you to find on your own.',
  },
  {
    id: 'newly-relocated',
    goal: 'language',
    label: 'New country, missing the context',
    hint: 'The language is adequate. The rest is not.',
    situation:
      'The language is not what is failing. You answer the literal question, the joke goes past, and you cannot tell when small talk has finished — that is cultural context, and it moves on its own timetable.',
  },

  /* Work */
  {
    id: 'being-heard',
    goal: 'practice',
    label: 'Not being heard in meetings',
    hint: 'You have the seat. You lose the room.',
    situation:
      'Your content is right and it is your delivery that loses the room before the point lands. Nobody at work will ever tell you that, which is why it has stayed the same for years.',
  },
  {
    id: 'interviews',
    goal: 'practice',
    label: 'An interview coming up',
    hint: 'One go, high stakes, no second attempt.',
    situation:
      'One performance, no retake, and the only rehearsal most people get is in their own head — where it always goes well. Saying it out loud is a different act from knowing the answer.',
  },
  {
    id: 'client-facing',
    goal: 'practice',
    label: 'Client calls and pitches',
    hint: 'You talk for a living, and delivery costs deals.',
    situation:
      'You do this professionally, so the gap is not knowledge. Pace, filler and rambling are invisible to you in the moment and obvious on a recording. You already measure everything else.',
  },
  {
    id: 'leading-a-team',
    goal: 'practice',
    label: 'Leading, and the hard conversations',
    hint: 'Difficult feedback. Disagreement without it going cold.',
    situation:
      'This is presence rather than persuasion: being heard without raising your voice, and disagreeing without the room cooling. The conversations that matter most are the ones you get one attempt at.',
  },

  /* Reset */
  {
    id: 'out-of-practice',
    goal: 'reset',
    label: 'Out of practice',
    hint: 'You used to be the one who talked to everyone.',
    situation:
      'Nothing about you changed. What changed is how often you get to do it, and a habit that is not being used goes quiet long before anything is actually lost.',
  },
  {
    id: 'remote-isolation',
    goal: 'reset',
    label: 'Remote work took the practice away',
    hint: 'Fine on a scheduled call. Lost in a room.',
    situation:
      'Your circle did not shrink — the unplanned part of it vanished. Scheduled calls kept the structured conversations going and quietly removed every unstructured one, which is the kind that keeps you sharp.',
  },
]

export const personasFor = (goal: GoalSlug | null): Persona[] =>
  goal ? PERSONAS.filter((p) => p.goal === goal) : []

export const personaById = (id: string | null): Persona | null =>
  (id && PERSONAS.find((p) => p.id === id)) || null

/* ------------------------------------------------------------------ meta -- */

export const SURVEY_VERSION = 2
export const STORAGE_KEY = 'improvtalk-survey'

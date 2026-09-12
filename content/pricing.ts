/**
 * Plans, prices, and what every Home tile gives you.
 *
 * The single source for the /pricing/ page, the JSON-LD offers, the FAQ
 * answers about cost, and the Real Talk section on the persona pages. Nothing
 * else in the site may carry a price figure; they all read PRICES from here.
 *
 * Where the numbers come from, so they can be re-checked:
 *
 *  - PRICES: the app's Plans screen, apps/mobile/app/upgrade.tsx:46-50, as of
 *    commit 63cdd1b (12 Sep 2026): Pro $25 a week or $69 a month, Max $49 a
 *    week or $129 a month; the app defaults to monthly (:155) and says "No
 *    yearly plan yet" (:361). The API's settings.py carries no figures — only
 *    the Apple product ids `…{premium,max}.{weekly,monthly}` (:84-89). The
 *    saving is the app's own formula (:53-57), computed here, never typed.
 *  - PLAN_CARDS and ROWS: upgrade.tsx:79-118 and :122-134, verbatim, in the
 *    app's order. Two of the table's claims have nothing behind them in code
 *    yet — Pro's "Standard" voice model (realtime.py:363-368 gives Pro the
 *    Max model) and "Priority when busy" (no tier-aware code) — recorded in
 *    history.md under "Pricing".
 *  - Free / Pro / Max conversation limits: settings.py:106-107 (3 and 30) and
 *    plan_limits.py (max = unlimited).
 *  - The six tiles and their order: apps/mobile/app/index.tsx:27-34, verbatim.
 *    The app's tiles carry no subtitle (:20-22), so each `line` is the site's.
 *  - Real Talk's three tools and their lines: apps/mobile/app/real-talk.tsx:21-43,
 *    verbatim. "2–3 openers" is what the code delivers (get_advice.py:54, cap
 *    at :110); a direction's likelihood is the string "high" or "medium"
 *    (:62,:127), never a percentage; the upload screen says "Charisma grade".
 *  - Audio limits: analyze/index.tsx:138,140 and conversation_analysis.py:42-52.
 *
 * Practice on Pro and Real Talk on Max are what the app gates since 63cdd1b
 * (entitlements.py:84, practice.tsx:109, real-talk.tsx:55).
 */

import type { IconName } from '@/lib/icons'
import type { RenderName } from '@/lib/renders'

export type Interval = 'week' | 'month'

export const PRICES = {
  pro: { week: 25, month: 69 },
  max: { week: 49, month: 129 },
  currency: 'USD',
  symbol: '$',
} as const

export const INTERVALS: { key: Interval; label: string; per: string }[] = [
  { key: 'week', label: 'Weekly', per: 'week' },
  { key: 'month', label: 'Monthly', per: 'month' },
]

/** The app's default (upgrade.tsx:155). */
export const DEFAULT_INTERVAL: Interval = 'month'

/** How much cheaper a month is than 4.33 weeks, as a whole percent — the
    app's own formula (upgrade.tsx:53-57). */
const WEEKS_PER_MONTH = 52 / 12
export const savingsPct = (key: 'pro' | 'max') =>
  Math.round((1 - PRICES[key].month / (PRICES[key].week * WEEKS_PER_MONTH)) * 100)
export const MAX_SAVINGS = Math.max(savingsPct('pro'), savingsPct('max'))

export const BILLING_NOTE = 'Billed weekly or monthly. Cancel anytime. No yearly plan yet.'

/* ---------------------------------------------------------------- tiles -- */

export type Tile = {
  /** The app's own tile title. */
  title: string
  icon: IconName
  /** One sentence, beside the icon when the row is closed. */
  line: string
  /** What it gives you, in two or three sentences. */
  body: string
  /** A real render, where one exists. No placeholder is ever drawn. */
  render?: RenderName
  /** Which plan first includes it. */
  from: 'free' | 'pro' | 'max'
}

/** In the app's order. */
export const TILES: Tile[] = [
  {
    title: 'Simulate',
    icon: 'auto_awesome',
    line: 'Watch a whole conversation run before you say a word.',
    body: 'Set up who you are talking to — how open, how guarded, what mood, how they come across — and watch a whole conversation run before you have to say a word. Three runs a week on Free.',
    render: 'setup-blend',
    from: 'free',
  },
  {
    title: 'Practice',
    icon: 'mic',
    line: 'Hold the disc and talk; it answers in voice.',
    body: 'Hold the disc and talk. It answers in real time, in voice, and hesitates and interrupts the way people do. A scene to pick at every venue, Situational Pressure for the confrontations, improv and drills, a hint if you stall, and a Charisma Score with the working shown at the end.',
    render: 'live-session',
    from: 'pro',
  },
  {
    title: 'Learn',
    icon: 'palette',
    line: 'Techniques, and something to talk about.',
    body: 'Techniques, one at a time, and something to talk about when the conversation turns to art, music, film, places or people. The observation half of a conversation, which is the half nobody teaches.',
    render: 'home',
    from: 'free',
  },
  {
    title: 'Real Talk',
    icon: 'bolt',
    line: 'Conversations you actually had, graded.',
    body: 'Conversations you actually had. Upload a recording and get it graded, describe or dictate one and get it rated, or describe a situation before you walk over and get your openers.',
    from: 'max',
  },
  {
    title: 'Stats',
    icon: 'monitoring',
    line: 'Week against week, as a trend.',
    body: 'Week against week. Pace, pauses, filler density and the score itself as a trend rather than a feeling, so you can see whether the thing you are working on is moving.',
    render: 'score-screen',
    from: 'free',
  },
  {
    title: 'History',
    icon: 'schedule',
    line: 'Every session and every score, kept.',
    body: 'Every session, every rated real conversation, every score, kept. Open any of them to see the transcript and the moments that decided it.',
    from: 'free',
  },
]

/* ------------------------------------------------------------ real talk -- */

export type Tool = {
  /** The app's own title, verbatim. */
  title: string
  /** The app's own one-liner, verbatim. */
  line: string
  /** What you get, in the app's own terms. */
  gives: string[]
}

export const REAL_TALK: { title: string; intro: string; tools: Tool[] } = {
  title: 'Real Talk',
  intro:
    'Conversations you actually had. Analyze a recording, or describe the chat — screenshots, dictation or a summary — and get rated on how you really did.',
  tools: [
    {
      title: 'Upload an Audio File',
      line: 'Pros, cons, improvements + a grade on a conversation you actually had.',
      gives: [
        'A Charisma grade from 0 to 100, with the working shown',
        'Voice and delivery: depth, intonation, pace, pauses, fillers, steadiness',
        'The magic phrases you used, and the ones you missed',
        'The full transcript, turn by turn',
        'WAV, MP3, M4A, AAC, FLAC, OGG, OPUS, MP4, MPEG or WEBM — up to 25 MB, about five minutes — in English, Spanish or Russian',
      ],
    },
    {
      title: 'Generate & Rate Conversation',
      line: 'Describe it, dictate it, or add chat screenshots — the coach reads it in the language it was written in, summarizes it and rates how you communicated.',
      gives: [
        'What happened, reconstructed from your summary or read straight off the screenshots',
        'What worked, what to fix, and what to do next time',
        'How it ended — a number, socials, a plan, an open door, a soft no or a hard no',
        'Add what you think went wrong, and it tells you whether you are right',
      ],
    },
    {
      title: 'Get Advice',
      line: 'Describe where you are and who she seems to be — get 2–3 openers, where to take it, and what to avoid, tuned to your history.',
      gives: [
        'The read: what the situation is actually telling you',
        'Two or three openers, best first, each with why it fits',
        'Where to take it, with each direction marked high or medium likelihood and a signal to watch for',
        'What to avoid, and what to do if it stalls',
        'Then practise exactly that, live',
      ],
    },
  ],
}

/* ---------------------------------------------------------------- plans -- */

export type PlanKey = 'free' | 'pro' | 'max'

export const PLANS: { key: PlanKey; name: string; tagline: string; icon: IconName; recommended?: boolean }[] = [
  { key: 'free', name: 'Free', tagline: 'Get a taste', icon: 'star' },
  { key: 'pro', name: 'Pro', tagline: 'For regular practice', icon: 'workspace_premium' },
  { key: 'max', name: 'Max', tagline: 'Everything, without a limit', icon: 'crown', recommended: true },
]

/** The app's own plan cards, verbatim (upgrade.tsx:79-118). The Max one is
    drawn in the product bento in place of the old paywall screenshot. */
export const PLAN_CARDS: Record<PlanKey, { features: string[]; cta: string }> = {
  max: {
    features: [
      'Everything in Pro',
      'Real Talk — analyze recordings & chat screenshots, Get Advice',
      'Custom Practice — build her from Instagram',
      'Unlimited conversations',
      'The most capable voice model',
    ],
    cta: 'Choose Max',
  },
  pro: {
    features: [
      'Everything in Free',
      'Practice — live scenes at every venue, Situational Pressure, improv & drills',
      '30 conversations a week',
      'Priority when the app is busy',
    ],
    cta: 'Choose Pro',
  },
  free: {
    features: ['Simulate — the café simulator', 'Learn — every tool', 'Stats & History', '3 conversations a week'],
    cta: 'Stay on Free',
  },
}

export type Row = { label: string; free: string | boolean; pro: string | boolean; max: string | boolean }

/** The app's comparison table, verbatim and in its order (upgrade.tsx:122-134). */
export const ROWS: Row[] = [
  { label: 'Simulate', free: true, pro: true, max: true },
  { label: 'Learn — every tool', free: true, pro: true, max: true },
  { label: 'Stats & History', free: true, pro: true, max: true },
  { label: 'Practice — live scenes at every venue', free: false, pro: true, max: true },
  { label: 'Situational Pressure, improv & drills', free: false, pro: true, max: true },
  { label: 'Custom Practice — build her from Instagram', free: false, pro: false, max: true },
  { label: 'Real Talk — recordings & chat screenshots', free: false, pro: false, max: true },
  { label: 'Get Advice before you walk over', free: false, pro: false, max: true },
  { label: 'Conversations a week', free: '3', pro: '30', max: 'Unlimited' },
  { label: 'Voice model', free: 'Standard', pro: 'Standard', max: 'Most capable' },
  { label: 'Priority when busy', free: false, pro: true, max: true },
]

/** The rows Free does not have. Derived, so the line above the table and the
    highlighted rows can never disagree. */
export const FREE_MISSES = ROWS.filter((r) => r.free === false).map((r) => r.label)

/** "$49" — a figure with its symbol, no period. */
export const price = (key: PlanKey, interval: Interval = DEFAULT_INTERVAL) =>
  key === 'free' ? `${PRICES.symbol}0` : `${PRICES.symbol}${PRICES[key][interval]}`

/** "$49 a week" */
export const priceLine = (key: 'pro' | 'max', interval: Interval) =>
  `${price(key, interval)} a ${interval}`

/* ------------------------------------------------------------------ faq -- */

export const PRICING_FAQ = [
  {
    q: 'How is it billed?',
    a: `Weekly or monthly, by Apple, through your App Store account. Pro is ${priceLine('pro', 'week')} or ${priceLine('pro', 'month')}; Max is ${priceLine('max', 'week')} or ${priceLine('max', 'month')}. Monthly works out up to ${MAX_SAVINGS}% less per week. There is no yearly plan yet.`,
  },
  {
    q: 'How do I cancel?',
    a: 'From your App Store subscriptions, any time. It runs to the end of the week or month you have paid for and then stops. Nothing on our side to contact.',
  },
  {
    q: 'What does unlimited mean on Max?',
    a: 'No weekly cap on conversations. Free is three a week and Pro is thirty; Max has no counter.',
  },
  {
    q: 'Does Free run out?',
    a: 'No. Three conversations a week, Learn, Stats and History, for as long as you like. It is the free tier, not a trial.',
  },
]

/**
 * Plans, prices, and what every Home tile gives you.
 *
 * The single source for the /pricing/ page, the JSON-LD offers, the FAQ
 * answers about cost, and the Real Talk section on the persona pages. Nothing
 * else in the site may carry a price figure; they all read PRICES from here.
 *
 * Where the numbers come from, so they can be re-checked:
 *
 *  - PRICES: the app's Plans screen, apps/mobile/app/upgrade.tsx:62,76,89. The
 *    API's settings.py carries no figures — only the Apple product ids
 *    `…premium.weekly` and `…max.weekly`. Weekly is the only cadence that
 *    exists. There is no monthly and no yearly plan; do not imply one.
 *  - Free / Pro / Max conversation limits: settings.py:98-99 (3 and 30) and
 *    plan_limits.py (max = unlimited).
 *  - The six tiles and their order: apps/mobile/app/index.tsx:26-33, verbatim.
 *  - Real Talk's three tools and their lines: apps/mobile/app/real-talk.tsx:21-43,
 *    verbatim. "2–3 openers" is what the code delivers (get_advice.py:54, cap
 *    at :110); a direction's likelihood is the string "high" or "medium"
 *    (:62,:127), never a percentage; the upload screen says "Charisma grade".
 *  - Audio limits: analyze/index.tsx:138,140 and conversation_analysis.py:42-52.
 *
 * The Practice-on-Pro and Real-Talk-on-Max rows describe the plan matrix the
 * owner has decided on. The app does not gate either yet; the change is
 * scheduled in the app repo and the site says the intended state from now.
 * Recorded in history.md under "Pricing".
 */

import type { IconName } from '@/lib/icons'
import type { RenderName } from '@/lib/renders'

export const PRICES = {
  free: 0,
  pro: 25,
  max: 49,
  currency: 'USD',
  symbol: '$',
  period: 'week',
} as const

export const BILLING_NOTE = 'Billed weekly. Cancel anytime.'

/* ---------------------------------------------------------------- tiles -- */

export type Tile = {
  /** The app's own tile title. */
  title: string
  icon: IconName
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
    body: 'Set up who you are talking to — how open, how guarded, what mood, how they come across — and watch a whole conversation run before you have to say a word. Three runs a week on Free.',
    render: 'setup-blend',
    from: 'free',
  },
  {
    title: 'Practice',
    icon: 'mic',
    body: 'Hold the disc and talk. It answers in real time, in voice, and hesitates and interrupts the way people do. A scene to pick, a hint if you stall, and a Charisma Score with the working shown at the end.',
    render: 'live-session',
    from: 'pro',
  },
  {
    title: 'Learn',
    icon: 'palette',
    body: 'Techniques, one at a time, and something to talk about when the conversation turns to art, music, film, places or people. The observation half of a conversation, which is the half nobody teaches.',
    render: 'home',
    from: 'free',
  },
  {
    title: 'Real Talk',
    icon: 'bolt',
    body: 'Conversations you actually had. Upload a recording and get it graded, describe or dictate one and get it rated, or describe a situation before you walk over and get your openers.',
    from: 'max',
  },
  {
    title: 'Stats',
    icon: 'monitoring',
    body: 'Week against week. Pace, pauses, filler density and the score itself as a trend rather than a feeling, so you can see whether the thing you are working on is moving.',
    render: 'score-screen',
    from: 'free',
  },
  {
    title: 'History',
    icon: 'schedule',
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

export const PLANS: { key: PlanKey; name: string; tagline: string; recommended?: boolean }[] = [
  { key: 'free', name: 'Free', tagline: 'Enough to know whether it works for you.' },
  { key: 'pro', name: 'Pro', tagline: 'Live practice, thirty conversations a week.' },
  { key: 'max', name: 'Max', tagline: 'The whole app, including your real life.', recommended: true },
]

export type Row = { label: string; free: string | boolean; pro: string | boolean; max: string | boolean }

export const ROWS: Row[] = [
  { label: 'Simulate', free: '3 a week', pro: '30 a week', max: 'Unlimited' },
  { label: 'Learn', free: true, pro: true, max: true },
  { label: 'Stats', free: true, pro: true, max: true },
  { label: 'History', free: true, pro: true, max: true },
  { label: 'Practice — live scenarios', free: false, pro: true, max: true },
  { label: 'Real Talk', free: false, pro: false, max: true },
  { label: 'Custom Practice — someone you describe', free: false, pro: false, max: true },
  { label: 'Voice model', free: 'Standard', pro: 'Standard', max: 'Most capable' },
]

/** The rows Free does not have. Derived, so the line above the table and the
    highlighted rows can never disagree. */
export const FREE_MISSES = ROWS.filter((r) => r.free === false).map((r) => r.label)

export const price = (key: PlanKey) =>
  key === 'free' ? `${PRICES.symbol}0` : `${PRICES.symbol}${PRICES[key]}`

/* ------------------------------------------------------------------ faq -- */

export const PRICING_FAQ = [
  {
    q: 'How is it billed?',
    a: `Weekly, by Apple, through your App Store account. Pro is ${price('pro')} a week and Max is ${price('max')}. There is no monthly or yearly plan.`,
  },
  {
    q: 'How do I cancel?',
    a: 'From your App Store subscriptions, any time. It runs to the end of the week you have paid for and then stops. Nothing on our side to contact.',
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

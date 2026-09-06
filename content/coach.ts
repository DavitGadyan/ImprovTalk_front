/**
 * The Coach's own material, distilled for the tips sheet.
 *
 * Three things come from the app rather than from here:
 *
 *  - The **opener strategies** the simulator picks between, in
 *    services/api/app/services/simulator/prompts.py `_OPENER_STRATEGIES`.
 *  - The **exploration angles** it steers a conversation with, from
 *    `_EXPLORATION_ANGLES` in the same file — the app runs the same scene
 *    several times, each from a different stance, to see which lands.
 *  - The **charisma core** in every venue's `frameworks` block: presence,
 *    power, warmth.
 *
 * Two rules govern what crosses over.
 *
 * **No names.** The knowledge base files are titled after the books and people
 * they were distilled from. The distillation is ours; the material is not, and
 * nothing public names a source.
 *
 * **Not everything is publishable.** Two of the eleven opener strategies are
 * withheld-tease patterns built on backhanded compliments. They carry weight 0
 * in the app and fire only when a scenario pins them, and they are not here at
 * all: the site's line is that noticing a no early is the skill, and App Review
 * reads this site.
 */

import type { ColorKey } from '@/content/survey'

/* --------------------------------------------------------------- openers -- */

export type Opener = {
  key: string
  label: string
  how: string
  /** Why this one, for this person. */
  why: string
  /** The failure mode that kills it. */
  kills: string
}

/**
 * One opener per dominant colour. The app weights favour the two lowest-
 * pressure patterns; the mapping below keeps that bias and adds the one that
 * suits how this person already comes across.
 */
export const OPENER: Record<ColorKey, Opener> = {
  red: {
    key: 'minimal_intent',
    label: 'Honest minimal intent',
    how: 'Two sentences, no preamble. “Excuse me. Hi.” then one clean line saying plainly why you came over.',
    why: 'You are direct anyway, and a manufactured excuse from someone visibly direct reads as a tactic. Saying the real reason costs you nothing and is the version of this you can actually deliver.',
    kills: 'Pre-apologising. “I don’t usually do this” once is human; twice is the whole opener gone.',
  },
  blue: {
    key: 'favor_pretext',
    label: 'The small favour',
    how: 'Ask for a tiny thing any stranger could ask another stranger here. “Quick — is that outlet free?” “Do you know if there’s a good one round here?”',
    why: 'It needs no charm and no composed sentence, which is where your four seconds normally go. They become the person helping rather than the person being approached, and you get their reply to think in.',
    kills: 'Leading with a compliment. It turns a question they can answer into a claim they have to receive.',
  },
  yellow: {
    key: 'playful_situational',
    label: 'The situation, with a wry frame',
    how: 'Take the thing you are both already in and put a small turn on it. Not “is that seat free” but “is that seat neutral territory?”',
    why: 'You are already good at this register. The frame gives your energy somewhere to point that is not you, which is what stops it landing as performance.',
    kills: 'Doing two in a row. The frame is an opener, not a persona — the second one asks them to keep up rather than join in.',
  },
  green: {
    key: 'situational',
    label: 'The shared situation',
    how: 'Use the thing happening in front of both of you, plainly. The queue, the weather, the dog, the wait.',
    why: 'It requires no rush and no claim, and it is the one opener that works at your natural pace rather than against it.',
    kills: 'Waiting for the perfect version. The situational opener expires — it is only true while you are both still in the situation.',
  },
}

/**
 * The openers above are for approaching a stranger. That is the wrong task for
 * the work family — nobody opens a leadership review with a favour — so those
 * goals get the equivalent move for a room you are already in: lead with the
 * answer, then the reasoning.
 */
const WORK_OPENER: Record<ColorKey, Pick<Opener, 'why' | 'kills'>> = {
  red: {
    why: 'You already lead with the answer. Your version of this is what comes after it — one sentence of reasoning, not four, and then a stop.',
    kills: 'Speeding up. Under pressure you compress the gaps rather than the content, and the room stops following.',
  },
  blue: {
    why: 'Your content is right and the run-up is what loses the room. The answer first feels abrupt to you and reads as clarity to everyone else.',
    kills: 'Building the case before the conclusion. By the time you land it, they have stopped following the thread.',
  },
  yellow: {
    why: 'You have the energy; what you lose is the thread. Leading with the answer gives everything after it a spine to hang on.',
    kills: 'Three openings. Pick the answer and commit — a second run at it reads as not knowing which one you meant.',
  },
  green: {
    why: 'You are measured and easy to talk over. Putting the answer first means the point is already made if someone cuts across you.',
    kills: 'Waiting for a gap. The gap is not coming; the answer has to go in before you feel invited.',
  },
}

const WORK_BASE = {
  key: 'answer_first',
  label: 'Answer first, then the reasoning',
  how: 'Say the conclusion in one sentence, then the two lines of why. A lot of filler is throat-clearing before the actual answer — the run-up is where the room is lost.',
} as const

const WORK_ANGLE: Angle = {
  key: 'sincere_direct',
  label: 'Fewer, weightier lines',
  how: 'Trade breadth for depth. Say the real thing plainly and let it sit rather than covering more ground.',
  watch: 'A pause after a hard sentence is not an invitation to soften it. Let them answer it.',
}

/** Work goals get the room-you-are-already-in version. */
export function openerFor(goal: string, color: ColorKey): Opener {
  if (goal !== 'practice') return OPENER[color]
  return { ...WORK_BASE, ...WORK_OPENER[color] }
}

export function angleFor(goal: string, color: ColorKey): Angle {
  return goal === 'practice' ? WORK_ANGLE : ANGLE[color]
}

/* ---------------------------------------------------------------- angles -- */

export type Angle = { key: string; label: string; how: string; watch: string }

/** From `_EXPLORATION_ANGLES` — how the whole conversation is steered after the opener. */
export const ANGLE: Record<ColorKey, Angle> = {
  red: {
    key: 'confident_read',
    label: 'Lead with a read',
    how: 'Say the assumption out loud — “you strike me as someone who…” — and let them confirm or correct it. Being wrong is fine; the correction is the gift.',
    watch: 'Assert, then listen. A read followed by another read is an interrogation with better manners.',
  },
  blue: {
    key: 'curiosity_first',
    label: 'Follow one thread',
    how: 'Take one concrete thing they actually said and build everything off it before you reveal much about yourself. Assume nothing; let them hand you the thread.',
    watch: 'This is your strength and your trap. Three follow-ups in a row with nothing of yours in between reads as an interview.',
  },
  yellow: {
    key: 'playful_challenge',
    label: 'Light challenge',
    how: 'Small teases and dares that bait a question back. A question back is the strongest warmth signal there is.',
    watch: 'If a tease does not land, drop it warmly and move. Doubling down is the only way this one goes badly.',
  },
  green: {
    key: 'shared_moment',
    label: 'Make it “we”',
    how: 'Anchor on what you are both physically in right now and make them a co-conspirator in it — this place, this queue, this weather — before anything is about them.',
    watch: 'At some point you have to make it about them. The shared moment opens the door; it does not walk through it.',
  },
}

/* ------------------------------------------------------------ the basics -- */

/** The `charisma_core` block every venue carries. */
export const CORE: readonly (readonly [string, string])[] = [
  ['Presence', 'Full attention on the moment. No checking your phone, no rehearsing your next line while they are still talking.'],
  ['Power', 'Calm assertiveness, not bravado. Steady voice, unhurried words, and the sense that nothing they say is going to break you.'],
  ['Warmth', 'A genuine signal that you are glad they exist. Soft eye contact, real curiosity, nothing transactional.'],
]

/** The `stage_flow` block: who you are at which point in the conversation. */
export const FLOW: readonly (readonly [string, string])[] = [
  ['Turns 1–3 · open it', 'You do the work. A valid reason to speak, the tone set, made easy for them.'],
  ['Turns 5–9 · listen', 'Shift to questions and let them talk roughly twice as much as you.'],
  ['After that · decide', 'Either it is alive and you say so, or it is not and you leave warmly. Both are outcomes.'],
]

/**
 * Four of the sixteen field principles, chosen by dominant colour. Rewritten
 * to be about a conversation between two adults rather than about pursuit.
 */
export const PRINCIPLES: Record<ColorKey, readonly (readonly [string, string])[]> = {
  red: [
    ['Let the silence sit', 'The pause after you speak is not yours to fill. It is where they join in.'],
    ['Slow down to be heard', 'Calm, slow speech reads as certainty. Speeding up under pressure reads as the opposite and is what you will do by default.'],
    ['Ask without over-qualifying', 'One clean ask. Every softening clause you add takes weight out of it.'],
    ['Leave cleanly', 'A no you take well costs you thirty seconds. A no you argue with costs you the room.'],
  ],
  blue: [
    ['Mix statements with questions', 'Question after question is an interview. Give them something of yours to react to.'],
    ['Make the ask before you are ready', 'The moment the conversation is alive is the moment. Certainty arrives later than the window closes.'],
    ['Let the silence sit', 'You will read a pause as failure. It is thinking time, and it is usually theirs.'],
    ['A small honest admission earns more than a good line', 'Saying you are bad at this is disarming in a way no prepared sentence is.'],
  ],
  yellow: [
    ['Let the silence sit', 'Your instinct is to fill it. The silence is the invitation, and filling it takes the invitation back.'],
    ['Do not react to tests', 'A flat or sceptical response early is usually a test of whether you need them to like you. Stay level.'],
    ['Compliment a choice, never a body', 'What they picked — the drink, the book, where they sat. A choice is something a person can talk about.'],
    ['Calibrate eye contact', 'Hold it while they speak, break it while you think. Unbroken is intensity, not warmth.'],
  ],
  green: [
    ['Make the ask while it is alive', 'You will wait for a better moment. The better moment is a worse moment that has cooled.'],
    ['Ask without over-qualifying', 'Your instinct is to give them an exit inside the question. Give the question, then the exit.'],
    ['Slow is your advantage', 'Calm, unhurried speech is what most people are trying to learn. Do not trade it for pace.'],
    ['Leave cleanly', 'Reading a no early is the skill. Noticing it and going warmly is not a failure — it is the outcome.'],
  ],
}

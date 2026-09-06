/**
 * The live scenarios, as they exist in the app.
 *
 * Counted from packages/shared/scenarios/*.json in the ImprovTalk repo:
 * **16 files across 11 categories**. Ids, titles, difficulty and tier are
 * copied from those files — a tips sheet that sends someone to a scenario the
 * app does not have is worse than no tips sheet.
 *
 * `drills` is written here; everything else is data. Note that
 * `history.md` records "70 live scenarios / 13 venues" from an earlier count —
 * that does not match this directory today, and the number in this file is the
 * one that was actually counted.
 */

import type { ColorKey, GoalSlug } from '@/content/survey'

export type Scenario = {
  id: string
  title: string
  /** 1 easiest, 3 hardest — the app's own scale. */
  difficulty: 1 | 2 | 3
  tier: 'free' | 'pro'
  /** What it actually makes you practise. */
  drills: string
}

export const SCENARIOS: Record<string, Scenario> = {
  yesand: { id: 'improv.yesand.v1', title: 'Yes, And', difficulty: 1, tier: 'free',
    drills: 'Accepting what you are given and adding to it, instead of pausing to find something better. The single best warm-up in the app.' },
  coach: { id: 'coach.advisor.v1', title: 'Conversation Coach', difficulty: 1, tier: 'free',
    drills: 'Talking through a specific situation with a coach that asks about yours rather than lecturing. Start here if you are not sure what to practise.' },
  questions: { id: 'improv.questions.v1', title: 'Questions Only', difficulty: 2, tier: 'free',
    drills: 'Keeping something running using only questions. Brutal, and it removes the option of a prepared sentence.' },
  random: { id: 'improv.random.v1', title: 'Random Improv', difficulty: 2, tier: 'free',
    drills: 'Being handed something you did not plan for. The closest thing to the moment you actually freeze in.' },
  escalation: { id: 'improv.escalation.v1', title: 'Escalation', difficulty: 2, tier: 'free',
    drills: 'Taking something small and building it. Where a conversation goes after the opener has worked.' },
  status: { id: 'improv.status.v1', title: 'Status Game', difficulty: 3, tier: 'free',
    drills: 'Holding your ground without raising your voice, and giving ground without disappearing.' },
  genre: { id: 'improv.genre.v1', title: 'Genre Switch', difficulty: 2, tier: 'free',
    drills: 'Changing register mid-conversation. Useful when your one mode is not landing.' },
  networking: { id: 'networking.event.v1', title: 'Networking at an Event', difficulty: 1, tier: 'free',
    drills: 'The first thirty seconds with a stranger who has somewhere else to be. The exact window nobody rehearses.' },
  story: { id: 'storytelling.anecdote.v1', title: 'Tell Me a Story', difficulty: 2, tier: 'free',
    drills: 'Getting to the point of an anecdote before the room loses it. Structure, not charm.' },
  rejection: { id: 'rejection.recovery.v1', title: 'Rejection Catch', difficulty: 3, tier: 'free',
    drills: 'Telling a soft excuse from a hard one, and leaving warmly on either. This is the one the product is built around.' },
  interview: { id: 'interview.behavioral.v1', title: 'Behavioral Interview', difficulty: 2, tier: 'free',
    drills: 'Answering out loud, with the answer first and the run-up removed. One performance, no retake.' },
  explain: { id: 'explain.clearly.v1', title: 'Explain Anything Clearly', difficulty: 2, tier: 'free',
    drills: 'Making the point land before the room stops following. Pace and structure, measured from the audio.' },
  feedback: { id: 'tough.feedback.v1', title: 'Tough Conversation: Delivering Feedback', difficulty: 3, tier: 'pro',
    drills: 'Saying the difficult sentence plainly, once, and then waiting. Rehearse it the night before, not in the meeting.' },
  debate: { id: 'debate.light.v1', title: 'Light Debate', difficulty: 3, tier: 'pro',
    drills: 'Disagreeing without it going cold. Being listened to without getting louder.' },
  language: { id: 'tutor.language.v1', title: 'Language Tutor', difficulty: 1, tier: 'free',
    drills: 'Speaking in your weaker language with a partner that stays in it when you stall. The reps you cannot get anywhere else.' },
  baseline: { id: 'onboarding.baseline.v1', title: 'Baseline Assessment', difficulty: 1, tier: 'free',
    drills: 'Two minutes that give you a number to measure the next six weeks against.' },
}

/**
 * Three scenarios per goal, in the order to do them: a warm-up that cannot go
 * badly, the one that is actually the problem, and one to stretch into.
 */
const PLAN: Record<Exclude<GoalSlug, 'other'>, readonly [string, string, string]> = {
  shyness: ['yesand', 'random', 'questions'],
  language: ['language', 'yesand', 'story'],
  socialising: ['networking', 'random', 'escalation'],
  dating: ['yesand', 'coach', 'rejection'],
  practice: ['interview', 'explain', 'feedback'],
  reset: ['yesand', 'networking', 'story'],
}

/**
 * Colour changes the third pick — the stretch — because what is hard differs
 * inside a goal. A steady person's stretch is being heard; an expressive one's
 * is structure.
 */
const STRETCH: Record<ColorKey, string> = {
  red: 'questions',
  blue: 'random',
  yellow: 'story',
  green: 'status',
}

export type PlanStep = { scenario: Scenario; role: string }

export function planFor(goal: Exclude<GoalSlug, 'other'>, top: ColorKey): PlanStep[] {
  const [warm, core, stretch] = PLAN[goal]
  /* Never repeat one inside a plan — the colour stretch gives way if the goal
     already uses it. */
  const third = STRETCH[top] === warm || STRETCH[top] === core ? stretch : STRETCH[top]
  return [
    { scenario: SCENARIOS[warm]!, role: 'Warm up' },
    { scenario: SCENARIOS[core]!, role: 'The actual problem' },
    { scenario: SCENARIOS[third]!, role: 'Stretch into' },
  ]
}

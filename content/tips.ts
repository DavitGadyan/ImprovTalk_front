/**
 * The tips each survey respondent receives, rendered into a personalised PDF
 * at `lib/tips-pdf.ts` the moment they submit.
 *
 * This repo deleted an email capture form precisely because collecting data on
 * a promise to follow up is a promise nobody keeps (`f3cffb5`). The exchange
 * has to complete in the same session, so the file is generated in the browser
 * from the answers already in memory.
 *
 * The moves come from the method the simulator's *suitor* agent is instructed
 * with, assembled from the knowledge base in
 * packages/shared/pickup_simulator/knowledge_base/. Sources are not named, here
 * or anywhere public — the distillation is ours; the material is not.
 */

import type { ColorKey, GoalSlug } from '@/content/survey'

export type Tips = {
  slug: Exclude<GoalSlug, 'other'>
  hue: string
  title: string
  who: string
  situation: string
  moves: readonly (readonly [string, string])[]
  first: string
  scenario: string
}

export const TIPS: Tips[] = [
  {
    slug: 'shyness',
    hue: '#ff2d55',
    title: 'When you freeze',
    who: 'For: overcoming shyness',
    situation:
      'You are not short of things to say. You are short of time to say them in — and the words arrive an hour later because your attention was doing two jobs at once.',
    moves: [
      ['Ask instead of answer', 'A question costs almost nothing to produce and buys you the length of their reply to think. This is not a trick to seem interested; it genuinely offloads the work while the conversation keeps moving.'],
      ['Say the smaller true thing', 'Most blanks happen while searching for an impressive answer. “I have no idea, actually” is instantly available, completely true, and keeps you in the conversation — which is the only thing that matters in that second.'],
      ['Carry three shapes, not three lines', 'Not sentences to deliver — shapes to fill: ask what made them choose it, say what you noticed, say the honest small reaction. Rehearsed lines fail because the situation never matches. Shapes always fit.'],
      ['Practise the landing', 'Say something, then close your mouth completely. The silence is shorter than it feels and it is where the other person joins in. This is the hardest of the four and the one that changes most.'],
    ],
    first:
      'Say one opener out loud twenty times, changing one word each time. The twentieth is no braver than the first. It is more practised, and from the outside those look the same.',
    scenario:
      'Start in the café scene. Short window, low stakes, and the one most like the situations you actually freeze in.',
  },
  {
    slug: 'language',
    hue: '#0a84ff',
    title: 'Fluent on paper',
    who: 'For: speaking a second language',
    situation:
      'You do not have a vocabulary problem and you know it. What you have never had is a single hour of low-stakes speaking, because every app teaches words and leaves you to find the reps yourself.',
    moves: [
      ['Start before you have the whole sentence', 'Fluent second-language speakers begin talking and steer mid-sentence. Waiting for a complete, correct sentence before opening your mouth is the single biggest source of delay.'],
      ['Learn the stalling phrases first', 'Every language has its version of “how do I put this”. They buy you two seconds and they sound native — a far better use of a memorised phrase than another vocabulary list.'],
      ['Say the same thing five ways', 'Take one idea and say it simply, then formally, then casually. This builds the paraphrase reflex, which is what actually rescues you when a word will not come.'],
      ['Do not let anyone rescue you', 'The moment you hesitate, a kind bilingual person switches to English to help. Those four seconds of struggle were the rep. Ask people to stay in the language; most are relieved to be told.'],
    ],
    first:
      'Accept a worse sentence. A small vocabulary is not what produces the three-word answer. Rejecting the imperfect sentence you already had at second two is.',
    scenario:
      'Pick your weaker language and start in the Barcelona café. The partner stays in the language you chose even when you stall, which is the entire point.',
  },
  {
    slug: 'socialising',
    hue: '#ff9f0a',
    title: 'The first thirty seconds',
    who: 'For: meeting people and socialising',
    situation:
      'You are fine once a conversation is running. The opening is the part that ends you, and it is the one part nobody ever practises.',
    moves: [
      ['Borrow the situation, or go direct', 'Either use the thing you are both already in, or say plainly that you noticed them and came over. Both work. A direct approach disguised as an accident does not — they watched you cross the room.'],
      ['Notice one public thing', 'Comment on something they chose: the book, the drink, where they sat. Not their body, not anything they are visibly managing. One observation, one open question, then stop.'],
      ['Read the window', 'A queue is thirty seconds. A gym is twenty. A beach is unlimited. Misjudging the window is a bigger mistake than picking the wrong opener.'],
      ['Practise the exit', 'Nobody rehearses this and it matters more than the opener. Say you should let them get on, name one specific thing you took from the conversation, and go.'],
    ],
    first:
      'Rehearse the first minute, not the first line. The line is four seconds; the minute is where it actually goes wrong.',
    scenario:
      'Start at the beach or the festival — unlimited window, so you can practise the middle without the clock.',
  },
  {
    slug: 'dating',
    hue: '#ff6482',
    title: 'The middle of the conversation',
    who: 'For: dating and relationships',
    situation:
      'You can usually manage the parts either side. It is the middle — the stretch where it has to actually go somewhere — that is the problem, and where most advice stops being useful.',
    moves: [
      ['Notice one thing they chose', 'Not how they look. What they picked: the drink, the book, where they sat, what they laughed at. A choice is something a person can talk about; an appearance is something they have to receive.'],
      ['Ask, then stop talking', 'The pause after your question is not a gap to fill. It is the invitation. Filling it is the single most common way a good opening turns into a monologue.'],
      ['Read the window, and read the no', 'Shorter answers, a body angled away, a phone back out. Noticing early and leaving warmly costs you a few seconds. Missing it, or pushing through it, is the one behaviour that makes you a problem rather than a person who was not their type.'],
      ['Practise the middle, not the opener', 'You have rehearsed the first line a hundred times in your head. Rehearse minute four — the stretch where the novelty is gone and you have to be interested in someone.'],
    ],
    first:
      'Have one conversation where your only goal is that they talk more than you. It will feel like doing nothing, and it is the fastest thing you can change.',
    scenario:
      'Start in the café. In the app the partner can be guarded, uninterested, or done — a soft no and a hard no are scored outcomes, not failures. Noticing one early scores better than talking through it.',
  },
  {
    slug: 'practice',
    hue: '#30d158',
    title: 'Being heard',
    who: 'For: speaking up at work',
    situation:
      'Nobody at work will ever tell you how you sound. It is too small to raise and too awkward to mention, so the feedback never arrives and nothing changes on its own.',
    moves: [
      ['Answer the question first', 'A lot of filler is throat-clearing before the actual answer. Starting with the answer removes the run-up, and the run-up is where you lose the room.'],
      ['Breathe in the pause', 'An inhale occupies the same slot the filler wanted and is inaudible. It is the easiest substitution to install because it is physical rather than mental.'],
      ['Count, do not guess', '“Seven ums in three minutes” is something you can work on. “Be more confident” is not. Filler density per hundred words and words per minute are both measurable from a recording.'],
      ['Rehearse the hard one', 'Difficult feedback, a disagreement, the explanation that never lands. Practise it the night before, out loud, rather than in the meeting.'],
    ],
    first:
      'Record two minutes and count your fillers. Not to feel bad — to get a baseline. Almost nobody knows their own number, and the number is what makes the next fortnight measurable.',
    scenario:
      'Start with the interview or hard-feedback drill. Your pace, pauses and filler count come out of the audio itself, not out of an impression of how you sounded.',
  },
  {
    slug: 'reset',
    hue: '#bf5af2',
    title: 'Getting it back',
    who: 'For: getting back after a break',
    situation:
      'Nothing changed about you. Only how often you get to practise. This is not a skill to pick up again. It is a habit that needs using.',
    moves: [
      ['Warm up before you go out', 'Two goes before you leave the house, so the first real conversation of the evening is not also the cold one. This is the highest-value single change on the list.'],
      ['Three minutes beats one big night', 'A short go every day rebuilds the habit faster than one hard evening a fortnight, and costs far less to keep doing.'],
      ['Start small and specific', 'One café conversation, not a party. The thing that used to be automatic comes back in the low-stakes version first.'],
      ['Watch the trend, not the session', 'Any single conversation is noisy. Week six against week one is a number you can look at instead of a feeling you have to trust.'],
    ],
    first:
      'Do it twice before you next go anywhere. Most of what feels lost is warm-up, not learning, and warm-up returns within a few goes.',
    scenario:
      'Start in the café or the gym. Nothing exotic — the point is the repetition, not the setting.',
  },
]

export const tipsFor = (slug: Exclude<GoalSlug, 'other'>) =>
  TIPS.find((t) => t.slug === slug)!

/**
 * One extra line in the PDF, chosen by the dominant colour: what this style
 * costs them specifically, and the one adjustment that follows from it. The
 * four moves are the same for everyone with the same goal; this is the part
 * that is theirs.
 */
export const COLOR_NOTE: Record<ColorKey, string> = {
  red: 'Because you are direct, your risk is pace: you get to the point, then keep going, and under pressure you speed up. Of the four moves, install the pause first — it will feel like dead air and will not sound like it.',
  blue: 'Because you are analytical, your risk is latency: the sentence you were drafting was better than the one that would have worked. Take the worse sentence at second two.',
  yellow: 'Because you are expressive, your risk is that you fill the space the other person needed. Your energy is not the problem and it is rarely the missing ingredient. Ask, then count to three before you rescue the silence.',
  green: 'Because you are steady, your risk is that you wait. You are easy to talk to and easy to talk over, and you rarely say the thing that moves it on. Say the thing a beat earlier than feels polite.',
}

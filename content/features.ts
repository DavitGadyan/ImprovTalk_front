/**
 * Feature copy. Drawn from the shipped app's own screens and strings so the
 * site describes what actually exists, not an aspirational version of it.
 */

export const howItWorks = [
  {
    step: '01',
    title: 'Pick a scene',
    body: 'A café, a queue at the airport, a networking room. Set who you are talking to — their mood, how guarded they are, how much they give you back.',
  },
  {
    step: '02',
    title: 'Talk out loud',
    body: 'Hold the button and speak. It answers in real time, in voice, and it interrupts and hesitates the way people do. Ask for a hint mid-scene if you stall.',
  },
  {
    step: '03',
    title: 'Get scored',
    body: 'A Charisma Score with the working shown, the moments that landed, the ones that did not, and a better line for each.',
  },
] as const

/** Solo drills — the real scenario ids from apps/mobile/app/drills.tsx. */
export const drills = [
  { id: 'interview.behavioral', name: 'Behavioural interview', note: 'Tell me about a time you…' },
  { id: 'networking.event', name: 'Networking room', note: 'Enter, open, exit gracefully' },
  { id: 'storytelling.anecdote', name: 'Storytelling', note: 'Land an anecdote without rambling' },
  { id: 'tough.feedback', name: 'Tough feedback', note: 'Say the hard thing, keep the person' },
  { id: 'debate.light', name: 'Light debate', note: 'Disagree without it going cold' },
  { id: 'explain.clearly', name: 'Explain clearly', note: 'Make the complicated thing land' },
  { id: 'rejection.recovery', name: 'Rejection recovery', note: 'Take the no, keep your footing' },
  { id: 'improv.yesand', name: 'Yes, and', note: 'Build instead of blocking' },
] as const

/** Voice & delivery meters, from apps/mobile/app/score-result.tsx. */
export const deliveryMeters = [
  { name: 'Depth', note: 'low, resonant', value: 78 },
  { name: 'Intonation', note: 'expressive', value: 64 },
  { name: 'Pace', note: 'calm, even', value: 86 },
  { name: 'Pauses', note: 'composed', value: 71 },
  { name: 'Fewer fillers', note: '7 in 3 minutes', value: 52 },
  { name: 'Steady volume', note: 'no fade-out', value: 80 },
] as const

/** The three pillars and their real weights from services/api/app/services/rubric.py */
export const pillars = [
  { name: 'Fluency', weight: 0.4, value: 82, hue: 'var(--color-accent)' },
  { name: 'Confidence', weight: 0.35, value: 74, hue: 'var(--color-practice)' },
  { name: 'Improvisation', weight: 0.25, value: 69, hue: 'var(--color-simulate)' },
] as const

export const venues = [
  'Café', 'Coffee shop', 'Street', 'Beach', 'Gym', 'Bar', 'University', 'Park',
  'Mall', 'Grocery', 'Festival', 'Airport', 'Trail', 'Zoo', 'Aquarium',
  'Swimming pool', 'On the clock', 'Free improv',
] as const

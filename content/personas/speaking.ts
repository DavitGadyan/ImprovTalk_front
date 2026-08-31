import type { Persona } from './types'

/**
 * Freezing in meetings, rambling, losing the room. The delivery metrics — pace,
 * pauses, filler count — are more literally useful to this reader than to any
 * other, so `scoring` moves near the front instead of sitting fourth.
 */
export const speaking: Persona = {
  slug: 'speaking',
  path: '/speaking-up/',
  meta: {
    title: 'ImprovTalk — practise speaking up and being clear',
    description:
      'Rambling, filler words, losing the room. Practise out loud on your phone and get the actual measurements — pace, pauses, fillers — not a vague opinion.',
  },
  hero: {
    eyebrow: 'Say it clearly',
    headline: { top: 'You had the point.', bottom: 'It came out ', emphasis: 'wrong.' },
    sub: 'Practise out loud and get the measurements back: your pace, your pauses, your fillers.',
    note: 'Free to start. No card.',
  },
  problem: {
    label: 'Why it feels hard',
    title: 'Nobody tells you how you sound.',
    intro: 'Colleagues are too polite, and recordings of yourself are unbearable.',
    points: [
      { title: 'You speed up when nervous', body: 'And the room stops following about thirty seconds in.' },
      { title: 'You fill the gaps', body: 'Um, so, basically. You do not hear it. Everyone else does.' },
      { title: 'And you get no feedback', body: 'The meeting ends, nobody mentions it, and nothing changes.' },
    ],
  },
  learnable: {
    label: 'It gets easier',
    title: 'Delivery is trainable.',
    intro: 'Not charisma. Pace, pauses and filler words — three habits that respond quickly to practice.',
    points: [
      { title: 'Rehearse the hard conversation', body: 'Tough feedback, a disagreement, explaining something complicated. Before you have to do it.' },
      { title: 'Nobody is watching', body: 'Be unclear in private, twenty times, until it comes out straight.' },
      { title: 'Hear the habit', body: 'Seven fillers in three minutes is a number you can do something about.' },
      { title: 'Whenever suits you', body: 'The night before the meeting, not in the meeting.' },
    ],
  },
  how: {
    label: 'How it works',
    title: 'Three minutes, start to finish.',
    steps: [
      { title: 'Pick a situation', body: 'A behavioural interview, a networking room, giving tough feedback.' },
      { title: 'Talk out loud', body: 'Hold the button and speak. It answers back and pushes where a person would.' },
      { title: 'See the numbers', body: 'Pace, pauses, fillers, and a clearer version of the thing you fumbled.' },
    ],
  },
  scoring: {
    label: 'It shows its working',
    title: '"Seven fillers in three minutes."',
    intro: 'Not a mark out of ten. The measurements, taken from the recording, with the target range next to them.',
    proof: 'Keep going and the numbers move.',
  },
  inside: {
    label: 'What you get',
    title: 'The situations that come up.',
    intro: 'Interviews, networking, tough feedback, explaining something complicated.',
  },
  faq: [
    { q: 'Do I have to speak out loud?', a: 'Yes — that is the point. Delivery cannot be practised silently. There is no typing mode.' },
    { q: 'What does it actually measure?', a: 'Pace in words per minute, pause length, filler count, pitch and volume steadiness — all from acoustic analysis of the recording, with target ranges shown.' },
    { q: 'Is the feedback just an opinion?', a: 'The delivery half is measurement, not opinion. Every score opens up to show its inputs, so you can disagree on the evidence.' },
    { q: 'What happens to my recordings?', a: 'It uploads only when you end a session, and is deleted 24 hours after scoring. No contacts, calendar, photos or location, and no ad SDKs.' },
    { q: 'What does it cost?', a: 'Free to start — three conversations a week. Paid tiers raise that. Final pricing at launch.' },
    { q: 'When can I get it?', a: 'It is in TestFlight beta on iPhone now. Tap Get early access and it takes you straight there.' },
  ],
  /* Scoring is the hook for this reader, so it comes before the depth pitch. */
  order: ['problem', 'learnable', 'scoring', 'how', 'inside', 'faq'],
}

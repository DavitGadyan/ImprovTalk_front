import type { Persona } from './types'

/**
 * Out of practice — a move, a break-up, years of remote work.
 *
 * This reader is not a beginner and should not be addressed as one. Reassurance
 * leads, the problem section is gentler, and the framing throughout is "it comes
 * back" rather than "you can learn it".
 */
export const rusty: Persona = {
  slug: 'rusty',
  path: '/out-of-practice/',
  meta: {
    title: 'ImprovTalk — get back in practice at talking to people',
    description:
      'You used to be fine at this. Small talk is a skill that fades without use and comes back with practice. Rehearse on your phone, in private.',
  },
  hero: {
    eyebrow: 'Get back in practice',
    headline: { top: 'You used to be', bottom: 'fine at ', emphasis: 'this.' },
    sub: 'Talking to people is a skill, and skills fade without use. A few sessions and it comes back faster than you would expect.',
    note: 'Free to start. No card.',
  },
  problem: {
    label: 'What happened',
    title: 'It went quiet, and the habit went with it.',
    intro: 'Not a personality change. Just a long stretch without the reps.',
    points: [
      { title: 'The circle got smaller', body: 'A move, a break-up, years of working from home. Fewer conversations, without deciding to have fewer.' },
      { title: 'So it feels effortful', body: 'The thing that used to be automatic now takes visible work.' },
      { title: 'And you notice yourself trying', body: 'Which is the part that makes it awkward.' },
    ],
  },
  learnable: {
    label: 'It comes back',
    title: 'This is rust, not damage.',
    intro: 'You have done this before. It needs use, not repair.',
    points: [
      { title: 'Start somewhere low-stakes', body: 'Your phone, your room. No one to explain yourself to afterwards.' },
      { title: 'A few minutes at a time', body: 'Three minutes a day does more than one difficult evening out.' },
      { title: 'Warm up before you go', body: 'Two rounds beforehand, so the first real conversation is not the cold one.' },
      { title: 'See it coming back', body: 'The score is the same each time, so improvement is visible rather than a feeling.' },
    ],
  },
  how: {
    label: 'How it works',
    title: 'Three minutes, start to finish.',
    steps: [
      { title: 'Pick a place', body: 'A café queue, a gym, a party.' },
      { title: 'Talk out loud', body: 'Hold the button and speak. She answers back, in real time.' },
      { title: 'See what landed', body: 'A score, the moments that worked, and a better line for the ones that did not.' },
    ],
  },
  scoring: {
    label: 'It shows its working',
    title: 'Proof it is coming back.',
    intro: 'The same measurements every session, so the difference between week one and week six is a number rather than a feeling.',
    proof: 'Six weeks and the line moves.',
  },
  inside: {
    label: 'What you get',
    title: 'Enough to keep going.',
    intro: 'Not a demo you finish in a weekend.',
  },
  faq: [
    { q: 'Do I have to speak out loud?', a: 'Yes — that is the point. You hold a button and talk, and it talks back. There is no typing mode.' },
    { q: 'How long until it feels normal again?', a: 'Most of it is warming up rather than learning. The score is calculated the same way every session, so you can see the trend rather than guess at it.' },
    { q: 'Is the feedback just an opinion?', a: 'Half of it is measurement. Pace, pauses, fillers and volume come from the recording, and every score opens up to show its numbers.' },
    { q: 'What happens to my recordings?', a: 'It uploads only when you end a session, and is deleted 24 hours after scoring. No contacts, calendar, photos or location, and no ad SDKs.' },
    { q: 'What does it cost?', a: 'Free to start — three conversations a week. Paid tiers raise that. Final pricing at launch.' },
    { q: 'When can I get it?', a: 'It is in TestFlight beta on iPhone now. Tap Get early access and it takes you straight there.' },
  ],
  /* Reassurance first — this reader does not need the problem explained. */
  order: ['learnable', 'problem', 'how', 'scoring', 'inside', 'faq'],
}

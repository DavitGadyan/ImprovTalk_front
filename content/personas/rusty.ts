import type { Persona } from './types'

/**
 * Out of practice. This reader is not a beginner and must not be addressed as
 * one — reassurance leads, and the framing is "it comes back", not "you can
 * learn it".
 */
export const rusty: Persona = {
  slug: 'rusty',
  path: '/out-of-practice/',
  meta: {
    title: 'Get back in practice at talking to people',
    description:
      'Out of practice at talking to people? It is a habit, and habits come back with use. Practise on your phone, in private, a few minutes at a time.',
  },
  nav: 'Getting back in practice',
  hero: {
    eyebrow: 'Get back in practice',
    headline: { top: 'Like riding', bottom: 'a ', emphasis: 'bike.' },
    sub: 'You used to be fine at this. A few short goes and most of it comes back.',
    note: 'Free to start. No card.',
  },
  problem: {
    label: 'What happened',
    title: 'It went quiet.',
    intro: 'Nothing changed about you. You just stopped getting the practice.',
    points: [
      { title: 'The circle got smaller', body: 'A move, a break-up, working from home. Fewer chats, without choosing it.' },
      { title: 'So it takes effort', body: 'The thing that used to be automatic now needs thinking about.' },
      { title: 'And you notice', body: 'Which is the bit that makes it feel awkward.' },
    ],
  },
  learnable: {
    label: 'The good news',
    title: 'It comes back quickly.',
    intro: 'You have done this before. It needs using, not fixing.',
    points: [
      { title: 'Start small', body: 'Your phone, your room. Nobody to explain yourself to afterwards.' },
      { title: 'A few minutes', body: 'Three minutes a day beats one hard night out.' },
      { title: 'Warm up first', body: 'Two goes before you head out, so the first real chat is not the cold one.' },
      { title: 'Watch it come back', body: 'Same score every time, so you can see it move instead of guessing.' },
    ],
  },
  how: {
    label: 'How it works',
    title: 'Three minutes.',
    steps: [
      { title: 'Pick a place', body: 'A café, a gym, a party.' },
      { title: 'Talk', body: 'Hold the button and speak. She answers straight away.' },
      { title: 'See your score', body: 'What worked, what did not, and what to say instead.' },
    ],
  },
  scoring: {
    label: 'Your score',
    title: 'Proof it is coming back.',
    intro: 'The same score every session, so week six against week one is a number, not a feeling.',
    proof: 'Six weeks and the line moves.',
  },
  inside: {
    label: 'What you get',
    title: 'Plenty to practise with.',
    intro: 'You will not run out.',
  },
  faq: [
    { q: 'Do I have to talk out loud?', a: 'Yes. You hold a button and speak, and she speaks back. There is no typing.' },
    { q: 'How long until it feels normal?', a: 'Most of it is warming up, not learning. The score works the same way every time, so you can watch the trend instead of guessing.' },
    { q: 'Is it just a guess?', a: 'No. Your speed, pauses and filler words are measured from the recording. Tap any score to see the numbers.' },
    { q: 'What happens to my recordings?', a: 'Your voice is used to score the session and nothing else. Transcripts and scores stay until you delete them, and deleting your account removes them. No contacts, photos or location. No ads.' },
    { q: 'What does it cost?', a: 'Free to start — three conversations a week. Paid plans give you more.' },
    { q: 'How do I get it?', a: 'It is on TestFlight for iPhone. Tap Get early access and it takes you there.' },
  ],
  order: ['learnable', 'problem', 'how', 'scoring', 'inside', 'faq'],
}

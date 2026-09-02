import type { Persona } from './types'

/**
 * Meeting people. Kept PG-13 and consent-aware, matching the app's own
 * guardrails: she has agency and declines pushy behaviour. This site is linked
 * from the app, and App Review reads it.
 */
export const social: Persona = {
  slug: 'social',
  path: '/meeting-people/',
  meta: {
    title: 'Practise starting a conversation with a stranger',
    description:
      'The first line is the hard part. Practise how to start a conversation with a stranger on your phone, as often as you like, before it counts.',
  },
  hero: {
    eyebrow: 'Practise the first line',
    headline: { top: 'Break the ice.', bottom: 'Practise ', emphasis: 'first.' },
    sub: 'Try the first minute on your phone, twenty times if you want, before it counts.',
    note: 'Free to start. No card.',
  },
  problem: {
    label: 'The problem',
    title: 'You get one go.',
    intro: 'No second try, and nobody explains what happened.',
    points: [
      { title: 'You think too long', body: 'By the time you have a line, the moment has gone.' },
      { title: 'It comes out flat', body: 'You say it, it lands badly, and you think about it all evening.' },
      { title: 'You learn nothing', body: 'You never find out which bit was the problem. So you do it again.' },
    ],
  },
  learnable: {
    label: 'The good news',
    title: 'You can practise this.',
    intro: 'It is a first minute you have never rehearsed, not a personality you were not born with.',
    points: [
      { title: 'Nobody is watching', body: 'Your phone, your room. No stranger, no friend asking how it went.' },
      { title: 'She can say no', body: 'Sometimes she is not interested. It never tells you to push. Spotting that is the skill.' },
      { title: 'Try again and again', body: 'Say the same opener twenty times and hear what changes.' },
      { title: 'Warm up first', body: 'Two goes before you head out, so the first real person is not the practice.' },
    ],
  },
  how: {
    label: 'How it works',
    title: 'Pick a place. Start talking.',
    steps: [
      { title: 'Pick a place', body: 'A café, a beach, a gym, a festival.' },
      { title: 'Talk', body: 'Hold the button and speak. She answers, and she can be cool about it.' },
      { title: 'See your score', body: 'What worked, what did not, and what to say instead.' },
    ],
  },
  scoring: {
    label: 'Your score',
    title: 'It tells you what went wrong.',
    intro: 'Not a verdict on you. Your speed, your pauses, and the moment it turned.',
    proof: 'Keep practising and the score goes up.',
  },
  inside: {
    label: 'What you get',
    title: 'Somewhere new every time.',
    intro: 'Enough places and people that it never becomes one memorised script.',
  },
  faq: [
    { q: 'Do I have to talk out loud?', a: 'Yes. You hold a button and speak, and she speaks back. There is no typing.' },
    { q: 'Is she always friendly?', a: 'No. You choose how open she is, and sometimes she is not interested. It never tells you to push — noticing is the skill.' },
    { q: 'Is it just a guess?', a: 'No. Your speed, pauses and filler words are measured from the recording. Tap any score to see the numbers.' },
    { q: 'What happens to my recordings?', a: 'Your voice is used to score the session and nothing else. Transcripts and scores stay until you delete them, and deleting your account removes them. No contacts, photos or location. No ads.' },
    { q: 'What does it cost?', a: 'Free to start — three conversations a week. Paid plans give you more.' },
    { q: 'How do I get it?', a: 'It is on TestFlight for iPhone. Tap Get early access and it takes you there.' },
  ],
  order: ['problem', 'how', 'learnable', 'inside', 'scoring', 'faq'],
}

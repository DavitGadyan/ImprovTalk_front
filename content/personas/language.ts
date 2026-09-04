import type { Persona } from './types'

/** Fluent on paper, stuck out loud. The language picker leads. */
export const language: Persona = {
  slug: 'language',
  path: '/second-language/',
  meta: {
    title: 'Practise speaking English, Spanish or Russian',
    description:
      'Reading is the easy part. Practise speaking English, Spanish or Russian out loud with an AI that will not switch back to English when you stall.',
  },
  nav: 'A second language',
  hero: {
    eyebrow: 'Speak, do not translate',
    headline: { top: 'Keep calm', bottom: 'and ', emphasis: 'talk.' },
    sub: 'English, Spanish or Russian. Practise out loud, as often as you like.',
    note: 'Free to start. No card.',
  },
  problem: {
    label: 'The problem',
    title: 'You know the words.',
    intro: 'Saying them fast enough is the hard part.',
    points: [
      { title: 'You translate first', body: 'By the time the sentence is ready, they have moved on.' },
      { title: 'So you keep it short', body: 'You answer in three words to be safe. You sound like less than you are.' },
      { title: 'So you talk less', body: 'Less talking means less practice. The next one is harder.' },
    ],
  },
  learnable: {
    label: 'Practise in the language',
    title: 'English, Spanish or Russian.',
    intro: 'Pick one. She answers only in that language, and so does your score.',
    points: [
      { title: 'She stays in your language', body: 'She will not switch to English to help you. That is the point.' },
      { title: 'Take your time', body: 'Think for ten seconds. She does not mind and she is not being polite.' },
      { title: 'Get it wrong as often as you like', body: 'Say the same thing twenty times. Nobody is counting your mistakes.' },
      { title: 'Your score in that language too', body: 'What worked, what did not, and a better way to say it.' },
    ],
  },
  how: {
    label: 'How it works',
    title: 'Three minutes.',
    steps: [
      { title: 'Pick a language and a place', body: 'A café in Barcelona, a beach, a gym.' },
      { title: 'Talk', body: 'Hold the button and speak. She answers in that language.' },
      { title: 'See your score', body: 'Your speed, your pauses, and a better way to say it.' },
    ],
  },
  scoring: {
    label: 'Your score',
    title: 'Where you slowed down.',
    intro: 'It shows your speed and your pauses, so you can see the bits you got stuck on.',
    proof: 'Keep practising and the pauses get shorter.',
  },
  inside: {
    label: 'What you get',
    title: 'Plenty to talk about.',
    intro: 'In all three languages.',
  },
  faq: [
    { q: 'Which languages?', a: 'English, Spanish and Russian. You pick before you start. The app menus are in English.' },
    { q: 'Do I have to talk out loud?', a: 'Yes. Reading and writing are the parts you can already do. There is no typing.' },
    { q: 'Will it fix my grammar?', a: 'It tells you what worked and gives you a better way to say it. Your speed and pauses are measured from the recording.' },
    { q: 'What happens to my recordings?', a: 'Your voice is used to score the session and nothing else. Transcripts and scores stay until you delete them, and deleting your account removes them. No contacts, photos or location. No ads.' },
    { q: 'What does it cost?', a: 'Free to start — three conversations a week. Paid plans give you more.' },
    { q: 'How do I get it?', a: 'It is on TestFlight for iPhone. Tap Get early access and it takes you there.' },
  ],
  order: ['learnable', 'problem', 'how', 'scoring', 'inside', 'faq'],
}

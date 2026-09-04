import type { Persona } from './types'

/**
 * The default. Plain words on purpose: this reader is often self-conscious about
 * conversation, and clever phrasing reads as someone performing at them.
 */
export const shy: Persona = {
  slug: 'shy',
  path: '/',
  meta: {
    title: 'Practise talking to people out loud',
    description:
      'Practise real conversations out loud on your phone. Nobody hears you, you can try as often as you like, and it tells you what went wrong when you freeze.',
  },
  nav: 'Feeling shy',
  hero: {
    eyebrow: 'Practise out loud',
    headline: { top: 'Practice makes', bottom: '', emphasis: 'perfect.' },
    sub: 'Talk to an AI on your phone. Nobody hears you. Try as often as you like.',
    note: 'Free to start. No card.',
  },
  problem: {
    label: 'The problem',
    title: 'You freeze.',
    intro: 'And the right words turn up an hour later.',
    points: [
      { title: 'You plan it in your head', body: 'Where it always goes well.' },
      { title: 'Real life is faster', body: 'They say something you did not expect, and you go blank.' },
      { title: 'Nobody tells you why', body: 'The chat dies. You never find out what you did wrong.' },
    ],
  },
  learnable: {
    label: 'The good news',
    title: 'Anyone can get better at this.',
    intro: 'You just need practice — a lot of it, somewhere safe.',
    points: [
      { title: 'Nobody is watching', body: 'It is your phone, in your room. You are allowed to be bad at it.' },
      { title: 'Any time you want', body: 'After work. Late at night. You do not have to go out.' },
      { title: 'Try again and again', body: 'Say the same opener twenty times. Real life gives you one go.' },
      { title: 'Three languages', body: 'English, Spanish or Russian. She answers in the one you pick.' },
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
    title: 'It tells you what went wrong.',
    intro: 'Not just a number. It shows you the reason.',
    proof: 'Keep practising and the score goes up.',
  },
  inside: {
    label: 'What you get',
    title: 'Plenty to practise with.',
    intro: 'You will not run out.',
  },
  faq: [
    { q: 'Do I have to talk out loud?', a: 'Yes. You hold a button and speak, and it speaks back. There is no typing.' },
    { q: 'What is the score?', a: 'How well you spoke — fluency, confidence and improvising — and how you sounded saying it. Your pace, pauses and filler words are measured from the recording itself.' },
    { q: 'Is it just a guess?', a: 'No. Your speed, pauses and filler words are measured from the recording. Tap any score to see the numbers.' },
    { q: 'What happens to my recordings?', a: 'Your voice is used to score the session and nothing else. Transcripts and scores stay until you delete them, and deleting your account removes them. No contacts, photos or location. No ads.' },
    { q: 'What does it cost?', a: 'Free to start — three conversations a week. Paid plans give you more.' },
    { q: 'How do I get it?', a: 'It is on TestFlight for iPhone. Tap Get early access and it takes you there.' },
  ],
  order: ['problem', 'learnable', 'how', 'scoring', 'inside', 'faq'],
}

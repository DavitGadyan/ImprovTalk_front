import type { Persona } from './types'

/**
 * Fluent on paper, blank out loud. The language picker is the answer to this
 * reader's problem, so `learnable` leads and carries it — sitting sixth in a
 * list of features would bury the one thing they came for.
 */
export const language: Persona = {
  slug: 'language',
  path: '/second-language/',
  meta: {
    title: 'ImprovTalk — practise speaking a second language out loud',
    description:
      'You can read it and write it. Speaking is the part that needs practice. Talk to an AI partner in English, Spanish or Russian and get told what to fix.',
  },
  hero: {
    eyebrow: 'Speak, do not translate',
    headline: { top: 'You can read it.', bottom: 'Speaking is ', emphasis: 'harder.' },
    sub: 'Practise out loud in English, Spanish or Russian, with someone who never gets bored.',
    note: 'Free to start. No card.',
  },
  problem: {
    label: 'Why it feels hard',
    title: 'The words will not come out.',
    intro: 'You understand every word they said. Answering is the problem.',
    points: [
      { title: 'You translate first', body: 'By the time the sentence is ready, the moment has gone.' },
      { title: 'So you keep it short', body: 'You answer in three words to be safe, and sound like less than you are.' },
      { title: 'And you avoid it', body: 'Fewer conversations means less practice, which makes the next one harder.' },
    ],
  },
  learnable: {
    label: 'Practise in the language',
    title: 'English, Spanish or Russian.',
    intro: 'Pick one before you start. She replies only in that language, and so does your feedback.',
    points: [
      { title: 'She stays in your language', body: 'No switching to English to help you. You have to find the words, which is the whole exercise.' },
      { title: 'Nobody is waiting on you', body: 'Take ten seconds to answer. She is not impatient and she is not being polite about it.' },
      { title: 'Say it wrong as often as you like', body: 'Run the same conversation twenty times. Nobody is counting your mistakes.' },
      { title: 'Feedback in that language too', body: 'What worked, what did not, and a better line — written in the language you are practising.' },
    ],
  },
  how: {
    label: 'How it works',
    title: 'Three minutes, start to finish.',
    steps: [
      { title: 'Pick a language and a place', body: 'A café queue in Barcelona, a beach, a gym.' },
      { title: 'Talk out loud', body: 'Hold the button and speak. She answers in real time, in that language.' },
      { title: 'See what landed', body: 'Your pace, your pauses, and a better way to say the thing you struggled with.' },
    ],
  },
  scoring: {
    label: 'It shows its working',
    title: 'Where you slowed down.',
    intro: 'Not a mark out of ten. The measurements — pace, pauses, filler words — so you can see the hesitation you felt.',
    proof: 'Keep going and the pauses get shorter.',
  },
  inside: {
    label: 'What you get',
    title: 'Enough to keep going.',
    intro: 'Three languages, and plenty to talk about in all of them.',
  },
  faq: [
    { q: 'Which languages can I practise in?', a: 'English, Spanish and Russian. You pick before each session and she replies only in that language. The app interface itself is in English.' },
    { q: 'Do I have to speak out loud?', a: 'Yes — that is the point. Reading and writing are the parts you can already do. There is no typing mode.' },
    { q: 'Will it correct my grammar?', a: 'It tells you what landed and what did not, and gives you a better line. The delivery side — pace, pauses, filler words — is measured from the recording.' },
    { q: 'What happens to my recordings?', a: 'It uploads only when you end a session, and is deleted 24 hours after scoring. No contacts, calendar, photos or location, and no ad SDKs.' },
    { q: 'What does it cost?', a: 'Free to start — three conversations a week. Paid tiers raise that. Final pricing at launch.' },
    { q: 'When can I get it?', a: 'It is in TestFlight beta on iPhone now. Tap Get early access and it takes you straight there.' },
  ],
  /* Reassurance before the problem: this reader already knows the problem. */
  order: ['learnable', 'problem', 'how', 'scoring', 'inside', 'faq'],
}

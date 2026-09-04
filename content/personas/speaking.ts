import type { Persona } from './types'

/** Rambling, filler words, losing the room. The measurements lead. */
export const speaking: Persona = {
  slug: 'speaking',
  path: '/speaking-up/',
  meta: {
    title: 'Practise speaking clearly and stop saying um',
    description:
      'Talking too fast, saying um, losing the room. Practise out loud and get real numbers: your words per minute, your pauses, your filler count.',
  },
  nav: 'Speaking up at work',
  hero: {
    eyebrow: 'Say it clearly',
    headline: { top: 'Say what', bottom: 'you ', emphasis: 'mean.' },
    sub: 'Practise the hard conversation on your phone first, and see how you actually sound.',
    note: 'Free to start. No card.',
  },
  problem: {
    label: 'The problem',
    title: 'Nobody tells you how you sound.',
    intro: 'Colleagues are too polite, and you hate hearing yourself back.',
    points: [
      { title: 'You speed up', body: 'When you are nervous you talk faster, and the room stops following.' },
      { title: 'You fill the gaps', body: 'Um, so, basically. You do not hear it. Everyone else does.' },
      { title: 'Nothing changes', body: 'The meeting ends, nobody says anything, and you do it again next week.' },
    ],
  },
  learnable: {
    label: 'The good news',
    title: 'This is easy to fix.',
    intro: 'Speed, pauses and filler words. Three habits, and they change fast with practice.',
    points: [
      { title: 'Practise the hard one', body: 'Difficult feedback, a disagreement, explaining something tricky. Before you have to do it.' },
      { title: 'Nobody is watching', body: 'Be unclear in private, twenty times, until it comes out straight.' },
      { title: 'Hear the habit', body: '"Seven ums in three minutes" is something you can actually work on.' },
      { title: 'The night before', body: 'Practise before the meeting, not in it.' },
    ],
  },
  how: {
    label: 'How it works',
    title: 'Three minutes.',
    steps: [
      { title: 'Pick a situation', body: 'A job interview, a networking room, giving hard feedback.' },
      { title: 'Talk', body: 'Hold the button and speak. It answers back and pushes, like a person would.' },
      { title: 'See the numbers', body: 'Your speed, your pauses, your ums, and a clearer way to say it.' },
    ],
  },
  scoring: {
    label: 'Your score',
    title: '"Seven ums in three minutes."',
    intro: 'Not a mark out of ten. Real numbers from the recording, with the right range next to them.',
    proof: 'Keep practising and the numbers move.',
  },
  inside: {
    label: 'What you get',
    title: 'The situations that come up.',
    intro: 'Interviews, networking, hard feedback, explaining something tricky.',
  },
  faq: [
    { q: 'Do I have to talk out loud?', a: 'Yes. You cannot practise how you sound in your head. There is no typing.' },
    { q: 'What does it measure?', a: 'Your speed in words per minute, how long you pause, how often you say um, and how steady your voice is — all from the recording.' },
    { q: 'Is it just a guess?', a: 'No. The delivery half is measured, not guessed. Tap any score to see the numbers behind it.' },
    { q: 'What happens to my recordings?', a: 'Your voice is used to score the session and nothing else. Transcripts and scores stay until you delete them, and deleting your account removes them. No contacts, photos or location. No ads.' },
    { q: 'What does it cost?', a: 'Free to start — three conversations a week. Paid plans give you more.' },
    { q: 'How do I get it?', a: 'It is on TestFlight for iPhone. Tap Get early access and it takes you there.' },
  ],
  order: ['problem', 'learnable', 'scoring', 'how', 'inside', 'faq'],
}

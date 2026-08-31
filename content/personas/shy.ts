import type { Persona } from './types'

/** The default. Broadest pain, and the one the canonical URL renders. */
export const shy: Persona = {
  slug: 'shy',
  path: '/',
  meta: {
    title: 'ImprovTalk — practise conversation out loud',
    description:
      'Good conversation is a skill, not a gift. Practise it out loud on your phone, in private, and get told what actually went wrong.',
  },
  hero: {
    eyebrow: 'Practise out loud',
    headline: { top: 'Good conversation is', bottom: 'a skill. Not a ', emphasis: 'gift.' },
    sub: 'You can practise it the way you would practise anything else — out loud, in private, as many times as you like.',
    note: 'Free to start. No card.',
  },
  problem: {
    label: 'Why it feels hard',
    title: 'You know what to say. Just not in the moment.',
    intro: 'The right line turns up an hour later, in the shower.',
    points: [
      { title: 'You plan it in your head', body: 'Where you are articulate and nobody interrupts.' },
      { title: 'Then it happens live', body: 'They answer sideways, and you hear yourself say "so, yeah".' },
      { title: 'And nothing tells you why', body: 'It goes flat. No replay, nothing to work on.' },
    ],
  },
  learnable: {
    label: 'It gets easier',
    title: 'Nobody is born good at this.',
    intro: 'It is a skill. Skills need repetition, and repetition needs somewhere safe to be bad.',
    points: [
      { title: 'Nobody is watching', body: 'Your phone, your room. Being bad at it in private is how anyone gets good.' },
      { title: 'Whenever suits you', body: 'After work, late, Sunday morning. You do not have to go out to practise going out.' },
      { title: 'As many tries as you want', body: 'Run the same opening twenty times. Real life gives you one.' },
      { title: 'In your language', body: 'English, Spanish or Russian. She replies in the one you pick.' },
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
    title: 'A number you can argue with.',
    intro: 'Most apps hand you a verdict. This one hands you the evidence.',
    proof: 'Keep going and the line moves.',
  },
  inside: {
    label: 'What you get',
    title: 'Enough to keep going.',
    intro: 'Not a demo you finish in a weekend.',
  },
  faq: [
    { q: 'Do I have to speak out loud?', a: 'Yes — that is the point. You hold a button and talk, and it talks back. There is no typing mode.' },
    { q: 'What does it score?', a: 'Fluency, confidence and improvisation, weighted 40/35/25. Computed from your audio, so the same session always scores the same.' },
    { q: 'Is the feedback just an opinion?', a: 'Half of it is measurement. Pace, pauses, fillers and volume come from the recording, and every score opens up to show its numbers.' },
    { q: 'What happens to my recordings?', a: 'It uploads only when you end a session, and is deleted 24 hours after scoring. No contacts, calendar, photos or location, and no ad SDKs.' },
    { q: 'What does it cost?', a: 'Free to start — three conversations a week. Paid tiers raise that. Final pricing at launch.' },
    { q: 'When can I get it?', a: 'It is in TestFlight beta on iPhone now. Tap Get early access and it takes you straight there.' },
  ],
  order: ['problem', 'learnable', 'how', 'scoring', 'inside', 'faq'],
}

import type { Persona } from './types'

/**
 * Meeting people. The scenario films — a café, a beach, a gym — are the pitch
 * for this reader, so `how` (which carries them) moves up the order.
 *
 * Kept deliberately PG-13 and consent-aware, matching the app's own guardrails:
 * the AI persona has agency and declines pushy behaviour. This site is linked
 * from the app, and App Review reads it.
 */
export const social: Persona = {
  slug: 'social',
  path: '/meeting-people/',
  meta: {
    title: 'ImprovTalk — practise talking to people you have not met',
    description:
      'Starting a conversation with a stranger is a skill you can rehearse. Practise on your phone, in private, and find out what actually landed.',
  },
  hero: {
    eyebrow: 'Practise the first minute',
    headline: { top: 'The hardest part', bottom: 'is the ', emphasis: 'first line.' },
    sub: 'Rehearse the first minute somewhere it costs you nothing — a café queue, a gym.',
    note: 'Free to start. No card.',
  },
  problem: {
    label: 'Why it feels hard',
    title: 'One go, and no replay.',
    intro: 'Real life has no replay and nobody explains what happened.',
    points: [
      { title: 'You think about it too long', body: 'By the time you have the opening line, the moment has passed.' },
      { title: 'Then it comes out flat', body: 'You say the thing, it lands oddly, and you spend the evening replaying it.' },
      { title: 'And you learn nothing', body: 'You never find out which part was the problem, so you repeat it.' },
    ],
  },
  learnable: {
    label: 'It gets easier',
    title: 'This is rehearsable.',
    intro: 'Not a personality you were born without. A first minute you have not practised.',
    points: [
      { title: 'Nobody is watching', body: 'Your phone, your room. No stranger to face, no friend to explain yourself to.' },
      { title: 'She can say no', body: 'Sometimes she is not interested, and the coaching never tells you to push. Reading that is the skill.' },
      { title: 'As many tries as you want', body: 'Run the same opening twenty times and hear what changes.' },
      { title: 'Warm up first', body: 'Two rounds before you go out, so the first real person is not your warm-up.' },
    ],
  },
  how: {
    label: 'How it works',
    title: 'Pick somewhere. Start talking.',
    steps: [
      { title: 'Pick a place', body: 'A café queue, a beach, a gym, a festival.' },
      { title: 'Talk out loud', body: 'Hold the button and speak. She answers in real time, and she can be guarded.' },
      { title: 'See what landed', body: 'What worked, what did not, and a better line for the moment you fumbled.' },
    ],
  },
  scoring: {
    label: 'It shows its working',
    title: 'What actually went wrong.',
    intro: 'Not a verdict on you. The measurements — pace, pauses, filler words — and the moment it turned.',
    proof: 'Keep going and the line moves.',
  },
  inside: {
    label: 'What you get',
    title: 'Somewhere different every time.',
    intro: 'Enough places and people that it never becomes one memorised script.',
  },
  faq: [
    { q: 'Do I have to speak out loud?', a: 'Yes — that is the point. You hold a button and talk, and it talks back. There is no typing mode.' },
    { q: 'Is she always friendly?', a: 'No. You set how open or guarded she is, and sometimes she is not interested. The coaching never tells you to push past that — noticing it is the skill.' },
    { q: 'Is the feedback just an opinion?', a: 'Half of it is measurement. Pace, pauses, fillers and volume come from the recording, and every score opens up to show its numbers.' },
    { q: 'What happens to my recordings?', a: 'It uploads only when you end a session, and is deleted 24 hours after scoring. No contacts, calendar, photos or location, and no ad SDKs.' },
    { q: 'What does it cost?', a: 'Free to start — three conversations a week. Paid tiers raise that. Final pricing at launch.' },
    { q: 'When can I get it?', a: 'It is in TestFlight beta on iPhone now. Tap Get early access and it takes you straight there.' },
  ],
  /* The films are the pitch here, so `how` comes before the reassurance. */
  order: ['problem', 'how', 'learnable', 'inside', 'scoring', 'faq'],
}

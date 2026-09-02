import type { Metadata } from 'next'
import Link from 'next/link'
import { PageShell } from '@/components/ui/page-shell'
import { PostFilm } from '@/components/ui/post-film'
import { allVideosLd, breadcrumbLd, howToLd, pageJsonLd } from '@/lib/jsonld'

const TITLE = 'How to start a conversation: the method in four moves'
const DESCRIPTION =
  'Openers are not lines. There are four moves — borrow the situation or go direct, notice one public thing, guess where they are from, and read the window.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/how-to-start-a-conversation/' },
  openGraph: {
    type: 'article',
    url: '/how-to-start-a-conversation/',
    title: TITLE,
    description: DESCRIPTION,
  },
}

/* Kept in one place so the schema and the headings below cannot drift apart —
   Google drops HowTo markup that does not match what the page visibly says. */
const STEPS = [
  [
    'Borrow the situation, or go direct',
    'Either use the thing you are both already in, or say plainly that you noticed them and came over. Both work. A direct approach disguised as an accident does not, because they watched you cross the room.',
  ],
  [
    'Notice one public thing',
    'Comment on something they chose — the book, the drink, where they sat — then ask an open question about it, then stop talking. Never remark on their body or anything they are visibly managing.',
  ],
  [
    'Guess where they are from',
    'If you can hear an accent, guess one country out loud and greet them in that language. Getting it slightly wrong is part of the move. Never guess from how someone looks.',
  ],
  [
    'Read the window',
    'A queue gives you thirty seconds, a gym twenty, a beach as long as you want. Finish slightly before the window closes so the conversation ends because you ended it.',
  ],
] as const

export default function Page() {
  const ld = pageJsonLd([
    howToLd({
      id: 'how-to-start-a-conversation',
      name: TITLE,
      description: DESCRIPTION,
      steps: STEPS,
    }),
    breadcrumbLd([
      ['Home', '/'],
      ['How to start a conversation', '/how-to-start-a-conversation/'],
    ]),
    ...allVideosLd,
  ])

  return (
    <PageShell
      title="How to start a conversation"
      breadcrumb={[['Home', '/']]}
      intro="People looking for something to say go looking for a line. The line is the wrong unit. What actually happens in a good opening is four moves, and each one is small enough to practise on its own."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />

      <h2>1. Borrow the situation, or go direct</h2>
      <p>
        There are two openings and everything else is a variation on one of them. You
        can use the thing you are both standing in — the queue, the delay, the machine
        neither of you can work — or you can own the fact that you crossed the room.
      </p>
      <p>
        The situational one asks for almost nothing, which is its advantage. If they
        answer flatly and turn away, nothing has happened, because nobody made a bid.
        It has one requirement: it has to be genuinely true and said while the situation
        is still happening. Situational openers expire.
      </p>
      <p>
        The direct one is the harder-feeling and easier-running option. Name that it is
        slightly out of nowhere, say the specific thing you noticed, then stop and let
        the silence be theirs. You have told the truth about an awkward thing before
        they had to wonder about it.
      </p>
      <p>
        What fails is the hybrid — a direct approach wearing a situational costume,
        arriving to ask what time it closes when you walked past three people to get
        there. The pretext does not hide anything. It just adds a small dishonesty the
        conversation then has to climb out of.
      </p>

      <PostFilm slug="coffee-shop" />

      <h2>2. Notice one public thing</h2>
      <p>
        Everyone sees a room. Noticing is narrower: the specific book rather than a
        book, the plain black coffee in a place selling eleven syrups, the seat they
        chose when four were free. Those are decisions, and a decision is a far better
        thing to ask about than an appearance, because the person made it and can tell
        you why.
      </p>
      <p>
        There is a hard line here. Fair game is anything they put into a shared space on
        purpose — what they are reading, a band on a shirt, a sticker on a laptop. Not
        fair game is their body, their face, or anything you inferred about their
        private life. The purpose of observing is to make someone comfortable, not to
        prove you are perceptive. If a remark would make them feel watched rather than
        seen, it has failed however accurate it was.
      </p>
      <p>
        The structure is three beats and people skip the third: the observation, an open
        question about it, and then stop. Do not add a second question or an anecdote to
        cover the pause. The pause is the invitation.
      </p>

      <PostFilm slug="barcelona-beach" />

      <h2>3. Guess where they are from</h2>
      <p>
        If you can hear that English is not someone&rsquo;s first language, guessing the
        country and greeting them in it is one of the warmest openings available. It
        costs a single word, and it hands them something before asking for anything.
      </p>
      <p>
        Getting the pronunciation wrong is not a flaw in the move, it is the move. A
        perfect accent is a party trick; a clumsy attempt is an offer, and it gives them
        something easy to do next, which is to correct you.
      </p>
      <p>
        The rule that decides whether this is charming or awful: <strong>guess from the
        voice, never from the face.</strong> Guessing someone&rsquo;s origin from how
        they look is an experience they have probably already had this week, and warmth
        of delivery does not change what it is. If they say they are from here, they are
        from here, and the conversation moves on.
      </p>

      <PostFilm slug="bali-beach" />

      <h2>4. Read the window</h2>
      <p>
        Every setting gives you a different amount of time, and misjudging it is a
        bigger mistake than picking the wrong opener. A queue is thirty seconds. Between
        sets at a gym is twenty, and you should assume they want to get back to it. A
        beach or a park is effectively unlimited.
      </p>
      <p>
        The skill is not talking for as long as possible. It is finishing slightly
        before the window closes, so the conversation ends because you ended it — which
        is also the only reliable way to leave someone wanting the next one.
      </p>
      <p>
        Nobody practises the exit and it matters more than the opener. Say you should
        let them get on, name one specific thing you took from the conversation, and go.
      </p>

      <PostFilm slug="gym" />

      <h2>And then: how to hear a no</h2>
      <p>
        Most advice about starting conversations quietly assumes they all continue. They
        do not, and the ability to notice a small no early is what keeps you welcome in
        a room rather than remembered badly.
      </p>
      <p>
        A no is usually not a sentence. It is shorter answers, a body angled away, a
        phone that comes back out. Reading it and leaving warmly costs you a few seconds
        and nothing else. Missing it, or treating it as an obstacle to push through, is
        the single behaviour that turns a person who is bad at conversation into a
        person who is a problem.
      </p>
      <p>
        This is worth practising deliberately, because in real life you get very little
        chance to. In ImprovTalk the AI partner can decline, and sometimes does — a soft
        no and a hard no are outcomes the session is scored on, not failure states.
        Noticing one early scores better than talking through it.
      </p>

      <h2>Practising the first thirty seconds</h2>
      <p>
        All four moves are small motor skills. They respond to repetition and they do
        not respond to reading, which is inconvenient, because real conversations are
        terrible practice: one attempt, no feedback, and a full evening of replay
        afterwards.
      </p>
      <p>
        The fix is volume somewhere a bad attempt costs nothing. Say the same opener
        twenty times, change one thing each time, and hear which version sounds like a
        person rather than a script. The twentieth is not braver than the first — it is
        just more practised, and from the outside those look identical.
      </p>
      <p>
        <Link href="/meeting-people/">Practise the first line →</Link>
      </p>
    </PageShell>
  )
}

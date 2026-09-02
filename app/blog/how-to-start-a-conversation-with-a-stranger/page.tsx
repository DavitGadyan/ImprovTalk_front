import type { Metadata } from 'next'
import Link from 'next/link'
import { BlogPost } from '@/components/blog-post'
import { postBySlug } from '@/content/posts'

const post = postBySlug('how-to-start-a-conversation-with-a-stranger')!

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: post.path },
  openGraph: { type: 'article', url: post.path, title: post.title, description: post.description },
}

export default function Page() {
  return (
    <BlogPost post={post}>
      <p>
        There are only two ways to start a conversation with someone you have never
        met. You can borrow the situation you are both already in, or you can own the
        fact that you crossed the room. Everything else is a variation on one of those
        two, and almost every opener that dies does so because it tried to be both.
      </p>

      <h2>The situational opener</h2>
      <p>
        You use the thing you are both standing in. The queue is slow. The train is
        late. The machine is broken and neither of you knows how to fix it. You are
        not pretending to need help, and you are not manufacturing a reason — the
        reason is genuinely there, and you are saying it out loud.
      </p>
      <p>
        This works because it asks for almost nothing. You are two people in the same
        situation making a remark about the situation. If they answer with one word
        and turn away, nothing has happened. Nobody has been rejected, because nobody
        made a bid.
      </p>
      <p>It has one requirement and one failure mode.</p>
      <ul>
        <li>
          <strong>It has to be true.</strong> A shared thing you both noticed works. An
          invented question you obviously know the answer to does not, and people can
          tell instantly.
        </li>
        <li>
          <strong>It has to be inside the window.</strong> Situational openers expire.
          The comment about the queue works while you are in the queue. Thirty seconds
          after you have both been served it is a strange thing to say.
        </li>
      </ul>

      <h2>The direct opener</h2>
      <p>
        The other option is to say what is actually happening: you noticed them, and
        you came over. Not a line, not a pretext. Something closer to{' '}
        <em>&ldquo;I know this is a bit out of nowhere, but I wanted to say hello.&rdquo;</em>
      </p>
      <p>
        People are afraid of this one because it feels exposed, and it is. That is also
        why it works. You have told the truth about an awkward thing before they had to
        wonder about it, which means the rest of the conversation does not have to
        carry the question of what you are doing there.
      </p>
      <p>The direct opener needs three things, in this order:</p>
      <ul>
        <li>
          <strong>Name the situation.</strong> One clause acknowledging that this is
          slightly unusual does most of the work. It signals you are aware, which is
          the difference between confident and oblivious.
        </li>
        <li>
          <strong>Say the specific reason.</strong> Not a compliment about their face.
          Something you actually observed — what they were reading, what they were
          laughing at, what they ordered.
        </li>
        <li>
          <strong>Leave them an exit.</strong> Say your piece and stop. The silence
          after is theirs to fill or not, and letting it sit is the whole test.
        </li>
      </ul>

      <h2>Why mixing them fails</h2>
      <p>
        The most common failed opener is a direct approach wearing a situational
        costume. You crossed a room, walked past three other people, and arrived asking
        whether they know what time it closes.
      </p>
      <p>
        They know. They watched you walk over. The pretext does not hide the intent, it
        just adds a small dishonesty to the first ten seconds, and now the conversation
        has to climb out of that before it can go anywhere. If you have already decided
        to approach, the direct opener is the easier one, because it costs nothing to
        maintain.
      </p>

      <h2>Reading the window</h2>
      <p>
        Every setting gives you a different amount of time, and misjudging it is a
        bigger mistake than choosing the wrong opener. A queue is thirty seconds. A
        beach or a park is effectively unlimited. Between sets at a gym is twenty
        seconds and you should assume they want to get back to it.
      </p>
      <p>
        The skill is not talking for as long as possible. It is finishing slightly
        before the window closes, so the conversation ends because you ended it.
      </p>

      <h2>How to leave</h2>
      <p>
        Nobody practises the exit and it matters more than the opener. Say that you
        should let them get on, say one specific thing you took from the conversation,
        and go. If there is a reason to continue it, that is the moment to say so — but
        the exit works on its own, and a conversation that ends cleanly is a good
        outcome, not a failure.
      </p>

      <h2>Practising the first thirty seconds</h2>
      <p>
        Openers are a small motor skill and they respond to repetition the way any
        small motor skill does. The problem is that real life gives you one attempt,
        no feedback, and a whole evening to think about it afterwards.
      </p>
      <p>
        That is the specific gap worth closing. Say the same opener out loud twenty
        times, change one thing each time, and hear which version sounds like a person
        rather than a script. The twentieth is not braver than the first. It is just
        more practised, and from the outside those two things look identical.
      </p>
      <p>
        Related:{' '}
        <Link href="/blog/what-to-say-to-someone-you-just-met/">
          the observation opener
        </Link>{' '}
        and{' '}
        <Link href="/blog/how-to-break-the-ice/">
          guessing where someone is from
        </Link>
        .
      </p>
    </BlogPost>
  )
}

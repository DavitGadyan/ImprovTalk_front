import type { Metadata } from 'next'
import Link from 'next/link'
import { BlogPost } from '@/components/blog-post'
import { postBySlug } from '@/content/posts'

const post = postBySlug('why-your-mind-goes-blank-in-conversation')!

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
        Someone asks you something ordinary. There is a pause that is slightly too
        long. You produce a short, flat answer that is not what you meant, the
        conversation moves on without you, and four hours later, in bed, the good
        version arrives fully formed.
      </p>
      <p>
        The words were never missing. That is the whole thing worth understanding here,
        because it changes what you should practise.
      </p>

      <h2>It is a speed problem, not a knowledge problem</h2>
      <p>
        At 1am the right answer is available instantly. If the material were genuinely
        absent it would still be absent then. What was missing in the moment was not
        the content but the time to retrieve it, and the reason you did not have time
        is that your attention was doing two jobs at once.
      </p>
      <p>
        One job is composing what to say. The other is monitoring how it is going —
        how you look, whether the pause has gone on too long, whether they are bored,
        what your face is doing. The second job is the expensive one, and it runs on
        the same limited attention the first job needs.
      </p>

      <h2>The monitoring loop is the actual problem</h2>
      <p>
        This is why the standard advice fails. &ldquo;Relax&rdquo; and &ldquo;be
        confident&rdquo; are instructions to feel differently, and you cannot execute
        them, so trying adds a third task to a system that was already at capacity.
      </p>
      <p>
        It is also why the blank gets worse the more it matters. Higher stakes means
        more monitoring, more monitoring means less attention for composing, less
        attention means longer pauses, and longer pauses give the monitor more to report
        on. The loop is self-feeding and it can close in about four seconds.
      </p>

      <h2>Three things that actually reduce the load</h2>
      <p>
        You cannot make yourself care less. You can make the composing job cheaper.
      </p>
      <ul>
        <li>
          <strong>Ask instead of answer.</strong> A question costs almost nothing to
          produce and buys you the length of their reply to think. This is not a trick
          to seem interested — it genuinely offloads the work while the conversation
          keeps moving.
        </li>
        <li>
          <strong>Say the smaller true thing.</strong> Most blanks happen while
          searching for an impressive answer. &ldquo;I have no idea, actually&rdquo; is
          instantly available, completely true, and keeps you in the conversation, which
          is the only thing that matters at that moment.
        </li>
        <li>
          <strong>Have three reusable moves, not scripts.</strong> Not lines to deliver
          — shapes you can fill: ask what made them choose it, say what you noticed, say
          the honest small reaction. Rehearsed lines fail because the situation never
          matches. Shapes always fit.
        </li>
      </ul>

      <h2>Do not prepare lines</h2>
      <p>
        Preparing specific things to say is the most common self-prescribed fix and it
        makes the problem worse, for a reason that is easy to miss. A prepared line
        creates a matching problem: now you are scanning the conversation for the moment
        your line fits, which is a third job, and when it does not fit you have to
        discard it under pressure and start composing anyway.
      </p>
      <p>
        People who are good at this are not carrying better material. They are carrying
        less, so their attention is free.
      </p>

      <h2>What the 1am replay is for</h2>
      <p>
        The replay is not a character flaw, and telling yourself to stop doing it does
        not work either. It is your brain running the retrieval again with the load
        removed, which is why the answer appears so easily.
      </p>
      <p>
        It only becomes useful if you catch what it is telling you. Almost always the
        better version is shorter than what you attempted in the room. That is the
        actual lesson: you were not failing to produce something clever, you were
        failing to produce something small, because you had set the bar somewhere
        unreachable while under load.
      </p>

      <h2>Why reps fix it and reading does not</h2>
      <p>
        Everything above is true and knowing it changes nothing on its own, because the
        monitoring loop is not an idea. It is a habit that runs automatically under mild
        social pressure, and habits only respond to repetition in conditions close
        enough to the real thing.
      </p>
      <p>
        The obstacle is that real conversations are terrible practice. You get one
        attempt, no feedback, and a full evening of replay afterwards — which is a high
        price for a rep and a large part of why people stop seeking them out.
      </p>
      <p>
        What actually moves it is volume in a setting where a bad attempt costs nothing:
        say the thing out loud, notice that the pause did not kill you, and go again. The
        monitoring quietens down not because you talked yourself out of it, but because
        it eventually runs out of evidence.
      </p>
      <p>
        Related:{' '}
        <Link href="/blog/what-to-say-to-someone-you-just-met/">
          the observation opener
        </Link>{' '}
        gives you one of those reusable shapes, and{' '}
        <Link href="/blog/how-to-stop-saying-um/">filler words</Link> are the other half
        of what a pause is doing.
      </p>
    </BlogPost>
  )
}

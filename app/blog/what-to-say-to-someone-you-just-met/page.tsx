import type { Metadata } from 'next'
import Link from 'next/link'
import { BlogPost } from '@/components/blog-post'
import { postBySlug } from '@/content/posts'

const post = postBySlug('what-to-say-to-someone-you-just-met')!

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
        People looking for something to say usually go looking for a line. The line is
        the wrong unit. What actually opens a conversation is one true observation
        about something the other person chose, followed by a question, followed by
        the discipline to stop talking.
      </p>

      <h2>Seeing and noticing are different</h2>
      <p>
        Everyone sees the room. They register that a person is there, roughly what they
        look like, whether anyone is with them. Noticing is narrower and more useful:
        the specific book rather than &ldquo;a book&rdquo;, the fact they ordered plain
        black coffee in a place that sells eleven syrups, the seat they picked when
        four were free.
      </p>
      <p>
        Those are all decisions. A decision is a much better conversational object than
        an appearance, because the person made it and can tell you why.
      </p>

      <h2>Only what is public, and only what they chose</h2>
      <p>
        There is a line here and it is worth being precise about, because the same
        technique sits on both sides of it.
      </p>
      <ul>
        <li>
          <strong>Fair game:</strong> what they are reading, what they ordered, a band
          on their shirt, a sticker on their laptop, the instrument case, where they sat.
          These are things a person put into a shared space on purpose.
        </li>
        <li>
          <strong>Not fair game:</strong> their body, their face, anything they are
          visibly managing, anything you inferred about their private life. Noticing
          those out loud is not observation, it is surveillance with a compliment
          attached.
        </li>
      </ul>
      <p>
        The purpose of observing is to make the other person comfortable, not to
        demonstrate that you are perceptive. If a remark would make them feel watched
        rather than seen, it has failed regardless of how accurate it was.
      </p>

      <h2>The structure</h2>
      <p>Three beats, and the third is the one people skip.</p>
      <ul>
        <li>
          <strong>The observation.</strong> Short, specific, no adjectives doing heavy
          lifting. &ldquo;That is a serious-looking book for a Tuesday morning.&rdquo;
        </li>
        <li>
          <strong>The question.</strong> Open, and about their experience rather than a
          fact. Not &ldquo;is it good&rdquo;, which closes in one word. Something closer
          to &ldquo;what made you pick it up?&rdquo;
        </li>
        <li>
          <strong>Then stop.</strong> Do not add a second question, an anecdote about
          the last book you read, or a nervous joke to cover the pause. The pause is not
          a gap to fill. It is the invitation.
        </li>
      </ul>

      <h2>Do not perform the deduction</h2>
      <p>
        The failure mode of this technique is treating it as a party trick.
        &ldquo;Laptop stickers, that build, those headphones &mdash; you are a
        developer, right?&rdquo; Even when you are correct, and you usually are, you
        have made the conversation about your cleverness and put them in the position
        of confirming or denying a profile.
      </p>
      <p>
        Notice privately. Ask openly. The observation is what makes the question
        specific enough to be interesting; it is not the thing you are showing off.
      </p>

      <h2>Why a question beats a statement</h2>
      <p>
        A statement asks the other person to agree or disagree, and both of those are
        small tasks that end quickly. A question about a choice they made hands them
        the easiest thing in the world to talk about, which is their own reasoning.
      </p>
      <p>
        It also solves the problem people actually have. Most people are not short of
        things to say. They are short of a way to get the other person talking long
        enough that the pressure comes off.
      </p>

      <h2>Joining something already running</h2>
      <p>
        Groups work the same way with one change: you have to listen before you can
        observe. Arrive, stay quiet for a beat, find the thread, and enter on it. The
        mistake is entering with something you brought — a new topic, a joke you had
        ready — which forces four people to abandon what they were doing.
      </p>
      <p>
        Adding one specific sentence to the conversation that already exists is a much
        smaller ask, and it is how you end up part of a group rather than a visitor to it.
      </p>

      <h2>The part that needs practice</h2>
      <p>
        Noticing is trainable and most people improve within a week just by deciding to
        look for choices rather than appearances. The stopping is harder. In a real
        conversation the silence after your question feels roughly three times longer
        than it is, and the reflex to fill it is strong enough to override the plan.
      </p>
      <p>
        That reflex is a physical habit, so it only changes by doing it out loud and
        surviving the pause enough times that it stops feeling like an emergency.
      </p>
      <p>
        Related:{' '}
        <Link href="/blog/how-to-start-a-conversation-with-a-stranger/">
          the excuse or the direct opener
        </Link>{' '}
        and{' '}
        <Link href="/blog/why-your-mind-goes-blank-in-conversation/">
          why you go blank
        </Link>
        .
      </p>
    </BlogPost>
  )
}

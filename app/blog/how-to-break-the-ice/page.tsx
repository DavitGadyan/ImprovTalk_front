import type { Metadata } from 'next'
import Link from 'next/link'
import { BlogPost } from '@/components/blog-post'
import { postBySlug } from '@/content/posts'

const post = postBySlug('how-to-break-the-ice')!

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
        Someone says three words and you hear that English is not their first language.
        You guess the country. You say hello in their language, badly. They laugh and
        correct your pronunciation, and now you are two minutes into a conversation
        that had no reason to start.
      </p>
      <p>
        It is one of the warmest openings there is, and it costs you a single word. It
        also goes wrong in two specific ways, and both are avoidable.
      </p>

      <h2>Why it works</h2>
      <p>
        Most openers ask the other person to do something — answer a question, judge a
        line, decide whether they are interested. This one hands them something first.
        You have made a small effort on their behalf before asking for anything, and
        the effort is visible precisely because you are bad at it.
      </p>
      <p>
        Getting the pronunciation slightly wrong is not a flaw in the move. It is the
        move. A perfect accent would be a party trick. A clumsy attempt is an offer,
        and it gives them something easy to do next: fix you.
      </p>

      <h2>Guess from the voice, never from the face</h2>
      <p>
        This is the part that decides whether the whole thing is charming or awful.
      </p>
      <p>
        Guessing where someone is from based on how they look is a bad experience they
        have probably already had this week, and no amount of warmth in your delivery
        changes what it is. It carries the assumption that they are not from here, and
        people who grew up two streets away get asked it constantly.
      </p>
      <ul>
        <li>
          <strong>Key off the accent, or something they said.</strong> They mentioned a
          city. They used a turn of phrase. You heard the vowels. All of these are
          things they put into the conversation themselves.
        </li>
        <li>
          <strong>If they have no accent, this opener is not available.</strong> That
          is fine. There are others.
        </li>
        <li>
          <strong>Never follow up with &ldquo;but where are you really from&rdquo;.</strong>{' '}
          If they say they are from here, they are from here, and the conversation moves
          on.
        </li>
      </ul>

      <h2>Guess once, out loud, and be wrong well</h2>
      <p>
        Commit to one country. Hedging across a region — &ldquo;somewhere in Eastern
        Europe?&rdquo; — is worse than a confident wrong answer, because it sounds like
        a category rather than a person.
      </p>
      <p>
        Being wrong is not a problem if you are cheerful about it. &ldquo;Portugal?
        &hellip; Brazil. I was one ocean out.&rdquo; You have still done the thing that
        mattered, which is paying attention and taking a small risk in front of them.
      </p>

      <h2>Then the greeting, then stop</h2>
      <p>
        Learn <em>hello</em> and <em>how are you</em> in the language, phonetically, and
        nothing else. Two phrases is a gesture. Five is a demonstration, and the
        difference is whether the conversation is about them or about you.
      </p>
      <p>
        After the greeting, hand it back. Ask something that is about their life rather
        than their nationality — what brought them here, what they miss, what is
        genuinely better here than at home. The country got you in. It is not the
        subject.
      </p>

      <h2>The joke, if there is one</h2>
      <p>
        A light joke about a country&rsquo;s reputation for its own food, weather or
        driving usually lands, because it is aimed at a place rather than a person and
        they have heard it before from people who love it. The test is simple: would
        someone from there tell this joke about themselves? If yes, it is fine. If it
        is about the people rather than the place, leave it.
      </p>

      <h2>When it does not land</h2>
      <p>
        Sometimes you guess, they answer flatly, and nothing opens up. That is a
        complete outcome. Say something warm and let it go — the cost of this opener
        being declined is about four seconds, which is exactly why it is worth using.
      </p>
      <p>
        Reading a polite no early and leaving cleanly is a skill in its own right, and
        it is the one that keeps you welcome in a room. People who cannot hear a small
        no end up getting large ones.
      </p>

      <h2>Practising it</h2>
      <p>
        The awkward part is not the idea, it is the first second of saying a word in a
        language you do not speak, out loud, to a stranger. That is a mouth problem,
        not a knowledge problem, and reading about it will not move it at all.
      </p>
      <p>
        Say the greeting twenty times before you ever need it and it stops being a
        risk. Related:{' '}
        <Link href="/blog/how-to-start-a-conversation-with-a-stranger/">
          the excuse or the direct opener
        </Link>
        , and{' '}
        <Link href="/blog/practise-speaking-a-language-out-loud/">
          practising a language out loud
        </Link>{' '}
        if you are on the other side of this conversation.
      </p>
    </BlogPost>
  )
}

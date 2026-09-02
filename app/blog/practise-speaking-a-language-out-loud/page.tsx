import type { Metadata } from 'next'
import Link from 'next/link'
import { BlogPost } from '@/components/blog-post'
import { postBySlug } from '@/content/posts'

const post = postBySlug('practise-speaking-a-language-out-loud')!

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
        You can read the news in it. You can follow a meeting in it. You have a long
        streak on a vocabulary app and a certificate that says you are somewhere around
        C1. Then somebody asks you a casual question in a lift and you answer in three
        words, because the full sentence needed four more seconds than you had.
      </p>
      <p>
        This is the most common way to be stuck, and it is not a language problem. It is
        a distribution problem: almost everything a language learner can do alone
        happens to be the part that does not fix speaking.
      </p>

      <h2>Why the streak does not transfer</h2>
      <p>
        Reading, listening and vocabulary drills are all recognition tasks. You are
        given the word and you confirm you know it. They are also self-paced — you can
        stop, reread, and take as long as you like.
      </p>
      <p>Speaking is neither.</p>
      <ul>
        <li>
          <strong>It is production, not recognition.</strong> Nobody hands you the word.
          You have to retrieve it from nothing, which is a different and much slower
          operation.
        </li>
        <li>
          <strong>It is externally paced.</strong> The other person keeps moving. A
          sentence that arrives correct but six seconds late has already failed.
        </li>
        <li>
          <strong>It is physical.</strong> Your mouth has to make sounds it has not
          practised. Knowing how a word is pronounced and having said it a hundred times
          are stored in different places.
        </li>
      </ul>
      <p>
        Volume on the first kind of task builds almost nothing on the second. That is
        why people arrive at 400 days of study genuinely surprised to still be answering
        in three words.
      </p>

      <h2>What partly works, and what does not</h2>
      <p>
        <strong>Talking to yourself</strong> helps the mouth and nothing else. There is
        no unpredictability, so the retrieval never happens under load — you are
        narrating, not conversing.
      </p>
      <p>
        <strong>Shadowing</strong> — repeating a recording as it plays — is genuinely
        good for pronunciation and rhythm, and does nothing for retrieval, because the
        words are supplied.
      </p>
      <p>
        <strong>Language exchange</strong> is the real thing and it is the hardest to
        get enough of. It needs scheduling, another human&rsquo;s patience, and a
        tolerance for being the less fluent person for an hour. Most people manage it
        once a fortnight, which is roughly a tenth of what would move anything.
      </p>

      <h2>The rule that matters most</h2>
      <p>
        Whoever or whatever you practise with must not rescue you.
      </p>
      <p>
        The moment you hesitate, a kind bilingual person will switch to your stronger
        language to help. It is generous and it removes the entire benefit, because the
        four seconds of struggle you just skipped were the rep. If you never sit inside
        that gap, the gap never gets shorter.
      </p>
      <p>
        If you are practising with a person, tell them explicitly: stay in the language
        even when I stall. Most people are relieved to be told, because they were
        switching out of politeness and could not tell whether it was helping.
      </p>

      <h2>Practise the gap, not the vocabulary</h2>
      <p>
        The specific thing to train is the pause between being asked and starting to
        answer. Some concrete ways to attack it:
      </p>
      <ul>
        <li>
          <strong>Start before you have the whole sentence.</strong> Fluent second-language
          speakers begin talking and steer mid-sentence. Waiting for a complete, correct
          sentence before opening your mouth is the single biggest source of delay.
        </li>
        <li>
          <strong>Learn the stalling phrases first.</strong> Every language has its
          version of &ldquo;how do I put this&rdquo;. They buy you two seconds and they
          sound native, which is a much better use of a memorised phrase than a
          vocabulary list.
        </li>
        <li>
          <strong>Say the same thing five ways.</strong> Take one idea and express it
          simply, then formally, then casually. This builds the paraphrase reflex, which
          is what actually rescues you when a word will not come.
        </li>
        <li>
          <strong>Accept a worse sentence.</strong> The three-word answer is not caused
          by a small vocabulary. It is caused by rejecting the imperfect sentence you had
          at second two.
        </li>
      </ul>

      <h2>Getting the volume up</h2>
      <p>
        Everything above needs one thing you cannot get from an app that teaches words:
        unscripted turns, at conversational speed, with something that answers back and
        does not switch languages when you stall.
      </p>
      <p>
        ImprovTalk runs conversations in English, Spanish and Russian — you pick the
        language before you start, and the reply comes back in it. Your pace and your
        pauses are measured from the recording, so the gap you are trying to close is a
        number you can watch rather than a feeling. The app&rsquo;s own menus are in
        English; it is the conversation that changes.
      </p>
      <p>
        Related:{' '}
        <Link href="/blog/how-to-break-the-ice/">
          guessing where someone is from
        </Link>{' '}
        — the same move from the other side — and{' '}
        <Link href="/blog/why-your-mind-goes-blank-in-conversation/">
          why you go blank
        </Link>
        , which is the same mechanism in your first language.
      </p>
    </BlogPost>
  )
}

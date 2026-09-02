import type { Metadata } from 'next'
import Link from 'next/link'
import { BlogPost } from '@/components/blog-post'
import { postBySlug } from '@/content/posts'

const post = postBySlug('how-to-stop-saying-um')!

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
        Nobody at work will tell you. It is too small to raise and too awkward to bring
        up, so the feedback never arrives, and the first time most people hear their own
        filler words is on a recording that makes them wince.
      </p>
      <p>
        The good news is that this is the most fixable thing about how anyone speaks. It
        is a single mechanical habit, it responds quickly, and unlike most communication
        advice you can actually count it.
      </p>

      <h2>What a filler actually is</h2>
      <p>
        &ldquo;Um&rdquo; is not a word you chose. It is a sound your mouth makes to hold
        the floor while your brain finishes finding the next phrase. That is the entire
        mechanism, and it explains everything else about the habit.
      </p>
      <p>
        It explains why you say it more when the stakes are high — retrieval is slower
        under pressure, so there is more gap to fill. It explains why you cannot hear
        yourself doing it: you were busy composing, which is exactly what the filler was
        buying time for. And it explains why deciding to stop does not work. You cannot
        decide your way out of a reflex that fires in the 200 milliseconds before you
        notice it.
      </p>

      <h2>The trade you are actually making</h2>
      <p>
        You cannot delete the gap. You need it — that is real processing time. What you
        can change is what goes into it.
      </p>
      <p>
        A filled pause and a silent pause do the same job for you and completely
        different jobs for the listener. Filled reads as uncertainty. Silent reads as
        deliberate, and to a listener it sounds like someone choosing their words.
      </p>
      <p>
        So the target is not fewer pauses. It is the same pauses, empty. That
        reframing matters, because people who try to eliminate the pause instead speed
        up, and speeding up produces more fillers, not fewer.
      </p>

      <h2>Why it feels impossible at first</h2>
      <p>
        Silence is much shorter than it feels from inside. A pause of about a second is
        completely normal to a listener and feels close to unbearable to the speaker.
      </p>
      <p>
        That mismatch is the whole difficulty. You are not failing to be silent. You are
        correctly executing an urgent instinct to end a silence that only you find
        alarming. It stops being alarming after you have sat through enough of them and
        nothing bad has happened.
      </p>

      <h2>Count density, not incidents</h2>
      <p>
        &ldquo;I say um a lot&rdquo; is not a workable target. Fillers per hundred words
        is, because it is comparable across a two-minute answer and a twenty-minute
        presentation, and it moves visibly week to week.
      </p>
      <p>
        It is also worth knowing that the category is wider than &ldquo;um&rdquo; and
        &ldquo;uh&rdquo;. The ones that do most of the damage are the ones that sound
        like real speech: <em>like</em>, <em>you know</em>, <em>I mean</em>,{' '}
        <em>sort of</em>, <em>kind of</em>, <em>basically</em>, <em>literally</em>,{' '}
        <em>actually</em>, <em>right</em>. Several of those are legitimate words in other
        contexts, which is why counting them by hand is unreliable and why density across
        a whole conversation is a better signal than any single instance.
      </p>

      <h2>Pace is the other half</h2>
      <p>
        Filler rate and speaking rate move together. Somewhere around 110 to 165 words a
        minute is the band that reads as composed; above it, retrieval falls behind
        production and the gaps you are filling multiply.
      </p>
      <p>
        In practice, slowing down is often the more effective intervention, because it
        addresses the cause rather than the symptom. People who set out to fix their
        pace usually fix their fillers on the way without targeting them at all.
      </p>

      <h2>What actually works</h2>
      <ul>
        <li>
          <strong>Practise the landing, not the sentence.</strong> Say something, then
          close your mouth completely. Most fillers happen at the end of a thought, in
          the gap before the next one, not in the middle.
        </li>
        <li>
          <strong>Breathe in the pause.</strong> An inhale occupies the same slot the
          filler wanted and is inaudible. It is the easiest substitution to install
          because it is physical rather than mental.
        </li>
        <li>
          <strong>Answer the question first.</strong> A lot of filler is throat-clearing
          before the actual answer. Starting with the answer removes the run-up.
        </li>
        <li>
          <strong>Record two minutes and count.</strong> Not to feel bad — to get a
          baseline. Almost nobody knows their own number, and the number is what makes
          the next two weeks measurable.
        </li>
      </ul>

      <h2>Getting a number without recording yourself every day</h2>
      <p>
        The counting is the tedious part, and it is the part that decides whether this
        turns into a habit change or another thing you meant to work on.
      </p>
      <p>
        ImprovTalk measures it from the recording — filler density per hundred words,
        your words per minute, how long your pauses actually run, and how steady your
        volume stays. Those come out of the audio itself rather than a model&rsquo;s
        impression of how you sounded, so &ldquo;seven in three minutes, down from
        eleven&rdquo; is a real comparison rather than an encouraging one.
      </p>
      <p>
        Related:{' '}
        <Link href="/blog/why-your-mind-goes-blank-in-conversation/">
          why you go blank
        </Link>{' '}
        — the same retrieval delay, one step earlier.
      </p>
    </BlogPost>
  )
}

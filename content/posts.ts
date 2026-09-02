/**
 * Blog metadata.
 *
 * Metadata only — the prose lives in each route file, the same way the legal and
 * support pages are written, so a post can use real links and lists instead of
 * being flattened into a string array. This registry is what the index page,
 * sitemap.ts and the JSON-LD all read, so those three can never disagree about
 * what exists.
 *
 * Every post targets one query and links to the persona page written for the same
 * reader. That pairing is the point: four persona pages that only ever competed
 * with the homepage now each have a post pointing at them with matching intent.
 */
export type Post = {
  slug: string
  /** Trailing slash, matching the export's trailingSlash: true. */
  path: string
  title: string
  /** Meta description. Kept under 160 characters. */
  description: string
  /** Shown on the index. One sentence, and not a repeat of the description. */
  excerpt: string
  /** ISO date, for BlogPosting and the visible byline. */
  date: string
  /** The query this post is written for. Not rendered — it keeps us honest. */
  query: string
  /** Persona page this post links to. */
  personaPath: string
  personaLabel: string
  /** Scenario film embedded in the post body, if any. */
  film?: string
  /** Card artwork. Every post has one — a wall of text is what a dull blog is. */
  image: string
  /** Short label, and the accent it borrows from the app's own palette. */
  category: string
  hue: string
  /** Measured from the built page at 200 wpm, not guessed. */
  minutes: number
}

const DATE = '2026-09-02'

export const posts: Post[] = [
  {
    slug: 'how-to-start-a-conversation-with-a-stranger',
    path: '/blog/how-to-start-a-conversation-with-a-stranger/',
    title: 'The excuse, or straight in: two ways to open',
    description:
      'There are only two openings that work on a stranger — borrow the situation, or own the fact you crossed the room. Mixing them is what fails.',
    excerpt:
      'Every opener is one of two things. Knowing which one you are doing is most of the job.',
    date: DATE,
    query: 'how to start a conversation with a stranger',
    personaPath: '/meeting-people/',
    personaLabel: 'Practise the first line',
    image: '/scenarios/coffee-shop-alt.jpg',
    category: 'Openers',
    hue: 'var(--color-practice)',
    minutes: 4,
    film: 'coffee-shop',
  },
  {
    slug: 'how-to-break-the-ice',
    path: '/blog/how-to-break-the-ice/',
    title: 'Guess where they are from, then say hello in their language',
    description:
      'One of the warmest openings there is: notice an accent, guess the country, greet them in their own language. Here is how to do it without it landing badly.',
    excerpt:
      'It costs you one word and it almost always works. It can also go wrong in exactly two ways.',
    date: DATE,
    query: 'how to break the ice',
    personaPath: '/meeting-people/',
    personaLabel: 'Practise the first line',
    image: '/scenarios/bali-beach.jpg',
    category: 'Openers',
    hue: 'var(--color-practice)',
    minutes: 4,
    film: 'bali-beach',
  },
  {
    slug: 'what-to-say-to-someone-you-just-met',
    path: '/blog/what-to-say-to-someone-you-just-met/',
    title: 'Notice one thing: the observation opener',
    description:
      'You do not need a line. You need one true observation about something public, a question after it, and then the discipline to stop talking.',
    excerpt:
      'The opener people remember is not clever. It is specific, and it is about something they chose.',
    date: DATE,
    query: 'what to say to someone you just met',
    personaPath: '/',
    personaLabel: 'Practice makes perfect',
    image: '/scenarios/barcelona-beach-alt.jpg',
    category: 'Attention',
    hue: 'var(--color-learn)',
    minutes: 4,
    film: 'barcelona-beach',
  },
  {
    slug: 'why-your-mind-goes-blank-in-conversation',
    path: '/blog/why-your-mind-goes-blank-in-conversation/',
    title: 'Why you go blank, and what actually fixes it',
    description:
      'Going blank is not a personality flaw and not a memory problem. It is a retrieval speed problem, and retrieval speed is trainable.',
    excerpt:
      'The words arrive an hour later because they were never missing. They were just slow.',
    date: DATE,
    query: 'mind goes blank in conversation',
    personaPath: '/',
    personaLabel: 'Practice makes perfect',
    image: '/hero-minds.jpg',
    category: 'Nerves',
    hue: 'var(--color-simulate)',
    minutes: 4,
  },
  {
    slug: 'practise-speaking-a-language-out-loud',
    path: '/blog/practise-speaking-a-language-out-loud/',
    title: 'How to practise speaking when you have nobody to practise with',
    description:
      'Reading and vocabulary are the parts you can already do alone. Speaking is the part that needs another person — unless you build the reps another way.',
    excerpt:
      'A 400-day vocabulary streak and zero hours of speaking is the most common way to stay stuck.',
    date: DATE,
    query: 'practice speaking english out loud',
    personaPath: '/second-language/',
    personaLabel: 'Keep calm and talk',
    image: '/scenarios/bali-beach-alt.jpg',
    category: 'Languages',
    hue: 'var(--color-accent)',
    minutes: 4,
    film: 'barcelona-beach',
  },
  {
    slug: 'how-to-stop-saying-um',
    path: '/blog/how-to-stop-saying-um/',
    title: 'How to stop saying "um"',
    description:
      'Filler words are not a vocabulary problem. They are what your mouth does while your brain catches up, and the fix is a pause you have to practise.',
    excerpt:
      'You cannot hear your own fillers. That is the whole difficulty, and it is also the fix.',
    date: DATE,
    query: 'how to stop saying um',
    personaPath: '/speaking-up/',
    personaLabel: 'Say what you mean',
    image: '/scenarios/gym.jpg',
    category: 'Delivery',
    hue: 'var(--color-stats)',
    minutes: 4,
  },
]

export const postBySlug = (slug: string): Post | undefined =>
  posts.find((p) => p.slug === slug)

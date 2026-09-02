# Keyword map

One page per intent. Each persona page owns a cluster, and each post in that
cluster links up to its persona page while the persona page links back down
(`components/sections/related-reading.tsx`). That reciprocal link is the point —
before it, the four variant pages had nothing distinguishing them from the
homepage, which is why they sat noindexed.

## Rules

1. **The query goes in the `<title>`, first, and the brand goes last.** The layout
   template appends `· ImprovTalk`, so `persona.meta.title` must not repeat it —
   every variant used to render `ImprovTalk — … · ImprovTalk`.
2. **The query has to appear in the body**, in a sentence a person would actually
   read. Not stuffed, not in a hidden div, not in a keyword meta tag — Google has
   ignored that tag for twenty years and it signals nothing but intent to game.
3. **One page per intent.** If two pages could rank for the same query, one of
   them is wrong. That is what the persona split is for.
4. **Never invent volume.** These are researched from the persona work in
   `docs/personas/`, not from a keyword tool we do not have a licence for. Treat
   them as informed guesses until Search Console shows real impressions.

## The map

| Page | Primary query | Also targets |
|---|---|---|
| `/` | practise conversations out loud | conversation practice app · how to get better at talking to people · AI conversation practice |
| `/second-language/` | practice speaking english out loud | english speaking practice app · how to stop translating in my head · speak a second language fluently |
| `/meeting-people/` | how to start a conversation with a stranger | how to talk to new people · what to say when you meet someone |
| `/speaking-up/` | how to stop saying um | how to speak more clearly at work · why do I talk too fast when nervous |
| `/out-of-practice/` | out of practice talking to people | getting back into socialising · how to be social again |
| `/how-to-start-a-conversation/` | how to start a conversation | conversation openers · how to approach someone |
| `/blog/how-to-start-a-conversation-with-a-stranger/` | how to start a conversation with a stranger | direct vs indirect opener |
| `/blog/how-to-break-the-ice/` | how to break the ice | how to guess someone's nationality · say hello in their language |
| `/blog/what-to-say-to-someone-you-just-met/` | what to say to someone you just met | observation opener · how to make small talk interesting |
| `/blog/why-your-mind-goes-blank-in-conversation/` | mind goes blank in conversation | why can't I think of what to say · thinking of the reply too late |
| `/blog/practise-speaking-a-language-out-loud/` | practice speaking english out loud | nobody to practise with · language exchange alternative |
| `/blog/how-to-stop-saying-um/` | how to stop saying um | filler words · how to pause instead of um |

## Where each query actually appears

Not just metadata — the phrasing is in the visible copy too, because that is what
gets matched:

- `/speaking-up/` hero reads "Say what you mean"; the post it links to is titled
  *How to stop saying "um"* and uses the phrase in the h1, the opening paragraph
  and the closing section.
- `/second-language/` leads with the three languages, and its post opens on the
  400-day-streak problem — the phrasing people use when they search this.
- The pillar page carries "how to start a conversation" in the h1 and in the
  `HowTo` schema, which is the same string, because Google drops `HowTo` markup
  that does not match the visible page.

## What we are deliberately not doing

- **No meta keywords tag.** Ignored by every major engine.
- **No location pages.** We have no local intent; a `/london/` page would be a
  doorway page and is exactly what manual actions are for.
- **No comparison page against a named competitor** until there is something
  substantive to compare. A thin "X vs Y" page written by the vendor ranks badly
  and reads worse.
- **No `AggregateRating` schema.** No reviews exist. Marking up invented ones is a
  policy violation and gets structured data ignored site-wide.

## Measuring it

Search Console is the only source that matters here, and there is nothing to read
yet — the site was effectively un-indexable until the canonical and redirect fixes
landed. Expect three to six weeks before impressions mean anything.

Watch the **Queries** report rather than positions: the question is whether we
appear for the intents above at all, not where. If a page ranks for a query it was
not written for, that is a signal the page is about something other than what we
thought, and the fix is the copy, not the keyword.

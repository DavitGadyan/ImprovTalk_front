# The fifteen

The five personas in `docs/personas/` are the ones with full briefs, ad copy and
video scripts. They are not the whole market, and one of the biggest gaps was
treating dating as a single audience when it is at least five different problems
that look identical from the outside.

This is the wider map. The original five keep their names and research — nothing
in `docs/personas/`, `docs/sem/` or `docs/social/` is invalidated by this file.

**These are hypotheses.** They come from the product, the competitive research
and the persona work, not from respondents. The survey at `/survey/` exists to
replace guesses with answers; until it has run, treat every row below as
something to test.

## The rule that governs the dating family

The app's AI partner has agency: she can be guarded, uninterested, or done, and a
soft or hard no is a **scored outcome, not a failure state** (`rubric.py:261`).
That is not a disclaimer bolted on — it is the product.

So the dating personas are framed around **reading the other person**, never
around technique applied to them. No lines that work, no closing, no push-pull,
nothing about getting a number. This site is linked from the app that App Review
reads, and the framing has to survive that. It is also simply the honest pitch:
noticing a no early is the skill that keeps you welcome in a room.

---

## Family 1 · Dating

Five distinct problems. A single "dating" message would speak to none of them.

### 1 · The late starter
Little or no dating history, often 20s, and increasingly aware of it. The gap is
not technique — it is that everyone else got a decade of low-stakes reps and he
did not.
**Trigger:** a friend's relationship, a birthday, a dating app installed and
deleted twice.
**Searches:** *how to start dating with no experience*, *never been on a date*
**Likely blend:** high blue, low yellow.
**Never:** "still single?", anything implying he is behind.

### 2 · Back after a long relationship
Was fine at this once, inside a relationship for years, and the rules appear to
have changed. Closest to Claire, but with a specific and often painful trigger.
**Trigger:** the end of a long relationship; the first time a friend suggests an app.
**Searches:** *dating after a long relationship*, *how to date again at 35*
**Likely blend:** green-dominant.
**Never:** beginner, learn, start over. He is resuming, not starting.

### 3 · Great on apps, silent in person
Witty in text, flat in the room. The most common modern shape, and the one where
the gap between self-image and experience is widest.
**Trigger:** a third date that went nowhere after brilliant messaging.
**Searches:** *good at texting bad in person*, *awkward in person but not online*
**Likely blend:** yellow in writing, blue under pressure.
**Never:** frame texting as cheating or lesser. It is a real skill; it just does
not transfer.

### 4 · First-date freeze
Can get the date. Cannot hold the middle of it. Knows the first ten minutes are
fine and the next forty are the problem.
**Trigger:** a specific date in the calendar this week.
**Searches:** *what to talk about on a first date*, *first date awkward silence*
**Likely blend:** balanced, low green.
**Never:** scripts and question lists. That is what they already tried.

### 5 · Reading interest
Cannot tell how it is going, so over-corrects — pushes when they should stop, or
leaves when it was going well. The persona our product is most uniquely built for,
because the AI partner's disposition and guard are separately tunable.
**Trigger:** a misread that was embarrassing afterwards.
**Searches:** *how to tell if someone is interested*, *am I being too much*
**Likely blend:** high blue, high green.
**Never:** "signals she's into you" listicle framing. This is about paying
attention, not decoding.

---

## Family 2 · Social

### 6 · Overcome shyness — **Sam, 24** *(full brief exists)*
Freezes, replays it at 1am, believes it is a fixed trait.
**Blend:** blue-dominant. **Never:** confidence, charisma, transform.

### 7 · Meeting new people — **Tom, 26** *(full brief exists)*
Fine once it is running; the first thirty seconds end him.
**Blend:** yellow with a blue spike under pressure. **Never:** the pickup vocabulary.

---

## Family 3 · Language

### 8 · Fluent on paper — **Andrés, 29** *(full brief exists)*
C1 reading, three words out loud.
**Blend:** blue-dominant. **Never:** learn, beginner, course.

### 9 · Newly relocated
Language is adequate; the *cultural* context is not. Misses the joke, answers the
literal question, cannot tell when small talk is finished.
**Trigger:** three months in, still no local friends.
**Searches:** *how to make friends in a new country*, *small talk in [country]*
**Likely blend:** green with high blue.
**Never:** treat it as a language problem. It is a context problem and saying so
is the whole hook.

---

## Family 4 · Work

### 10 · Being heard — **Arjun, 33** *(full brief exists)*
Has the seat at the table, loses the room.
**Blend:** yellow-red. **Never:** anxiety, shy, nervous.

### 11 · Interviews and job search
One performance, high stakes, no second attempt — the sharpest deadline of any
persona and the highest willingness to pay per week.
**Trigger:** an interview booked for next week.
**Searches:** *how to answer tell me about yourself*, *interview practice out loud*
**Likely blend:** blue-dominant, wants structure.
**Never:** promise outcomes. We do not get anyone a job.

### 12 · Client-facing and sales
Talks for a living and knows delivery costs deals. Measures things already, so
the delivery numbers land immediately.
**Trigger:** a lost deal, a quota conversation.
**Searches:** *sound more confident on sales calls*, *stop rambling on calls*
**Likely blend:** red-yellow.
**Never:** basics. This person does this professionally.

### 13 · Leading a team
Presence rather than persuasion. Difficult feedback, disagreement without it
going cold, being listened to without raising their voice.
**Trigger:** a performance conversation they are dreading.
**Searches:** *how to give difficult feedback*, *executive presence*
**Likely blend:** red-green.
**Never:** hacks, tricks, power moves.

---

## Family 5 · Reset

### 14 · Out of practice — **Claire, 38** *(full brief exists)*
Not shy. Used to be the one who talked to everyone.
**Blend:** green-dominant. **Never:** beginner, learn, basics.

### 15 · Remote-work isolation
Two years of video calls and no unplanned conversation. Fine one-to-one on a
scheduled call, lost in a room. Distinct from Claire: the circle did not shrink,
the *unstructured* part of it vanished.
**Trigger:** a return-to-office week, a conference, a work social.
**Searches:** *lost social skills working from home*, *awkward after remote work*
**Likely blend:** blue-green.
**Never:** imply working remotely was a mistake.

---

## How this maps to the survey

`/survey/` asks two questions, not one of fifteen. The first is the family —
seven options, because fifteen on a screen is a wall — and **"Type your
situation" is always the last one**, so nobody is forced into a category that is
not theirs:

| # | Survey option | Family | Tips |
|---|---|---|---|
| 1 | Dating and relationships | Dating | `dating` |
| 2 | Overcome shyness | Social | `shyness` |
| 3 | Meeting people and socialising | Social | `socialising` |
| 4 | Speaking a second language | Language | `language` |
| 5 | Speaking up at work | Work | `practice` |
| 6 | Getting back after a break | Reset | `reset` |
| 7 | **Type your situation** *(free text)* | → Socializer | `socialising` |

Dating leads because it is the largest family here and the one the research
says is core.

The second question narrows inside the family — the personas above, as options.
Families with a single persona (shyness, socialising) skip it and assign it, so
the `persona` column is populated either way, and skipping is always allowed.

The colour blend is what separates people *inside* a persona. Two people who
both pick **Reading interest** get the same four moves and a materially
different sheet, because the paragraph naming what their style costs them is
chosen by their dominant colour.

**"Type your situation" resolves to Socializer** deliberately: it is the
broadest family, and the free text is the more valuable output anyway. Read
those answers monthly — they are where persona sixteen comes from.

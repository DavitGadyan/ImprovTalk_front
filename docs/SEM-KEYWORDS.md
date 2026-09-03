# SEM keywords and negatives, per persona

Companion to `SEO-KEYWORDS.md`, which covers organic. This one is for paid.

**These are hypotheses, not volume data.** They come from the persona research in
`docs/personas/`, not from Keyword Planner — we have no account history to draw
on. Treat the first month as research: the search terms report is what tells you
which of these are real, and every negative list below will grow from it.

## Before you spend anything

Two conditions are not met yet, and paid traffic under either one wastes money.

1. **The TestFlight beta is closed.** Ads would send people to a page whose only
   action leads to "this beta isn't accepting new testers". Fix that first.
2. **There is no conversion history.** Google Ads has recorded zero conversions,
   so Smart Bidding has nothing to learn from. Start on manual CPC or maximise
   clicks, not tCPA.

## The brand problem, first

Searching *improvtalk* returns a different company: **ImprovTalk, Inc. (Chicago)**
on `improvtalk.com`, with Instagram, Facebook and YouTube profiles. A third
similar name, `improvetalk.com`, also ranks.

This costs money in paid search specifically:

- People searching your brand may want theirs. You pay for the click either way.
- Your brand name contains "improv", which is a large, unrelated intent —
  improv comedy classes, troupes, theatre, games. **Verify this in the search
  terms report in week one**; I could not confirm the volume, and if it is real
  it is the single biggest source of waste in the account.

Brand campaign, if you run one at all:

```
Exact:   [improvtalk vip] [improvtalk app] [improv talk app]
Phrase:  "improvtalk conversation" "improvtalk practice"
```

Negatives on the brand campaign: `chicago, inc, podcast, improvetalk, comedy,
class, classes, theatre, theater, troupe, workshop, show, tickets, near me`

## Account-level negatives

Apply as a shared negative list to every campaign. These are not persona
judgements — they are traffic that can never convert.

**Freeloaders**
`free, crack, cracked, apk, mod, modded, torrent, hack, unlimited, no subscription, without paying`

**Jobs and study**
`job, jobs, career, careers, salary, hiring, vacancy, internship, thesis, dissertation, research paper, journal, pdf, ppt, worksheet, curriculum, lesson plan`

**Wrong platform** — remove `android` from this list the day Android sign-in ships
`android, windows, pc, desktop, chromebook, web version, online free`

**Wrong product**
`improv class, improv comedy, improv theatre, improv games, standup, stand up comedy, toastmasters, debate club, voice over, singing, accent reduction, elocution`

**Clinical intent** — we are a practice tool, not a treatment, and should not
appear against people looking for one
`therapy, therapist, counselling, counseling, psychiatrist, medication, meds, diagnosis, disorder, cbt, autism, asperger, stutter, stammer, speech therapy, selective mutism`

**Coercive intent** — the app declines this and App Review reads the site
`pickup artist, pua, rizz, seduction, seduce, get laid, manipulate, mind games, how to get a girlfriend, tinder openers, dating app openers`

---

## 01 · Shy → `/`

**Phrase match**
```
"conversation practice app"
"practice talking to people"
"how to not freeze in conversation"
"what to say when your mind goes blank"
"social skills practice app"
"practice conversations with ai"
```

**Exact match** — add once the phrase versions prove out
```
[conversation practice app]
[how to stop freezing in conversations]
[app to practice talking to people]
```

**Persona negatives** (beyond the account list)
`anxiety medication, social anxiety disorder, panic attacks, support group, quiz, test, am i shy`

**Why:** he is self-conscious, not unwell. Clinical modifiers are both the wrong
audience and a place we should not be advertising.

---

## 02 · Second language → `/second-language/`

**Phrase match**
```
"practice speaking english out loud"
"english speaking practice app"
"how to stop translating in my head"
"speaking practice partner"
"practice speaking spanish out loud"
"ai to practice speaking english"
```

**Exact match**
```
[english speaking practice app]
[practice speaking english out loud]
[app to practice speaking a language]
```

**Persona negatives**
`beginner, for beginners, basics, a1, a2, alphabet, grammar test, ielts, toefl, cambridge, exam, certificate, translate, translation, dictionary, kids, children, free course`

**Why:** he is C1 with a 400-day vocabulary streak. Beginner and exam-prep terms
are the largest single source of waste in this ad group — every one of them is
someone at a different stage who will bounce.

Decide deliberately on `duolingo, babbel, busuu` — bidding on competitor brands
is legal and sometimes sensible, but it is expensive and their brand defence is
strong. Default to excluding them until the account has data.

---

## 03 · Meeting people → `/meeting-people/`

**Phrase match**
```
"how to start a conversation with a stranger"
"how to break the ice"
"what to say to someone you just met"
"how to talk to new people"
"conversation starters with strangers"
```

**Exact match**
```
[how to start a conversation with a stranger]
[how to break the ice with someone]
```

**Persona negatives** — the strictest list in the account
`flirt, flirting, pickup, pick up line, pickup lines, rizz, game, dating, tinder, hinge, bumble, date, girlfriend, boyfriend, attract, seduce, texting, dm, opener for girls`

**Why:** two reasons that point the same way. The app's partner can decline and
is built to refuse coercion, so this traffic converts badly and churns fast. And
this site is linked from the app that App Review reads — ad copy promising
seduction contradicts the product it is selling.

---

## 04 · Speaking up → `/speaking-up/`

**Phrase match**
```
"how to stop saying um"
"how to speak more clearly"
"filler words when speaking"
"how to stop talking too fast"
"practice for a presentation"
"how to be more articulate"
```

**Exact match**
```
[how to stop saying um]
[how to stop saying like]
[how to speak more clearly at work]
```

**Persona negatives**
`shy, social anxiety, glossophobia, fear of public speaking, stage fright, toastmasters, speech therapy, stutter, elocution, accent`

**Why:** he does not believe he has a problem with people — he believes he has a
problem being heard. Anxiety framing matches a different person and the ad will
read as being about somebody else.

**Worth the CPM.** This is the persona who can expense the outcome, and the one
where LinkedIn and high-intent search are worth real money.

---

## 05 · Out of practice → `/out-of-practice/`

**Phrase match**
```
"out of practice talking to people"
"how to be social again"
"getting back into socialising"
"lost my social skills"
"how to make conversation again"
```

**Exact match**
```
[how to be social again]
[out of practice talking to people]
```

**Persona negatives**
`beginner, for beginners, learn to talk, basics, 101, teach me, how to talk to people for beginners, kids, teenager, student`

**Why:** she is not a beginner and will close anything that treats her as one.
Beginner-framed queries are a different person entirely.

---

## How to run it

**Start on phrase match only.** Broad match without conversion history spends
into queries you have not thought of, and you have no signal to correct it with.
Add exact match for the terms that prove out; add broad only after ~30
conversions, if at all.

**Read the search terms report weekly for the first month**, then monthly. Every
irrelevant term you find becomes a negative. The lists above are a starting
point that will be wrong in ways only your own data can show.

**One ad group per persona, pointing at its own landing page.** That is the whole
reason those five pages exist — message match pays off immediately and needs no
statistical power, unlike the A/B split.

**Watch `testflight_click` per ad group**, not clicks. Conversion tracking is
verified working end to end; the label is in `content/analytics.ts`.

## What is not in here

No CPC or volume estimates. We have no account history and no Keyword Planner
access, and inventing numbers to fill a column would make this document look more
finished than it is. Pull them from Keyword Planner before you set budgets.

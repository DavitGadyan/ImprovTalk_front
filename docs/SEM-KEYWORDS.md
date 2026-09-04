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

---

# Campaign structure and creative

The lists above are targeting. This is how to build the account around them.

## Architecture

Five search campaigns, one per persona, each with a single ad group pointing at
its own landing page. Not one campaign with five ad groups — separate campaigns
give each persona its own budget, its own negatives and its own schedule, and
the personas want different hours of the day.

```
Campaign                Ad group            Landing page
──────────────────────────────────────────────────────────────────
IT · Shy                Freezing            /
IT · Second language    Speaking practice   /second-language/
IT · Meeting people     First line          /meeting-people/
IT · Speaking up        Fillers and pace    /speaking-up/
IT · Out of practice    Getting it back     /out-of-practice/
IT · Brand              Brand               /
```

Brand stays separate so its cheap clicks never subsidise or distort the reported
CPA of the others.

## Budget and bidding

**Bidding: Manual CPC or Maximise clicks to start.** Target CPA and Maximise
conversions both need conversion history and the account has none. Switch once
you have roughly 30 conversions in 30 days, not before.

**Relative allocation**, not absolute — the numbers depend on a budget you have
not set:

| Campaign | Share | Why |
|---|---|---|
| Speaking up | 30% | The only persona who can expense the outcome, and the one with genuinely commercial intent |
| Second language | 25% | Large, well-defined query space and a differentiator no competitor matches |
| Shy | 20% | Broadest audience, weakest commercial intent |
| Meeting people | 15% | Cheap clicks, but the strictest negatives and the youngest audience |
| Out of practice | 5% | Smallest query volume; treat as a test |
| Brand | 5% | Defensive only |

**Schedule by persona**, since the personas differ more by hour than by day.
Shy skews late evening; Speaking up skews weekday working hours. Start
all-hours, then cut from the search terms and hour-of-day reports.

## Responsive search ads

Google wants 15 headlines (≤30 characters) and 4 descriptions (≤90). Pin
nothing at first — let the system learn — then pin only if a required claim is
being dropped.

Every asset below obeys that persona's voice rules from `docs/personas/`. The
rules are not decoration: get the frame wrong and the ad is about somebody else.

### IT · Shy → `/`

**Headlines**
```
Practise talking, in private
Nobody hears you practise
Say it out loud first
Conversation practice app
Practice makes perfect
Try the same line 20 times
Free to start, no card
An AI that talks back
Three minutes a night
Find out what went wrong
Your phone, your room
Practise before it counts
Rehearse the hard bit
Not advice. Reps.
Talk to an AI, not a person
```

**Descriptions**
```
Talk to an AI on your phone. Nobody hears you. Try as often as you like.
Hold a button and speak. It answers back, then shows you what actually landed.
Free to start, no card. Three minutes is enough to feel the difference.
Practise the conversation before you have it, as many times as you need.
```

**Never:** confidence, charisma, cure, transform, overcome.

### IT · Second language → `/second-language/`

**Headlines**
```
Practise speaking out loud
English, Spanish or Russian
She won't switch to English
Speak, don't translate
Speaking practice, any time
Your grammar is fine
The gap is speaking, not words
Practise with no one around
An AI that waits for you
Free to start, no card
Say it wrong 20 times
Keep calm and talk
Stop rehearsing in your head
Fluent on paper, stuck aloud
Get your speed back
```

**Descriptions**
```
Reading is the easy part. Practise speaking out loud, as often as you like.
An AI that stays in your language even when you stall. That is the point.
English, Spanish or Russian. Your pace and pauses measured from the recording.
Free to start, no card. The app menus are English; the conversation is not.
```

**Never:** learn, beginner, course, lesson, native speaker, fluency guaranteed.

### IT · Meeting people → `/meeting-people/`

**Headlines**
```
Practise the first line
Break the ice, in private
Say it before it counts
The first 30 seconds
Try an opener 20 times
Warm up before you go out
An AI that answers back
She can say no
Free to start, no card
Practise talking to strangers
Not a script. Reps.
Two goes before you leave
Read the room better
Openers you can rehearse
Nobody hears you practise
```

**Descriptions**
```
Try the first minute on your phone, twenty times if you want, before it counts.
She answers back, and sometimes she is not interested. Noticing that is the skill.
Free to start, no card. Two goes before you head out is enough to feel it.
Practise the opener, the exit, and everything awkward in between.
```

**Never:** flirt, attract, seduce, rizz, game, lines that work, get her number.
This is the campaign that can cost you the App Review.

### IT · Speaking up → `/speaking-up/`

**Headlines**
```
Seven ums in three minutes
Stop saying um
Hear how you actually sound
Practise the hard meeting
Your pace, measured
Not a rating. A number.
Practise before the meeting
Filler words, counted
Nobody at work will tell you
Say what you mean
Words per minute, measured
Rehearse difficult feedback
Free to start, no card
Fix it before Monday
Measured, not guessed
```

**Descriptions**
```
Your speed, your pauses and your filler count, measured from the recording.
Practise the hard conversation on your phone first, and hear how you sound.
Not a mark out of ten. Real numbers, with the working shown for each one.
Free to start, no card. Three minutes the night before the meeting.
```

**Never:** anxiety, shy, nervous, fear, confidence. He has a being-heard problem.

### IT · Out of practice → `/out-of-practice/`

**Headlines**
```
It comes back quickly
You did not lose it
Get back in practice
Like riding a bike
Three minutes a day
You used to be fine at this
Warm up before you go out
Nothing changed about you
An AI that talks back
Free to start, no card
Week six against week one
Practise in private
Not a beginners course
Say yes to things again
Your circle got smaller
```

**Descriptions**
```
You used to be fine at this. A few short goes and most of it comes back.
Nothing changed about you. Only how often you get to practise. Start there.
Three minutes a day, in private. Watch week six against week one.
Free to start, no card. Not a course, and not for beginners.
```

**Never:** learn, beginner, basics, teach, improve yourself, fix.

## Extensions

**Sitelinks** (shared, except where a persona has a better one)
```
How it works        /#how
How the score works /about/
How to start a chat /how-to-start-a-conversation/
Privacy             /privacy/
```

**Callouts** (shared)
```
Free to start · No card needed · Nobody hears you
Three languages · Recordings not stored · iPhone
```

**Structured snippet** — Type: *Features*
```
Live practice, Scenario simulator, Delivery scoring, Solo drills, Reference library
```

Do not use price, promotion or location extensions. There is no published price,
no promotion, and no location.

## Launch sequence

1. **Do not launch while the beta is closed.** Every click lands on a page whose
   only action ends in "this beta isn't accepting new testers".
2. Week 1: Brand + Speaking up only, small budget, phrase match, manual CPC.
   Read the search terms report daily and add negatives.
3. Week 2: add Second language once the negative list has absorbed the first
   week's beginner and exam queries.
4. Week 3: add Shy and Meeting people. Meeting people needs its negative list
   checked before it runs, not after.
5. Out of practice last, as a test, once you know your real CPC.
6. Only after ~30 conversions: consider Maximise conversions or tCPA.

## What to watch

**`testflight_click` per campaign**, not clicks and not CTR. A campaign with
great CTR and no installs is buying the wrong intent.

**The search terms report is the whole job in month one.** Every list in this
document is a hypothesis; that report is the only thing that turns them into
facts. Budget an hour a week for it.

**Watch for the other ImprovTalk.** Chicago-based, owns the `.com`. Expect their
traffic in your brand campaign's search terms and add negatives as it appears.

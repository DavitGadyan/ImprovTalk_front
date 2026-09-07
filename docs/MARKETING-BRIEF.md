# ImprovTalk — master marketing brief

**Purpose:** a single self-contained input for an AI marketing tool. Everything
here is drawn from this repo and the app repo, not invented. Where two sources
in the codebase disagree, that is flagged rather than resolved silently.

**Generated:** 2026-09-06 · **Site:** https://improvtalk.vip · **Status:** pre-launch, TestFlight beta, iPhone only

---

## 0 · How to use this file

| Section | Feed it to |
|---|---|
| 1–3 | Any generator, as system context. The product facts and the never-claim list. |
| 4–5 | Copywriting. Positioning, voice, on/off-brand examples. |
| 6 | Audience selection and message match. Five full personas + a fifteen-persona map. |
| 7 | SEO briefs, page plans, schema. |
| 8 | Paid search — campaigns, keywords, negatives, RSA assets. |
| 9 | Organic social — platforms, cadence, script structures, generation prompts. |
| 10 | Measurement, UTMs, conversion definitions. |
| 11–13 | Guardrails. Read before publishing anything. |

**The one rule that overrides everything else:** never publish a number that has
not been counted from the app's data files. Section 3 has the counted set and
the disputed set. Anything not in the counted set does not get a number.

---

## 1 · The product in one paragraph

ImprovTalk is a **voice-first AI communication coach for iPhone**. You pick a
scene — a café queue, a networking room, a leadership review — hold a button and
talk out loud. An AI partner answers in real time over WebRTC, in voice, with
interruptions and hesitations. When you stop, you get a **Charisma Score** that
opens up to show its own working: what landed, what did not, and a better line
for each moment. It is a practice tool, not a course and not therapy.

**The category it sits in:** conversation practice / communication coaching.
Not improv comedy, not public speaking training, not a dating app.

**The sentence that does the most work:**
> Practise the conversation before you have it, as many times as you need,
> somewhere nobody hears you.

---

## 2 · How it actually works

### The loop
1. **Pick a scene.** Venue, plus who you are talking to — their mood, how
   guarded they are, how much they give back.
2. **Talk out loud.** Hold the button and speak. It answers live, in voice. Ask
   for a hint mid-scene if you stall.
3. **Get scored.** A Charisma Score with the working shown.

### The score — the core differentiator
```
Charisma Score = (Fluency×0.40 + Confidence×0.35 + Improvisation×0.25) × 0.75
               + measured delivery × 0.25
```
- The three pillars are a **model judgement** against a fixed rubric
  (`temperature=0.2, seed=42` — best-effort reproducibility, not determinism).
- The delivery quarter is **measurement, not opinion**: pitch via Praat/
  Parselmouth, words-per-minute from Whisper timestamps, pause ratio, filler
  density per 100 words, loudness steadiness. Rule-based DSP, deterministic for
  the same audio. Lexical diversity uses MATTR and MTLD.
- **We say which half is which.** That honesty is itself the positioning.

Delivery meters shown to the user: Depth, Intonation, Pace, Pauses, Fewer
fillers, Steady volume.

### Four ways to be scored
Live practice · AI-vs-AI simulator · upload a real recording · describe a
conversation in text.

### The AI partner
Tunable mood, disposition, defensiveness and DISC colour blend; 195
nationalities and 29 accents shape **how she sounds in English**, not what
language she speaks. **She has agency: she can be guarded, uninterested, or
done, and a soft or hard no is a scored outcome, not a failure state.** This is
a product fact, not a disclaimer, and it is the honest differentiator in the
dating and meeting-people families.

### Languages
Conversations run in **English, Spanish or Russian** — traced end to end in
code. **The app interface is English only. There is no i18n.** Say so plainly;
users find out anyway.

### Pricing
Free to start, **3 AI conversations a week**. Paid tiers raise the limit and
unlock more capable models. **Final pricing is confirmed at launch — never
publish a figure.** In-app values are contradictory placeholders (weekly SKUs
rendering a "/day" label — a known bug).

---

## 3 · Numbers: counted, disputed, forbidden

### 3a · Counted and safe to publish
| Fact | Value |
|---|---|
| Charisma Score weights | Fluency 0.40 · Confidence 0.35 · Improvisation 0.25 |
| Delivery share of headline score | 25% |
| Conversation languages | 3 (English, Spanish, Russian) |
| Free tier | 3 conversations / week |
| Total reference library | **2,766 items** (2,571 reference + 195 countries) |
| Countries | 195 |
| Accents in English | 29 |
| Face photos | 631 |
| Audio clips | 195 |
| Charisma training exercises | 26 |
| Knowledge sources distilled | **13 sources → 104 principles** |
| Simulator scenarios *served* | **210** across **19 venues** |
| Solo drills | 16 |
| Scenario films on the site | 4 (coffee shop, Bali beach, Barcelona beach, gym) |
| Live site pages | 22 built routes; 17 in the sitemap |

### 3b · Disputed — do not use until recounted
These conflict **inside the repo**. Recount before any campaign uses them.

| Claim | Source A | Source B |
|---|---|---|
| Live practice scenarios | 70 / 13 venues (`content/catalogs.ts`, `llms.txt`, `history.md`) | 16 files / 11 categories, counted (`content/scenarios.ts`) — and 111 in `docs/COMPETITIVE-CHARMXP.md` |
| Reference catalogues | 22 (`llms.txt`) · 23 entries in the array | 25 (`COMPETITIVE-CHARMXP.md`) · 26 (`history.md`, Learn hub) |

### 3c · Never claim, in any channel
- That the **app interface** is translated. It is English-only.
- That 195 nationalities / 29 accents mean many spoken languages. They change her **English accent**, and accent is disabled unless the conversation is English.
- Any **price**, in any currency, in any period.
- Any **model pricing** or model-cost comparison figure.
- **"Dozens of books."** It is 13 sources, two of them field-data sets, hence *sources* and never *books*. The source works are named in filenames and **never named publicly**.
- Any **retention window for audio**. The shipped API has no object storage and no audio model — audio is read into memory, transcribed, analysed and discarded. That is better than what the old policy claimed, but the privacy policy is a legal document and has not been reconciled. Until it is, assert nothing beyond "your voice is used to score the session and nothing else."
- **Testimonials, reviews, ratings, before-and-afters, `AggregateRating` schema.** None exist. Inventing them is a policy violation that gets structured data ignored site-wide.
- **Outcome promises** — "get the job", "transform your confidence in 30 days", any timeframe.
- **Any number in section 3b.**

---

## 4 · Positioning

> **ImprovTalk is a voice-first conversation coach for iPhone.** It is for people
> who are fine on paper and stuck out loud — someone who freezes at the lunch
> table, blanks in a second language, or watches a meeting stop listening.
> Unlike apps that score you on a model's impression of how you sounded, **half
> of our score is measured from the recording itself** — pace in words per
> minute, pause length, filler density — and we say which half is which.

### The three defensible claims
1. **Measured, not guessed.** Real DSP, 25% of the headline score, and the raw inputs are exposed.
2. **Three conversation languages.** English, Spanish, Russian. Menus are English; we say so.
3. **A partner with agency.** She can decline. A no is a scored outcome.

### Competitive position (vs CharmXP, researched 2026-09-02)
**Ahead on technology, behind on distribution.**

| | CharmXP | ImprovTalk |
|---|---|---|
| Shipped | App Store + Play, 4.4★, 2.3K ratings | TestFlight only |
| Languages | English only | English, Spanish, Russian |
| Delivery scoring | LLM-inferred | Measured by DSP |
| Reference depth | none | 2,766 items |
| Ways to be scored | roleplay only | four |
| Partner realism | one coach persona | tunable; she can decline |
| Habit loop | XP, levels, streaks, courses | bare streak, no reminders |

**Do not copy their gamification** — it is not why they are winning; distribution
is. **Do not copy** their Day-1→Day-30 transformation panel, their unsourced
statistics block, or their dating-forward "rizz app" framing.

**The strategic move:** turn our real measurement into their retention loop.
*"Fillers: 7 per 100 words, down from 11"* is the same dopamine as a streak,
except it is true and cannot be copied without building the pipeline. Gamify
only the measured quarter — never the LLM half, which drifts.

---

## 5 · Voice

| Say | Never |
|---|---|
| Practise, reps, out loud, measured | Confidence, charisma, transform, cure, overcome |
| The specific moment — the lift, the lunch table, the standup | "Social anxiety", "overcome your fear" |
| Numbers we counted | Numbers we did not count |
| "Nobody hears you" | "Become the person who…" |
| What we do not claim | Testimonials we do not have |

Second person, present tense, short sentences. **No exclamation marks. No
emoji.** The reader is **competent and stuck, not broken**. Plain words
throughout — the reader is often self-conscious about conversation, and clever
phrasing reads as performing at them.

**Headlines are familiar sayings.** "Practice makes perfect", "Keep calm and
talk", "Break the ice", "Say what you mean", "Like riding a bike". A known line
is trusted before it is finished.

### On-brand / off-brand
- **On-brand.** Ten seconds of someone lying awake; *"You thought of the perfect reply. Four hours late."*; end card. One specific moment, no claim, product last.
- **On-brand.** A counter ticking "um · um · um" over a meeting room, resolving to *"Seven. In three minutes."* A real measurement we actually take.
- **Off-brand.** "Transform your confidence in 30 days." A claim we cannot support, a promise about a person rather than a skill, and a timeframe with no data.
- **Off-brand.** Any before-and-after face, any "lines that work", any testimonial.
- **Off-brand.** A post about the app's features. Nobody on social wants a feature list; they want the moment they recognise.

### Visual system
- **Design system B, as the app ships it:** ground `#000000`, one surface `#1F1F1F`, one hairline `#313131`, text `#FFFFFF` with a single muted level `#8E8E93`. **Never navy, never white.**
- **One accent, as a fill:** violet `#849CFF` with black text on it (active tab, filled bar, focus ring); violet as words only for links. Eyebrows are muted, not coloured.
- **Data colours, never chrome:** danger `#FF6B6B`, warn `#FFD166`, success `#7DE2A6`, gold `#E0B84A`. Blog categories: openers danger, attention warn, nerves gold, languages accent, delivery success. Personality blend red/blue/yellow/green → danger/accent/warn/success.
- **The brand gradient is the primary button and nothing else:** the rose → violet → indigo ramp (`#DF274A → #A44DD1 → #5856D6`, white text ≥ 4.6:1) on "Get early access" — hero and floating pill — plus the logo and the Hold-to-speak disc inside the renders. Never a card, band, rule or text. On social: **the end card only.**
- **Type:** Satoshi Variable throughout — display 700, body 400/500. Icons: the app's Material Symbols Rounded subset.
- **Imagery:** real app renders cropped from the case-study composites (`assets/renders/` → `public/app/`), never drawn mockups and never a device frame added around them.
- **Safe areas:** keep text out of the bottom 20% and right 15% of a 9:16 frame. On-screen text under 60 characters per card.
- **Logo:** never redraw, never on a light background, never let a generative model render the wordmark.

---

## 6 · Personas

Five have full briefs, ad copy and video scripts. Behind them sits a
fifteen-persona map. **Genders were set deliberately: shy, language, social and
speaking are male; rusty is female. The AI conversation partner is "she"
throughout the app and copy — that is not a persona pronoun.**

### 6a · The five (full briefs)

---

#### 01 · Sam, 24 — "The one who freezes"
**Role:** champion, indexed, canonical page · **Page:** `/` · **Slug:** `shy` · **Hue:** `#ff2d55`

| | |
|---|---|
| Tagline | Knows exactly what he should have said. Knows it an hour too late. |
| Quote | *"I plan the whole thing in my head. Then they say something I did not expect and I am just gone."* |
| Location | Manchester, UK — city centre |
| Household | Flatshare, two housemates |
| Education | BSc, first job out of university |
| Occupation | Junior developer |
| Already tried | Books, videos, "just be confident" |
| Trigger | The Monday standup he has to speak in |
| On his phone | In bed, 23:00–01:00 |

**Belief:** conversation is a personality he was not issued. Everything he has
read confirms it — the advice is all *be more confident*, which is the outcome,
not the method.
**Turn line:** it is not a trait, it is reps — and reps need somewhere nobody is watching.

**Pains:** You plan it in your head (where it always goes well) · Real life is
faster (they say something unexpected and you go blank) · Nobody tells you why
(the chat dies, you never find out what you did wrong).

**Objections → answers:**
- *"Talking to an AI is embarrassing."* → It is your phone, in your room. Nobody hears it.
- *"Another app I will open twice."* → Three minutes a go. Free to start, no card.
- *"Will it judge me?"* → It scores the conversation, not you.

**Usage:** Sunday night, in bed, before a Monday he is dreading. The café scene,
the same opener eight times. Watches the filler count coming down.

**Page order:** Problem → Good news → How it works → Score → What you get → FAQ.
*Problem first: he has to feel recognised before he believes anything else.*

**Hero:** eyebrow *Practise out loud* · **"Practice makes perfect."** · sub
*"Talk to an AI on your phone. Nobody hears you. Try as often as you like."*

**Channels:** Organic search (*how to not freeze in conversation*, *what to say
when your mind goes blank*) · TikTok/Reels, first-person, no bravado · Reddit
(r/socialskills, r/socialanxiety).
**Best posting time:** 21:00–01:00 — he is scrolling at the hour the feeling is live.
**Metric:** `testflight_click` per visitor. He is the champion; every other variant is measured against him.
**NEVER:** confidence, charisma, cure, transform, overcome, anxiety. *He has been sold confidence his whole life and it is the reason he does not trust pages like this one.*

---

#### 02 · Andrés, 29 — "Fluent on paper"
**Role:** challenger · **Page:** `/second-language/` · **Slug:** `language` · **Hue:** `#0a84ff`

| | |
|---|---|
| Tagline | Can read a contract in English. Rehearses before ordering a coffee. |
| Quote | *"By the time I have the sentence ready in my head, they have already moved on."* |
| Location | Berlin — relocated from Valencia |
| Household | Lives with his partner |
| Education | MSc Engineering, taught in Spanish |
| Occupation | Engineer on an English-speaking team |
| Already tried | A 400-day vocabulary streak |
| Trigger | The daily standup, held in English |
| Level | C1 on paper. Out loud, three-word answers. |

**Belief:** he does not have a vocabulary problem and he knows it. He has never
had a single hour of low-stakes speaking — every app teaches words and leaves
him to find the reps himself.
**Turn line:** everyone sells vocabulary. Nobody sells reps at speaking.

**Pains:** You translate first · So you keep it short (three words to be safe;
you sound like less than you are) · So you talk less (less practice, next one harder).

**Objections → answers:**
- *"Will it switch to English when I struggle?"* → No. She stays in the language you picked. That is the point.
- *"Will it fix my grammar?"* → It tells you what worked and gives you a better way to say it.
- *"Is the app in Spanish?"* → The conversation is. The menus are English — say so plainly.

**Usage:** ten minutes before the standup. A café in Barcelona, in whichever
language he is weakest. Watches his pauses getting shorter.

**Page order:** Practise in the language → Problem → How → Score → What you get → FAQ.
*The languages lead. He wants to know whether it does his language, not sympathy.*

**Hero:** eyebrow *Speak, do not translate* · **"Keep calm and talk."** · sub
*"English, Spanish or Russian. Practise out loud, as often as you like."*

**Channels:** Google Search (*practice speaking english out loud*) · YouTube
pre-roll on language channels (high intent, cheap) · TikTok (language learning
is one of its biggest organic niches) · YouTube Shorts first when expanding.
**Best posting time:** evenings and Sunday. Subtitles always — he may be watching in his second language.
**NEVER:** learn, beginner, course, lesson, native speaker, basics, fluency guaranteed.

---

#### 03 · Tom, 26 — "One shot at the first line"
**Role:** campaign landing page · **Page:** `/meeting-people/` · **Slug:** `social` · **Hue:** `#ff9f0a`

| | |
|---|---|
| Tagline | Fine once it is running. It is the first thirty seconds that end him. |
| Quote | *"I think of the perfect thing to say about four minutes after they have gone."* |
| Location | Bristol, UK — moved six months ago |
| Household | Lives alone, one-bed rental |
| Education | BA, non-specialist |
| Occupation | Junior sales, target-driven |
| Already tried | Going out more and hoping |
| Trigger | Friday night with people he barely knows |

**Belief:** people who are good at this were born knowing what to say. He has
never once rehearsed a first minute and it has not occurred to him that it could be.
**Turn line:** it is a first minute you have never practised, not a personality you were not born with.

**Pains:** You think too long · It comes out flat · You learn nothing.

**Objections → answers:**
- *"Is this a pick-up thing?"* → No. She can say no, and sometimes she does. It never tells you to push.
- *"Will it make me sound scripted?"* → The scene changes every time.
- *"I do not need an app to talk to people."* → You need reps, before it counts.

**Usage:** twenty minutes before he goes out. Beach, festival, bar. Two goes —
warm-up, not study.

**Page order:** Problem → How it works → Good news → What you get → Score → FAQ.
*The films come second. For him the scenes are the pitch — he needs to see it.*

**Hero:** eyebrow *Practise the first line* · **"Break the ice. Practise first."**
· sub *"Try the first minute on your phone, twenty times if you want, before it counts."*

**Channels:** TikTok/Reels (native platform — show the scene, not the score
screen) · YouTube Shorts · Instagram travel and nightlife interest targeting.
**Best posting time:** Thursday and Friday, 19:00–22:00 — before he goes out, not after.
**NEVER:** flirt, attract, seduce, rizz, pickup, game, dating, "lines that work", "get her number".
**⚠ This is the campaign that can cost you the App Review.** The app declines
coercive pushes, the site is linked from the app, and App Review reads both.

---

#### 04 · Arjun, 33 — "Loses the room"
**Role:** campaign landing page · **Page:** `/speaking-up/` · **Slug:** `speaking` · **Hue:** `#30d158`

| | |
|---|---|
| Tagline | Senior enough to present. Not senior enough to be listened to automatically. |
| Quote | *"Nobody has ever told me I talk too fast. I just watch people stop listening."* |
| Location | London, UK |
| Household | Married, one child under five |
| Education | MBA |
| Occupation | Product manager, presents to leadership |
| Feedback received | None. Everyone is too polite. |
| Trigger | The monthly leadership review |
| Budget | Has one. This is career spend. |

**Belief:** he already believes it is a skill. What he has never had is a
**measurement** — everything he has been told is a feeling somebody had about him.
**Turn line:** he is the persona the product is most literally built for.

**Pains:** You speed up · You fill the gaps (um, so, basically — you do not hear
it, everyone else does) · Nothing changes.

**Objections → answers:**
- *"Is the score just an opinion?"* → The delivery half is measured. Tap any score to see the numbers.
- *"I do not have time for a course."* → Three minutes the night before the meeting.
- *"Will it change anything?"* → *"Seven ums in three minutes"* is something you can work on. *"Be more confident"* is not.

**Usage:** the night before the meeting. Hard feedback, a job interview,
explaining the tricky thing. Watches WPM, pause length, filler count.

**Page order:** Problem → Good news → **Score** → How → What you get → FAQ.
*The numbers come third, before the mechanism. The measurement is the product for him.*

**Hero:** eyebrow *Say it clearly* · **"Say what you mean."** · sub *"Practise
the hard conversation on your phone first, and see how you actually sound."*

**Channels:** **LinkedIn** — the only persona worth the CPM, job-title targeting
· Google Search (*how to stop saying um*) · podcast reads on career and
management shows, he listens on the commute.
**Best posting time:** weekday mornings and Sunday evening — before the week, not during it.
**Metric:** watch **revenue**, not just installs. Most likely of the five to pay, because he can expense the reason.
**NEVER:** anxiety, shy, nervous, fear, confidence, stage fright. *He does not
think he has a problem with people — he thinks he has a problem being heard.*

---

#### 05 · Claire, 38 — "It went quiet"
**Role:** campaign landing page · **Page:** `/out-of-practice/` · **Slug:** `rusty` · **Hue:** `#bf5af2`

| | |
|---|---|
| Tagline | Not shy. Used to be the one who talked to everyone. |
| Quote | *"I used to be good at this. I do not know exactly when that stopped being true."* |
| Location | Leeds, UK — suburbs |
| Household | Lives alone, recently separated |
| Education | BA |
| Occupation | Operations manager, fully remote |
| Not | Shy. Never was. |
| Trigger | A work drinks she left after forty minutes |
| Needs | Reassurance, not tuition |

**Belief:** she is the only one of the five who is not a beginner, and she will
close the page the moment it treats her like one. She does not need to learn
this. She needs to use it again.
**Turn line:** reassurance leads, and the frame is *it comes back* — never *you can learn it*.

**Pains:** The circle got smaller (a move, a break-up, working from home) · So
it takes effort · And you notice — which is the bit that makes it feel awkward.

**Objections → answers:**
- *"I am not shy, this is not for me."* → Correct. It is about practice you stopped getting.
- *"Is this going to be patronising?"* → The page opens with the good news, not what is wrong with you.
- *"Will I stick with it?"* → Three minutes a day.

**Usage:** three minutes a day, and twice before she goes out. Café, gym, party —
nothing exotic. Watches week six against week one.

**Page order:** **Good news** → What happened → How → Score → What you get → FAQ.
*Reassurance first, and the problem section is renamed "What happened" — it is
about circumstances, not about her.*

**Hero:** eyebrow *Get back in practice* · **"Like riding a bike."** · sub *"You
used to be fine at this. A few short goes and most of it comes back."*

**Channels:** **Facebook / Instagram Reels** — the one persona whose age
genuinely sits on Facebook, and the cheapest CPMs · Google Search (*getting back
into socialising*) · Reddit life-change subs, **not** r/socialskills (skews young).
**Best posting time:** evenings 20:00–22:30. Reels first for her, not TikTok.
**Metric:** watch **retention** over installs. If it works for her it works for weeks.
**NEVER:** beginner, learn, basics, teach, improve yourself, fix. *She could do
this five years ago and she knows it.*

---

### 6b · The wider map — fifteen personas
Hypotheses from product + competitive + persona research, **not from
respondents**. The `/survey/` exists to replace them with answers.

**The rule governing the dating family:** framed around **reading the other
person**, never technique applied to them. No lines that work, no closing, no
push-pull, nothing about getting a number. Noticing a no early is the skill.

**Family 1 · Dating** (five distinct problems; one "dating" message speaks to none of them)
| # | Persona | Trigger | Searches | Blend | Never |
|---|---|---|---|---|---|
| 1 | **The late starter** — little dating history, 20s | A friend's relationship; an app installed and deleted twice | *how to start dating with no experience*, *never been on a date* | high blue, low yellow | "still single?", anything implying he is behind |
| 2 | **Back after a long relationship** | The end of it; a friend suggesting an app | *dating after a long relationship*, *how to date again at 35* | green-dominant | beginner, learn, start over — he is resuming |
| 3 | **Great on apps, silent in person** | A third date that went nowhere after brilliant messaging | *good at texting bad in person* | yellow in writing, blue under pressure | framing texting as lesser — it is a real skill that does not transfer |
| 4 | **First-date freeze** — can get the date, cannot hold the middle | A date in the calendar this week | *what to talk about on a first date*, *first date awkward silence* | balanced, low green | scripts and question lists — that is what they already tried |
| 5 | **Reading interest** — over-corrects, pushes or leaves | A misread that was embarrassing | *how to tell if someone is interested*, *am I being too much* | high blue, high green | "signals she's into you" listicle framing |

*Persona 5 is the one the product is most uniquely built for — the partner's
disposition and guard are separately tunable. If you film only one, film that one.*

**Family 2 · Social**
| # | Persona | Notes |
|---|---|---|
| 6 | **Overcome shyness — Sam, 24** | full brief above |
| 7 | **Meeting new people — Tom, 26** | full brief above |

**Family 3 · Language**
| # | Persona | Trigger | Searches | Never |
|---|---|---|---|---|
| 8 | **Fluent on paper — Andrés, 29** | full brief above | | |
| 9 | **Newly relocated** — language fine, *cultural context* is not | Three months in, still no local friends | *how to make friends in a new country*, *small talk in [country]* | treating it as a language problem — it is a context problem, and saying so is the hook |

**Family 4 · Work**
| # | Persona | Trigger | Searches | Never |
|---|---|---|---|---|
| 10 | **Being heard — Arjun, 33** | full brief above | | |
| 11 | **Interviews and job search** — one performance, no second attempt | An interview booked for next week | *how to answer tell me about yourself*, *interview practice out loud* | promising outcomes. We do not get anyone a job. |
| 12 | **Client-facing and sales** — knows delivery costs deals, already measures things | A lost deal, a quota conversation | *sound more confident on sales calls*, *stop rambling on calls* | basics. This person does this professionally. |
| 13 | **Leading a team** — presence, not persuasion | A performance conversation they are dreading | *how to give difficult feedback*, *executive presence* | hacks, tricks, power moves |

*11 has the sharpest deadline of any persona and the highest willingness to pay per week.*

**Family 5 · Reset**
| # | Persona | Trigger | Searches | Never |
|---|---|---|---|---|
| 14 | **Out of practice — Claire, 38** | full brief above | | |
| 15 | **Remote-work isolation** — the *unstructured* part vanished, not the circle | A return-to-office week, a conference, a work social | *lost social skills working from home*, *awkward after remote work* | implying working remotely was a mistake |

### 6c · The colour model (segmentation inside a persona)
Not invented for marketing — it is the product's own `COLOR_TRAITS`, the same
four colours that drive the AI partner's behaviour and are stored per user.

| Key | Label | The respondent | Wants | Hates | Hex |
|---|---|---|---|---|---|
| red | **Direct** | Decides quickly, gets to the point. Would rather be told the thing than walked to it. | directness, brevity | filler, hedging, slow ramps | `#ff375f` |
| blue | **Analytical** | Wants the real reason and the specifics. Opens slowly, notices when someone is performing. | accuracy, specifics | hype, charm without substance | `#0a84ff` |
| yellow | **Expressive** | Runs on energy and story. Lights up when someone laughs with them. | energy, story, being seen | flatness, judgment, transactional talk | `#ff9f0a` |
| green | **Steady** | Takes time, considers people. Slow to open; walks away from anyone who rushes them. | patience, time to warm up | pressure, urgency, being pushed | `#30d158` |

**Use it like this:** the goal says *which problem*; the dominant colour says
*which version of it*. Two people who both pick "Reading interest" get the same
four moves and a materially different message. Example situation lines:
- *shyness + blue:* "You compose the whole sentence before you open your mouth, and the moment closes while you are still drafting."
- *practice + red:* "You get to the point and speed up under pressure, and the room stops following."
- *reset + yellow:* "You used to run on other people's energy, and there has been less of it around."

---

## 7 · SEO

### Architecture
Static Next.js 15 export → GitHub Pages → **improvtalk.vip**. One set of
components, five persona variants, server-rendered content (a hard rule: no
gating on in-view state — crawlers and answer engines read the exported HTML).

| Page | Primary query | Also targets | Priority |
|---|---|---|---|
| `/` | practise conversations out loud | conversation practice app · how to get better at talking to people · AI conversation practice | 1.0 |
| `/how-to-start-a-conversation/` | how to start a conversation | conversation openers · how to approach someone | 0.9 |
| `/second-language/` | practice speaking english out loud | english speaking practice app · how to stop translating in my head | 0.8 |
| `/meeting-people/` | how to start a conversation with a stranger | how to talk to new people · what to say when you meet someone | 0.8 |
| `/speaking-up/` | how to stop saying um | how to speak more clearly at work · why do I talk too fast when nervous | 0.8 |
| `/out-of-practice/` | out of practice talking to people | getting back into socialising · how to be social again | 0.8 |
| `/blog/` | — | hub | 0.7 |
| `/about/` | how the score works | 0.6 |
| `/survey/` | — | lead magnet | 0.6 |
| `/support/` `/privacy/` `/terms/` | — | trust | 0.3–0.5 |

### The four rules
1. **The query goes in the `<title>`, first; the brand goes last.** The layout appends `· ImprovTalk`, so page titles must not repeat it.
2. **The query has to appear in the body**, in a sentence a person would read. Not stuffed, not hidden, **no keyword meta tag** — ignored for twenty years and signals nothing but intent to game.
3. **One page per intent.** If two pages could rank for the same query, one is wrong. That is what the persona split is for.
4. **Never invent volume.** These are informed guesses until Search Console shows real impressions.

### The blog cluster — every post links up to its persona page, and back down
| Post | Query | Links to | Category |
|---|---|---|---|
| *The excuse, or straight in: two ways to open* | how to start a conversation with a stranger | `/meeting-people/` | Openers |
| *Break the ice: say hello in their language* | how to break the ice | `/meeting-people/` | Openers |
| *Notice one thing: the observation opener* | what to say to someone you just met | `/` | Attention |
| *Why you go blank, and what actually fixes it* | mind goes blank in conversation | `/` | Nerves |
| *How to practise speaking a language alone* | practice speaking english out loud | `/second-language/` | Languages |
| *How to stop saying "um"* | how to stop saying um | `/speaking-up/` | Delivery |

That reciprocal link is the point: before it, the four variant pages had nothing
distinguishing them from the homepage.

### Technical SEO — what was broken and what fixed it
1. **Never `Disallow` a `noindex` page.** `/get/` was both; they cancel out. A page Google may not fetch is a page whose noindex Google never reads — the result is "Indexed, though blocked by robots.txt", the exact outcome the Disallow existed to prevent. **`robots.txt` now disallows nothing.**
2. **Near-orphan pages do not get indexed.** `/out-of-practice/` had zero internal links. A footer "Practise for" column now gives all four a site-wide link; every sitemap URL has ≥4 internal links.
3. **`lastmod` must be the page's real last-commit date**, not the build timestamp — otherwise the sitemap claims seventeen pages changed on every deploy and stops being believed. Requires `fetch-depth: 0` in CI; a shallow clone silently collapses every date back to the build time. Blog posts keep their own `post.date`.
4. Self-referential canonicals everywhere; `www` and bare-`http` both 301 to the canonical host; clean `@graph` per page.

### Schema
`Organization` · `WebSite` · `SoftwareApplication` · `FAQPage` on all persona
pages · `HowTo` on the pillar page (**the `HowTo` string must match the visible
h1 exactly** — Google drops markup that does not) · `BlogPosting` · `VideoObject`
on the scenario films. **No `AggregateRating`.**

### Answer-engine optimisation (AEO)
- **`/public/llms.txt`** is maintained as a canonical machine summary: what the app is, how the score works, what is in it, privacy, pricing, status, and a linked page index. Keep it in sync with section 3a.
- **AI crawlers are explicitly allowed** in `robots.ts`, by name rather than by default: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, Bytespider, meta-externalagent. Google-Extended in particular is opt-in-by-absence in practice; naming it makes intent explicit.
- **IndexNow** reaches Bing and Yandex only. Google retired sitemap ping in 2023 — Google is reached through Search Console or through links.

### Deliberately not doing
No meta keywords tag · no location/doorway pages (no local intent) · no "X vs Y"
competitor page until there is something substantive to compare · no
`AggregateRating`.

### Still open (not code)
`site.googleSiteVerification` is empty — no verification meta tag in the HTML.
`site.socialProfiles` is empty — **no `sameAs` entity signal**, which is the
prerequisite for a knowledge panel. Fill it with real profiles only (App Store
page, LinkedIn, YouTube, Instagram, TikTok, X); an invented profile link is
worse for disambiguation than an empty list.

---

## 8 · Paid search (SEM)

### ⚠ Two preconditions before any spend
1. **TestFlight must be accepting testers.** Ads would send people to a page whose only action ends in "this beta isn't accepting new testers."
2. **There is no conversion history.** Smart Bidding has nothing to learn from. **Start on Manual CPC or Maximise clicks — not tCPA.**

### The brand problem
Searching *improvtalk* returns a different company: **ImprovTalk, Inc.
(Chicago)** on `improvtalk.com`, with Instagram, Facebook and YouTube profiles.
A third similar name, `improvetalk.com`, also ranks. And "improv" is a large
unrelated intent — improv comedy classes, troupes, theatre, games. **Verify that
in the search terms report in week one; if it is real it is the single biggest
source of waste in the account.**

Brand campaign keywords: `[improvtalk vip] [improvtalk app] [improv talk app]` ·
`"improvtalk conversation" "improvtalk practice"`
Brand negatives: `chicago, inc, podcast, improvetalk, comedy, class, classes,
theatre, theater, troupe, workshop, show, tickets, near me`

### Account-level negatives (shared list, every campaign)
- **Freeloaders:** `free, crack, cracked, apk, mod, modded, torrent, hack, unlimited, no subscription, without paying`
- **Jobs and study:** `job, jobs, career, careers, salary, hiring, vacancy, internship, thesis, dissertation, research paper, journal, pdf, ppt, worksheet, curriculum, lesson plan`
- **Wrong platform** *(remove `android` the day Android sign-in ships)*: `android, windows, pc, desktop, chromebook, web version, online free`
- **Wrong product:** `improv class, improv comedy, improv theatre, improv games, standup, stand up comedy, toastmasters, debate club, voice over, singing, accent reduction, elocution`
- **Clinical intent** *(we are a practice tool, not a treatment)*: `therapy, therapist, counselling, counseling, psychiatrist, medication, meds, diagnosis, disorder, cbt, autism, asperger, stutter, stammer, speech therapy, selective mutism`
- **Coercive intent** *(the app declines this and App Review reads the site)*: `pickup artist, pua, rizz, seduction, seduce, get laid, manipulate, mind games, how to get a girlfriend, tinder openers, dating app openers`

### Campaign structure
Five search campaigns, **one per persona**, each with a single ad group pointing
at its own landing page. Not one campaign with five ad groups — separate
campaigns give each persona its own budget, negatives and schedule, and the
personas differ more by hour than by day.

```
Campaign                Ad group            Landing page          Share
────────────────────────────────────────────────────────────────────────
IT · Speaking up        Fillers and pace    /speaking-up/          30%
IT · Second language    Speaking practice   /second-language/      25%
IT · Shy                Freezing            /                      20%
IT · Meeting people     First line          /meeting-people/       15%
IT · Out of practice    Getting it back     /out-of-practice/       5%
IT · Brand              Brand               /                       5%
```
Shares are **relative**, not absolute. Brand stays separate so its cheap clicks
never distort the reported CPA of the others.

**Why Speaking up gets the most:** the only persona who can expense the outcome,
and the one with genuinely commercial intent. **Second language:** large,
well-defined query space and a differentiator no competitor matches. **Shy:**
broadest audience, weakest commercial intent. **Meeting people:** cheap clicks,
strictest negatives, youngest audience. **Out of practice:** smallest volume,
treat as a test.

### Keywords and per-persona negatives

**01 · Shy → `/`**
Phrase: `"conversation practice app"` `"practice talking to people"` `"how to not freeze in conversation"` `"what to say when your mind goes blank"` `"social skills practice app"` `"practice conversations with ai"`
Exact (once phrase proves out): `[conversation practice app]` `[how to stop freezing in conversations]` `[app to practice talking to people]`
Negatives: `anxiety medication, social anxiety disorder, panic attacks, support group, quiz, test, am i shy`
*Why: he is self-conscious, not unwell.*

**02 · Second language → `/second-language/`**
Phrase: `"practice speaking english out loud"` `"english speaking practice app"` `"how to stop translating in my head"` `"speaking practice partner"` `"practice speaking spanish out loud"` `"ai to practice speaking english"`
Exact: `[english speaking practice app]` `[practice speaking english out loud]` `[app to practice speaking a language]`
Negatives: `beginner, for beginners, basics, a1, a2, alphabet, grammar test, ielts, toefl, cambridge, exam, certificate, translate, translation, dictionary, kids, children, free course`
*Why: he is C1 with a 400-day streak. Beginner and exam-prep terms are the largest single source of waste in this ad group.*
*Decide deliberately on `duolingo, babbel, busuu` — legal, sometimes sensible, expensive, strong brand defence. Default to excluding until the account has data.*

**03 · Meeting people → `/meeting-people/`**
Phrase: `"how to start a conversation with a stranger"` `"how to break the ice"` `"what to say to someone you just met"` `"how to talk to new people"` `"conversation starters with strangers"`
Exact: `[how to start a conversation with a stranger]` `[how to break the ice with someone]`
Negatives *(the strictest list in the account)*: `flirt, flirting, pickup, pick up line, pickup lines, rizz, game, dating, tinder, hinge, bumble, date, girlfriend, boyfriend, attract, seduce, texting, dm, opener for girls`

**04 · Speaking up → `/speaking-up/`**
Phrase: `"how to stop saying um"` `"how to speak more clearly"` `"filler words when speaking"` `"how to stop talking too fast"` `"practice for a presentation"` `"how to be more articulate"`
Exact: `[how to stop saying um]` `[how to stop saying like]` `[how to speak more clearly at work]`
Negatives: `shy, social anxiety, glossophobia, fear of public speaking, stage fright, toastmasters, speech therapy, stutter, elocution, accent`

**05 · Out of practice → `/out-of-practice/`**
Phrase: `"out of practice talking to people"` `"how to be social again"` `"getting back into socialising"` `"lost my social skills"` `"how to make conversation again"`
Exact: `[how to be social again]` `[out of practice talking to people]`
Negatives: `beginner, for beginners, learn to talk, basics, 101, teach me, how to talk to people for beginners, kids, teenager, student`

### Responsive search ads
15 headlines (≤30 chars), 4 descriptions (≤90). **Pin nothing at first** — let
the system learn; pin only if a required claim is being dropped.

**IT · Shy → `/`**
```
Practise talking, in private      Nobody hears you practise
Say it out loud first             Conversation practice app
Practice makes perfect            Try the same line 20 times
Free to start, no card            An AI that talks back
Three minutes a night             Find out what went wrong
Your phone, your room             Practise before it counts
Rehearse the hard bit             Not advice. Reps.
Talk to an AI, not a person
```
```
Talk to an AI on your phone. Nobody hears you. Try as often as you like.
Hold a button and speak. It answers back, then shows you what actually landed.
Free to start, no card. Three minutes is enough to feel the difference.
Practise the conversation before you have it, as many times as you need.
```

**IT · Second language → `/second-language/`**
```
Practise speaking out loud        English, Spanish or Russian
She won't switch to English       Speak, don't translate
Speaking practice, any time       Your grammar is fine
The gap is speaking, not words    Practise with no one around
An AI that waits for you          Free to start, no card
Say it wrong 20 times             Keep calm and talk
Stop rehearsing in your head      Fluent on paper, stuck aloud
Get your speed back
```
```
Reading is the easy part. Practise speaking out loud, as often as you like.
An AI that stays in your language even when you stall. That is the point.
English, Spanish or Russian. Your pace and pauses measured from the recording.
Free to start, no card. The app menus are English; the conversation is not.
```

**IT · Meeting people → `/meeting-people/`**
```
Practise the first line           Break the ice, in private
Say it before it counts           The first 30 seconds
Try an opener 20 times            Warm up before you go out
An AI that answers back           She can say no
Free to start, no card            Practise talking to strangers
Not a script. Reps.               Two goes before you leave
Read the room better              Openers you can rehearse
Nobody hears you practise
```
```
Try the first minute on your phone, twenty times if you want, before it counts.
She answers back, and sometimes she is not interested. Noticing that is the skill.
Free to start, no card. Two goes before you head out is enough to feel it.
Practise the opener, the exit, and everything awkward in between.
```

**IT · Speaking up → `/speaking-up/`**
```
Seven ums in three minutes        Stop saying um
Hear how you actually sound       Practise the hard meeting
Your pace, measured               Not a rating. A number.
Practise before the meeting       Filler words, counted
Nobody at work will tell you      Say what you mean
Words per minute, measured        Rehearse difficult feedback
Free to start, no card            Fix it before Monday
Measured, not guessed
```
```
Your speed, your pauses and your filler count, measured from the recording.
Practise the hard conversation on your phone first, and hear how you sound.
Not a mark out of ten. Real numbers, with the working shown for each one.
Free to start, no card. Three minutes the night before the meeting.
```

**IT · Out of practice → `/out-of-practice/`**
```
It comes back quickly             You did not lose it
Get back in practice              Like riding a bike
Three minutes a day               You used to be fine at this
Warm up before you go out         Nothing changed about you
An AI that talks back             Free to start, no card
Week six against week one         Practise in private
You have done this before         Say yes to things again
Your circle got smaller
```
```
You used to be fine at this. A few short goes and most of it comes back.
Nothing changed about you. Only how often you get to practise. Start there.
Three minutes a day, in private. Watch week six against week one.
Free to start, no card. This is practice, not tuition.
```

### Extensions
**Sitelinks:** How it works `/#how` · How the score works `/about/` · How to
start a chat `/how-to-start-a-conversation/` · Privacy `/privacy/`
**Callouts:** Free to start · No card needed · Nobody hears you · Three languages
· Recordings not stored · iPhone
**Structured snippet** (Type: *Features*): Live practice, Scenario simulator,
Delivery scoring, Solo drills, Reference library
**Do not use** price, promotion or location extensions. There is no published
price, no promotion and no location.

### Launch sequence
1. Do not launch while the beta is closed.
2. **Week 1:** Brand + Speaking up only. Small budget, phrase match, manual CPC. Read the search terms report **daily**, add negatives.
3. **Week 2:** add Second language, once the negatives have absorbed week one's beginner and exam queries.
4. **Week 3:** add Shy and Meeting people. Meeting people's negative list gets checked **before** it runs, not after.
5. Out of practice last, as a test, once you know your real CPC.
6. Only after ~30 conversions: consider Maximise conversions or tCPA.

### What to watch
**`testflight_click` per campaign — not clicks, not CTR.** A campaign with great
CTR and no installs is buying the wrong intent. **The search terms report is the
whole job in month one** — budget an hour a week. Every keyword list above is a
hypothesis; that report is the only thing that turns them into facts.

---

## 9 · Organic social

### Platform plan
**TikTok primary. Instagram Reels as a repost. Facebook for Claire. YouTube
Shorts once a format proves out.** The same 9:16 asset serves all of them — the
cost is not production, it is posting and reading analytics three times over.

| Platform | Role | Personas |
|---|---|---|
| **TikTok** | Primary | Sam, Tom, Andrés — the only place an unknown account still gets distribution without followers |
| **Instagram Reels** | Repost, clean export | Claire, Sam. **Never cross-post with the TikTok watermark** |
| **Facebook** | Reels + feed | **Claire.** The one persona whose age genuinely sits there; cheapest CPMs |
| YouTube Shorts | Week 5+ | Andrés first. Shorts rewards repetition — start with a format that already works |
| LinkedIn | Later | Arjun. Different asset (1:1, burned-in captions) and a different habit |
| Reddit | Ongoing | Sam (r/socialskills, r/socialanxiety); Claire via life-change subs, not r/socialskills |

**Cadence:** 4–5 posts a week, all under 15 seconds. Post 20:00–23:00 local,
then per-persona times from section 6a.

### Profiles
| Field | TikTok / Instagram | Facebook |
|---|---|---|
| Handle | `@improvtalk` if free — note the Chicago company holds `improvtalk.com` and several handles | same |
| Name | ImprovTalk · Practise conversations | ImprovTalk |
| Bio | Practise real conversations out loud. Nobody hears you. iPhone, free to start. | same |
| Link | `improvtalk.vip/?utm_source=<platform>&utm_medium=bio&utm_campaign=awareness` | same |
| Category | Education / App | App Page |

**Pin the best-performing script once you have three weeks of data — not before.**

### The fifteen scripts (three per persona, each on a different structure)
Structures used: **Problem recognition · Contrarian · Open loop · Demonstration
· Pattern interrupt.** Three per persona on different structures so a feed of
them does not read as one template. **None of them use a voiceover** — the
silence is usually the point, and on-screen text carries the reframe.

| ID | Persona | Structure | Hook | UTM content |
|---|---|---|---|---|
| S1 | Sam | Problem recognition | *You will think of the perfect reply at 1am.* | `shy_1am` |
| S2 | Sam | Contrarian | *You are not bad at talking. You have never practised.* | `shy_never_practised` |
| S3 | Sam | Open loop | *There is a reason the words come back at 1am.* | `shy_two_jobs` |
| L1 | Andrés | Problem recognition | *He had the answer. In his head. In time.* | `lang_lunch_table` |
| L2 | Andrés | Demonstration | *C1 on paper. Three words out loud.* | `lang_c1_three_words` |
| L3 | Andrés | Contrarian | *400 days of vocabulary. Zero hours of talking.* | `lang_400_days` |
| T1 | Tom | Open loop | *Four minutes after they walk away, you will know what to say.* | `social_four_minutes` |
| T2 | Tom | Pattern interrupt | Walks over confidently — then reveals he never moved | `social_rewind` |
| T3 | Tom | Problem recognition | *You get one go. Nobody practises the one go.* | `social_one_go` |
| A1 | Arjun | Demonstration | *Seven "um"s in three minutes. Now you know.* | `speak_seven_ums` |
| A2 | Arjun | Contrarian | *You did not lose the argument. You lost the room.* | `speak_lost_the_room` |
| A3 | Arjun | Problem recognition | *Nobody at work will ever tell you how you sound.* | `speak_nobody_tells_you` |
| C1 | Claire | Pattern interrupt | Loud party, hard cut to a silent flat | `rusty_room_got_quiet` |
| C2 | Claire | Contrarian | *You did not lose it. You just stopped using it.* | `rusty_stopped_using_it` |
| C3 | Claire | Open loop | *Nothing changed about you. Something else did.* | `rusty_fewer_chances` |

**Two worked examples, complete:**

> **S1 · Problem recognition · 10s**
> **Prompt:** Cinematic close-up, 9:16 vertical. A man in his early twenties lies awake in a dark bedroom, the only light a phone screen face-down beside him throwing a faint glow across the ceiling. He stares upward, eyes open, replaying something. Very slow push-in. Muted blue-grey palette, shallow depth of field, 35mm, soft film grain. Still camera, no shake. Room tone only — no music, no speech.
> **On-screen:** 0.0s *(hold on the face — no text)* · 4.5s "You thought of the perfect reply." · 7.0s "Four hours late."
> **VO:** none — a voiceover would fill the gap the video is about.
> **End card:** brand gradient · "Practice makes perfect." · Get early access
> **Why:** recognition beats persuasion for this persona, and the first frame is the moment rather than a claim about it.

> **A1 · Demonstration · 15s**
> **Prompt:** Cinematic 9:16 vertical. A glass-walled meeting room, six people around a pale table in cool daylight. A man in his early thirties presents at the head of the table, speaking quickly and gesturing more than he needs to. Static tripod with a very slow push-in. Clean corporate palette, realistic, 50mm. Muffled speech and room tone, no intelligible dialogue.
> **On-screen:** 1.0s "um" · 3.0s "um · um" · 6.0s "um · um · um · um" · 9.5s "Seven. In three minutes." · 12.0s "Nobody was ever going to tell you."
> **End card:** brand gradient · "Say what you mean." · Get early access
> **Why:** only we can run this honestly — filler density is measured from the recording, not guessed. The counter is the product in one shot.

### Generation house style
Everything is generated. Four scenario films already exist and set the look:
**cinematic, warm, naturally lit, handheld or near-static, no dialogue.** Every
new generation matches those or the feed and the site stop looking like one product.

**Prompt skeleton — six things, in this order:**
```
Cinematic [ASPECT]. [SUBJECT — age, what they are doing, what they are not doing].
[SETTING and LIGHT]. [CAMERA — handheld / static / slow push-in].
[LENS and GRADE — 35mm or 50mm, palette, grain]. [AUDIO — ambience, no dialogue].
```

| Do | Never |
|---|---|
| Natural and practical light — windows, lamps, screens | Studio key light, ring light, flat product lighting |
| 35mm for intimate, 50mm for rooms | Wide-angle distortion, drone, whip pans |
| Handheld with small movement, or a slow push-in | Fast cuts, zooms, speed ramps, motion graphics |

**End card, last 3 seconds:** the available light washes into the brand gradient
at 100° (`#FF9500 → #FF2D55 at 36% → #AF52DE at 68% → #5856D6`), settling to
`#070C17`, room tone continuing underneath — **never cutting to silence**. Keep
the centre third uncluttered through the wash.

**Never let the model render the logo or any text.** Every prompt ends by
forbidding text and marks; the icon and wordmark are composited afterwards. A
generated wordmark comes back subtly wrong every time, and wrong is worse than absent.

**Casting:** every persona gets two clips — **A · the rep** (alone, phone in
hand, practising, nobody watching — this is the product) and **B · the real
thing** (the same person in the setting they care about, doing one specific
rapport beat — this is the payoff). Keep the same face across a persona's two
clips: generate A, keep the best frame, feed it back as a reference for B.
**These are fictional composites — no clip is ever captioned as a testimonial.**

---

## 10 · Measurement

### What counts as a conversion
**Leaving the site for TestFlight. That is the whole model.** There is no email
capture — a signup form is a promise to answer an inbox nobody was going to
answer, and it cost a conversion to acquire an obligation. An iPhone visitor can
install in about a minute.

| Step | Event | Count it as |
|---|---|---|
| Sees the page | `page_view` | traffic |
| Watches a scenario | `scenario_play` | engagement |
| Opens the install panel | `notify_click` / `qr_reveal` | **interest** |
| Leaves for TestFlight | `testflight_click` | **the conversion** |
| Actually installs | — | **not measurable here** |

**`notify_click` is never a conversion.** It opens a panel; it costs nothing and
commits to nothing. Useful only as a denominator. If it drives bidding, Google
will find you thousands of people who open it and leave. In Ads it is
**Secondary** — recorded, never used for bidding.

### IDs and events
```
GA4          G-TQHK0W81XE
Google Ads   AW-18052428576
Conversion   AW-18052428576/4jb2CJySoescEKDmiKBD   "Early access signup" (Sign-up, Primary)
```
Events: `testflight_click` · `notify_click` · `qr_reveal` · `scenario_play` ·
`survey_start` · `survey_step` · `survey_complete` · `tips_popup_shown` ·
`tips_popup_start` · `tips_popup_dismiss` · `tips_download`.
Every event carries `variant`; it is also a GA4 user property.

**Settings that matter:** Leave conversion values equal — nothing is being
bought and an invented value distorts bidding toward the fiction. Keep
**Sign-up** as the only account-default goal. **Enhanced Conversions stays OFF**
— automatic mode scraped the support email off the page and hashed it as every
visitor's identity. Conversions need `transaction_id`; Ads' Count:One dedupes
only per ad click, which does nothing for organic traffic.

### UTM conventions
| Parameter | Answers | Example |
|---|---|---|
| `utm_source` | Which platform | `instagram`, `tiktok`, `youtube` |
| `utm_medium` | What kind of traffic | `social`, `cpc`, `email`, `bio` |
| `utm_campaign` | Which push | `launch`, `beta_sep` |
| `utm_content` | **Which specific post or ad** | `reel_cafe`, `shy_1am` |

Rules: **lowercase everything** (GA4 treats `Instagram` and `instagram` as two
sources and you cannot merge them later) · underscores, not spaces · **never tag
Google Ads links** (auto-tagging's `gclid` gets overwritten and attribution
breaks) · **never tag internal links** (starts a new session and destroys the
original attribution) · do not tag organic search.

**Upwork** is `utm_source=upwork&utm_medium=referral&utm_campaign=portfolio`
with `utm_content=profile` on the profile link and `case_study` on the project
page — `referral`, not `social`, so GA4 files it where a marketplace profile
belongs. Set up a custom channel group in GA4 (Admin → Data display → Channel
groups: Upwork, Paid search, Google organic, then one channel per network by
source) and read Traffic acquisition by that group; `docs/UTM-LINKS.md` has the
exact rules.

Persona URLs take UTMs the same way, and traffic sent to a variant URL is never
reassigned by the split:
```
https://improvtalk.vip/meeting-people/?utm_source=tiktok&utm_medium=social&utm_campaign=launch
https://improvtalk.vip/speaking-up/?utm_source=linkedin&utm_medium=social&utm_campaign=launch
```

### A/B testing
`ACTIVE_SPLIT` is currently **one arm — paused on purpose**. Two reasons: the
redirect ran before hydration with no bot exclusion, so Googlebot had a 50%
chance of being bounced from `/` to a page that was itself noindex; and
separating two arms needs **1,500–3,000 visitors each**, two orders of magnitude
above current traffic. A five-way split would need 10–15k and one arm would look
like a winner by chance. Re-add a challenger once volume justifies it, and make
the variants noindex again in the same commit.

**Message match, not significance, is what the four campaign pages are for.**
One ad group per persona pointing at its own page pays off immediately and needs
no statistical power.

---

## 11 · The content engine

### The lead magnet — `/survey/` and the generated tips PDF
Two questions (family, then persona inside it), plus a four-slider colour blend,
age band, gender and country. **"Type your situation" is always the last
option**, so nobody is forced into a category that is not theirs; it resolves to
Socialising, and the free text is the more valuable output — **read those
answers monthly, they are where persona sixteen comes from.**

The deliverable is a **three-page PDF generated in the browser from the
answers**, not one of six pre-written files:
- **Page 1:** the situation said back to them, plus four moves.
- **Page 2:** a practice plan — three real app scenarios in the order to do them, with difficulty and tier, plus the opener and steering angle for that person.
- **Page 3:** four principles for their dominant colour, the presence/power/warmth core, and where they are in a conversation.

**Why generated:** the goal says which problem and the colour says which version
of it. A file per goal throws the second signal away.

**Two things do not cross over from the app's engine:** (1) **no names** — the
knowledge-base files are titled after the works they distil, and the
distillation is ours while the material is not; (2) **two of the eleven opener
strategies are withheld-tease patterns** built on backhanded compliments about
appearance — weight 0 in the app, and **not on the site at all.** The published
line is that noticing a no early is the skill.

**The opener is goal-aware, not just colour-aware.** Nobody opens a leadership
review with a small favour, so the work family gets "answer first, then the
reasoning" instead.

### The timed offer popup
Opens **once**, after **50 seconds of visible reading accumulated across pages**
(not per page — the site is a static export, so every navigation is a fresh
document and a per-page timer would never fire). Only *visible* time counts.
Offer screen is **157 characters**: heading, one line, three checks (no email /
no sign-up / free PDF), one button.

Rules it must not break: never on `/survey/` · never over another dialog (the
install panel is the conversion) · a backdrop click only closes the offer
screen, never a started form. Closing is permanent, across sessions.

**One flagged item:** the heading says *"you have been selected"*. Everyone who
reads for 50 seconds sees it, so nobody has been selected in any real sense.
Changing one word — *"You are invited"* — makes it true if App Review or a
consumer-protection question lands on it.

### The four scenario films
Self-hosted deliberately: no cookies, no third-party data transfer, so no
consent banner and nothing to add to the privacy policy. An embedded YouTube
player would send the visitor's IP to Google on page load, which in the EU needs
prior consent.

| Slug | Caption |
|---|---|
| coffee-shop | The queue. Thirty seconds of shared waiting, and an opening if you take it. |
| bali-beach | Somewhere nobody knows you. The easiest place to practise and the easiest to freeze. |
| barcelona-beach | A busy shoreline, a group, and the problem of joining a conversation already running. |
| gym | Between sets. Short windows, high stakes, and the worst place to be long-winded. |

---

## 12 · Compliance and guardrails

1. **App Review reads this site.** It is linked from the app. Any creative
   promising seduction, manipulation or "lines that work" contradicts the
   product it is selling and risks the review.
2. **The dating and meeting-people families stay PG-13 and non-manipulative.**
   Two adults, both with agency, nobody worn down.
3. **Never-lists are binding, not stylistic.** They apply to captions,
   voice-over, ad copy, landing pages and emails. The wrong frame makes the
   content about somebody else.
4. **No clinical framing and no clinical targeting.** We are a practice tool,
   not a treatment, and should not appear against people looking for one.
5. **No testimonials, no reviews, no ratings, no before-and-afters.** None exist.
6. **No unsourced research statistics.** Do not restate research we have not read.
7. **The privacy policy is a legal document.** It now describes an IP-hash
   de-duplication that genuinely happens (hashed inside Postgres with a private
   salt — the browser never sees or sends an IP). Do not describe an audio
   retention window until the app-repo policy and the code are reconciled.
8. **`/terms` has never been lawyer-reviewed.** Written from scratch.
9. **Accessibility is a brand rule here.** White on the full brand gradient
   measures 2.20:1; the CTA uses a separate ramp with a 4.60:1 worst point. The
   pulse animation is on the install CTA only — never on a consent Accept
   button, which would be a consent dark pattern.

---

## 13 · Open items blocking growth

| # | Item | Owner |
|---|---|---|
| 1 | **Beta App Review is the launch blocker.** Test Information needs a **demo account** — reviewers cannot pass the sign-in without one. | product |
| 2 | Register `variant` as a GA4 custom dimension (Admin → Custom definitions, scope User). Only applies to data collected after creation. | analytics |
| 3 | Create the `Install intent` conversion action (Engagement, Secondary). `CONVERSIONS.notifyClick` is empty and guarded. | ads |
| 4 | `site.googleSiteVerification` is empty — no verification meta tag. | seo |
| 5 | **`site.socialProfiles` is empty — no `sameAs` entity signal**, and no social accounts exist yet. This is the single largest unclaimed SEO and brand asset. | seo / social |
| 6 | Recount the disputed numbers in §3b before any campaign uses them. | product |
| 7 | Fix the paywall `/day` label on weekly SKUs — a refund complaint and an App Review risk. | product |
| 8 | No push notifications at all (`expo-notifications` is not a dependency). Notify on each persona's own rhythm, not a daily nag. | product |
| 9 | The share button on the score result is a disabled stub — it is the only viral loop available. | product |
| 10 | No onboarding questionnaire. Two questions ("what are you practising for?", "when will you practise?") would pick the starting track and the notification rhythm. | product |

---

## 14 · Quick reference — the whole thing in twenty lines

- **Product:** voice-first AI conversation coach, iPhone, TestFlight beta, improvtalk.vip
- **Category:** conversation practice. Not improv comedy, not public speaking, not dating.
- **Hook:** practise the conversation before you have it, as many times as you need, where nobody hears you.
- **Moat:** half the score is DSP measurement, not a model's impression — and we say which half.
- **Second moat:** three conversation languages; the partner can decline.
- **Free tier:** 3 conversations a week. No price is ever published.
- **Audiences:** Sam 24 (freezes) · Andrés 29 (fluent on paper) · Tom 26 (first line) · Arjun 33 (loses the room) · Claire 38 (out of practice). Behind them, fifteen.
- **Segmentation inside a persona:** four colours — Direct, Analytical, Expressive, Steady.
- **Canonical page:** `/` for Sam. Four campaign pages, one intent each.
- **SEO:** one page per intent, query in the title first and in the body; blog cluster links up to its persona page and back down; llms.txt maintained; AI crawlers explicitly allowed.
- **Paid:** five campaigns, one per persona, own landing page and own negatives. Speaking up 30%, Second language 25%, Shy 20%, Meeting people 15%, Out of practice 5%, Brand 5%.
- **Bidding:** manual CPC until ~30 conversions. Never launch while the beta is closed.
- **Social:** TikTok primary, Reels repost, Facebook for Claire, LinkedIn for Arjun. 4–5 posts a week, under 15 seconds, 20:00–23:00.
- **Creative:** cinematic, natural light, no dialogue, no voiceover, on-screen text carries the reframe, brand gradient on the end card only.
- **Conversion:** `testflight_click`. Everything else is a denominator.
- **Voice:** competent and stuck, not broken. Plain words. Familiar sayings as headlines. No emoji, no exclamation marks.
- **Universal never:** confidence, charisma, transform, cure, overcome, beginner *(to Claire and Andrés)*, anxiety *(to Arjun)*, rizz/pickup/seduce *(anywhere)*.
- **Universal never, factual:** a price, a translated interface, an audio retention window, a testimonial, a number nobody counted.
- **The brand risk:** ImprovTalk, Inc. (Chicago) owns the `.com` and the handles, and "improv" pulls comedy-class intent. Negatives from day one.
- **The launch blocker:** the TestFlight demo account for App Review.

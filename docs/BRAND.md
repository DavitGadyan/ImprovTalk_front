# Brand and social playbook

Colour tokens live in [`BRAND-AND-VIDEO.md`](BRAND-AND-VIDEO.md), generated from
`app/globals.css`. This is the layer above that: what the brand says, where it
says it, and how we find out whether any of it worked.

## Positioning statement

> **ImprovTalk is a voice-first conversation coach for iPhone.** It is for
> people who are fine on paper and stuck out loud — someone who freezes at the
> lunch table, blanks in a second language, or watches a meeting stop listening.
> Unlike apps that score you on a model's impression of how you sounded, **half
> of our score is measured from the recording itself** — pace in words per
> minute, pause length, filler density — and we say which half is which.

Three claims, all verified in code, none of them aspirational:

- **Measured, not guessed.** `vocal_delivery.py` — Praat pitch, WPM from Whisper
  timings, filler density per 100 words. 25% of the headline score.
- **Three conversation languages.** English, Spanish, Russian. The app's menus
  are English; we say so.
- **A partner with agency.** She can decline, and a soft or hard no is a scored
  outcome rather than a failure state.

## Voice

| Say | Never |
|---|---|
| Practise, reps, out loud, measured | Confidence, charisma, transform, cure |
| The specific moment — the lift, the lunch, the standup | "Social anxiety", "overcome your fear" |
| Numbers we counted | Numbers we did not count |
| "Nobody hears you" | "Become the person who…" |
| What we do not claim | Testimonials we do not have |

Second person, present tense, short sentences. No exclamation marks. The reader
is competent and stuck, not broken.

**Per-persona never-lists** are in each script PDF and in `docs/sem/src/sem.mjs`.
They are not stylistic: the wrong frame makes the content about somebody else,
and for Meeting people it is also an App Review risk.

## Visual system for social

- **Background:** `#0B1220` canvas, or `#070C17` for video bands. Never white.
- **One accent per topic**, borrowed from the app's own palette — the same hues
  the blog cards use: openers `#FF2D55`, attention `#FF9F0A`, nerves `#BF5AF2`,
  languages `#0A84FF`, delivery `#30D158`.
- **The brand gradient appears three times as chrome and no more.** On social
  that means the end card only.
- **Type:** Inter Tight for anything large, Inter for body. Both are in
  `public/fonts/`.
- **Safe areas:** keep text out of the bottom 20% and right 15% of a 9:16 frame
  — TikTok's caption and button rail sit there. On-screen text under 60
  characters per card, which the script validator enforces.
- **Logo:** `public/icon.png`, the same mark as the App Store icon. Do not
  redraw it, do not put it on a light background, do not add a wordmark lockup
  that the app does not also use.

## Where to post

**TikTok primary. Instagram Reels as a repost. Facebook for Claire. YouTube
Shorts once a format proves out.**

The same 9:16 asset serves all of them — the cost is not production, it is
posting and reading analytics three times over as one person.

| Platform | Role | Personas |
|---|---|---|
| **TikTok** | Primary | Sam, Tom, Andrés — the only place an unknown account still gets distribution without followers |
| **Instagram Reels** | Repost, clean export | Claire, Sam. Never cross-post with the TikTok watermark |
| **Facebook** | Reels + feed | **Claire.** The one persona whose age genuinely sits there, and the cheapest CPMs of the three |
| YouTube Shorts | Week 5+ | Andrés first. Shorts rewards repetition, so start it with a format that already works |
| LinkedIn | Later | Arjun. Different asset (1:1, burned-in captions) and a different habit |

**Cadence:** 4–5 posts a week, all under 15 seconds. Post 20:00–23:00 local.

## Profiles

| Field | TikTok / Instagram | Facebook |
|---|---|---|
| Handle | `@improvtalk` if free — note the Chicago company already holds `improvtalk.com` and several handles | same |
| Name | ImprovTalk · Practise conversations | ImprovTalk |
| Bio | Practise real conversations out loud. Nobody hears you. iPhone, free to start. | same |
| Link | `improvtalk.vip/?utm_source=<platform>&utm_medium=bio&utm_campaign=awareness` | same |
| Category | Education / App | App Page |

Pin the best-performing script once you have three weeks of data — not before,
because you do not yet know which it is.

## On-brand and off-brand

**On-brand.** A ten-second shot of someone lying awake, the line *"You thought
of the perfect reply. Four hours late."*, and an end card. It names one specific
moment, claims nothing, and the product appears last.

**On-brand.** A counter ticking "um · um · um" over a meeting room, resolving to
*"Seven. In three minutes."* It is a real measurement we actually take.

**Off-brand.** "Transform your confidence in 30 days." Three violations at once:
a claim we cannot support, a promise about a person rather than a skill, and a
timeframe with no data behind it.

**Off-brand.** Any before-and-after face, any "lines that work", any testimonial.
We have no reviews yet, and inventing them is a policy violation and a lie.

**Off-brand.** A post about the app's features. Nobody on TikTok is looking for
a feature list; they are looking for the moment they recognise.

## Generated content — the house style

Everything we shoot is generated. Four scenario films already exist in
`public/scenarios/` and they set the look: cinematic, warm, naturally lit,
handheld or near-static, no dialogue. **Every new generation matches those or the
feed and the site stop looking like one product.**

### The prompt skeleton

Every Seedance prompt names six things, in this order. A prompt missing any of
them produces mush, and the script validator checks for four of them.

```
Cinematic [ASPECT]. [SUBJECT — age, what they are doing, what they are not doing].
[SETTING and LIGHT]. [CAMERA — handheld / static / slow push-in].
[LENS and GRADE — 35mm or 50mm, palette, grain]. [AUDIO — ambience, no dialogue].
```

Worked example, from script S1:

> Cinematic close-up, 9:16 vertical. A man in his early twenties lies awake in a
> dark bedroom, the only light a phone screen face-down beside him. Very slow
> push-in. Muted blue-grey palette, shallow depth of field, 35mm, soft film
> grain. Room tone only — no music, no speech.

### Rules for the look

| Do | Never |
|---|---|
| Natural and practical light — windows, lamps, screens | Studio key light, ring light, flat product lighting |
| 35mm for intimate, 50mm for rooms | Wide-angle distortion, drone, whip pans |
| Handheld with small movement, or a slow push-in | Fast cuts, zooms, speed ramps, motion graphics |
| Muted palettes; one warm or cool cast per scene | Saturated grading, teal-and-orange, neon overlays |
| One subject doing one thing | Crowds of actors performing an emotion |
| Ambient sound, usually no music | Voiceover, stock uplifting music, sound effects |
| A moment before or after the thing | The thing itself, dramatised |

### Casting and behaviour

Ages are fixed by persona — early twenties for Sam, late twenties for Andrés,
mid twenties for Tom, early thirties for Arjun, late thirties for Claire. Vary
everything else; five videos of the same-looking person reads as one campaign
rather than five people.

**Nobody performs.** The whole style is people not saying something. Direct the
generation toward stillness, hesitation and small gestures — an opened mouth
that closes, a glance away, headphones going back in. Generated video is bad at
subtlety and will drift toward mugging unless the prompt pins it down.

**Nothing sexual, nothing coercive, nobody under 18-looking.** This is the app's
own guardrail, not a style preference, and App Review reads the site the videos
point at.

### Reject a generation if

- Anyone looks directly at camera and performs an emotion
- There is a smile that the moment does not earn
- It looks like a commercial — glossy, evenly lit, resolved
- Hands or faces are mangled, which generated video still does
- It could be stock footage for any app at all
- The subject reads as noticeably younger than the persona

Regenerate rather than settle. The prompt is cheap; a video that looks like an
advert costs you the hook.

### Text, thumbnails, and stills

- On-screen text: Inter Tight, white on a soft dark scrim if the plate is busy.
  Under 60 characters a card, out of the bottom 20% and right 15%.
- Never put text over a face.
- Thumbnails and covers: pull a frame from the video itself, do not generate a
  separate image. A cover that is not in the video is a small lie and it shows.
- Stills for the blog and the site follow the same rules — the blog cards
  already use frames pulled from these films rather than stock.

### Disclosure

**TikTok and Meta both require realistic AI-generated content to be labelled.**
TikTok has an AI-generated content toggle in the post editor; Meta has one on
Reels. Use them. The penalty for not labelling is distribution suppression or
removal, which costs more than the label does — and a product built on honest
measurement should not be quietly synthetic about its own footage.

## Measuring it — the actual point of this phase

The goal of awareness here is not followers. It is **traffic to test with, and
enough signal to know which channel, which content and which persona is worth
more effort.** Set this up before the first post, because you cannot backfill it.

### Per-video attribution

Every one of the 15 scripts carries its own `utm_content`, and each points at
its persona's landing page. That gives you two dimensions for free:

```
improvtalk.vip/second-language/?utm_source=tiktok&utm_medium=social
  &utm_campaign=awareness&utm_content=lang_400_days
```

- **`utm_source`** → which platform performed
- **`utm_content`** → which *video* performed, not just which platform
- **Landing page** → which persona performed

Read it in GA4 under **Reports → Acquisition → Traffic acquisition**, then add
*Session manual ad content* as a secondary dimension. Rules for keeping the data
usable are in [`UTM-LINKS.md`](UTM-LINKS.md) — lowercase everything, and never
tag a Google Ads link.

### What to compare, and when

| When | Question | Where |
|---|---|---|
| Daily, week 1 | Did the hook hold? **Hook rate at 3s** | TikTok/IG native analytics |
| Weekly | Which video sent traffic? | GA4 · `utm_content` |
| Weekly | Which persona page held them? | GA4 · Landing page + engagement rate |
| Week 4 | Which platform is worth doubling? | GA4 · Session source/medium |
| Week 4+ | Who are these people? | GA4 · Demographics |

**Week one is hook rate, not views and not follows.** Everything downstream is
gated on whether the first two seconds hold, and that number is available the
morning after you post.

### Turning on demographics

Age, gender and interest reports are **off by default** in GA4 and will stay
empty until you enable them:

**Admin → Data collection and modification → Data collection → Google signals →
turn on.** Also switch on *User-provided data collection* only if you actually
collect an identifier, which we do not.

Two honest caveats:

- **Google applies thresholds.** Below a certain volume, demographic rows are
  withheld entirely to prevent identifying individuals. Expect blanks until
  traffic is real.
- **Our consent default is denied.** Most first-time visitors are a cookieless
  ping until they accept, and cookieless pings do not carry demographics. Your
  demographic sample will skew toward people who clicked Accept. That is the
  correct legal posture, and it is a real limit on the data — worth knowing
  before you draw conclusions from a small sample.

**Location** needs nothing switched on. It is in *Reports → User → User
attributes → Demographic details*, and it is the one demographic dimension that
will populate early.

### Feedback, not just numbers

Traffic tells you what happened, not why. Two cheap channels:

- **Comments on the posts themselves.** The objection that repeats is the one
  worth answering — usually in the next script, sometimes on the landing page.
- **`support@improvtalk.vip`.** Already on every page. Confirm that mailbox
  actually receives mail before you drive traffic to it.

**The blocker remains the beta.** TestFlight is still closed to new testers, so
today every one of these videos would send someone to a page whose only action
ends in *"this beta isn't accepting new testers."* Traffic without a working
install path teaches you about hooks and nothing about the product.

## Four-week calendar

Five scripts a week, one per persona, so every persona gets tested before any of
them gets doubled down on.

| Week | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| 1 | S1 · 1am | L1 · lunch table | T1 · four minutes | A1 · seven ums | C1 · room went quiet |
| 2 | S2 · never practised | L2 · C1 on paper | T2 · rewind | A2 · lost the room | C2 · stopped using it |
| 3 | S3 · two jobs | L3 · 400 days | T3 · one go | A3 · nobody tells you | C3 · fewer chances |
| 4 | Repost the top three from weeks 1–3 to Reels and Facebook, then write three new scripts in whichever structure won |

Do not judge a script on one post. TikTok distribution is noisy enough that the
same video can do 400 views and 40,000 a week apart — which is why week four
reposts rather than concludes.

# CharmXP — where we actually stand, and what to build

Researched 2026-09-02 from charmxp.com, their App Store listing, and a line-by-line
inventory of our own mobile app and API. Every claim about our product below is
cited to code, not to marketing copy or docs — several of our own docs turned out
to be stale.

## The verdict

**We are ahead on technology and behind on distribution.** Nothing in their app is
harder to build than what we already shipped. What they have that we do not is a
store listing, 2,300 ratings, and a habit loop.

That framing matters, because the instinct on seeing their site is to copy the
gamification. The gamification is not why they are winning.

| | CharmXP | ImprovTalk |
|---|---|---|
| Shipped | App Store + Google Play, 4.4★, 2.3K ratings | TestFlight only, link closed to new testers |
| Conversation languages | English only (per their App Store listing) | **English, Spanish, Russian** |
| Delivery scoring | "your coach hears tone, pace, filler words" — LLM-inferred | **Measured by DSP**: Praat F0, WPM from Whisper timestamps, pause ratio, filler density, loudness steadiness |
| Scenario surface | "voice roleplay scenarios", count not stated | **111 live + 210 simulator across 19 venues** |
| Reference depth | none | **2,766 items across 25 catalogs** |
| Ways to be scored | roleplay only | **four**: live practice, AI-vs-AI simulator, upload a real recording, describe a conversation in text |
| Partner realism | one coach persona | mood / disposition / defensiveness / DISC blend / 195 nationalities and accents; **she can decline, and a soft or hard no is a scored outcome** |
| Habit loop | XP, levels, streaks, daily challenges, courses | bare streak; leaderboard buried in Stats; share button is a **disabled stub** |
| Reminders | yes | **none** — `expo-notifications` is not even a dependency |
| Pricing | Weekly / Monthly / Annual | Weekly only, and the paywall renders "€4 **/day**" on a weekly SKU |

## The three things to fix first

### 1. Ship, and fix the paywall bug on the way

`apps/mobile/app/upgrade.tsx:29-30` says the prices are EU placeholders. The SKUs
are `…premium.weekly` / `…max.weekly` (`src/billing/products.ts:8-11`) but the UI
labels them `/day`. That is a refund complaint and an App Review risk, and it is a
one-line class of fix.

Add Monthly and Annual while you are in there. Weekly-only is unusual, reads as
expensive, and caps LTV — they offer all three.

### 2. Turn our measurement into their retention loop

This is the whole strategy in one move.

CharmXP gamifies a **Charm Score** that is, as far as their own copy admits, a
model's opinion — "composure, warmth, humor, pace". They show it climbing
712 → 731 and call that progress.

We already compute the real thing: words per minute, filler density per 100 words,
dead-air ratio, long-gap count, pitch and loudness steadiness — all rule-based DSP
in `services/api/app/services/vocal_delivery.py:315-325`, deterministic for the
same audio. We blend it at 25% of the headline score and then largely bury it.

**Ship a delivery trend and one weekly target.** "Fillers: 7 per 100 words, down
from 11" is the same dopamine as a streak, except it is true and they cannot copy
it without building the pipeline.

Do not gamify the LLM half. The three rubric pillars run at `temperature=0.2,
seed=42` (`charisma_score.py:255-259`) — best-effort reproducibility, not
determinism. A "score went up" mechanic built on that will drift and users will
notice. Gamify only the measured quarter.

### 3. Reminders on the persona's rhythm, not a daily nag

We have no notifications at all, which is why nobody comes back. But a daily streak
push is the wrong shape for four of our five personas — the persona work in
`docs/personas/` already says when each one would actually open the app: Arjun the
night before a meeting, Tom twenty minutes before going out, Claire three minutes a
day, Sam late evening.

Ask once at onboarding, then notify on that rhythm. It is a better product than a
streak and it costs the same to build.

## Cheap wins already sitting in the codebase

- **Finish the share stub.** `app/score-result.tsx:336-338` renders a disabled
  "Share · soon". A shareable score card is our only viral loop.
- **Surface the leaderboard.** It exists (`app/leaderboard.tsx`) and is reachable
  only from a card inside Stats.
- **Sequence what we have into "courses."** They sell Charisma / Communication /
  Public Speaking / EQ tracks. We do not need to author a curriculum — we have 16
  drills, 210 simulator scenes, 26 charisma exercises and a `DuoPath` component
  already rendering a path. Group existing content into five-session tracks.
- **Onboarding questionnaire.** There is none, and a persisted `introSeen` flag is
  dead code (`src/state/progress.ts:43` — `setIntroSeen` is never called). Two
  questions ("what are you practising for?", "when will you practise?") pick the
  starting track and the notification rhythm.

## What not to copy

- **"30 days changes who shows up."** Their Day 1 → Day 30 transformation panel is
  unfalsifiable. We have no retention data yet, and our own rule is that we do not
  publish numbers we have not counted.
- **Their statistics block.** "2/3 of jobs", "50% of men" — attributed loosely to
  DeakinCo / Pew / a journal, with no links. Do not restate research we have not
  read.
- **Dating-forward positioning.** Their FAQ leans on "rizz apps" and first dates.
  Our app deliberately gives the partner agency to refuse, App Review reads the
  site, and the persona brief already rules this out.
- **Their FAQ schema.** Worth noting the one place they are behind: they render a
  visible FAQ with no `FAQPage` markup. We have it on all five persona pages.

## Two claims of ours that were wrong, now fixed

Found while verifying against code, both corrected in this repo:

1. **"225 simulator scenarios."** The 19 files the loader reads hold 225, but 15
   carry `disabled: true` and are filtered before serving (`orchestrator.py:277`).
   The honest number is **210**.
2. **"The same session always gets the same score."** Only the acoustic quarter is
   deterministic. Removed.

## One decision you need to make

**`docs/privacy.md` in the app repo describes an audio lifecycle that the code does
not implement.** The doc says audio uploads to object storage, gets
`delete_after = now() + 24h`, and a nightly job hard-deletes it. Our marketing site
repeated that.

In the shipped API there is no `boto3`, no `put_object`, no audio model, and the
three `s3_*` settings in `deps/settings.py:53-57` are referenced nowhere else.
Audio is read into memory, transcribed, analysed and discarded.

The truth is **better** than what we were claiming — and a real differentiator over
CharmXP's vague "recordings are encrypted". But the privacy policy is a legal
document, so the fix is yours to make, not mine: either implement the documented
lifecycle, or rewrite `docs/privacy.md` and `/privacy` to describe what the code
actually does. Until then the marketing FAQ no longer asserts a retention window.

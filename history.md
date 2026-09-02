# ImprovTalk site — working context

Everything a future session needs to pick this up without re-deriving it.
Loaded automatically via `CLAUDE.md`.

---

## What this is

The marketing site for **ImprovTalk**, a voice-first AI communication coach
(React Native / Expo app + FastAPI backend, in a separate repo at
`~/Desktop/Github/ImprovTalk`).

Static Next.js 15 export → GitHub Pages → **improvtalk.vip**.

## Live URLs

| Persona | URL | In the A/B split? |
|---|---|---|
| Shy *(default, canonical)* | `https://improvtalk.vip/` | yes |
| Second language | `/second-language/` | yes |
| Meeting people | `/meeting-people/` | campaign only |
| Speaking up | `/speaking-up/` | campaign only |
| Out of practice | `/out-of-practice/` | campaign only |

Force any variant with `?v=shy|language|social|speaking|rusty`.

---

## Facts that were verified — do not re-guess, do not overstate

**Counted from the app's shipped data files:**
- 70 live scenarios / 13 venues
- 225 simulator scenarios / **19** venues (an early note said 20 — it is 19)
- 2,766 library items (2,571 reference + 195 countries)
- 195 countries, 631 face photos, 195 audio clips
- Charisma Score = Fluency 0.40 + Confidence 0.35 + Improvisation 0.25
- Free tier = 3 conversations/week

**Three languages is real** — traced end to end: picker in
`apps/mobile/app/session.tsx:166` → `conversation_language` on the mint call →
`CONVERSATION_LANGUAGES = ("english","spanish","russian")` in
`services/api/app/services/simulator/blends.py:333` → `language_directive()` →
OpenAI Realtime `instructions`.

**Never claim:**
- That the app *interface* is translated. It is English-only, no i18n at all.
- That 195 nationalities / 29 accents mean many spoken languages. They change her
  **English accent**, and accent is disabled unless the conversation is English.
- Model pricing. An earlier draft said Opus 4.7 was $15/1M; it is $5. Prices
  drift — the site shows a relative spectrum, no figures.
- Pricing tiers. In-app values are contradictory (€/day cards vs weekly SKUs) and
  marked placeholder.

**Positioning:** communication / charisma coach. The app also ships a
dating/approach angle; the `meeting-people` variant covers it and stays PG-13,
consistent with the app's own guardrails (she has agency, declines pushy
behaviour). App Review reads this site.

---

## Analytics

```
GA4          G-TQHK0W81XE
Google Ads   AW-18052428576
Conversion   AW-18052428576/4jb2CJySoescEKDmiKBD   "Early access signup"
```
All in `content/analytics.ts`. Empty values = nothing loads, no banner.

**Events:** `testflight_click` (the conversion) · `notify_click` (weak,
Secondary in Ads) · `qr_reveal` · `scenario_play`. Every event carries
`variant`; it is also a GA4 user property.

**The conversion is the TestFlight click-through**, not a form. There is no
email capture — see "Decisions" below.

---

## Traps — each of these cost real debugging

1. **The variant redirect must carry `location.search` and `location.hash`.**
   Drop the query string and every `gclid` goes with it: Ads attribution breaks
   silently and reads as a targeting problem, not a bug.
2. **`.nojekyll` and `CNAME` must be in the published artifact.** Pages runs
   Jekyll, which strips `_next/*`; without `CNAME` the custom domain resets on
   every deploy. CI fails the build if either is missing.
3. **`AnimatedNumber` must render its real value server-side.** Starting at zero
   would put "0 things worth mentioning" in the HTML that crawlers read.
4. **Consent defaults must run `beforeInteractive`**, ahead of the gtag library,
   or storage initialises granted and the denial never applies.
5. **Enhanced Conversions must stay OFF.** Automatic mode scraped the support
   email off the page and hashed it as every visitor's identity. Now off in Ads.
6. **Conversions need `transaction_id`.** Ads' Count:One only dedupes per ad
   click, which does nothing for organic traffic.
7. **Headlines must fit two lines at 390px.** The cause was the type scale floor,
   not only the words — `display-xl` at `2.5rem` fits ~16 chars on a phone.
8. **GitHub Pages serves partial state mid-deploy.** Routes 404 and greedy greps
   return nonsense for a minute or two. Re-check before diagnosing.
9. **Ad blockers block your own tags.** Testing with one on shows no analytics.

---

## Decisions, and why

- **No email capture.** It was removed: the mailto fallback errored where no mail
  client exists, and nobody was going to action an inbox — so it traded a
  conversion for an obligation. TestFlight is one tap.
- **Two variants in the split, not five.** Each arm needs ~1,500–3,000 visitors;
  five arms need 10–15k and one would win by chance. `ACTIVE_SPLIT` in
  `content/personas/index.ts` rotates the challenger.
- **Variants are `noindex` + canonical to `/`** and excluded from the sitemap.
- **Headlines are familiar sayings** — "Practice makes perfect", "Keep calm and
  talk", "Break the ice", "Say what you mean", "Like riding a bike". A known line
  is trusted before it is finished.
- **Plain words throughout.** The reader is often self-conscious about
  conversation; clever phrasing reads as performing at them.
- **Brand gradient appears three times only** as site chrome: hero rule, primary
  button, logo. Adding a fourth is what makes a page look like a template.
- **The pulse is on the install CTA only** — never the consent Accept button,
  which would be a consent dark pattern.

---

## Outstanding (not code)

1. **Beta App Review** — the TestFlight link exists but answers "not accepting
   any new testers" until an external group has an approved build. Test
   Information needs a **demo account**; reviewers cannot pass the sign-in
   without one. This is the launch blocker.
2. **Register `variant`** as a GA4 custom dimension (Admin → Custom definitions,
   scope User). Only applies to data collected after creation.
3. **`Install intent` conversion label** — second action, Engagement category,
   Secondary. Not yet created; `CONVERSIONS.notifyClick` is empty and guarded.
4. **`/terms` has never been lawyer-reviewed.** Written from scratch.
5. **App still links to dead URLs?** No — fixed in commit `f8fff46` in the
   ImprovTalk repo, but the two mobile files need a new build to take effect.

## Commands

```bash
npm run dev          # localhost
npm run build        # static export to ./out
npm run serve:out    # serve ./out the way Pages will
npm run gen:assets   # favicons + QR (QR self-verifies by decoding)
```

Push to `main` deploys. `docs/` holds DEPLOY, CONVERSIONS and BRAND-AND-VIDEO.

## Customer personas (docs/personas/)

Five two-page PDFs, one per variant, built to the Google persona framework
(name, age, location, household, education, occupation, goals, barriers) and
extended with an acquisition plan: pain/barrier/solution, the message that
lands, channels, a four-stage funnel (awareness → consideration → conversion →
loyalty), the landing page, and a ready-to-paste video-generation prompt.

Genders were set deliberately: **shy, language, social and speaking are male;
rusty is female.** The AI conversation partner stays "she" throughout the app
and site copy — that is not a persona pronoun.

Regeneration, the page-height mechanism and the traps are in
`docs/personas/src/README.md`. The one that will bite: a `.two` class on `.page`
collides with the two-column grid and scrambles the layout in the PDF only.

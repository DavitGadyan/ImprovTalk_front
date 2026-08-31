# ImprovTalk — marketing site

The site for [ImprovTalk](https://improvtalk.vip), a voice-first AI
communication coach.

Static Next.js export, published to GitHub Pages on every push to `main`.
Setup and the reasoning are in [docs/DEPLOY.md](docs/DEPLOY.md).

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export to ./out
npm run serve:out    # serve ./out the way the bucket will
```

`npm run serve:out` is the meaningful local check — the dev server rewrites
routes in ways a bucket does not.

## Layout

```
app/                 routes: / privacy terms support get billing/* sitemap robots
components/sections/ the landing page, one file per section
components/ui/       section shell, button, logo, device frame, meters, install block
content/             all copy and constants — links.ts is the one to edit at launch
lib/                 cn() and the motion vocabulary
scripts/             favicon + QR generation
docs/DEPLOY.md       GCP setup and the deploy runbook
```

## Going live

The app is **pre-launch** — not listed on either store. Every install path
currently falls back to the support mailto. At launch, edit
[`content/links.ts`](content/links.ts) and set `APP_STORE_URL`, `PLAY_STORE_URL`
and/or `TESTFLIGHT_URL`. Buttons, store badges and the `/get` redirect all follow
from those three constants.

The QR code does **not** need regenerating — it encodes `/get`, which does the
platform routing at scan time.

## Design system

Structure follows the app case-study layouts in `design_examples/` (Evoli, Gimi,
MuseMuse, MyPlan, NodPay). Four traits were taken from them deliberately:

- **Alternating full-bleed bands** with a curved lip where one meets the next
  (`Section` has a `tone` of `canvas | raised | deep | brand`). This is what
  stops a long page reading as one undifferentiated scroll.
- **Numbered chapter pills** beside each section heading (`Section index={n}`).
- **Tilted, clustered device mockups** — the references never show a phone flat
  and straight on. See `components/ui/device-frame.tsx`.
- **A closing band** carrying the wordmark and URL, so the page has a definite
  bottom edge.


Ported from the app's own dark theme (`ImprovTalk/apps/mobile/src/ui/theme.ts`)
so the site and the product read as one thing. Tokens live in the `@theme` block
of [`app/globals.css`](app/globals.css); there is no `tailwind.config.ts`
(Tailwind 4, CSS-first).

The brand gradient appears as site chrome in exactly **three** places — the hero
rule, the primary button, and the logo mark. Keeping it rationed is what
separates this from the gradient-washed template look. Please don't add a
fourth. (The gradients inside the phone mockups are reproducing the app's own
UI, and the soft radial blooms behind the hero and final CTA are light, not
brand colour — see the note at the top of `app/globals.css`.)

## Regenerating assets

```bash
npm run gen:assets   # favicons + QR, from icon.png (the 1254px master)
```

`public/og.png` is captured from a temporary `/og-preview` route with a headless
browser so it uses the real Inter Tight. Recreate that route if the OG image
needs to change.

## Device mockups

`DeviceFrame` is built to current iPhone geometry rather than being sized by
whatever content it holds — screen aspect **9:19.5**, corner radius ~13.7% of
screen width, Dynamic Island ~31%, even bezels. Measured output is 2.168 against
the 2.167 target. Content is top-aligned with the tab bar pinned to the bottom,
so the empty middle reads as screen rather than as a layout gap.

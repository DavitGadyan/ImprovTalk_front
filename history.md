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
| Shy *(default, canonical)* | `https://improvtalk.vip/` | the only arm — split paused |
| Second language | `/second-language/` | no — indexable landing page |
| Meeting people | `/meeting-people/` | no — indexable landing page |
| Speaking up | `/speaking-up/` | no — indexable landing page |
| Out of practice | `/out-of-practice/` | no — indexable landing page |

Every persona is its own URL — open it directly. The `?v=` override is gone
(see *The redirect report* below); `ACTIVE_SPLIT` is `['shy']`, so nothing on
`/` redirects.

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

## Indexing: what was actually wrong, and what was not

Search Console showed no indexed pages. Three things were real, one was not.

**Not a fault:** the site was six days old when this was looked at. Serving is
healthy — 200s on every route, HTTPS, `www` and bare-`http` both 301 to the
canonical host, self-referential canonicals everywhere, server-rendered copy,
and a clean `@graph` per page. Search Console's own panel still said *processing
data*. A new `.vip` domain with no inbound links is simply slow to index; no
amount of code fixes that.

**Fixed:**

1. **`/get/` was `Disallow`ed *and* `noindex`.** Those cancel out. A page Google
   may not fetch is a page whose `noindex` Google never reads, so a URL linked
   from the footer of all nineteen pages was on course for *Indexed, though
   blocked by robots.txt* — the bare URL in the index, which is the exact
   outcome the `Disallow` existed to prevent. `robots.ts` now disallows nothing
   and lets the `noindex` do the work. Same for `/billing/*`. Crawl budget does
   not apply at this size.

2. **The persona landing pages were near-orphans.** `/out-of-practice/` had zero
   internal links; `/second-language/` and `/speaking-up/` had one each, from a
   blog post. They were reachable essentially only from the sitemap, which is
   how a page ends up *Discovered — currently not indexed*. The footer now
   carries a **Practise for** column linking all four, so each has a site-wide
   link. Every URL in the sitemap now has at least four internal links, and the
   footer grid runs `sm:grid-cols-3 lg:grid-cols-4` — verified 2×2 at 390px with
   no overflow.

3. **Every `lastmod` was the build timestamp.** That told Google all seventeen
   pages changed on every deploy, which is how a sitemap stops being believed —
   and the sitemap was the main thing pointing at the persona pages. `lib/lastmod.ts`
   reads each page's real last-commit date from git. **This needs full history:
   `deploy.yml` checks out with `fetch-depth: 0`,** and on a shallow clone every
   date silently collapses back to the build timestamp. Blog posts keep their own
   `post.date` — a change to shared prose styles is not a change to the article.

**Still open, and not code:** `site.googleSiteVerification` and
`site.socialProfiles` are both empty, so there is no verification meta tag in the
HTML and no `sameAs` entity signal. IndexNow reaches Bing and Yandex only —
Google retired sitemap ping in 2023, so Google is reached through Search Console
or through links.

---

## Decisions, and why

- **No email capture.** It was removed: the mailto fallback errored where no mail
  client exists, and nobody was going to action an inbox — so it traded a
  conversion for an obligation. TestFlight is one tap.
- **Two variants in the split, not five.** Each arm needs ~1,500–3,000 visitors;
  five arms need 10–15k and one would win by chance. `ACTIVE_SPLIT` in
  `content/personas/index.ts` rotates the challenger.
- **Variants were `noindex` + canonical to `/` while the split ran.** Since
  `65831ba` (2 Sep 2026) all four are indexable, self-canonical and in the
  sitemap, and the split is paused at one arm.
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

## The survey (`/survey/`) and the generated PDF

Seven goal categories, with **"Type your situation" always last**, then a second
question that narrows to one of the fifteen personas in `docs/PERSONAS-15.md`.
Families with a single persona (shyness, socialising) skip that question and
assign it, so the `persona` column is populated either way.

**The deliverable is generated in the browser, not pre-written.** `lib/pdf.ts` is
a hand-rolled PDF writer — the 14 standard fonts, WinAnsi text, filled rects,
about 5.5KB per file — and `lib/tips-pdf.ts` composes the sheet from the answers
in memory. It is `import()`ed only from the result screen, so none of it is in
the entry bundle.

Why not the six static PDFs that were built first: the goal says which problem
and the colour blend says which version of it, and a file per goal throws the
second signal away. `docs/tips/` and `public/tips/*.pdf` were deleted when the
generator replaced them — `content/tips.ts` is now the only copy of that text,
which is the point.

**Traps here:**

1. **Word wrapping needs real font metrics.** The Helvetica and Helvetica-Bold
   width tables in `lib/pdf.ts` are not decoration. Measuring with canvas would
   measure whatever font the browser substituted, not the Helvetica the file
   asks for.
2. **The sheet must stay one page.** All 88 combinations (15 personas + 7
   no-persona goals × 4 dominant colours) were checked with `pdfinfo`. Adding a
   sentence to `COLOR_NOTE` or a persona `situation` can push the longest cases
   onto a second page — regenerate and re-count before shipping copy changes.
3. **Byte offsets, not character offsets.** The xref table is built from a
   binary string and converted with `charCodeAt`. Building it as UTF-8 puts
   every offset out and the file will not open.
4. **Persona copy is written against the never-lists** in `docs/PERSONAS-15.md`.
   Nobody in Reset or Language is told they are starting, learning or a
   beginner; nobody in Dating is told they are behind.

**Still the user's step:** create the Supabase project and add
`NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`, then run the RLS
check in `docs/SURVEY-SETUP.md`. Until then `submitEnabled` is false, the survey
runs, and the PDF is still produced — only the write is skipped.

## The tips popup

Opens **once**, after **50 seconds of visible reading accumulated across pages**
(`lib/dwell.ts`), and carries the whole exchange itself: the offer, the six-step
form, and the personalised PDF. It renders `<SurveyClient>` inside a native
`<dialog>` rather than reimplementing the form, so there is one form in the
codebase and Supabase has one shape to accept.

**Why the timer is not per-page.** The site is a static export, so every
navigation is a fresh document. A per-page timer resets each time and someone
reading five pages for forty seconds each would never reach the threshold. The
total lives in `localStorage`, and only *visible* time counts — a tab left open
in the background has not been reading, and firing a modal into it means
returning to a dialog over a forgotten page.

**The red x is the only way out.** The offer screen has one action, "Get my
tips", and the x. The second dismiss button was removed, and inside the dialog
the result screen drops "See the app" and "Take it again" — a link out of a
modal loses the result, and there is nothing to go back to.

**`showModal()` does not stop the page scrolling.** It makes the background
inert, but a wheel or trackpad swipe still moves the document behind the
dialog. `document.body.style.overflow` is locked while open and the previous
value restored on close, rather than assuming it was `''`.

**The PDF prints on white.** The dark canvas is right for a screen and wrong for
a document: it lays down a solid block of toner, photocopies badly and reads as
a slide. The feature hues were picked for a dark background, so amber and green
fall under 3:1 on paper — bars and rules keep the true colour, anything set as
type takes a 0.72 shade. The top accent is inset to the margin, because most
printers cannot reach the paper edge.

**Closing it is permanent.** The x, Escape and a backdrop click all write
`localStorage`, so it survives closing the laptop. Someone who shuts the dialog
on sight has answered the question, and asking again next week is how a popup
becomes the reason people stop coming back. `sessionStorage` is written too,
because a private window throws on the first call and that is exactly where a
returning popup is most irritating. It cannot cover a different browser, a
different device, or cleared site data — the IP check catches some of that, but
only for people who actually submitted.

**`?dwell=<n>` and `?popup=reset` clear the dismissal first.** Without that a
test flag silently does nothing for anyone who has ever closed the popup, which
is everyone who has tested it once — and the symptom is indistinguishable from
the feature being broken.

**`window.__improvtalkPopup.status()`** says why it is not showing:
`suppressedBecause`, `msWatched`, `msNeeded`, `tabVisible`. `.reset()` clears
everything and reloads. A popup that does not appear looks identical whether it
is waiting, suppressed, or broken, so it has to be able to say which.

**`AFTER_MS` is 50_000.** It started at 150_000 and almost nobody reached it —
measured live, the counter needs ~155s of visible time from landing because it
starts at hydration, which outlasts most sessions. Do not commit a test value
here; `?dwell=<seconds>` overrides it per page load instead.

**Rules it must not break:**

1. **Never on `/survey/`** — the same form is already the page.
2. **Never over another dialog.** The install panel is the conversion; a second
   modal on top of it buries the thing we measure. It retries on the next page,
   where the dwell total is already past the threshold.
3. **A backdrop click only closes the offer screen,** never the form. Losing
   four answered questions to a stray click is the worst thing it could do.

**The heading says "you have been selected", on the client's instruction, asked
twice.** Everyone who reads for 50 seconds sees it, so nobody has been selected
in any real sense. One word — "You are invited" — makes it true if App Review or
a consumer-protection question ever lands on it. Flagged in the component.

**No emoji anywhere in the shipped UI.** The three in the hero mockup —
`⚡ 12`, `★ 71`, `🔥 38%` — are drawn SVG paths in the brand hues now. Emoji
render in a different typeface on every OS, so colour, weight and baseline all
shift: a mockup meant to look like the app looked like three pasted stickers,
differently on each machine. The popup's checks are bare green glyphs rather
than tinted badges — a badge is an app convention, a bare check reads as a spec
sheet. Typographic arrows (`→`, `←`) are punctuation, not emoji, and stay.

**The offer screen is 157 characters.** Heading, one line, three green checks
(no email / no sign-up / free PDF), one button. It was ~600 and read as a
brochure.

**Motion.** `pop-in` on the dialog and its backdrop, `tick-row` staggering the
checks with the tick stroke drawing itself, `result-rise` on the result, and a
canvas confetti burst from two vents. All of it is cancelled by the existing
`prefers-reduced-motion` block. The confetti is hand-rolled — canvas-confetti is
25KB for forty lines of physics, and a library's fixed-position canvas lands
*behind* a `<dialog>` rather than inside its stacking context.

**Enter advances the form.** The handler is on the wrapper, not a focused
control, because clicking a pill with the mouse leaves focus nowhere useful.
Textareas keep Enter for newlines and selects keep it for their own behaviour.

## The tips PDF: three pages, built from the app

Page 1 is the situation and the four moves. **Page 2 is a practice plan** — three
real scenarios in the order to do them, with difficulty and tier — plus the
opener and the steering angle for that person. Page 3 is four principles for
their dominant colour, the presence/power/warmth core, and where they are in a
conversation. All 88 persona x colour combinations verified at exactly 3 pages.

**Everything on pages 2 and 3 comes from the app repo, not from here:**

- `content/scenarios.ts` — the **16 live scenarios in 11 categories**, counted
  from `packages/shared/scenarios/*.json`. Ids, titles, difficulty and tier are
  copied. A sheet that sends someone to a scenario the app does not have is
  worse than no sheet. **`history.md` previously recorded "70 live scenarios /
  13 venues" and that does not match the directory today** — 16 is what was
  counted. The 225 scenarios / 19 venues figure is the *simulator* set in
  `packages/shared/pickup_simulator/`, which is a different thing.
- `content/coach.ts` — the opener strategies from `_OPENER_STRATEGIES`, the
  steering angles from `_EXPLORATION_ANGLES`, and the `charisma_core` and
  `stage_flow` blocks every venue carries.

**Two things do not cross over from that engine.**

1. **No names.** The knowledge-base files are titled after the books and people
   they were distilled from, and one opener strategy names an author inline.
   The distillation is ours; the material is not.
2. **Two of the eleven opener strategies are withheld-tease patterns** built on
   backhanded compliments about appearance. They are weight 0 in the app and
   fire only when a scenario pins them. They are not on the site at all — the
   published line is that noticing a no early is the skill, and App Review reads
   this site.

**The opener is goal-aware, not just colour-aware.** Nobody opens a leadership
review with a small favour, so the work family gets "answer first, then the
reasoning" instead. A colour-only mapping shipped an outlet-favour opener to
someone practising interviews before this was caught.

## IP de-duplication, without a backend and without holding an IP

The popup asks Supabase whether this address has already answered. Everything
happens inside Postgres:

- `ip_fingerprint()` reads `x-forwarded-for` from `request.headers` and hashes
  it with a salt in `private_config`. **The browser never sees or sends an IP**,
  and asking a third-party IP service was rejected for exactly that reason.
- `survey_submit(payload)` and `survey_already_submitted()` are `security
  definer`. The second returns a boolean and never a row.
- The table now has **no RLS policy at all** — not even insert. The anon key
  cannot touch it directly; both functions are granted instead.

**The salt must be unreadable.** An IPv4 space brute-forces against a known salt
in minutes, so `docs/SURVEY-SETUP.md` step 4 checks `private_config` returns
401/404.

**It only hides the popup.** `/survey/` still works for anyone who goes there,
because an IP is a weak identity: one submission behind an office or carrier NAT
would otherwise lock out everyone sharing it.

**`/privacy` had to change.** It promised "we do not store an IP address or any
identifier that would let us recognise you again." That is now false, so it says
what is actually stored and why.

## Site audit — what it found

**White text on the primary CTA measured 2.20:1.** `--gradient-brand` runs
`#ff9500 → #ff2d55 → #af52de → #5856d6`; white clears AA on only the last stop,
and `brand-pan` swept the label across all four every six seconds, on every
page. `--gradient-brand-cta` drops the orange (darkening it to pass turns it
brown) and eases the other two: worst point across the ramp, sampled every 1%,
is **4.60:1**. The full gradient still carries the hero rule and the logo.

**`focus:outline-none` was deleting the focus ring** on six survey controls.
The utility layer beats the `@layer base` `:focus-visible` rule, so nothing but
a 1px border change remained. Verified in the compiled CSS, not just the source.

**The tips popup could destroy a finished survey.** `close()` writes a permanent
dismissal and was wired to Escape, the x and the backdrop — but only the
backdrop checked `started`. Now every exit asks first.

Two bugs the *fix* introduced, both caught by testing rather than reading:

1. Rendering the confirm **instead of** the form unmounted `SurveyClient`, so
   "Keep going" came back to question one with every answer gone — precisely
   what the guard existed to prevent. The form is hidden, never unmounted.
2. The guard listens to the dialog's own `close` event, so an intentional close
   was caught by it and immediately re-opened. An `allowClose` ref lets a
   deliberate close through.

**`submitSurvey`'s result was thrown away.** `SubmitResult` was consumed nowhere
in the repo: a 500, a CORS failure or an ad blocker discarded the answers and
still showed confetti. Note which way round it was — the failure the visitor
*cannot* act on was disclosed, and the one they could retry was hidden.

**"Take it again" reset nothing** — it cleared neither the storage key nor any
field state, so a retake came back pre-filled with consent still ticked, and
finishing it wrote a second row for the same person.

**`/about/` claimed "fourteen curated sources".** There are **13** — counted from
`knowledge_base/*.json`. Em-dash density on that page was 1 per 78 words against
roughly 1 per 1,000 in edited prose; it is now 0.

## What the cloud review caught that testing did not

Five real bugs, two of them introduced by the audit's own fixes:

1. **The failure alert was unreachable.** `role="alert"` was rendered inside the
   form step, but `setDone(true)` runs unconditionally and `Result` replaces the
   form — so it never mounted, the failure stayed silent and the confetti still
   fired. It belongs on the result screen, which is where submitting always
   lands.
2. **The discard guard lied after a successful save.** `started` never resets
   when `SurveyClient` reaches its own result, so closing a *completed* flow
   asked "closing throws them away" about answers already in Supabase. A
   `completed` flag set through `onComplete` fixes it.
3. **"in either language"** on a persona whose FAQ two lines below says English,
   Spanish and Russian.
4. **The footer still said "Library"** while the header said "Learn", same
   anchor, every page. Renaming one side is how that happens.
5. **`aria-current="page"` on four links at once** on the home page, because all
   four hash links matched `pathname === '/'`. ARIA allows one; four
   announcements of "current page" is worse than none. Exact paths only now.

Plus: `social.ts` hard-coded `2,766` instead of importing `TOTAL_LIBRARY_ITEMS`,
the retake did not reset `started` so `survey_start` never fired a second time,
and the popup and menu chrome still shipped in all 22 pages because both gates
sat below the header rather than around it.

## `not-prose` was doing nothing, and PageShell was restyling the survey

`@tailwindcss/typography` is not installed, so `not-prose` compiles to no CSS —
`grep -c not-prose` against the built stylesheet returns 0. PageShell's
`[&_h2]`, `[&_a]` and `[&_ul]` descendant selectors therefore reached straight
into `/survey/`: question headings were pulled to `text-xl mt-12` over their own
`display-md`, and the "See the app" outline button, an `<a>` via `asChild`,
rendered as an underlined accent-blue link inside a bordered pill.

PageShell now takes `bare` for pages whose body is a form rather than an
article. Do not reach for `not-prose` here; it is not a real class in this build.

## Roles the markup could not keep

`role="tablist"` with `role="tab"` promises `aria-controls`, a `tabpanel`,
roving tabindex and arrow keys. None of that existed, so a screen reader
announced "tab, 1 of 4" and the arrow keys did nothing. Four toggle buttons with
`aria-pressed` is what the scenario picker actually is.

The film also had **two buttons named "Play the scene"** back to back in the tab
order: the full-bleed click layer and the control-bar button. The click layer is
a mouse affordance, so it is `aria-hidden` and `tabIndex={-1}` now.

## Learn, and where its numbers come from

The Learn hub is `apps/mobile/app/learn.tsx`. Counted, not estimated:

- **26 catalogues**, **2,571 reference items** across art, music, film, places,
  people, gestures and symbols (`packages/shared/reference/*.json`).
- **13 sources distilled to 104 principles** — the `principles` arrays in
  `knowledge_base/*.json` summing to 5+9+6+19+8+5+5+5+5+7+9+5+16.

**Do not write "dozens of books".** Thirteen is not dozens, and two of the
thirteen are field-data sets rather than books, which is why the copy says
*sources*. The files are named after the works they distil and none of those
names appear anywhere public.

## The deploy that succeeds while the site serves a README

**Symptom:** `improvtalk.vip/` returns 200 with the title
`ImprovTalk — marketing site | ImprovTalk_front`, every other route 404s, and
`davitgadyan.github.io/ImprovTalk_front/` shows the same thing. The Deploy site
workflow is green.

**Cause:** Pages **Settings → Pages → Source** is on *Deploy from a branch*.
GitHub's own Jekyll builder then publishes the repository root — rendering
`README.md` as the homepage — and silently discards the artifact this workflow
uploads. Both the build and the deploy still report success, because from the
workflow's point of view nothing failed.

**Fix:** Settings → Pages → Build and deployment → Source → **GitHub Actions**,
then re-run the workflow. The `.nojekyll` file in `out/` does not help here: it
only stops Jekyll processing *our* artifact, and in this failure mode our
artifact is never served at all.

**Guard:** the `smoke` job in `.github/workflows/deploy.yml` fetches the live
site after deploying and fails if it is not this app, if any key route 404s, or
if the custom domain has been dropped. Green build, broken site is the one
failure a build-time check cannot catch.

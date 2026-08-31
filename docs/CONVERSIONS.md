# What counts as a conversion

Short answer, today: **one email address you can actually reach.** Nothing else.

Everything else on this page is a signal worth watching, but only that one is
worth spending money against.

## The funnel as it exists

| Step | Event | What it proves | Count it as |
|---|---|---|---|
| Sees the page | `page_view` | nothing about intent | traffic |
| Watches a scenario | `scenario_play` | held their attention | engagement |
| Clicks an install CTA | `notify_click` | wants it enough to click | **interest** |
| Opens the panel | `qr_reveal` | reached the ask | micro |
| Mail client opened | `early_access_intent` | typed an address, may not have sent | **not a conversion** |
| Server confirmed the address | `early_access_submit` | you can reach this person | **the conversion** |
| Installs from TestFlight | — | the real goal | **not measurable here** |

## Why `notify_click` is not a conversion

It is a button press. It costs nothing, commits to nothing, and a bored visitor
produces one as readily as a serious one. It is genuinely useful as a
denominator — clicks divided by submits tells you whether the ask is working —
but if it drives bidding, Google will happily find you thousands of people who
click and never sign up, because that is precisely what you asked it to optimise
for.

In Google Ads, mark it **Secondary**. Recorded and reportable, never used for
bidding.

## Why the mailto path is not a conversion either

Until `waitlist.ENDPOINT` is set, submitting the form opens the visitor's mail
client with a pre-filled message. It does not send it. Whether they press send
is invisible to us.

That is why it fires `early_access_intent` and not `early_access_submit`. If both
fired the same event, the conversion count would include everyone who opened
their mail app and thought better of it — and you would be bidding against an
inflated number with no way to see the inflation.

**This is the strongest reason to configure an endpoint before spending on ads.**
It is not about convenience. Without it your primary conversion is unmeasurable,
and every optimisation decision after that is guesswork dressed up as data.
See `docs/EARLY-ACCESS.md`.

## What you cannot measure from here

Whether someone actually installs. That happens inside TestFlight or the App
Store, on Apple's side of a boundary the website cannot see across.

- **TestFlight** gives you tester counts and session data in App Store Connect.
- **App Store Connect** gives you impressions, downloads and conversion rate per
  source once you are listed.
- Tying an ad click all the way through to an install needs Apple's attribution
  frameworks. That is worth doing after launch, not before.

So: measure to the email. Treat installs as a separate number from a separate
system, and do not expect the two to reconcile exactly. They never do.

## Recommended Google Ads setup

| Conversion action | Fires on | Category | Setting |
|---|---|---|---|
| Early access signup | `early_access_submit` | Submit lead form | **Primary** |
| Install intent | `notify_click` | Other | **Secondary** |

Leave conversion value empty. Nothing is being bought yet, and a made-up value
distorts bidding toward whichever number you invented.

## In GA4

Once `early_access_submit` has fired at least once, mark it as a **Key event**
under Admin → Events. It cannot be marked before it has fired — the event has to
exist in the property first.

Worth building one report: `notify_click` against `early_access_submit`. That
ratio is the health of the ask itself, separate from the health of the traffic.
If clicks are high and submits are low, the problem is the panel, not the advert.

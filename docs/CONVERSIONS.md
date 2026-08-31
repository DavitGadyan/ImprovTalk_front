# What counts as a conversion

**Leaving the site for TestFlight.** That is the whole model.

## The funnel

| Step | Event | Count it as |
|---|---|---|
| Sees the page | `page_view` | traffic |
| Watches a scenario | `scenario_play` | engagement |
| Opens the install panel | `notify_click` / `qr_reveal` | **interest** |
| Leaves for TestFlight | `testflight_click` | **the conversion** |
| Actually installs | — | **not measurable here** |

Fired from every route out: the hero button, the header, the mobile bar, the
panel's link, the `/get` button, and the `/get` auto-redirect a QR scan lands on.
The redirect fires the event *before* navigating — gtag uses `sendBeacon` so the
call survives unload, but only if it happens first.

## Why there is no email capture

There was one, briefly. It was removed for two reasons, and the second is the
one that matters.

The visible problem: with no form endpoint configured, submitting fell back to
`window.location.href = 'mailto:…'`. On a machine with no mail client that does
nothing, or errors. The button looked broken because it effectively was.

The real problem: a signup form is a promise to do something with the address.
Nobody was going to answer that inbox. So it collected addresses in exchange for
a promise that would not be kept, and it did so *instead of* the click that
would have taken someone straight to the beta. It cost a conversion to acquire
an obligation.

An iPhone visitor can install in about a minute. Asking them to type an address
first is friction inserted in front of the thing you actually want.

## Why `notify_click` is not a conversion

It opens a panel. It costs nothing and commits to nothing. Useful as a
denominator — panel opens against TestFlight exits tells you whether the panel is
working, separately from whether the traffic is any good — but if it drives
bidding, Google will find you thousands of people who open it and leave.

In Google Ads it is **Secondary**: recorded, never used for bidding.

## What you cannot measure here

Whether anyone installs. That happens inside TestFlight, on Apple's side of a
boundary the website cannot see across. TestFlight tester counts live in App
Store Connect; post-launch installs live there too.

Measure to the click. Treat installs as a separate number from a separate
system, and do not expect the two to reconcile. They never do.

## Google Ads setup

| Conversion action | Fires on | Category | Setting |
|---|---|---|---|
| Early access signup | `testflight_click` | Sign-up | **Primary** |
| Install intent | `notify_click` | Engagement | **Secondary** |

Labels live in `content/analytics.ts`. Leave conversion values equal — nothing is
being bought, and an invented value distorts bidding toward the fiction.

Keep **Sign-up** as the only account-default goal. If Engagement or YouTube
follow-on views are also account-default with primary actions, campaigns will
optimise toward those instead, because they are cheaper and more plentiful.

## In GA4

Once `testflight_click` has fired once, mark it a **Key event** under
Admin → Events. It cannot be marked before it has fired.

Worth watching: `notify_click` against `testflight_click`. That ratio is the
health of the panel itself, independent of traffic quality.

# Early-access email capture

The site is a static export with no backend, so the form needs somewhere to
POST. Until you configure one it still works — it falls back to opening the
visitor's mail client with everything pre-filled — but that converts far worse
than a real form, so it is worth the ten minutes.

## Where the address goes

`content/waitlist.ts` sets `DELIVER_TO` to `support@s1mpleai.org`, not a personal
Gmail. Forward that address to your inbox and you get the same mail.

This matters: an address written into public HTML is harvested by scrapers
within days, and a personal Gmail cannot be rotated once it is burned. A support
address on your own domain can be filtered, forwarded, or replaced.

## Option 1 — Web3Forms (no account, fastest)

1. Go to web3forms.com, enter the address to deliver to, and copy the access key
   they email you.
2. In `content/waitlist.ts`:

```ts
ENDPOINT: 'https://api.web3forms.com/submit',
FIELDS: { access_key: 'your-access-key-here' },
```

Free tier covers 250 submissions a month. The key is public by design — it only
allows posting to your own form.

## Option 2 — Formspree

1. Create a form at formspree.io, copy its endpoint.
2. `ENDPOINT: 'https://formspree.io/f/xxxxxxxx'`, leave `FIELDS` empty.

Free tier is 50 submissions a month.

## Option 3 — your own API (best, more work)

`api.s1mpleai.org` is already live and its `CORS_ORIGINS` already allows
`https://improvtalk.vip`. Add a `POST /waitlist` endpoint in the
ImprovTalk repo, store addresses in Postgres, and set `ENDPOINT` to it.

You own the data outright, there is no third-party processor to disclose, and no
monthly submission cap. The cost is a change to the other repo plus an API
deploy, so the site stops being independently shippable.

## GDPR

Whichever you pick, `/privacy` already discloses the list: what the address is
used for, that it is not used for marketing, that it is not passed on, and that
it is deleted on request.

If you use Web3Forms or Formspree, they become a **processor** handling personal
data on your behalf. Add a line naming them to `app/privacy/page.tsx`, and check
where they store data — the EU-hosted option is the simpler answer if offered.
Option 3 avoids this entirely.

No cookie banner is needed for any of these: the form only sends data when the
visitor submits it, and nothing is stored on their device.

## Do you even need this?

If you create a **TestFlight public link** in App Store Connect
(TestFlight → Public Link), anyone can install without giving you their address
at all. That converts far better than a form, and needs no infrastructure.

Collect emails when you want to control who gets in — limited slots, vetting, or
staged invites. Otherwise use the public link, set `TESTFLIGHT_URL` in
`content/links.ts`, and every install path switches to it automatically.

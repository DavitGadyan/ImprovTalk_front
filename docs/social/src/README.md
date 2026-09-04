# Video scripts — how to regenerate

Five PDFs in `docs/social/`, three scripts each. Copy lives in `social.mjs`;
`gen-social.mjs` renders it.

```bash
node docs/social/src/gen-social.mjs
```

Then print each with headless Chrome, exactly as the SEM briefs do — see
`docs/sem/src/README.md` for the page-height measurement loop.

## The validator matters here

Before rendering, check every script against its persona's `never` list:

```bash
node -e "import('./docs/social/src/social.mjs').then(m=>{ /* see git history */ })"
```

It checks four things:

1. **No forbidden word in shipping copy** — hook, prompt, on-screen text, end
   card. It deliberately does *not* check the `why` field, which has to name the
   forbidden word in order to explain the rule.
2. **On-screen text under 60 characters**, so it is readable at 9:16.
3. **Every Seedance prompt names lens, lighting, aspect and audio.** A prompt
   missing any of those produces mush.
4. **Every script has a `utm`**, because a video without attribution teaches you
   nothing.

## UTMs

Each script's `utm` becomes `utm_content`, and each persona's page is the
landing URL. That gives per-video and per-persona attribution from one link:

```
improvtalk.vip/second-language/?utm_source=tiktok&utm_medium=social
  &utm_campaign=awareness&utm_content=lang_400_days
```

Change `utm_source` per platform. Everything else stays.

## Style

The house style for generated footage — prompt skeleton, look rules, casting,
what to reject, and the AI-disclosure requirement on TikTok and Meta — is in
[`docs/BRAND.md`](../../BRAND.md). Read it before writing a new prompt.

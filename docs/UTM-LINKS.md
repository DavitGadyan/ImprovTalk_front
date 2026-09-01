# Tagging your links

GA4 reads UTM parameters automatically — nothing to install. Tag a link and the
traffic shows up under **Reports → Acquisition → Traffic acquisition**, split by
source and medium.

## The five parameters

| Parameter | What it answers | Example |
|---|---|---|
| `utm_source` | Which platform | `instagram`, `tiktok`, `youtube` |
| `utm_medium` | What kind of traffic | `social`, `cpc`, `email`, `bio` |
| `utm_campaign` | Which push | `launch`, `beta_sep` |
| `utm_content` | **Which specific post or ad** | `reel_cafe`, `story_01` |
| `utm_term` | Keyword (paid search only) | usually left off |

`utm_content` is the one that answers "which thing did they see" — use it for
every individual post, video or creative.

## Ready to paste

```
Instagram bio
https://improvtalk.vip/?utm_source=instagram&utm_medium=bio&utm_campaign=launch

Instagram reel
https://improvtalk.vip/?utm_source=instagram&utm_medium=social&utm_campaign=launch&utm_content=reel_cafe

TikTok bio
https://improvtalk.vip/?utm_source=tiktok&utm_medium=bio&utm_campaign=launch

TikTok video
https://improvtalk.vip/?utm_source=tiktok&utm_medium=social&utm_campaign=launch&utm_content=vid_freeze

YouTube description
https://improvtalk.vip/?utm_source=youtube&utm_medium=social&utm_campaign=launch&utm_content=demo_video

Reddit comment
https://improvtalk.vip/?utm_source=reddit&utm_medium=social&utm_campaign=launch&utm_content=r_socialskills
```

## Rules that keep the data usable

- **Lowercase everything.** GA4 treats `Instagram` and `instagram` as two
  different sources, and you cannot merge them later.
- **Underscores, not spaces.**
- **Never tag Google Ads links.** Ads adds its own `gclid` and auto-tagging;
  a manual `utm_source` on top overwrites it and breaks conversion attribution.
- **Never tag internal links.** Tagging a link between your own pages starts a
  new session and destroys the original attribution.
- **Do not tag organic search.** GA4 detects it by itself as `google / organic`.

## Pointing a platform at a specific variant

Any variant URL takes UTMs the same way, which is how you match the message to
the audience:

```
https://improvtalk.vip/meeting-people/?utm_source=tiktok&utm_medium=social&utm_campaign=launch
https://improvtalk.vip/speaking-up/?utm_source=linkedin&utm_medium=social&utm_campaign=launch
```

Traffic sent to a variant URL is never reassigned by the A/B split, so the
person sees the page you chose.

## What happens to untagged traffic

Someone shares your link, or clicks from a platform you did not tag. GA4 falls
back to the referrer.

That used to break here: the A/B redirect made the destination page's referrer
`improvtalk.vip`, and the tag only fires after the redirect — so untagged social
traffic was recorded as a self-referral and the real source was lost.

The redirect now stashes the original referrer and hands it back to GA4 and Ads
as `page_referrer`. Untagged traffic is attributed correctly.

Tag your links anyway. `utm_content` is the only way to know *which post* worked,
and no referrer can tell you that.

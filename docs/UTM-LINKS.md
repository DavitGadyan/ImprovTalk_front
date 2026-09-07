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

Upwork profile — the portfolio item's link
https://improvtalk.vip/?utm_source=upwork&utm_medium=referral&utm_campaign=portfolio&utm_content=profile

Upwork — the case-study project page
https://improvtalk.vip/?utm_source=upwork&utm_medium=referral&utm_campaign=portfolio&utm_content=case_study

LinkedIn post
https://improvtalk.vip/speaking-up/?utm_source=linkedin&utm_medium=social&utm_campaign=launch&utm_content=post_01
```

Upwork is `referral`, not `social`: it is a marketplace profile, and GA4's default
channel grouping files `medium=referral` under **Referral**, which is where a
visitor who came from a freelancer profile belongs. `social` would lump it in
with TikTok.

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

## Seeing every source side by side in GA4

Nothing to install — GA4 reads the tags on arrival. Three views answer "where
did they come from":

1. **Reports → Acquisition → Traffic acquisition**, primary dimension set to
   **Session source / medium**. One row per origin: `google / organic` (search,
   detected without tags), `upwork / referral`, `tiktok / social`,
   `instagram / bio`, `(direct) / (none)`. Add the secondary dimension
   **Session manual ad content** to see *which post* (`utm_content`).
2. **A custom channel group**, so Upwork and each network get their own line
   instead of sharing "Referral" and "Organic Social". Admin → Data display →
   Channel groups → *Create new channel group*, name it `ImprovTalk origins`,
   and add channels in this order (first match wins):
   - **Upwork** — Source contains `upwork`
   - **Paid search** — Medium exactly matches `cpc`
   - **Google organic** — Source exactly matches `google` AND Medium exactly matches `organic`
   - **TikTok** — Source contains `tiktok`
   - **Instagram** — Source contains `instagram`
   - **Facebook** — Source contains `facebook`
   - **YouTube** — Source contains `youtube`
   - **Reddit** — Source contains `reddit`
   - **LinkedIn** — Source contains `linkedin`
   - everything else falls into **Direct** / **Other**.
   Then in Traffic acquisition switch the primary dimension to that group.
   Channel groups apply to data collected *after* they are created, the same as
   custom dimensions.
3. **Explore → Free form** with rows = the channel group, columns = **Landing
   page**, values = Sessions and the `testflight_click` key event: which origin
   lands on which persona page, and which of those convert.

`gclid` traffic from Google Ads is auto-tagged and appears as `google / cpc`
without any manual UTM — never add one to an Ads final URL.

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

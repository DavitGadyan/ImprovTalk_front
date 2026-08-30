# ImprovTalk — colour palette & video integration spec

Everything here is the live value from [`app/globals.css`](../app/globals.css).
If a token changes there, change it here too.

---

## 1. Core palette

### Surfaces — the page is built from four dark bands

These are the important ones for video. **The video's background must match the
band it sits on exactly**, or its edges will show as a lighter/darker rectangle.

| Band | Hex | RGB | Where it's used |
|---|---|---|---|
| `deep` | **`#070C17`** | 7, 12, 23 | **← the video band.** Live practice, progress |
| `canvas` | `#0B1220` | 11, 18, 32 | Page default, hero, how it works, library |
| `surface` / `raised` | `#111827` | 17, 24, 39 | The gap, drills, FAQ |
| `brand` | `#171034` | 23, 16, 52 | Scoring section, final CTA |
| Closing bar | `#05080F` | 5, 8, 15 | Footer bottom, phone bezels |

### Text

| Role | Hex | Contrast on `#0B1220` |
|---|---|---|
| Primary | `#F8FAFC` | 17.2:1 |
| Secondary | `#CBD5E1` | 11.4:1 |
| Muted body | `#94A3B8` | 6.7:1 |
| Captions | `#7C8BA1` | 5.0:1 |

Hairlines: `#1F2937` (normal), `#334155` (strong).

### Accent + feature hues

Taken from the app's own dark-mode set. All clear 4.5:1 on the canvas.

| Name | Hex | Meaning in the product |
|---|---|---|
| Accent | **`#0A84FF`** | Primary blue — links, eyebrows, live hints |
| Practice | **`#FF375F`** | Live practice / recording |
| Learn | **`#FF9F0A`** | Library, learning |
| Simulate | **`#BF5AF2`** | AI-vs-AI simulator |
| Stats | **`#30D158`** | Progress, positive delta |

### Brand gradient

```
linear-gradient(100deg, #FF9500 0%, #FF2D55 36%, #AF52DE 68%, #5856D6 100%)
```

Orange → pink → violet → indigo, at 100°. It comes from the app icon.

**Use it sparingly in the video too.** On the site it appears in exactly three
places (hero rule, primary button, logo). In a 15-second film, one gradient
moment is plenty — a glowing record button, a light sweep, the end card. A
gradient-washed background will look like a different product.

### Typography

- Display / headings: **Inter Tight**, weight 400–600, tracking `-0.04em`
- Body: **Inter**, weight 400–600
- Eyebrows: Inter, 600, **UPPERCASE**, tracking `0.16em`, in an accent colour

Do not use a weight above 600 — the licensed variable font tops out there and
anything heavier gets synthetically bolded, which smears at large sizes.

---

## 2. Video spec

### Where it goes

A full-bleed band between **How it works** and **Live practice**, on the `deep`
band. That is the section where the product's actual behaviour is being
explained, so a scenario film lands exactly where the question "what is this
like to use?" is being asked.

### Hard requirements

| Setting | Value | Why |
|---|---|---|
| **Background** | **`#070C17`** | Must match the band. Any other dark grey reads as a pasted-in rectangle. |
| Aspect ratio | **16:9** | Full-bleed band. Use 4:5 or 9:16 only if you want it inset beside text instead. |
| Resolution | 1920×1080 (2560×1440 max) | Beyond 1440p is wasted bytes on a marketing page. |
| Duration | **8–15 s** | It autoplays muted and loops. Longer than ~15 s and nobody sees the end. |
| Loop | **Seamless** | First and last frame should match. A visible cut on loop looks broken. |
| Frame rate | 24 or 30 fps | 24 reads more filmic; either is fine. |
| Audio | **None, or ignorable** | It autoplays muted — browsers require it. Nothing may depend on sound. |
| Format | **H.264 MP4** + optional WebM/VP9 | MP4 is the universal fallback. |
| File size | **≤ 3 MB**, ideally under 2 | The whole current site is 1.9 MB. A 20 MB hero video would dominate load time. |
| Colour | Rec.709 / sRGB, **no HDR** | HDR renders washed out or clipped in most browsers. |

### Composition

- **Safe margin:** keep essential subject matter within the centre 80%. The band
  crops on narrow screens.
- **No baked-in text.** Real HTML text stays sharp, is translatable, and is
  readable by screen readers. Headline and caption live on the page, not in the
  file.
- **Edges should fall off to the background colour** rather than ending on a hard
  frame. A vignette to `#070C17` makes it read as part of the page.
- **First frame is the poster.** It is what everyone on reduced-motion, slow
  connections, or a paused tab sees. Compose it as a still you'd be happy to
  publish on its own, and export it separately as a JPEG.

### Colour grading

- **Let the scene be warm.** A café is warm — and warmth is on-brand here,
  because `#FF9500` and `#FF375F` are already two of the four gradient stops.
- **Push shadows toward `#070C17`,** i.e. cool blue-black, not neutral grey and
  not brown. This is the single change that makes footage feel like it belongs
  on this page.
- **Keep one cool accent in frame** — a phone screen glow around `#0A84FF`, for
  instance — to tie back to the UI.
- **Avoid:** teal-and-orange blockbuster grading, green casts, pure `#000000`
  blacks, blown highlights, and any saturated colour outside the palette above
  (no reds outside the `#FF375F`/`#FF2D55` family, no yellows outside `#FF9F0A`).

### Which scenario to shoot

Use the **coffee shop queue** scenario. It is already the one rendered in the
hero phone mockup, down to the line of dialogue:

> "It's the only place near work that gets the milk right. You're not from
> around here, are you?"

Showing the same scenario in the film and in the mockup makes the page feel
authored rather than assembled. Keep it PG-13, keep it a conversation between
two adults where both parties have agency, and don't depict anyone being worn
down — that framing is a liability at App Review and it isn't what the product
does.

### Short colour-scheme lines (for Seedance and similar)

Append one of these to the end of a video prompt. Each is a single clause, which
is what these models weight best — long colour paragraphs get averaged away.

| # | Line | Mood |
|---|---|---|
| 1 | `cool blue-black shadows, warm amber highlights, deep navy background` | **Default.** Safest match to the page. |
| 2 | `midnight navy base, amber window light, electric blue screen glow` | Adds the UI-blue tie-back. |
| 3 | `deep indigo shadows, warm cafe amber, single cool blue accent` | Warmest; good for interiors. |
| 4 | `navy-black #070C17 shadows, amber #FF9500 highlights, blue #0A84FF accent` | Explicit hex, if the model honours it. |
| 5 | `dark blue-black palette, warm orange practicals, violet rim light` | Pulls in the gradient's violet end. |
| 6 | `low-key navy grade, warm skin tones, cold blue background separation` | Portrait / close-up shots. |

Always pair with the negative clause, or the model will drift to the default
cinematic look, which is exactly the grade that clashes with this page:

```
no teal-and-orange grade, no green cast, no pure black, no HDR
```

### Paste-ready style prompt

```
A short cinematic scene in a modern coffee shop, two people in their late
twenties talking easily while waiting in the queue. Warm practical lighting from
window and pendant lamps. Shallow depth of field, slow handheld drift, natural
unposed body language, one of them smiling mid-sentence.

Colour grade: cool blue-black shadows (#070C17), warm amber highlights
(#FF9500), one cool blue accent light around #0A84FF. Rec.709, no HDR, no
teal-and-orange look, no green cast, no pure black.

16:9, 1920x1080, 24fps, 12 seconds, seamless loop, no on-screen text,
no captions, no logos, subject within the centre 80% of frame,
edges falling off softly to near-black.
```

---

## 3. Adding it to the site

1. Put the files in `public/`:
   - `public/scenario.mp4` — H.264
   - `public/scenario.webm` — optional, served first if present
   - `public/scenario-poster.jpg` — the first frame, ~150 KB
2. Fill in [`content/media.ts`](../content/media.ts).
3. That's it. The band appears automatically once `mp4` is set, and stays hidden
   while it is empty — so nothing half-finished can ship.

The player is already wired for: autoplay muted inline, seamless loop, lazy
loading, a poster fallback, and **no autoplay at all for visitors whose OS asks
for reduced motion** — they get the poster and a play button instead.

## 4. Copy-paste values

```
Background / band  #070C17
Page canvas        #0B1220
Panel              #111827
Brand band         #171034
Closing bar        #05080F

Text               #F8FAFC  #CBD5E1  #94A3B8  #7C8BA1
Hairline           #1F2937  #334155

Accent blue        #0A84FF
Practice pink      #FF375F
Learn orange       #FF9F0A
Simulate violet    #BF5AF2
Stats green        #30D158

Gradient  100deg  #FF9500 → #FF2D55 (36%) → #AF52DE (68%) → #5856D6
Fonts     Inter Tight (display) · Inter (body) · max weight 600
```

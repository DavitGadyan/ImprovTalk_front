# ImprovTalk — colour palette & video integration spec

Everything here is the live value from [`app/globals.css`](../app/globals.css),
which mirrors the app's `theme.ts`. If a token changes there, change it here too.

---

## 1. Core palette

Design system B, exactly as the app ships it (`ImprovTalk/apps/mobile/src/ui/
theme.ts`). The site's `@theme` block in `app/globals.css` carries the same
values and nothing else.

### Surfaces — one ground, one card, one hairline

**The video's card sits on the page ground.** It is framed by the hairline, so
its edges are drawn for it; the footage no longer has to match a band exactly.

| Token | Hex | RGB | Where it's used |
|---|---|---|---|
| `canvas` | **`#000000`** | 0, 0, 0 | The page. Every section starts here — no navy, no charcoal |
| `surface` | `#1F1F1F` | 31, 31, 31 | Cards, panels, the header when scrolled, dialogs |
| `surface-elev` | `#2A2A2A` | 42, 42, 42 | A chip on a card, an empty bar track |
| `line` | `#313131` | 49, 49, 49 | The only hairline: borders, dividers, section edges |

### Text — two levels

| Role | Hex | On `#000000` | On `#1F1F1F` |
|---|---|---|---|
| Ink | `#FFFFFF` | 21.0:1 | 16.5:1 |
| Muted | `#8E8E93` | 6.4:1 | 5.1:1 |

Eyebrows and captions are muted. There is no third, fainter level.

### The one accent, and the data colours

| Name | Hex | Rule |
|---|---|---|
| Accent | **`#849CFF`** | A **fill** with black text on it (8.2:1): the active tab, a filled bar, the focus ring. As words, only for links and the active nav label. The primary button is the brand ramp, not the violet |
| Danger | `#FF6B6B` | Numbers, dots, glyphs, the required mark. Never a card tint |
| Warn | `#FFD166` | Same rule |
| Success | `#7DE2A6` | The score delta, a full bar |
| Gold | `#E0B84A` | The Max tier |

Blog categories: openers danger, attention warn, nerves gold, languages accent,
delivery success. The personality blend red/blue/yellow/green maps to
danger/accent/warn/success — the same four the app's sliders use.

### Brand gradient

```
linear-gradient(90deg, #F0912F, #E6455F, #A95ACC)
```

Orange → rose → purple: the logo's own sweep. On the site it appears in the
icon, inside the app renders (the Hold-to-speak disc), and — as the AA-safe
ramp `linear-gradient(100deg, #DF274A, #A44DD1 55%, #5856D6)` with white text —
on the primary button and the floating pill, nowhere else. In a film, one
gradient moment is plenty: the disc, a light sweep, the end card. A
gradient-washed background looks like a different product.

### Typography

- Everything: **Satoshi Variable**, one file for 300–900 plus an italic cut
  (`public/fonts/`). Display at 700, body at 400/500; the hero's emphasis word
  is the italic, as the app's own hero style is.
- Eyebrows: Satoshi 700, **UPPERCASE**, tracking `0.12em`, muted.
- Icons: Material Symbols Rounded, the same per-name subset the app bakes
  (`npm run gen:icons`). Outlined at rest, filled when active, white unless the
  colour is a signal.

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
| **Background** | **`#000000`** | The page ground. The film sits in a hairline-framed card, so a shadow tone near black (`#070C17` in the existing films) still reads as part of the page. |
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
  frame. A vignette toward black makes it read as part of the page.
- **First frame is the poster.** It is what everyone on reduced-motion, slow
  connections, or a paused tab sees. Compose it as a still you'd be happy to
  publish on its own, and export it separately as a JPEG.

### Colour grading

- **Let the scene be warm.** A café is warm — and warmth is on-brand here,
  because `#FF9500` and `#FF375F` are already two of the four gradient stops.
- **Push shadows toward black** — cool blue-black down to `#000000`, not neutral
  grey and not brown. The page ground is pure black now; the card's hairline
  frames the film, so the shadows need to sit near it, not match it.
- **Keep one cool accent in frame** — a phone screen glow around `#849CFF`, for
  instance — to tie back to the UI.
- **Avoid:** teal-and-orange blockbuster grading, green casts, crushed blacks
  with no detail, blown highlights, and any saturated colour outside the palette
  above (no reds outside the `#E6455F`/`#FF6B6B` family, no yellows outside
  `#FFD166`).

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

### The blocks every prompt carries

Paste these under the scene description. They are what makes generated footage
read as documentary rather than as a render, and they are identical on every
prompt in `personas/CASTING.md`.

```
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
DEPTH
Three clearly separated planes: something out of focus crossing the near
foreground, the subject sharp in the middle distance, and a background falling
well behind them. 35mm at a wide aperture so focus falls off naturally on both
sides of the subject. The handheld drift is what makes the planes slide against
each other — let a foreground element cross the frame at least once. Air in the
room: faint haze catching the practicals, specular highlights on glass and wet
surfaces, contact shadows where people and objects meet the floor and the table.
Depth comes from real lens behaviour and real atmosphere, never from a render.
LIGHT
Natural available light only, no stylised grade — the light line above describes
the practicals actually in the room, not a LUT. Skin tones stay true. The
darkest areas of the frame sit at #070C17.
END CARD, last 3 seconds
The available light washes into a purple-to-blue gradient with a warm orange
glow entering from the top left; the scene defocuses into the clean gradient and
the room tone continues underneath, never cutting to silence. Gradient at 100°:
#FF9500 to #FF2D55 at 36%, to #AF52DE at 68%, to #5856D6, settling to #070C17.
Keep the centre of the frame completely uncluttered through the wash — no faces,
no signage, no high-contrast detail in the middle third.
NEGATIVE
No teal-and-orange grade, no green cast, no pure black, no HDR, no colour
filter, no stylised LUT — colour must read as real light. No on-screen text, no
captions, no logos, no wordmarks, no lettering of any kind, no watermarks: the
mark is composited in post.
No 3D render, no CGI, no game-engine look, no animation, no illustration — this
is a photograph of real people.
```

Two of those matter more than the rest.

**`LIGHT` forbids a stylised grade, and the per-scene light line is not one.**
That line names the practicals actually in the room — a desk lamp, a window at
dusk, a phone screen. Choosing the hour and the practicals is how the palette
gets there. A LUT laid over the top is what makes footage look generated.

**`DEPTH` is what "make it more 3D" actually means.** The word *3D* in a prompt
pulls these models toward CGI, animation and a game-engine look — the exact
opposite of the documentary realism the `QUALITY` block asks for, and a direct
fight with *no CGI sheen*. What makes a frame read as three-dimensional is
separated planes, something crossing the near foreground, real focus falloff and
visible air. All of that is photographic, so `NEGATIVE` names the render look
explicitly and rules it out.

**`NEGATIVE` forbids the logo.** The model produces the wash; the mark goes on
in post. A generated wordmark comes back subtly wrong every time — letterforms
close but not right — and subtly wrong is worse than absent.

### End card — the post recipe

The prompt above already renders the three-second wash. Everything below is
composited on top of it.

| From | Frames | What |
|---|---|---|
| +0.0s | — | Gradient fully covers, 100°: `#FF9500` → `#FF2D55` 36% → `#AF52DE` 68% → `#5856D6` |
| +0.0s | 7 | `public/icon.png` fades up, centred, **22% of frame height**, the app's own corner radius |
| +0.6s | — | Wordmark **ImprovTalk** fades in beneath — Inter Tight 600, `#F8FAFC`, letter-spacing `-0.02em`, gap = ⅓ the mark's height |
| +1.3s | — | Optional line beneath, Inter 400, `#94A3B8`: *"Practice the conversation before you have it."* |
| last | 8 | Gradient eases to `#070C17` — the final frame is exactly the band colour |

**Audio carries through.** Room tone under the whole card, ducked 20% from the
first frame of the wash. Never cut to silence — the street or the room carrying
into the logo is the difference between an ending and a slide.

### Subtitle plate

For any clip with a line worth reading — a second language, a correction, a
punchline that lands on wording.

- **Keep the lower third clear** of faces, hands and high-contrast background
  for the whole subtitle window. Composite the plate afterwards; never let the
  model render text.
- **Type** Inter 500 at 3.2% of frame height. Lead with the phrase in
  `#F8FAFC`, then a middle dot, then the gloss in `#94A3B8`.
- **Plate** centred, baseline at 88% of frame height, over a 60%-opacity
  `#070C17` bar, 12px radius, padding of one line height, edges feathered 8px.
  White text over sunlit pavement strobes without it.
- **One card across a call and its answer.** If the joke is the gap between an
  attempt and a correction, the viewer needs both on screen at once.
- **Fade** in 4 frames, out 6.


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

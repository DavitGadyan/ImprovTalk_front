# Intro screen — seven images

Backgrounds for the first-run carousel in the app, at
`apps/mobile/assets/intro/` **in the ImprovTalk app repo**, not this one.
The registry is `apps/mobile/src/ui/IntroOverlay.tsx`.

The wordmark and tagline sit in a fixed band across the middle of every frame.
That band is the whole brief: whatever is generated has to be **quiet through
the middle third** so white type reads over it without a heavy scrim flattening
the photograph. Everything below follows from that.

## How to use these

Each prompt is **complete**. Copy one whole and paste it into **Seedream** at
the **2K** preset, **9:16 portrait** — scene, framing, casting, quality, light
and negatives are all inline, nothing to append.

- **Seedream for these stills, Seedance for the persona films**
  (`personas/CASTING.md`). Different models, and the prompts are not
  interchangeable — a video prompt in an image model loses every composition
  rule that matters here.
- **2K, never 1K or 1.5K.** Seedream has no custom width and height, only those
  three presets, and 9:16 at 2K is 1536 × 2720. 1.5K ships 768 × 1536 after the
  crop and has to be scaled up 1.9× on a Pro Max; 1K is unusable.
- **No logo in the plate.** The app draws the wordmark itself, in the dead zone.
  A generated one comes back subtly wrong and then sits under a real one.
- The light and negative blocks are the site's own, from
  [`BRAND-AND-VIDEO.md`](BRAND-AND-VIDEO.md).

## Every image

| | | |
|---|---|---|
| **Generate** | `1536 × 2720` | Seedream 2K preset, 9:16 portrait |
| **Ship** | `1600 × 3200` | centre-crop width to 1:2, then scale |
| **Safe margins** | `14% / 8%` | of width / of height — any resolution |
| **Dead zone** | `31.25 → 68.75%` | of frame height; wordmark and tagline |
| **Format** | `WebP q80` | under 1 MB — CI rejects larger |
| **Path** | `assets/intro/` | in the app repo, not the site |
| **Casting** | `20 – 30` | every subject, every frame |

## The geometry

Every plate is cropped **twice**, and the safe margins are the sum of both. Miss
either one and a subject placed exactly where the `FRAMING` block says to put it
gets cut through.

**Crop 1 — width to 1:2, at build time, once.** 9:16 in, 1:2 out. The frame gets
*narrower, not shorter*, so this takes **5.6% off each side and nothing off the
top or bottom**.

**Crop 2 — cover, at runtime, every launch.** One file, every phone.
`resizeMode="cover"` scales the 1:2 plate to the real screen: a 21:9 Android
takes another **7.1% off each side**, and a 16:9 SE takes **5.6% off the top and
bottom** instead. Whichever device — never both.

| Loss | Left / right | Top / bottom |
|---|---|---|
| Crop 1 — ship to 1:2 | 5.6% | 0% |
| Crop 2 — cover on the worst device | 6.3% | 5.6% |
| **Total lost** | **11.9%** | **5.6%** |
| **Safe margin in the prompts** | **14%** | **8%** |

Both margins clear their worst case, which is the whole test. Top and bottom
moved from 6.25% to **8%** — 6.25% cleared 5.6% by twelve pixels, close enough
that a subject drawn a touch high lost the top of a head on an iPhone SE and
nowhere else.

## Two corrections this spec has already needed

**The ship command cropped height as well as width.**
`-resize 200% -crop 1600x3200` against a doubled 2160 × 3840 frame took **320 px
off the top and bottom** and 280 off each side — not the 120 and 0 the margins
were written for. Every plate lost the outer sixth of its subject band. The
command below crops width only and works from any portrait source.

**The framing was written in 1080 × 1920 pixels; Seedream 2K returns
1536 × 2720.** "Keep y 600 to 1320 clear" pointed at the wrong band of a 2K
frame by roughly 250 px. Framing is now stated as **fractions of the frame**,
with pixel equivalents for both sizes, so it survives whatever resolution you
generate at.

Both failures have the same shape: a pixel number that looked plausible in prose
and described a frame nobody was generating. State geometry as fractions.

## The seven


### 1 · `dating.webp`

**Subjects** lower third · **Scrim** 0.55 · **Serves** Dating — Ethan 25, Nadia 27, Kaia 28
**Why it works** Warm tungsten interior, and the bokeh fills the top cleanly.

```
SCENE
Two people aged 20 to 30 at a small café table at night, mid-laugh, leaning in
toward each other, both clearly enjoying it and neither performing. Coffee cups
and a water glass crowd the small tabletop. Shot from slightly above table
height so both sit in the bottom third of the frame. Above them the room falls
away into warm tungsten bokeh — string lights and an out-of-focus bar back.

FRAMING
9:16 portrait, generated at the 2K preset (1536 x 2720).
Subjects occupy the bottom third of the frame, below 68.75%
of the frame height — nowhere else.
Keep the middle band — 31.25% to 68.75% of the frame height — completely
clear: no faces, no hands, no signage, nothing sharp and nothing high-contrast.
The wordmark and tagline are composited into that band afterwards.
That band is y 850 to y 1870 at 2K, or y 600 to y 1320 at 1080p.
Safe margins 14% of the width left and right, 8% of the height top and
bottom — 215 x 218 px at 2K, 151 x 154 px at 1080p.
This frame is centre-cropped to 1:2, which is narrower than 9:16, and then
cropped again to each phone's own shape. Nothing that matters may sit outside
those margins.

CASTING
All subjects aged 20 to 30. Faces are composites — no recognisable public
figures, no celebrity likeness.

QUALITY
4K still, hyperrealistic, indistinguishable from documentary photography.
Visible skin pores, fine facial hair, natural asymmetry, real fabric weave,
condensation on glassware.
Anatomically correct hands at all times. No morphing, no warping, no extra
fingers, no plastic skin, no CGI sheen, no beauty retouching.

DEPTH
Three clearly separated planes: an out-of-focus element at the near edge of the
frame, the subjects sharp in the middle distance, and a background falling well
behind them. 35mm at a wide aperture so focus falls off naturally on both sides.
Air in the scene: faint haze catching the light, specular highlights on glass
and wet surfaces, contact shadows grounding everyone to the floor. Foreground
elements stay at the frame edges and inside the subjects' own third — nothing
may cross the clear band. Depth comes from real lens behaviour, never from a
render.

LIGHT
Natural available light only, no stylised grade.
Late evening interior. Warm tungsten practicals and string lights only, no fill.
Cool blue-black shadows, warm amber highlights, skin tones true. The darkest
areas of the frame sit at #070C17.

NEGATIVE
No teal-and-orange grade, no green cast, no pure black, no HDR, no colour
filter, no stylised LUT — colour must read as real light. No on-screen text, no
captions, no legible signage or lettering, no logos, no wordmarks, no
watermarks. No 3D render, no CGI, no game-engine look, no animation, no
illustration — this is a photograph of real people.
```


### 2 · `group.webp`

**Subjects** lower third · **Scrim** 0.60 · **Serves** Social — Sam 24, Tom 26
**Why it works** Five faces is busy — shoot wide, and let depth of field do the separating.

```
SCENE
Four or five friends aged 20 to 30 standing in a loose circle in a bar, one of
them mid-sentence with their hands moving, the rest laughing at what was just
said. Drinks held at chest height. Shot wide and low so the whole group sits
across the bottom third of the frame. Above them the ceiling and warm pendant
lights blur to soft bokeh.

FRAMING
9:16 portrait, generated at the 2K preset (1536 x 2720).
Subjects occupy the bottom third of the frame, below 68.75%
of the frame height — nowhere else.
Keep the middle band — 31.25% to 68.75% of the frame height — completely
clear: no faces, no hands, no signage, nothing sharp and nothing high-contrast.
The wordmark and tagline are composited into that band afterwards.
That band is y 850 to y 1870 at 2K, or y 600 to y 1320 at 1080p.
Safe margins 14% of the width left and right, 8% of the height top and
bottom — 215 x 218 px at 2K, 151 x 154 px at 1080p.
This frame is centre-cropped to 1:2, which is narrower than 9:16, and then
cropped again to each phone's own shape. Nothing that matters may sit outside
those margins.

CASTING
All subjects aged 20 to 30. Faces are composites — no recognisable public
figures, no celebrity likeness.

QUALITY
4K still, hyperrealistic, indistinguishable from documentary photography.
Visible skin pores, fine facial hair, natural asymmetry, real fabric weave,
condensation on glassware.
Anatomically correct hands at all times. No morphing, no warping, no extra
fingers, no plastic skin, no CGI sheen, no beauty retouching.

DEPTH
Three clearly separated planes: an out-of-focus element at the near edge of the
frame, the subjects sharp in the middle distance, and a background falling well
behind them. 35mm at a wide aperture so focus falls off naturally on both sides.
Air in the scene: faint haze catching the light, specular highlights on glass
and wet surfaces, contact shadows grounding everyone to the floor. Foreground
elements stay at the frame edges and inside the subjects' own third — nothing
may cross the clear band. Depth comes from real lens behaviour, never from a
render.

LIGHT
Natural available light only, no stylised grade.
Bar interior, early evening. Warm pendant practicals, one cooler source behind.
Cool blue-black shadows, warm amber highlights, skin tones true. The darkest
areas of the frame sit at #070C17.

NEGATIVE
No teal-and-orange grade, no green cast, no pure black, no HDR, no colour
filter, no stylised LUT — colour must read as real light. No on-screen text, no
captions, no legible signage or lettering, no logos, no wordmarks, no
watermarks. No 3D render, no CGI, no game-engine look, no animation, no
illustration — this is a photograph of real people.
```


### 3 · `cultures.webp`

**Subjects** upper third · **Scrim** 0.50 · **Serves** Language — Andrés 29, Mei 30
**Why it works** Blue hour is already dark, and an upper-third frame breaks the rhythm of the set.

```
SCENE
Two people talking on a city street at blue hour — a man in his mid-twenties and
an Eastern European woman of about the same age, both aged 20 to 30, standing
close, both animated, both mid-conversation. Composed so their heads and
shoulders sit in the top third of the frame. Below them wet pavement and
out-of-focus traffic lights recede into deep blue.

FRAMING
9:16 portrait, generated at the 2K preset (1536 x 2720).
Subjects occupy the top third of the frame, above 31.25%
of the frame height — nowhere else.
Keep the middle band — 31.25% to 68.75% of the frame height — completely
clear: no faces, no hands, no signage, nothing sharp and nothing high-contrast.
The wordmark and tagline are composited into that band afterwards.
That band is y 850 to y 1870 at 2K, or y 600 to y 1320 at 1080p.
Safe margins 14% of the width left and right, 8% of the height top and
bottom — 215 x 218 px at 2K, 151 x 154 px at 1080p.
This frame is centre-cropped to 1:2, which is narrower than 9:16, and then
cropped again to each phone's own shape. Nothing that matters may sit outside
those margins.

CASTING
All subjects aged 20 to 30. Faces are composites — no recognisable public
figures, no celebrity likeness.

QUALITY
4K still, hyperrealistic, indistinguishable from documentary photography.
Visible skin pores, fine facial hair, natural asymmetry, real fabric weave.
Anatomically correct hands at all times. No morphing, no warping, no extra
fingers, no plastic skin, no CGI sheen, no beauty retouching.

DEPTH
Three clearly separated planes: an out-of-focus element at the near edge of the
frame, the subjects sharp in the middle distance, and a background falling well
behind them. 35mm at a wide aperture so focus falls off naturally on both sides.
Air in the scene: faint haze catching the light, specular highlights on glass
and wet surfaces, contact shadows grounding everyone to the floor. Foreground
elements stay at the frame edges and inside the subjects' own third — nothing
may cross the clear band. Depth comes from real lens behaviour, never from a
render.

LIGHT
Natural available light only, no stylised grade.
Blue hour. Street lamps and shop windows just coming on, cool ambient sky.
Cool blue-black shadows, warm amber highlights, skin tones true. The darkest
areas of the frame sit at #070C17.

NEGATIVE
No teal-and-orange grade, no green cast, no pure black, no HDR, no colour
filter, no stylised LUT — colour must read as real light. No on-screen text, no
captions, no legible signage or lettering, no logos, no wordmarks, no
watermarks. No 3D render, no CGI, no game-engine look, no animation, no
illustration — this is a photograph of real people.
```


### 4 · `gym.webp`

**Subjects** lower third · **Scrim** 0.60 · **Serves** Social — Tom 26
**Why it works** Bright overheads, and the equipment draws hard lines — keep them out of the type.

```
SCENE
Two people aged 20 to 30 talking between sets in a gym, one sitting on a bench
with a towel over one shoulder, the other standing with a hand on the frame of a
machine, both relaxed and mid-conversation. Bottom third of the frame. Above
them the gym recedes into blurred overhead lights and dark equipment.

FRAMING
9:16 portrait, generated at the 2K preset (1536 x 2720).
Subjects occupy the bottom third of the frame, below 68.75%
of the frame height — nowhere else.
Keep the middle band — 31.25% to 68.75% of the frame height — completely
clear: no faces, no hands, no signage, nothing sharp and nothing high-contrast.
The wordmark and tagline are composited into that band afterwards.
That band is y 850 to y 1870 at 2K, or y 600 to y 1320 at 1080p.
Safe margins 14% of the width left and right, 8% of the height top and
bottom — 215 x 218 px at 2K, 151 x 154 px at 1080p.
This frame is centre-cropped to 1:2, which is narrower than 9:16, and then
cropped again to each phone's own shape. Nothing that matters may sit outside
those margins.

CASTING
All subjects aged 20 to 30. Faces are composites — no recognisable public
figures, no celebrity likeness.

QUALITY
4K still, hyperrealistic, indistinguishable from documentary photography.
Visible skin pores, fine facial hair, natural asymmetry, real fabric weave.
Anatomically correct hands at all times. No morphing, no warping, no extra
fingers, no plastic skin, no CGI sheen, no beauty retouching.

DEPTH
Three clearly separated planes: an out-of-focus element at the near edge of the
frame, the subjects sharp in the middle distance, and a background falling well
behind them. 35mm at a wide aperture so focus falls off naturally on both sides.
Air in the scene: faint haze catching the light, specular highlights on glass
and wet surfaces, contact shadows grounding everyone to the floor. Foreground
elements stay at the frame edges and inside the subjects' own third — nothing
may cross the clear band. Depth comes from real lens behaviour, never from a
render.

LIGHT
Natural available light only, no stylised grade.
Bright overhead practicals with one warm window source, shadows kept deep.
Cool blue-black shadows, warm amber highlights, skin tones true. The darkest
areas of the frame sit at #070C17.

NEGATIVE
No teal-and-orange grade, no green cast, no pure black, no HDR, no colour
filter, no stylised LUT — colour must read as real light. No on-screen text, no
captions, no legible signage or lettering, no logos, no wordmarks, no
watermarks. No 3D render, no CGI, no game-engine look, no animation, no
illustration — this is a photograph of real people.
```


### 5 · `street.webp`

**Subjects** upper third · **Scrim** 0.65 · **Serves** Dating / Social — Ethan 25, Kaia 28
**Why it works** The brightest plate after the beach, so it carries the most scrim of the daylight set.

```
SCENE
Daytime on a city pavement, two people aged 20 to 30 stopped mid-conversation
that is clearly going well — one has just spoken, the other is smiling and
answering, both with open posture and turned toward each other. Heads and
shoulders in the top third of the frame. Below them the pavement and blurred
passers-by fall away out of focus.

FRAMING
9:16 portrait, generated at the 2K preset (1536 x 2720).
Subjects occupy the top third of the frame, above 31.25%
of the frame height — nowhere else.
Keep the middle band — 31.25% to 68.75% of the frame height — completely
clear: no faces, no hands, no signage, nothing sharp and nothing high-contrast.
The wordmark and tagline are composited into that band afterwards.
That band is y 850 to y 1870 at 2K, or y 600 to y 1320 at 1080p.
Safe margins 14% of the width left and right, 8% of the height top and
bottom — 215 x 218 px at 2K, 151 x 154 px at 1080p.
This frame is centre-cropped to 1:2, which is narrower than 9:16, and then
cropped again to each phone's own shape. Nothing that matters may sit outside
those margins.

CASTING
All subjects aged 20 to 30. Faces are composites — no recognisable public
figures, no celebrity likeness.

QUALITY
4K still, hyperrealistic, indistinguishable from documentary photography.
Visible skin pores, fine facial hair, natural asymmetry, real fabric weave.
Anatomically correct hands at all times. No morphing, no warping, no extra
fingers, no plastic skin, no CGI sheen, no beauty retouching.

DEPTH
Three clearly separated planes: an out-of-focus element at the near edge of the
frame, the subjects sharp in the middle distance, and a background falling well
behind them. 35mm at a wide aperture so focus falls off naturally on both sides.
Air in the scene: faint haze catching the light, specular highlights on glass
and wet surfaces, contact shadows grounding everyone to the floor. Foreground
elements stay at the frame edges and inside the subjects' own third — nothing
may cross the clear band. Depth comes from real lens behaviour, never from a
render.

LIGHT
Natural available light only, no stylised grade.
Mid-afternoon, low sun coming down the length of the street between buildings.
Cool blue-black shadows, warm amber highlights, skin tones true. The darkest
areas of the frame sit at #070C17.

NEGATIVE
No teal-and-orange grade, no green cast, no pure black, no HDR, no colour
filter, no stylised LUT — colour must read as real light. No on-screen text, no
captions, no legible signage or lettering, no logos, no wordmarks, no
watermarks. No 3D render, no CGI, no game-engine look, no animation, no
illustration — this is a photograph of real people.
```


### 6 · `beach.webp`

**Subjects** lower third · **Scrim** 0.70 · **Serves** Social — Sam 24, Tom 26
**Why it works** Sky and sand wash out white type worse than anything else in the set — hence the heaviest scrim.

```
SCENE
Golden hour at the water's edge, two people aged 20 to 30 barefoot at the
shoreline, walking and talking, mid-stride and half-turned toward each other.
Bottom third of the frame. Above them an open sky graduating from warm gold to
deep blue, completely clean — no hard-edged clouds.

FRAMING
9:16 portrait, generated at the 2K preset (1536 x 2720).
Subjects occupy the bottom third of the frame, below 68.75%
of the frame height — nowhere else.
Keep the middle band — 31.25% to 68.75% of the frame height — completely
clear: no faces, no hands, no signage, nothing sharp and nothing high-contrast.
The wordmark and tagline are composited into that band afterwards.
That band is y 850 to y 1870 at 2K, or y 600 to y 1320 at 1080p.
Safe margins 14% of the width left and right, 8% of the height top and
bottom — 215 x 218 px at 2K, 151 x 154 px at 1080p.
This frame is centre-cropped to 1:2, which is narrower than 9:16, and then
cropped again to each phone's own shape. Nothing that matters may sit outside
those margins.

CASTING
All subjects aged 20 to 30. Faces are composites — no recognisable public
figures, no celebrity likeness.

QUALITY
4K still, hyperrealistic, indistinguishable from documentary photography.
Visible skin pores, fine facial hair, natural asymmetry, real fabric weave.
Anatomically correct hands at all times. No morphing, no warping, no extra
fingers, no plastic skin, no CGI sheen, no beauty retouching.

DEPTH
Three clearly separated planes: an out-of-focus element at the near edge of the
frame, the subjects sharp in the middle distance, and a background falling well
behind them. 35mm at a wide aperture so focus falls off naturally on both sides.
Air in the scene: sea haze catching the low sun, specular highlights on wet
sand and the water's edge, contact shadows grounding both of them to the sand. Foreground
elements stay at the frame edges and inside the subjects' own third — nothing
may cross the clear band. Depth comes from real lens behaviour, never from a
render.

LIGHT
Natural available light only, no stylised grade.
Golden hour, low sun across water, long soft shadows, no fill.
Cool blue-black shadows, warm amber highlights, skin tones true. The darkest
areas of the frame sit at #070C17.

NEGATIVE
No teal-and-orange grade, no green cast, no pure black, no HDR, no colour
filter, no stylised LUT — colour must read as real light. No on-screen text, no
captions, no legible signage or lettering, no logos, no wordmarks, no
watermarks. No 3D render, no CGI, no game-engine look, no animation, no
illustration — this is a photograph of real people.
```


### 7 · `speaking.webp`

**Subjects** lower third · **Scrim** 0.50 · **Serves** Work — Zoe 26
**Why it works** The room behind the speaker is already dark, so the scrim only holds back one lit face. It is also the only frame in the set that is not social — it says the app is for the meeting and the interview too, which is half the personas.

```
SCENE
A person in their mid-twenties speaking to a small audience in a warmly lit room,
standing at the front, mid-gesture and clearly mid-sentence, the listeners turned
toward them. Shot from the third row so the speaker sits in the bottom third of
the frame, with a few dark out-of-focus heads and shoulders in the immediate
foreground. Above the speaker the wall and ceiling fall into shadow.

FRAMING
9:16 portrait, generated at the 2K preset (1536 x 2720).
Subjects occupy the bottom third of the frame, below 68.75%
of the frame height — nowhere else.
Keep the middle band — 31.25% to 68.75% of the frame height — completely
clear: no faces, no hands, no signage, nothing sharp and nothing high-contrast.
The wordmark and tagline are composited into that band afterwards.
That band is y 850 to y 1870 at 2K, or y 600 to y 1320 at 1080p.
Safe margins 14% of the width left and right, 8% of the height top and
bottom — 215 x 218 px at 2K, 151 x 154 px at 1080p.
This frame is centre-cropped to 1:2, which is narrower than 9:16, and then
cropped again to each phone's own shape. Nothing that matters may sit outside
those margins.

CASTING
All subjects aged 20 to 30. Faces are composites — no recognisable public
figures, no celebrity likeness.

QUALITY
4K still, hyperrealistic, indistinguishable from documentary photography.
Visible skin pores, fine facial hair, natural asymmetry, real fabric weave.
Anatomically correct hands at all times. No morphing, no warping, no extra
fingers, no plastic skin, no CGI sheen, no beauty retouching.

DEPTH
Three clearly separated planes: an out-of-focus element at the near edge of the
frame, the subjects sharp in the middle distance, and a background falling well
behind them. 35mm at a wide aperture so focus falls off naturally on both sides.
Air in the scene: faint haze catching the light, specular highlights on glass
and wet surfaces, contact shadows grounding everyone to the floor. Foreground
elements stay at the frame edges and inside the subjects' own third — nothing
may cross the clear band. Depth comes from real lens behaviour, never from a
render.

LIGHT
Natural available light only, no stylised grade.
Dark room, one warm pool of light on the speaker, everything else falling off.
Cool blue-black shadows, warm amber highlights, skin tones true. The darkest
areas of the frame sit at #070C17.

NEGATIVE
No teal-and-orange grade, no green cast, no pure black, no HDR, no colour
filter, no stylised LUT — colour must read as real light. No on-screen text, no
captions, no legible signage or lettering, no logos, no wordmarks, no
watermarks. No 3D render, no CGI, no game-engine look, no animation, no
illustration — this is a photograph of real people.
```


## What a 20–30 cap costs

Capping every subject at 30 means **seven of the fifteen personas have nobody on
this screen who looks like them** — Jonas 31, Arjun 33, Oskar 34, Ben 35, Marcus
37, Claire 38, Amara 41.

- **The Reset family disappears entirely.** Claire and Oskar are 38 and 34, and
  Claire's whole brief is that she is *not* starting out.
- **The Work family is down to Zoe.** Arjun, Ben and Amara are 33 to 41, and
  between them they carry the clearest willingness to pay.

If the cap is a deliberate positioning call it holds. If not, the cheapest
correction is to let `speaking.webp` and `beach.webp` run 30–40.

## Carousel order

The set runs lower-heavy — five lower-third frames to two upper. Order them so
the two upper frames break the run rather than sitting together, which also
stops the scrim appearing to step up and down at random on a swipe.

`dating · cultures · group · street · gym · beach · speaking`

## Ship pipeline

Resolution-independent: the same two lines work from a 2K generation, a 1080p
one or a 4K one, because the target does the deciding rather than a hard-coded
scale factor.

```bash
# Any portrait source -> 1600x3200. The ^ fills the target, then extent
# crops the overflow centred. From any 9:16 input that is WIDTH ONLY --
# height is already 1:2-compatible, so nothing is lost top or bottom.
magick in.png -resize 1600x3200^ -gravity center -extent 1600x3200 +repage \
  -quality 80 -define webp:method=6 out.webp

# CI rejects anything over 1 MB
find apps/mobile/assets/intro -name '*.webp' -size +1024k -print -exec false {} +
```

## Before shipping a frame

1. **Check the dead zone, not the whole image.** Crop the middle band — 31.25%
   to 68.75% of the height — apply the scrim, and confirm white type clears
   4.5:1 against the *lightest* patch in that band, not the average, which hides
   a bright window.
2. **Check the margins after both crops, not one.** Open the shipped
   1600 × 3200 file and mask 7.1% off each side and 5.6% off the top and bottom
   — that is what a 21:9 Android and an iPhone SE each actually show. Anything
   that matters must survive both masks.
3. **No text anywhere in the plate.** Generated signage and menu boards produce
   letter-shaped noise that reads as a typo behind real type.
4. **Faces are composites.** Reject anything that resembles a specific real
   person.

All seven stay PG-13 — two adults, both with agency, nobody being worn down.
App Review sees this screen before it sees anything else in the app.

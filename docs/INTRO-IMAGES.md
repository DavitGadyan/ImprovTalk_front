# Intro screen — seven images

Backgrounds for the first-run carousel in the app, at
`apps/mobile/assets/intro/` **in the ImprovTalk app repo**, not this one.

The wordmark, the tagline and the stars sit in a fixed band across the middle of
every frame. That band is the whole brief: whatever is generated has to be
**quiet between y = 600 and y = 1320** so white type reads over it without a
heavy scrim flattening the photograph. Everything below follows from that.

## Every image

| | |
|---|---|
| Generate | 9:16 portrait @ 1080p → **1080 × 1920** |
| Ship | **1600 × 3200** (2× upscale → crop to 1:2 → downscale) |
| Safe margins | 150 px left/right, 120 px top/bottom, on the 1080 × 1920 frame |
| Dead zone | **y = 600 → 1320** — wordmark, tagline and stars sit here |
| Format | WebP q80, **under 1 MB** — CI rejects larger |
| Path | `apps/mobile/assets/intro/` |
| Casting | **20–30 years old**, every subject, every frame |

**Subjects sit in the upper or lower third — never the middle.** A frame that is
correct on every other count and busy through the middle is a reject, because
the only fix left is more scrim, and more scrim is what makes an app look like a
stock-photo template.

**Scrim** is the peak alpha of a `#070C17` overlay across the dead zone, fading
to nothing at the subject's end of the frame. The value per image is set by how
bright the plate is: the beach needs 0.70, a blue-hour street needs 0.50.

## How to use these

Each prompt below is **complete**. Copy one whole and paste it into
**Seedream 5 Pro** — scene, framing, casting, quality, light and negatives are
all inline, with nothing to append.

Seedream for these stills; **Seedance** for the persona films in
`personas/CASTING.md`. They are different models and the prompts are not
interchangeable — a video prompt pasted into an image model loses every
composition rule that matters here.

The light and negative blocks are the ones in
[`BRAND-AND-VIDEO.md`](BRAND-AND-VIDEO.md), so the intro screen, the persona
films and the site all come from the same world.

**No logo in the plate.** The app draws the wordmark itself, in the dead zone.
A generated one comes back subtly wrong and sits under a real one.

**All seven stay PG-13.** Two adults, both with agency, nobody being worn down.
App Review sees this screen before it sees anything else in the app.

---

## 1 · `dating.webp`

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
9:16 portrait, 1080 x 1920. Subjects occupy the bottom third of the frame,
below y 1320 — nowhere else.
Keep y 600 to 1320 completely clear: no faces, no hands, no signage, nothing
sharp and nothing high-contrast. The wordmark, tagline and stars are composited
into that band afterwards.
Safe margins 150 px left and right, 120 px top and bottom. The composition must
survive a centre crop to 1:2, which is taller than this frame.

CASTING
All subjects aged 20 to 30. Faces are composites — no recognisable public
figures, no celebrity likeness.

QUALITY
4K still, hyperrealistic, indistinguishable from documentary photography.
Visible skin pores, fine facial hair, natural asymmetry, real fabric weave,
condensation on glassware. Anatomically correct hands at all times. No morphing,
no warping, no extra fingers, no plastic skin, no CGI sheen, no beauty
retouching.

LIGHT
Natural available light only, no stylised grade.
Late evening interior. Warm tungsten practicals and string lights only, no fill.
Cool blue-black shadows, warm amber highlights, skin tones true. The darkest
areas of the frame sit at #070C17.

NEGATIVE
No teal-and-orange grade, no green cast, no pure black, no HDR, no colour
filter, no stylised LUT — colour must read as real light. No on-screen text, no
captions, no legible signage or lettering, no logos, no wordmarks, no
watermarks.
```

## 2 · `group.webp`

**Subjects** lower third, wide · **Scrim** 0.60 · **Serves** Social — Sam 24, Tom 26
**Why it works** Five faces is busy — shoot wide, and let depth of field do the
separating.

```
SCENE
Four or five friends aged 20 to 30 standing in a loose circle in a bar, one of
them mid-sentence with their hands moving, the rest laughing at what was just
said. Drinks held at chest height. Shot wide and low so the whole group sits
across the bottom third of the frame. Above them the ceiling and warm pendant
lights blur to soft bokeh.

FRAMING
9:16 portrait, 1080 x 1920. Subjects occupy the bottom third of the frame,
below y 1320 — nowhere else.
Keep y 600 to 1320 completely clear: no faces, no hands, no signage, nothing
sharp and nothing high-contrast. The wordmark, tagline and stars are composited
into that band afterwards.
Safe margins 150 px left and right, 120 px top and bottom. The composition must
survive a centre crop to 1:2, which is taller than this frame.

CASTING
All subjects aged 20 to 30. Faces are composites — no recognisable public
figures, no celebrity likeness.

QUALITY
4K still, hyperrealistic, indistinguishable from documentary photography.
Visible skin pores, fine facial hair, natural asymmetry, real fabric weave,
condensation on glassware. Anatomically correct hands at all times. No morphing,
no warping, no extra fingers, no plastic skin, no CGI sheen, no beauty
retouching.

LIGHT
Natural available light only, no stylised grade.
Bar interior, early evening. Warm pendant practicals, one cooler source behind.
Cool blue-black shadows, warm amber highlights, skin tones true. The darkest
areas of the frame sit at #070C17.

NEGATIVE
No teal-and-orange grade, no green cast, no pure black, no HDR, no colour
filter, no stylised LUT — colour must read as real light. No on-screen text, no
captions, no legible signage or lettering, no logos, no wordmarks, no
watermarks.
```

## 3 · `cultures.webp`

**Subjects** upper third · **Scrim** 0.50 · **Serves** Language — Andrés 29, Mei 30
**Why it works** Blue hour is already dark, and an upper-third frame breaks the
rhythm of the set.

```
SCENE
Two people talking on a city street at blue hour — a man in his mid-twenties and
an Eastern European woman of about the same age, both aged 20 to 30, standing
close, both animated, both mid-conversation. Composed so their heads and
shoulders sit in the top third of the frame. Below them wet pavement and
out-of-focus traffic lights recede into deep blue.

FRAMING
9:16 portrait, 1080 x 1920. Subjects occupy the top third of the frame,
above y 600 — nowhere else.
Keep y 600 to 1320 completely clear: no faces, no hands, no signage, nothing
sharp and nothing high-contrast. The wordmark, tagline and stars are composited
into that band afterwards.
Safe margins 150 px left and right, 120 px top and bottom. The composition must
survive a centre crop to 1:2, which is taller than this frame.

CASTING
All subjects aged 20 to 30. Faces are composites — no recognisable public
figures, no celebrity likeness.

QUALITY
4K still, hyperrealistic, indistinguishable from documentary photography.
Visible skin pores, fine facial hair, natural asymmetry, real fabric weave.
Anatomically correct hands at all times. No morphing, no warping, no extra
fingers, no plastic skin, no CGI sheen, no beauty retouching.

LIGHT
Natural available light only, no stylised grade.
Blue hour. Street lamps and shop windows just coming on, cool ambient sky.
Cool blue-black shadows, warm amber highlights, skin tones true. The darkest
areas of the frame sit at #070C17.

NEGATIVE
No teal-and-orange grade, no green cast, no pure black, no HDR, no colour
filter, no stylised LUT — colour must read as real light. No on-screen text, no
captions, no legible signage or lettering, no logos, no wordmarks, no
watermarks.
```

## 4 · `gym.webp`

**Subjects** lower third · **Scrim** 0.60 · **Serves** Social — Tom 26
**Why it works** Bright overheads, and the equipment draws hard lines — keep
them out of the type.

```
SCENE
Two people aged 20 to 30 talking between sets in a gym, one sitting on a bench
with a towel over one shoulder, the other standing with a hand on the frame of a
machine, both relaxed and mid-conversation. Bottom third of the frame. Above
them the gym recedes into blurred overhead lights and dark equipment.

FRAMING
9:16 portrait, 1080 x 1920. Subjects occupy the bottom third of the frame,
below y 1320 — nowhere else.
Keep y 600 to 1320 completely clear: no faces, no hands, no signage, nothing
sharp and nothing high-contrast. The wordmark, tagline and stars are composited
into that band afterwards.
Safe margins 150 px left and right, 120 px top and bottom. The composition must
survive a centre crop to 1:2, which is taller than this frame.

CASTING
All subjects aged 20 to 30. Faces are composites — no recognisable public
figures, no celebrity likeness.

QUALITY
4K still, hyperrealistic, indistinguishable from documentary photography.
Visible skin pores, fine facial hair, natural asymmetry, real fabric weave.
Anatomically correct hands at all times. No morphing, no warping, no extra
fingers, no plastic skin, no CGI sheen, no beauty retouching.

LIGHT
Natural available light only, no stylised grade.
Bright overhead practicals with one warm window source, shadows kept deep.
Cool blue-black shadows, warm amber highlights, skin tones true. The darkest
areas of the frame sit at #070C17.

NEGATIVE
No teal-and-orange grade, no green cast, no pure black, no HDR, no colour
filter, no stylised LUT — colour must read as real light. No on-screen text, no
captions, no legible signage or lettering, no logos, no wordmarks, no
watermarks.
```

## 5 · `street.webp`

**Subjects** upper third · **Scrim** 0.65 · **Serves** Dating / Social — Ethan 25, Kaia 28
**Why it works** The brightest plate after the beach, so it carries the most
scrim of the daylight set.

```
SCENE
Daytime on a city pavement, two people aged 20 to 30 stopped mid-conversation
that is clearly going well — one has just spoken, the other is smiling and
answering, both with open posture and turned toward each other. Heads and
shoulders in the top third of the frame. Below them the pavement and blurred
passers-by fall away out of focus.

FRAMING
9:16 portrait, 1080 x 1920. Subjects occupy the top third of the frame,
above y 600 — nowhere else.
Keep y 600 to 1320 completely clear: no faces, no hands, no signage, nothing
sharp and nothing high-contrast. The wordmark, tagline and stars are composited
into that band afterwards.
Safe margins 150 px left and right, 120 px top and bottom. The composition must
survive a centre crop to 1:2, which is taller than this frame.

CASTING
All subjects aged 20 to 30. Faces are composites — no recognisable public
figures, no celebrity likeness.

QUALITY
4K still, hyperrealistic, indistinguishable from documentary photography.
Visible skin pores, fine facial hair, natural asymmetry, real fabric weave.
Anatomically correct hands at all times. No morphing, no warping, no extra
fingers, no plastic skin, no CGI sheen, no beauty retouching.

LIGHT
Natural available light only, no stylised grade.
Mid-afternoon, low sun coming down the length of the street between buildings.
Cool blue-black shadows, warm amber highlights, skin tones true. The darkest
areas of the frame sit at #070C17.

NEGATIVE
No teal-and-orange grade, no green cast, no pure black, no HDR, no colour
filter, no stylised LUT — colour must read as real light. No on-screen text, no
captions, no legible signage or lettering, no logos, no wordmarks, no
watermarks.
```

## 6 · `beach.webp`

**Subjects** lower third · **Scrim** 0.70 · **Serves** Social — Sam 24, Tom 26
**Why it works** Sky and sand wash out white type worse than anything else in
the set — hence the heaviest scrim.

```
SCENE
Golden hour at the water's edge, two people aged 20 to 30 barefoot at the
shoreline, walking and talking, mid-stride and half-turned toward each other.
Bottom third of the frame. Above them an open sky graduating from warm gold to
deep blue, completely clean — no hard-edged clouds.

FRAMING
9:16 portrait, 1080 x 1920. Subjects occupy the bottom third of the frame,
below y 1320 — nowhere else.
Keep y 600 to 1320 completely clear: no faces, no hands, no signage, nothing
sharp and nothing high-contrast. The wordmark, tagline and stars are composited
into that band afterwards.
Safe margins 150 px left and right, 120 px top and bottom. The composition must
survive a centre crop to 1:2, which is taller than this frame.

CASTING
All subjects aged 20 to 30. Faces are composites — no recognisable public
figures, no celebrity likeness.

QUALITY
4K still, hyperrealistic, indistinguishable from documentary photography.
Visible skin pores, fine facial hair, natural asymmetry, real fabric weave.
Anatomically correct hands at all times. No morphing, no warping, no extra
fingers, no plastic skin, no CGI sheen, no beauty retouching.

LIGHT
Natural available light only, no stylised grade.
Golden hour, low sun across water, long soft shadows, no fill.
Cool blue-black shadows, warm amber highlights, skin tones true. The darkest
areas of the frame sit at #070C17.

NEGATIVE
No teal-and-orange grade, no green cast, no pure black, no HDR, no colour
filter, no stylised LUT — colour must read as real light. No on-screen text, no
captions, no legible signage or lettering, no logos, no wordmarks, no
watermarks.
```

## 7 · `speaking.webp`

**Subjects** lower third · **Scrim** 0.50 · **Serves** Work — Zoe 26
**Why it works** The room behind the speaker is already dark, so the scrim only
has to hold back one lit face. It is also the only frame in the set that is not
social — it says the app is for the meeting and the interview too, which is half
the personas.

```
SCENE
A person in their mid-twenties speaking to a small audience in a warmly lit room,
standing at the front, mid-gesture and clearly mid-sentence, the listeners turned
toward them. Shot from the third row so the speaker sits in the bottom third of
the frame, with a few dark out-of-focus heads and shoulders in the immediate
foreground. Above the speaker the wall and ceiling fall into shadow.

FRAMING
9:16 portrait, 1080 x 1920. Subjects occupy the bottom third of the frame,
below y 1320 — nowhere else.
Keep y 600 to 1320 completely clear: no faces, no hands, no signage, nothing
sharp and nothing high-contrast. The wordmark, tagline and stars are composited
into that band afterwards.
Safe margins 150 px left and right, 120 px top and bottom. The composition must
survive a centre crop to 1:2, which is taller than this frame.

CASTING
All subjects aged 20 to 30. Faces are composites — no recognisable public
figures, no celebrity likeness.

QUALITY
4K still, hyperrealistic, indistinguishable from documentary photography.
Visible skin pores, fine facial hair, natural asymmetry, real fabric weave.
Anatomically correct hands at all times. No morphing, no warping, no extra
fingers, no plastic skin, no CGI sheen, no beauty retouching.

LIGHT
Natural available light only, no stylised grade.
Dark room, one warm pool of light on the speaker, everything else falling off.
Cool blue-black shadows, warm amber highlights, skin tones true. The darkest
areas of the frame sit at #070C17.

NEGATIVE
No teal-and-orange grade, no green cast, no pure black, no HDR, no colour
filter, no stylised LUT — colour must read as real light. No on-screen text, no
captions, no legible signage or lettering, no logos, no wordmarks, no
watermarks.
```

---

## What a 20–30 cap costs

Capping every subject at 30 means **seven of the fifteen personas have nobody on
this screen who looks like them** — Jonas 31, Arjun 33, Oskar 34, Ben 35, Marcus
37, Claire 38, Amara 41. Two consequences worth deciding on rather than
discovering later:

- **The Reset family disappears entirely.** Claire and Oskar are 38 and 34, and
  Claire's whole brief is that she is *not* starting out. A first screen of
  twenty-somethings is the fastest way to tell her this is not for her.
- **The Work family is down to Zoe.** Arjun, Ben and Amara are 33 to 41, and
  between them they carry the clearest willingness to pay in the whole set.

If the cap is a deliberate positioning call it holds — the intro screen sells to
whoever is most likely to install, and the persona pages do the rest. If it is
not, the cheapest correction is to let `speaking.webp` and `beach.webp` run
30–40, which restores both families for the price of two frames.

## Carousel order

Generated, the set runs lower-heavy: five lower-third frames to two upper. Order
them so the two upper-third frames break the run rather than sitting together —

`dating · cultures · group · street · gym · beach · speaking`

— which also alternates dark and bright plates, so the scrim does not appear to
step up and down at random as someone swipes.

## Ship pipeline

```bash
# from a 1080x1920 generation
magick in.png -resize 200% -gravity center -crop 1600x3200+0+0 +repage \
  -resize 1600x3200 -quality 80 -define webp:method=6 out.webp

# CI rejects anything over 1 MB
find apps/mobile/assets/intro -name '*.webp' -size +1024k -print -exec false {} +
```

## Before shipping a frame

1. **Check the dead zone, not the whole image.** Crop `y = 600 → 1320`, apply
   the scrim, and confirm white type clears 4.5:1 against the *lightest* patch
   in that band — not the average, which hides a bright window.
2. **Check the safe margins at the real aspect.** The ship crop is 1:2, taller
   than the 9:16 generation. A face near the top of the generated frame can be
   cropped through.
3. **No text anywhere in the plate.** Generated signage and menu boards produce
   letter-shaped noise that reads as a typo behind real type.
4. **Faces are composites.** Reject anything that resembles a specific real
   person.

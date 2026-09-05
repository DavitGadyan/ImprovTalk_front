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

**Subjects sit in the upper or lower third — never the middle.** A frame that is
correct on every other count and busy through the middle is a reject, because
the only fix left is more scrim, and more scrim is what makes an app look like a
stock-photo template.

**Scrim** is the peak alpha of a `#070C17` overlay across the dead zone, fading
to nothing at the subject's end of the frame. The value per image is set by how
bright the plate is: the beach needs 0.70, a blue-hour street needs 0.50.

## Shared prompt tail

Append to every prompt below.

```
9:16 portrait, 1080x1920, photographic, natural unposed body language,
shallow depth of field, real skin texture, no on-screen text, no captions,
no logos, no watermark, no recognisable public figures.
cool blue-black shadows, warm amber highlights, one cool blue accent.
no teal-and-orange grade, no green cast, no pure black, no HDR.
```

The grade lines are the ones in [`BRAND-AND-VIDEO.md`](BRAND-AND-VIDEO.md), so
the intro screen and the marketing films come from the same world.

**All seven stay PG-13.** Two adults, both with agency, nobody being worn down.
App Review sees this screen before it sees anything else in the app.

---

## 1 · `dating.webp`

**Subjects** lower third · **Scrim** 0.55 · **Serves** the Dating family — Nadia,
Jonas, Ethan
**Why it works** Warm tungsten interior, and the bokeh fills the top cleanly.

```
Two people in their late twenties at a small café table at night, mid-laugh,
leaning in toward each other, both clearly enjoying it and neither performing.
Shot from slightly above table height so both sit in the bottom third of a tall
vertical frame. Above them the room falls away into warm tungsten bokeh —
string lights and an out-of-focus bar back — with nothing sharp anywhere in the
middle of the frame.
```

## 2 · `group.webp`

**Subjects** lower third, wide · **Scrim** 0.60 · **Serves** Tom, Oskar
**Why it works** Five faces is busy — shoot wide, and let depth of field do the
separating.

```
Four or five friends standing in a loose circle in a bar, one of them mid-
sentence with their hands moving, the rest laughing at what was just said. Shot
wide and low so the whole group sits across the bottom third of a tall vertical
frame. Above them the ceiling and warm pendant lights blur to soft bokeh, with
nothing sharp through the middle of the frame.
```

## 3 · `cultures.webp`

**Subjects** upper third · **Scrim** 0.50 · **Serves** Andrés, Mei
**Why it works** Blue hour is already dark, and an upper-third frame breaks the
rhythm of the set.

```
Two people talking on a city street at blue hour — a man in his late twenties
and an Eastern European woman of about the same age, standing close, both
animated, both mid-conversation. Composed so their heads and shoulders sit in
the top third of a tall vertical frame. Below them wet pavement and out-of-focus
traffic lights recede into deep blue, nothing sharp in the middle of the frame.
```

## 4 · `gym.webp`

**Subjects** lower third · **Scrim** 0.60 · **Serves** Tom, Ben
**Why it works** Bright overheads, and the equipment draws hard lines — keep
them out of the type.

```
Two people talking between sets in a gym, one sitting on a bench with a towel
over one shoulder, the other standing with a hand on the frame of a machine,
both relaxed and mid-conversation. Bottom third of a tall vertical frame. Above
them the gym recedes into blurred overhead lights and dark equipment, with
nothing sharp through the middle of the frame.
```

## 5 · `street.webp`

**Subjects** upper third · **Scrim** 0.65 · **Serves** Kaia, Ethan
**Why it works** The brightest plate after the beach, so it carries the most
scrim of the daylight set.

```
Daytime on a city pavement, two people stopped mid-conversation that is clearly
going well — one has just spoken, the other is smiling and answering, both with
open posture and turned toward each other. Heads and shoulders in the top third
of a tall vertical frame. Below them the pavement and blurred passers-by fall
away out of focus, nothing sharp in the middle of the frame.
```

## 6 · `beach.webp`

**Subjects** lower third · **Scrim** 0.70 · **Serves** Claire, Marcus
**Why it works** Sky and sand wash out white type worse than anything else in
the set — hence the heaviest scrim.

```
Golden hour at the water's edge, two people barefoot at the shoreline, walking
and talking, mid-stride and half-turned toward each other. Bottom third of a
tall vertical frame. Above them an open sky graduating from warm gold to deep
blue, completely clean — no hard-edged clouds, nothing sharp in the middle of
the frame.
```

## 7 · `speaking.webp`

**Subjects** lower third · **Scrim** 0.50 · **Serves** the Work family — Arjun,
Zoe, Amara, Ben
**Why it works** The room behind the speaker is already dark, so the scrim only
has to hold back one lit face. It is also the only frame in the set that is not
social — it says the app is for the meeting and the interview too, which is half
the personas.

```
A person in their thirties speaking to a small audience in a warmly lit room,
standing at the front, mid-gesture and clearly mid-sentence, the listeners
turned toward them. Shot from the third row so the speaker sits in the bottom
third of a tall vertical frame, with a few dark out-of-focus heads and
shoulders in the immediate foreground. Above the speaker the wall and ceiling
fall into shadow with one soft pool of warm light, nothing sharp in the middle
of the frame.
```

---

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

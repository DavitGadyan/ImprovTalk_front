# Casting sheet — fifteen personas on camera

Companion to [`../PERSONAS-15.md`](../PERSONAS-15.md), which says who these
people are and what they search for. This one says what they **look like** and
what to **film them doing**, so fifteen generated clips read as fifteen
different people rather than one stock actor in fifteen jackets.

Every persona gets two clips:

- **A · The rep** — alone, phone in hand, practising. Nobody watching. This is
  the product.
- **B · The real thing** — the same person in the setting they actually care
  about, doing one specific rapport beat. This is the payoff.

The pair is the whole story: practise where nobody hears you, then use it where
it counts. A clip of the app alone sells a feature; the pair sells the reason.

## Before you generate anything

**These are fictional composites.** They are not real customers and no clip
should be captioned as a testimonial. Nothing here is a claim about results.

**Keep the same face across a persona's two clips.** Generate A, keep the best
frame, and feed it back as a reference image for B. Without that you get two
strangers and the pairing collapses.

**Never let the model render the logo.** Every prompt ends by forbidding text
and marks. The wash it produces is the plate; the icon, the wordmark and the
line are composited afterwards — see the end-card recipe in
`../BRAND-AND-VIDEO.md`. A generated wordmark comes back subtly wrong every
time, and wrong is worse than absent.

**Never-lists are binding.** Each persona in `PERSONAS-15.md` carries words that
end the relationship on contact — *beginner* to someone resuming, *confidence*
to someone who has been sold confidence his whole life. They apply to captions
and voice-over, not just to the page.

**The dating family stays PG-13 and non-manipulative.** Two adults, both with
agency, nobody worn down. The honest differentiator is that *noticing a no early
is the skill* — persona 5 is built on exactly that, and it is the one to film if
you only film one.

## The blocks every prompt carries

Identical on all thirty, straight from `../BRAND-AND-VIDEO.md`. They are already
inline in each prompt below, so a prompt can be copied and pasted whole with
nothing to append:

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
```

A looping website hero is the one exception: drop the `END CARD` block, since a
loop has no end to put a mark on.

## Distinctness grid

The point of this table is that no two rows collide. Check it before adding a
sixteenth.

| # | Who | Age | Build | Hair | Signature | Setting |
|---|---|---|---|---|---|---|
| 1 | Ethan | 25 | tall, narrow, stooped | dark loose curls | oversized grey hoodie | board-game café |
| 2 | Marcus | 37 | broad, heavy-set | shaved head, grey beard | worn brown leather jacket | dog park at dusk |
| 3 | Kaia | 28 | slim, upright | high ponytail, blunt | white trainers, silver chain | rooftop bar |
| 4 | Nadia | 27 | petite, quick | waist-length box braids | gold hoops, sketchbook | small restaurant |
| 5 | Jonas | 31 | average, very still | strawberry-blond side part | wire-frame glasses | house-party kitchen |
| 6 | Sam | 24 | slight, hunched | mousey brown, overgrown | headphones round neck | Manchester flatshare |
| 7 | Tom | 26 | athletic, restless | short sandy, stubble | half-zip, lanyard still on | Bristol bar, Friday |
| 8 | Andrés | 29 | compact, hands talk | dark, thick brows, short beard | glasses pushed up | Berlin office kitchen |
| 9 | Mei | 30 | small, composed | sharp black bob, blunt fringe | round tortoiseshell glasses | neighbour's barbecue |
| 10 | Arjun | 33 | tall, tidy | black, receding at temples | ID badge, sleeves rolled | London meeting room |
| 11 | Zoe | 26 | slim, tense | auburn low bun, strands loose | blazer over band tee | bedroom desk → lobby |
| 12 | Ben | 35 | gym-broad, tanned | blond crop, clean-shaven | quarter-zip, headset | car park before a call |
| 13 | Amara | 41 | tall, still, commanding | locs pinned up | reading glasses on a chain | quiet one-to-one room |
| 14 | Claire | 38 | average, warm | shoulder-length blonde, grey roots | cardigan, mug, dog lead | Leeds kitchen → work drinks |
| 15 | Oskar | 34 | lanky, long limbs | beanie, full beard | hoodie, standing desk | home office → conference hallway |

Ages run 24 to 41. Six women, nine men. Five of the fifteen already have full
briefs in `docs/personas/` — Sam, Tom, Andrés, Arjun and Claire — and their
names, ages, cities and jobs are fixed there. Do not re-cast them.

---

# Family 1 · Dating

## 1 · Ethan, 25 — the late starter

**Cast** Tall and narrow-shouldered with a stoop he straightens when he
remembers to. Dark loose curls grown over his ears. Dresses to not be noticed.
**Prop** Phone face-down on the table, laces loose.
**Tell** His hands. They fidget while he waits to speak and go still the second
he decides to.
**Setting of choice** A board-game café on a weeknight — the one venue where
sitting down with strangers is the advertised format rather than a risk.
**Rapport beat** He asks a question and then closes his mouth. The camera stays
on him listening while somebody else talks.

```
A · the rep
A tall young man in his mid-twenties alone in a small bedroom at night, sitting
on the edge of the bed with a phone held to his ear, speaking quietly and
starting the same sentence over. Narrow shoulders, dark loose curls, oversized
grey hoodie. Lit only by the phone screen and a lamp behind him. Slow push-in,
shallow depth of field, unposed.
midnight navy base, amber lamp light, electric blue screen glow
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

```
B · the real thing
A board-game café on a weeknight, warm pendant lamps over a table of stacked
games. The same tall young man in the grey hoodie asks a question across the
table, then goes quiet and listens while the person opposite talks and laughs.
His fidgeting hands come to rest. Slow handheld drift, shallow depth of field,
two adults at ease.
deep indigo shadows, warm cafe amber, single cool blue accent
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

**Never** anything that implies he is behind. No countdown, no "still".

---

## 2 · Marcus, 37 — back after a long relationship

**Cast** Broad and heavy-set, shaved head, close grey-flecked beard. Carries
himself like someone who used to be easy in a room and has not tested it lately.
**Prop** A worn brown leather jacket he has had for a decade. A dog lead.
**Tell** He laughs a half-beat late, then properly.
**Setting of choice** The dog park at dusk — a place with a built-in excuse to
stand near someone and a built-in reason to leave.
**Rapport beat** Something genuinely amuses him and he lets it, unguarded. Not
a line. A laugh that arrives before he has decided whether to.

```
A · the rep
A broad-shouldered man in his late thirties, shaved head and short grey beard,
standing in a kitchen at night with a phone in one hand, talking to it, stopping,
smiling at himself and going again. Worn brown leather jacket over a t-shirt.
Warm overhead light, cool window behind. Medium shot, slow drift, unposed.
low-key navy grade, warm skin tones, cold blue background separation
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

```
B · the real thing
A city dog park at dusk, long low sun through bare trees, two dogs playing. The
same heavy-set man in the leather jacket talks with another dog owner and laughs
properly at something they said, caught off guard. Relaxed stance, hands in
pockets. Handheld, shallow depth of field, unposed, natural.
cool blue-black shadows, warm amber highlights, deep navy background
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

**Never** beginner, learn, start over. He is resuming.

---

## 3 · Kaia, 28 — great in text, silent in person

**Cast** Slim and upright, high blunt ponytail, minimal expensive streetwear
that took real thought. Reads as completely composed until she has to speak.
**Prop** Pristine white trainers, a thin silver chain, phone in hand.
**Tell** She is fluent looking down at the screen and goes flat the moment she
looks up.
**Setting of choice** A rooftop bar — the third date, after messaging that went
brilliantly for two weeks.
**Rapport beat** She says out loud the thing she would have typed, and it lands
the same way it does in text. Relief crosses her face.

```
A · the rep
A woman in her late twenties, slim with a high blunt ponytail, sitting
cross-legged on a sofa in a dim flat, phone in one hand, saying a sentence out
loud, wincing, saying it again better. Minimal light streetwear, thin silver
chain. Screen light on her face, warm lamp behind. Close-up to medium, slow push.
midnight navy base, amber lamp light, electric blue screen glow
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

```
B · the real thing
A rooftop bar at blue hour, string lights and a city skyline behind. The same
woman with the high ponytail puts her phone face-down on the table, says
something that makes the person opposite laugh, and visibly relaxes. Two adults
talking easily. Shallow depth of field, slow handheld drift, unposed.
dark blue-black palette, warm orange practicals, violet rim light
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

**Never** frame texting as cheating or lesser. It is a real skill that does not
transfer.

---

## 4 · Nadia, 27 — first-date freeze

**Cast** Petite and quick-moving, waist-length box braids with gold cuffs, gold
hoops, denim jacket over something bright.
**Prop** A small sketchbook she does not open on the date but always has.
**Tell** She fills silences with a new question when the last answer deserved a
follow-up.
**Setting of choice** A small candlelit restaurant, minute four — after the
openers have run out.
**Rapport beat** She asks a follow-up to the answer instead of reaching for a
fresh question. The conversation drops a gear and gets real.

```
A · the rep
A petite woman in her late twenties with long box braids and gold hoop earrings,
alone at a kitchen table at night, phone propped against a mug, talking to it
and pausing to listen. Denim jacket over a bright top, small sketchbook beside
her. Warm kitchen light, cool blue from the phone. Medium close-up, slow drift.
deep indigo shadows, warm cafe amber, single cool blue accent
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

```
B · the real thing
A small candlelit restaurant, warm low light, a two-person table. The same woman
with long box braids leans in and asks a follow-up question, nodding, genuinely
interested, while the person opposite keeps talking. Unhurried, comfortable
silence between sentences. Shallow depth of field, slow handheld, unposed.
deep indigo shadows, warm cafe amber, single cool blue accent
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

**Never** scripts and question lists. That is what she already tried.

---

## 5 · Jonas, 31 — reading interest

**Cast** Average build and unusually still — the stillness is the character.
Pale strawberry-blond hair in a side part, wire-frame glasses, olive overshirt.
**Prop** A drink he holds without drinking.
**Tell** He watches one beat longer than most people, then decides.
**Setting of choice** The kitchen at a house party, where every conversation is
public and everyone can leave.
**Rapport beat** **Film this one.** He notices the phone come back out and the
answers get shorter — and he wraps up warmly and goes, without being asked to.
Nobody is embarrassed. That is the product's actual claim.

```
A · the rep
A man in his early thirties with pale strawberry-blond hair and wire-frame
glasses, sitting very still at a desk in a dim room, phone in hand, listening
intently and then answering. Olive overshirt. Cool screen light on his glasses,
one warm lamp off to the side. Close-up, static frame, minimal movement.
low-key navy grade, warm skin tones, cold blue background separation
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

```
B · the real thing
A crowded house-party kitchen at night, warm lamps, people talking in the
background. A still man in wire-frame glasses and an olive overshirt is midway
through a conversation; the other person glances at their phone. He smiles,
says something brief and friendly, and steps away easily. No tension, both
relaxed, nobody embarrassed. Handheld, shallow depth of field, unposed.
dark blue-black palette, warm orange practicals, violet rim light
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

**Never** the decoding framing. This is paying attention, not reading signals.

---

# Family 2 · Social

## 6 · Sam, 24 — overcome shyness *(full brief exists)*

**Cast** Slight, hunched at the shoulders, mousey brown hair that needed cutting
a month ago. Junior developer in a Manchester flatshare.
**Prop** Headphones round his neck, indoors, always.
**Tell** He rehearses with his mouth closed. You can see it.
**Setting of choice** His own room at 11pm, and then Monday's standup — the two
places the whole persona lives between.
**Rapport beat** He says the smaller true thing — *"I have no idea, actually"* —
instead of hunting for the impressive answer, and stays in the conversation.

```
A · the rep
A slight young man in his early twenties with overgrown mousey brown hair and
headphones round his neck, sitting on a bed in a dark flatshare bedroom at
night, phone held close, speaking quietly and repeating the same opening line.
Hoodie. Only light is the phone and a strip under the door. Close-up, slow push.
midnight navy base, amber lamp light, electric blue screen glow
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

```
B · the real thing
A bright open-plan office in the morning, a small team standing in a loose
semicircle for a standup. The same young man speaks up, shrugs slightly, and the
others react easily — one of them nods, another half-laughs. He stays in it.
Natural light through big windows, one cool monitor glow. Medium shot, unposed.
cool blue-black shadows, warm amber highlights, deep navy background
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

**Never** confidence, charisma, transform. He has been sold confidence his whole
life and it is why he does not trust pages like ours.

---

## 7 · Tom, 26 — meeting new people *(full brief exists)*

**Cast** Athletic and restless, short sandy hair, permanent light stubble.
Junior sales in Bristol, moved six months ago, lives alone.
**Prop** A half-zip and a work lanyard he forgot to take off.
**Tell** He scans the room from the edge of it, holding a drink like a task.
**Setting of choice** A Bristol bar on a Friday, with people he barely knows.
**Rapport beat** He crosses the room and opens with the situation they are both
already in — no disguise, no manufactured accident.

```
A · the rep
A restless athletic man in his mid-twenties with short sandy hair and stubble,
alone in a one-bed flat, pacing while talking into a phone, stopping, starting
again. Half-zip top, work lanyard still on. Evening light through a window, warm
lamp, cool screen. Medium shot, handheld follow, unposed.
low-key navy grade, warm skin tones, cold blue background separation
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

```
B · the real thing
A busy bar on a Friday night, warm pendant lights, people in loose groups. The
same sandy-haired man in a half-zip walks over to a small group, says something
about the place they are all standing in, and is folded into the conversation.
Easy, unforced, no bravado. Handheld drift, shallow depth of field.
dark blue-black palette, warm orange practicals, violet rim light
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

**Never** the pickup vocabulary. Any of it.

---

# Family 3 · Language

## 8 · Andrés, 29 — fluent on paper *(full brief exists)*

**Cast** Compact, dark hair, thick brows, short beard, glasses pushed up on his
head half the time. Hands do a lot of the talking. Engineer in Berlin, relocated
from Valencia, lives with his partner.
**Prop** A coffee cup he holds with both hands.
**Tell** A visible half-second of translation before he answers.
**Setting of choice** The office kitchen at 9am, where the standup happens in
English and nobody waits.
**Rapport beat** He starts the sentence before he has all of it and steers
mid-way — and it works, and he notices it working.

```
A · the rep
A compact man in his late twenties with dark hair, thick eyebrows and a short
beard, sitting at a small apartment table early in the morning with a coffee and
a phone, speaking in a second language, hesitating, then continuing. Glasses
pushed up on his head, expressive hands. Cool morning window light, warm lamp.
deep indigo shadows, warm cafe amber, single cool blue accent
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

```
B · the real thing
A modern office kitchen mid-morning, colleagues holding mugs, a coffee machine
behind. The same bearded man begins a sentence, adjusts it mid-flow with a small
gesture, and the group follows him without pausing. One of them answers back. He
registers that it worked. Natural light, medium shot, unposed.
cool blue-black shadows, warm amber highlights, deep navy background
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

**Never** learn, beginner, course. He is not short of vocabulary.

---

## 9 · Mei, 30 — newly relocated

**Cast** Small and composed, sharp black bob with a blunt fringe, round
tortoiseshell glasses, neat quiet layers.
**Prop** A canvas tote she does not put down.
**Tell** She laughs a beat after everyone else, because she worked it out.
**Setting of choice** A neighbour's back-garden barbecue — the invitation she
almost declined.
**Rapport beat** She asks what the joke meant, plainly and without apology, and
the whole group relaxes and explains. Curiosity beats camouflage.

```
A · the rep
A small composed woman in her early thirties with a sharp black bob and round
tortoiseshell glasses, sitting by a window in a sparsely furnished flat in the
evening, phone in hand, practising a conversation and smiling when it goes well.
Neat quiet layers, canvas tote beside her. Warm lamp, cool blue dusk outside.
low-key navy grade, warm skin tones, cold blue background separation
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

```
B · the real thing
A back-garden barbecue at golden hour, string lights just coming on, a loose
group of neighbours with drinks. The same woman with the black bob asks the
group a question, they all laugh and explain something to her, and she laughs
with them. Warm, easy, welcoming. Handheld, shallow depth of field, unposed.
deep indigo shadows, warm cafe amber, single cool blue accent
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

**Never** treat it as a language problem. It is a context problem, and saying so
is the whole hook.

---

# Family 4 · Work

## 10 · Arjun, 33 — being heard *(full brief exists)*

**Cast** Tall and tidy, black hair receding at the temples, sleeves rolled to
the elbow. Product manager in London, married, one child under five.
**Prop** An ID badge on a lanyard, a laptop he closes to make a point.
**Tell** He builds up to the point instead of leading with it, and loses them on
the ramp.
**Setting of choice** The monthly leadership review, eight people round a table.
**Rapport beat** He answers first and explains second. Heads come up.

```
A · the rep
A tall tidy man in his early thirties with black hair receding at the temples,
alone in a home office late at night, sleeves rolled, speaking to a phone
propped on a stack of books, then stopping to check something. One warm desk
lamp, cool monitor glow behind. Medium shot, static frame, unposed.
midnight navy base, amber lamp light, electric blue screen glow
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

```
B · the real thing
A glass-walled meeting room, eight people around a table, city visible outside.
The same tall man with rolled sleeves says one short sentence and the room turns
toward him — heads lift from laptops, someone nods. He continues, unhurried.
Cool daylight, warm skin tones. Medium wide, slow drift, unposed.
cool blue-black shadows, warm amber highlights, deep navy background
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

**Never** anxiety, shy, nervous. He is none of them.

---

## 11 · Zoe, 26 — interviews and job search

**Cast** Slim and visibly tense, auburn hair in a low bun with strands escaping,
blazer thrown over a band t-shirt.
**Prop** A notebook with the same three answers rewritten on four pages.
**Tell** She fills every pause, and the filling is what costs her.
**Setting of choice** Her bedroom desk the night before, and the lobby ten
minutes early.
**Rapport beat** She reaches a pause and lets it stand, then finishes the point.
The interviewer waits with her rather than moving on.

```
A · the rep
A slim tense woman in her mid-twenties with auburn hair in a loose low bun,
sitting at a bedroom desk at night, blazer over a band t-shirt, answering out
loud to a phone propped against a notebook, then writing something down. Warm
desk lamp, cool screen light, dark room behind. Medium close-up, slow push-in.
midnight navy base, amber lamp light, electric blue screen glow
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

```
B · the real thing
A bright modern office interview room, two people across a table, big window.
The same auburn-haired woman in the blazer pauses mid-answer, holds the silence
for a beat without filling it, then finishes her point clearly. The interviewer
waits, then nods and writes. Calm, professional. Medium shot, static, unposed.
low-key navy grade, warm skin tones, cold blue background separation
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

**Never** promise an outcome. We do not get anyone a job, and saying we might is
the one claim that would deserve to be punished.

---

## 12 · Ben, 35 — client-facing and sales

**Cast** Gym-broad and tanned, blond crop, clean-shaven, quarter-zip over a
collar. Looks entirely at ease, which is the point — his problem is invisible
from outside.
**Prop** A smartwatch he checks, a headset round his neck.
**Tell** He talks past the moment the other person was ready to agree.
**Setting of choice** A car park five minutes before the call, and the call
itself.
**Rapport beat** He asks the question and then stops talking. The silence does
the work he was doing badly.

```
A · the rep
A broad, tanned man in his mid-thirties with a blond crop and a quarter-zip,
sitting in a parked car in the daytime, phone to his ear, talking, stopping,
laughing at himself, going again. Headset round his neck. Daylight through the
windscreen, cool interior shadows. Medium close-up through the side window.
cool blue-black shadows, warm amber highlights, deep navy background
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

```
B · the real thing
A quiet corner of an open-plan office, one man at a standing desk on a headset
call. The same broad blond man in the quarter-zip asks a question, then stops
and waits, listening, not filling the pause. He nods slowly. Cool office light
with one warm lamp. Medium shot, slow drift, unposed.
low-key navy grade, warm skin tones, cold blue background separation
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

**Never** basics. He does this professionally.

---

## 13 · Amara, 41 — leading a team

**Cast** Tall and very still, locs pinned up, structured blazer, reading glasses
on a chain she takes off to say something that matters.
**Prop** The glasses. Taking them off is the beat.
**Tell** She softens hard sentences until they stop meaning anything.
**Setting of choice** A small one-to-one room with two chairs and no table.
**Rapport beat** She says the difficult sentence plainly, once, and then waits —
and the room does not go cold.

```
A · the rep
A tall composed woman in her early forties with locs pinned up and a structured
blazer, alone in a quiet room in the evening, reading glasses in one hand, phone
in the other, saying a difficult sentence out loud, stopping, saying it more
plainly. Warm side lamp, deep shadow behind. Medium close-up, static frame.
low-key navy grade, warm skin tones, cold blue background separation
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

```
B · the real thing
A small quiet meeting room, two chairs facing each other, no table, soft daylight
through a blind. The same woman with locs takes off her reading glasses, says one
clear sentence, and waits. The other person thinks, then answers. Warm, direct,
not cold. Medium two-shot, static, unposed.
cool blue-black shadows, warm amber highlights, deep navy background
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

**Never** hacks, tricks, power moves.

---

# Family 5 · Reset

## 14 · Claire, 38 — out of practice *(full brief exists)*

**Cast** Average build, warm face, shoulder-length blonde hair with grey coming
in at the roots and no intention of hiding it. Operations manager in the Leeds
suburbs, fully remote, lives alone, recently separated.
**Prop** A mug in both hands. A dog lead by the door.
**Tell** She is completely herself in her own kitchen and someone else at the
door of a bar.
**Setting of choice** Her kitchen at 6pm, then the work drinks she left after
forty minutes last time.
**Rapport beat** She is the one who starts the conversation — the thing she used
to do without thinking.

```
A · the rep
A warm-faced woman in her late thirties with shoulder-length blonde hair going
grey at the roots, standing in a suburban kitchen in the early evening holding a
mug, phone propped against the kettle, talking to it and laughing at her own
answer. Cardigan. Warm kitchen light, cool blue dusk through the window.
deep indigo shadows, warm cafe amber, single cool blue accent
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

```
B · the real thing
A busy after-work bar in the early evening, warm lamps, small groups with
drinks. The same blonde woman in a cardigan turns to the person beside her at
the bar and starts the conversation herself. They both laugh. She stays. Relaxed,
warm, unforced. Handheld drift, shallow depth of field, unposed.
dark blue-black palette, warm orange practicals, violet rim light
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

**Never** beginner, learn, basics. Nothing about her changed except how often she
gets to do it.

---

## 15 · Oskar, 34 — remote-work isolation

**Cast** Lanky with long limbs he does not quite know where to put standing up,
beanie over dark hair, full beard, hoodie. Entirely comfortable on a video call
and adrift in a corridor.
**Prop** A standing desk, a lanyard he was issued that morning.
**Tell** He is articulate seated and monosyllabic on his feet.
**Setting of choice** The hallway between conference sessions — all the
unstructured conversation he has not had in two years, at once.
**Rapport beat** He joins a conversation already in progress, mid-topic, without
being introduced.

```
A · the rep
A lanky man in his mid-thirties with a beanie and a full beard, standing at a
home standing desk in a spare room, hoodie on, talking to a phone propped against
a monitor, gesturing, restarting. Grey daylight through a window, warm desk lamp,
cool screen glow. Medium shot, static frame, unposed.
midnight navy base, amber lamp light, electric blue screen glow
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

```
B · the real thing
A conference hallway between sessions, people standing in small groups with
coffee, daylight from a high window. The same bearded man in a beanie and lanyard
steps into a conversation already running, adds something, and the group opens up
to include him. Easy, natural, nobody introduces him. Handheld, medium wide.
cool blue-black shadows, warm amber highlights, deep navy background
QUALITY
4K, 24fps, 180° shutter. Hyperrealistic live action, indistinguishable from
documentary footage. Visible skin pores, fine facial hair, natural asymmetry,
real fabric weave. Anatomically correct hands at all times. Faces stay
consistent for the whole clip. No morphing, no warping, no extra fingers, no
plastic skin, no CGI sheen, no beauty retouching.
FRAME
16:9, 1920x1080, 10 seconds, 35mm handheld with natural drift, subject within
the centre 80%, edges falling softly to near-black, seamless loop.
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
```

**Never** imply that working remotely was a mistake.

---

## What to film first

If you are generating five pairs rather than fifteen, take these, in order:

1. **Jonas (5)** — the honest differentiator. Nobody else in this market films
   someone leaving warmly, because nobody else can afford to.
2. **Sam (6)** — the champion variant, and the only one every other landing page
   is measured against.
3. **Claire (14)** — the widest audience per pound on Facebook, and the
   friendliest beat to watch.
4. **Andrés (8)** — the clearest before/after in ten seconds, and it needs no
   language to read.
5. **Zoe (11)** — the sharpest deadline of any persona, which is what makes the
   click cheap.

## Where the clips go

`utm_content` carries the persona slug, so a survey answer ties back to the clip
that sent them — see `docs/UTM-LINKS.md`. Use the persona ids from
`content/survey.ts` (`late-starter`, `reading-interest`, `out-of-practice`, …) so
the video, the ad and the survey row all agree on one vocabulary.

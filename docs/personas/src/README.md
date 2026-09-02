# Persona one-pagers — how to regenerate

Five two-page PDFs in `docs/personas/`, one per landing-page variant. Page 1 is
the person (Google's persona framework: name, age, location, household,
education, occupation — plus goals and barriers). Page 2 is the acquisition
plan (pain/barrier/solution, message, channels, funnel, landing page, video ad).

## Regenerate

```bash
node gen.mjs                     # writes html/ from personas.mjs + gtm.mjs
```

Then print each with headless Chrome:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=out.pdf "file://$PWD/html/01-shy.html"
```

## The page-height mechanism

Each page is one long PDF page, sized exactly to its content — so there is no
trailing blank space and no accidental page break. `gen.mjs` reads
`html/heights.json`; when it is absent every page renders 6000px tall.

To re-measure after a copy change: delete `heights.json`, run `gen.mjs`, serve
`html/` over HTTP (Chrome blocks `file://` in Playwright), then for each page
take `max(child.bottom) - page.top + 26 + 74` (26 = warn margin, 74 = footer)
and write the `{slug: {p1, p2}}` map back to `heights.json`.

Per-page sizes come from CSS named pages (`@page pone` / `@page ptwo`), which
Chrome supports in print.

## Traps

- **Do not put a class called `one` or `two` on `.page`.** `.two` is already the
  two-column grid used by the "Who he is" section; the collision turns the whole
  page into a grid and the layout silently scrambles in the PDF only.
- **Fonts and images are embedded as base64**, so the PDFs are self-contained
  and Chrome needs no file-access flags.
- **The AI partner is deliberately "she"** in step and FAQ copy ("She answers
  straight away"). That is not a persona pronoun — do not "fix" it.

## Photography

Illustrative stock under the Unsplash Licence. These are not real customers and
the PDFs say so in the footer. Source IDs, fetched at `w=900&h=1200&fit=crop`:

| Persona | Unsplash ID |
|---|---|
| shy | `photo-1632653581068-f0ba935a3de6` |
| language | `photo-1782979412887-f84d003a2867` |
| social | `photo-1631061528340-2731342a2d1d` |
| speaking | `photo-1590102425728-aa39769512ed` |
| rusty | `photo-1545386673-7723f55e5490` |

Scene bands come from the app's own films in `public/scenarios/`. The `speaking`
scene is a frame pulled at 6s from `coffee-shop.mp4`, since no shipped still
matches a meeting room.

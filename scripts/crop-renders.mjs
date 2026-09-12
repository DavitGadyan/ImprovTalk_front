/**
 * Cut the app renders out of the portfolio composites.
 *
 * The sources in assets/renders/ are the finished bento images from the case
 * study — the only real screenshots of design system B that exist. Each panel
 * is found by scanning for pixels that differ from the ground colour, so no
 * coordinate is typed by hand and a re-export of the composite re-crops itself.
 *
 * Output: public/app/<name>-1400.webp and -700.webp, plus lib/renders.ts with
 * the real dimensions so every <img> carries width and height.
 *
 * Run: npm run gen:renders
 */
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'

/* Row bands top to bottom, panels left to right within each. Must match what
   the composite actually contains — the script refuses to guess. */
const LAYOUT = {
  '01-hero.png': [['intro', 'home'], ['setup-blend', 'score-disc']],
  '02-bento.png': [
    ['tab-bar'],
    ['live-session', 'score-screen'],
    ['icon-strip'],
    ['setup-rows', 'choice-list', 'plan-max'],
  ],
}

/* Alt text is content, not decoration: it says what the screen shows. */
const ALT = {
  intro: 'The ImprovTalk intro screen: a couple talking on a beach behind the wordmark.',
  home: 'The Home screen: streak, charisma and closed rate, then six destinations — Simulate, Practice, Learn, Solo Drills, Stats, History.',
  'setup-blend': 'The setup blend: streak, charisma and closed rate above four personality sliders — red, blue, yellow, green — each at 25%.',
  'score-disc': 'A Charisma Score of 74 out of 100, up 6 on baseline, above the Hold-to-speak disc.',
  'tab-bar': 'The app tab bar: Home, Practice, Learn, History.',
  'live-session': 'A live session in a coffee shop: the persona’s portrait, the Hold-to-speak disc, a hint, and End & score.',
  'score-screen': 'The score screen: Charisma Score 74, what worked, what to work on, and six voice and delivery bars.',
  'icon-strip': 'The ImprovTalk app icon beside three other apps on an iPhone home screen.',
  'setup-rows': 'Setup rows: Language, Disposition, Mood, Guard, and a Jealous friends stepper.',
  'choice-list': 'A disposition choice list: Surprise me, Open, Neutral (selected), Guarded, Cold.',
  'plan-max': 'The Max plan card, marked Recommended, with three inclusions and a Choose Max button.',
}

const TOL = 6 /* per-channel distance from the ground colour that counts as content */
const MIN = 120 /* a band narrower than this is noise, not a panel */
const WIDTHS = [1400, 700]

/* Panels the case study exported on a blurred photograph instead of a card.
   Every other panel is a #1F1F1F card on the composite ground; these sit on
   a beige photo, and on the site they read as a different page. For the phone
   panel the photo is swapped for the card colour here, by rule rather than by
   hand: from the panel's edge, every pixel that is not the neutral dark of the
   phone (or of the ground) is flooded with surface. The phone itself — its
   bezel is a neutral #0A0A0A ring around pure black — is never touched, so
   the alt text stays true. A re-export on a dark card makes the entry
   redundant and the pass a no-op.

   `setup-blend` is on the same photo but cannot take the pass: its stats card
   is glass, tinted by the photo behind it, and the flood walks straight
   through it and takes the streak, charisma and closed-rate figures with it.
   That one keeps its photo until the case study re-exports it. */
const SURFACE = [31, 31, 31]
const GROUND_SWAP = new Set(['score-screen'])

/* Phones cut out of their cards, with alpha, for the tile that stands two
   screens on one card facing each other. Each panel is a phone drawn on its
   own card with its own lighting, and two grounds cannot share a card, so the
   phone comes out and the card stays behind. Ground-like is measured per
   panel on the real pixels: the phone's outer ring is #0A0A0A over pure
   black, neutral within two levels and never above 11, and the flood from
   the panel's edge stops there. The bezel's 1–3px highlight rim reads as
   ground and goes with the card; the black frame behind it does not, so the
   flood cannot enter the screen. The phone's shadow goes with the card too;
   the tile draws its own. Output: <name>-phone-{1400,700}.webp, trimmed to
   the phone. */
const CUTOUTS = {
  'live-session': {
    name: 'live-session-phone',
    /* The card runs 20–40, the composite corner arcs are 12. */
    ground: (r, g, b) => {
      const hi = Math.max(r, g, b), lo = Math.min(r, g, b)
      return hi - lo <= 3 && hi >= 12 && hi <= 90
    },
    alt: 'A live session in a coffee shop on a phone: the persona’s portrait, the Hold-to-speak disc, a hint, and End & score.',
  },
  'score-screen': {
    name: 'score-screen-phone',
    /* After the ground swap the whole ground is the surface colour. */
    ground: (r, g, b) => Math.abs(r - 31) <= 3 && Math.abs(g - 31) <= 3 && Math.abs(b - 31) <= 3,
    alt: 'The score screen on a phone: Charisma Score 74, what worked, what to work on, and six voice and delivery bars.',
  },
}

/* Returns an RGBA buffer with the ground transparent, and the phone's box. */
const cutOut = (raw, w, h, ch, ground) => {
  const seen = new Uint8Array(w * h)
  const queue = new Int32Array(w * h)
  let head = 0, tail = 0
  const push = (x, y) => {
    const p = y * w + x
    const i = p * ch
    if (seen[p] || !ground(raw[i], raw[i + 1], raw[i + 2])) return
    seen[p] = 1
    queue[tail++] = p
  }
  for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1) }
  for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y) }
  while (head < tail) {
    const p = queue[head++]
    const x = p % w, y = (p - x) / w
    if (x > 0) push(x - 1, y)
    if (x < w - 1) push(x + 1, y)
    if (y > 0) push(x, y - 1)
    if (y < h - 1) push(x, y + 1)
  }
  /* What the flood did not reach is the phone — and the composite's corner
     arcs, and a few anti-aliased specks along the card's edge. The phone is
     the one large piece; only the largest connected piece is kept. */
  const label = new Int32Array(w * h).fill(-1)
  let best = -1, bestSize = 0, n = 0
  for (let start = 0; start < w * h; start++) {
    if (seen[start] || label[start] >= 0) continue
    let size = 0
    head = 0; tail = 0
    queue[tail++] = start
    label[start] = n
    while (head < tail) {
      const p = queue[head++]
      size++
      const x = p % w, y = (p - x) / w
      for (const q of [x > 0 ? p - 1 : -1, x < w - 1 ? p + 1 : -1, y > 0 ? p - w : -1, y < h - 1 ? p + w : -1]) {
        if (q < 0 || seen[q] || label[q] >= 0) continue
        label[q] = n
        queue[tail++] = q
      }
    }
    if (size > bestSize) { bestSize = size; best = n }
    n++
  }

  const rgba = Buffer.alloc(w * h * 4)
  let x0 = w, x1 = -1, y0 = h, y1 = -1
  for (let p = 0; p < w * h; p++) {
    const i = p * ch, o = p * 4
    rgba[o] = raw[i]; rgba[o + 1] = raw[i + 1]; rgba[o + 2] = raw[i + 2]
    if (seen[p] || label[p] !== best) { rgba[o + 3] = 0; continue }
    rgba[o + 3] = 255
    const x = p % w, y = (p - x) / w
    if (x < x0) x0 = x; if (x > x1) x1 = x
    if (y < y0) y0 = y; if (y > y1) y1 = y
  }
  return { rgba, box: { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 }, pieces: n }
}

const swapGround = (raw, w, h, ch) => {
  /* The phone's outer ring is #0A0A0A over pure black — neutral within two
     levels and never above 30. The photo's deepest shadow, right against the
     phone, is a grey-brown in the 30s; that is the line, and it is tight
     because the shadow is what a looser one leaves behind as a halo. */
  const isPhoto = (i) => {
    const r = raw[i], g = raw[i + 1], b = raw[i + 2]
    const hi = Math.max(r, g, b), lo = Math.min(r, g, b)
    return hi - lo > 4 || hi > 30
  }
  const seen = new Uint8Array(w * h)
  const queue = new Int32Array(w * h)
  let head = 0, tail = 0
  const push = (x, y) => {
    const p = y * w + x
    if (seen[p] || !isPhoto(p * ch)) return
    seen[p] = 1
    queue[tail++] = p
  }
  for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1) }
  for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y) }
  while (head < tail) {
    const p = queue[head++]
    const x = p % w, y = (p - x) / w
    if (x > 0) push(x - 1, y)
    if (x < w - 1) push(x + 1, y)
    if (y > 0) push(x, y - 1)
    if (y < h - 1) push(x, y + 1)
  }
  /* The composite ground shows in the panel's rounded corners; it goes to
     surface as well, so the corner is card and not a darker arc on a card. */
  const isGround = (i) =>
    Math.abs(raw[i] - 10) <= TOL && Math.abs(raw[i + 1] - 10) <= TOL && Math.abs(raw[i + 2] - 10) <= TOL
  const corners = [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]]
  for (const [cx, cy] of corners) {
    const stack = [cy * w + cx]
    while (stack.length) {
      const p = stack.pop()
      if (seen[p] || !isGround(p * ch)) continue
      seen[p] = 1
      const x = p % w, y = (p - x) / w
      if (x > 0) stack.push(p - 1)
      if (x < w - 1) stack.push(p + 1)
      if (y > 0) stack.push(p - w)
      if (y < h - 1) stack.push(p + w)
    }
  }
  let swapped = 0
  for (let p = 0; p < w * h; p++) {
    if (!seen[p]) continue
    raw[p * ch] = SURFACE[0]; raw[p * ch + 1] = SURFACE[1]; raw[p * ch + 2] = SURFACE[2]
    swapped++
  }
  return swapped / (w * h)
}

const runs = (flags) => {
  const out = []
  let start = -1
  for (let i = 0; i <= flags.length; i++) {
    const on = i < flags.length && flags[i]
    if (on && start < 0) start = i
    if (!on && start >= 0) {
      if (i - start >= MIN) out.push([start, i])
      start = -1
    }
  }
  return out
}

await mkdir('public/app', { recursive: true })
const manifest = {}

for (const [file, rows] of Object.entries(LAYOUT)) {
  const img = sharp(`assets/renders/${file}`)
  const { width, height } = await img.metadata()
  const raw = await img.raw().toBuffer()
  const ch = raw.length / (width * height)
  const [gr, gg, gb] = [raw[0], raw[1], raw[2]]
  const isContent = (i) =>
    Math.abs(raw[i] - gr) > TOL || Math.abs(raw[i + 1] - gg) > TOL || Math.abs(raw[i + 2] - gb) > TOL

  const rowHas = new Array(height).fill(false)
  for (let y = 0; y < height; y++) {
    const base = y * width * ch
    for (let x = 0; x < width; x++) {
      if (isContent(base + x * ch)) { rowHas[y] = true; break }
    }
  }
  const rowBands = runs(rowHas)
  if (rowBands.length !== rows.length)
    throw new Error(`${file}: found ${rowBands.length} row bands, layout expects ${rows.length}`)

  for (const [r, [y0, y1]] of rowBands.entries()) {
    const colHas = new Array(width).fill(false)
    for (let x = 0; x < width; x++) {
      for (let y = y0; y < y1; y++) {
        if (isContent((y * width + x) * ch)) { colHas[x] = true; break }
      }
    }
    const colBands = runs(colHas)
    if (colBands.length !== rows[r].length)
      throw new Error(`${file} row ${r}: found ${colBands.length} panels, layout expects ${rows[r].length}`)

    for (const [c, [x0, x1]] of colBands.entries()) {
      const name = rows[r][c]
      const box = { left: x0, top: y0, width: x1 - x0, height: y1 - y0 }
      const entry = { alt: ALT[name], sources: {} }
      let panel = sharp(`assets/renders/${file}`).extract(box)
      if (GROUND_SWAP.has(name)) {
        const buf = await panel.raw().toBuffer()
        const share = swapGround(buf, box.width, box.height, ch)
        console.log(`  ${name}: photo ground swapped for surface on ${(share * 100).toFixed(0)}% of the panel`)
        panel = sharp(buf, { raw: { width: box.width, height: box.height, channels: ch } })
      }
      for (const w of WIDTHS) {
        const out = `public/app/${name}-${w}.webp`
        const info = await panel
          .clone()
          .resize({ width: Math.min(w, box.width), withoutEnlargement: true })
          .webp({ quality: 82 })
          .toFile(out)
        entry.sources[w] = { src: `/app/${name}-${w}.webp`, width: info.width, height: info.height }
        console.log(`✓ ${out} ${info.width}×${info.height} ${(info.size / 1024).toFixed(0)}KB`)
      }
      manifest[name] = entry

      const cut = CUTOUTS[name]
      if (cut) {
        const buf = await panel.clone().raw().toBuffer()
        const { rgba, box: phone, pieces } = cutOut(buf, box.width, box.height, ch, cut.ground)
        console.log(`  ${cut.name}: phone ${phone.width}×${phone.height} at ${phone.left},${phone.top} of ${box.width}×${box.height}, ${pieces - 1} stray pieces dropped`)
        const cutEntry = { alt: cut.alt, sources: {} }
        for (const w of WIDTHS) {
          const out = `public/app/${cut.name}-${w}.webp`
          const info = await sharp(rgba, { raw: { width: box.width, height: box.height, channels: 4 } })
            .extract(phone)
            .resize({ width: Math.min(w, phone.width), withoutEnlargement: true })
            .webp({ quality: 82, alphaQuality: 90 })
            .toFile(out)
          cutEntry.sources[w] = { src: `/app/${cut.name}-${w}.webp`, width: info.width, height: info.height }
          console.log(`✓ ${out} ${info.width}×${info.height} ${(info.size / 1024).toFixed(0)}KB`)
        }
        manifest[cut.name] = cutEntry
      }
    }
  }
}

const ts = `/* Generated by scripts/crop-renders.mjs — do not edit; re-run npm run gen:renders. */
export type RenderName = ${Object.keys(manifest).map((n) => `'${n}'`).join(' | ')}

export type Render = {
  src: string
  srcSet: string
  width: number
  height: number
  alt: string
}

export const RENDERS: Record<RenderName, Render> = {
${Object.entries(manifest)
  .map(([n, e]) => {
    const big = e.sources[1400]
    const set = Object.values(e.sources).map((s) => `${s.src} ${s.width}w`).join(', ')
    return `  '${n}': {\n    src: '${big.src}',\n    srcSet: '${set}',\n    width: ${big.width},\n    height: ${big.height},\n    alt: ${JSON.stringify(e.alt)},\n  },`
  })
  .join('\n')}
}
`
await writeFile('lib/renders.ts', ts)
console.log(`✓ lib/renders.ts (${Object.keys(manifest).length} renders)`)

/**
 * The Open Graph image, in the site's own type and palette.
 *
 * satori lays out the text with a real Satoshi cut and emits every glyph as an
 * SVG path, so sharp can rasterise it with no font installed anywhere; the
 * score render is composited on afterwards, because librsvg does not decode
 * the WebP the render is stored as. Black ground, white headline, muted sub,
 * and the one place the brand gradient may appear — inside the render.
 *
 * Static Satoshi cuts (satori reads a variable font's default instance only)
 * come from Fontshare, cached in assets/fonts/. Run: npm run gen:og
 */
import satori from 'satori'
import sharp from 'sharp'
import { access, mkdir, readFile, writeFile } from 'node:fs/promises'

const W = 1200
const H = 630
const INK = '#ffffff'
const MUTED = '#8e8e93'
const CANVAS = '#000000'

async function satoshi(weight) {
  const cache = `assets/fonts/Satoshi-${weight}.ttf`
  try {
    await access(cache)
    return readFile(cache)
  } catch {}
  const css = await (
    await fetch(`https://api.fontshare.com/v2/css?f[]=satoshi@${weight}&display=swap`)
  ).text()
  /* Fontshare quotes its URLs and leaves the scheme off. If it stops serving
     a TrueType cut, fall back to the app's variable file — satori then renders
     the default instance, which is Regular, so the headline loses its weight;
     the console says so rather than letting it pass. */
  let url = css.match(/url\(['"]?([^'")]+\.ttf)['"]?\)/)?.[1]
  let buf
  if (url) {
    if (url.startsWith('//')) url = `https:${url}`
    buf = Buffer.from(await (await fetch(url)).arrayBuffer())
  } else {
    const fallback = `${process.env.HOME}/Desktop/Github/ImprovTalk/apps/mobile/assets/fonts/Satoshi-Variable.ttf`
    console.warn(`! Fontshare served no .ttf for satoshi@${weight}; using the variable file (renders as Regular)`)
    buf = await readFile(fallback)
  }
  await mkdir('assets/fonts', { recursive: true })
  await writeFile(cache, buf)
  return buf
}

const siteTs = await readFile('content/site.ts', 'utf8')
const tagline = siteTs.match(/tagline:\s*'([^']+)'/)?.[1] ?? 'Talk like you have done this before.'
const sub = 'A voice-first AI communication coach. Practise out loud, and get scored on what you said and how you said it.'

const icon = `data:image/png;base64,${(await readFile('public/icon.png')).toString('base64')}`
const [bold, regular] = await Promise.all([satoshi(700), satoshi(400)])

const el = (type, style, children) => ({ type, props: { style, children } })

const svg = await satori(
  el('div', {
    width: W, height: H, display: 'flex', flexDirection: 'column', justifyContent: 'center',
    backgroundColor: CANVAS, padding: '72px 0 72px 72px', color: INK, fontFamily: 'Satoshi',
  }, [
    el('div', { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 44 }, [
      { type: 'img', props: { src: icon, width: 44, height: 44, style: { borderRadius: 10 } } },
      el('span', { fontSize: 24, fontWeight: 700, letterSpacing: -0.5 }, 'ImprovTalk'),
    ]),
    el('div', { width: 560, fontSize: 62, fontWeight: 700, lineHeight: 1.02, letterSpacing: -1.6 }, tagline),
    el('div', { width: 540, marginTop: 28, fontSize: 24, fontWeight: 400, lineHeight: 1.4, color: MUTED }, sub),
  ]),
  {
    width: W,
    height: H,
    fonts: [
      { name: 'Satoshi', data: bold, weight: 700, style: 'normal' },
      { name: 'Satoshi', data: regular, weight: 400, style: 'normal' },
    ],
  },
)

const text = await sharp(Buffer.from(svg)).png().toBuffer()
const RENDER = 'public/app/score-disc-700.webp'
const size = 440
const render = await sharp(RENDER).resize(size, size, { fit: 'cover' }).png().toBuffer()

await sharp(text)
  /* 72px in from the right edge, mirroring the text's left padding; the text
     column is capped at 560px so the two never meet. */
  .composite([{ input: render, left: W - size - 72, top: Math.round((H - size) / 2) }])
  .png({ compressionLevel: 9 })
  .toFile('public/og.png')

const m = await sharp('public/og.png').metadata()
console.log(`✓ public/og.png ${m.width}×${m.height} (${((await readFile('public/og.png')).length / 1024).toFixed(0)} KB)`)

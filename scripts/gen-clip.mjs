/**
 * The app running, for the phones on the home page.
 *
 * The owner's screen recording of one Practice session (assets/clips/
 * practice.mp4, 77 s, 1180×2556, light mode) is cut down to its highlights
 * by a declared cut list, so a re-recording re-cuts itself and nobody hand-
 * edits a video. The first cut is the portrait moment, and the poster is the
 * clip's first frame: the still the page shows is the frame the clip starts
 * on, so hovering never jumps.
 *
 * Output: public/app/practice-clip.mp4 (H.264, no audio, faststart),
 * public/app/practice-clip-poster.webp, and lib/clip.ts with the real
 * dimensions. The source lives in assets/clips/, gitignored — 39 MB has no
 * business on Pages.
 *
 * Also crops the Simulator's score-screen still (assets/stills/score-
 * screen.png, if present) to the screen and writes it beside the clip.
 *
 * Run: npm run gen:clip  (needs ffmpeg and ffprobe on PATH)
 */
import { execFileSync } from 'node:child_process'
import { access, mkdir, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const SRC = 'assets/clips/practice.mp4'
const OUT = 'public/app/practice-clip.mp4'
const POSTER = 'public/app/practice-clip-poster.webp'
const WIDTH = 720

/* Seconds in the source. In the order they play. Read off 0.5 s contact
   sheets of the recording; the note says what the frame shows. */
const CUTS = [
  [41.0, 43.0, 'the portrait and the hint, Hold to speak — the poster frame'],
  [4.5, 6.5, 'Coffee Shop — the scenarios'],
  [7.0, 8.2, 'the session brief: who she is, the situation'],
  [12.5, 15.2, 'the personality sliders, then the Start talking tap'],
  [15.2, 16.4, 'Connecting…'],
  [37.0, 40.0, 'Picturing them… then the portrait appears'],
  [56.0, 59.0, 'Hold to speak → REC, Release to send'],
  [62.0, 63.5, 'she answers — Hold to interrupt'],
  [72.4, 74.6, 'End & score → Scoring your session…'],
]

const ALT =
  'A Practice session in the ImprovTalk app: the persona’s portrait in a coffee shop, a hint on what to say next, the Hold-to-speak disc, and End & score.'

try {
  await access(SRC)
} catch {
  console.error(`! ${SRC} is missing. It is the owner's screen recording and is not in git; put it there and re-run.`)
  process.exit(1)
}

await mkdir('public/app', { recursive: true })

/* One filter graph: trim each cut, reset its clock, concatenate. */
const trims = CUTS.map(([a, b], i) => `[0:v]trim=start=${a}:end=${b},setpts=PTS-STARTPTS[c${i}]`)
const concat = `${CUTS.map((_, i) => `[c${i}]`).join('')}concat=n=${CUTS.length}:v=1:a=0[cat]`
const graph = `${trims.join(';')};${concat};[cat]fps=30,scale=${WIDTH}:-2[v]`

execFileSync('ffmpeg', [
  '-v', 'error', '-y',
  '-i', SRC,
  '-filter_complex', graph,
  '-map', '[v]',
  '-an',
  '-c:v', 'libx264', '-crf', '27', '-preset', 'slow', '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart',
  OUT,
], { stdio: 'inherit' })

/* The first frame, through sharp — this ffmpeg has no webp encoder. */
const frame = execFileSync('ffmpeg', ['-v', 'error', '-i', OUT, '-frames:v', '1', '-f', 'image2pipe', '-c:v', 'png', '-'], {
  maxBuffer: 64 * 1024 * 1024,
})
await sharp(frame).webp({ quality: 84 }).toFile(POSTER)

const probe = JSON.parse(
  execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height:format=duration,size', '-of', 'json', OUT]).toString(),
)
const { width, height } = probe.streams[0]
const duration = Number(probe.format.duration)
const size = Number(probe.format.size)
console.log(`✓ ${OUT} ${width}×${height} ${duration.toFixed(1)}s ${(size / 1024).toFixed(0)}KB`)
console.log(`✓ ${POSTER}`)

/* The score screen, from the Simulator (iPhone 14 Pro, light appearance to
   match the clip): improvtalk://score-result with a real session's numbers —
   session 3f1888f8…, Charisma 86 (fluency 90, confidence 85, improvisation
   80, social attunement 90), the coach note verbatim, baseline 60 from the
   same user's baseline session, so +26. The Simulator's signed-in user is an
   admin, and the screen ends with an admin-only persona-feedback card that
   no reader would see; that region is painted the app's ground and the home
   indicator is drawn back where it was. Sized like the clip. */
const STILL = 'assets/stills/score-screen.png'
const ADMIN_CARD_TOP = 2330 /* px in the 1179×2556 capture; the card below "How scoring works" */
const HOME_PILL = { left: 380, top: 2517, width: 420, height: 15 }
let still = null
try {
  await access(STILL)
  const meta = await sharp(STILL).metadata()
  const ground = { r: 255, g: 255, b: 255, alpha: 1 }
  const pill = Buffer.from(
    `<svg width="${HOME_PILL.width}" height="${HOME_PILL.height}"><rect width="100%" height="100%" rx="${HOME_PILL.height / 2}" fill="#000"/></svg>`,
  )
  const cleaned = await sharp(STILL)
    .composite([
      {
        input: { create: { width: meta.width, height: meta.height - ADMIN_CARD_TOP, channels: 4, background: ground } },
        left: 0,
        top: ADMIN_CARD_TOP,
      },
      { input: pill, left: HOME_PILL.left, top: HOME_PILL.top },
    ])
    .toBuffer()
  const info = await sharp(cleaned)
    .resize({ width: WIDTH, height: Math.round((WIDTH * meta.height) / meta.width) })
    .webp({ quality: 84 })
    .toFile('public/app/score-still.webp')
  still = { src: '/app/score-still.webp', width: info.width, height: info.height }
  console.log(`✓ public/app/score-still.webp ${info.width}×${info.height}`)
} catch {
  console.log('  (no assets/stills/score-screen.png — the score phone keeps its cutout)')
}

const ts = `/* Generated by scripts/gen-clip.mjs — do not edit; re-run npm run gen:clip. */
export const CLIP = {
  src: '${OUT.replace(/^public/, '')}',
  poster: '${POSTER.replace(/^public/, '')}',
  width: ${width},
  height: ${height},
  duration: ${duration.toFixed(1)},
  alt: ${JSON.stringify(ALT)},
} as const

/** The score screen, a flat still from the Simulator; null when none was captured. */
export const SCORE_STILL = ${
  still
    ? `{
  src: '${still.src}',
  width: ${still.width},
  height: ${still.height},
  alt: 'The score screen: Charisma Score, what worked, what to work on, and the voice and delivery bars.',
} as const`
    : 'null'
}
`
await writeFile('lib/clip.ts', ts)
console.log('✓ lib/clip.ts')

/**
 * Build-time QR code.
 *
 * It encodes the /get page, NOT a store URL — so it never has to be regenerated
 * when the App Store and Play links go live. /get does the platform routing at
 * scan time.
 *
 * Two things here are deliberate, and both were bugs before:
 *
 * 1. No `shape-rendering: crispEdges`. A 29-module code displayed at ~96px is
 *    3.1px per module. crispEdges snaps every module edge to a whole pixel, so
 *    neighbouring modules round to 3px and 4px and the grid visibly warps —
 *    which is exactly what it looked like. Antialiasing keeps the module pitch
 *    even, which is what scanners actually need.
 *
 * 2. Margin 2 in the file. The quiet zone must total 4 modules; the white card
 *    the QR sits on contributes the rest as padding.
 *
 * The generated code is then decoded back at its display size to prove it
 * scans. A QR that does not resolve is a silent failure — it looks fine on the
 * page and simply never works.
 *
 * Run: npm run gen:qr
 */
import QRCode from 'qrcode'
import jsQR from 'jsqr'
import sharp from 'sharp'
import { writeFile } from 'node:fs/promises'

const GET_URL = 'https://improvtalk.s1mpleai.org/get/'
const OUT = 'public/qr-get.svg'
const DISPLAY = 112 // px — the size install.tsx renders it at

let svg = await QRCode.toString(GET_URL, {
  type: 'svg',
  errorCorrectionLevel: 'M',
  margin: 2,
  color: { dark: '#0b1220', light: '#ffffff' },
})

// The library hardcodes crispEdges; strip it (see note 1 above).
svg = svg.replace(' shape-rendering="crispEdges"', '')

await writeFile(OUT, svg)

const { data, info } = await sharp(Buffer.from(svg))
  .resize(DISPLAY, DISPLAY, { fit: 'fill' })
  .flatten({ background: '#ffffff' })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const result = jsQR(new Uint8ClampedArray(data), info.width, info.height)

if (!result) {
  console.error(`✗ ${OUT} did NOT decode at ${DISPLAY}px — do not ship this.`)
  process.exit(1)
}
if (result.data !== GET_URL) {
  console.error(`✗ decoded to "${result.data}" but expected "${GET_URL}"`)
  process.exit(1)
}

const modules = Number(/viewBox="0 0 (\d+)/.exec(svg)?.[1] ?? 0)
console.log(`✓ ${OUT}`)
console.log(`  decoded  ${result.data}`)
console.log(`  ${modules} modules · ${(DISPLAY / modules).toFixed(2)}px per module at ${DISPLAY}px`)

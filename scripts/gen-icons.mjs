/**
 * Favicon and touch-icon set, derived from the app's own 1254px icon so the
 * browser tab matches the icon on the phone home screen.
 *
 * Source: icon.png at the repo root — the 1254px master the iOS and Android
 * app icons are built from.
 *
 * Run: npm run gen:icons
 */
import sharp from 'sharp'
import { writeFile } from 'node:fs/promises'

const SRC = 'icon.png'
const sizes = [
  { file: 'public/icon-192.png', size: 192 },
  { file: 'public/icon-512.png', size: 512 },
  { file: 'public/apple-touch-icon.png', size: 180 },
]

for (const { file, size } of sizes) {
  await sharp(SRC).resize(size, size, { fit: 'cover' }).png({ quality: 90 }).toFile(file)
  console.log(`✓ ${file} (${size}×${size})`)
}

/*
 * favicon.ico: a 48×48 BMP-in-ICO. Written by hand because adding an ICO
 * encoder dependency for one 12KB file is not worth it. Browsers also read the
 * PNG icons above; this exists for the /favicon.ico path older crawlers probe.
 */
const N = 48
const raw = await sharp(SRC).resize(N, N, { fit: 'cover' }).ensureAlpha().raw().toBuffer()

const rowSize = N * 4
const dib = Buffer.alloc(40)
dib.writeUInt32LE(40, 0)
dib.writeInt32LE(N, 4)
dib.writeInt32LE(N * 2, 8) // doubled: colour data + (empty) AND mask
dib.writeUInt16LE(1, 12)
dib.writeUInt16LE(32, 14)
dib.writeUInt32LE(0, 16)
dib.writeUInt32LE(rowSize * N, 20)

// BMP rows run bottom-up and store BGRA, not RGBA.
const pixels = Buffer.alloc(rowSize * N)
for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    const s = (y * N + x) * 4
    const d = (N - 1 - y) * rowSize + x * 4
    pixels[d] = raw[s + 2]
    pixels[d + 1] = raw[s + 1]
    pixels[d + 2] = raw[s]
    pixels[d + 3] = raw[s + 3]
  }
}
const andMask = Buffer.alloc((N / 8) * N)
const image = Buffer.concat([dib, pixels, andMask])

const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(1, 4)

const entry = Buffer.alloc(16)
entry.writeUInt8(N, 0)
entry.writeUInt8(N, 1)
entry.writeUInt8(0, 2)
entry.writeUInt8(0, 3)
entry.writeUInt16LE(1, 4)
entry.writeUInt16LE(32, 6)
entry.writeUInt32LE(image.length, 8)
entry.writeUInt32LE(6 + 16, 12)

await writeFile('public/favicon.ico', Buffer.concat([header, entry, image]))
console.log('✓ public/favicon.ico (48×48)')

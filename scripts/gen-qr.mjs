/**
 * Build-time QR code.
 *
 * It encodes the /get page, NOT a store URL — so it never has to be
 * regenerated when the App Store and Play links go live. /get does the
 * platform routing at scan time.
 *
 * Run: npm run gen:qr
 */
import QRCode from 'qrcode'
import { writeFile } from 'node:fs/promises'

const GET_URL = 'https://improvtalk.s1mpleai.org/get/'

const svg = await QRCode.toString(GET_URL, {
  type: 'svg',
  errorCorrectionLevel: 'M',
  margin: 1,
  color: { dark: '#0b1220', light: '#ffffff' },
})

await writeFile('public/qr-get.svg', svg)
console.log(`✓ public/qr-get.svg → ${GET_URL}`)

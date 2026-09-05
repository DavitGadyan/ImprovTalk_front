/**
 * A very small PDF writer — enough for one generated document, no dependency.
 *
 * Why hand-rolled: the survey result has to come back as a file the respondent
 * keeps, the site is a static export with no backend to render one, and adding
 * jsPDF or pdf-lib is 300KB+ of bundle to draw text on a coloured page. This is
 * a few KB, and `lib/tips-pdf.ts` imports it dynamically so none of it touches
 * the critical path mobile PageSpeed already cost us once.
 *
 * Scope is deliberate: the 14 standard PDF fonts, so nothing is embedded and
 * there is no font licensing question; WinAnsi text; filled rectangles. No
 * images, no transparency, no unicode past the Latin-1 range the copy uses.
 */

/* ------------------------------------------------------------- metrics -- */

/*
 * Helvetica and Helvetica-Bold advance widths in 1/1000 em, codes 32–126, from
 * the Adobe core AFMs. They are needed because word wrapping has to happen
 * before anything is drawn, and a PDF viewer will not tell us. Measuring with
 * canvas instead would be measuring whatever font the browser substituted, not
 * the Helvetica the file actually asks for.
 */
const W_REGULAR =
  '278 278 355 556 556 889 667 191 333 333 389 584 278 333 278 278 556 556 556 556 556 556 556 556 556 556 278 278 584 584 584 556 1015 667 667 722 722 667 611 778 722 278 500 667 556 833 722 778 667 778 722 667 611 722 667 944 667 667 611 278 278 278 469 556 333 556 556 500 556 556 278 556 556 222 222 500 222 833 556 556 556 556 333 500 278 556 500 722 500 500 500 334 260 334 584'
const W_BOLD =
  '278 333 474 556 556 889 722 238 333 333 389 584 278 333 278 278 556 556 556 556 556 556 556 556 556 556 333 333 584 584 584 611 975 722 722 722 722 667 611 778 722 278 556 722 611 833 722 778 667 778 722 667 611 722 667 944 667 667 611 333 278 333 584 556 333 556 611 556 611 556 333 611 611 278 278 556 278 889 611 611 611 611 389 556 333 611 556 778 556 556 500 389 280 389 584'

const REGULAR = W_REGULAR.split(' ').map(Number)
const BOLD = W_BOLD.split(' ').map(Number)

/**
 * The non-ASCII characters this document can contain, as
 * `char -> [WinAnsi byte, regular width, bold width]`.
 *
 * The copy uses real typographic punctuation and the personas include Spanish
 * names, so stripping to ASCII would be visible. Anything outside this table is
 * folded to its closest ASCII form rather than dropped, so an unexpected
 * character degrades to something readable instead of a black box.
 */
const EXTRA: Record<string, [number, number, number]> = {
  '‘': [0x91, 222, 238],
  '’': [0x92, 222, 238],
  '“': [0x93, 333, 500],
  '”': [0x94, 333, 500],
  '–': [0x96, 556, 556],
  '—': [0x97, 1000, 1000],
  '…': [0x85, 1000, 1000],
  '·': [0xb7, 278, 278],
  '°': [0xb0, 400, 400],
  'á': [0xe1, 556, 556],
  'é': [0xe9, 556, 556],
  'í': [0xed, 278, 278],
  'ó': [0xf3, 556, 611],
  'ú': [0xfa, 556, 611],
  'ñ': [0xf1, 556, 611],
  'ü': [0xfc, 556, 611],
  'ç': [0xe7, 500, 556],
}

/** Best-effort ASCII for anything not in EXTRA, so nothing renders as a box. */
const FOLD: Record<string, string> = { ' ': ' ', '‑': '-', '−': '-', '•': '-' }

export type FontKey = 'regular' | 'bold'

/** Text as WinAnsi bytes, in a string where every code unit is one byte. */
function encode(text: string, font: FontKey): { bytes: string; width: number } {
  const table = font === 'bold' ? BOLD : REGULAR
  let bytes = ''
  let width = 0

  for (const ch of text) {
    const code = ch.charCodeAt(0)

    if (code >= 32 && code <= 126) {
      bytes += ch
      width += table[code - 32]!
      continue
    }

    const extra = EXTRA[ch]
    if (extra) {
      bytes += String.fromCharCode(extra[0])
      width += font === 'bold' ? extra[2] : extra[1]
      continue
    }

    const folded = FOLD[ch] ?? ch.normalize('NFD').replace(/[̀-ͯ]/g, '')
    for (const f of folded) {
      const c = f.charCodeAt(0)
      if (c >= 32 && c <= 126) {
        bytes += f
        width += table[c - 32]!
      }
    }
  }

  return { bytes, width }
}

export function measure(text: string, size: number, font: FontKey): number {
  return (encode(text, font).width / 1000) * size
}

/** `(`, `)` and `\` end or escape a PDF string literal and must be escaped. */
const escapeString = (s: string) => s.replace(/([\\()])/g, '\\$1')

/* ---------------------------------------------------------------- doc -- */

export type Rgb = [number, number, number]

export function rgb(hex: string): Rgb {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

const fmt = (n: number) => (Math.round(n * 100) / 100).toString()
const setFill = ([r, g, b]: Rgb) => `${fmt(r)} ${fmt(g)} ${fmt(b)} rg\n`

export type PageSize = { width: number; height: number }
export const A4: PageSize = { width: 595.28, height: 841.89 }

export type Doc = ReturnType<typeof createDoc>

export function createDoc(size: PageSize = A4) {
  const pages: string[] = []
  let stream = ''

  const start = () => {
    pages.push(stream)
    stream = ''
  }

  return {
    size,

    /** y is measured from the top of the page, which is how layout is written. */
    rect(x: number, y: number, w: number, h: number, color: Rgb) {
      stream += setFill(color)
      stream += `${fmt(x)} ${fmt(size.height - y - h)} ${fmt(w)} ${fmt(h)} re f\n`
    },

    /** One line of text with its baseline at `y`. No wrapping — see `paragraph`. */
    line(text: string, x: number, y: number, opts: { size: number; font?: FontKey; color: Rgb }) {
      const font = opts.font ?? 'regular'
      const { bytes } = encode(text, font)
      if (!bytes) return
      stream += setFill(opts.color)
      stream += `BT /${font === 'bold' ? 'F2' : 'F1'} ${fmt(opts.size)} Tf\n`
      stream += `1 0 0 1 ${fmt(x)} ${fmt(size.height - y)} Tm\n`
      stream += `(${escapeString(bytes)}) Tj ET\n`
    },

    /** Greedy word wrap. Returns the y just past the last baseline drawn. */
    paragraph(
      text: string,
      x: number,
      y: number,
      opts: { size: number; font?: FontKey; color: Rgb; width: number; leading?: number },
    ) {
      const font = opts.font ?? 'regular'
      const leading = opts.leading ?? opts.size * 1.45
      let cursor = y

      for (const para of text.split('\n')) {
        let current = ''
        for (const word of para.split(' ')) {
          const next = current ? `${current} ${word}` : word
          if (current && measure(next, opts.size, font) > opts.width) {
            this.line(current, x, cursor, { size: opts.size, font, color: opts.color })
            cursor += leading
            current = word
          } else {
            current = next
          }
        }
        if (current) {
          this.line(current, x, cursor, { size: opts.size, font, color: opts.color })
          cursor += leading
        }
      }
      return cursor
    },

    newPage: start,

    /** Serialise. Offsets are byte offsets, so the file is built as bytes. */
    bytes(): Uint8Array {
      start()

      const objects: string[] = []
      const add = (body: string) => objects.push(body)

      const pageCount = pages.length
      /* 1 catalog, 2 pages, 3 F1, 4 F2, then page + content pairs. */
      const pageIds = pages.map((_, i) => 5 + i * 2)

      add(`<< /Type /Catalog /Pages 2 0 R >>`)
      add(
        `<< /Type /Pages /Count ${pageCount} /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] >>`,
      )
      add(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`)
      add(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`)

      pages.forEach((content, i) => {
        add(
          `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${fmt(size.width)} ${fmt(size.height)}] ` +
            `/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${pageIds[i]! + 1} 0 R >>`,
        )
        add(`<< /Length ${content.length} >>\nstream\n${content}endstream`)
      })

      let file = '%PDF-1.4\n%\xe2\xe3\xcf\xd3\n'
      const offsets: number[] = []
      objects.forEach((body, i) => {
        offsets.push(file.length)
        file += `${i + 1} 0 obj\n${body}\nendobj\n`
      })

      const xref = file.length
      file += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
      for (const off of offsets) file += `${String(off).padStart(10, '0')} 00000 n \n`
      file +=
        `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n` +
        `startxref\n${xref}\n%%EOF\n`

      return Uint8Array.from(file, (c) => c.charCodeAt(0) & 0xff)
    },
  }
}

/** Hand the file to the browser. Object URLs leak until revoked. */
export function download(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes as unknown as BlobPart], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 10_000)
}

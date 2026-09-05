/**
 * The survey's deliverable: a one-off PDF built in the browser from the answers
 * already in memory, handed over the moment they submit.
 *
 * It is generated rather than pre-written because the two useful signals only
 * exist together at that moment — the goal says which problem, the colour blend
 * says which version of it — and a static file per goal would throw the second
 * one away. Import this dynamically; `lib/pdf.ts` should never be in the entry
 * bundle.
 */

import { A4, createDoc, download, rgb, type Doc, type Rgb } from '@/lib/pdf'
import { COLOR_NOTE, tipsFor } from '@/content/tips'
import {
  COLORS,
  blendSummary,
  goalBySlug,
  personaById,
  ranked,
  situationFor,
  type Blend,
  type GoalSlug,
} from '@/content/survey'

const CANVAS = rgb('#0b1220')
const INK = rgb('#f8fafc')
const INK_SOFT = rgb('#cbd5e1')
const MUTED = rgb('#94a3b8')
const SUBTLE = rgb('#7c8ba1')
const LINE = rgb('#243044')

const MARGIN = 46
const COL = A4.width - MARGIN * 2

/** Cursor + page breaking. The document is one page in practice; this keeps a
 *  long free-text goal or a wide blend legend from silently running off it. */
function layout(doc: Doc, hue: Rgb) {
  const paint = () => {
    doc.rect(0, 0, A4.width, A4.height, CANVAS)
    doc.rect(0, 0, A4.width, 5, hue)
  }
  paint()

  let y = MARGIN + 40
  return {
    get y() {
      return y
    },
    move(dy: number) {
      y += dy
    },
    need(h: number) {
      if (y + h <= A4.height - MARGIN - 22) return
      doc.newPage()
      paint()
      y = MARGIN + 46
    },
    set(v: number) {
      y = v
    },
  }
}

export type TipsInput = {
  goal: GoalSlug
  personaId: string | null
  blend: Blend
}

export function buildTipsPdf({ goal, personaId, blend }: TipsInput): Uint8Array {
  const g = goalBySlug(goal)!
  const tips = tipsFor(g.tips)
  const persona = personaById(personaId)
  const top = ranked(blend)[0]!
  const hue = rgb(tips.hue)

  const doc = createDoc(A4)
  const L = layout(doc, hue)

  const label = (text: string) => {
    L.need(30)
    doc.line(text.toUpperCase(), MARGIN, L.y, { size: 8.5, font: 'bold', color: SUBTLE })
    L.move(16)
  }

  const body = (text: string, color = INK_SOFT, size = 10.3) => {
    L.need(size * 3)
    L.set(doc.paragraph(text, MARGIN, L.y, { size, color, width: COL, leading: size * 1.46 }))
  }

  /* ------------------------------------------------------------- header -- */

  doc.line('IMPROVTALK', MARGIN, L.y, { size: 8.5, font: 'bold', color: hue })
  L.move(32)
  doc.line(tips.title, MARGIN, L.y, { size: 26, font: 'bold', color: INK })
  L.move(19)
  doc.line(tips.who, MARGIN, L.y, { size: 10.2, color: MUTED })
  L.move(30)

  /* -------------------------------------------------------------- blend -- */

  const barY = L.y
  let x = MARGIN
  for (const c of ranked(blend)) {
    const w = (blend[c.key] / 100) * COL
    doc.rect(x, barY, w, 9, rgb(c.hex))
    x += w
  }
  L.move(24)
  doc.line(blendSummary(blend), MARGIN, L.y, { size: 10, font: 'bold', color: INK })
  L.move(28)

  /* ---------------------------------------------------------- situation -- */

  label('Where you are')
  if (persona) body(persona.situation, INK_SOFT, 11)
  else body(tips.situation, INK_SOFT, 11)
  L.move(7)
  body(situationFor(goal, blend), MUTED)
  L.move(5)
  body(COLOR_NOTE[top.key], MUTED)
  L.move(20)

  /* -------------------------------------------------------------- moves -- */

  label('Four moves')
  tips.moves.forEach(([title, text], i) => {
    L.need(62)
    const n = String(i + 1).padStart(2, '0')
    doc.line(n, MARGIN, L.y, { size: 9.6, font: 'bold', color: hue })
    doc.line(title, MARGIN + 24, L.y, { size: 11.2, font: 'bold', color: INK })
    L.move(16)
    L.set(
      doc.paragraph(text, MARGIN + 24, L.y, {
        size: 9.9,
        color: MUTED,
        width: COL - 24,
        leading: 14.0,
      }),
    )
    L.move(10)
  })

  L.move(6)

  /* ------------------------------------------------------------- what next */

  L.need(110)
  doc.rect(MARGIN, L.y, COL, 1, LINE)
  L.move(24)

  label('Start with this one')
  body(tips.first)
  L.move(18)

  label('In the app')
  body(tips.scenario)

  /* ------------------------------------------------------------- footer -- */

  const footer = A4.height - MARGIN + 6
  doc.line('improvtalk.vip', MARGIN, footer, { size: 8.5, font: 'bold', color: SUBTLE })
  doc.line(
    'Generated from your own answers. Nothing here identifies you.',
    MARGIN + 72,
    footer,
    { size: 8.5, color: SUBTLE },
  )

  return doc.bytes()
}

/** Filename people can find again in a downloads folder six weeks later. */
export function tipsFilename(goal: GoalSlug): string {
  const g = goalBySlug(goal)!
  return `improvtalk-${g.tips}-tips.pdf`
}

export function downloadTipsPdf(input: TipsInput) {
  download(buildTipsPdf(input), tipsFilename(input.goal))
}

/** Exported for the colour legend on screen, so both stay in one order. */
export const legend = (blend: Blend) =>
  COLORS.map((c) => `${blend[c.key]}% ${c.label}`)

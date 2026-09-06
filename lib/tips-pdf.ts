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
import { CORE, FLOW, PRINCIPLES, angleFor, openerFor } from '@/content/coach'
import { planFor } from '@/content/scenarios'
import {
  COLORS,
  blendSummary,
  goalBySlug,
  personaById,
  ranked,
  situationFor,
  type Blend,
  type ColorKey,
  type GoalSlug,
} from '@/content/survey'

/*
 * Printed on paper, not rendered on the site.
 *
 * The dark canvas is right for a screen and wrong for a document: it prints as
 * a solid block of toner, photocopies badly, and reads as a slide rather than
 * as something you would keep. This is a white sheet with the brand hue used
 * only for rules, numbers and the one line at the top.
 */
const PAPER = rgb('#ffffff')
const INK = rgb('#111827')
const INK_SOFT = rgb('#374151')
const MUTED = rgb('#4b5563')
const SUBTLE = rgb('#6b7280')
const LINE = rgb('#e5e7eb')
const LINE_STRONG = rgb('#d1d5db')

/**
 * The feature hues were picked for a dark background. Amber and green in
 * particular fall under 3:1 on white, so anything set as *text* gets a
 * darkened variant while bars and rules keep the true colour.
 */
function shade(hex: string, factor: number): Rgb {
  const [r, g, b] = rgb(hex)
  return [r * factor, g * factor, b * factor]
}

const MARGIN = 46
const COL = A4.width - MARGIN * 2

/** The footer sits on every page, so it is drawn rather than positioned once. */
function paintFooter(doc: Doc, hue: Rgb) {
  const y = A4.height - MARGIN + 6
  doc.rect(MARGIN, y - 16, A4.width - MARGIN * 2, 0.75, LINE)
  doc.line('improvtalk.vip', MARGIN, y, { size: 8.5, font: 'bold', color: SUBTLE })
  doc.line(
    'Generated from your own answers. Nothing here identifies you.',
    MARGIN + 72,
    y,
    { size: 8.5, color: SUBTLE },
  )
}

/** Cursor + page breaking. The document is one page in practice; this keeps a
 *  long free-text goal or a wide blend legend from silently running off it. */
function layout(doc: Doc, hue: Rgb) {
  /* Background, top rule and footer are page furniture — every page gets them,
     including the ones a mid-section overflow creates. */
  const paint = () => {
    doc.rect(0, 0, A4.width, A4.height, PAPER)
    /* Inset, not full-bleed: most printers cannot reach the paper edge, so a
       bar at y=0 either clips or prints as a grey smear. */
    doc.rect(MARGIN, MARGIN - 16, 46, 3, hue)
    paintFooter(doc, hue)
  }
  paint()

  let y = MARGIN + 40
  const reset = () => {
    y = MARGIN + 40
  }
  return {
    get y() {
      return y
    },
    move(dy: number) {
      y += dy
    },
    need(h: number) {
      if (y + h <= A4.height - MARGIN - 26) return
      doc.newPage()
      paint()
      reset()
    },
    /** Deliberate page break, for a section that should start clean. */
    page() {
      doc.newPage()
      paint()
      reset()
    },
    set(v: number) {
      y = v
    },
  }
}

/*
 * The blend bars, in ink that survives paper. The site's four data colours are
 * chosen for a black ground and two of them (yellow, mint) all but disappear on
 * white; these are the hues the sheet was tuned with, kept here so a change to
 * the screen palette never silently changes the print.
 */
const BLEND_INK: Record<ColorKey, string> = {
  red: '#ff375f',
  blue: '#0a84ff',
  yellow: '#ff9f0a',
  green: '#30d158',
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
  /* Bars and rules keep the true hue; type takes the darkened one. */
  const hueInk = shade(tips.hue, 0.72)

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

  doc.line('IMPROVTALK', MARGIN, L.y, { size: 8.5, font: 'bold', color: hueInk })
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
    doc.rect(x, barY, w, 9, rgb(BLEND_INK[c.key]))
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
    doc.line(n, MARGIN, L.y, { size: 9.6, font: 'bold', color: hueInk })
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
  doc.rect(MARGIN, L.y, COL, 0.75, LINE_STRONG)
  L.move(24)

  label('Start with this one')
  body(tips.first)
  L.move(18)

  label('In the app')
  body(tips.scenario)

  /* ------------------------------------------------ page 2: what to do -- */

  const opener = openerFor(g.tips, top.key)
  const angle = angleFor(g.tips, top.key)

  L.page()

  doc.line('YOUR PRACTICE PLAN', MARGIN, L.y, { size: 8.5, font: 'bold', color: hueInk })
  L.move(28)
  doc.line('Three scenarios, in this order', MARGIN, L.y, { size: 20, font: 'bold', color: INK })
  L.move(20)
  body(
    `Picked for ${g.label.toLowerCase()} and for a ${top.label.toLowerCase()} style. Every one of these exists in the app today.`,
    MUTED,
  )
  L.move(18)

  planFor(g.tips, top.key).forEach((step, i) => {
    L.need(96)
    const n = String(i + 1).padStart(2, '0')
    doc.line(n, MARGIN, L.y, { size: 9.6, font: 'bold', color: hueInk })
    doc.line(step.scenario.title, MARGIN + 24, L.y, { size: 11.8, font: 'bold', color: INK })
    L.move(14)
    doc.line(
      `${step.role}  ·  difficulty ${step.scenario.difficulty} of 3  ·  ${step.scenario.tier}`,
      MARGIN + 24,
      L.y,
      { size: 8.6, font: 'bold', color: SUBTLE },
    )
    L.move(14)
    L.set(
      doc.paragraph(step.scenario.drills, MARGIN + 24, L.y, {
        size: 9.9,
        color: MUTED,
        width: COL - 24,
        leading: 14,
      }),
    )
    L.move(13)
  })

  L.move(8)
  doc.rect(MARGIN, L.y, COL, 0.75, LINE_STRONG)
  L.move(26)

  label('How to open')
  doc.line(opener.label, MARGIN, L.y, { size: 12.5, font: 'bold', color: INK })
  L.move(17)
  body(opener.how, INK_SOFT)
  L.move(6)
  body(opener.why, MUTED)
  L.move(6)
  body(`What kills it: ${opener.kills}`, MUTED)
  L.move(20)

  label('How to steer it after that')
  doc.line(angle.label, MARGIN, L.y, { size: 12.5, font: 'bold', color: INK })
  L.move(17)
  body(angle.how, INK_SOFT)
  L.move(6)
  body(`Watch for: ${angle.watch}`, MUTED)

  /* --------------------------------------------- page 3: the constants -- */

  L.page()

  doc.line('THE PARTS THAT DO NOT CHANGE', MARGIN, L.y, { size: 8.5, font: 'bold', color: hueInk })
  L.move(28)
  doc.line('Four rules for your style', MARGIN, L.y, { size: 20, font: 'bold', color: INK })
  L.move(24)

  PRINCIPLES[top.key].forEach(([title, text]) => {
    L.need(56)
    doc.line(title, MARGIN, L.y, { size: 11.2, font: 'bold', color: INK })
    L.move(15)
    L.set(doc.paragraph(text, MARGIN, L.y, { size: 9.9, color: MUTED, width: COL, leading: 14 }))
    L.move(13)
  })

  L.move(10)
  doc.rect(MARGIN, L.y, COL, 0.75, LINE_STRONG)
  L.move(26)

  label('The three things underneath all of it')
  CORE.forEach(([title, text]) => {
    L.need(44)
    doc.line(title, MARGIN, L.y, { size: 10.6, font: 'bold', color: hueInk })
    L.move(14)
    L.set(doc.paragraph(text, MARGIN, L.y, { size: 9.7, color: MUTED, width: COL, leading: 13.6 }))
    L.move(11)
  })

  L.move(14)
  label('Where you are in a conversation')
  FLOW.forEach(([title, text]) => {
    L.need(40)
    doc.line(title, MARGIN, L.y, { size: 10.2, font: 'bold', color: INK })
    L.move(14)
    L.set(doc.paragraph(text, MARGIN, L.y, { size: 9.7, color: MUTED, width: COL, leading: 13.6 }))
    L.move(11)
  })

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

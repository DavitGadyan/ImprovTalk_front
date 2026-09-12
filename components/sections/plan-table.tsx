'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@/components/ui/icon'
import { AnimatedNumber } from '@/components/ui/animated-number'
import {
  BILLING_NOTE,
  DEFAULT_INTERVAL,
  FREE_MISSES,
  INTERVALS,
  MAX_SAVINGS,
  PLANS,
  PRICES,
  ROWS,
  price,
  type Interval,
} from '@/content/pricing'
import { fadeUp, popIn, stagger, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * Three plan cards on top of one comparison table.
 *
 * The cards carry the price and a one-line tagline; the table underneath is
 * where the actual differences live, one row per feature, so nobody has to
 * read three feature lists against each other.
 *
 * The Weekly / Monthly switch is the app's own (upgrade.tsx), monthly first
 * as the app defaults, and the saving is computed from the same formula. The
 * exported HTML carries the monthly figures; the switch is a client detail.
 *
 * Gold is spent on one argument: the distance between Free and the plan we
 * recommend. It goes on the Max price figure, the Recommended dot, and the
 * check glyphs in the rows Free does not have — numbers, dots and glyphs,
 * which is what gold is for. It is never a card fill or a border; a tinted
 * card is the template look, and the brand gradient belongs to the install
 * button alone (CLAUDE.md rule 8).
 *
 * Motion: the cards pop in with Max last; the rows Free lacks run in sequence
 * as the table scrolls into view. All transform/opacity, and all of it goes
 * still under prefers-reduced-motion through MotionConfig.
 */
export function PlanTable() {
  const [interval, setInterval] = useState<Interval>(DEFAULT_INTERVAL)
  /* The count-up is an entry effect. Once the reader has touched the switch
     the figure changes at once, in place — a second count would read as the
     price being unsure of itself. */
  const [touched, setTouched] = useState(false)
  const per = INTERVALS.find((i) => i.key === interval)!.per

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <div
          role="radiogroup"
          aria-label="Billing period"
          className="inline-flex rounded-full border border-line p-1"
        >
          {INTERVALS.map((i) => {
            const active = i.key === interval
            return (
              <button
                key={i.key}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => {
                  setInterval(i.key)
                  setTouched(true)
                }}
                className={cn(
                  'rounded-full px-4 py-1.5 text-small font-medium transition-colors',
                  active ? 'bg-accent text-on-accent' : 'text-muted hover:text-ink',
                )}
              >
                {i.label}
              </button>
            )
          })}
        </div>
        <p className="text-small text-muted">
          Monthly saves up to <span className="numeric text-ink">{MAX_SAVINGS}%</span>. No yearly
          plan yet.
        </p>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5"
      >
        {PLANS.map((p) => (
          <motion.div key={p.key} variants={popIn} className="panel p-6 md:p-7">
            <div className="flex items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 text-xl font-bold text-ink">
                <Icon name={p.icon} className="text-[22px] text-muted" />
                {p.name}
              </h3>
              {p.recommended && (
                <span className="inline-flex items-center gap-2 text-micro font-semibold uppercase tracking-[0.13em] text-muted">
                  <span aria-hidden="true" className="gold-pulse size-1.5 rounded-full bg-gold" />
                  Recommended
                </span>
              )}
            </div>
            <p className={cn('numeric mt-5', p.recommended ? 'text-gold' : 'text-ink')}>
              <span className="text-4xl font-bold">
                {p.key === 'max' && !touched ? (
                  <>
                    {PRICES.symbol}
                    <AnimatedNumber value={PRICES.max[interval]} duration={900} />
                  </>
                ) : (
                  price(p.key, interval)
                )}
              </span>
              {p.key !== 'free' && <span className="ml-1 text-small text-muted">/ {per}</span>}
            </p>
            {p.key !== 'free' && (
              <p className="mt-1 text-caption text-muted">
                or {price(p.key, interval === 'week' ? 'month' : 'week')} a{' '}
                {interval === 'week' ? 'month' : 'week'}
              </p>
            )}
            <p className="mt-3 text-small text-muted">{p.tagline}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-small text-muted"
      >
        <span className="text-ink">{missesPhrase(FREE_MISSES.length)} Free does not include:</span>
        {FREE_MISSES.map((label) => (
          <span key={label} className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
            {label.split(' — ')[0]}
          </span>
        ))}
      </motion.p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-small">
          <thead>
            <tr>
              <th scope="col" className="w-[40%] pb-3 text-left text-micro font-semibold uppercase tracking-[0.13em] text-muted">
                Feature
              </th>
              {PLANS.map((p) => (
                <th
                  key={p.key}
                  scope="col"
                  className="pb-3 text-center text-micro font-semibold uppercase tracking-[0.13em] text-muted"
                >
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <motion.tbody
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {ROWS.map((row) => {
              const misses = row.free === false
              return (
                <motion.tr
                  key={row.label}
                  /* Rows Free has are static; the ones it lacks run in sequence. */
                  variants={misses ? { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } } : undefined}
                  className="border-t border-line"
                >
                  <th scope="row" className="py-3.5 pr-4 text-left font-medium text-ink">
                    <span className="inline-flex items-center gap-2">
                      {misses && (
                        <motion.span
                          aria-hidden="true"
                          variants={{ hidden: { opacity: 0, scale: 0.4 }, visible: { opacity: 1, scale: 1 } }}
                          className="size-1.5 shrink-0 rounded-full bg-gold"
                        />
                      )}
                      {row.label}
                    </span>
                  </th>
                  {(['free', 'pro', 'max'] as const).map((k) => (
                    <td key={k} className="py-3.5 text-center">
                      <Cell v={row[k]} gold={misses && row[k] === true} animate={misses} />
                    </td>
                  ))}
                </motion.tr>
              )
            })}
          </motion.tbody>
        </table>
      </div>
      <p className="mt-4 text-caption text-muted">{BILLING_NOTE}</p>
    </div>
  )
}

/* Spelled out, and derived, so the line can never say "three" over six rows. */
const WORD: Record<number, string> = { 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six', 7: 'Seven', 8: 'Eight' }
const missesPhrase = (n: number) => (n === 1 ? 'One thing' : `${WORD[n] ?? n} things`)

const glyphIn = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1 },
}

function Cell({ v, gold, animate }: { v: string | boolean; gold: boolean; animate: boolean }) {
  if (v === true) {
    const icon = (
      <Icon name="check" label="Included" className={cn('text-[20px]', gold ? 'text-gold' : 'text-success')} />
    )
    return animate ? (
      <motion.span variants={glyphIn} className="inline-block">
        {icon}
      </motion.span>
    ) : (
      icon
    )
  }
  if (v === false) {
    return (
      <Icon
        name="remove"
        label="Not included"
        className={cn('text-[20px]', animate ? 'text-muted/60' : 'text-muted')}
      />
    )
  }
  return <span className={cn('text-ink', v === 'Unlimited' && 'font-medium')}>{v}</span>
}

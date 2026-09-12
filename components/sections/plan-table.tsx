'use client'

import { motion } from 'framer-motion'
import { Icon } from '@/components/ui/icon'
import { AnimatedNumber } from '@/components/ui/animated-number'
import { BILLING_NOTE, FREE_MISSES, PLANS, PRICES, ROWS, price } from '@/content/pricing'
import { fadeUp, popIn, stagger, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * Three plan cards on top of one comparison table.
 *
 * The cards carry the price and a one-line tagline; the table underneath is
 * where the actual differences live, one row per feature, so nobody has to
 * read three feature lists against each other.
 *
 * Gold is spent on one argument: the distance between Free and the plan we
 * recommend. It goes on the Max price figure, the Recommended dot, and the
 * check glyphs in the rows Free does not have — numbers, dots and glyphs,
 * which is what gold is for. It is never a card fill or a border; a tinted
 * card is the template look, and the brand gradient belongs to the install
 * button alone (CLAUDE.md rule 8).
 *
 * Motion: the cards pop in with Max last; the three Free-misses rows run in
 * sequence as the table scrolls into view. All transform/opacity, and all of
 * it goes still under prefers-reduced-motion through MotionConfig.
 */
export function PlanTable() {
  return (
    <div>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-4 md:grid-cols-3 md:gap-5"
      >
        {PLANS.map((p) => (
          <motion.div key={p.key} variants={popIn} className="panel p-6 md:p-7">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-bold text-ink">{p.name}</h3>
              {p.recommended && (
                <span className="inline-flex items-center gap-2 text-micro font-semibold uppercase tracking-[0.13em] text-muted">
                  <span aria-hidden="true" className="gold-pulse size-1.5 rounded-full bg-gold" />
                  Recommended
                </span>
              )}
            </div>
            <p className={cn('numeric mt-5', p.recommended ? 'text-gold' : 'text-ink')}>
              <span className="text-4xl font-bold">
                {p.recommended ? (
                  <>
                    {PRICES.symbol}
                    <AnimatedNumber value={PRICES[p.key]} duration={900} />
                  </>
                ) : (
                  price(p.key)
                )}
              </span>
              {p.key !== 'free' && (
                <span className="ml-1 text-small text-muted">/ {PRICES.period}</span>
              )}
            </p>
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
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {ROWS.map((row) => {
              const misses = row.free === false
              return (
                <motion.tr
                  key={row.label}
                  /* Rows Free has are static; the three it lacks run in sequence. */
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

/* Spelled out, and derived, so the line can never say "three" over four rows. */
const WORD: Record<number, string> = { 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five' }
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

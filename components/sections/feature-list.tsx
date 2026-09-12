'use client'

import { motion } from 'framer-motion'
import { Icon } from '@/components/ui/icon'
import { RealTalkTools } from '@/components/sections/real-talk'
import { RENDERS } from '@/lib/renders'
import { TILES } from '@/content/pricing'
import { fadeUp, stagger, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

const PLAN_LABEL = { free: 'Free', pro: 'Pro', max: 'Max' } as const

/**
 * The six Home tiles as one accordion: a row per feature — its glyph, its
 * title and one sentence — that opens to the full account, the screenshot
 * where one exists, and the Real Talk tools under Real Talk.
 *
 * Native <details>, the FAQ's own pattern: keyboard-accessible, in the HTML
 * before hydration, findable by the browser's in-page search. The `name`
 * attribute makes the group exclusive in the browser (Chrome 120, Safari
 * 17.2, Firefox 130); the toggle handler does the same by hand for anything
 * older, so one feature open closes the others everywhere. Every closed
 * panel is still in the export — crawlers read all six.
 */
export function FeatureList() {
  const closeOthers = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const el = e.currentTarget
    if (!el.open) return
    el.parentElement
      ?.querySelectorAll<HTMLDetailsElement>('details[open]')
      .forEach((d) => d !== el && (d.open = false))
  }

  return (
    <motion.ol
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="divide-y divide-line border-y border-line"
    >
      {TILES.map((t, i) => {
        const r = t.render ? RENDERS[t.render] : null
        return (
          <motion.li key={t.title} variants={fadeUp}>
            <details name="feature" open={i === 0} onToggle={closeOthers} className="group">
              <summary className="flex cursor-pointer list-none items-center gap-4 py-5 marker:hidden md:gap-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line">
                  <Icon name={t.icon} className="text-[22px] text-ink" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-body font-bold text-ink">{t.title}</span>
                  <span className="block text-small text-muted">{t.line}</span>
                </span>
                <span className="hidden items-center gap-1.5 text-micro font-semibold uppercase tracking-[0.13em] text-muted sm:inline-flex">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'size-1.5 rounded-full',
                      t.from === 'free' && 'bg-success',
                      t.from === 'pro' && 'bg-warn',
                      t.from === 'max' && 'bg-accent',
                    )}
                  />
                  {t.from === 'free' ? 'Free' : `From ${PLAN_LABEL[t.from]}`}
                </span>
                <Icon
                  name="add"
                  className="shrink-0 text-xl text-muted transition-transform duration-300 group-open:rotate-45"
                />
              </summary>

              <div
                className={cn(
                  'result-rise grid gap-8 pb-8 pl-0 md:pl-16',
                  r && 'md:grid-cols-[minmax(0,1fr)_18rem] md:items-start',
                )}
              >
                <div>
                  <p className="text-body text-muted">{t.body}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-micro font-semibold uppercase tracking-[0.13em] text-muted sm:hidden">
                    <span
                      aria-hidden="true"
                      className={cn(
                        'size-1.5 rounded-full',
                        t.from === 'free' && 'bg-success',
                        t.from === 'pro' && 'bg-warn',
                        t.from === 'max' && 'bg-accent',
                      )}
                    />
                    {t.from === 'free' ? 'Free' : `From ${PLAN_LABEL[t.from]}`}
                  </p>
                  {t.title === 'Real Talk' && (
                    <div className="mt-6">
                      <RealTalkTools compact />
                    </div>
                  )}
                </div>
                {r && (
                  <figure>
                    <img
                      src={r.src}
                      srcSet={r.srcSet}
                      sizes="(min-width: 768px) 18rem, 100vw"
                      width={r.width}
                      height={r.height}
                      alt={r.alt}
                      loading="lazy"
                      decoding="async"
                      className="mx-auto h-auto w-full max-w-[18rem] rounded-card"
                    />
                  </figure>
                )}
              </div>
            </details>
          </motion.li>
        )
      })}
    </motion.ol>
  )
}

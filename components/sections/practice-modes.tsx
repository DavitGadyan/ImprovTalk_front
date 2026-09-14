'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/section'
import { Icon } from '@/components/ui/icon'
import { APPROACH, PRACTICE_INTRO, modesFor } from '@/content/practice'
import { popIn, stagger, viewportOnce } from '@/lib/motion'
import type { Persona } from '@/content/personas'
import { cn } from '@/lib/utils'

const PLAN_LABEL = { free: 'Free', pro: 'Pro', max: 'Max' } as const

/**
 * What Practice is, now that it is more than the approach: the venues, the
 * five pressure scenes, the date, the other side of the approach, and the
 * drills under all of it. One card per mode, counts and scene names from the
 * app's own files (content/practice.ts), the plan each one is on as a dot.
 *
 * The persona picks which card comes first (`practice.lead`): someone
 * freezing in meetings reads Situational Pressure before the bar.
 */
export function PracticeModes({ persona, index }: { persona: Persona; index: number }) {
  const { label, title, intro, lead } = persona.practice
  const modes = modesFor(lead)
  return (
    <Section id="practice" index={index} label={label} title={title} intro={intro}>
      <p className="mb-10 max-w-2xl text-small text-muted">
        In the app&rsquo;s own words: &ldquo;{PRACTICE_INTRO}&rdquo;
      </p>
      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
      >
        {modes.map((m, i) => (
          <motion.li
            key={m.key}
            variants={popIn}
            className={cn('panel flex flex-col p-6', i === 0 && lead && 'sm:col-span-2 lg:col-span-3 lg:flex-row lg:gap-12')}
          >
            <div className={cn(i === 0 && lead && 'lg:w-1/3')}>
              <p className="inline-flex items-center gap-1.5 text-micro font-semibold uppercase tracking-[0.13em] text-muted">
                <span
                  aria-hidden="true"
                  className={cn(
                    'size-1.5 rounded-full',
                    m.from === 'free' && 'bg-success',
                    m.from === 'pro' && 'bg-warn',
                    m.from === 'max' && 'bg-accent',
                  )}
                />
                {m.from === 'free' ? 'Free' : `From ${PLAN_LABEL[m.from]}`}
              </p>
              <h3 className="mt-3 text-xl font-bold text-ink">{m.title}</h3>
              {m.subtitle && <p className="mt-1 text-small italic text-muted">{m.subtitle}</p>}
              <p className="numeric mt-3 text-small text-ink">
                {m.key === 'approach' ? `${m.scenes} scenes across ${APPROACH.venues} venues` : `${m.scenes} scenes`}
              </p>
            </div>
            <div className={cn('mt-4', i === 0 && lead && 'lg:mt-0 lg:flex-1')}>
              <p className="text-small text-muted">{m.trains}</p>
              <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-caption text-muted">
                {m.examples.map((e) => (
                  <li key={e} className="inline-flex items-center gap-1.5">
                    <Icon name="chevron_right" className="text-[14px] text-muted" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}

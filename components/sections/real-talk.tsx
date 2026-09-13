'use client'

import { Section } from '@/components/ui/section'
import { Icon } from '@/components/ui/icon'
import { REAL_TALK } from '@/content/pricing'
import type { Persona } from '@/content/personas'
import { cn } from '@/lib/utils'

/**
 * Real Talk — the three tools, drawn from content/pricing.ts so the persona
 * pages and /pricing/ cannot say two different things about them.
 *
 * Every title and line is the app's own string. The claims that matter are
 * the ones the code actually makes: "2–3 openers", not three; a direction is
 * "high" or "medium", not a percentage; the upload gets a "Charisma grade".
 *
 * Each tool is a native <details>, one open at a time (`name`, with a toggle
 * handler for browsers before it), so the three read as a short list until
 * one is wanted. The gold dot beside each closed title pulses — gold on a
 * dot, which is what gold is for — and the list inside lands check by check.
 */
export function RealTalkTools({ compact = false }: { compact?: boolean }) {
  const closeOthers = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const el = e.currentTarget
    if (e.target !== el || !el.open) return
    el.parentElement?.parentElement
      ?.querySelectorAll<HTMLDetailsElement>(':scope > li > details[name="realtalk-tool"][open]')
      .forEach((d) => d !== el && (d.open = false))
  }

  return (
    <ul className="grid gap-3">
      {REAL_TALK.tools.map((t, i) => (
        <li key={t.title} className={cn('panel', compact ? 'px-5' : 'px-6')}>
          <details name="realtalk-tool" open={i === 0} onToggle={closeOthers} className="group">
            <summary
              className={cn(
                'flex cursor-pointer list-none items-start gap-3 marker:hidden',
                compact ? 'py-4' : 'py-5',
              )}
            >
              <span
                aria-hidden="true"
                className="gold-pulse mt-2 size-1.5 shrink-0 rounded-full bg-gold"
              />
              <span className="min-w-0 flex-1">
                <span className={cn('block font-bold text-ink', compact ? 'text-body' : 'text-lg')}>
                  {t.title}
                </span>
                <span className="mt-1 block text-small text-muted">{t.line}</span>
              </span>
              <Icon
                name="add"
                className="mt-0.5 shrink-0 text-xl text-muted transition-transform duration-300 group-open:rotate-45"
              />
            </summary>
            <ul className={cn('grid gap-2 pl-[1.125rem]', compact ? 'pb-5' : 'pb-6')}>
              {t.gives.map((g, j) => (
                <li
                  key={g}
                  className="result-rise flex items-start gap-2 text-small text-muted"
                  style={{ animationDelay: `${j * 70}ms` }}
                >
                  <Icon name="check" className="mt-0.5 text-[16px] text-success" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </details>
        </li>
      ))}
    </ul>
  )
}

/** The persona-page section. Copy comes from the persona; the tools do not. */
export function RealTalk({ persona, index }: { persona: Persona; index: number }) {
  const { label, title, intro } = persona.realtalk
  return (
    <Section id="realtalk" index={index} label={label} title={title} intro={intro}>
      <div className="max-w-3xl">
        <RealTalkTools />
      </div>
      <p className="mt-6 text-caption text-muted">
        Real Talk is part of the Max plan. Recordings and rated conversations are saved to
        History and count toward your real stats.
      </p>
    </Section>
  )
}

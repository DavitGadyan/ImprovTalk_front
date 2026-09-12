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
 */
export function RealTalkTools({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={cn('grid gap-3', !compact && 'md:grid-cols-3 md:gap-5')}>
      {REAL_TALK.tools.map((t) => (
        <li key={t.title} className={cn('panel', compact ? 'p-5' : 'p-6')}>
          <h4 className={cn('font-bold text-ink', compact ? 'text-body' : 'text-lg')}>{t.title}</h4>
          <p className="mt-2 text-small text-muted">{t.line}</p>
          <ul className="mt-4 grid gap-2">
            {t.gives.map((g) => (
              <li key={g} className="flex items-start gap-2 text-small text-muted">
                <Icon name="check" className="mt-0.5 text-[16px] text-success" />
                <span>{g}</span>
              </li>
            ))}
          </ul>
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
      <RealTalkTools />
      <p className="mt-6 text-caption text-muted">
        Real Talk is part of the Max plan. Recordings and rated conversations are saved to
        History and count toward your real stats.
      </p>
    </Section>
  )
}

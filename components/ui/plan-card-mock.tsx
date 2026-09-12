import { Icon } from '@/components/ui/icon'
import { PLANS, PLAN_CARDS, price, priceLine, type PlanKey } from '@/content/pricing'
import { cn } from '@/lib/utils'

/**
 * The app's plan card, drawn — the one tile in the product bento that is not
 * a screenshot.
 *
 * The case study's `plan-max` render shows the paywall as it was before the
 * plans changed on 12 Sep 2026, and no export of the new one exists. A card
 * drawn from content/pricing.ts shows every inclusion the plan has now, and
 * stays right when the plan changes again. It is the app's own card in the
 * app's own tokens — crown, RECOMMENDED ribbon, gold price, a check per line,
 * and the Choose button as the app draws it. The gold chrome here is a
 * depiction of the app's screen, not the site's; the site's own rule for
 * gold (numbers, dots, glyphs) is unchanged. The lines are real text, so the
 * inclusions are readable by crawlers, which the screenshot never was.
 */
export function PlanCardMock({ plan = 'max', className }: { plan?: PlanKey; className?: string }) {
  const p = PLANS.find((x) => x.key === plan)!
  const card = PLAN_CARDS[plan]
  const paid = plan !== 'free'
  return (
    <div className={cn('flex size-full items-center justify-center p-[6%]', className)}>
      <div className="relative w-full rounded-[20px] border border-gold bg-canvas p-5 pt-6">
        {p.recommended && (
          <span className="absolute -top-px right-5 inline-flex items-center gap-1 rounded-b-lg bg-gold px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-black">
            <Icon name="auto_awesome" className="text-[11px]" />
            Recommended
          </span>
        )}

        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold text-black">
            <Icon name={p.icon} filled className="text-[20px]" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-bold leading-tight text-ink">{p.name}</p>
            <p className="text-[11px] text-muted">{p.tagline}</p>
          </div>
        </div>

        <p className="numeric mt-4 flex items-baseline gap-1.5 leading-none">
          <span className="text-2xl font-bold text-gold">{price(plan, 'month')}</span>
          {paid && <span className="text-[11px] text-muted">/month</span>}
          {paid && <span className="ml-auto text-[11px] text-muted">or {priceLine(plan, 'week')}</span>}
        </p>

        <ul className="mt-4 grid gap-1.5">
          {card.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-[12px] leading-snug text-ink">
              <Icon name="check" className="mt-px shrink-0 text-[14px] text-gold" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* The app's button, as drawn. Not a control here. */}
        <div
          aria-hidden="true"
          className="mt-4 flex h-10 items-center justify-center rounded-xl bg-gold text-[13px] font-bold text-black"
        >
          {card.cta}
        </div>
      </div>
    </div>
  )
}

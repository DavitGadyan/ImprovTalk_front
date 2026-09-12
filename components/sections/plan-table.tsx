import { Icon } from '@/components/ui/icon'
import { BILLING_NOTE, PLANS, PRICES, ROWS, price } from '@/content/pricing'
import { cn } from '@/lib/utils'

/**
 * Three plan cards on top of one comparison table.
 *
 * The cards carry the price and a one-line tagline; the table underneath is
 * where the actual differences live, one row per feature, so nobody has to
 * read three feature lists against each other. Max is "Recommended" as muted
 * text beside a dot — the brand gradient is the install button's and nothing
 * else's (CLAUDE.md rule 8), and a tinted card is what the template look is.
 */
export function PlanTable() {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        {PLANS.map((p) => (
          <div key={p.key} className="panel p-6 md:p-7">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-bold text-ink">{p.name}</h3>
              {p.recommended && (
                <span className="inline-flex items-center gap-1.5 text-micro font-semibold uppercase tracking-[0.13em] text-muted">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                  Recommended
                </span>
              )}
            </div>
            <p className="numeric mt-5 text-ink">
              <span className="text-4xl font-bold">{price(p.key)}</span>
              {p.key !== 'free' && (
                <span className="ml-1 text-small text-muted">/ {PRICES.period}</span>
              )}
            </p>
            <p className="mt-3 text-small text-muted">{p.tagline}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-x-auto">
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
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label} className="border-t border-line">
                <th scope="row" className="py-3.5 pr-4 text-left font-medium text-ink">
                  {row.label}
                </th>
                {(['free', 'pro', 'max'] as const).map((k) => (
                  <td key={k} className="py-3.5 text-center">
                    <Cell v={row[k]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-caption text-muted">{BILLING_NOTE}</p>
    </div>
  )
}

function Cell({ v }: { v: string | boolean }) {
  if (v === true) return <Icon name="check" label="Included" className="text-[20px] text-success" />
  if (v === false) return <Icon name="remove" label="Not included" className="text-[20px] text-muted" />
  return <span className={cn('text-ink', v === 'Unlimited' && 'font-medium')}>{v}</span>
}

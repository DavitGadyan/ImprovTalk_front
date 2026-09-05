'use client'

import { cn } from '@/lib/utils'

/**
 * The first form primitives in this codebase.
 *
 * The choice control is the radio-as-pill pattern from the email form that was
 * removed in f3cffb5 — a real <input type="radio"> kept sr-only with a styled
 * <label> over it, so keyboard, screen readers and form semantics all work
 * without reimplementing any of them.
 */

export function Legend({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-6">
      <h2 className="display-md text-ink">{children}</h2>
      {hint && <p className="mt-3 text-[15px] leading-relaxed text-muted">{hint}</p>}
    </div>
  )
}

export function ChoiceGroup<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
  columns = 1,
}: {
  name: string
  legend: string
  options: readonly { value: T; label: string; hint?: string }[]
  value: T | null
  onChange: (v: T) => void
  columns?: 1 | 2
}) {
  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      <div className={cn('grid gap-2.5', columns === 2 && 'sm:grid-cols-2')}>
        {options.map((o) => {
          const active = value === o.value
          return (
            <label
              key={o.value}
              className={cn(
                'flex cursor-pointer flex-col rounded-2xl border px-5 py-4 transition-colors',
                'focus-within:border-accent focus-within:ring-1 focus-within:ring-accent',
                active
                  ? 'border-ink bg-raised/60'
                  : 'border-line-strong hover:border-ink/40 hover:bg-raised/30',
              )}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={active}
                onChange={() => onChange(o.value)}
                className="sr-only"
              />
              <span className={cn('text-[15px] font-medium', active ? 'text-ink' : 'text-ink-soft')}>
                {o.label}
              </span>
              {o.hint && <span className="mt-1 text-[13px] leading-relaxed text-subtle">{o.hint}</span>}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export function Slider({
  label,
  hint,
  value,
  percent,
  hex,
  onChange,
}: {
  label: string
  hint: string
  value: number
  percent: number
  hex: string
  onChange: (v: number) => void
}) {
  const id = `slider-${label.toLowerCase()}`
  return (
    <div className="rounded-2xl border border-line-strong p-5">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[15px] font-medium text-ink">
          {label}
        </label>
        <span className="numeric text-[15px] font-semibold" style={{ color: hex }}>
          {percent}%
        </span>
      </div>
      <p className="mt-1.5 text-[13px] leading-relaxed text-subtle">{hint}</p>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        /* accentColor styles the native thumb and track fill in one property,
           which keeps this a real range input on every platform — including
           the iOS thumb size, which is what makes it usable with a thumb. */
        style={{ accentColor: hex }}
        className="mt-4 h-6 w-full cursor-pointer bg-transparent"
      />
    </div>
  )
}

export function TextArea({
  id,
  label,
  placeholder,
  value,
  onChange,
  maxLength = 2000,
  rows = 4,
}: {
  id: string
  label: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
  maxLength?: number
  rows?: number
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[15px] font-medium text-ink">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-line-strong bg-white/[0.04] px-5 py-4 text-[15px] leading-relaxed text-ink placeholder:text-subtle focus:border-accent focus:outline-none"
      />
      <p className="mt-2 text-right text-[12px] text-subtle">
        {value.length} / {maxLength}
      </p>
    </div>
  )
}

export function Select({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  options: readonly { value: string; label: string }[]
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[15px] font-medium text-ink">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-14 w-full rounded-2xl border border-line-strong bg-white/[0.04] px-5 text-[15px] text-ink focus:border-accent focus:outline-none"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-surface text-ink">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export function Checkbox({
  id,
  checked,
  onChange,
  children,
}: {
  id: string
  checked: boolean
  onChange: (v: boolean) => void
  children: React.ReactNode
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3.5 rounded-2xl border border-line-strong p-5 focus-within:border-accent"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--color-accent)]"
      />
      <span className="text-[13.5px] leading-relaxed text-muted">{children}</span>
    </label>
  )
}

/** Off-screen, never focusable, never announced. Bots fill it; people cannot. */
export function Honeypot({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] size-px overflow-hidden opacity-0">
      <label htmlFor="company-website">Company website</label>
      <input
        id="company-website"
        name="company-website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

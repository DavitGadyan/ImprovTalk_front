'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { waitlist, hasEndpoint } from '@/content/waitlist'
import { cn } from '@/lib/utils'
import { track } from '@/lib/analytics'

type State = 'idle' | 'sending' | 'done' | 'error'

/**
 * Email capture for TestFlight access.
 *
 * Posts to whatever form service is configured in content/waitlist.ts, and
 * falls back to a pre-filled mailto when none is — so it is never a dead end.
 *
 * The honeypot is a real field that is hidden from people but visible to bots;
 * anything that fills it is silently accepted and dropped. That avoids a
 * CAPTCHA, which would mean another third-party script and another consent
 * problem.
 */
export function EarlyAccessForm({
  className,
  align = 'left',
}: {
  className?: string
  align?: 'left' | 'center'
}) {
  const [email, setEmail] = useState('')
  const [platform, setPlatform] = useState<'iPhone' | 'Android'>('iPhone')
  const [state, setState] = useState<State>('idle')
  const [honeypot, setHoneypot] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypot) {
      setState('done') // bot: pretend it worked, send nothing
      return
    }
    setState('sending')

    if (!hasEndpoint) {
      const body = `Please add me to the ImprovTalk TestFlight.\n\nEmail: ${email}\nPhone: ${platform}\n`
      window.location.href =
        `mailto:${waitlist.DELIVER_TO}` +
        `?subject=${encodeURIComponent(waitlist.SUBJECT)}` +
        `&body=${encodeURIComponent(body)}`
      /*
       * Deliberately NOT early_access_submit. Opening a mail client is not the
       * same as sending the mail, and we get no confirmation either way. Firing
       * the conversion event here would overstate the real number — and Ads
       * would then bid toward it.
       */
      track('early_access_intent', { method: 'mailto', platform })
      setState('done')
      return
    }

    try {
      const res = await fetch(waitlist.ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...waitlist.FIELDS,
          subject: waitlist.SUBJECT,
          email,
          platform,
          freeform: `TestFlight request from ${email} (${platform})`,
        }),
      })
      /* Only on a confirmed 2xx — this is the number spend is optimised against. */
      if (res.ok) track('early_access_submit', { method: 'form', platform })
      setState(res.ok ? 'done' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    /*
     * Two different truths. With an endpoint we know the address arrived. With
     * the mailto fallback all we did was open their mail client — telling them
     * they are "on the list" would be a promise we have no basis for, and they
     * would never find out it was wrong.
     */
    return (
      <p
        className={cn(
          'text-[15px] text-ink',
          align === 'center' && 'text-center',
          className,
        )}
      >
        {hasEndpoint ? (
          <>
            Thanks — you&rsquo;re on the list. The TestFlight invite goes to{' '}
            <span className="text-ink-soft">{email}</span>.
          </>
        ) : (
          <>
            Your email app should be open. Press send and you&rsquo;re on the list — the
            invite comes back to{' '}
            <span className="text-ink-soft">{email}</span>.
          </>
        )}
      </p>
    )
  }

  return (
    <form
      onSubmit={submit}
      className={cn('w-full max-w-md', align === 'center' && 'mx-auto', className)}
    >
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <label className="sr-only" htmlFor="ea-email">
          Your email address
        </label>
        <input
          id="ea-email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-14 min-w-0 flex-1 rounded-full border border-line-strong bg-white/[0.04] px-5 text-ink placeholder:text-subtle focus:border-accent focus:outline-none"
        />
        <Button type="submit" size="lg" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Get early access'}
        </Button>
      </div>

      {/* Honeypot — hidden from people, offered to bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute left-[-9999px] size-px opacity-0"
      />

      <fieldset
        className={cn('mt-4 flex items-center gap-2', align === 'center' && 'justify-center')}
      >
        <legend className="sr-only">Which phone do you use?</legend>
        {(['iPhone', 'Android'] as const).map((p) => (
          <label
            key={p}
            className={cn(
              'cursor-pointer rounded-full border px-3.5 py-1.5 text-[13px] transition-colors',
              platform === p
                ? 'border-transparent bg-ink font-medium text-canvas'
                : 'border-line-strong text-muted hover:text-ink',
            )}
          >
            <input
              type="radio"
              name="platform"
              value={p}
              checked={platform === p}
              onChange={() => setPlatform(p)}
              className="sr-only"
            />
            {p}
          </label>
        ))}
      </fieldset>

      {state === 'error' && (
        <p className="mt-3 text-[13px] text-practice">
          That didn&rsquo;t send. Email{' '}
          <a href={`mailto:${waitlist.DELIVER_TO}`} className="underline underline-offset-4">
            {waitlist.DELIVER_TO}
          </a>{' '}
          and we&rsquo;ll add you by hand.
        </p>
      )}

      <p className={cn('mt-4 text-[12px] text-subtle', align === 'center' && 'text-center')}>
        Your address is used to send the TestFlight invite and nothing else.
      </p>
    </form>
  )
}

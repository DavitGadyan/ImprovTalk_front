/**
 * Reading typography for long-form pages.
 *
 * Shared by the blog posts and the method page so there is one set of reading
 * styles, not two that drift. Deliberately not the PageShell styles — those are
 * tuned tight for a privacy policy, and an 800-word essay set that way is the
 * difference between a page people read and a page people bounce off.
 */
export const PROSE = `text-[16.5px] leading-[1.75] text-ink-soft
  [&>p]:mt-6
  [&>h2]:mt-14 [&>h2]:mb-4 [&>h2]:font-[family-name:var(--font-display)]
  [&>h2]:text-[26px] [&>h2]:font-semibold [&>h2]:leading-tight
  [&>h2]:tracking-[-0.03em] [&>h2]:text-ink
  [&>ul]:mt-6 [&>ul]:space-y-3 [&>ul]:pl-5 [&>ul]:list-disc [&>ul]:marker:text-line-strong
  [&_li]:pl-1
  [&_strong]:font-semibold [&_strong]:text-ink
  [&_em]:text-ink [&_em]:not-italic [&_em]:font-medium
  [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-accent/40
  hover:[&_a]:decoration-accent`

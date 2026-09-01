# ImprovTalk site

**Read [`history.md`](history.md) before starting work.** It carries the decisions,
the verified facts and the traps, and it exists so none of that gets re-derived
or re-broken.

Static Next.js export → GitHub Pages → **improvtalk.vip**. Five persona variants
sharing one set of components; two of them in a live A/B split.

## Rules that break things when ignored

1. **Never claim a number that has not been counted** from the app's data files.
   The verified set is in `history.md`. Three languages is real; a translated app
   interface is not, and 195 nationalities change her *accent*, not her language.
2. **The variant redirect must preserve `location.search`.** Losing `gclid`
   breaks Google Ads attribution silently.
3. **`.nojekyll` and `CNAME` must be in `out/`.** Pages strips `_next/*` without
   the first and drops the domain without the second. CI checks both.
4. **Content must render server-side.** No gating on in-view state — crawlers and
   answer engines read the exported HTML, and the AEO work depends on it.
5. **Consent defaults run `beforeInteractive`,** before the gtag library.
6. **Enhanced Conversions stays off** in Google Ads.
7. **Headlines fit two lines at 390px.** Measure, do not eyeball.
8. **The brand gradient appears three times** as site chrome. Not four.

## Verify before claiming done

```bash
npm run build && npx tsc --noEmit
npm run serve:out     # closest local proxy for Pages
```

Then check in a browser: no console errors, no horizontal overflow at 390px, and
the real numbers still present in `out/index.html`.

GitHub Pages serves partial state for a minute or two after a deploy — routes
404 and greps return nonsense. Re-check before diagnosing a fault.

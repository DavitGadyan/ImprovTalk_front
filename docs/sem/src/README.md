# SEM campaign briefs — how to regenerate

One PDF per persona in `docs/sem/`. Each is a single page holding everything
needed to build that campaign: SMART goals, keywords, negatives, the full
responsive search ad, and the voice rules.

```bash
node docs/sem/src/gen-sem.mjs        # writes html/ from sem.mjs
```

Then print each with headless Chrome:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=docs/sem/01-shy.pdf "file://$PWD/docs/sem/src/html/01-shy.html"
```

**Page height** works the same way as the persona docs: delete
`html/heights.json`, regenerate, serve `html/` over HTTP, measure
`max(child.bottom) - page.top + 24 + 66` per page, and write the
`{slug: px}` map back.

## Character counts are rendered on purpose

Every headline and description shows its length in the corner. Google rejects
headlines over 30 characters and descriptions over 90, and the count on the page
means you can paste straight into the editor without checking. `sem.mjs` is
validated against those limits before rendering.

## Editing

Copy lives in `sem.mjs` only. Each campaign carries a `never` list — the words
that must not appear in that persona's ads. They are not stylistic: the wrong
frame makes the ad about somebody else, and for Meeting people it is also an App
Review risk. If you add assets, re-check them against that list.

Source for the wider strategy, including account-level negatives and the launch
sequence, is `docs/SEM-KEYWORDS.md`.

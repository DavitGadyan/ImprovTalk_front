import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { CAMPAIGNS } from './sem.mjs'

const ROOT = new URL('../../../', import.meta.url).pathname
const OUT = `${ROOT}docs/sem/src/html/`
mkdirSync(OUT, { recursive: true })

const b64 = (p) => readFileSync(ROOT + p).toString('base64')
const FONT_D = `data:font/woff2;base64,${b64('public/fonts/InterTight-latin-var.woff2')}`
const FONT_B = `data:font/woff2;base64,${b64('public/fonts/Inter-latin-var.woff2')}`
const ICON = `data:image/png;base64,${b64('public/icon.png')}`
const GRAD = 'linear-gradient(100deg,#ff9500 0%,#ff2d55 36%,#af52de 68%,#5856d6 100%)'

const esc = (s) => String(s).replace(/&(?![a-z]+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const css = (H) => `
@font-face{font-family:'Inter Tight';src:url(${FONT_D}) format('woff2');font-weight:100 900;font-display:block}
@font-face{font-family:'Inter';src:url(${FONT_B}) format('woff2');font-weight:100 900;font-display:block}
@page{size:9.375in ${(H / 96).toFixed(4)}in;margin:0}
*{margin:0;padding:0;box-sizing:border-box}
html,body{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{width:900px;font-family:'Inter',system-ui,sans-serif;background:#0b1220;color:#f8fafc;font-size:13px;line-height:1.55}
.page{width:900px;height:${H}px;overflow:hidden;position:relative;background:#0b1220}
h1,h2,h3{font-family:'Inter Tight','Inter',sans-serif;letter-spacing:-.035em;font-weight:700}
.hero{background:#111827;padding:38px 48px 34px;position:relative;overflow:hidden}
.hero::after{content:'';position:absolute;inset:0 0 auto 0;height:4px;background:var(--hue)}
.brandrow{display:flex;align-items:center;justify-content:space-between;margin-bottom:30px}
.brand{display:flex;align-items:center;gap:11px}
.brand img{width:28px;height:28px;border-radius:7px}
.brand span{font-family:'Inter Tight';font-size:17px;font-weight:600;letter-spacing:-.035em}
.count{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#7c8ba1;font-weight:700}
.pillcat{display:inline-block;font-size:10px;letter-spacing:.15em;text-transform:uppercase;font-weight:800;
  color:var(--hue);border:1px solid color-mix(in srgb,var(--hue) 40%,transparent);padding:5px 11px;border-radius:999px;margin-bottom:16px}
.hero h1{font-size:40px;line-height:1.02;margin-bottom:8px}
.hero .who{font-size:14px;color:#cbd5e1}
.metarow{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#1f2937;border-radius:12px;overflow:hidden;margin-top:22px}
.metarow div{background:#111827;padding:11px 14px}
.metarow dt{font-size:9px;letter-spacing:.13em;text-transform:uppercase;color:#7c8ba1;font-weight:700;margin-bottom:3px}
.metarow dd{font-size:13px;color:#f8fafc;font-weight:500}
.band{padding:26px 48px}
.band.alt{background:#111827;border-radius:28px}
.head{display:flex;align-items:center;gap:12px;margin-bottom:14px}
.pill{font-family:'Inter Tight';font-size:11px;font-weight:800;color:#fff;background:var(--hue);padding:4px 10px;border-radius:999px}
.head h2{font-size:23px}
.head .sub{margin-left:auto;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:#7c8ba1;font-weight:700}
.intent{font-size:13.5px;color:#cbd5e1;line-height:1.6;margin-bottom:4px}
.smart{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.sm{border:1px solid #1f2937;border-radius:14px;padding:16px;background:#0b1220}
.sm .k{font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;font-weight:800;color:var(--hue);margin-bottom:8px}
.sm h3{font-size:15px;line-height:1.3;margin-bottom:9px}
.sm p{font-size:12px;color:#94a3b8;line-height:1.5;margin-bottom:5px}
.sm p b{color:#cbd5e1;font-weight:600}
.kw{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.kwbox{border:1px solid #1f2937;border-radius:13px;padding:14px 16px;background:#0b1220}
.kwbox .k{font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:#7c8ba1;font-weight:700;margin-bottom:9px}
.kwbox ul{list-style:none}
.kwbox li{font-family:ui-monospace,Menlo,monospace;font-size:11.5px;color:#cbd5e1;padding:2.5px 0}
.neg{border:1px solid rgba(255,45,85,.3);background:rgba(255,45,85,.06);border-radius:13px;padding:14px 16px}
.neg .k{font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:#ff375f;font-weight:800;margin-bottom:8px}
.neg code{font-family:ui-monospace,Menlo,monospace;font-size:11.5px;color:#f8fafc;line-height:1.7}
.neg p{font-size:12px;color:#cbd5e1;margin-top:9px;line-height:1.5}
.hl{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.hl span{font-size:11.5px;background:#0b1220;border:1px solid #1f2937;border-radius:8px;padding:6px 9px;color:#f8fafc}
.hl span i{font-style:normal;color:#7c8ba1;font-size:9.5px;float:right}
.desc{display:grid;gap:6px;margin-top:12px}
.desc span{font-size:12px;background:#0b1220;border:1px solid #1f2937;border-radius:8px;padding:8px 11px;color:#cbd5e1}
.desc span i{font-style:normal;color:#7c8ba1;font-size:9.5px;float:right;margin-left:8px}
.never{margin-top:12px;border-left:3px solid #ff375f;background:rgba(255,45,85,.07);border-radius:0 10px 10px 0;padding:11px 15px}
.never .k{font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:#ff375f;font-weight:800;margin-bottom:4px}
.never code{font-family:ui-monospace,Menlo,monospace;font-size:12px;color:#f8fafc}
.watch{display:flex;gap:12px;align-items:flex-start;background:rgba(48,209,88,.07);border:1px solid rgba(48,209,88,.25);border-radius:13px;padding:13px 16px}
.watch .k{font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:#30d158;font-weight:800;white-space:nowrap;padding-top:2px}
.watch p{font-size:12.5px;color:#cbd5e1;line-height:1.5}
footer{position:absolute;bottom:0;left:0;right:0;height:66px;background:#111827;display:flex;align-items:center;justify-content:space-between;padding:0 48px}
footer .l{display:flex;align-items:center;gap:10px}
footer img{width:22px;height:22px;border-radius:6px}
footer .w{font-family:'Inter Tight';font-size:14px;font-weight:600}
footer .c{font-size:9.5px;color:#7c8ba1;text-align:right;line-height:1.5}
`

function render(c, H) {
  const li = (a) => a.map((x) => `<li>${esc(x)}</li>`).join('')
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(c.campaign)}</title><style>${css(H)}</style></head>
<body><div class="page" style="--hue:${c.hue}">
  <header class="hero">
    <div class="brandrow">
      <div class="brand"><img src="${ICON}" alt=""><span>ImprovTalk</span></div>
      <div class="count">SEM campaign ${c.n} / 05</div>
    </div>
    <div class="pillcat">${esc(c.archetype)}</div>
    <h1>${esc(c.campaign)}</h1>
    <div class="who">${esc(c.person)} &nbsp;·&nbsp; ad group <b>${esc(c.adGroup)}</b></div>
    <dl class="metarow">
      <div><dt>Landing page</dt><dd>${esc(c.landing)}</dd></div>
      <div><dt>Budget share</dt><dd>${esc(c.budget)}</dd></div>
      <div><dt>Bidding</dt><dd>Manual CPC to start</dd></div>
    </dl>
  </header>

  <section class="band">
    <div class="head"><span class="pill">01</span><h2>SMART goals</h2><span class="sub">Month 1 buys the baseline</span></div>
    <p class="intent">${esc(c.intent)}</p>
    <div class="smart" style="margin-top:14px">
      <div class="sm"><div class="k">Days 0–30 · learning</div>
        <h3>${esc(c.smart1.goal)}</h3>
        <p><b>Measure:</b> ${esc(c.smart1.measure)}</p>
        <p><b>Why:</b> ${esc(c.smart1.why)}</p>
        <p><b>By:</b> day 30 from launch.</p></div>
      <div class="sm"><div class="k">Days 31–90 · performance</div>
        <h3>${esc(c.smart2.goal)}</h3>
        <p><b>Measure:</b> ${esc(c.smart2.measure)}</p>
        <p><b>Why:</b> ${esc(c.smart2.why)}</p>
        <p><b>By:</b> day 90 from launch.</p></div>
    </div>
  </section>

  <section class="band alt">
    <div class="head"><span class="pill">02</span><h2>Keywords</h2><span class="sub">Phrase first, exact once proven</span></div>
    <div class="kw">
      <div class="kwbox"><div class="k">Phrase match — start here</div><ul>${li(c.phrase)}</ul></div>
      <div class="kwbox"><div class="k">Exact match — add later</div><ul>${li(c.exact)}</ul></div>
    </div>
  </section>

  <section class="band">
    <div class="head"><span class="pill">03</span><h2>Negatives</h2><span class="sub">Campaign level</span></div>
    <div class="neg"><div class="k">Add before launch</div>
      <code>${esc(c.negatives)}</code>
      <p>${esc(c.negWhy)}</p></div>
  </section>

  <section class="band alt">
    <div class="head"><span class="pill">04</span><h2>Responsive search ad</h2><span class="sub">15 headlines · 4 descriptions</span></div>
    <div class="hl">${c.headlines.map((h) => `<span>${esc(h)}<i>${h.length}</i></span>`).join('')}</div>
    <div class="desc">${c.descriptions.map((d) => `<span>${esc(d)}<i>${d.length}</i></span>`).join('')}</div>
    <div class="never"><div class="k">Never appears in this campaign</div><code>${esc(c.never)}</code></div>
  </section>

  <section class="band">
    <div class="head"><span class="pill">05</span><h2>What to watch</h2><span class="sub">Beyond the click</span></div>
    <div class="watch"><div class="k">Retention</div><p>${esc(c.loyalty)}</p></div>
  </section>

  <footer>
    <div class="l"><img src="${ICON}" alt=""><span class="w">ImprovTalk</span></div>
    <div class="c">SEM campaign ${c.n} of 05 &nbsp;·&nbsp; conversion <code>testflight_click</code><br>
      Targets are hypotheses until the search terms report says otherwise.</div>
  </footer>
</div></body></html>`
}

let H = {}
try { H = JSON.parse(readFileSync(OUT + 'heights.json', 'utf8')) } catch {}
CAMPAIGNS.forEach((c) => {
  writeFileSync(`${OUT}${c.n}-${c.slug}.html`, render(c, H[c.slug] || 4000))
  console.log('wrote', `${c.n}-${c.slug}.html`)
})

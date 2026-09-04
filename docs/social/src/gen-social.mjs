import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { SETS } from './social.mjs'

const ROOT = new URL('../../../', import.meta.url).pathname
const OUT = `${ROOT}docs/social/src/html/`
mkdirSync(OUT, { recursive: true })

const b64 = (p) => readFileSync(ROOT + p).toString('base64')
const FD = `data:font/woff2;base64,${b64('public/fonts/InterTight-latin-var.woff2')}`
const FB = `data:font/woff2;base64,${b64('public/fonts/Inter-latin-var.woff2')}`
const ICON = `data:image/png;base64,${b64('public/icon.png')}`
const esc = (s) => String(s).replace(/&(?![a-z]+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const css = (H) => `
@font-face{font-family:'Inter Tight';src:url(${FD}) format('woff2');font-weight:100 900;font-display:block}
@font-face{font-family:'Inter';src:url(${FB}) format('woff2');font-weight:100 900;font-display:block}
@page{size:9.375in ${(H / 96).toFixed(4)}in;margin:0}
*{margin:0;padding:0;box-sizing:border-box}
html,body{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{width:900px;font-family:'Inter',system-ui,sans-serif;background:#0b1220;color:#f8fafc;font-size:13px;line-height:1.55}
.page{width:900px;height:${H}px;overflow:hidden;position:relative;background:#0b1220}
h1,h2,h3{font-family:'Inter Tight','Inter',sans-serif;letter-spacing:-.035em;font-weight:700}
.hero{background:#111827;padding:36px 48px 30px;position:relative}
.hero::after{content:'';position:absolute;inset:0 0 auto 0;height:4px;background:var(--hue)}
.brandrow{display:flex;align-items:center;justify-content:space-between;margin-bottom:26px}
.brand{display:flex;align-items:center;gap:11px}
.brand img{width:28px;height:28px;border-radius:7px}
.brand span{font-family:'Inter Tight';font-size:17px;font-weight:600;letter-spacing:-.035em}
.count{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#7c8ba1;font-weight:700}
.cat{display:inline-block;font-size:10px;letter-spacing:.15em;text-transform:uppercase;font-weight:800;color:var(--hue);
  border:1px solid color-mix(in srgb,var(--hue) 40%,transparent);padding:5px 11px;border-radius:999px;margin-bottom:14px}
.hero h1{font-size:36px;line-height:1.03;margin-bottom:6px}
.hero .who{font-size:13.5px;color:#cbd5e1}
.meta{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#1f2937;border-radius:12px;overflow:hidden;margin-top:20px}
.meta div{background:#111827;padding:11px 14px}
.meta dt{font-size:9px;letter-spacing:.13em;text-transform:uppercase;color:#7c8ba1;font-weight:700;margin-bottom:3px}
.meta dd{font-size:12.5px;color:#f8fafc;line-height:1.4}
.band{padding:22px 48px}
.sc{border:1px solid #1f2937;border-radius:16px;background:#111827;overflow:hidden;margin-bottom:16px}
.schead{display:flex;align-items:center;gap:12px;padding:15px 20px;border-bottom:1px solid #1f2937}
.schead .id{font-family:'Inter Tight';font-size:12px;font-weight:800;color:#fff;background:var(--hue);padding:4px 10px;border-radius:999px}
.schead .st{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#7c8ba1;font-weight:700}
.schead .dur{margin-left:auto;font-size:11px;color:#7c8ba1;font-family:ui-monospace,Menlo,monospace}
.scbody{padding:18px 20px}
.hook{font-family:'Inter Tight';font-size:19px;font-weight:600;line-height:1.28;letter-spacing:-.025em;color:#f8fafc;
  border-left:3px solid var(--hue);padding-left:14px;margin-bottom:16px}
.lab{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:#7c8ba1;font-weight:700;margin-bottom:6px}
.prompt{background:#0b1220;border:1px solid #334155;border-radius:11px;padding:13px 15px;margin-bottom:14px}
.prompt p{font-size:11.5px;line-height:1.6;color:#cbd5e1;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.two{display:grid;grid-template-columns:1.15fr 1fr;gap:14px}
.tl{display:grid;gap:5px}
.tl div{display:flex;gap:11px;align-items:baseline;background:#0b1220;border:1px solid #1f2937;border-radius:9px;padding:7px 11px}
.tl b{font-family:ui-monospace,Menlo,monospace;font-size:10.5px;color:var(--hue);font-weight:700;white-space:nowrap}
.tl span{font-size:12px;color:#f8fafc}
.side p{font-size:11.5px;color:#94a3b8;line-height:1.5;margin-bottom:9px}
.side p b{color:#cbd5e1;font-weight:600}
.why{margin-top:13px;background:rgba(10,132,255,.07);border:1px solid rgba(10,132,255,.25);border-radius:10px;padding:11px 14px}
.why .k{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:#0a84ff;font-weight:800;margin-bottom:4px}
.why p{font-size:12px;color:#cbd5e1;line-height:1.5}
.utm{margin-top:11px;font-family:ui-monospace,Menlo,monospace;font-size:10.5px;color:#7c8ba1;word-break:break-all;line-height:1.5}
.utm b{color:#cbd5e1;font-weight:600}
.never{margin:0 48px 20px;border-left:3px solid #ff375f;background:rgba(255,45,85,.07);border-radius:0 12px 12px 0;padding:13px 16px}
.never .k{font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:#ff375f;font-weight:800;margin-bottom:5px}
.never code{font-family:ui-monospace,Menlo,monospace;font-size:12px;color:#f8fafc}
footer{position:absolute;bottom:0;left:0;right:0;height:64px;background:#111827;display:flex;align-items:center;justify-content:space-between;padding:0 48px}
footer .l{display:flex;align-items:center;gap:10px}
footer img{width:22px;height:22px;border-radius:6px}
footer .w{font-family:'Inter Tight';font-size:14px;font-weight:600}
footer .c{font-size:9.5px;color:#7c8ba1;text-align:right;line-height:1.5}
`

const script = (s, sc) => `
  <div class="sc">
    <div class="schead"><span class="id">${esc(sc.id)}</span>
      <span class="st">${esc(sc.structure)} hook</span>
      <span class="dur">${esc(sc.dur)} · 9:16</span></div>
    <div class="scbody">
      <div class="hook">${esc(sc.hook)}</div>
      <div class="lab">Seedance prompt — paste as written</div>
      <div class="prompt"><p>${esc(sc.prompt)}</p></div>
      <div class="two">
        <div>
          <div class="lab">On-screen text</div>
          <div class="tl">${sc.onScreen.map(([t, x]) => `<div><b>${esc(t)}</b><span>${esc(x)}</span></div>`).join('')}</div>
        </div>
        <div class="side">
          <div class="lab">Audio</div>
          <p>${esc(sc.vo)}</p>
          <div class="lab">End card</div>
          <p><b>${esc(sc.end)}</b></p>
        </div>
      </div>
      <div class="why"><div class="k">Why this lands for ${esc(s.person.split(',')[0])}</div><p>${esc(sc.why)}</p></div>
      <div class="utm"><b>Link:</b> ${esc(s.landing)}?utm_source=tiktok&amp;utm_medium=social&amp;utm_campaign=awareness&amp;utm_content=${esc(sc.utm)}</div>
    </div>
  </div>`

function render(s, H) {
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(s.person)} — scripts</title><style>${css(H)}</style></head>
<body><div class="page" style="--hue:${s.hue}">
  <header class="hero">
    <div class="brandrow"><div class="brand"><img src="${ICON}" alt=""><span>ImprovTalk</span></div>
      <div class="count">Video scripts ${s.n} / 05</div></div>
    <div class="cat">${esc(s.archetype)}</div>
    <h1>${esc(s.person)}</h1>
    <div class="who">Three scripts &nbsp;·&nbsp; ${esc(s.landing)}</div>
    <dl class="meta">
      <div><dt>Where to post</dt><dd>${esc(s.platform)}</dd></div>
      <div><dt>When</dt><dd>${esc(s.bestTime)}</dd></div>
    </dl>
  </header>
  <section class="band">${s.scripts.map((sc) => script(s, sc)).join('')}</section>
  <div class="never"><div class="k">Never appears in any of these</div><code>${esc(s.never.join(' · '))}</code></div>
  <footer><div class="l"><img src="${ICON}" alt=""><span class="w">ImprovTalk</span></div>
    <div class="c">Video scripts ${s.n} of 05 &nbsp;·&nbsp; hook rate at 3s is the week-one metric<br>
      Every script carries its own utm_content, so performance is per video not per platform.</div></footer>
</div></body></html>`
}

let H = {}
try { H = JSON.parse(readFileSync(OUT + 'heights.json', 'utf8')) } catch {}
SETS.forEach((s) => {
  writeFileSync(`${OUT}${s.n}-${s.slug}.html`, render(s, H[s.slug] || 5200))
  console.log('wrote', `${s.n}-${s.slug}.html`)
})

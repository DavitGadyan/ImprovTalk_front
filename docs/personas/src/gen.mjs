import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { PERSONAS } from './personas.mjs'
import { GTM } from './gtm.mjs'

const A = '/private/tmp/claude-501/-Users-dyada-Desktop-Github-ImprovTalk-front/fb3882e0-3b37-4385-93f8-6deb3d9e125e/scratchpad/assets/'
const OUT = '/private/tmp/claude-501/-Users-dyada-Desktop-Github-ImprovTalk-front/fb3882e0-3b37-4385-93f8-6deb3d9e125e/scratchpad/html/'
mkdirSync(OUT, { recursive: true })

const b64 = (f) => readFileSync(A + f).toString('base64')
const font = (f) => `data:font/woff2;base64,${b64(f)}`
const img = (f) => `data:image/jpeg;base64,${b64(f)}`
const png = (f) => `data:image/png;base64,${b64(f)}`

const TIGHT = font('InterTight-latin-var.woff2')
const BODY = font('Inter-latin-var.woff2')
const ICON = png('icon.png')
const GRAD = 'linear-gradient(100deg, #ff9500 0%, #ff2d55 36%, #af52de 68%, #5856d6 100%)'

const css = (H1, H2) => `
@font-face{font-family:'Inter Tight';src:url(${TIGHT}) format('woff2');font-weight:100 900;font-display:block}
@font-face{font-family:'Inter';src:url(${BODY}) format('woff2');font-weight:100 900;font-display:block}
@page pone{size:9.375in ${(H1/96).toFixed(4)}in;margin:0}
@page ptwo{size:9.375in ${(H2/96).toFixed(4)}in;margin:0}
*{margin:0;padding:0;box-sizing:border-box}
html,body{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{width:900px;font-family:'Inter',system-ui,sans-serif;background:#0b1220;color:#f8fafc;
  font-size:13px;line-height:1.55;-webkit-font-smoothing:antialiased}
.page{width:900px;overflow:hidden;position:relative;background:#0b1220}
.page.pg1{height:${H1}px;page:pone}
.page.pg2{height:${H2}px;page:ptwo}
h1,h2,h3,.d{font-family:'Inter Tight','Inter',sans-serif;letter-spacing:-0.035em;font-weight:700}

/* ---------- hero ---------- */
.hero{position:relative;height:640px;overflow:hidden;background:#111827;
  border-bottom-left-radius:0;border-bottom-right-radius:0}
.hero .photo{position:absolute;inset:0 0 0 46%;overflow:hidden}
.hero .photo img{width:100%;height:100%;object-fit:cover;object-position:center 26%;
  filter:grayscale(1) contrast(1.04)}
.hero .photo .tint{position:absolute;inset:0;background:${GRAD};mix-blend-mode:color;opacity:.42}
.hero .photo .shade{position:absolute;inset:0;
  background:linear-gradient(90deg,#0b1220 0%,rgba(11,18,32,.94) 26%,rgba(11,18,32,.30) 62%,rgba(11,18,32,.55) 100%)}
.hero .topfade{position:absolute;top:0;left:0;right:0;height:132px;z-index:1;background:linear-gradient(180deg,rgba(11,18,32,.88),rgba(11,18,32,0))}
.hero .inner{position:relative;z-index:2;padding:44px 48px}
.brandrow{display:flex;align-items:center;justify-content:space-between;margin-bottom:52px}
.brand{display:flex;align-items:center;gap:11px}
.brand img{width:30px;height:30px;border-radius:7px}
.brand span{font-family:'Inter Tight';font-size:18px;font-weight:600;letter-spacing:-.035em}
.count{font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:#94a3b8;font-weight:600}
.eyebrow{display:inline-block;font-size:10.5px;letter-spacing:.17em;text-transform:uppercase;
  font-weight:700;color:#0b1220;background:#f8fafc;padding:6px 12px;border-radius:999px;margin-bottom:20px}
.hero h1{font-size:62px;line-height:.95;max-width:8.6em;margin-bottom:6px}
.hero .who{font-family:'Inter Tight';font-size:19px;font-weight:600;color:#cbd5e1;letter-spacing:-.02em;margin-bottom:14px}
.hero .tag{font-size:14.5px;color:#cbd5e1;max-width:20em;line-height:1.5}
.rule{width:96px;height:5px;border-radius:3px;background:${GRAD};margin:22px 0}
.quote{position:absolute;left:48px;right:48px;bottom:40px;z-index:2}
.quote p{font-family:'Inter Tight';font-size:23px;line-height:1.28;letter-spacing:-.028em;
  font-weight:500;color:#f8fafc;max-width:17.5em;text-wrap:balance}
.quote .mk{font-size:44px;line-height:0;color:#ff2d55;font-family:'Inter Tight';font-weight:800;
  display:block;height:20px}

/* ---------- bands ---------- */
.band{padding:34px 48px}
.band.alt{background:#111827;border-radius:34px}
.band.alt.lip{border-top-left-radius:34px;border-top-right-radius:34px}
.band.lipb{border-bottom-left-radius:34px;border-bottom-right-radius:34px}
.head{display:flex;align-items:center;gap:13px;margin-bottom:20px}
.pill{font-family:'Inter Tight';font-size:11.5px;font-weight:800;letter-spacing:.04em;color:#fff;
  background:#5856d6;padding:5px 11px;border-radius:999px}
.head h2{font-size:29px;line-height:1.05}
.head .sub{margin-left:auto;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;
  color:#7c8ba1;font-weight:600}

.two{display:grid;grid-template-columns:1fr 1fr;gap:26px}
.facts{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#1f2937;border-radius:14px;overflow:hidden}
.facts div{background:#0b1220;padding:11px 13px}
.band.alt .facts div{background:#111827}
.facts dt{font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:#7c8ba1;font-weight:700;margin-bottom:3px}
.facts dd{font-size:12.5px;color:#f8fafc;font-weight:500;line-height:1.35}
.belief{font-size:14px;line-height:1.62;color:#cbd5e1}
.belief em{color:#f8fafc;font-style:normal;font-weight:600}
.turnline{margin-top:14px;padding:13px 16px;border-left:3px solid #ff9500;background:rgba(255,149,10,.07);
  border-radius:0 10px 10px 0;font-size:13px;color:#f8fafc;line-height:1.5}
.turnline em{font-style:normal;font-weight:700}

.pts{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.pt{background:#0b1220;border:1px solid #1f2937;border-radius:16px;padding:17px 16px}
.band.alt .pt{background:#0b1220}
.pt .n{font-family:'Inter Tight';font-size:11px;font-weight:800;color:#ff2d55;margin-bottom:9px;letter-spacing:.06em}
.pt.g .n{color:#30d158}
.succ{margin-top:14px;display:flex;gap:12px;align-items:flex-start;background:rgba(10,132,255,.08);
  border:1px solid rgba(10,132,255,.28);border-radius:13px;padding:13px 16px}
.succ .k{font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:#0a84ff;font-weight:800;white-space:nowrap;padding-top:2px}
.succ p{font-size:12.5px;color:#f8fafc;line-height:1.5}
.pt h3{font-size:15.5px;line-height:1.2;margin-bottom:6px}
.pt p{font-size:12.5px;color:#94a3b8;line-height:1.5}

.obj{margin-top:16px;border-radius:14px;overflow:hidden;border:1px solid #1f2937}
.obj .r{display:grid;grid-template-columns:0.9fr 1.1fr;border-bottom:1px solid #1f2937}
.obj .r:last-child{border-bottom:0}
.obj .r > div{padding:11px 15px}
.obj .q{background:rgba(255,45,85,.06);font-size:12.5px;color:#f8fafc;font-weight:600;line-height:1.45}
.obj .a{font-size:12.5px;color:#cbd5e1;line-height:1.45}
.obj .hdr{background:#1f2937;font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;
  color:#94a3b8;font-weight:700;padding:8px 15px}

/* ---------- scene ---------- */
.scene{position:relative;height:348px;overflow:hidden}
.scene > img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  filter:grayscale(.45) contrast(1.05) brightness(.84)}
.scene .tint{position:absolute;inset:0;background:${GRAD};mix-blend-mode:color;opacity:.24}
.scene .shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,18,32,.88),rgba(11,18,32,.46) 45%,rgba(11,18,32,.93))}
.scene .inner{position:relative;z-index:2;padding:32px 48px}
.usewhen{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px}
.usewhen div{background:rgba(11,18,32,.66);border:1px solid rgba(148,163,184,.22);border-radius:13px;padding:12px 14px}
.usewhen dt{font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:#94a3b8;font-weight:700;margin-bottom:4px}
.usewhen dd{font-size:12.5px;color:#f8fafc;line-height:1.4;font-weight:500}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.steps div{border-top:2px solid rgba(248,250,252,.55);padding-top:10px}
.steps .s{font-family:'Inter Tight';font-size:10.5px;font-weight:800;color:#f8fafc;opacity:.6;letter-spacing:.08em}
.steps h3{font-size:14px;margin:3px 0 4px}
.steps p{font-size:12px;color:#cbd5e1;line-height:1.45}

/* ---------- phone ---------- */
.pagerow{display:grid;grid-template-columns:168px 1fr;gap:30px;align-items:start}
.phone{width:168px;aspect-ratio:9/19.5;background:#000;border-radius:34px;padding:3.3%;
  box-shadow:0 20px 50px rgba(0,0,0,.55);transform:rotate(-1.6deg)}
.screen{width:100%;height:100%;background:#0b1220;border-radius:28px;overflow:hidden;position:relative;
  padding:22px 12px 0;display:flex;flex-direction:column}
.island{position:absolute;top:8px;left:50%;transform:translateX(-50%);width:31%;height:14px;
  background:#000;border-radius:999px}
.screen .eb{font-size:7.5px;letter-spacing:.15em;text-transform:uppercase;color:#94a3b8;font-weight:700;margin-bottom:7px}
.screen h3{font-family:'Inter Tight';font-size:19px;line-height:.98;letter-spacing:-.04em;margin-bottom:7px}
.screen h3 span{background:${GRAD};-webkit-background-clip:text;background-clip:text;color:transparent}
.screen .sr{width:44px;height:3px;border-radius:2px;background:${GRAD};margin-bottom:9px}
.screen p{font-size:8px;color:#94a3b8;line-height:1.45}
.screen .cta{margin-top:auto;margin-bottom:14px;background:${GRAD};border-radius:999px;
  text-align:center;padding:8px;font-size:9.5px;font-weight:700;color:#fff}
.urlbox{background:#0b1220;border:1px solid #334155;border-radius:12px;padding:11px 14px;margin-bottom:13px}
.band.alt .urlbox{background:#0b1220}
.urlbox .l{font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:#7c8ba1;font-weight:700;margin-bottom:4px}
.urlbox .u{font-family:'Inter Tight';font-size:16px;font-weight:700;color:#f8fafc;letter-spacing:-.02em}
.role{display:inline-block;font-size:10.5px;font-weight:600;color:#b8ddff;background:rgba(10,132,255,.13);
  border:1px solid rgba(10,132,255,.32);padding:4px 10px;border-radius:999px;margin-bottom:13px}
.ord{display:grid;gap:5px;margin-bottom:12px}
.ord span{font-size:12px;background:#111827;border:1px solid #1f2937;border-radius:9px;padding:7px 12px;color:#cbd5e1;display:flex;gap:10px;align-items:center}
.ord span b{color:#5856d6;font-weight:800;font-family:'Inter Tight'}
.why{font-size:12.5px;color:#94a3b8;line-height:1.5}

/* ---------- channels ---------- */
.chs{display:grid;grid-template-columns:repeat(3,1fr);gap:13px;margin-bottom:15px}
.ch{border-radius:14px;border:1px solid #1f2937;padding:14px 15px;background:#0b1220}
.ch h3{font-size:14px;margin-bottom:5px}
.ch p{font-size:11.5px;color:#94a3b8;line-height:1.45}
.metric{display:flex;gap:12px;align-items:flex-start;background:rgba(48,209,88,.07);
  border:1px solid rgba(48,209,88,.25);border-radius:13px;padding:13px 16px}
.metric .k{font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:#30d158;font-weight:800;white-space:nowrap;padding-top:2px}
.metric p{font-size:12.5px;color:#cbd5e1;line-height:1.5}

.warn{margin:0 48px 26px;display:flex;gap:13px;align-items:flex-start;
  background:rgba(255,45,85,.08);border:1px solid rgba(255,45,85,.3);border-radius:14px;padding:14px 17px}
.warn .k{font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:#ff375f;font-weight:800;white-space:nowrap;padding-top:2px}
.warn p{font-size:12.5px;color:#f8fafc;line-height:1.52}

/* ---------- page two ---------- */
.page + .page{page-break-before:always}
.p2head{position:relative;height:148px;background:#111827;display:flex;align-items:center;gap:20px;padding:0 48px}
.p2head .avw{position:relative;width:78px;height:78px;border-radius:19px;overflow:hidden;flex:none}
.p2head .avw img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.04)}
.p2head .avw .tint{position:absolute;inset:0;background:${GRAD};mix-blend-mode:color;opacity:.42}
.p2head h2{font-size:30px;line-height:1.02}
.p2head .s{font-size:12px;color:#94a3b8;margin-top:4px}
.p2head .tagx{margin-left:auto;text-align:right;font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:#7c8ba1;font-weight:700;line-height:1.7}
.pbs{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.pbs .c{border-radius:16px;padding:16px;border:1px solid #1f2937;background:#0b1220}
.pbs .c .k{font-family:'Inter Tight';font-size:11px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;margin-bottom:8px}
.pbs .c:nth-child(1) .k{color:#ff375f}.pbs .c:nth-child(2) .k{color:#ff9f0a}.pbs .c:nth-child(3) .k{color:#30d158}
.pbs .c p{font-size:12.5px;color:#cbd5e1;line-height:1.5}
.resp{font-size:13.5px;color:#cbd5e1;line-height:1.6;margin-bottom:14px}
.hooks{display:grid;gap:8px;margin-bottom:14px}
.hooks div{display:flex;gap:12px;align-items:baseline;background:#0b1220;border:1px solid #1f2937;border-radius:11px;padding:10px 15px}
.hooks b{font-family:'Inter Tight';color:#5856d6;font-weight:800;font-size:11px}
.hooks span{font-family:'Inter Tight';font-size:15.5px;font-weight:600;letter-spacing:-.022em;color:#f8fafc}
.says{display:grid;grid-template-columns:1fr 1fr;gap:13px}
.says div{border-radius:13px;padding:13px 16px}
.says .y{background:rgba(48,209,88,.07);border:1px solid rgba(48,209,88,.26)}
.says .n{background:rgba(255,45,85,.07);border:1px solid rgba(255,45,85,.28)}
.says .k{font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;font-weight:800;margin-bottom:6px}
.says .y .k{color:#30d158}.says .n .k{color:#ff375f}
.says p{font-size:12px;color:#cbd5e1;line-height:1.5}
.fun{border:1px solid #1f2937;border-radius:14px;overflow:hidden}
.fun .r{display:grid;grid-template-columns:112px 176px 1fr 152px;border-bottom:1px solid #1f2937}
.fun .r:last-child{border-bottom:0}
.fun .r>div{padding:11px 14px;font-size:12px;color:#cbd5e1;line-height:1.45}
.fun .hdr>div{background:#1f2937;font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:#94a3b8;font-weight:700;padding:8px 14px}
.fun .st{font-family:'Inter Tight';font-weight:800;font-size:13.5px;color:#f8fafc}
.fun .fm{color:#94a3b8;font-size:11.5px}
.fun .mt{color:#30d158;font-size:11.5px;font-weight:600}
.vid{display:grid;grid-template-columns:1fr 264px;gap:18px}
.prompt{background:#0b1220;border:1px solid #334155;border-radius:14px;padding:15px 17px}
.prompt .k{font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:#7c8ba1;font-weight:700;margin-bottom:9px}
.prompt p{font-size:11.5px;color:#cbd5e1;line-height:1.65;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.vmeta{display:grid;gap:10px;align-content:start}
.vmeta div{background:#0b1220;border:1px solid #1f2937;border-radius:12px;padding:11px 14px}
.vmeta .k{font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:#7c8ba1;font-weight:700;margin-bottom:5px}
.vmeta p{font-size:12px;color:#f8fafc;line-height:1.45}

footer{position:absolute;bottom:0;left:0;right:0;height:74px;background:#111827;
  display:flex;align-items:center;justify-content:space-between;padding:0 48px}
footer .l{display:flex;align-items:center;gap:10px}
footer img{width:24px;height:24px;border-radius:6px}
footer .w{font-family:'Inter Tight';font-size:15px;font-weight:600;letter-spacing:-.03em}
footer .c{font-size:10px;color:#7c8ba1;line-height:1.4;text-align:right}
footer .u{font-family:'Inter Tight';font-size:14px;font-weight:600;color:#cbd5e1}
`

const GOALS = {
  shy: { items: [
    ["Get through a work lunch without going quiet", "Not to be charming. Just to still be in it at the end."],
    ["Have the words arrive on time, once", "The right line while it still matters, not an hour later."],
    ["Stop replaying it at 1am", "The conversation costs him twenty minutes. The night costs him hours."],
  ], success: "Three months in, he speaks first at a standup and does not think about it afterwards." },
  language: { items: [
    ["Say the whole thought, not the safe version", "To sound out loud as capable as he already is on paper."],
    ["Stop translating in his head", "Answer at the speed the conversation is actually moving."],
    ["Belong at the lunch table", "The work English is fine. It is the small talk that leaves him out."],
  ], success: "He tells a story in English at lunch and nobody slows down to wait for him." },
  social: { items: [
    ["Open without ten minutes of rehearsal", "Say something while the moment is still there."],
    ["Read it when it is not landing", "Notice early, change course, leave gracefully. That is the skill."],
    ["Stop losing the evening to one flat line", "A bad opener should cost thirty seconds, not the whole night."],
  ], success: "He starts a conversation with a stranger and cannot remember afterwards that it was hard." },
  speaking: { items: [
    ["Be listened to in the room he is already in", "He has the seat at the table. He wants the attention that should come with it."],
    ["Get a number instead of a feeling", "Something he can actually work on, rather than somebody being polite."],
    ["Walk into the hard conversation ready", "Difficult feedback, a disagreement, the explanation that never lands."],
  ], success: "He finishes a presentation and the first question is about the content, not a request to repeat it." },
  rusty: { items: [
    ["Get it back, not learn it again", "She had this. She wants the muscle back, not a beginners course."],
    ["Start saying yes to things again", "Be the one who leaves the work drinks last, the way she used to."],
    ["See that it is actually moving", "Proof it is coming back, so she keeps going past week two."],
  ], success: "Week six against week one is a number she can look at, and it is going up." },
}

const esc = (s) => String(s).replace(/&(?![a-z]+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const keep = (s) => String(s) // already-safe strings containing <em>

function render(p, H) {
  const she = p.pronouns.startsWith('she') ? 'she' : 'he'
  const her = p.pronouns.startsWith('she') ? 'her' : 'his'
  const Cap = she[0].toUpperCase() + she.slice(1)
  const g = GOALS[p.slug]
  const m = GTM[p.slug]
  const obj = she === 'she' ? 'her' : 'him'
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(p.name)}</title><style>${css(H.p1, H.p2)}</style></head><body>
<div class="page pg1">

  <header class="hero">
    <div class="photo"><img src="${img('portrait-' + p.slug + '.jpg')}" alt=""><div class="tint"></div><div class="shade"></div></div>
    <div class="topfade"></div>
    <div class="inner">
      <div class="brandrow">
        <div class="brand"><img src="${ICON}" alt=""><span>ImprovTalk</span></div>
        <div class="count">Customer persona ${p.n} / 05</div>
      </div>
      <div class="eyebrow">${esc(p.archetype)}</div>
      <h1>${esc(p.name)}, ${p.age}</h1>
      <div class="who">${esc(p.pronouns)} &nbsp;·&nbsp; variant <b>${esc(p.slug)}</b></div>
      <div class="rule"></div>
      <p class="tag">${esc(p.tagline)}</p>
    </div>
    <div class="quote"><span class="mk">&ldquo;</span><p>${esc(p.quote)}</p></div>
  </header>

  <section class="band">
    <div class="head"><span class="pill">02</span><h2>Who ${she} is</h2><span class="sub">The archetype</span></div>
    <div class="two">
      <dl class="facts">${p.bio.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
      <div>
        <p class="belief">${keep(p.belief)}</p>
        <p class="turnline">${keep(p.turnLine)}</p>
      </div>
    </div>
  </section>

  <section class="band alt">
    <div class="head"><span class="pill">03</span><h2>What ${she} wants</h2><span class="sub">Goals</span></div>
    <div class="pts">${g.items.map(([t, b], k) => `<div class="pt g"><div class="n">GOAL 0${k + 1}</div><h3>${esc(t)}</h3><p>${esc(b)}</p></div>`).join('')}</div>
    <div class="succ"><div class="k">Success</div><p>${esc(g.success)}</p></div>
  </section>

  <section class="band">
    <div class="head"><span class="pill">04</span><h2>What hurts</h2><span class="sub">In ${her} words, from the page</span></div>
    <div class="pts">${p.hurts.map(([t, b], k) => `<div class="pt"><div class="n">0${k + 1}</div><h3>${esc(t)}</h3><p>${esc(b)}</p></div>`).join('')}</div>
  </section>

  <section class="band alt">
    <div class="head"><span class="pill">05</span><h2>What ${she} thinks before ${she} taps</h2><span class="sub">Objection &rarr; answer</span></div>
    <div class="obj">
      <div class="r"><div class="hdr">${Cap} thinks</div><div class="hdr">The page answers</div></div>
      ${p.objections.map(([q, a]) => `<div class="r"><div class="q">${esc(q)}</div><div class="a">${esc(a)}</div></div>`).join('')}
    </div>
  </section>

  <section class="scene">
    <img src="${img('scene-' + p.slug + '.jpg')}" alt=""><div class="tint"></div><div class="shade"></div>
    <div class="inner">
      <div class="head"><span class="pill">06</span><h2>How ${she} uses it</h2><span class="sub">The real moment</span></div>
      <dl class="usewhen">
        <div><dt>When</dt><dd>${esc(p.usage.when)}</dd></div>
        <div><dt>What ${she} picks</dt><dd>${esc(p.usage.what)}</dd></div>
        <div><dt>What ${she} watches</dt><dd>${esc(p.usage.watches)}</dd></div>
      </dl>
      <div class="steps">${p.steps.map(([t, b], k) => `<div><div class="s">STEP 0${k + 1}</div><h3>${esc(t)}</h3><p>${esc(b)}</p></div>`).join('')}</div>
    </div>
  </section>


  <footer>
    <div class="l"><img src="${ICON}" alt=""><span class="w">ImprovTalk</span></div>
    <div class="c">Persona ${p.n} of 05 &nbsp;·&nbsp; page 1 of 2 &nbsp;·&nbsp; the person<br>
      Illustrative stock photography (Unsplash Licence). Not a real customer.</div>
    <div class="u">${esc(p.url)}/</div>
  </footer>
</div>

<div class="page pg2">
  <div class="p2head">
    <div class="avw"><img src="${img('portrait-' + p.slug + '.jpg')}" alt=""><div class="tint"></div></div>
    <div>
      <h2>Reaching ${esc(p.name)}</h2>
      <div class="s">${esc(p.archetype)} &nbsp;·&nbsp; variant <b>${esc(p.slug)}</b> &nbsp;·&nbsp; ${esc(p.url)}/</div>
    </div>
    <div class="tagx">Awareness &rarr; Consideration<br>Conversion &rarr; Loyalty</div>
  </div>

  <section class="band">
    <div class="head"><span class="pill">07</span><h2>Pain, barrier, solution</h2><span class="sub">Why ${she} has not fixed it already</span></div>
    <div class="pbs">${m.pbs.map(([k, v]) => `<div class="c"><div class="k">${esc(k)}</div><p>${esc(v)}</p></div>`).join('')}</div>
  </section>

  <section class="band alt">
    <div class="head"><span class="pill">08</span><h2>The message that lands</h2><span class="sub">What ${she} responds to</span></div>
    <p class="resp">${esc(m.respondsTo)}</p>
    <div class="hooks">${m.hooks.map((h, k) => `<div><b>0${k + 1}</b><span>${esc(h)}</span></div>`).join('')}</div>
    <div class="says">
      <div class="y"><div class="k">Say it like this</div><p>${esc(m.sayLike)}</p></div>
      <div class="n"><div class="k">Never say</div><p>${esc(m.neverSay)}</p></div>
    </div>
  </section>

  <section class="band">
    <div class="head"><span class="pill">09</span><h2>Where to reach ${obj}</h2><span class="sub">Channels</span></div>
    <div class="chs">${p.channels.map(([t, b]) => `<div class="ch"><h3>${esc(t)}</h3><p>${esc(b)}</p></div>`).join('')}</div>
    <div class="metric"><div class="k">Best bet</div><p>${esc(m.best)}</p></div>
  </section>

  <section class="band alt">
    <div class="head"><span class="pill">10</span><h2>The funnel</h2><span class="sub">Awareness to loyalty</span></div>
    <div class="fun">
      <div class="r hdr"><div>Stage</div><div>Channel &amp; format</div><div>What it has to do</div><div>Measure</div></div>
      ${m.funnel.map(([st, fm, wh, mt]) => `<div class="r"><div class="st">${esc(st)}</div><div class="fm">${esc(fm)}</div><div>${esc(wh)}</div><div class="mt">${esc(mt)}</div></div>`).join('')}
    </div>
    <div class="metric" style="margin-top:14px"><div class="k">Read it as</div><p>${esc(p.metric)}</p></div>
  </section>

  <section class="band">
    <div class="head"><span class="pill">11</span><h2>The page ${she} gets</h2><span class="sub">Variant &amp; running order</span></div>
    <div class="pagerow">
      <div class="phone"><div class="screen"><div class="island"></div>
        <div class="eb">${esc(p.hero.eyebrow)}</div>
        <h3>${esc(p.hero.top)}<br><span>${esc(p.hero.em)}</span></h3>
        <div class="sr"></div>
        <p>${esc(p.hero.sub)}</p>
        <div class="cta">Get early access</div>
      </div></div>
      <div>
        <div class="urlbox"><div class="l">Full URL</div><div class="u">${esc(p.url)}/</div></div>
        <div class="role">${esc(p.role)}</div>
        <div class="ord">${p.order.map((s, k) => `<span><b>0${k + 1}</b>${esc(s)}</span>`).join('')}</div>
        <p class="why">${esc(p.orderWhy)}</p>
      </div>
    </div>
  </section>

  <section class="band alt">
    <div class="head"><span class="pill">12</span><h2>The video ad</h2><span class="sub">${esc(m.video.fmt)}</span></div>
    <div class="vid">
      <div class="prompt"><div class="k">Generation prompt &mdash; paste into Seedance / Veo</div><p>${esc(m.video.prompt)}</p></div>
      <div class="vmeta">
        <div><div class="k">Format</div><p>${esc(m.video.fmt)}</p></div>
        <div><div class="k">On-screen text</div><p>${esc(m.video.onscreen)}</p></div>
        <div><div class="k">End card</div><p>${esc(m.video.endcard)}</p></div>
      </div>
    </div>
  </section>

  <div class="warn"><div class="k">Do not</div><p>${esc(p.warning)}</p></div>

  <footer>
    <div class="l"><img src="${ICON}" alt=""><span class="w">ImprovTalk</span></div>
    <div class="c">Persona ${p.n} of 05 &nbsp;·&nbsp; page 2 of 2 &nbsp;·&nbsp; the plan<br>
      GA4 <code>variant=${esc(p.slug)}</code> &nbsp;·&nbsp; conversion <code>testflight_click</code></div>
    <div class="u">${esc(p.url)}/</div>
  </footer>
</div></body></html>`
}

let H = {}
try { H = JSON.parse(readFileSync(OUT + 'heights.json', 'utf8')) } catch {}
PERSONAS.forEach((p) => {
  writeFileSync(`${OUT}${p.n}-${p.slug}.html`, render(p, H[p.slug] || { p1: 6000, p2: 6000 }))
  console.log('wrote', `${p.n}-${p.slug}.html`)
})

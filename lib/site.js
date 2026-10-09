// Site behaviour in plain DOM (shared by the Next app and the static previews):
// header state, mobile menu, reveal on scroll, apply/login modal, insights filter.
export function startSite() {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const track = (event, data = {}) => { try { (window.dataLayer = window.dataLayer || []).push({ event, ...data }); } catch {} };

  /* header: dark over the home hero, light after it */
  const hdr = $('.hdr'), hero = $('.gate, .phero, .eh');
  const onScroll = () => {
    if (!hdr) return;
    const y = scrollY;
    hdr.classList.toggle('scrolled', y > 10);
    const hs = $('[data-hero]');
    if (hs) { hdr.classList.toggle('over', !hs.classList.contains('framed')); hdr.classList.toggle('inhero', !hs.classList.contains('framed')); }
    else if (hdr.classList.contains('dark')) hdr.classList.toggle('over', !hero || y < hero.offsetHeight - 80);
  };
  /* home hero: gold dust (components/HeroDust.jsx) */
  const hs = $('[data-hero]');
  if (hs) {
    const cv = $('.hd-cv', hs), cx = cv.getContext('2d'), copy = $('.hd-copy', hs);
    const cl = (v) => Math.max(0, Math.min(1, v)), ez = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2), seg = (p, a, b) => cl((p - a) / (b - a));
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, D = 1, pts = [], mx = -9999, my = -9999, fall = 0, running = true;
    // sample the word LEGENDS from an offscreen canvas; each lit pixel becomes a target for one particle
    const build = () => {
      D = Math.min(2, devicePixelRatio || 1); W = cv.clientWidth; H = cv.clientHeight; cv.width = W * D; cv.height = H * D;
      const o = document.createElement('canvas'), ox = o.getContext('2d'); o.width = W; o.height = H;
      // the word and the copy under it are centred together as one group
      // on phones the word spans the same width as the button (screen minus side padding)
      const mob = W < 640, fam = getComputedStyle(document.body).fontFamily;
      // on phones the word is exactly as wide as the button (screen minus 20px each side)
      let fs = Math.min(W * 0.17, 300);
      if (mob) { ox.font = '700 100px ' + fam; fs = 100 * (W - 40) / ox.measureText('LEGENDS').width; }
      const wordH = fs * 0.74, gap = Math.max(mob ? 30 : 28, fs * 0.28), head = 40;
      const cta = $('.hd-cta', hs), ways = $('.hd-ways', hs); if (cta) cta.style.marginTop = '';
      const total = wordH + gap + copy.offsetHeight;
      const top = mob ? head + Math.max(40, H * 0.18) : Math.max(head + 20, head + (H - head - total) / 2);
      copy.style.top = (top + wordH + gap) + 'px';
      // phones: push the button down so it sits ~50px above the three lines at the bottom
      // phones: button ~50px above the three lines; the title and lead sit centred between the word and the button
      if (mob && cta && ways) {
        const ctaTop0 = top + wordH + gap + cta.offsetTop, ctaTarget = H - ways.offsetHeight - parseFloat(getComputedStyle(ways).bottom) - 50 - cta.offsetHeight;
        const textH = cta.offsetTop - parseFloat(getComputedStyle(cta).marginTop), wordBottom = top + wordH;
        const textTop = Math.max(wordBottom + 24, wordBottom + (ctaTarget - wordBottom - textH) / 2);
        copy.style.top = textTop + 'px';
        cta.style.marginTop = Math.max(24, ctaTarget - textTop - textH) + 'px';
      }
      ox.font = '700 ' + fs + 'px ' + fam; ox.textAlign = 'center'; ox.textBaseline = 'middle'; ox.fillStyle = '#fff';
      ox.fillText('LEGENDS', W / 2, top + wordH / 2);
      const d = ox.getImageData(0, 0, W, H).data, st = W < 700 ? 3 : 4, t = [];
      for (let y = 0; y < H; y += st) for (let x = 0; x < W; x += st) if (d[(y * W + x) * 4 + 3] > 128) t.push([x, y]);
      const old = pts;
      pts = t.map((p, i) => { const q = old[i] || { x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0 }; q.tx = p[0]; q.ty = p[1]; q.s = Math.random() * 1.4 + 1.4; q.c = Math.random(); q.g = Math.random() * 0.6 + 0.4; return q; });
      if (reduce) pts.forEach((p) => { p.x = p.tx; p.y = p.ty; });
    };
    const loop = () => {
      if (running) {
        cx.setTransform(D, 0, 0, D, 0, 0); cx.clearRect(0, 0, W, H);
        for (const p of pts) {
          const dx = p.x - mx, dy = p.y - my, dd = dx * dx + dy * dy;
          if (dd < 9000) { const f = ((9000 - dd) / 9000) * 3, r = Math.sqrt(dd + 1); p.vx += (dx / r) * f; p.vy += (dy / r) * f; }
          p.vx += (p.tx - p.x) * 0.012; p.vy += (p.ty + fall * H * 1.2 * p.g - p.y) * 0.012; p.vx *= 0.88; p.vy *= 0.88; p.x += p.vx; p.y += p.vy;
          cx.fillStyle = p.c > 0.7 ? '#f3dca4' : p.c > 0.3 ? '#d4ad5a' : '#a97e28'; cx.fillRect(p.x, p.y, p.s, p.s);
        }
      }
      requestAnimationFrame(loop);
    };
    cv.addEventListener('mousemove', (e) => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
    cv.addEventListener('mouseleave', () => { mx = my = -9999; });
    const heroFrame = () => {
      // the next section overlaps the last screen of the hero (margin-top:-100vh), so progress runs over one screen
      const r = hs.getBoundingClientRect(), p = cl(-r.top / innerHeight);
      fall = reduce ? 0 : ez(seg(p, 0, 0.85));
      copy.style.setProperty('--up', (-p * 160).toFixed(1) + 'px');
      running = p < 1;
      hs.classList.toggle('framed', p > 0.92);
    };
    addEventListener('scroll', () => requestAnimationFrame(() => { heroFrame(); onScroll(); }), { passive: true });
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { build(); heroFrame(); }, 150); });
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { build(); heroFrame(); onScroll(); loop(); });
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* mobile menu */
  const bg = $('.burger'), mn = $('.mnav');
  const closeMenu = () => { mn?.classList.remove('open'); bg?.classList.remove('open'); document.body.classList.remove('menu-open'); };
  bg?.addEventListener('click', () => { const o = mn.classList.toggle('open'); bg.classList.toggle('open', o); bg.setAttribute('aria-expanded', o); document.body.classList.toggle('menu-open', o); });
  $$('.mnav a').forEach((a) => a.addEventListener('click', closeMenu));

  /* reveal */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
  $$('.rv').forEach((el) => io.observe(el));

  /* modal */
  const am = $('.am');
  const show = (pane) => { $$('[data-pane]', am).forEach((p) => { p.hidden = p.dataset.pane !== pane; }); };
  const open = (pane) => { if (!am) return; closeMenu(); show(pane); am.hidden = false; document.body.classList.add('modal-open'); setTimeout(() => $(`[data-pane="${pane}"] input`, am)?.focus(), 60); };
  const close = () => { if (!am) return; am.hidden = true; document.body.classList.remove('modal-open'); };
  document.addEventListener('click', (e) => {
    const o = e.target.closest('[data-open]'); if (o) { e.preventDefault(); open(o.dataset.open); return; }
    if (e.target.closest('[data-close]') || e.target === am) close();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  $('[data-form="apply"]')?.addEventListener('submit', (e) => {
    e.preventDefault(); // TODO: POST Object.fromEntries(new FormData(e.target)) to the CRM
    track('application_submitted', { source: 'legends.app', page: location.pathname });
    e.target.reset(); show('done');
  });
  $('[data-form="login"]')?.addEventListener('submit', (e) => { e.preventDefault(); $('.am-msg', am).hidden = false; });
  if (location.hash === '#apply') open('apply');

  /* word-by-word lit statement + drifting marquee */
  $$('[data-lit]').forEach((p) => { if (p.dataset.ready) return; p.dataset.ready = 1; p.innerHTML = p.textContent.trim().split(/\s+/).map((w) => (w === '/' ? '<br>' : '<span>' + w + '</span>')).join(' '); });
  const drift = $$('[data-drift]');
  // repeat the text so the line never runs out, and wrap the offset by one copy's width
  drift.forEach((el) => { const t = el.textContent.trim() + ' '; el.textContent = t.repeat(4); el.style.whiteSpace = 'nowrap'; el._seg = el.scrollWidth / 4; addEventListener('resize', () => { el._seg = el.scrollWidth / 4; }); });
  const frame = () => {
    const vh = innerHeight;
    $$('[data-lit]').forEach((p) => { const r = p.getBoundingClientRect(), ws = $$('span', p), k = Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (r.height + vh * 0.35))), n = Math.round(k * ws.length); ws.forEach((w, i) => w.classList.toggle('on', i < n)); });
    drift.forEach((el) => { const r = el.parentElement.getBoundingClientRect(), seg = el._seg || 1, d = ((-(r.top - vh) * 0.35) % seg + seg) % seg; el.style.transform = `translate3d(${(-d).toFixed(1)}px,0,0)`; });
  };
  addEventListener('scroll', () => requestAnimationFrame(frame), { passive: true }); frame();

  /* events tabs */
  $$('.tabs button').forEach((b) => b.addEventListener('click', () => {
    $$('.tabs button').forEach((x) => x.classList.toggle('on', x === b));
    $$('.ev-sec').forEach((s) => { s.hidden = b.dataset.t !== 'all' && s.dataset.track !== b.dataset.t; });
  }));
  if (location.hash === '#online' || location.hash === '#in-person') $(`.tabs [data-t="${location.hash === '#online' ? 'online' : 'offline'}"]`)?.click();

  /* days until a date */
  // page heroes: light parallax on [data-speed] and the dealing essay deck
  const px = $$('[data-speed]');
  if (px.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const para = () => px.forEach((el) => { const r = el.parentElement.getBoundingClientRect(); const d = ((r.top + r.height / 2 - innerHeight / 2) * parseFloat(el.dataset.speed)).toFixed(1); el.style.translate = el.dataset.axis === 'x' ? (-d) + 'px 0' : '0 ' + d + 'px'; });
    addEventListener('scroll', () => requestAnimationFrame(para), { passive: true }); para();
  }
  // blog hero: draw the sketch stroke by stroke, then write author, title and excerpt word by word, rest, fade, next
  $$('[data-write]').forEach((w) => {
    const list = JSON.parse(w.dataset.write), sk = $('.wr-sk', w), au = $('.wr-au', w), ti = $('.wr-ti', w), ex = $('.wr-ex', w);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const cache = {};
    const getSvg = async (u) => cache[u] || (cache[u] = await fetch(u).then((r) => r.text()).catch(() => ''));
    const draw = async (u, ms) => {
      sk.innerHTML = await getSvg(u);
      const ps = $$('path', sk); if (!ps.length) return;
      ps.forEach((p) => { const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = reduce ? 0 : L; });
      if (reduce) return;
      void sk.offsetWidth;
      const step = ms / ps.length;
      ps.forEach((p, k) => { p.style.transition = `stroke-dashoffset ${Math.max(500, step * 6)}ms ease-in-out ${k * step}ms`; p.style.strokeDashoffset = 0; });
      await wait(ms + step * 6);
    };
    const write = async (el, text, ms) => { el.innerHTML = text.split(' ').map((x) => `<span class="wr-w">${x}</span>`).join(' '); if (reduce) { $$('.wr-w', el).forEach((x) => x.classList.add('in')); return; } for (const x of $$('.wr-w', el)) { x.classList.add('in'); await wait(ms); } };
    let i = 0;
    (async function run() {
      for (;;) {
        const e = list[i]; w.href = e.url;
        w.classList.remove('out'); au.innerHTML = ''; ti.innerHTML = ''; ex.innerHTML = '';
        await wait(500);
        await write(au, e.au, 260);
        await wait(250);
        await write(ti, e.ti, 240);
        await wait(300);
        await write(ex, e.ex, 200);
        if (reduce || list.length < 2) return;
        await wait(3600);
        w.classList.add('turn');
        await wait(1100);
        w.classList.remove('turn'); w.classList.add('back');
        au.innerHTML = ''; ti.innerHTML = ''; ex.innerHTML = '';
        void w.offsetWidth; w.classList.remove('back');
        i = (i + 1) % list.length;
      }
    })();
  });
  // online hero: 5-second pieces where a speaker talks - speaker A, then B, then C, then A again from the next timecode
  $$('[data-reel]').forEach((reel) => {
    const list = JSON.parse(reel.dataset.clips || '[]'), [a, b] = $$('video', reel);
    if (!list.length) return;
    const seq = []; const n = Math.max(...list.map((c) => (c.t || [0]).length));
    for (let k = 0; k < n; k++) list.forEach((c) => { const t = c.t || [0]; seq.push({ v: c.v, t: t[k % t.length] }); });
    let i = 0, cur = a, nxt = b;
    // never show the first seconds (the host waiting on screen): start at 4s or later, and only fade in once the seek is done
    const load = (v, s, show) => { if (!v.src.endsWith(s.v)) v.src = s.v; const go = () => { const d = v.duration || s.t + 10; v.currentTime = Math.max(4, Math.min(s.t, d - 6)); v.addEventListener('seeked', () => { v.play().catch(() => {}); show && show(); }, { once: true }); }; v.readyState > 0 ? go() : v.addEventListener('loadedmetadata', go, { once: true }); };
    cur.classList.remove('on'); load(cur, seq[0], () => cur.classList.add('on'));
    if (seq.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setInterval(() => {
      if (document.hidden) return;
      i = (i + 1) % seq.length; const inc = nxt, out = cur;
      load(inc, seq[i], () => { inc.classList.add('on'); out.classList.remove('on'); setTimeout(() => out.pause(), 1300); });
      [cur, nxt] = [nxt, cur];
    }, 5000);
  });
  // light filter tabs (Online page): All / InvestHack / Online10
  $$('[data-filter]').forEach((sec) => {
    const tabs = $$('[data-ftab]', sec);
    tabs.forEach((b) => b.addEventListener('click', () => {
      sec.dataset.filter = b.dataset.ftab; tabs.forEach((t) => t.setAttribute('aria-selected', t === b));
      $$('.pc-grid', sec).forEach((g) => { const vis = [...g.children].filter((c) => sec.dataset.filter === 'all' || c.dataset.kind === sec.dataset.filter).length; g.dataset.empty = vis ? '' : '1'; });
    }));
  });
  // client-side pages of 10 for long lists ([data-paged])
  $$('[data-paged]').forEach((list) => {
    const per = +list.dataset.paged, items = [...list.children], pages = Math.ceil(items.length / per);
    if (pages < 2) return;
    const nav = document.createElement('nav'); nav.className = 'pager'; list.after(nav);
    const go = (p, scroll) => {
      items.forEach((el, k) => { el.hidden = Math.floor(k / per) !== p; });
      nav.innerHTML = Array.from({ length: pages }, (_, k) => `<button type="button" class="${k === p ? 'on' : ''}" data-p="${k}">${k + 1}</button>`).join('');
      if (scroll) list.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    nav.addEventListener('click', (e) => { const b = e.target.closest('[data-p]'); if (b) go(+b.dataset.p, true); });
    go(0);
  });
  // essay carousel on the home page: arrows + progress line
  $$('[data-carousel]').forEach((bc) => {
    const sec = bc.closest('section'), bar = $('[data-carousel-bar]', sec);
    const upd = () => { if (!bar) return; const w = bc.clientWidth / bc.scrollWidth, m = bc.scrollWidth - bc.clientWidth; bar.style.width = w * 100 + '%'; bar.style.left = (m ? (bc.scrollLeft / m) * (1 - w) * 100 : 0) + '%'; };
    bc.addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
    $$('[data-carousel-step]', sec).forEach((b) => b.addEventListener('click', () => {
      const card = bc.children[0]; bc.scrollBy({ left: +b.dataset.carouselStep * (card.offsetWidth + 24), behavior: 'smooth' });
    }));
  });
  // split-flap board on the next online session
  $$('[data-flapboard]').forEach((bd) => {
    const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:';
    const cells = $$('[data-flap]', bd);
    cells.forEach((b) => {
      if (b.dataset.flapdays) { const d = Math.max(0, Math.ceil((new Date(b.dataset.flapdays) - Date.now()) / 864e5)); b.dataset.flap = d + (d === 1 ? ' DAY' : ' DAYS'); }
      b.innerHTML = b.dataset.flap.split('').map((c) => (c === ' ' ? '<i class="e"></i>' : '<i>' + c + '</i>')).join('');
    });
    const run = () => cells.forEach((b, bi) => [...b.children].forEach((el, i) => {
      const ch = el.textContent; if (!ch) return;
      let k = 0; const n = 8 + i * 2 + bi * 3;
      const iv = setInterval(() => { if (k++ >= n) { el.textContent = ch; clearInterval(iv); return; } el.textContent = A[Math.floor(Math.random() * A.length)]; }, 55);
    }));
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { run(); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(bd);
  });
  /* chat: messages appear one by one, manager replies after a typing pause */
  $$('[data-chat]').forEach((box) => {
    const ms = $$('.pf-m:not(.pf-ty)', box), ty = $('.pf-ty', box), ul = $('ul', box);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { ms.forEach((m) => m.classList.add('on')); return; }
    const timers = [];
    const play = () => {
      let t = 400;
      ms.forEach((m) => {
        if (m.classList.contains('lm')) {
          timers.push(setTimeout(() => { ul.insertBefore(ty, m); ty.classList.add('on'); }, t));
          t += 1300;
          timers.push(setTimeout(() => { ty.classList.remove('on'); m.classList.add('on'); }, t));
          t += 1100;
        } else { timers.push(setTimeout(() => m.classList.add('on'), t)); t += 900; }
      });
    };
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { play(); io.disconnect(); } }, { threshold: 0.45 });
    io.observe(box);
  });
  /* Online10: pins light up once in view, the industry line cycles */
  $$('[data-o10]').forEach((box) => {
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { box.classList.add('go'); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(box);
    const rot = $$('.o1-rot i', box); let k = 0;
    if (rot.length > 1 && !matchMedia('(prefers-reduced-motion: reduce)').matches) setInterval(() => { rot[k].classList.remove('on'); k = (k + 1) % rot.length; rot[k].classList.add('on'); }, 2400);
  });
  /* Online10 globe: rotating dotted earth, member cities and arcs between them */
  $$('canvas[data-globe]').forEach((cv) => {
    const cities = JSON.parse(cv.dataset.globe);
    const ctx = cv.getContext('2d'); const D = Math.min(2, devicePixelRatio || 1);
    const rad = Math.PI / 180, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const PAIRS = [[2, 1], [1, 0], [2, 7], [7, 10], [10, 9], [7, 8], [4, 6], [3, 9]];
    let land = [], W = 0, lam = -20, phi = 22 * rad, on = false, t0 = 0, raf = 0;
    const font = getComputedStyle(document.body).fontFamily;
    const size = () => { W = cv.clientWidth; cv.width = W * D; cv.height = W * D; ctx.setTransform(D, 0, 0, D, 0, 0); };
    const proj = (la, lo) => { const a = la * rad, l = (lo - lam) * rad, ca = Math.cos(a);
      return [ca * Math.sin(l), Math.cos(phi) * Math.sin(a) - Math.sin(phi) * ca * Math.cos(l), Math.sin(phi) * Math.sin(a) + Math.cos(phi) * ca * Math.cos(l)]; };
    const toV = (la, lo) => { const a = la * rad, l = lo * rad; return [Math.cos(a) * Math.cos(l), Math.cos(a) * Math.sin(l), Math.sin(a)]; };
    const fromV = ([x, y, z]) => { const r = Math.hypot(x, y, z); return [Math.asin(z / r) / rad, Math.atan2(y, x) / rad]; };
    const draw = (ts) => {
      const R = W * 0.43, cx = W / 2, cy = W / 2; ctx.clearRect(0, 0, W, W);
      const g = ctx.createRadialGradient(cx - R * .35, cy - R * .4, R * .1, cx, cy, R);
      g.addColorStop(0, 'rgba(255,252,244,1)'); g.addColorStop(1, 'rgba(236,224,198,1)');
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fillStyle = g; ctx.fill();
      ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(169,126,40,.22)'; ctx.stroke();
      const dr = Math.max(.9, W / 520);
      for (let i = 0; i < land.length; i += 2) { const [x, y, z] = proj(land[i], land[i + 1]); if (z <= 0) continue;
        ctx.fillStyle = `rgba(60,46,25,${(.1 + z * .42).toFixed(3)})`; ctx.beginPath(); ctx.arc(cx + R * x, cy - R * y, dr * (.7 + z * .5), 0, 7); ctx.fill(); }
      const tt = (ts - t0) / 1000;
      PAIRS.forEach(([a, b], k) => { const A = toV(cities[a][1], cities[a][2]), B = toV(cities[b][1], cities[b][2]); const N = 48; let pr = null;
        const head = ((tt * .35 + k * .23) % 1.6);
        for (let s = 0; s <= N; s++) { const f = s / N; const v = [A[0] + (B[0] - A[0]) * f, A[1] + (B[1] - A[1]) * f, A[2] + (B[2] - A[2]) * f];
          const [la, lo] = fromV(v); const h = 1 + .12 * Math.sin(Math.PI * f); const [x, y, z] = proj(la, lo);
          const p = [cx + R * h * x, cy - R * h * y, z];
          if (pr && z > -.05 && pr[2] > -.05) { const near = Math.max(0, 1 - Math.abs(f - head) * 6);
            ctx.strokeStyle = `rgba(197,153,58,${(.18 + near * .7) * Math.min(1, (z + .05) * 3)})`; ctx.lineWidth = 1 + near * 1.2;
            ctx.beginPath(); ctx.moveTo(pr[0], pr[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); }
          pr = p; } });
      ctx.font = `600 ${Math.max(10, W / 44)}px ${font}`; ctx.textBaseline = 'middle';
      cities.forEach(([n, la, lo, lab], i) => { const [x, y, z] = proj(la, lo); if (z <= 0) return; const px = cx + R * x, py = cy - R * y;
        const pulse = (tt * .6 + i * .17) % 1;
        ctx.beginPath(); ctx.arc(px, py, 3 + pulse * 9, 0, 7); ctx.fillStyle = `rgba(197,153,58,${(.35 * (1 - pulse) * z).toFixed(3)})`; ctx.fill();
        ctx.beginPath(); ctx.arc(px, py, 3.2, 0, 7); ctx.fillStyle = '#C5993A'; ctx.fill();
        if (z > .35 && lab !== 0) { ctx.fillStyle = `rgba(33,29,22,${Math.min(1, (z - .35) * 3).toFixed(3)})`; const left = x > .45; ctx.textAlign = left ? 'right' : 'left'; ctx.fillText(n, px + (left ? -8 : 8), py - 1); } });
    };
    const loop = (ts) => { if (!t0) t0 = ts; if (!still) lam = -20 + ((ts - t0) / 1000) * 6; draw(ts); if (on && !still) raf = requestAnimationFrame(loop); };
    size(); addEventListener('resize', () => { size(); draw(performance.now()); });
    fetch('/brand/land.json').then((r) => r.json()).then((d) => { land = d; draw(performance.now()); if (on && !still) raf = requestAnimationFrame(loop); });
    new IntersectionObserver((es) => { on = es[0].isIntersecting; cancelAnimationFrame(raf); if (on && !still && land.length) raf = requestAnimationFrame(loop); }).observe(cv);
  });
  $$('[data-days]').forEach((el) => { el.textContent = Math.max(0, Math.ceil((new Date(el.dataset.days) - Date.now()) / 864e5)); });

  /* timeline: place today's marker */
  $$('.tl').forEach((tl) => { const a = +tl.dataset.start, b = +tl.dataset.end, k = (Date.now() - a) / (b - a), m = $('[data-today]', tl); if (m) { if (k < 0 || k > 1) m.hidden = true; else { m.style.left = (k * 100).toFixed(2) + '%'; $('.tl-fill', tl).style.setProperty('--k', k); } } });

  /* reading progress */
  const rb = $('.readbar i');
  if (rb) { const on = () => { const h = document.documentElement; rb.style.transform = `scaleX(${Math.min(1, h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight))})`; }; addEventListener('scroll', on, { passive: true }); on(); }

  /* "I'm looking for" chips on event pages: toggle and pass to the form */
  $$('.lf button').forEach((b) => b.addEventListener('click', () => {
    b.classList.toggle('on'); const v = $$('.lf button.on').map((x) => x.textContent).join(', ');
    $$('input[name="looking_for"]').forEach((i) => { i.value = v; });
  }));
  /* invitation form (event pages). TODO: POST to the CRM */
  $$('[data-form="invite"]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    track('application_submitted', { dinner: f.dataset.event || '', looking_for: (f.looking_for && f.looking_for.value) || '' });
    f.hidden = true; const d = f.parentElement.querySelector('.inv-done'); if (d) d.hidden = false;
  }));
  /* copy email */
  $$('[data-copy]').forEach((b) => b.addEventListener('click', () => { try { navigator.clipboard.writeText(b.dataset.copy); } catch {} const t = b.textContent; b.textContent = 'Copied'; setTimeout(() => { b.textContent = t; }, 1600); }));

  /* countdowns */
  const cds = () => $$('[data-count]').forEach((el) => { const d = Math.max(0, new Date(el.dataset.count) - Date.now()), v = [Math.floor(d / 864e5), Math.floor(d / 36e5) % 24, Math.floor(d / 6e4) % 60, Math.floor(d / 1e3) % 60]; $$('b', el).forEach((b, i) => { b.textContent = String(v[i]).padStart(2, '0'); }); });
  if ($('[data-count]')) { cds(); setInterval(cds, 1000); }

  /* evening timeline progress (dinner pages) */
  const ev = $('.eve-list');
  if (ev) { const on = () => { const r = ev.getBoundingClientRect(), mid = innerHeight * 0.55, k = Math.max(0, Math.min(1, (mid - r.top) / r.height)); $('.eve-prog', ev).style.height = (k * (r.height - 20)) + 'px'; $$('li', ev).forEach((li) => { li.classList.toggle('on', li.getBoundingClientRect().top < mid); }); }; addEventListener('scroll', () => requestAnimationFrame(on), { passive: true }); on(); }

  /* insights filter */
  $$('.flt button').forEach((b) => b.addEventListener('click', () => {
    $$('.flt button').forEach((x) => x.classList.toggle('on', x === b));
    $$('[data-pillar]').forEach((c) => { const box = c.closest('.flt-item') || c; box.hidden = b.dataset.p !== 'all' && c.dataset.pillar !== b.dataset.p; });
    $$('.flt-group').forEach((g) => { g.hidden = !$$('.flt-item', g).some((x) => !x.hidden); });
  }));
}

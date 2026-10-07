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
      const fs = Math.min(W * 0.17, 300), wordH = fs * 0.74, gap = Math.max(28, fs * 0.28), head = 40;
      const total = wordH + gap + copy.offsetHeight, top = Math.max(head + 20, head + (H - head - total) / 2);
      copy.style.top = (top + wordH + gap) + 'px';
      ox.font = '700 ' + fs + 'px ' + getComputedStyle(document.body).fontFamily; ox.textAlign = 'center'; ox.textBaseline = 'middle'; ox.fillStyle = '#fff';
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
  const frame = () => {
    const vh = innerHeight;
    $$('[data-lit]').forEach((p) => { const r = p.getBoundingClientRect(), ws = $$('span', p), k = Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (r.height + vh * 0.35))), n = Math.round(k * ws.length); ws.forEach((w, i) => w.classList.toggle('on', i < n)); });
    drift.forEach((el) => { const r = el.parentElement.getBoundingClientRect(); el.style.transform = `translate3d(${(-(r.top - vh) * 0.35).toFixed(1)}px,0,0)`; });
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
  $$('[data-strip]').forEach((st) => {
    const cs = [...st.children], n = cs.length; let i = 0;
    const show = () => cs.forEach((c, k) => { let d = (k - i + n) % n; if (d > n / 2) d -= n; c.dataset.pos = Math.max(-2, Math.min(2, d)); });
    show();
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setInterval(() => { if (!document.hidden) { i = (i + 1) % n; show(); } }, 3200);
  });
  // online hero reel: cut to the next recap clip every 2.6s, each time from a different moment
  $$('[data-reel]').forEach((reel) => {
    const cs = $$('.reel-c', reel), cap = $('[data-reel-cap]', reel); let i = 0;
    const play = (c) => { const v = $('video', c); if (!v) return; const jump = () => { if (v.duration) v.currentTime = Math.random() * Math.max(0, v.duration - 4); v.play().catch(() => {}); }; v.readyState > 0 ? jump() : v.addEventListener('loadedmetadata', jump, { once: true }); };
    play(cs[0]);
    if (cs.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setInterval(() => {
      if (document.hidden) return;
      const prev = cs[i]; i = (i + 1) % cs.length; const c = cs[i];
      play(c); c.classList.add('on'); prev.classList.remove('on');
      setTimeout(() => $('video', prev)?.pause(), 900);
      if (cap) { cap.classList.remove('in'); void cap.offsetWidth; cap.textContent = c.dataset.cap; cap.classList.add('in'); }
    }, 2600);
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

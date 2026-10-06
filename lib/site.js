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
  /* home hero: fly through the word, then frame the film (components/HeroScroll.jsx) */
  const hs = $('[data-hero]');
  if (hs) {
    const film = $('.hs-film', hs), word = $('.hs-word', hs);
    const cl = (v) => Math.max(0, Math.min(1, v)), ez = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2), seg = (p, a, b) => cl((p - a) / (b - a));
    const origin = () => { const e = word.children[3], w = word.getBoundingClientRect(), r = e.getBoundingClientRect(); word.style.setProperty('--ox', (r.left - w.left + r.width * 0.13) + 'px'); word.style.setProperty('--oy', (r.top - w.top + r.height * 0.5) + 'px'); };
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const heroFrame = () => {
      const r = hs.getBoundingClientRect(), total = hs.offsetHeight - innerHeight, p = reduce ? 0.6 : cl(-r.top / total);
      const set = (k, v) => film.style.setProperty(k, v);
      set('--s', Math.pow(60, ez(seg(p, 0.05, 0.55))).toFixed(3));
      set('--cur', (1 - seg(p, 0.45, 0.58)).toFixed(3));
      set('--intro', (1 - seg(p, 0.03, 0.2)).toFixed(3));
      set('--shade', seg(p, 0.48, 0.66).toFixed(3));
      set('--copy', ez(seg(p, 0.56, 0.8)).toFixed(3));
      hs.classList.toggle('framed', r.bottom < 84);
    };
    addEventListener('scroll', () => requestAnimationFrame(() => { heroFrame(); onScroll(); }), { passive: true });
    addEventListener('resize', () => { origin(); heroFrame(); });
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { origin(); heroFrame(); onScroll(); });
    origin(); heroFrame();
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

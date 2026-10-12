'use client';
import { useEffect, useRef, useState } from 'react';

// AI platform, light concepts:
// 1) ManagerOrbit - one person at the centre, what they do circles around, numbers below.
// 2) MergeFlow - scroll-driven: three formats slide together into one profile, which then produces the outcomes.
function useSeen(th = 0.3) {
  const r = useRef(null); const [on, setOn] = useState(false);
  useEffect(() => { const el = r.current; if (!el) return; const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: th }); io.observe(el); return () => io.disconnect(); }, [th]);
  return [r, on];
}
function Count({ to, on, suffix = '' }) {
  const [v, setV] = useState(0);
  useEffect(() => { if (!on) return; let raf, t0; const run = (t) => { t0 ??= t; const k = Math.min(1, (t - t0) / 1800); setV(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(run); }; raf = requestAnimationFrame(run); return () => cancelAnimationFrame(raf); }, [on, to]);
  return <>{v.toLocaleString('en-US')}{suffix}</>;
}

const TASKS = ['Always in touch, one message away', 'Finds matches, makes intros', 'Handles whatever you need across the network', 'Saves you time'];
const NUMS = [[30, '+', 'countries our members come from'], [80, '+', 'private events organised'], [1300, '+', 'introductions made by the team']];

export function ManagerOrbit() {
  const [r, on] = useSeen(0.25);
  return (
    <div className={'mo' + (on ? ' on' : '')} ref={r}>
      <div className="mo-stage">
        <span className="mo-ring r1" /><span className="mo-ring r2" /><span className="mo-ring r3" />
        <div className="mo-spin">{[0, 1, 2, 3, 4, 5].map((k) => <i key={k} style={{ '--a': k * 60 + 'deg' }} />)}</div>
        <div className="mo-core">
          <span className="mo-av"><img src="/brand/symbol.png" alt="" /></span>
          <b>Personal Legends Manager</b>
          <em><i />Online</em>
        </div>
        {TASKS.map((t, i) => <span key={t} className={'mo-t t' + i} style={{ '--i': i }}><i />{t}</span>)}
      </div>
      <p className="mo-note">One call maps your mandate. After that, matches come to you.</p>
      <div className="mo-nums">{NUMS.map(([n, s, k]) => <div key={k}><b><Count to={n} on={on} suffix={s} /></b><span>{k}</span></div>)}</div>
    </div>
  );
}

const IN = [['01', 'Legends10', 'Dinners by city'], ['02', 'Legends Online10', 'Calls by industry'], ['03', 'InvestHack', 'Member sessions']];
const OUT = ['Co-investors & deals', 'Capital & LPs', 'Peers & hobbies'];
const ROWS = ['Profile', 'Asks', 'Matches', 'Intros'];
const clamp = (x) => Math.max(0, Math.min(1, x));

export function MergeFlow({ children }) {
  const sec = useRef(null);
  const [p, setP] = useState(0);
  const [mob, setMob] = useState(false);
  useEffect(() => { const q = matchMedia('(max-width:700px)'); const f = () => setMob(q.matches); f(); q.addEventListener('change', f); return () => q.removeEventListener('change', f); }, []);
  useEffect(() => {
    let raf = 0;
    const upd = () => { raf = 0; const el = sec.current; if (!el) return; const r = el.getBoundingClientRect(); const total = r.height - innerHeight; setP(clamp(-r.top / (total || 1))); };
    const on = () => { if (!raf) raf = requestAnimationFrame(upd); };
    upd(); addEventListener('scroll', on, { passive: true }); addEventListener('resize', on);
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, []);
  const m = clamp(p / 0.42);            // cards merge
  const f = clamp((p - 0.38) / 0.22);   // profile appears
  const o = clamp((p - 0.62) / 0.3);    // outcomes fly out
  const ease = (x) => 1 - Math.pow(1 - x, 3);
  const em = ease(m);
  return (
    <div className="mf" ref={sec}>
      <div className="mf-sticky">
        {children}
        <div className="mf-stage">
          {IN.map(([n, h, d], i) => {
            const dx = mob ? 0 : (i - 1) * 118 * (1 - em), dy = mob ? (i - 1) * 120 * (1 - em) : (i - 1) * -10 * em, rot = (i - 1) * 4 * (1 - em);
            return (
              <div key={h} className="mf-card" style={{ transform: `translate(calc(-50% + ${dx}%), calc(-50% + ${dy}px)) rotate(${rot}deg) scale(${1 - 0.06 * em * Math.abs(i - 1)})`, opacity: clamp(1 - f * 1.6), zIndex: 3 - Math.abs(i - 1) }}>
                <span>{n}</span><b>{h}</b><em>{d}</em>
              </div>
            );
          })}
          <div className="mf-prof" style={{ opacity: f, transform: `translate(-50%,-50%) scale(${0.9 + 0.1 * ease(f)})` }}>
            <div className="mf-ph"><img src="/brand/symbol.png" alt="" /><span><b>Legends AI platform</b><em>One profile for every format</em></span></div>
            <ul>{ROWS.map((t, k) => <li key={t} className={f > 0.3 + k * 0.17 ? 'on' : ''}><i />{t}</li>)}</ul>
          </div>
          {OUT.map((t, i) => {
            const e = ease(clamp((o - i * 0.15) / 0.55));
            const x = [-1, 0, 1][i];
            return <div key={t} className="mf-out" style={{ opacity: e, transform: `translate(calc(-50% + ${mob ? 0 : x * 118 * e}%), calc(-50% + ${mob ? 150 + (40 + i * 54) * e : 150 + 80 * e}px)) scale(${0.8 + 0.2 * e})` }}><i />{t}</div>;
          })}
        </div>
        <svg className="mf-lines" viewBox="0 0 600 120" preserveAspectRatio="none" aria-hidden="true" style={{ opacity: o }}><path d="M300 0 C300 60, 100 60, 100 120" /><path d="M300 0 L300 120" /><path d="M300 0 C300 60, 500 60, 500 120" /></svg>
        <div className="mf-steps">
          <span className={m < 1 ? 'on' : ''}>Three formats</span>
          <span className={m >= 1 && o < 0.2 ? 'on' : ''}>One profile</span>
          <span className={o >= 0.2 ? 'on' : ''}>The right people</span>
        </div>
      </div>
    </div>
  );
}

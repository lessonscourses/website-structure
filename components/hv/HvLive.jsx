'use client';
import { useEffect, useRef, useState } from 'react';

function useVisible(th = 0.3) {
  const r = useRef(null); const [v, setV] = useState(false);
  useEffect(() => { const el = r.current; if (!el) return; const io = new IntersectionObserver(([e]) => setV(e.isIntersecting), { threshold: th }); io.observe(el); return () => io.disconnect(); }, [th]);
  return [r, v];
}

/* ---------- Hero: a match, drawn as a network (no frame) ---------- */
// nodes in % of the stage; best = index of the match
const NODES = [
  [16, 22, 'Fund manager', 'London', 72], [82, 18, 'Family office', 'Dubai', 94], [88, 58, 'Angel', 'Singapore', 0],
  [12, 64, 'LP', 'Zurich', 0], [30, 88, 'Private investor', 'Monaco', 81], [70, 88, 'GP', 'Riyadh', 0], [50, 8, 'CIO', 'New York', 0],
];
const BEST = 1;
const CAP = ['You post an ask', 'Legends AI scans the network', 'Best match found', 'Your manager reviews both sides', 'Both said yes. Contacts shared.'];
export function MatchStory() {
  const [r, vis] = useVisible(0.2);
  const [ph, setPh] = useState(0);
  useEffect(() => { if (!vis) return; const d = [1800, 2400, 1800, 2000, 3400][ph]; const t = setTimeout(() => setPh((k) => (k + 1) % 5), d); return () => clearTimeout(t); }, [ph, vis]);
  const b = NODES[BEST];
  return (
    <div className="mn" ref={r} data-ph={ph}>
      <div className="mn-stage">
        <svg className="mn-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {NODES.map(([x, y], i) => <line key={i} x1="50" y1="50" x2={x} y2={y} className={'mn-l' + (i === BEST ? ' best' : '')} />)}
        </svg>
        <span className="mn-pulse" /><span className="mn-pulse p2" />
        {NODES.map(([x, y, a, c, s], i) => (
          <div key={i} className={'mn-n' + (i === BEST ? ' best' : '') + (s ? ' sc' : '')} style={{ left: x + '%', top: y + '%', '--i': i }}>
            <i>{a.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}</i><span><b>{a}</b>{c}</span>{s > 0 && <em>{s}%</em>}<strong>Approved</strong>
          </div>
        ))}
        <div className="mn-you"><i>You</i><strong>Approved</strong></div>
        <div className="mn-ask"><span>Your ask</span>Co-investor for a $20M healthtech round</div>
        <div className="mn-rev" style={{ left: (50 + b[0]) / 2 + '%', top: (50 + b[1]) / 2 + '%' }}>Reviewed by your manager</div>
        <div className="mn-done">Contacts shared</div>
      </div>
      <div className="mn-cap"><span>0{ph + 1}</span><b key={ph}>{CAP[ph]}</b></div>
    </div>
  );
}

/* ---------- One platform connects it all: signals flow into one profile ---------- */
const IN = [['Legends10', 'Dinners by city'], ['Legends Online10', 'Calls by industry'], ['InvestHack', 'Member sessions']];
const OUT = ['Co-investors & deals', 'Capital & LPs', 'Peers & hobbies'];
const EVENTS = [
  [0, 'Met a Gulf family office at the Dubai dinner', 0],
  [1, 'Asked for LP intros in Europe on the AI call', 1],
  [2, 'Followed up with a speaker after InvestHack', 2],
  [0, 'Matched with a fund manager from the Riyadh dinner', 1],
  [1, 'Found a co-investor for a Series B on the healthcare call', 0],
  [2, 'Met a member who also races sailboats', 2],
];
const YS = [80, 220, 360];
const pIn = (k) => `M300 ${YS[k]} C 430 ${YS[k]}, 440 220, 600 220`;
const pOut = (k) => `M600 220 C 760 220, 770 ${YS[k]}, 900 ${YS[k]}`;
export function LiveHub() {
  const [r, vis] = useVisible(0.3);
  const [n, setN] = useState(0);
  const [cnt, setCnt] = useState([3, 2, 1]);
  useEffect(() => {
    if (!vis) return;
    const t = setTimeout(() => setN((k) => k + 1), n === 0 ? 400 : 3200);
    const c = n > 0 ? setTimeout(() => { const e = EVENTS[(n - 1) % EVENTS.length]; setCnt((x) => x.map((v, j) => (j === e[2] ? v + 1 : v))); }, 2300) : null;
    return () => { clearTimeout(t); if (c) clearTimeout(c); };
  }, [n, vis]);
  const e = n > 0 ? EVENTS[(n - 1) % EVENTS.length] : null;
  return (
    <div className="sf" ref={r}>
      <div className="sf-stage">
        <svg className="sf-svg" viewBox="0 0 1200 440" aria-hidden="true">
          {YS.map((_, k) => <path key={'i' + k} d={pIn(k)} className={'sf-p' + (e && e[0] === k ? ' hot' : '')} />)}
          {YS.map((_, k) => <path key={'o' + k} d={pOut(k)} className={'sf-p' + (e && e[2] === k ? ' hot' : '')} />)}
          <circle cx="600" cy="220" r="150" className="sf-ring" />
          <circle cx="600" cy="220" r="110" className="sf-ring r2" />
          {e && (
            <g key={n}>
              <circle r="7" className="sf-dot"><animateMotion dur="1.1s" fill="freeze" path={pIn(e[0])} keyTimes="0;1" keySplines=".4 0 .2 1" calcMode="spline" /></circle>
              <circle r="7" className="sf-dot" opacity="0"><set attributeName="opacity" to="1" begin="1.25s" /><animateMotion dur="1s" begin="1.25s" fill="freeze" path={pOut(e[2])} keyTimes="0;1" keySplines=".4 0 .2 1" calcMode="spline" /></circle>
            </g>
          )}
        </svg>
        {IN.map(([h, p], k) => <div key={h} className={'sf-in' + (e && e[0] === k ? ' hot' : '')} style={{ top: (YS[k] / 440) * 100 + '%' }}><span>0{k + 1}</span><b>{h}</b><em>{p}</em></div>)}
        <div className="sf-core" key={'c' + n}><img src="/brand/symbol.png" alt="" /><b>Your Legends profile</b><em>Profile · asks · matches · intros</em></div>
        {OUT.map((t, k) => <div key={t} className={'sf-out' + (e && e[2] === k ? ' hot' : '')} style={{ top: (YS[k] / 440) * 100 + '%' }}><b key={cnt[k]}>{cnt[k]}</b><span>{t}</span></div>)}
      </div>
      <p className="sf-cap">{e ? <span key={n}><i>{IN[e[0]][0]}</i>{e[1]}</span> : <span>Every dinner, call and session lands in one profile.</span>}</p>
    </div>
  );
}

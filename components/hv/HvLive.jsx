'use client';
import { useEffect, useRef, useState } from 'react';

function useVisible(th = 0.3) {
  const r = useRef(null); const [v, setV] = useState(false);
  useEffect(() => { const el = r.current; if (!el) return; const io = new IntersectionObserver(([e]) => setV(e.isIntersecting), { threshold: th }); io.observe(el); return () => io.disconnect(); }, [th]);
  return [r, v];
}

/* ---------- Hero: how one match happens (looping scenario) ---------- */
const MATCHES = [['Family office · Dubai', 'Healthcare, $5-20M tickets', 94], ['Fund manager · London', 'Growth equity, healthtech', 87], ['Private investor · Zurich', 'Direct deals, Series B', 81]];
const PHASES = ['Your ask', 'AI finds matches', 'Reviewed by your manager', 'Both said yes', 'Contacts shared'];
export function MatchStory() {
  const [r, vis] = useVisible(0.2);
  const [ph, setPh] = useState(0);
  useEffect(() => { if (!vis) return; const d = [1800, 2600, 2000, 1800, 3200][ph]; const t = setTimeout(() => setPh((k) => (k + 1) % 5), d); return () => clearTimeout(t); }, [ph, vis]);
  return (
    <div className="ms" ref={r} data-ph={ph}>
      <div className="ms-card ms-ask"><span className="ms-k">Your ask</span><p>Co-investor for a $20M healthtech round</p><em>Posted privately · visible to matched members only</em></div>
      <div className="ms-scan"><span className="ms-k">Legends AI <i className="ms-spin" /></span>
        {MATCHES.map(([a, b, s], i) => <div key={a} className={'ms-m' + (i === 0 ? ' top' : '')} style={{ '--i': i }}><i className="ms-av" /><span><b>{a}</b>{b}</span><em>{s}%</em></div>)}
      </div>
      <div className="ms-card ms-rev"><span className="ms-k">Personal Legends Manager</span><p>Reviewed both sides. Intro proposed to you and to the family office.</p></div>
      <div className="ms-deal">
        <div className="ms-p"><i>You</i><span>Approved</span></div>
        <div className="ms-line"><span /></div>
        <div className="ms-p"><i>FO</i><span>Approved</span></div>
      </div>
      <div className="ms-done"><b>Contacts shared</b><span>Follow up directly. No fees on deals.</span></div>
      <ol className="ms-steps">{PHASES.map((t, i) => <li key={t} className={i <= ph ? 'on' : ''}>{t}</li>)}</ol>
    </div>
  );
}

/* ---------- One platform connects it all: live activity ---------- */
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
export function LiveHub() {
  const [r, vis] = useVisible(0.3);
  const [n, setN] = useState(0);
  const [cnt, setCnt] = useState([3, 2, 1]);
  useEffect(() => {
    if (!vis) return;
    const t = setInterval(() => setN((k) => { const e = EVENTS[k % EVENTS.length]; setCnt((c) => c.map((x, j) => (j === e[2] ? x + 1 : x))); return k + 1; }), 2600);
    return () => clearInterval(t);
  }, [vis]);
  const cur = EVENTS[(n + EVENTS.length - 1) % EVENTS.length];
  const feed = Array.from({ length: Math.min(n, 4) }, (_, k) => ({ id: n - k, e: EVENTS[(n - 1 - k + EVENTS.length * 10) % EVENTS.length] }));
  return (
    <div className="lh" ref={r}>
      <div className="lh-col">{IN.map(([h, p], i) => <div key={h} className={'lh-in' + (n && cur[0] === i ? ' hot' : '')}><span>0{i + 1}</span><b>{h}</b><em>{p}</em></div>)}</div>
      <div className="lh-core">
        <div className="lh-ph"><img src="/brand/symbol.png" alt="" /><span><b>Your Legends profile</b><em>Profile · asks · matches · intros</em></span><i className="lh-live">Live</i></div>
        <ul className="lh-feed">
          {feed.length === 0 && <li className="lh-empty">Every dinner, call and session lands here.</li>}
          {feed.map(({ id, e }) => <li key={id}><i>{IN[e[0]][0]}</i>{e[1]}<span>→ {OUT[e[2]]}</span></li>)}
        </ul>
      </div>
      <div className="lh-col">{OUT.map((t, i) => <div key={t} className={'lh-out' + (n && cur[2] === i ? ' hot' : '')}><b>{t}</b><em key={cnt[i]}>{cnt[i]}</em></div>)}</div>
    </div>
  );
}

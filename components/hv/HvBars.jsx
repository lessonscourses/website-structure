'use client';
import { useEffect, useRef, useState } from 'react';

// About: network shares as full-width block bars. Copy: LEGENDS_NETWORK_STATS_FINAL 2.
const SETS = [
  ['Where our investors are based and invest', [['GCC & Middle East', 38], ['UK & Europe', 22], ['Asia', 21], ['North America', 15], ['CIS', 4]]],
  ['Who they are', [['Venture capital', 30], ['Private investors & angels', 23], ['Family offices', 18], ['Private equity & growth', 12], ['Holdings & corporate investors', 9], ['Private credit & alternatives', 8]]],
  ['What they invest in', [['Technology & AI', 22], ['Energy & Climate', 15], ['Healthcare & Biotech', 12], ['Industrials & Manufacturing', 11], ['Finance & Fintech', 10], ['Digital Assets & Web3', 8], ['Real Estate & Infrastructure', 7], ['Defence, Space & Mobility', 5], ['Consumer & Media', 4], ['Agriculture & Food', 4], ['Commodities', 2]]],
];
const C = ['#7A5A1C', '#A97E28', '#C5993A', '#D8B467', '#E6CD95', '#EFDDB6', '#F4E8CE', '#F7EEDB', '#F9F2E3', '#FAF4E8', '#FBF6EC'];
const MIN = 7; // shares below this get no label inside the bar (listed under it instead)

function Count({ to, on, delay }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!on) return;
    let raf, t0;
    const step = (ts) => { if (!t0) t0 = ts + delay; const k = Math.min(1, Math.max(0, (ts - t0) / 1100)); setV(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [on, to, delay]);
  return <>{v}%</>;
}

function Bar({ title, rows }) {
  const r = useRef(null); const [on, setOn] = useState(false);
  useEffect(() => { const el = r.current; if (!el) return; const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.35 }); io.observe(el); return () => io.disconnect(); }, []);
  const max = rows[0][1];
  const small = rows.filter(([, v]) => v < MIN);
  return (
    <div className={'nb' + (on ? ' on' : '')} ref={r}>
      <h3>{title}</h3>
      <div className="nb-bar">
        {rows.map(([t, v], k) => (
          <div key={t} className={'nb-s' + (v < MIN ? ' sm' : '') + (k < 2 ? ' dk' : '')} style={{ '--f': v, '--w': (v / max) * 100 + '%', '--k': k, '--c': C[rows.length > 6 ? k : k + 1] }}>
            <span className="nb-b"><b style={{ fontSize: `calc(${Math.min(44, 14 + v * 1.4)}px * var(--fs, 1))` }}>{v >= MIN ? <Count to={v} on={on} delay={k * 90 + 250} /> : ''}</b><em>{t}<i>{v}%</i></em></span>
            <span className="nb-l">{v >= MIN ? t : ''}</span>
          </div>
        ))}
      </div>
      {small.length > 0 && <p className="nb-more">Plus {small.map(([t, v]) => `${t} ${v}%`).join(' · ')}</p>}
    </div>
  );
}

export default function HvBars() {
  return <div className="nbs">{SETS.map(([h, rows]) => <Bar key={h} title={h} rows={rows} />)}</div>;
}

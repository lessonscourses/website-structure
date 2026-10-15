'use client';
import { useEffect, useRef, useState } from 'react';

// About: three nested rings in one chart (outer = where, middle = who, inner = what).
// Each ring has its own colour family so shares read against the right list. Copy: LEGENDS_NETWORK_STATS_FINAL 3.
const RINGS = [
  { h: 'Where they are', k: 'Outer ring', r: 215, pal: ['#8C6820', '#B48A33', '#CFA650', '#E3C47E', '#F0DDB0'],
    rows: [['GCC & Middle East', 38], ['UK & Europe', 22], ['Asia', 21], ['North America', 15], ['CIS', 4]] },
  { h: 'Who they are', k: 'Middle ring', r: 172, pal: ['#2B2620', '#4A433A', '#6E665B', '#948B7F', '#B9B1A5', '#DAD4CA'],
    rows: [['Venture capital', 30], ['Private investors & angels', 23], ['Family offices', 18], ['Private equity & growth', 12], ['Holdings & corporate investors', 9], ['Private credit & alternatives', 8]] },
  { h: 'What they invest in', k: 'Inner ring', r: 129, pal: ['#8A4B2E', '#A8613F', '#C27C58', '#D69C7C', '#E6BDA4', '#F2DCCD'],
    rows: [['Technology & AI', 22], ['Energy & Climate', 15], ['Healthcare & Biotech', 12], ['Industrials & Manufacturing', 11], ['Finance & Fintech', 10], ['6 more sectors', 30]],
    more: 'Digital Assets & Web3 8% · Real Estate & Infrastructure 7% · Defence, Space & Mobility 5% · Consumer & Media 4% · Agriculture & Food 4% · Commodities 2%' },
];
const SW = 28, C = 260;

export default function HvRings() {
  const r = useRef(null); const [on, setOn] = useState(false);
  useEffect(() => { const el = r.current; if (!el) return; const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.3 }); io.observe(el); return () => io.disconnect(); }, []);
  return (
    <div className={'nr' + (on ? ' on' : '')} ref={r}>
      <div className="nr-fig">
        <svg viewBox="0 0 520 520" role="img" aria-label="Network breakdown by region, investor type and industry">
          {RINGS.map((g, gi) => {
            const len = 2 * Math.PI * g.r; let acc = 0;
            return (
              <g key={g.h}>
                <circle cx={C} cy={C} r={g.r} fill="none" stroke="#F3EBDA" strokeWidth={SW} />
                {g.rows.map(([t, v], k) => { const a0 = acc; acc += v; const L = Math.max(0, (len * v) / 100 - 3);
                  return <circle key={t} className="nr-s" cx={C} cy={C} r={g.r} fill="none" stroke={g.pal[k]} strokeWidth={SW}
                    strokeDasharray={`${L} ${len}`} transform={`rotate(${a0 * 3.6 - 90} ${C} ${C})`} style={{ '--len': L, '--d': gi * 0.35 + k * 0.08 + 's' }}><title>{`${t} ${v}%`}</title></circle>; })}
              </g>
            );
          })}
          <text x={C} y={C + 4} textAnchor="middle" className="nr-n">260+</text>
          <text x={C} y={C + 34} textAnchor="middle" className="nr-c">investors</text>
        </svg>
      </div>
      <div className="nr-leg">
        {RINGS.map((g, gi) => (
          <div key={g.h} className="nr-g" style={{ '--gi': gi }}>
            <div className="nr-gh"><i style={{ background: g.pal[0] }} /><span>{g.k}</span>{g.h}</div>
            <ul>{g.rows.map(([t, v], k) => <li key={t}><b>{v}%</b><i style={{ background: g.pal[k] }} />{t}</li>)}</ul>
            {g.more && <p>{g.more}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

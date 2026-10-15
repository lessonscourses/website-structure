'use client';
import { useEffect, useRef, useState } from 'react';

// About: network shares as donuts with callout labels (vntr-style), drawn in on scroll.
// Copy: LEGENDS_NETWORK_STATS_FINAL 3. Industries: top 5 called out, the rest grouped and listed under the chart.
const IND = [['Technology & AI', 22], ['Energy & Climate', 15], ['Healthcare & Biotech', 12], ['Industrials & Manufacturing', 11], ['Finance & Fintech', 10], ['Digital Assets & Web3', 8], ['Real Estate & Infrastructure', 7], ['Defence, Space & Mobility', 5], ['Consumer & Media', 4], ['Agriculture & Food', 4], ['Commodities', 2]];
const IND_TOP = IND.slice(0, 5), IND_REST = IND.slice(5);
const SETS = [
  { t: ['Where our investors', 'are based and invest'], rows: [['GCC & Middle East', 38], ['UK & Europe', 22], ['Asia', 21], ['North America', 15], ['CIS', 4]] },
  { t: ['Who', 'they are'], rows: [['Venture capital', 30], ['Private investors & angels', 23], ['Family offices', 18], ['Private equity & growth', 12], ['Holdings & corporate investors', 9], ['Private credit & alternatives', 8]] },
  { t: ['What they', 'invest in'], rows: [...IND_TOP, ['6 more sectors', IND_REST.reduce((a, [, v]) => a + v, 0)]], more: IND_REST },
];
const C = ['#8C6820', '#A97E28', '#C5993A', '#D8B467', '#E6CD95', '#F0E1BE'];
const W = 760, H = 440, CX = 380, CY = 220, R = 118, SW = 30;

function layout(rows) {
  let acc = 0;
  const seg = rows.map(([t, v], k) => { const a0 = acc; acc += v; const mid = ((a0 + v / 2) / 100) * Math.PI * 2 - Math.PI / 2; return { t, v, k, a0, mid }; });
  // callouts: right side for angles on the right half, left otherwise; spread vertically
  const side = (s) => (Math.cos(s.mid) >= 0 ? 1 : -1);
  [1, -1].forEach((d) => {
    const g = seg.filter((s) => side(s) === d).map((s) => ({ s, y: CY + Math.sin(s.mid) * (R + 50) })).sort((a, b) => a.y - b.y);
    for (let i = 1; i < g.length; i++) if (g[i].y - g[i - 1].y < 78) g[i].y = g[i - 1].y + 78;
    const over = g.length ? Math.max(0, g[g.length - 1].y - (H - 40)) : 0;
    g.forEach((o) => { o.s.ly = Math.max(52, o.y - over); o.s.d = d; });
  });
  return seg;
}

function Donut({ set, flip }) {
  const r = useRef(null); const [on, setOn] = useState(false);
  useEffect(() => { const el = r.current; if (!el) return; const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.3 }); io.observe(el); return () => io.disconnect(); }, []);
  const seg = layout(set.rows), c = 2 * Math.PI * R;
  return (
    <div className={'dn' + (on ? ' on' : '') + (flip ? ' flip' : '')} ref={r}>
      <h3 className="dn-h">{set.t[0]}<span>{set.t[1]}</span></h3>
      <div className="dn-fig">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={set.rows.map(([t, v]) => `${t} ${v}%`).join(', ')}>
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="#F3EBDA" strokeWidth={SW} />
          {seg.map((s) => (
            <circle key={s.t} className="dn-s" cx={CX} cy={CY} r={R} fill="none" stroke={C[s.k]} strokeWidth={SW}
              strokeDasharray={`${Math.max(0, (c * s.v) / 100 - 3)} ${c}`} transform={`rotate(${(s.a0 / 100) * 360 - 90} ${CX} ${CY})`} style={{ '--k': s.k, '--len': (c * s.v) / 100 }} />
          ))}
          <image href="/brand/symbol.png" x={CX - 34} y={CY - 34} width="68" height="68" className="dn-logo" />
          {seg.map((s) => {
            const x1 = CX + Math.cos(s.mid) * (R + SW / 2 + 4), y1 = CY + Math.sin(s.mid) * (R + SW / 2 + 4);
            const x2 = CX + Math.cos(s.mid) * (R + 44), xe = CX + s.d * 330;
            return (
              <g key={s.t} className="dn-c" style={{ '--k': s.k }}>
                <polyline points={`${x1},${y1} ${x2},${s.ly} ${xe},${s.ly}`} fill="none" stroke="#211D16" strokeOpacity=".35" strokeWidth="1" />
                <text x={xe} y={s.ly - 12} textAnchor={s.d > 0 ? 'end' : 'start'} className="dn-v">{s.v}%</text>
                <text x={xe} y={s.ly + 20} textAnchor={s.d > 0 ? 'end' : 'start'} className="dn-l">{s.t}</text>
              </g>
            );
          })}
        </svg>
        <ul className="dn-leg">{set.rows.map(([t, v], k) => <li key={t}><i style={{ background: C[k] }} />{t}<b>{v}%</b></li>)}</ul>
        {set.more && <p className="dn-more">6 more sectors: {set.more.map(([t, v]) => `${t} ${v}%`).join(' · ')}</p>}
      </div>
    </div>
  );
}

export default function HvDonuts() {
  return <div className="dns">{SETS.map((s, i) => <Donut key={i} set={s} flip={i % 2 === 1} />)}</div>;
}

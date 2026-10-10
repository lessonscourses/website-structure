'use client';
import { useEffect, useState } from 'react';

const V = [
  ['/people/alex.jpg', '06', '$200M+', 'family office, $5-10M direct tickets', 'Buy till exit: an 8-10-year minimum horizon.', 'Alex Felman', 'General Partner, Felman Family Office'],
  ['/people/janneke.jpg', '05', '€2.5M', 'per startup, pre-seed', 'Before revenue, the team is the evidence.', 'Janneke Niessen', 'Founding Partner, CapitalT'],
  ['/people/walied.jpg', '04', '30+ yrs', 'building and backing tech', 'If you are a founder, you have to own your own numbers.', 'Walied Albasheer', 'Managing Partner, Intuitio Ventures'],
];

export default function HvVoices() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => { if (!auto) return; const t = setInterval(() => setI((k) => (k + 1) % V.length), 6500); return () => clearInterval(t); }, [auto]);
  const v = V[i];
  return (
    <>
      <div className="hv-vo rv">
        <div className="hv-vo-ph">{V.map((x, k) => <img key={k} src={x[0]} alt={x[5]} className={k === i ? 'on' : ''} />)}</div>
        <div className="hv-vo-q" key={i}>
          <div><span className="no">InvestHack #{v[1]}</span><span className="num">{v[2]}</span><p className="nl">{v[3]}</p></div>
          <div><blockquote>“{v[4]}”</blockquote><p className="who"><b>{v[5]}</b>{v[6]}</p></div>
        </div>
      </div>
      <div className="hv-heads rv">
        {V.map((x, k) => <button key={k} type="button" className={k === i ? 'on' : ''} onClick={() => { setI(k); setAuto(false); }}><img src={x[0]} alt="" /><span><b>{x[5]}</b><span>InvestHack #{x[1]}</span></span></button>)}
      </div>
    </>
  );
}

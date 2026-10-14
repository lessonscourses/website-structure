'use client';
import { useEffect, useRef, useState } from 'react';

// InvestHack speakers: featured view + a slider of speaker cards (auto-advance, click to select).
const BF = 'https://belegends.club/api/files/pbc_1687431684', LU = 'https://images.lumacdn.com/uploads';
const V = [
  { img: '/people/alex.jpg', cut: true, no: '#06', date: '29 Sep', big: '$200M+', bl: 'family office, $5-10M direct tickets', q: 'Buy till exit: an 8-10-year minimum horizon.', n: 'Alex Felman', r: 'General Partner, Felman Family Office' },
  { img: '/people/janneke.jpg', cut: true, no: '#05', date: '22 Sep', big: '€2.5M', bl: 'per startup, pre-seed', q: 'Before revenue, the team is the evidence.', n: 'Janneke Niessen', r: 'Founding Partner, CapitalT' },
  { img: '/people/walied.jpg', cut: true, no: '#04', date: '15 Sep', big: '30+ yrs', bl: 'building and backing tech', q: 'If you are a founder, you have to own your own numbers.', n: 'Walied Albasheer', r: 'Managing Partner, Intuitio Ventures' },
  { img: `${BF}/senl9tnhxv04zgw/varun_prev_f85bcua4y1.jpg`, no: '#03', date: '8 Sep', big: 'AI', bl: 'and the human edge', q: 'Powering humanity into an exponential future.', n: 'Varun Malik', r: 'Founder & CEO, Konsälidön' },
  { img: `${LU}/bs/ac902c55-d881-468b-bfdb-320677d8a8ec.png`, no: 'Session', date: '25 Aug', big: '200+', bl: 'scale-up companies behind the insights', t: 'How to build ownership culture and care', n: 'Julius Bachmann', r: 'Founder, Bachmann Catalyst' },
  { img: `${LU}/2o/559112b4-ca42-4a7d-bfe8-66797fbb0833.png`, no: 'Session', date: '11 Aug', big: '$2B', bl: 'company built, 650k+ people', t: 'How to build a $2B company and manage 650k+ people', n: 'Vijay Sivaram', r: 'Co-Founder, RVAI Global' },
  { img: `${LU}/sx/b253d992-9e8f-48f5-b19e-2ce299ddee0c.png`, no: 'Session', date: '30 Jul', big: 'FO', bl: 'inside a family office', t: 'How patient capital decides', n: 'Abhineet Singh', r: 'CIO, Al Siraj Holdings' },
  { img: `${LU}/f1/589abc2d-6f41-4c2f-b9d2-dc4b90c88713.png`, no: 'Session', date: '23 Jul', big: 'AI', bl: 'in the enterprise', t: 'AI in the enterprise: an investor’s view', n: 'Radhesh Kanumury', r: 'Managing Partner, Suvan Ventures' },
];
const DUR = 6500;

export default function HvVoices() {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const [vis, setVis] = useState(false);
  const box = useRef(null), track = useRef(null);
  useEffect(() => { const io = new IntersectionObserver(([e]) => setVis(e.isIntersecting), { threshold: 0.25 }); if (box.current) io.observe(box.current); return () => io.disconnect(); }, []);
  useEffect(() => { if (!vis || hold) return; const t = setTimeout(() => setI((k) => (k + 1) % V.length), DUR); return () => clearTimeout(t); }, [i, vis, hold]);
  useEffect(() => { const tr = track.current; const c = tr?.children[i]; if (!tr || !c) return; const x = c.offsetLeft - tr.clientWidth / 2 + c.offsetWidth / 2; tr.scrollTo({ left: x, behavior: 'smooth' }); }, [i]);
  const v = V[i];
  const go = (d) => setI((k) => (k + d + V.length) % V.length);
  return (
    <div className="ihv" ref={box} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} style={{ '--dur': DUR + 'ms' }}>
      <div className="ihv-feat rv">
        <div className={'ihv-ph' + (v.cut ? ' cut' : '') + (v.glob ? ' glob' : '')}>{V.map((x, k) => <img key={k} src={x.img} alt={x.n} className={k === i ? 'on' : ''} loading={k < 3 ? 'eager' : 'lazy'} />)}</div>
        <div className="ihv-q" key={i}>
          <div><span className="no">{v.tag ? 'Legends Online10' : v.no === 'Session' ? 'Speaker session' : 'InvestHack ' + v.no} · {v.date}</span><span className="num">{v.big}</span><p className="nl">{v.bl}</p></div>
          <div>{v.q ? <blockquote>“{v.q}”</blockquote> : <p className="tp"><span>{v.tag ? 'Next session' : 'Session'}</span>{v.t}</p>}<p className="who"><b>{v.n}</b>{v.r}</p></div>
        </div>
      </div>
      <div className="ihv-bar rv">
        <span className="ihv-count"><b>{String(i + 1).padStart(2, '0')}</b> / {String(V.length).padStart(2, '0')}</span>
        <div className="hv-nav"><button type="button" className="prev" onClick={() => go(-1)} aria-label="Previous"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button><button type="button" onClick={() => go(1)} aria-label="Next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button></div>
      </div>
      <div className="ihv-track" ref={track}>
        {V.map((x, k) => (
          <button key={k} type="button" className={'ihv-card' + (k === i ? ' on' : '') + (x.cut ? ' cut' : '') + (x.glob ? ' glob' : '')} onClick={() => setI(k)}>
            <span className="ihv-im"><img src={x.img} alt="" loading="lazy" /></span>
            <span className="ihv-tx"><em>{x.tag ? 'Online10' : x.no === 'Session' ? 'Speaker session' : 'InvestHack ' + x.no} · {x.date}</em><b>{x.n}</b><span>{x.r}</span></span>
            <i className="ihv-pr" key={k === i ? 'p' + i : 'x'} />
          </button>
        ))}
      </div>
    </div>
  );
}

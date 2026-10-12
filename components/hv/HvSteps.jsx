'use client';
import { useEffect, useRef, useState } from 'react';

// "How it works" walkthrough: numbered steps on the left auto-advance, the panel on the right changes.
// Texts: belegends.club "What you get". Visuals are light HTML mock-ups of the member app.
const DUR = 6000;
const STEPS = [
  { k: 'Matching', h: 'See only who matches your level', p: 'AI reads what you bring and what you need. Everything else stays out of your feed.', n: 'No noise, no cold outreach.' },
  { k: 'Opportunities', h: 'Offers and asks from members like you', p: 'A private board for capital, partners, deals and services. Every post from a verified peer at your level.', n: 'Post what you need. See what others bring.' },
  { k: 'Introductions', h: 'Every intro reviewed by a human', p: 'You express interest. We review both sides and route the handoff. You stay anonymous until you both agree.', n: 'Contacts are shared only after both say yes.' },
  { k: 'Events', h: 'Every guest is vetted', p: 'Legends Online10 and InvestHack online. Legends10 dinners offline, in the cities where capital actually meets.', n: 'Your seat is one message away.' },
];

function Match() {
  const M = [['Family office · Dubai', 'Co-invest in AI infrastructure', 94], ['Fund manager · London', 'Raising LPs for private credit', 88], ['Private investor · Singapore', 'Direct deals, $1-5M tickets', 81]];
  return (
    <div className="st-ui">
      <div className="st-me"><i>Y</i><span><b>Your mandate</b>Direct deals · AI, healthcare · $1-10M</span></div>
      <p className="st-lbl">Matches for you</p>
      {M.map(([a, b, s], i) => <div key={a} className="st-row" style={{ '--d': i * 0.25 + 0.3 + 's' }}><i className="st-av" /><span><b>{a}</b>{b}</span><em>{s}%</em></div>)}
    </div>
  );
}
function Board() {
  const P = [['Ask', 'Co-investor for a $20M Series B, healthtech'], ['Offer', 'Allocation in a GCC private credit fund'], ['Ask', 'LP introductions in Europe'], ['Offer', 'Data-centre deal in Southeast Asia']];
  return (
    <div className="st-ui">
      <div className="st-tabs"><b>All</b><span>Asks</span><span>Offers</span></div>
      {P.map(([t, x], i) => <div key={x} className="st-post" style={{ '--d': i * 0.22 + 0.25 + 's' }}><em className={t === 'Ask' ? 'a' : 'o'}>{t}</em><span>{x}</span><small>Verified member</small></div>)}
    </div>
  );
}
function Intro() {
  return (
    <div className="st-ui st-intro">
      <div className="st-pair"><div className="st-p"><i>?</i><b>Member A</b><span>Family office</span></div><div className="st-link"><span>Reviewed by Legends</span></div><div className="st-p"><i>?</i><b>Member B</b><span>Fund manager</span></div></div>
      <ol className="st-flow"><li style={{ '--d': '.3s' }}>Interest expressed</li><li style={{ '--d': '.8s' }}>Both sides reviewed</li><li style={{ '--d': '1.3s' }}>Both agreed</li><li className="ok" style={{ '--d': '1.8s' }}>Contacts shared</li></ol>
    </div>
  );
}
function Events() {
  const E = [['14 Oct', 'Legends10 Dubai', 'SuperReturn Middle East week'], ['21 Oct', 'Online10 · Artificial intelligence', 'Up to 10 investors, online'], ['27 Oct', 'InvestHack #06 · Alex Felman', 'Live Q&A, online']];
  return (
    <div className="st-ui">
      <p className="st-lbl">Upcoming for you</p>
      {E.map(([d, a, b], i) => <div key={a} className="st-ev" style={{ '--d': i * 0.25 + 0.3 + 's' }}><em>{d}</em><span><b>{a}</b>{b}</span><i>Reserve</i></div>)}
    </div>
  );
}
const UI = [Match, Board, Intro, Events];

export default function HvSteps() {
  const [i, setI] = useState(0);
  const [run, setRun] = useState(false);
  const [hold, setHold] = useState(false);
  const box = useRef(null);
  useEffect(() => { const io = new IntersectionObserver(([e]) => setRun(e.isIntersecting), { threshold: 0.35 }); if (box.current) io.observe(box.current); return () => io.disconnect(); }, []);
  useEffect(() => { if (!run || hold) return; const t = setTimeout(() => setI((k) => (k + 1) % STEPS.length), DUR); return () => clearTimeout(t); }, [i, run, hold]);
  const s = STEPS[i], V = UI[i];
  return (
    <div className={'st' + (run && !hold ? ' run' : '')} ref={box} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} style={{ '--dur': DUR + 'ms' }}>
      <ol className="st-nav">
        {STEPS.map((x, k) => <li key={x.k}><button type="button" className={k === i ? 'on' : ''} onClick={() => setI(k)}><span>0{k + 1}</span>{x.k}<i key={k === i ? 'a' + i : 'b'} /></button></li>)}
      </ol>
      <div className="st-tx" key={'t' + i}>
        <span className="st-no">0{i + 1}</span>
        <h3>{s.h}</h3>
        <p>{s.p}</p>
        <p className="st-n">{s.n}</p>
      </div>
      <div className="st-vis" key={'v' + i}><V /></div>
    </div>
  );
}

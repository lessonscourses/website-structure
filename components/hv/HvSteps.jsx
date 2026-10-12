'use client';
import { useEffect, useRef, useState } from 'react';

// "Inside the platform": numbered steps auto-advance; the screen on the right shows the original
// product blocks from belegends.club (1920x1080 HTML pages, scaled to fit). Texts: belegends.club "What you get".
const DUR = 7000;
const SRC = 'https://belegends.club/assets/blocks/';
export const STEPS = [
  { k: 'Matching', h: 'See only who matches your level', p: 'AI reads what you bring and what you need. Everything else stays out of your feed.', f: '01_matching.html' },
  { k: 'Opportunities', h: 'Offers and asks from members like you', p: 'A private board where members post what they need and what they offer: capital, partners, deals, services. Every post from a verified peer at your level.', f: '02_asks.html' },
  { k: 'Introductions', h: 'Every intro reviewed by a human', p: 'You express interest. We review both sides and route the handoff. You stay anonymous until you both agree.', f: '03_brokerage.html' },
  { k: 'Events', h: 'Every guest is vetted', p: 'Private sessions online. Masterclasses and closed dinners offline. In cities where capital actually meets.', f: '04_events.html' },
];

function Screen({ f, on }) {
  const box = useRef(null);
  const [s, setS] = useState(0.4);
  useEffect(() => {
    const el = box.current; if (!el) return;
    const ro = new ResizeObserver(([e]) => setS(e.contentRect.width / 1920));
    ro.observe(el); return () => ro.disconnect();
  }, []);
  return (
    <div className={'st-scr' + (on ? ' on' : '')} ref={box} aria-hidden={!on}>
      <iframe src={SRC + f} title="" loading="lazy" tabIndex={-1} scrolling="no" style={{ transform: `scale(${s})` }} />
    </div>
  );
}

export default function HvSteps() {
  const [i, setI] = useState(0);
  const [run, setRun] = useState(false);
  const [hold, setHold] = useState(false);
  const box = useRef(null);
  useEffect(() => { const io = new IntersectionObserver(([e]) => setRun(e.isIntersecting), { threshold: 0.3 }); if (box.current) io.observe(box.current); return () => io.disconnect(); }, []);
  useEffect(() => { if (!run || hold) return; const t = setTimeout(() => setI((k) => (k + 1) % STEPS.length), DUR); return () => clearTimeout(t); }, [i, run, hold]);
  const s = STEPS[i];
  return (
    <div className={'st2' + (run && !hold ? ' run' : '')} ref={box} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} style={{ '--dur': DUR + 'ms' }}>
      <div className="st2-l">
        <ol className="st2-nav">
          {STEPS.map((x, k) => (
            <li key={x.k}><button type="button" className={k === i ? 'on' : ''} onClick={() => setI(k)}>
              <span>0{k + 1}</span><b>{x.k}</b><i key={k === i ? 'a' + i : 'b'} />
            </button></li>
          ))}
        </ol>
        <div className="st2-tx" key={'t' + i}><h3>{s.h}</h3><p>{s.p}</p></div>
      </div>
      <div className="st2-dev">
        <div className="st2-bar"><i /><i /><i /><span>app.legends.app</span></div>
        <div className="st2-view">{STEPS.map((x, k) => <Screen key={x.f} f={x.f} on={k === i} />)}</div>
      </div>
    </div>
  );
}

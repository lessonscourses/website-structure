'use client';
import { useRef } from 'react';

const A = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

export default function HvCarousel({ title, className = '', children }) {
  const r = useRef(null);
  const go = (d) => { const c = r.current; if (!c) return; const w = c.children[0]?.offsetWidth || 300; c.scrollBy({ left: d * (w + 14), behavior: 'smooth' }); };
  return (
    <>
      <div className="hv-ch rv"><h3 className="hv-k">{title}</h3><div className="hv-nav"><button type="button" className="prev" onClick={() => go(-1)} aria-label="Previous"><A /></button><button type="button" onClick={() => go(1)} aria-label="Next"><A /></button></div></div>
      <div className={'hv-car rv ' + className} ref={r}>{children}</div>
    </>
  );
}

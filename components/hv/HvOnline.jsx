'use client';
import { useRef, useState } from 'react';
import { ONLINE10, ONLINE_NEXT, ONLINE_PAST } from '@/data/online';

// Online block slider: upcoming Online10 + InvestHack sessions first, then recent InvestHack sessions.
const O10 = ONLINE10[0];
const past = (n) => ONLINE_PAST.find((p) => p.speaker === n) || {};
const BF = 'https://belegends.club/api/files/pbc_1687431684';
const CARDS = [
  { k: 'o10', tag: 'Online10', date: `${O10.dow}, ${O10.day} ${O10.month.slice(0, 3)}`, h: O10.industry, p: 'Up to 10 investors from one industry. Intros, asks & offers.', cta: 'Request a seat', url: O10.url },
  { k: 'ih', tag: `InvestHack #${ONLINE_NEXT.no}`, date: `${ONLINE_NEXT.dow}, ${ONLINE_NEXT.day} ${ONLINE_NEXT.month.slice(0, 3)}`, h: ONLINE_NEXT.speaker, p: 'How a $200M+ family office decides on a direct deal', img: '/people/alex.jpg', cta: 'Register', url: ONLINE_NEXT.url },
  { k: 'ih', past: true, tag: 'InvestHack #05', date: 'Tue, 22 Sep', h: 'Janneke Niessen', p: 'How a startup with no revenue raises up to €2.5M', img: '/people/janneke.jpg', cta: 'Watch the recap', url: past('Janneke Niessen').url },
  { k: 'ih', past: true, tag: 'InvestHack #04', date: 'Tue, 15 Sep', h: 'Walied Albasheer', p: 'Spotting real companies behind AI-perfect pitches', img: '/people/walied.jpg', cta: 'Watch the recap', url: past('Walied Albasheer').url },
  { k: 'ih', past: true, tag: 'InvestHack #03', date: 'Tue, 8 Sep', h: 'Varun Malik', p: 'How to profit as a human in an unforgiving AI world', img: `${BF}/senl9tnhxv04zgw/varun_prev_f85bcua4y1.jpg`, photo: true, cta: 'Watch the recap', url: past('Varun Malik').url },
];
const TABS = [['all', 'All'], ['o10', 'Legends Online10'], ['ih', 'InvestHack']];

export default function HvOnline() {
  const [f, setF] = useState('all');
  const [p, setP] = useState(0);
  const tr = useRef(null);
  const list = CARDS.filter((c) => f === 'all' || c.k === f);
  const onScroll = () => { const t = tr.current; if (!t) return; const m = t.scrollWidth - t.clientWidth; setP(m > 0 ? t.scrollLeft / m : 1); };
  const go = (d) => { const t = tr.current; if (!t) return; const c = t.children[0]; t.scrollBy({ left: d * ((c?.offsetWidth || 340) + 16), behavior: 'smooth' }); };
  const pick = (k) => { setF(k); setP(0); if (tr.current) tr.current.scrollLeft = 0; };
  return (
    <div className="hon">
      <div className="hon-top rv">
        <h3>Upcoming online sessions</h3>
        <div className="hon-tabs" role="tablist">{TABS.map(([k, t]) => <button key={k} role="tab" aria-selected={f === k} className={f === k ? 'on' : ''} onClick={() => pick(k)}>{t}</button>)}</div>
      </div>
      <div className="hon-trk rv d1" ref={tr} onScroll={onScroll}>
        {list.map((c) => (
          <a key={c.h} href={c.url || '/events/online'} className={'hon-c k-' + c.k + (c.past ? ' past' : '') + (c.photo ? ' ph' : '')}>
            <span className="hon-tag">{c.past ? 'Past · ' : ''}{c.tag}</span>
            <span className="hon-d">{c.date}</span>
            <b>{c.h}</b>
            <p>{c.p}</p>
            {c.img ? <img src={c.img} alt="" /> : <span className="hon-10" aria-hidden="true">10</span>}
            <span className="hon-cta">{c.cta} →</span>
          </a>
        ))}
      </div>
      <div className="hon-nav"><span className="hon-bar"><i style={{ transform: `scaleX(${Math.max(0.12, p)})` }} /></span>
        <span className="hon-ars"><button aria-label="Previous" onClick={() => go(-1)}>←</button><button aria-label="Next" onClick={() => go(1)}>→</button></span></div>
    </div>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';

function useSeen(th = 0.25) {
  const r = useRef(null); const [on, setOn] = useState(false);
  useEffect(() => { const el = r.current; if (!el) return; const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: th }); io.observe(el); return () => io.disconnect(); }, [th]);
  return [r, on];
}

/* Hero: stack of match cards; the top card cycles through matches, toasts appear */
const M = [
  ['FO', 'Family office', 'Dubai · $200M+ AUM', 94, ['Healthcare', '$5-20M tickets', 'Co-invests in GCC', 'Met at Legends10 Dubai']],
  ['FM', 'Fund manager', 'London · growth equity', 89, ['Healthtech', 'Leads Series B', 'Europe and MENA', 'Online10 healthcare']],
  ['PI', 'Private investor', 'Zurich · direct deals', 86, ['Medtech', '$1-5M tickets', 'Board experience', 'InvestHack #05']],
];
export function MatchCards() {
  const [r, on] = useSeen(0.2);
  const [i, setI] = useState(0);
  const [stage, setStage] = useState(0); // 0 card, 1 review toast, 2 both yes
  useEffect(() => {
    if (!on) return;
    const d = [2200, 1700, 2600][stage];
    const t = setTimeout(() => { if (stage < 2) setStage(stage + 1); else { setStage(0); setI((k) => (k + 1) % M.length); } }, d);
    return () => clearTimeout(t);
  }, [on, stage]);
  const m = M[i];
  return (
    <div className={'mc' + (on ? ' on' : '')} ref={r}>
      <div className="mc-back b2" /><div className="mc-back b1" />
      <div className="mc-card" key={i}>
        <span className="mc-k">New match for your ask</span>
        <div className="mc-top"><span className="mc-av">{m[0]}</span><span><b>{m[1]}</b>{m[2]}</span><em><b>{m[3]}%</b>fit</em></div>
        <div className="mc-why"><p>Why this match</p>{m[4].map((c, k) => <span key={c} style={{ '--k': k }}>{c}</span>)}</div>
        <div className="mc-acts"><span className={'mc-btn' + (stage > 0 ? ' sent' : '')}>{stage > 0 ? 'Intro requested' : 'Request intro'}</span><span className="mc-btn ghost">Later</span></div>
      </div>
      <div className={'mc-toast t1' + (stage >= 1 ? ' show' : '')}><i>✓</i>Your manager reviewed both sides</div>
      <div className={'mc-toast t2' + (stage >= 2 ? ' show' : '')}><i>✓</i>Both said yes · contacts shared</div>
    </div>
  );
}

/* One platform connects it all: three overlapping circles, profile in the middle, outcomes */
const OUT = [['Co-investors & deals', 'Matched to your mandate'], ['Capital & LPs', 'For funds and companies'], ['Peers & hobbies', 'People worth knowing']];
export function VennHub() {
  const [r, on] = useSeen(0.3);
  return (
    <div className={'vh' + (on ? ' on' : '')} ref={r}>
      <div className="vh-venn">
        <div className="vh-c a"><b>Legends10</b><em>Dinners by city</em></div>
        <div className="vh-c b"><b>Legends Online10</b><em>Calls by industry</em></div>
        <div className="vh-c c"><b>InvestHack</b><em>Member sessions</em></div>
        <div className="vh-mid"><img src="/brand/symbol.png" alt="" /><b>Your<br />profile</b></div>
      </div>
      <div className="vh-out">
        <p className="vh-k">What comes out</p>
        {OUT.map(([h, p], k) => <div key={h} style={{ '--k': k }}><b>0{k + 1}</b><span>{h}<em>{p}</em></span></div>)}
      </div>
    </div>
  );
}

/* One platform connects it all: formats -> platform bar -> outcomes (overview layout) */
const FMT = [['01', 'Legends10', 'Dinners by city'], ['02', 'Legends Online10', 'Calls by industry'], ['03', 'InvestHack', 'Member sessions']];
export function StackHub() {
  const [r, on] = useSeen(0.3);
  return (
    <div className={'sh' + (on ? ' on' : '')} ref={r}>
      <p className="sh-lbl"><span>01</span>Where you meet</p>
      <div className="sh-row">{FMT.map(([n, h, p], k) => <div key={h} className="sh-in" style={{ '--k': k }}><span>{n}</span><b>{h}</b><em>{p}</em></div>)}</div>
      <div className="sh-wires">{FMT.map((_, k) => <i key={k} style={{ '--k': k }}><b /></i>)}</div>
      <p className="sh-lbl"><span>02</span>Where it connects</p>
      <div className="sh-bar"><span className="sh-logo"><img src="/brand/symbol.png" alt="" /></span><b>Legends AI platform</b><ul><li>Profile</li><li>Asks</li><li>Matches</li><li>Intros</li></ul></div>
      <div className="sh-wires out">{FMT.map((_, k) => <i key={k} style={{ '--k': k }}><b /></i>)}</div>
      <p className="sh-lbl"><span>03</span>What you get</p>
      <div className="sh-row">{OUT.map(([h, p], k) => <div key={h} className="sh-out" style={{ '--k': k }}><b>{h}</b><em>{p}</em></div>)}</div>
    </div>
  );
}

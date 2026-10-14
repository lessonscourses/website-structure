'use client';
import { useState } from 'react';

// Pretty segmented tabs for the merged Online block
export default function HvTabs({ tabs }) {
  const [i, setI] = useState(0);
  return (
    <div className="htab">
      <div className="htab-bar rv" role="tablist">
        {tabs.map(([t, d], k) => (
          <button key={t} type="button" role="tab" aria-selected={k === i} className={k === i ? 'on' : ''} onClick={() => setI(k)}>
            <b>{t}</b><span>{d}</span>
          </button>
        ))}
        <i className="htab-ind" style={{ '--n': tabs.length, '--i': i }} />
      </div>
      {tabs.map(([t, , c], k) => <div key={t} className={'htab-pane' + (k === i ? ' on' : '')} hidden={k !== i}>{c}</div>)}
    </div>
  );
}

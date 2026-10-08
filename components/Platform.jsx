// Home: AI platform + Personal Legends Manager (chat plays when in view, see data-chat in lib/site.js)
const CHAT = [
  ['me', 'Can’t make Singapore on the 8th. Anything in Dubai or Riyadh?'],
  ['lm', 'Yes: Legends10 Dubai on 14 October, during SuperReturn Middle East week. Or Riyadh on 28 October.'],
  ['me', 'Dubai works.'],
  ['lm', 'Done, your seat is held. The venue comes with your confirmation.'],
];

export default function Platform() {
  return (
    <section className="sec pf" id="platform" style={{ paddingTop: 0 }}><div className="wrap pf-g">
      <div className="pf-l">
        <h2 className="h2 rv">AI platform</h2>
        <p className="pf-sub rv d1">Legends investors worldwide, in one place.</p>
        <div className="pf-ps rv d2">
          <p><span>Problem</span><span className="pf-xw"><s className="pf-x">The right co-investor, peer or hobby partner takes years to find.</s></span></p>
          <p><span>Legends</span><b>AI matches you by your asks, needs and offers.</b></p>
        </div>
        <div className="pf-hm rv d2">
          <h3>A real human on your side</h3>
          <p>Your Personal Legends Manager is one message away: finds matches, makes intros and handles what you need in the network.</p>
          <p className="pf-note">One call maps your mandate. After that, matches come to you.</p>
        </div>
      </div>
      <div className="pf-chat rv d1" data-chat>
        <div className="pf-ch-h"><img src="/brand/symbol.png" alt="" /><span><b>Personal Legends Manager</b><em>Online</em></span></div>
        <ul>
          {CHAT.map(([w, t], i) => <li key={i} className={'pf-m ' + w}>{t}</li>)}
          <li className="pf-m lm pf-ty" aria-hidden="true"><i /><i /><i /></li>
        </ul>
      </div>
    </div></section>
  );
}

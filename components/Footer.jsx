import { EVENTS } from '@/data/events';
import { PRIVACY_URL, TERMS_URL } from '@/data/links';


export default function Footer() {
  return (
    <footer className="ft"><div className="wrap">
      <div className="ft-grid">
        <div>
          <a className="brand" href="/"><img src="/brand/symbol.png" alt="" /><b>LEGENDS</b></a>
          <p className="ft-about">Uniting Legends. Private Investor Network: co-investment, deal flow, additional capital, private events.</p>
        </div>
        <div><h4>October</h4><ul>
          {EVENTS.map((e) => <li key={e.slug}><a href={e.url}>{e.city}, {e.day} {e.month.slice(0, 3)}</a></li>)}
        </ul></div>
        <div><h4>Contact</h4><ul>
          <li><a href="mailto:concierge@legends.app">concierge@legends.app</a></li>
          <li className="muted">AVELYTH PLATFORM LTD</li>
          <li className="muted">Arch. Makariou III, 115, 3021, Limassol, Cyprus</li>
        </ul></div>
      </div>
      <div className="ft-legal">
        <span>© 2026 AVELYTH PLATFORM LTD</span>
        <span className="ft-links"><a href={PRIVACY_URL}>Privacy</a><a href={TERMS_URL}>Terms</a></span>
      </div>
    </div></footer>
  );
}

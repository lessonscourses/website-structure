import { OnlineCard } from './Cards';
import { ONLINE_NEXT } from '@/data/online';

const Arr = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

// Home: Legends Online10 - your industry, worldwide (pins and the industry line animate, see data-o10 in lib/site.js)
const CITIES = [
  // name, x %, y %, label side, label shift (px)
  ['San Francisco', 3.8, 25.0, 'r', 0], ['New York', 20.9, 22.1, 'r', 0],
  ['London', 47.0, 11.3, 'l', 0], ['Amsterdam', 48.8, 10.5, 'r', -10], ['Zurich', 50.0, 15.4, 'r', 4], ['Monaco', 49.7, 19.1, 'l', 8],
  ['Riyadh', 63.5, 38.0, 'l', 4], ['Dubai, Abu Dhabi', 66.6, 37.5, 'r', -10], ['Mumbai', 72.8, 43.7, 'r', 6],
  ['Hong Kong', 87.4, 40.4, 'r', 0], ['Singapore', 83.7, 61.3, 'l', 0],
];
const INDUSTRIES = ['Artificial intelligence', 'Healthcare & biotech', 'Infrastructure & real estate', 'Energy & resources', 'Fintech & private credit'];

export default function Online10() {
  return (
    <section className="sec o1" id="online10"><div className="wrap">
      <div className="o1-g" data-o10>
        <div className="o1-l">
          <h2 className="h2 rv">Legends Online10</h2>
          <p className="pf-sub rv d1">Your industry. Worldwide.</p>
          <p className="o1-lead rv d1">Up to 10 investors at one online table, 1-2 times a month.</p>
          <div className="pf-ps rv d2">
            <p><span>Problem</span><span className="pf-xw"><s className="pf-x">The investors you need are in other cities and time zones.</s></span></p>
            <p><span>Legends</span><b>Networking, deals and insights, without the flight.</b></p>
          </div>
          <p className="o1-ind rv d2"><span>By industry</span><b className="o1-rot" aria-live="off">{INDUSTRIES.map((t, i) => <i key={t} className={i ? '' : 'on'}>{t}</i>)}</b></p>
          <p className="o1-flow rv d2"><span>At every call</span><span className="o1-fl">Short intros <em>→</em> Asks & gives <em>→</em> Networking</span></p>
        </div>
        <div className="o1-r rv d1">
          <p className="o1-k">Members and guests from</p>
          <div className="o1-map">
            <img src="/brand/world-dots.svg" alt="" />
            {CITIES.map(([n, x, y, s, dy], i) => (
              <span key={n} className={'o1-pin ' + s} style={{ left: x + '%', top: y + '%', '--i': i, '--dy': dy + 'px' }}><i /><b>{n}</b></span>
            ))}
          </div>
          <p className="o1-list">{CITIES.map(([n]) => n).join(' · ')}</p>
        </div>
      </div>
      <div className="o1-next rv">
        <p className="o1-k">Next online session · InvestHack</p>
        <OnlineCard s={ONLINE_NEXT} />
        <a className="more" href="/events/online">All online sessions <Arr /></a>
      </div>
    </div></section>
  );
}

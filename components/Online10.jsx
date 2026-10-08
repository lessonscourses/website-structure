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
const GLOBE_CITIES = [['San Francisco', 37.8, -122.4], ['New York', 40.7, -74], ['London', 51.5, -0.1], ['Amsterdam', 52.4, 4.9, 0], ['Zurich', 47.4, 8.5, 0], ['Monaco', 43.7, 7.4, 0], ['Riyadh', 24.7, 46.7, 0], ['Dubai, Abu Dhabi', 25.2, 55.3], ['Mumbai', 19.1, 72.9], ['Hong Kong', 22.3, 114.2], ['Singapore', 1.35, 103.8]];
const INDUSTRIES = ['Artificial intelligence', 'Healthcare & biotech', 'Infrastructure & real estate', 'Energy & resources', 'Fintech & private credit'];

export default function Online10() {
  return (
    <section className="sec o1" id="online10"><div className="wrap">
      <div className="o1-g2">
        <div className="o1-l">
          <div className="bh">
            <h2 className="h2 rv">Legends Online10</h2>
            <p className="pf-sub rv d1">Your industry. Worldwide.</p>
            <p className="bh-tx rv d1">Up to 10 investors at one online table, 1-2 times a month. Networking, deals and insights, without the flight.</p>
          </div>
          <div className="o1-facts rv d2" data-o10>
            <p><span>By industry</span><b className="o1-rot" aria-live="off">{INDUSTRIES.map((t, i) => <i key={t} className={i ? '' : 'on'}>{t}</i>)}</b></p>
            <p><span>At every call</span><b>Short intros <em>→</em> Asks & gives <em>→</em> Networking</b></p>
          </div>
        </div>
        <div className="o1-globe rv d1"><canvas data-globe={JSON.stringify(GLOBE_CITIES)} aria-label="Members and guests from 11 cities" role="img" /></div>
      </div>
      <div className="o1-next rv">
        <p className="o1-k">Next online session · InvestHack</p>
        <OnlineCard s={ONLINE_NEXT} />
        <a className="more" href="/events/online">All online sessions <Arr /></a>
      </div>
    </div></section>
  );
}

// Home: Legends10 - in person, by city, with the upcoming dinners as a compact list
import { EventRow } from './Cards';

const Arr = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

export default function Legends10({ events }) {
  return (
    <section className="sec l10" id="legends10"><div className="wrap">
      <div className="o1-g">
        <div className="o1-l">
          <h2 className="h2 rv">Legends10</h2>
          <p className="pf-sub rv d1">Up to 10 investors. One table.</p>
          <p className="o1-lead rv d1">In person, by city: private dinners during the biggest global investor summits.</p>
          <div className="pf-ps rv d2">
            <p><span>Problem</span><span className="pf-xw"><s className="pf-x">Global events: thousands of people, no selection.</s></span></p>
            <p><span>Legends</span><b>Reviewed investors only. Premium venues. One table.</b></p>
          </div>
        </div>
        <div className="o1-r rv d1">
          <p className="o1-k">Upcoming dinners</p>
          <div className="up-list">
            {events.map((e, i) => <div key={e.slug} className={'rv d' + (i % 4)}><EventRow e={e} /></div>)}
          </div>
          <a className="more" href="/events">All dinners <Arr /></a>
        </div>
      </div>
    </div></section>
  );
}

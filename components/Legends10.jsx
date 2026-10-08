// Home: Legends10 - ten seats instead of thousands of people, then the upcoming dinners as columns
import Seats from './Seats';

const Arr = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

export default function Legends10({ events }) {
  return (
    <section className="sec l10" id="legends10"><div className="wrap">
      <div className="bh">
        <h2 className="h2 rv">Legends10</h2>
        <p className="pf-sub rv d1">Up to 10 investors. One table.</p>
        <p className="bh-tx rv d1">In person, by city: private dinners during the biggest global investor summits.</p>
      </div>
      <div className="l10-n rv d1">
        <div className="l10-s off"><b><s className="pf-x">1,000s</s></b><span>people at a global summit. No selection.</span></div>
        <div className="l10-s on"><div className="l10-top"><b>10</b><Seats /></div><span>reviewed investors at one table. Premium venues.</span></div>
      </div>
      <div className="l10-row">
        {events.map((e, i) => (
          <a key={e.slug} href={e.url} className={'l10-ev rv d' + (i % 4)}>
            <span className="l10-d">{e.day} {e.month.slice(0, 3)}, {e.dow}</span>
            <b>{e.city}</b>
            <span className="l10-w">{e.week} week</span>
            <span className="l10-t">{e.time}<Arr /></span>
          </a>
        ))}
      </div>
      <a className="more rv" href="/events">All dinners <Arr /></a>
    </div></section>
  );
}

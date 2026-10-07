import HeroDust from '@/components/HeroDust';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Join from '@/components/Join';
import { ApplyButton } from '@/components/ApplyModal';
import { Upcoming, OnlineCard } from '@/components/Cards';
import { upcoming } from '@/data/events';
import { ONLINE_NEXT } from '@/data/online';
import { ESSAYS } from '@/data/blog';

const Arr = ({ c = 'arr' }) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

const WAYS = [
  ['Online by sector', 'Members meet in sector groups to share deals, mandates and market views with investors who work in the same space.'],
  ['In person by city', 'Private dinners for ten investors in the cities where capital meets - during the weeks when the right people are already in town.'],
  ['Connected through our platform', 'Deals, asks and introductions in one place, so the right person is easy to reach between events.'],
];
const GIVES = [
  ['Deal flow', 'Opportunities shared by investors, often before they reach an open process.'],
  ['Co-investment', 'Partners for the deals you are already working on.'],
  ['Additional capital', 'Capital for what you are building, from people who understand it.'],
  ['Private events', 'Small, selected tables in key investor cities and live sessions online.'],
];

export default function Home() {
  const events = upcoming();
  return (
    <>
      <Header dark />

      {/* ===== Hero ===== */}
      <HeroDust />

      {/* ===== About ===== */}
      <section className="sec about" id="about"><div className="wrap">
        <p className="lit" data-lit>
          You do not need more contacts. / You need the right ones. Legends brings together the people who deploy capital -
          private investors, family offices, fund managers, GPs, LPs and allocators.
        </p>
        <div className="ways">
          {WAYS.map(([h, p], i) => (
            <div key={h} className={'way rv d' + i}><h3>{h}</h3><p>{p}</p></div>
          ))}
        </div>
        <ul className="gives">
          {GIVES.map(([h, p], i) => <li key={h} className={'rv d' + i}><b>{h}</b><span>{p}</span></li>)}
        </ul>
      </div></section>

      <div className="mq" aria-hidden="true"><div className="mq-in" data-drift>SINGAPORE · DUBAI · ABU DHABI · RIYADH · LONDON · NEW YORK · ZURICH · PALM BEACH · ONLINE ·</div></div>

      {/* ===== Events ===== */}
      <section className="sec" id="events"><div className="wrap">
        <div className="sec-head rv">
          <h2 className="h2">Events</h2>
          <p className="lead">In person in key investor cities, online every month. Small rooms, selected guests, no stage and no pitches.</p>
        </div>

        <div className="track rv">
          <div className="track-h"><h3>In person</h3><p>Private dinners for ten investors, in the week a major investor event brings the right people to town.</p></div>
        </div>
        <Upcoming events={events} />

        <div className="track rv" style={{ marginTop: 'clamp(48px,6vw,80px)' }}>
          <div className="track-h"><h3>Online</h3><p>Legends Online - a monthly live session with a top investor, then a closed discussion with the room.</p></div>
        </div>
        <div className="rv"><OnlineCard s={ONLINE_NEXT} /></div>

        <a className="more rv" href="/events">All events <Arr c="" /></a>
      </div></section>

      {/* ===== Blog ===== */}
      <section className="sec" id="blog" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="bc-hd rv">
          <h2 className="h2">From the blog</h2>
          <div className="bc-nav">
            <a className="more" href="/blog">All stories <Arr c="" /></a>
            <button type="button" className="prev" data-carousel-step="-1" aria-label="Previous"><Arr c="" /></button>
            <button type="button" data-carousel-step="1" aria-label="Next"><Arr c="" /></button>
          </div>
        </div>
        <div className="bc rv" data-carousel>
          {ESSAYS.map((e) => (
            <a key={e.url} href={e.url}>
              <span className="bc-cov"><img src={e.img} alt="" loading="lazy" /></span>
              <span className="bc-au">{e.author} <span>· {e.role}</span></span>
              <h3>{e.title}</h3>
            </a>
          ))}
        </div>
        <div className="bc-bar"><i data-carousel-bar /></div>
      </div></section>

      <Join />
      <Footer />
    </>
  );
}

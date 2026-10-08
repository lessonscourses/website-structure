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
  ['Online', 'by sector', 'Sector rooms to share deals, mandates and market views.'],
  ['In person', 'by city', 'Private dinners for ten, in the weeks capital meets.'],
  ['Platform', 'in between', 'Deals, asks and introductions in one place.'],
];
const GIVES = ['Deal flow', 'Co-investment', 'Additional capital', 'Private events'];

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
          You do not need more contacts. / You need the right ones - the people who deploy capital.
        </p>
        <ol className="ways2">
          {WAYS.map(([h, k, p], i) => (
            <li key={h} className={'rv d' + i}><span className="w2-n">0{i + 1}</span><h3>{h} <em>{k}</em></h3><p>{p}</p></li>
          ))}
        </ol>
        <div className="gives3 rv"><span className="g3-k">What members get</span><ul>{GIVES.map((g, i) => <li key={g} style={{ '--i': i }}>{g}</li>)}</ul></div>
      </div></section>

      <div className="mq" aria-hidden="true"><div className="mq-in" data-drift>SINGAPORE · DUBAI · ABU DHABI · RIYADH · LONDON · NEW YORK · ZURICH · PALM BEACH · ONLINE ·</div></div>

      {/* ===== Events ===== */}
      <section className="sec" id="events"><div className="wrap">
        <div className="sec-head rv"><h2 className="h2">Events</h2></div>

        <p className="tag2 rv"><i />In person</p>
        <Upcoming events={events} />

        <p className="tag2 on rv" style={{ marginTop: 'clamp(44px,5vw,70px)' }}><i />Online</p>
        <div className="rv"><OnlineCard s={ONLINE_NEXT} /></div>

        <div className="more-row rv"><a className="more" href="/events">All dinners <Arr c="" /></a><a className="more" href="/events/online">All online sessions <Arr c="" /></a></div>
      </div></section>

      {/* ===== Blog ===== */}
      <section className="sec" id="blog" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="bc-hd rv">
          <h2 className="h2">From the blog</h2>
          <div className="bc-nav">
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
        <div className="more-row rv"><a className="more" href="/blog">All stories <Arr c="" /></a></div>
      </div></section>

      <Join />
      <Footer />
    </>
  );
}

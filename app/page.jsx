import HeroDust from '@/components/HeroDust';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Join from '@/components/Join';
import Platform from '@/components/Platform';
import Online10 from '@/components/Online10';
import { ApplyButton } from '@/components/ApplyModal';
import Legends10 from '@/components/Legends10';
import { upcoming } from '@/data/events';
import { ONLINE_NEXT } from '@/data/online';
import { ESSAYS } from '@/data/blog';

const Arr = ({ c = 'arr' }) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

const WAYS = [
  ['Legends10', 'In person, by city'],
  ['Online', 'Legends Online10, InvestHack'],
  ['AI platform', 'Matches, every day'],
];
const GIVES = ['Deal flow', 'Co-investment', 'Additional capital', 'Private events'];

export default function Home() {
  const events = upcoming();
  return (
    <>
      <Header dark />
      <main className="home">

      {/* ===== Hero ===== */}
      <HeroDust />

      {/* ===== About ===== */}
      <section className="sec about" id="about"><div className="wrap">
        <p className="lit" data-lit>
          You do not need more contacts. / You need the right ones - the people who deploy capital.
        </p>
        <ol className="ways2">
          {WAYS.map(([h, p], i) => (
            <li key={h} className={'rv d' + i}><span className="w2-n">0{i + 1}</span><h3>{h}</h3><p>{p}</p></li>
          ))}
        </ol>
        <div className="gives3 rv"><span className="g3-k">What members get</span><ul>{GIVES.map((g, i) => <li key={g} style={{ '--i': i }}>{g}</li>)}</ul></div>
      </div>
        <div className="mq" aria-hidden="true"><div className="mq-in" data-drift>SINGAPORE · DUBAI · ABU DHABI · RIYADH · LONDON · NEW YORK · HONG KONG · MONACO · ONLINE ·</div></div>
      </section>

      <Legends10 events={events} />
      <Online10 />

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

      <Platform />
      <Join />
      </main>
      <Footer />
    </>
  );
}

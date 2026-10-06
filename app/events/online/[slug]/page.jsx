import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PastList, OnlineCard } from '@/components/Cards';
import { ONLINE_RECAPS, ONLINE_PAST, ONLINE_NEXT, recap } from '@/data/online';
import '../../../online.css';

// Recap of a past Legends Online session (InvestHack). Content: ONLINE_RECAPS in data/online.js.
export const generateStaticParams = () => ONLINE_RECAPS.map((r) => ({ slug: r.slug }));
export async function generateMetadata({ params }) {
  const r = recap((await params).slug);
  return r ? { title: `${r.title} - Legends Online recap`, description: r.lead } : {};
}

const Arr = () => <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

export default async function Recap({ params }) {
  const r = recap((await params).slug);
  if (!r) notFound();
  const others = ONLINE_PAST.filter((p) => !p.url.endsWith(r.slug));
  return (
    <>
      <Header cta={{ href: ONLINE_NEXT.url, label: 'Next session' }} />

      <section className="h-hero rc-hero" id="top">
        <div className="h-no" aria-hidden="true">{r.no}</div>
        <div className="wrap h-in">
          <div className="h-copy">
            <p className="h-kick rv"><span>InvestHack #{r.no}</span><i /><span>Recap</span></p>
            <h1 className="rv d1">{r.title}</h1>
            <p className="lead rv d2">{r.lead}</p>
            <p className="rc-when rv d2"><b>{r.date}</b>{r.times.map(([c, t]) => <span key={c}>{t} {c}</span>)}</p>
            <div className="h-cta rv d3">
              {r.video && <a className="btn gold big" href="#recap">Watch the recap <Arr /></a>}
              <a className="more" href="#speaker">Meet the speaker <Arr /></a>
            </div>
          </div>
          <div className="h-port rv d2">
            <span className="h-ring r1" /><span className="h-ring r2" />
            <img src={r.hero} alt={r.speaker} />
            <p className="h-sig"><b>{r.speaker}</b>{r.role.split(' · ')[0]}</p>
          </div>
        </div>
      </section>

      <section className="sec" id="recap"><div className="wrap">
        <div className="rc-head rv">
          <h2 className="h2">What happened in the room</h2>
          <p className="lead">{r.room}</p>
        </div>
        {r.video
          ? <div className="rc-video rv"><video controls playsInline preload="metadata" poster={r.shots[0]}><source src={r.video} type="video/mp4" /></video></div>
          : <p className="rc-soon rv">The full recording is coming soon.</p>}
        <div className="rc-row">
          <ol className="ib-r rc-hl">{r.highlights.map((h, i) => <li key={h} className={'rv d' + i}><b>{String(i + 1).padStart(2, '0')}</b><div><p>{h}</p></div></li>)}</ol>
          <figure className="rc-pull rv d1"><blockquote>“{r.pull}”</blockquote><figcaption>{r.speaker}</figcaption></figure>
        </div>
      </div></section>

      <section className="sec" id="speaker" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="d-spk2">
          <div className="d-cut rv"><span className="d-glow" /><img src={r.photo} alt={r.speaker} /></div>
          <div className="d-spk-tx">
            <h2 className="h2 rv">{r.speaker}</h2>
            <p className="d-role rv d1">{r.role}</p>
            <div className="d-bio rv d2"><p>{r.bio}</p></div>
            {r.quote && <blockquote className="rc-q rv d2">“{r.quote}”</blockquote>}
          </div>
        </div>
        <div className="rc-focus">{r.focus.map(([k, v], i) => <div key={v} className={'rv d' + i}>{k ? <b>{k}</b> : <b aria-hidden="true">&nbsp;</b>}<p>{v}</p></div>)}</div>
        {r.stats && <div className="rc-stats">{r.stats.map(([v, k], i) => <div key={k} className={'rv d' + i}><b>{v}</b><span>{k}</span></div>)}</div>}
      </div></section>

      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="rc-next rv">
          <h2 className="h2">Next session</h2>
          <OnlineCard s={ONLINE_NEXT} />
        </div>
      </div></section>

      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head rv"><h2 className="h2">Previous sessions</h2></div>
        <PastList items={others} />
      </div></section>
      <Footer />
    </>
  );
}

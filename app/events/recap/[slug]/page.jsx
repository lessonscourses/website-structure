import Crumbs from '@/components/Crumbs';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { RECAPS, PAST_DINNERS, pastDinner, upcoming } from '@/data/events';
import { DinnerCard } from '@/components/Cards';

// Recap of a past dinner: same look as the dinner page, without seats, form, time or venue.
export const dynamicParams = false;
export const generateStaticParams = () => RECAPS.map((e) => ({ slug: e.slug }));
export async function generateMetadata({ params }) {
  const e = pastDinner((await params).slug);
  return e ? { title: `Legends10 ${e.city} recap - ${e.day} ${e.month}`, description: e.lead } : {};
}

const Arr = ({ c = 'arr' }) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

export default async function DinnerRecap({ params }) {
  const e = pastDinner((await params).slug);
  if (!e) notFound();
  const next = upcoming();
  const others = PAST_DINNERS.slice(0, 3);
  return (
    <>
      <Header dark cta={next[0] ? { href: next[0].url, label: 'Next dinner' } : undefined} />
      <div className="evp">
        {/* Hero: the evening itself */}
        <section className="eh dr-hero">
        <div className="wrap cb-wrap"><Crumbs dark items={[['Dinners', '/events'], [`${e.city} recap`]]} /></div>
          <div className="eh-bg" aria-hidden="true"><img src={e.cover} alt="" /><i className="eh-shade" /></div>
          <div className="eh-city" data-drift aria-hidden="true">{Array.from({ length: 6 }, () => e.city.toUpperCase()).join(' · ')} ·</div>
          <div className="wrap eh-in">
            <p className="eh-when rv">Recap · {e.city} · {e.day} {e.month} 2026</p>
            <h1 className="eh-h rv d1"><b>One table in {e.city}.</b><br /><span>Ten investors,<br />one evening.</span></h1>
            <p className="eh-lead rv d2">{e.lead}</p>
            <a className="btn gold big rv d3" href="#gallery">See the evening <Arr /></a>
          </div>
        </section>

        {/* The evening in numbers */}
        <div className="dr-stats"><div className="wrap">
          {e.stats.map(([v, k], i) => <div key={k} className={'rv d' + i}><b>{v}</b><span>{k}</span></div>)}
        </div></div>

        {/* Story */}
        <section className="sec"><div className="wrap dr-story">
          <h2 className="h2 rv">How the evening went</h2>
          <div className="dr-text rv d1">{e.story.map((p, i) => <p key={i}>{p}</p>)}</div>
          <div className="dr-themes rv d2"><b>On the table</b><ul>{e.themes.map((t) => <li key={t}>{t}</li>)}</ul></div>
        </div></section>

        {/* Gallery: own photos (and video if there is one) */}
        <section className="sec" id="gallery" style={{ paddingTop: 0 }}><div className="wrap">
          <div className="sec-head rv"><h2 className="h2">The evening</h2></div>
          <div className={'dr-gal rv' + (e.video ? ' has-v' : '')}>
            {e.video && <div className="v"><video autoPlay muted loop playsInline poster={e.photos[0]}><source src={e.video} type="video/mp4" /></video></div>}
            {e.photos.slice(0, e.video ? 4 : 5).map((p, i) => <div key={i} className="ph" style={{ backgroundImage: `url(${p})` }} />)}
          </div>
        </div></section>

        {/* Outcomes, as on the dinner page */}
        <section className="oc-band"><div className="wrap oc-band-in">
          <h2 className="h2 rv">One evening.<br />One relationship<br />may be enough.</h2>
          <figure className="dr-q rv d1">
            <blockquote>“Every deal I regret started with the wrong introduction. Every deal I’m proud of started with the right one.”</blockquote>
            <figcaption><b>Yanis Chkhatval</b>Private investor and entrepreneur, founder of Legends</figcaption>
          </figure>
        </div></section>

        {/* What next */}
        {next.length > 0 && (
          <section className="sec"><div className="wrap">
            <div className="sec-head rv"><h2 className="h2">Next investor dinners</h2></div>
            <div className="nx">
              {next.map((o) => <div key={o.slug} className="nx-row"><b>{o.city}</b><span className="nx-d">{o.day} {o.month.slice(0, 3)}</span><span className="nx-w">{o.week} week</span><a className="nx-go" href={o.url}>View</a></div>)}
            </div>
          </div></section>
        )}
        {others.length > 0 && (
          <section className="sec" style={{ paddingTop: 0 }}><div className="wrap">
            <div className="sec-head rv"><h2 className="h2">Past dinners</h2></div>
            <div className="dr-more">{others.map((o, i) => <DinnerCard key={o.slug} e={o} i={i} />)}</div>
          </div></section>
        )}
      </div>
      <Footer />
    </>
  );
}


import Crumbs from '@/components/Crumbs';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MEDIA, RECAPS, PAST_DINNERS, pastDinner, upcoming } from '@/data/events';
import { PastList, asPast } from '@/components/Cards';

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
        <div className="wrap cb-wrap"><Crumbs dark items={[['Legends10', '/events'], [`${e.city} recap`]]} /></div>
          <div className="eh-bg" aria-hidden="true">
            <video autoPlay muted loop playsInline preload="auto" poster={`${MEDIA}/img/evening-1.jpg`}><source src={e.heroVideo || `https://legends.app/events/${e.event || e.slug}/media/hero.mp4`} type="video/mp4" /></video>
            <i className="eh-shade" />
          </div>
          <div className="eh-city" data-drift aria-hidden="true">{Array.from({ length: 6 }, () => e.city.toUpperCase()).join(' · ')} ·</div>
          <div className="wrap eh-in">
            <p className="eh-when rv">Recap · {e.city} · {e.day} {e.month} 2026</p>
            <h1 className="eh-h rv d1"><b>One table in {e.city}.</b><br /><span>Ten investors,<br />one evening.</span></h1>
            <p className="eh-lead rv d2">{e.lead}</p>
            <a className="btn gold big rv d3" href="#gallery">See the evening <Arr /></a>
          </div>
        </section>

        {/* Story: one column - big opening line, the rest, numbers, themes */}
        <section className="sec rc2"><div className="wrap">
          <div className="rc2-col">
            <p className="rc2-open rv d1">{e.story[0]}</p>
            <div className="rc2-text rv d1">{e.story.slice(1).map((p, i) => <p key={i}>{p}</p>)}</div>
          </div>
          <div className="rc3 rv d2">
            <dl className="rc3-facts">{e.stats.map(([v, k]) => { const [a, ...b] = k.split(' '); return <div key={k}><dt>{v}</dt><dd>{a}<br />{b.join(' ')}</dd></div>; })}</dl>
            <p className="rc3-themes"><span>On the table:</span> {e.themes.join(', ')}.</p>
          </div>
        </div></section>

        {/* Photos: layout adapts to 1, 2, 3 or more photos; short note below */}
        {e.photos?.length > 0 && (
          <section className="sec" id="gallery" style={{ paddingTop: 0 }}><div className="wrap">
            <div className={'rc2-gal rv n' + Math.min(e.photos.length, 4)}>
              {e.photos.slice(0, 4).map((p, i) => <figure key={i}><img src={p} alt="" loading="lazy" /></figure>)}
            </div>
            {e.note && <div className="rc2-note rv d1"><i /><p>{e.note}</p></div>}
          </div></section>
        )}

        {/* Outcomes, as on the dinner page */}
        <section className="oc-band rc2-q"><div className="wrap">
          <h2 className="h2 rv">One evening. One relationship may be enough.</h2>
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
            <PastList items={others.map(asPast)} kind="In person" />
          </div></section>
        )}
      </div>
      <Footer />
    </>
  );
}


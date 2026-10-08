import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import { FeaturedEvent, EventCard, DinnerCard } from '@/components/Cards';
import { upcoming, PAST_DINNERS } from '@/data/events';

export const metadata = { title: 'Private dinners - Legends', description: 'Private dinners for ten investors in key investor cities.' };

export default function Events() {
  const events = upcoming();
  return (
    <>
      <Header />
      <PageHero crumbs={[['Dinners']]} word="SINGAPORE · DUBAI · ABU DHABI · RIYADH ·" title={<>Private <em>dinners</em></>} lead="Ten investors at one private table, in the cities where capital meets. Selected guests, investors only." />

      <section className="sec ev-sec" data-track="offline" id="in-person" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head rv">
          <h2 className="h2">Upcoming dinners</h2>
          <p className="lead">Ten active investors at one private table, in the week a major investor event brings the right people to town.</p>
        </div>
        <div className="rv"><FeaturedEvent e={events[0]} wide /></div>
        <div className="ev-grid three">
          {events.slice(1).map((e, i) => <div key={e.slug} className={'rv d' + i}><EventCard e={e} /></div>)}
        </div>
        <p className="note rv">More cities for November and December will be announced here.</p>
        <div className="past-h rv"><h3>Past dinners</h3><span>{PAST_DINNERS.length} dinners</span></div>
        <div className="dr-grid" data-paged="5">{PAST_DINNERS.map((e, i) => <DinnerCard key={e.slug} e={e} i={i} />)}</div>
      </div></section>

      <Footer />
    </>
  );
}

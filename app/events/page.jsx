import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import { EventCard, PastList, asPast } from '@/components/Cards';
import { upcoming, PAST_DINNERS } from '@/data/events';

export const metadata = { title: 'Legends10 - Legends', description: 'Up to 10 investors at one table. Private dinners by city, during the biggest global investor summits.' };

export default function Events() {
  const events = upcoming();
  return (
    <>
      <Header />
      <PageHero crumbs={[['Legends10']]} word="SINGAPORE · DUBAI · ABU DHABI · RIYADH ·" title={<>Legends<em>10</em></>} lead="Up to 10 investors. One table. In person, by city: private dinners during the biggest global investor summits." />

      <section className="sec ev-sec" data-track="offline" id="in-person" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head rv">
          <h2 className="h2">Upcoming dinners</h2>
          <p className="lead">Ten active investors at one private table, in the week a major investor event brings the right people to town.</p>
        </div>
        <div className="ev-grid ev-all">
          {events.map((e, i) => <div key={e.slug} className={'rv d' + (i % 4)}><EventCard e={e} /></div>)}
        </div>
        <p className="note rv">More cities for November and December will be announced here.</p>
        <div className="past-h rv"><h3>Past dinners</h3><span>{PAST_DINNERS.length} dinners</span></div>
        <PastList items={PAST_DINNERS.map(asPast)} paged={10} kind="In person" />
      </div></section>

      <Footer />
    </>
  );
}

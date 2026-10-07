import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import { EventsCollage } from '@/components/HeroMedia';
import Footer from '@/components/Footer';
import { FeaturedEvent, EventCard, PastList, NoEvents, DinnerCard } from '@/components/Cards';
import { upcoming, PAST_DINNERS } from '@/data/events';
import { ONLINE_NEXT, ONLINE_PAST } from '@/data/online';

export const metadata = { title: 'Events - Legends', description: 'Private dinners for ten investors in key investor cities and monthly live sessions online.' };

export default function Events() {
  const events = upcoming();
  const nextOnline = new Date(ONLINE_NEXT.iso + 'T23:59:59Z') >= new Date()
    ? [{ ...ONLINE_NEXT, title: ONLINE_NEXT.title, date: `${ONLINE_NEXT.dow}, ${ONLINE_NEXT.day} ${ONLINE_NEXT.month.slice(0, 3)} 2026`, label: 'Upcoming', img: ONLINE_PAST[0].img, next: true }] : [];
  return (
    <>
      <Header />
      <PageHero aside={<EventsCollage events={events} />} word="SINGAPORE · DUBAI · ABU DHABI · RIYADH · ONLINE ·" title="Events" lead="In person in key investor cities, online every month. Small rooms, selected guests - investors only." />

      <section className="sec ev-sec" data-track="offline" id="in-person" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head rv">
          <h2 className="h2">In person: private investor dinners</h2>
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

      <section className="sec ev-sec" data-track="online" id="online" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head rv">
          <h2 className="h2">Online: Legends Online</h2>
          <p className="lead">Once a month, a top investor shares how they decide - a 30-minute talk, then a closed discussion with the room. Small group, cameras on.</p>
        </div>
        {nextOnline.length === 0 ? <NoEvents /> : <div className="on-next rv"><PastList items={nextOnline} /></div>}
        <div className="past-h rv"><h3>Past sessions</h3><span>{ONLINE_PAST.length} sessions</span></div>
        <PastList items={ONLINE_PAST} paged={10} />
      </div></section>

      <Footer />
    </>
  );
}

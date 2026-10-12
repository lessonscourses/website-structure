import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import { PastList, NoEvents, SessionCard } from '@/components/Cards';
import { ONLINE_NEXT, ONLINE_PAST } from '@/data/online';

export const metadata = { title: 'InvestHack - Legends', description: 'Inside members’ playbooks. Members share how they decide. Live Q&A, online.' };

export default function InvestHack() {
  const nextOnline = new Date(ONLINE_NEXT.iso + 'T23:59:59Z') >= new Date()
    ? [{ ...ONLINE_NEXT, date: `${ONLINE_NEXT.dow}, ${ONLINE_NEXT.day} ${ONLINE_NEXT.month.slice(0, 3)} 2026`, label: 'Upcoming', img: ONLINE_PAST[0].img, next: true }] : [];
  return (
    <>
      <Header />
      <PageHero crumbs={[['InvestHack']]} word="INVESTHACK · LIVE Q&A ·" title={<>Invest<em>Hack</em></>} lead="Inside members’ playbooks. Members share how they decide. Live Q&A, online." />
      <section className="sec ev-sec" data-track="online" id="investhack" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="past-h rv" style={{ marginTop: 0 }}><h3>Next session</h3></div>
        {nextOnline.length === 0 ? <NoEvents /> : <div className="ev-grid ev-all"><div className="rv"><SessionCard s={ONLINE_NEXT} img={ONLINE_PAST[0].img} /></div></div>}
        <div className="past-h rv"><h3>Past sessions</h3><span>{ONLINE_PAST.length} sessions</span></div>
        <PastList items={ONLINE_PAST} paged={10} />
      </div></section>

      <Footer />
    </>
  );
}

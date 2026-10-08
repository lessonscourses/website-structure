import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import { PastList, NoEvents } from '@/components/Cards';
import { ONLINE_NEXT, ONLINE_PAST, ONLINE_RECAPS } from '@/data/online';

export const metadata = { title: 'Online - Legends', description: 'Legends Online10: up to 10 investors at one online table, by industry. InvestHack: members open their playbook, live Q&A.' };

export default function Online() {
  const nextOnline = new Date(ONLINE_NEXT.iso + 'T23:59:59Z') >= new Date()
    ? [{ ...ONLINE_NEXT, date: `${ONLINE_NEXT.dow}, ${ONLINE_NEXT.day} ${ONLINE_NEXT.month.slice(0, 3)} 2026`, label: 'Upcoming', img: ONLINE_PAST[0].img, next: true }] : [];
  return (
    <>
      <Header />
      <PageHero crumbs={[['Online']]} word="ONLINE10 · INVESTHACK ·" title={<>Legends <em>Online</em></>} lead="Two formats: Legends Online10 - up to 10 investors at one online table, by industry. InvestHack - members open their playbook, live Q&A." />
      <section className="sec o10-sec" id="online10" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="o10">
          <div className="o10-l rv">
            <h2 className="h2">Legends Online<em>10</em></h2>
            <p className="o10-sub">Your industry. Worldwide.</p>
          </div>
          <div className="o10-r rv d1">
            <p className="o10-lead">Up to 10 investors at one online table, 1-2 times a month. Networking, deals and insights, without the flight.</p>
            <ul className="o10-list">
              <li><b>At every call</b><span>Short intros · Asks & gives · Networking</span></li>
              <li><b>By industry</b><span>Artificial intelligence · Healthcare & biotech · Infrastructure & real estate · Energy & resources · Fintech & private credit · Many more</span></li>
              <li><b>Who joins</b><span>Family offices · Fund managers · LPs & allocators · Private investors</span></li>
            </ul>
            <button type="button" className="more o10-cta" data-open="apply">For members - apply to join</button>
          </div>
        </div>
      </div></section>

      <section className="sec ev-sec" data-track="online" id="investhack" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head rv">
          <h2 className="h2">InvestHack</h2>
          <p className="o10-sub">Members open their playbook. Live Q&A, online.</p>
        </div>
        <div className="past-h rv" style={{ marginTop: 0 }}><h3>Next session</h3></div>
        {nextOnline.length === 0 ? <NoEvents /> : <div className="on-next rv"><PastList items={nextOnline} /></div>}
        <div className="past-h rv"><h3>Past sessions</h3><span>{ONLINE_PAST.length} sessions</span></div>
        <PastList items={ONLINE_PAST} paged={10} />
      </div></section>

      <Footer />
    </>
  );
}

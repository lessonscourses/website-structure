import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import { NoEvents, SessionCard } from '@/components/Cards';
import { ONLINE10 } from '@/data/online';

export const metadata = { title: 'Legends Online10 - Legends', description: 'Your industry. Worldwide. Up to 10 investors per online session, once or twice a month.' };

const WHO = [['Family offices', 'Principals, CIOs'], ['Fund managers', 'VC, PE, private credit'], ['LPs & allocators', 'Funds and strategies'], ['Private investors', 'Angels and direct investors']];

export default function Online10Page() {
  const now = new Date();
  const next = ONLINE10.filter((t) => new Date(t.iso + 'T23:59:59Z') >= now);
  const past = ONLINE10.filter((t) => new Date(t.iso + 'T23:59:59Z') < now);
  return (
    <>
      <Header />
      <PageHero crumbs={[['Legends Online10']]} word="ONLINE10 · YOUR INDUSTRY · WORLDWIDE ·" title={<>Legends Online<em>10</em></>} lead="Your industry. Worldwide. Up to 10 investors per online session, once or twice a month. Networking, deals and insights, without the flight." />
      <section className="sec ev-sec" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="past-h rv" style={{ marginTop: 0 }}><h3>Next session</h3></div>
        {next.length === 0 ? <NoEvents /> : (
          <div className="ev-grid ev-all">{next.map((t, i) => <div key={t.slug} className={'rv d' + i}><SessionCard s={t} tag="Online10" img="/brand/online10-card.jpg" name={t.industry} text="Up to 10 investors per online session. Short intros, asks & offers, networking." /></div>)}</div>
        )}
        <ul className="ab-cols four rv" style={{ marginTop: 'clamp(48px,5vw,80px)' }}>{WHO.map(([h, p]) => <li key={h}><b>{h}</b><span>{p}</span></li>)}</ul>
        <div className="past-h rv"><h3>Past sessions</h3><span>{past.length} sessions</span></div>
        {past.length === 0 ? <p className="note rv">No past Online10 sessions yet. The first one is on the way.</p> : (
          <div className="ev-grid ev-all">{past.map((t) => <div key={t.slug}><SessionCard s={t} tag="Online10" img="/brand/online10-card.jpg" name={t.industry} text={t.lead} /></div>)}</div>
        )}
      </div></section>
      <Footer />
    </>
  );
}

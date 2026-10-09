import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import { PastList, NoEvents, SessionCard } from '@/components/Cards';
import { ONLINE_NEXT, ONLINE_PAST, ONLINE_RECAPS, ONLINE10 } from '@/data/online';

export const metadata = { title: 'Online - Legends', description: 'Legends Online10: up to 10 investors at one online table, by industry. InvestHack: members open their playbook, live Q&A.' };

export default function Online() {
  const nextOnline = new Date(ONLINE_NEXT.iso + 'T23:59:59Z') >= new Date()
    ? [{ ...ONLINE_NEXT, date: `${ONLINE_NEXT.dow}, ${ONLINE_NEXT.day} ${ONLINE_NEXT.month.slice(0, 3)} 2026`, label: 'Upcoming', img: ONLINE_PAST[0].img, next: true }] : [];
  const tables = ONLINE10.filter((t) => new Date(t.iso + 'T23:59:59Z') >= new Date());
  return (
    <>
      <Header />
      <PageHero crumbs={[['Online']]} word="ONLINE10 · INVESTHACK ·" title={<>Legends <em>Online</em></>} lead="Two formats: Legends Online10 - up to 10 investors at one online table, by industry. InvestHack - members open their playbook, live Q&A." />
      <section className="sec ev-sec" data-track="online" id="investhack" style={{ paddingTop: 0 }} data-filter="all"><div className="wrap">
        <div className="ftabs rv" role="tablist" aria-label="Filter sessions">
          {[['all', 'All'], ['investhack', 'InvestHack'], ['online10', 'Legends Online10']].map(([k, l], i) => <button key={k} type="button" role="tab" data-ftab={k} aria-selected={i === 0}>{l}</button>)}
        </div>
        <div className="past-h rv" style={{ marginTop: 0 }}><h3>Next session</h3></div>
        {nextOnline.length === 0 && tables.length === 0 ? <NoEvents /> : (
          <div className="ev-grid ev-all">
            {[...nextOnline.map((s) => ({ iso: s.iso, kind: 'investhack', el: <SessionCard s={ONLINE_NEXT} img={ONLINE_PAST[0].img} /> })),
              ...tables.map((t) => ({ iso: t.iso, kind: 'online10', el: <SessionCard s={t} tag="Online10" img="/brand/online10-card.jpg" name={t.industry} text="Up to 10 investors at one online table. No speaker: intros, asks & gives, networking." /> }))]
              .sort((a, b) => a.iso.localeCompare(b.iso)).map((c, i) => <div key={c.iso + i} data-kind={c.kind} className={'rv d' + i}>{c.el}</div>)}
          </div>)}
        <div className="past-h rv"><h3>Past sessions</h3><span>{ONLINE_PAST.length} sessions</span></div>
        <PastList items={ONLINE_PAST} paged={10} />
        <p className="f-empty">No past Online10 tables yet. The first one is on the way.</p>
      </div></section>

      <Footer />
    </>
  );
}

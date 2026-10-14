import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import { PastList, NoEvents, SessionCard } from '@/components/Cards';
import { ONLINE_NEXT, ONLINE_PAST, ONLINE10 } from '@/data/online';

export const metadata = { title: 'Online - Legends', description: 'Legends Online10: up to 10 investors per online session, by industry. InvestHack: members share how they decide, live Q&A.' };

const TABS = [['all', 'All'], ['online10', 'Legends Online10'], ['investhack', 'InvestHack']];

export default function Online() {
  const now = new Date();
  const hack = new Date(ONLINE_NEXT.iso + 'T23:59:59Z') >= now ? [{ iso: ONLINE_NEXT.iso, kind: 'investhack', el: <SessionCard s={ONLINE_NEXT} img={ONLINE_PAST[0].img} /> }] : [];
  const tables = ONLINE10.filter((t) => new Date(t.iso + 'T23:59:59Z') >= now).map((t) => ({ iso: t.iso, kind: 'online10', el: <SessionCard s={t} tag="Online10" img="/brand/online10-dark.jpg" name={t.industry} text="Up to 10 investors per online session. Short intros, asks & offers, networking." /> }));
  const next = [...hack, ...tables].sort((a, b) => a.iso.localeCompare(b.iso));
  const past10 = ONLINE10.filter((t) => new Date(t.iso + 'T23:59:59Z') < now);
  return (
    <>
      <Header />
      <PageHero crumbs={[['Online']]} word="ONLINE10 · INVESTHACK ·" title={<>Legends <em>Online</em></>} lead="Legends Online10: up to 10 investors per online session, by industry. InvestHack: members share how they decide, live Q&A." />
      <section className="sec ev-sec" data-track="online" id="online" style={{ paddingTop: 0 }} data-filter="all"><div className="wrap">
        <div className="ftabs rv" role="tablist" aria-label="Filter sessions">
          {TABS.map(([k, l], i) => <button key={k} type="button" role="tab" data-ftab={k} aria-selected={i === 0}>{l}</button>)}
        </div>
        <div className="past-h rv" style={{ marginTop: 0 }}><h3>Next sessions</h3></div>
        {next.length === 0 ? <NoEvents /> : <div className="ev-grid ev-all">{next.map((c, i) => <div key={c.iso + c.kind} data-kind={c.kind} className={'rv d' + (i % 4)}>{c.el}</div>)}</div>}
        <div className="past-h rv"><h3>Past sessions</h3><span>{ONLINE_PAST.length + past10.length} sessions</span></div>
        <PastList items={ONLINE_PAST} paged={10} />
        <p className="f-empty">No past Online10 sessions yet. The first one is on the way.</p>
      </div></section>
      <Footer />
    </>
  );
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Crumbs from '@/components/Crumbs';
import { Head, Formats, Legends10Block, Online10Block, AiBlock, JoinCard, NetSharesBlock, FounderAbout } from '@/components/hv/Hv';
import '../hv.css';

export const metadata = { title: 'How Legends works - Legends', description: 'Legends10 dinners, Legends Online10, InvestHack sessions and one AI platform. Every member personally vetted.' };

const PRINCIPLES = [['No fees on deals', 'No commission, no success fee.'], ['Nothing to sell', 'No investment products of our own.'], ['Connect freely', 'Swap contacts and follow up directly.']];

export default function About() {
  return (
    <>
      <Header />
      <main className="hv">
        <section className="sec hv-page-hero"><div className="wrap cb-wrap"><Crumbs items={[['About']]} /></div><div className="wrap">
          <Head title="We unite legends" sub="You keep the deals and contacts" one="Our goal is simple: to bring investors together for co-investment, additional capital and hard-to-find deals, matched to their exact requests." />
          <div className="hv-cards" style={{ '--c': 3 }}>{PRINCIPLES.map(([h, p], i) => <div key={h} className={'hv-card rv d' + i + (i === 1 ? ' dk' : '')}><span>0{i + 1}</span><h3>{h}</h3><p>{p}</p></div>)}</div>
        </div></section>

        <FounderAbout />

        <NetSharesBlock />

        <section className="sec"><div className="wrap"><Formats title="How Legends works" sub="Three formats, one network" /></div></section>

        <Legends10Block />

        <Online10Block />
        <AiBlock />


        <section className="sec hv-fj"><div className="wrap">
          <JoinCard />
        </div></section>
      </main>
      <Footer />
    </>
  );
}

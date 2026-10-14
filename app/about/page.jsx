import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Crumbs from '@/components/Crumbs';
import { Head, Formats, Legends10Block, Online10Block, AiBlock, JoinCard, NetworkBlock, NetSharesBlock } from '@/components/hv/Hv';
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

        <section className="sec"><div className="wrap"><Formats title="How Legends works" sub="Three formats, one network" /></div></section>

        <NetworkBlock />

        <Legends10Block />

        <NetSharesBlock />

        <Online10Block />
        <AiBlock />


        <section className="sec hv-fj"><div className="wrap">
          <div className="fbio dk rv">
            <figure><img src="/brand/yanis.webp" alt="Yanis Chkhatval" /></figure>
            <div>
              <span className="k2">About the founder</span>
              <h3>Yanis Chkhatval</h3>
              <p className="fbio-lead">Yanis Chkhatval is a private investor, international entrepreneur, and founder of Legends Club.</p>
              <p>With a background in an established entrepreneurial family, Yanis developed an understanding of business and investment from an early age. He founded his first businesses at the age of 18 and studied Accounting and Finance in London. Since then, he has been involved in over 15 ventures across technology, retail, finance, and real estate, with international business experience spanning the UK, Europe, Central Asia and the CIS, the Middle East, and China.</p>
              <p>Today, Yanis focuses on private investments across technology, financial markets, and real estate. Through Legends Club, he is building an exclusive global community of private investors, connecting accomplished individuals through trusted relationships, exceptional experiences, and unique opportunities.</p>
            </div>
          </div>
          <JoinCard />
        </div></section>
      </main>
      <Footer />
    </>
  );
}

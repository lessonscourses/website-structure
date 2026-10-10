import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Crumbs from '@/components/Crumbs';
import Seats from '@/components/Seats';
import { Head, Formats, Legends10Block, Online10Block, InvestHackBlock, AiBlock, Founder, JoinCard } from '@/components/hv/Hv';
import '../hv.css';

export const metadata = { title: 'How Legends works - Legends', description: 'Legends10 dinners, Legends Online10, InvestHack sessions and one AI platform. Every member personally vetted.' };

const PRINCIPLES = [['No fees on deals', 'No commission, no success fee.'], ['Nothing to sell', 'No investment products of our own.'], ['Connect freely', 'Swap contacts and follow up directly.']];
const EVENING = [['Start', 'Arrival and introductions', 'Meet the table. A short intro from everyone: who you are and what you invest in.'], ['Then', 'Asks & offers', 'Share what you are looking for and what you can offer: deals, co-investors, opportunities.'], ['The rest of the evening', 'Open conversation', 'Dinner and free-flowing conversation.']];
const KNOW = [['Ten seats only', 'Arrive on time. Cancel at least 24 hours ahead.'], ['The bill', 'Each guest pays for their own order.'], ['Invite a fellow investor', 'Share your invitation link with them, and we will review their request.']];
const RULES = [['Respect everyone', 'Listen as much as you speak.'], ['Invitation only', 'Your seat is personal. No plus-ones or colleagues.'], ['Give first', 'Offer before you ask.']];

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

        <Legends10Block />
        <section className="sec"><div className="wrap">
          <h3 className="hv-k rv" style={{ marginTop: 0 }}>The evening</h3>
          <div className="hv-cards" style={{ '--c': 3, marginTop: 0 }}>{EVENING.map(([k, h, p], i) => <div key={h} className={'hv-card rv d' + i + (i === 1 ? ' gd' : '')}><span>{k}</span><h3>{h}</h3><p>{p}</p></div>)}</div>
          <div className="hv-card dk rv" style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}><Seats /><p style={{ margin: 0 }}>Up to 10 investors at one table. Active investors only, each reviewed personally.</p></div>
          <h3 className="hv-k rv">Good to know</h3>
          <div className="hv-cards" style={{ '--c': 3, marginTop: 0 }}>{KNOW.map(([h, p], i) => <div key={h} className={'hv-card rv d' + i}><h3 style={{ marginTop: 0 }}>{h}</h3><p>{p}</p></div>)}</div>
        </div></section>

        <Online10Block />
        <InvestHackBlock />
        <AiBlock />

        <section className="sec"><div className="wrap">
          <Head title="House rules" sub="The same at every table" />
          <div className="hv-cards" style={{ '--c': 3 }}>{RULES.map(([h, p], i) => <div key={h} className={'hv-card rv d' + i + (i === 2 ? ' gd' : '')}><span>0{i + 1}</span><h3>{h}</h3><p>{p}</p></div>)}</div>
          <p className="hv-one rv" style={{ color: 'var(--ink-3)', fontWeight: 400 }}>The table moderates itself. If anything goes wrong during the evening, contact us right away.</p>
        </div></section>

        <section className="sec hv-fj"><div className="wrap"><Founder /><JoinCard /></div></section>
      </main>
      <Footer />
    </>
  );
}

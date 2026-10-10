import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Crumbs from '@/components/Crumbs';
import { Head, Problem, Manager, Chat, Hub, Founder, JoinCard } from '@/components/hv/Hv';
import '../hv.css';

export const metadata = { title: 'AI platform - Legends', description: 'Legends investors worldwide, in one place. AI matches you with investors based on your asks, needs and offers; a Personal Legends Manager makes the intros.' };

// Content: Investor overview (p.5) + belegends.club (matching, opportunities, introductions).
const HOW = [
  ['01', 'Matching', 'AI reads what you bring and what you need, and shows only the investors who match your level and mandate.'],
  ['02', 'Opportunities', 'A private board for asks and offers: co-investment, capital, LPs, deals. Posted only by vetted members.'],
  ['03', 'Introductions', 'You show interest, a real person reviews both sides and makes the intro. Contacts are shared only when both say yes.'],
];
const STEPS = [['Profile', 'One call maps your mandate: what you invest in, what you need, what you can offer.'], ['Asks & offers', 'Post what you are looking for. See what other members bring.'], ['Matches', 'AI suggests the right co-investors, LPs and peers.'], ['Intros', 'Your Personal Legends Manager connects you, person to person.']];
const NUMS = [['30+', 'countries our members come from'], ['80+', 'private events organised'], ['1,300+', 'introductions made by the team']];

export default function AiPlatform() {
  return (
    <>
      <Header />
      <main className="hv">
        <section className="sec hv-page-hero"><div className="wrap cb-wrap"><Crumbs items={[['AI platform']]} /></div><div className="wrap">
          <Head title="AI platform" sub="Legends investors worldwide, in one place" />
          <Problem p="The right co-investor, peer or hobby partner takes years to find." s="AI matches you with investors based on your asks, needs and offers." />
        </div></section>

        <section className="sec"><div className="wrap">
          <Head title="How it works" sub="AI does the searching. People make the intro." />
          <div className="hv-cards" style={{ '--c': 3 }}>{HOW.map(([n, h, p], i) => <div key={h} className={'hv-card rv d' + i + (i === 1 ? ' dk' : '')}><span>{n}</span><h3>{h}</h3><p>{p}</p></div>)}</div>
          <div className="hv-cards" style={{ '--c': 4 }}>{STEPS.map(([h, p], i) => <div key={h} className={'hv-card gd rv d' + i}><span>Step 0{i + 1}</span><h3>{h}</h3><p>{p}</p></div>)}</div>
        </div></section>

        <section className="sec"><div className="wrap">
          <Head title="Personal Legends Manager" sub="Always in touch, one message away" />
          <div className="hv-ai"><Manager /><Chat /></div>
        </div></section>

        <section className="sec"><div className="wrap">
          <Head title="One platform connects it all" sub="Dinners, online tables and member sessions feed one profile" />
          <div style={{ marginTop: 'clamp(36px,4vw,56px)' }}><Hub /></div>
          <div className="hv-cards" style={{ '--c': 3 }}>{NUMS.map(([v, k], i) => <div key={k} className={'hv-card rv d' + i}><b className="big">{v}</b><p>{k}</p></div>)}</div>
        </div></section>

        <section className="sec hv-fj"><div className="wrap"><Founder /><JoinCard /></div></section>
      </main>
      <Footer />
    </>
  );
}

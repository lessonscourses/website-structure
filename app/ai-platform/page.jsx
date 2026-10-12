import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Crumbs from '@/components/Crumbs';
import HvSteps from '@/components/hv/HvSteps';
import { Head, Problem, Manager, Chat, Hub, Founder, JoinCard } from '@/components/hv/Hv';
import '../hv.css';

export const metadata = { title: 'AI platform - Legends', description: 'Legends investors worldwide, in one place. AI matches you with investors based on your asks, needs and offers; a Personal Legends Manager makes the intros.' };

// Content: Investor overview (p.5) + belegends.club ("What you get", numbers).
const NUMS = [['30+', 'countries our members come from'], ['80+', 'private events organised'], ['1,300+', 'introductions made by the team']];

export default function AiPlatform() {
  return (
    <>
      <Header />
      <main className="hv">
        <section className="sec hv-page-hero"><div className="wrap cb-wrap"><Crumbs items={[['AI platform']]} /></div><div className="wrap ai-hero">
          <div>
            <Head title="AI platform" sub="Legends investors worldwide, in one place" />
            <Problem p="The right co-investor, peer or hobby partner takes years to find." s="AI matches you with investors based on your asks, needs and offers." />
          </div>
          <Chat />
        </div></section>

        <section className="sec" id="how"><div className="wrap">
          <Head title="Inside the platform" sub="A working network, not a directory" one="See who fits. Post what you need. Meet through Legends. Gather in private." />
          <HvSteps />
        </div></section>

        <section className="sec"><div className="wrap">
          <Head title="A real person on your side" sub="Your Personal Legends Manager" />
          <div className="ai-mgr"><Manager /><div className="ai-nums">{NUMS.map(([v, k], i) => <div key={k} className={'rv d' + i}><b>{v}</b><span>{k}</span></div>)}</div></div>
        </div></section>

        <section className="sec"><div className="wrap">
          <Head title="One platform connects it all" sub="Dinners, online sessions and InvestHack in one profile" />
          <div style={{ marginTop: 'clamp(36px,4vw,56px)' }}><Hub /></div>
        </div></section>

        <section className="sec hv-fj"><div className="wrap"><Founder /><JoinCard /></div></section>
      </main>
      <Footer />
    </>
  );
}

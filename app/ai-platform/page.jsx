import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Crumbs from '@/components/Crumbs';
import HvSteps from '@/components/hv/HvSteps';
import { MatchStory, LiveHub } from '@/components/hv/HvLive';
import { Head, Chat, Manager, Founder, JoinCard } from '@/components/hv/Hv';
import '../hv.css';

export const metadata = { title: 'AI platform - Legends', description: 'Legends investors worldwide, in one place. AI matches you with investors based on your asks, needs and offers; a Personal Legends Manager makes the intros.' };

// Content: Investor overview (p.5) + belegends.club ("What you get", numbers).

export default function AiPlatform() {
  return (
    <>
      <Header />
      <main className="hv">
        <section className="sec hv-page-hero"><div className="wrap cb-wrap"><Crumbs items={[['AI platform']]} /></div><div className="wrap ai-hero">
          <div>
            <Head title="AI platform" sub="Matches, not contacts" one="Legends AI matches you with investors worldwide based on your asks, needs and offers. A real person makes every intro." />
          </div>
          <MatchStory />
        </div></section>

        <section className="sec" id="how"><div className="wrap">
          <Head title="Inside the platform" sub="A working network, not a directory" one="See who fits. Post what you need. Meet through Legends. Gather in private." />
          <HvSteps />
        </div></section>

        <section className="sec"><div className="wrap">
          <Head title="A real person on your side" sub="Your Personal Legends Manager" />
          <div className="hv-ai"><Manager /><Chat /></div>
        </div></section>

        <section className="sec"><div className="wrap">
          <Head title="One platform connects it all" sub="Every format feeds one profile" />
          <div className="rv" style={{ marginTop: 'clamp(36px,4vw,56px)' }}><LiveHub /></div>
        </div></section>

        <section className="sec hv-fj"><div className="wrap"><Founder /><JoinCard /></div></section>
      </main>
      <Footer />
    </>
  );
}

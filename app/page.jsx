import HeroDust from '@/components/HeroDust';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Formats, Legends10Block, Online10Block, InvestHackBlock, AiBlock, UniteBlock } from '@/components/hv/Hv';
import './hv.css';

// Home: hero, then the investor overview in order - formats, Legends10, Online10, InvestHack, AI platform, join.
export default function Home() {
  return (
    <>
      <Header dark />
      <main className="hv">
        <HeroDust />
        <section className="sec hv-first"><div className="wrap"><Formats /></div></section>
        <Legends10Block />
        <Online10Block />
        <InvestHackBlock />
        <AiBlock />
        <UniteBlock />
      </main>
      <Footer />
    </>
  );
}

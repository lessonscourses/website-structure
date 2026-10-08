import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import { EssayTile } from '@/components/Cards';
import { ESSAYS } from '@/data/blog';

export const metadata = { title: 'Blog - Legends', description: 'Essays by the investors and operators who speak at Legends.' };

export default function Blog() {
  return (
    <>
      <Header />
      <PageHero word="STORIES · ESSAYS · DECISIONS ·" title="Blog"
        lead="Stories from the people who deploy capital - essays by Legends speakers on how they decide, what they look for and what they learned the hard way." />
      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="et-list">
          {ESSAYS.map((e, i) => <div key={e.url} className={'rv d' + (i % 3)}><EssayTile e={e} /></div>)}
        </div>
      </div></section>
      <Footer />
    </>
  );
}

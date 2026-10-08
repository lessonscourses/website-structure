import Crumbs from '@/components/Crumbs';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { EssayTile } from '@/components/Cards';
import { ESSAYS, essay } from '@/data/blog';
import { getEssay } from '@/lib/essay';

// Essay page. The full text is pulled from belegends.club/blog/<slug> at build time
// and refreshed every hour (lib/essay.js); if that fails, the page links to the original.
export const revalidate = 3600;
export const dynamicParams = false;
export const generateStaticParams = () => ESSAYS.map((e) => ({ slug: e.slug }));
export async function generateMetadata({ params }) {
  const e = essay((await params).slug);
  return e ? { title: `${e.title} - Legends`, description: e.excerpt } : {};
}

const Arr = ({ c = 'arr' }) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

function Blocks({ blocks, cover }) {
  return blocks.map((b, k) => {
    if (b.h) return <h2 key={k}>{b.h}</h2>;
    if (b.h3) return <h3 key={k}>{b.h3}</h3>;
    if (b.quote) return <blockquote key={k}>{b.quote}</blockquote>;
    if (b.list) { const L = b.ordered ? 'ol' : 'ul'; return <L key={k}>{b.list.map((x) => <li key={x}>{x}</li>)}</L>; }
    if (b.img) { if (b.img === cover) return null; return <figure key={k}><img src={b.img} alt={b.alt} loading="lazy" />{b.caption && <figcaption>{b.caption}</figcaption>}</figure>; }
    return <p key={k} dangerouslySetInnerHTML={{ __html: b.p }} />;
  });
}

export default async function EssayPage({ params }) {
  const e = essay((await params).slug);
  if (!e) notFound();
  const blocks = await getEssay(e.slug);
  const more = ESSAYS.filter((x) => x.slug !== e.slug).slice(0, 3);

  return (
    <>
      <Header />
      <div className="readbar" aria-hidden="true"><i /></div>
      <section className="art-hero">
        <div className="wrap cb-wrap"><Crumbs items={[['Blog', '/blog'], [e.author]]} /></div><div className="wrap">
        <div className="art-head">
          <h1 className="art-h rv d1">{e.title}</h1>
          <p className="lead rv d2">{e.excerpt}</p>
          <div className="art-author rv d2">
            <span><b>{e.author}</b><small>{e.authorRole}</small></span>
            <span className="art-meta">{e.date} · {e.read} min read</span>
          </div>
        </div>
        <div className="art-cover rv"><img src={e.img} alt="" /></div>
      </div></section>

      <section className="sec" style={{ paddingTop: 'clamp(40px,5vw,72px)' }}><div className="wrap art-grid">
        <aside className="art-side">
          <div className="art-from">
            <small>From the InvestHack</small>
            <p>{e.eventTitle}</p>
            <small>{e.eventDate} · Online</small>
            <a className="more" href={e.eventUrl} target="_blank" rel="noopener">About the session <Arr c="" /></a>
          </div>
        </aside>
        <article className="prose">
          {blocks ? <Blocks blocks={blocks} cover={e.img} /> : (
            <>
              <p>{e.excerpt}</p>
              <div className="prose-note">
                <p>The full essay is published on the Legends blog.</p>
                <a className="btn gold" href={e.original} target="_blank" rel="noopener">Read the essay <Arr /></a>
              </div>
            </>
          )}
        </article>
      </div></section>

      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head rv"><h2 className="h2">Keep reading</h2></div>
        <div className="et-list">{more.map((m, i) => <div key={m.slug} className={'rv d' + i}><EssayTile e={m} /></div>)}</div>
        <a className="more rv" href="/blog">All essays <Arr c="" /></a>
      </div></section>
      <Footer />
    </>
  );
}

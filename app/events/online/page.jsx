import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import { SessionReel } from '@/components/HeroMedia';
import Footer from '@/components/Footer';
import { PastList, NoEvents } from '@/components/Cards';
import { ONLINE_NEXT, ONLINE_PAST, ONLINE_RECAPS } from '@/data/online';

export const metadata = { title: 'Legends Online - Legends', description: 'A monthly live session with a top investor, then a closed discussion with the room.' };

export default function Online() {
  const nextOnline = new Date(ONLINE_NEXT.iso + 'T23:59:59Z') >= new Date()
    ? [{ ...ONLINE_NEXT, date: `${ONLINE_NEXT.dow}, ${ONLINE_NEXT.day} ${ONLINE_NEXT.month.slice(0, 3)} 2026`, label: 'Upcoming', img: ONLINE_PAST[0].img, next: true }] : [];
  return (
    <>
      <Header />
      <PageHero aside={<SessionReel clips={[1, 0, 2].map((k) => ONLINE_RECAPS[k]).filter((r) => r && r.video).map((r) => ({ video: r.video, poster: r.shots[0], speaker: r.speaker, reel: r.reel || [20] }))} />} word="LIVE · ONLINE · EVERY MONTH ·" title="Legends Online" lead="Once a month, a top investor shares how they decide - a 30-minute talk, then a closed discussion with the room. Small group, cameras on." />
      <section className="sec ev-sec" data-track="online" id="online" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head rv">
          <h2 className="h2">Next session</h2>
          
        </div>
        {nextOnline.length === 0 ? <NoEvents /> : <div className="on-next rv"><PastList items={nextOnline} /></div>}
        <div className="past-h rv"><h3>Past sessions</h3><span>{ONLINE_PAST.length} sessions</span></div>
        <PastList items={ONLINE_PAST} paged={10} />
      </div></section>

      <Footer />
    </>
  );
}

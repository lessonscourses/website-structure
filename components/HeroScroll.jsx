import { ApplyButton } from './ApplyModal';

const Arr = () => <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
const VIDEO = 'https://legends.app/events/shared/media/highlights.mp4';

// Home hero, driven by scroll (logic in lib/site.js, "home hero"):
// 1) LEGENDS cut out of black, our event film plays inside the letters;
// 2) scrolling flies through the "E" until the film fills the screen and the headline rises;
// 3) the film settles into a rounded frame on the cream page.
export default function HeroScroll() {
  return (
    <section className="hs" data-hero>
      <div className="hs-stage">
        <div className="hs-film">
          <div className="hs-poster" />
          <video autoPlay muted loop playsInline preload="auto" poster="/gallery/evening-5.jpg"><source src={VIDEO} type="video/mp4" /></video>
          <div className="hs-shade" />
          <div className="hs-curtain"><div className="hs-word">{'LEGENDS'.split('').map((c, i) => <span key={i}>{c}</span>)}</div></div>
          <div className="hs-intro">
            <p className="hs-pin">Private Investors Network</p>
            <p className="hs-only">Investors only · Membership by approval</p>
          </div>
          <div className="hs-cue" aria-hidden="true"><i />Scroll</div>
          <div className="hs-copy">
            <p className="hs-k">Investors only</p>
            <h1>Private Investors<br /><em>Network</em></h1>
            <p className="hs-lead">Rare, high-quality deals from investors.<br />Co-investment. Additional capital. Private events.</p>
            <div className="hs-row"><ApplyButton className="g-btn">Apply to join <Arr /></ApplyButton><span className="g-note"><i />Membership by approval</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

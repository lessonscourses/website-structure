import { ApplyButton } from './ApplyModal';

const Arr = () => <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

// Home hero "Gold dust" (logic in lib/site.js, "home hero"):
// gold particles settle into LEGENDS, the cursor scatters them;
// on scroll the dust falls away while the next block slides up over the hero on a rounded cream sheet.
export default function HeroDust() {
  return (
    <section className="hd" data-hero>
      <div className="hd-stage">
        <canvas className="hd-cv" aria-hidden="true" />
        <h1 className="sr-only">Legends</h1>
        <ul className="hd-ways"><li>Online by sector</li><li>In person by city</li><li>Connected through our platform</li></ul>
        <div className="hd-copy">
          <p className="hd-t">Private Investors <em>Network</em></p>
          <p className="hd-lead">Hard-to-find deals, shared by investors.<br />Co-investment. Additional capital. Private events.</p>
          <div className="hd-cta"><ApplyButton className="g-btn hd-btn">Apply to join <Arr /></ApplyButton><span className="g-note"><i />Membership by approval</span></div>
        </div>
      </div>
    </section>
  );
}

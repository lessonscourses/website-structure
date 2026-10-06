import { ApplyButton } from './ApplyModal';
import { ACTIVITY } from '@/data/activity';

const Arr = () => <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
const VIDEO = 'https://legends.app/events/shared/media/highlights.mp4';

// Home hero: the LEGENDS wordmark cut out of our own event footage (video plays inside the letters),
// a live-looking "Inside the network" board, then a soft fade from black into the cream page.
export default function HeroWordmark() {
  return (
    <section className="gate hw">
      <div className="hw-glow" aria-hidden="true" />
      <div className="hw-word" aria-hidden="true">
        <video autoPlay muted loop playsInline preload="auto" poster="/gallery/evening-5.jpg"><source src={VIDEO} type="video/mp4" /></video>
        <div className="hw-cut"><span>LEGENDS</span></div>
      </div>
      <div className="wrap hw-in">
        <p className="hw-sub"><span className="hw-k">Private Investors Network</span><span>Investors only · Membership by approval</span></p>
        <div className="hw-bottom">
          <div className="hw-l">
            <h1 className="hw-h">Rare, high-quality deals from investors.</h1>
            <p className="hw-lead">Co-investment. Additional capital. Private events.</p>
            <div className="hw-cta"><ApplyButton className="g-btn">Apply to join <Arr /></ApplyButton><span className="g-note"><i />Membership by approval</span></div>
          </div>
          <div className="hw-board" data-board>
            <div className="hw-bh"><span><i />Inside the network</span><span>Members see the details</span></div>
            <ol className="hw-rows">
              {ACTIVITY.map((a, i) => (
                <li key={i} className={i < 4 ? 'on' : ''}><i /><b>{a.type}</b><span>{a.what}</span><span>{a.city}</span><em className={a.show ? '' : 'hid'}>{a.amount}</em></li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <div className="hw-fade" aria-hidden="true" />
    </section>
  );
}

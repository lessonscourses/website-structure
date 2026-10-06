import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PastList } from '@/components/Cards';
import DayLine from '@/components/DayLine';
import { ONLINE_NEXT as S, ONLINE_PAST } from '@/data/online';
import { PRIVACY_URL, TERMS_URL } from '@/data/links';
import '../../online.css';

// Legends Online session page (layout of the approved concept). Content: data/online.js.
export const metadata = { title: `Legends Online ${S.no} - ${S.speaker}`, description: S.lead };

const Arr = () => <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

export default function OnlineSession() {
  const [a, b] = S.title.split(' What Gets ');
  return (
    <>
      <Header cta={{ href: '#register', label: 'Reserve your seat' }} />

      <section className="h-hero" id="top">
        <div className="h-no" aria-hidden="true">{S.no}</div>
        <div className="wrap h-in">
          <div className="h-copy">
            <p className="h-kick rv"><span>Legends Online</span><i /><span>No. {S.no}</span></p>
            <h1 className="rv d1">{b ? <>{a} What Gets <em>{b}</em></> : S.title}</h1>
            <p className="lead rv d2">{S.lead}</p>
            <DayLine s={S} className="h-dln d2" />
            <div className="h-cta rv d3"><a className="btn gold big" href="#register">Reserve your seat <Arr /></a></div>
          </div>
          <div className="h-port rv d2">
            <span className="h-ring r1" /><span className="h-ring r2" />
            <img src={S.hero || S.photo} alt={S.speaker} />
            <p className="h-sig"><b>{S.speaker}</b>{S.role}</p>
          </div>
        </div>
      </section>

      <section className="sec" id="idea"><div className="wrap">
        <div className="ib">
          <div className="ib-l rv">
            <p className="ib-q">{S.idea.quote[0]}<span>{S.idea.quote[1]}</span></p>
            <p className="ib-tx">{S.idea.text}</p>
          </div>
          <ol className="ib-r">{S.idea.points.map(([h, p], i) => <li key={h} className={'rv d' + i}><b>{String(i + 1).padStart(2, '0')}</b><div><h3>{h}</h3><p>{p}</p></div></li>)}</ol>
        </div>
      </div></section>

      <section className="sec" id="speaker" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="d-spk2">
          <div className="d-cut rv"><span className="d-glow" /><img src={S.photo} alt={S.speaker} /></div>
          <div className="d-spk-tx">
            <h2 className="h2 rv">{S.speaker}</h2>
            <p className="d-role rv d1">{S.role}</p>
            <div className="d-bio rv d2">{S.bio.map((p) => <p key={p}>{p}</p>)}</div>
            <dl className="d-cred rv d3">{S.creds.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          </div>
        </div>
      </div></section>

      <section className="sec d-hour" id="hour" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head rv"><h2 className="h2">Sixty minutes, then the room</h2><p className="lead">30-minute talk, then a closed discussion with the speaker. Small group, cameras on.</p></div>
        <div className="d-track rv">
          <div className="d-marks"><span style={{ left: 0 }}>0'</span><span style={{ left: '22.1%' }}>10'</span><span style={{ left: '56.6%' }}>30'</span><span style={{ left: '100%' }}>60'</span></div>
          <div className="d-rail"><i className="r1" /><i className="r2" /><i className="r3" /><span className="d-head" /></div>
          <div className="d-segs">{S.hour.map(([f, k, h, p]) => <div key={k} style={{ flex: f }}><b>{k}</b><h3>{h}</h3><p>{p}</p></div>)}</div>
        </div>
      </div></section>

      <section className="sec" id="who" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="d-who">
          <div className="d-who-h rv"><h2 className="h2">You’ll get the most out of it if you are</h2></div>
          <ol className="d-who-l">{S.forWho.map((w, i) => <li key={w} className={'rv d' + i}><span>{String(i + 1).padStart(2, '0')}</span>{w}</li>)}</ol>
          <p className="d-not rv"><b>Not the place for</b> {S.notFor}</p>
        </div>
      </div></section>

      <section className="sec" id="register" style={{ paddingTop: 0 }}><div className="wrap inv2">
        <div className="inv-card rv">
          <h2>{S.seats} seats, cameras on</h2>
          <p>Every registration is reviewed. Confirmed investors receive the Zoom link before the session.</p>
          <dl className="on-reg-facts">
            <div><dt>Date</dt><dd>Tue, {S.day} {S.month} 2026</dd></div>
            <div><dt>Time</dt><dd>{S.times[0][1]} {S.times[0][0]} · {S.times[1][1]} {S.times[1][0]}</dd></div>
            <div><dt>Speaker</dt><dd>{S.speaker}</dd></div>
          </dl>
        </div>
        <div className="inv-form rv d1">
          <form className="af" data-form="invite" data-event={S.slug}>
            <input type="hidden" name="session" value={S.slug} />
            <label className="af-field"><span>Full name</span><input name="name" required placeholder="Your full name" autoComplete="name" /></label>
            <div className="af-row">
              <label className="af-field"><span>Email</span><input name="email" type="email" required placeholder="you@company.com" autoComplete="email" /></label>
              <label className="af-field"><span>WhatsApp</span><input name="phone" type="tel" required placeholder="+971 ..." autoComplete="tel" /></label>
            </div>
            <label className="af-field"><span>LinkedIn <em>(optional)</em></span><input name="linkedin" placeholder="linkedin.com/in/..." /></label>
            <label className="af-check"><input type="checkbox" name="investor" required /><span>I confirm I’m an <b>investor</b>: I invest my own capital or on behalf of a family office, fund or institution.</span></label>
            <button className="btn gold big" type="submit">Reserve your seat <Arr /></button>
            <p className="af-legal">By submitting, you agree to our <a href={TERMS_URL}>Terms</a> and <a href={PRIVACY_URL}>Privacy</a>.</p>
          </form>
          <div className="inv-done" hidden><h3>Registration received</h3><p>We’ll confirm your seat and send the Zoom link before the session.</p></div>
        </div>
      </div></section>

      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head rv"><h2 className="h2">Previous sessions</h2></div>
        <PastList items={ONLINE_PAST} />
      </div></section>
      <Footer />
    </>
  );
}

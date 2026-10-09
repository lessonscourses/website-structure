import Crumbs from '@/components/Crumbs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DayLine from '@/components/DayLine';
import Seats from '@/components/Seats';
import { ONLINE10, online10 } from '@/data/online';
import { PRIVACY_URL, TERMS_URL } from '@/data/links';
import '../../../online.css';

// Legends Online10 table: up to 10 investors at one online table, by industry. No speaker.
export const generateStaticParams = () => ONLINE10.map((t) => ({ slug: t.slug }));
export async function generateMetadata({ params }) {
  const t = online10((await params).slug);
  return t ? { title: `Legends Online10 - ${t.industry}`, description: t.lead } : {};
}

const Arr = () => <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
const GLOBE = [['San Francisco', 37.8, -122.4], ['New York', 40.7, -74], ['London', 51.5, -0.1], ['Amsterdam', 52.4, 4.9, 0], ['Zurich', 47.4, 8.5, 0], ['Monaco', 43.7, 7.4, 0], ['Riyadh', 24.7, 46.7, 0], ['Dubai, Abu Dhabi', 25.2, 55.3], ['Mumbai', 19.1, 72.9], ['Hong Kong', 22.3, 114.2], ['Singapore', 1.35, 103.8]];
const CALL = [
  ['Short intros', 'Everyone at the table: who you are, what you invest in and where.'],
  ['Asks & gives', 'One ask and one give each: a co-investor, deal flow, LPs, an introduction - or a deal, expertise, a contact, capital.'],
  ['Networking', 'Open conversation with peers in your industry. Follow up directly after the call.'],
];
const WHO = [['Family offices', 'Principals, CIOs'], ['Fund managers', 'VC, PE, private credit'], ['LPs & allocators', 'Into funds, strategies'], ['Private investors', 'Angels, own capital']];
const RULES = [['Cameras on', 'A table, not a webinar. Join from a quiet place.'], ['Give first', 'Offer before you ask.'], ['Invitation only', 'Your seat is personal. No plus-ones or colleagues.']];

export default async function Online10Page({ params }) {
  const t = online10((await params).slug);
  if (!t) return null;
  return (
    <>
      <Header cta={{ href: '#register', label: 'Request a seat' }} />

      <section className="h-hero o10h" id="top">
        <div className="wrap cb-wrap"><Crumbs items={[['Online', '/events/online'], [`Online10 · ${t.industry}`]]} /></div>
        <div className="wrap h-in">
          <div className="h-copy">
            <p className="h-kick rv"><span>Legends Online10</span><i /><span>{t.industry}</span></p>
            <h1 className="rv d1">Your industry. <em>Worldwide.</em></h1>
            <p className="lead rv d2">{t.lead}</p>
            <DayLine s={t} className="h-dln d2" />
            <div className="h-cta rv d3"><a className="btn gold big" href="#register">Request a seat <Arr /></a></div>
          </div>
          <div className="o10h-globe rv d2"><canvas data-globe={JSON.stringify(GLOBE)} role="img" aria-label="Members and guests from 11 cities" /></div>
        </div>
      </section>

      <main className="about-pg">
        <section className="sec" id="table"><div className="wrap">
          <span className="ab-n rv">The table</span>
          <h2 className="h2 rv">No speaker. Just the right ten.</h2>
          <p className="bh-tx rv d1">The investors you need are often in other cities and time zones. Online10 puts up to 10 of them at one table, by industry, 1-2 times a month: networking, deals and insights, without the flight.</p>
          <div className="ab-seats rv d1"><Seats /><span>Up to {t.seats} investors, each reviewed personally.</span></div>
          <ul className="ab-cols four rv d2">{WHO.map(([h, p]) => <li key={h}><b>{h}</b><span>{p}</span></li>)}</ul>
        </div></section>

        <section className="sec" id="call"><div className="wrap">
          <span className="ab-n rv">At every online call</span>
          <h2 className="h2 rv">Sixty minutes, three parts</h2>
          <ol className="ab-steps rv" style={{ marginTop: 'clamp(28px,3vw,44px)' }}>{CALL.map(([h, p], i) => <li key={h} style={{ '--i': i }}><span>0{i + 1}</span><b>{h}</b><em>{p}</em></li>)}</ol>
          <h3 className="ab-h3 rv">Members and guests from</h3>
          <p className="ab-p rv">Amsterdam · London · Zurich · Monaco · New York · San Francisco · Dubai · Abu Dhabi · Riyadh · Hong Kong · Mumbai · Singapore</p>
        </div></section>

        <section className="sec" id="rules"><div className="wrap">
          <span className="ab-n rv">Good to know</span>
          <h2 className="h2 rv">Simple rules</h2>
          <ul className="ab-cols three rv">{RULES.map(([h, p]) => <li key={h}><b>{h}</b><span>{p}</span></li>)}</ul>
        </div></section>

        <section className="sec" id="register"><div className="wrap inv2">
          <div className="inv-card rv">
            <h2>{t.seats} seats, one table</h2>
            <p>Every request is reviewed. Confirmed investors receive the call link before the table.</p>
            <dl className="on-reg-facts">
              <div><dt>Date</dt><dd>{t.dow}, {t.day} {t.month} 2026</dd></div>
              <div><dt>Time</dt><dd>{t.times[0][1]} {t.times[0][0]} · {t.times[1][1]} {t.times[1][0]}</dd></div>
              <div><dt>Industry</dt><dd>{t.industry}</dd></div>
            </dl>
          </div>
          <div className="inv-form rv d1">
            <form className="af" data-form="invite" data-event={`online10-${t.slug}`}>
              <input type="hidden" name="session" value={`online10-${t.slug}`} />
              <label className="af-field"><span>Full name</span><input name="name" required placeholder="Your full name" autoComplete="name" /></label>
              <div className="af-row">
                <label className="af-field"><span>Email</span><input name="email" type="email" required placeholder="you@company.com" autoComplete="email" /></label>
                <label className="af-field"><span>WhatsApp</span><input name="phone" type="tel" required placeholder="+971 ..." autoComplete="tel" /></label>
              </div>
              <label className="af-field"><span>LinkedIn <em>(optional)</em></span><input name="linkedin" placeholder="linkedin.com/in/..." /></label>
              <label className="af-check"><input type="checkbox" name="investor" required /><span>I confirm I’m an <b>investor</b>: I invest my own capital or on behalf of a family office, fund or institution.</span></label>
              <button className="btn gold big" type="submit">Request a seat <Arr /></button>
              <p className="af-legal">By submitting, you agree to our <a href={TERMS_URL}>Terms</a> and <a href={PRIVACY_URL}>Privacy</a>.</p>
            </form>
            <div className="inv-done" hidden><h3>Request received</h3><p>We’ll confirm your seat and send the call link before the table.</p></div>
          </div>
        </div></section>
      </main>
      <Footer />
    </>
  );
}

import Crumbs from '@/components/Crumbs';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeatTable from '@/components/SeatTable';
import Faq from '@/components/Faq';
import { EVENTS, event, upcoming, scheduleFor, MEDIA } from '@/data/events';
import { PRIVACY_URL, TERMS_URL } from '@/data/links';

// One page per dinner (legends.app/events/<slug>). Content is the same for every city;
// city, date and summit week come from data/events.js.
export const dynamicParams = false;
export const generateStaticParams = () => EVENTS.map((e) => ({ slug: e.slug }));
export async function generateMetadata({ params }) {
  const e = event((await params).slug);
  return e ? { title: `Legends10 ${e.city} - ${e.day} ${e.month}`, description: `Private dinner for ten investors in ${e.city}, ${e.day} ${e.month} 2026. Invitation only.` } : {};
}

const Arr = ({ c = 'arr' }) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
const LOOKING = ['Co-investors', 'Deal flow', 'Capital', 'LPs', 'Peers'];
const OUTCOMES = [['Co-investment', 'A co-investor for your next deal.'], ['Deal flow', 'A deal that never reaches the open market.'], ['Capital', 'Capital for what you’re already building.'], ['Peers', 'Someone worth keeping in your circle.']];
const GUESTS = [['Family offices', 'Principals and investment teams. Direct deals, funds, private markets.'], ['CIOs & institutions', 'Allocators of institutional capital.'], ['GPs & LPs', 'Fund managers and the LPs backing them.'], ['Private investors', 'Investing their own capital, directly.']];
const DAYS = { Mon: 'Mon', Tue: 'Tue', Wed: 'Wed', Thu: 'Thu', Fri: 'Fri' };

export default async function EventPage({ params }) {
  const e = event((await params).slug);
  if (!e) notFound();
  const others = upcoming().filter((x) => x.slug !== e.slug);
  return (
    <>
      <Header dark cta={{ href: '#apply', label: 'Request an invitation' }} />

      {/* ===== Hero: city video on black ===== */}
      <div className="evp">
      <section className="eh">
        <div className="eh-bg" aria-hidden="true">
          <video autoPlay muted loop playsInline preload="auto" poster={`${MEDIA}/img/evening-1.jpg`}><source src={`https://legends.app/events/${e.slug}/media/hero.mp4`} type="video/mp4" /></video>
          <i className="eh-shade" />
        </div>
        <div className="eh-city" data-drift aria-hidden="true">{Array.from({ length: 6 }, () => e.city.toUpperCase()).join(' · ')} ·</div>
        <div className="wrap eh-in">
          <Crumbs dark items={[['Dinners', '/events'], [e.city]]} />
          <p className="eh-when rv">{e.city} · {e.day} {e.month} · Invitation only</p>
          <h1 className="eh-h rv d1"><b>You’re in {e.city} for<br />{e.heroWeek}.</b><br /><span>Meet the other nine<br />at one private table.</span></h1>
          <p className="eh-lead rv d2">A private dinner for the investors who decide where capital goes: family offices, GPs, LPs and private investors.</p>
          <div className="lf rv d2"><span>I’m looking for</span><div>{LOOKING.map((l) => <button key={l} type="button">{l}</button>)}</div></div>
          <a className="btn gold big rv d3" href="#apply">Request an invitation <Arr /></a>
          <p className="eh-note rv d3">Not public. Every seat is confirmed individually. The venue is disclosed on confirmation.</p>
        </div>
      </section>
      <div className="tk2"><div className="wrap"><dl>
        <div><dt>Date</dt><dd>{DAYS[e.dow]}, {e.day} {e.month} 2026</dd></div>
        <div><dt>Time</dt><dd>{e.time}</dd></div>
        <div><dt>Venue</dt><dd>Disclosed on confirmation</dd></div>
        <div><dt>Guests</dt><dd>{e.seats} investors only</dd></div>
      </dl></div></div>

      {/* ===== Why ===== */}
      <section className="sec" id="why"><div className="wrap why">
        <div className="why-pics rv"><img src={`${MEDIA}/img/evening-1.jpg`} alt="Investors around one dinner table on a rooftop" /><img src={`${MEDIA}/img/evening-2.jpg`} alt="Investors talking in a private lounge" /></div>
        <div className="why-tx">
          <h2 className="h2 rv">{e.city} will be full of people. The right ten are harder to find.</h2>
          <p className="lead rv d1">Thousands of investors, funds and brokers. No selection. Finding people you can trust usually takes years.</p>
          <ul className="nos rv d2">{['No stage', 'No pitches', 'No brokers', 'No random networking'].map((n) => <li key={n}>{n}</li>)}</ul>
        </div>
      </div></section>

      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sel">
          <div className="sel-tx">
            <h2 className="h2 rv">Legends selects the table.</h2>
            <p className="lead rv d1">Introductions that usually take years, at one table in one evening.</p>
            <ul className="sel-facts">
              <li className="rv"><b>10 seats</b><span>Active investors only.</span></li>
              <li className="rv d1"><b>Reviewed</b><span>Every guest, personally.</span></li>
              <li className="rv d2"><b>Private</b><span>Venue and guests stay off this page.</span></li>
            </ul>
          </div>
          <div className="glist rv d1">
            <div className="glist-h"><b>Guest list · {e.city}</b><span>Private</span></div>
            <ol>
              {Array.from({ length: 9 }, (_, i) => <li key={i} style={{ '--i': i }}><span>{String(i + 1).padStart(2, '0')}</span><i /></li>)}
              <li className="you"><span>10</span><a href="#apply">Your seat? Apply <Arr c="" /></a></li>
            </ol>
            <p>Names are not published.</p>
          </div>
        </div>
      </div></section>

      {/* ===== Outcomes ===== */}
      <section className="oc-band"><div className="wrap oc-band-in">
        <h2 className="h2 rv">One evening.<br />One relationship<br />may be enough.</h2>
        <ul className="oc-list rv d1">{OUTCOMES.map(([h, p]) => <li key={h}><b>{h}</b><span>{p}</span></li>)}</ul>
      </div></section>

      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head rv" style={{ marginTop: 'clamp(70px,8vw,120px)' }}><h2 className="h2">Who sits at the table</h2><p className="lead">Only investors, at your level. Nobody pitching you. People who have walked the same journey.</p></div>
        <div className="tables4">{GUESTS.map(([h, p], i) => <div key={h} className={'tbl rv d' + i}><h3>{h}</h3><p>{p}</p></div>)}</div>
      </div></section>

      {/* ===== Apply ===== */}
      <section className="sec" id="apply" style={{ paddingTop: 0 }}><div className="wrap inv2">
        <div className="inv-card rv">
          <h2>10 seats, each one personally confirmed</h2>
          <p>The goal is not to fill the table. It is to make the table worth joining.</p>
          <SeatTable />
          <figure className="inv-q">
            <blockquote>“Every deal I regret started with the wrong introduction. Every one I’m proud of started with the right one.”</blockquote>
            <figcaption><img src={`${MEDIA}/img/yanis.jpg`} alt="Yanis Chkhatval" /><span><b>Yanis Chkhatval</b>Private investor &amp; entrepreneur. Founder of Legends.</span></figcaption>
          </figure>
        </div>
        <div className="inv-form rv d1">
          <form className="af" data-form="invite" data-event={e.slug}>
            <input type="hidden" name="dinner" value={e.slug} /><input type="hidden" name="looking_for" defaultValue="" />
            <label className="af-field"><span>Full name</span><input name="name" required placeholder="Your full name" autoComplete="name" /></label>
            <div className="af-row">
              <label className="af-field"><span>Email</span><input name="email" type="email" required placeholder="you@company.com" autoComplete="email" /></label>
              <label className="af-field"><span>WhatsApp</span><input name="phone" type="tel" required placeholder="+971 ..." autoComplete="tel" /></label>
            </div>
            <label className="af-field"><span>LinkedIn <em>(optional)</em></span><input name="linkedin" placeholder="linkedin.com/in/..." /></label>
            <label className="af-check"><input type="checkbox" name="investor" required /><span>I confirm I’m an <b>investor</b>: I invest my own capital or on behalf of a family office, fund or institution.</span></label>
            <label className="af-check"><input type="checkbox" name="consent" /><span>Legends may call, text or WhatsApp me about this request, for example to confirm my seat. Calls may be recorded. <em>(optional)</em></span></label>
            <button className="btn gold big" type="submit">Request an invitation <Arr /></button>
            <p className="af-legal"><b>Submission does not guarantee a seat.</b> By submitting, you agree to our <a href={TERMS_URL}>Terms</a> and <a href={PRIVACY_URL}>Privacy</a>.</p>
          </form>
          <div className="inv-done" hidden><h3>Request received</h3><p>We review every request personally and will be in touch to confirm your seat.</p></div>
          <ol className="af-steps"><li><b>01</b>Apply</li><li><b>02</b>Review</li><li><b>03</b>Seat confirmed</li><li><b>04</b>Venue shared</li></ol>
        </div>
      </div></section>

      {/* ===== Evening ===== */}
      <section className="sec" id="evening"><div className="wrap eve">
        <div className="eve-head rv"><h2 className="h2">Three hours.<br />Simple<br />by design.</h2></div>
        <ol className="eve2 rv d1">
          {scheduleFor(e.start).map(([t, h, p], i) => <li key={t} className={i === 2 ? 'key' : ''}><time>{t}</time><i /><div><h3>{h}</h3><p>{p}</p></div></li>)}
        </ol>
      </div></section>

      {/* ===== Experience: video + four photos ===== */}
      <section className="sec" id="experience" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head rv"><h2 className="h2">Shaped by 80+ private gatherings</h2><p className="lead">Smaller groups. Better conversations.</p></div>
        <div className="mgal rv">
          <div className="v"><video autoPlay muted loop playsInline poster="/gallery/evening-5.jpg"><source src={`${MEDIA}/media/highlights.mp4`} type="video/mp4" /></video><span className="play"><i><svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg></i>Watch the highlights</span></div>
          {['evening-3', 'evening-1', 'evening-4', 'evening-2'].map((g) => <div key={g} className="ph" style={{ backgroundImage: `url(/gallery/${g}.jpg)` }} />)}
        </div>
      </div></section>

      {/* ===== Next dinners ===== */}
      {others.length > 0 && (
        <section className="sec" style={{ paddingTop: 0 }}><div className="wrap">
          <div className="sec-head rv"><h2 className="h2">Next investor dinners</h2></div>
          <div className="nx">
            {others.map((o) => <div key={o.slug} className="nx-row"><b>{o.city}</b><span className="nx-d">{o.day} {o.month.slice(0, 3)}</span><span className="nx-w">{o.week} week</span><a className="nx-go" href={o.url}>View</a></div>)}
          </div>
        </div></section>
      )}

      <Faq e={e} />

      {/* ===== Closing ===== */}
      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="close3 rv">
          <div><h2>The strong never walk<br />their journey alone.</h2><p>10 seats. One table. {e.city}, {e.day} {e.month}.</p></div>
          <a className="btn gold big" href="#apply">Request an invitation <Arr /></a>
        </div>
      </div></section>
      </div>
      <Footer />
    </>
  );
}

import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import Join from '@/components/Join';
import Seats from '@/components/Seats';
import { upcoming } from '@/data/events';
import { ONLINE_NEXT } from '@/data/online';

export const metadata = { title: 'How Legends works - Legends', description: 'Legends10 dinners, Legends Online10 tables, InvestHack sessions and one AI platform. Every member reviewed personally.' };

const Arr = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

const PRINCIPLES = [
  ['No fees on deals', 'No commission, no success fee.'],
  ['Nothing to sell', 'No investment products of our own.'],
  ['Connect freely', 'Swap contacts and follow up directly.'],
];
const FORMATS = [['01', 'Legends10', 'Dinners by city', '#legends10'], ['02', 'Legends Online10', 'Calls by industry', '#online10'], ['03', 'InvestHack', 'Member sessions', '#investhack'], ['04', 'AI platform', 'Profile, asks, matches, intros', '#platform']];
const EVENING = [
  ['Start', 'Arrival and introductions', 'Meet the table. A short intro from everyone: who you are and what you invest in.'],
  ['Then', 'Asks & gives', 'Share what you are looking for and what you can offer: deals, co-investors, opportunities.'],
  ['The rest of the evening', 'Open conversation', 'Dinner and free-flowing conversation. Enjoy the evening.'],
];
const CITIES = [['Dubai', 'dubai'], ['Singapore', 'singapore'], ['Riyadh', 'riyadh'], ['Abu Dhabi', 'abu-dhabi']];
const WHO = [['Family offices', 'Principals, CIOs'], ['Fund managers', 'VC, PE, private credit'], ['LPs & allocators', 'Into funds, strategies'], ['Private investors', 'Angels, own capital']];
const INDUSTRIES = ['Artificial intelligence', 'Healthcare & biotech', 'Infrastructure & real estate', 'Energy & resources', 'Fintech & private credit', 'Many more'];
const HACKS = [
  ['06', '$200M+', 'family office, $5-10M direct checks', 'Buy till exit: an 8-10-year minimum horizon.', 'Alex Felman', 'General Partner, Felman Family Office'],
  ['05', '€2.5M', 'per startup, pre-seed', 'Before revenue, the team is the evidence.', 'Janneke Niessen', 'Founding Partner, CapitalT'],
  ['04', '30+ yrs', 'building and backing tech', 'If you are a founder, you have to own your own numbers.', 'Walied Albasheer', 'Managing Partner, Intuitio Ventures'],
];
const MEMBERS = [['Alex Felman', 'Felman Family Office'], ['Abhineet Singh', 'Al Siraj Holdings'], ['Janneke Niessen', 'CapitalT'], ['Radhesh Kanumury', 'Suvan Ventures'], ['Walied Albasheer', 'Intuitio Ventures'], ['Vijay Sivaram', 'RVAI Global'], ['Julius Bachmann', 'Bachmann Catalyst'], ['Amit Grover', 'Grover & Company']];
const MANAGER = ['Always in touch, one message away', 'Finds matches, makes intros', 'Handles what you need in the network', 'Saves your time'];
const RULES = [['Respect everyone', 'Listen as much as you speak.'], ['Invitation only', 'Your seat is personal. No plus-ones or colleagues.'], ['Give first', 'Offer before you ask.']];

function Head({ n, title, sub, children }) {
  return (
    <div className="ab-hd">
      <span className="ab-n rv">{n}</span>
      <h2 className="h2 rv">{title}</h2>
      {sub && <p className="pf-sub rv d1">{sub}</p>}
      {children && <p className="bh-tx rv d1">{children}</p>}
    </div>
  );
}

export default function About() {
  const dinners = upcoming();
  return (
    <>
      <Header />
      <PageHero crumbs={[['About']]} word="LEGENDS10 · ONLINE10 · INVESTHACK · AI PLATFORM ·" title={<>How Legends <em>works</em></>} lead="A private investors network: dinners by city, calls by industry, member sessions and one platform that connects them. Every member reviewed personally." />

      <main className="about-pg">
        {/* intro + principles */}
        <section className="sec ab-intro"><div className="wrap">
          <h2 className="h2 rv">We unite legends</h2>
          <p className="pf-sub rv d1">You keep the deals and the contacts.</p>
          <p className="bh-tx rv d1">Our goal is simple: to bring investors together for co-investment, additional capital and rare, high-quality deals, matched to their exact requests. Just the right people and the right deals.</p>
          <ul className="ab-cols three rv d2">{PRINCIPLES.map(([h, p]) => <li key={h}><b>{h}</b><span>{p}</span></li>)}</ul>
          <nav className="ab-index rv d2" aria-label="Formats">
            {FORMATS.map(([n, h, p, href]) => <a key={h} href={href}><span>{n}</span><b>{h}</b><em>{p}</em><Arr /></a>)}
          </nav>
        </div></section>

        {/* Legends10 */}
        <section className="sec" id="legends10"><div className="wrap">
          <Head n="01" title="Legends10" sub="Up to 10 investors. One table.">In person, by city: private dinners during the biggest global investor summits. Global events bring thousands of people and no selection. We bring reviewed investors only, premium venues and one table.</Head>
          <div className="ab-seats rv"><Seats /><span>Ten seats, each one personally confirmed.</span></div>

          <h3 className="ab-h3 rv">The evening</h3>
          <ol className="ab-steps rv">{EVENING.map(([k, h, p], i) => <li key={h} style={{ '--i': i }}><span>{k}</span><b>{h}</b><em>{p}</em></li>)}</ol>

          <div className="ab-two">
            <div className="rv">
              <h3 className="ab-h3">Asks & gives</h3>
              <p className="ab-p">Everyone shares one ask and one give. Bring a short intro, one ask and one give.</p>
              <dl className="ab-dl"><div><dt>Ask</dt><dd>A co-investor, deal flow, LPs, an introduction</dd></div><div><dt>Give</dt><dd>A deal, expertise, a contact, capital</dd></div></dl>
            </div>
            <div className="rv d1">
              <h3 className="ab-h3">Who is at the table</h3>
              <p className="ab-p">Active investors only, each reviewed personally.</p>
              <ul className="ab-list"><li>Family offices</li><li>LPs and allocators</li><li>GPs and VCs</li><li>Angels and private investors</li></ul>
            </div>
          </div>

          <h3 className="ab-h3 rv">Where we meet</h3>
          <div className="ab-cities rv">{CITIES.map(([n, f]) => <figure key={f}><img src={`/cities/${f}.jpg`} alt="" loading="lazy" /><figcaption>{n}</figcaption></figure>)}</div>
          <p className="ab-more rv">London · New York · Hong Kong · Monaco · and many more</p>

          <h3 className="ab-h3 rv">Good to know</h3>
          <ul className="ab-cols three rv">
            <li><b>Ten seats only</b><span>Arrive on time. Cancel at least 24 hours ahead.</span></li>
            <li><b>The bill</b><span>Each guest pays for their own order.</span></li>
            <li><b>Invite a fellow investor</b><span>Share your invitation link with them, and we will review their request.</span></li>
          </ul>
          {dinners.length > 0 && <a className="more rv" href="/events">Upcoming dinners: {dinners.map((e) => e.city).join(', ')} <Arr /></a>}
        </div></section>

        {/* Online10 */}
        <section className="sec" id="online10"><div className="wrap">
          <Head n="02" title="Legends Online10" sub="Your industry. Worldwide.">Up to 10 investors at one online table, 1-2 times a month. The investors you need are often in other cities and time zones - this is networking, deals and insights, without the flight.</Head>
          <ul className="ab-cols four rv">{WHO.map(([h, p]) => <li key={h}><b>{h}</b><span>{p}</span></li>)}</ul>
          <div className="ab-two">
            <div className="rv"><h3 className="ab-h3">By industry</h3><ul className="ab-list">{INDUSTRIES.map((t) => <li key={t}>{t}</li>)}</ul></div>
            <div className="rv d1">
              <h3 className="ab-h3">At every online call</h3>
              <ol className="ab-flow"><li>Short intros</li><li>Asks & gives</li><li>Networking</li></ol>
              <h3 className="ab-h3">Members and guests from</h3>
              <p className="ab-p">Amsterdam · London · Zurich · Monaco · New York · San Francisco · Dubai · Abu Dhabi · Riyadh · Hong Kong · Mumbai · Singapore</p>
            </div>
          </div>
        </div></section>

        {/* InvestHack */}
        <section className="sec" id="investhack"><div className="wrap">
          <Head n="03" title="InvestHack" sub="Members open their playbook.">Members share how they decide, followed by a live Q&A online.</Head>
          <div className="ab-hacks">
            {HACKS.map(([no, big, sub, q, n, r], i) => (
              <figure key={no} className={'rv d' + i}>
                <span className="ab-hk">InvestHack #{no}</span>
                <b className="ab-big">{big}</b><span className="ab-bs">{sub}</span>
                <blockquote>“{q}”</blockquote>
                <figcaption><b>{n}</b>{r}</figcaption>
              </figure>
            ))}
          </div>
          <div className="ab-two">
            <div className="rv"><h3 className="ab-h3">Members include</h3><ul className="ab-mem">{MEMBERS.map(([n, c]) => <li key={n}><b>{n}</b>{c}</li>)}</ul></div>
            <div className="rv d1">
              <h3 className="ab-h3">Your stage</h3>
              <p className="ab-p">Speak at InvestHack as a member: share your thesis and get seen by investors who decide.</p>
              <a className="more" href="/events/online">Next session: {ONLINE_NEXT.speaker}, {ONLINE_NEXT.day} {ONLINE_NEXT.month.slice(0, 3)} <Arr /></a>
            </div>
          </div>
        </div></section>

        {/* AI platform */}
        <section className="sec" id="platform"><div className="wrap">
          <Head n="04" title="AI platform" sub="Legends investors worldwide, in one place.">The right co-investor, peer or hobby partner can take years to find. Legends AI matches you by your asks, needs and offers.</Head>
          <div className="ab-two">
            <div className="rv">
              <h3 className="ab-h3">A real human on your side</h3>
              <p className="ab-p">Your Personal Legends Manager.</p>
              <ul className="ab-list">{MANAGER.map((t) => <li key={t}>{t}</li>)}</ul>
              <p className="ab-p ab-note">One call maps your mandate. After that, matches come to you.</p>
            </div>
            <div className="rv d1">
              <h3 className="ab-h3">One platform connects it all</h3>
              <div className="ab-hub">
                <div className="ab-hub-row">{FORMATS.slice(0, 3).map(([n, h, p]) => <span key={h}><b>{h}</b>{p}</span>)}</div>
                <div className="ab-hub-core"><b>Legends AI platform</b>Profile, asks, matches, intros</div>
                <div className="ab-hub-row out"><span><b>Co-investors & deals</b></span><span><b>Capital & LPs</b></span><span><b>Peers & hobbies</b></span></div>
              </div>
            </div>
          </div>
        </div></section>

        {/* House rules */}
        <section className="sec" id="rules"><div className="wrap">
          <Head n="05" title="House rules" sub="Simple, and the same at every table." />
          <ul className="ab-cols three rv">{RULES.map(([h, p]) => <li key={h}><b>{h}</b><span>{p}</span></li>)}</ul>
          <p className="ab-p ab-note rv">The table moderates itself. If someone breaks the rules, highlight it politely. If anything goes wrong during the evening, contact us right away.</p>
        </div></section>

        <Join />
      </main>
      <Footer />
    </>
  );
}

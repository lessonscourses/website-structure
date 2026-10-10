// Home / About / AI platform building blocks (overview structure, Tony-style visuals). Styles: app/hv.css
import HvCarousel from './HvCarousel';
import HvVoices from './HvVoices';

export const Arr = () => <svg className="hv-ar" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const WA = 'https://wa.me/35797916299';

export function Head({ n, title, sub, one, children }) {
  return (
    <div className="hv-head">
      {n && <span className="hv-n rv">{n}</span>}
      <h2 className="hv-h2 rv">{title}</h2>
      {sub && <p className="hv-sub rv d1">{sub}</p>}
      {one && <p className="hv-one rv d1">{one}</p>}
      {children}
    </div>
  );
}

export function Problem({ p, s }) {
  return <p className="hv-pr rv d2"><s>{p}</s><b>{s}</b></p>;
}

export function More({ href, children }) {
  return <a className="hv-more rv" href={href}>{children} <Arr /></a>;
}

/* ---------- formats index ---------- */
export function Formats({ title = 'One network. Three ways in.', sub = 'Dinners by city, sessions by industry and one platform in between.' }) {
  const F = [
    ['01', 'Legends10', 'In person, city by city', '/events', '/gallery/evening-1.jpg'],
    ['02', 'Online', 'Legends Online10, InvestHack', '/events/online', '/brand/online10-card.jpg'],
    ['03', 'AI platform', 'Matches and introductions', '/ai-platform', '/gallery/evening-2.jpg'],
  ];
  return (
    <>
      <Head title={title} sub={sub} />
      <div className="hv-ix">
        {F.map(([n, h, p, href, img], i) => (
          <a key={h} className={'rv d' + i} href={href}><img src={img} alt="" /><span className="hv-ix-t"><span>{n}</span><b>{h}</b><em>{p}</em><i>Explore <Arr /></i></span></a>
        ))}
      </div>
    </>
  );
}

/* ---------- 01 Legends10 ---------- */
const CITY_PICS = [['Dubai', 'dubai'], ['Singapore', 'singapore'], ['Riyadh', 'riyadh'], ['Abu Dhabi', 'abu-dhabi'], ['London', 'london']];
export function Legends10Block({ link = true }) {
  return (
    <section className="sec hv-sec" id="legends10"><div className="wrap">
      <Head n="01" title="Legends10" sub="Up to 10 investors. One dinner" one="In person, city by city: private dinners during the world’s leading investment summits." />
      <Problem p="Big conferences: thousands of people, no vetting." s="Vetted investors only. Premium venues. Private setting." />
      <div className="hv-pics"><figure className="rv"><img src="/gallery/evening-1.jpg" alt="" /></figure><figure className="rv d1"><img src="/gallery/evening-2.jpg" alt="" /></figure></div>
      <HvCarousel title="Where we meet" className="hv-cities">
        {CITY_PICS.map(([n, f]) => <figure key={f}><img src={`/cities/${f}.jpg`} alt="" loading="lazy" /><figcaption>{n}</figcaption></figure>)}
        <figure className="x"><b>New York<br />Hong Kong<br />Monaco</b><em>And many more</em></figure>
      </HvCarousel>
      {link && <More href="/events">Legends10 dinners</More>}
    </div></section>
  );
}

/* ---------- 02 Legends Online10 ---------- */
const PINS = [['San Francisco', 3.8, 25], ['New York', 20.9, 22.1], ['London', 47, 11.3, 1], ['Amsterdam', 48.8, 10.5], ['Zurich', 50, 15.4], ['Monaco', 49.7, 19.1, 1], ['Riyadh', 63.5, 38, 1], ['Dubai, Abu Dhabi', 66.6, 37.5], ['Mumbai', 72.8, 43.7], ['Hong Kong', 87.4, 40.4], ['Singapore', 83.7, 61.3, 1]];
const WHO = [['Family offices', 'Principals, CIOs'], ['Fund managers', 'VC, PE, private credit'], ['LPs & allocators', 'Funds and strategies'], ['Private investors', 'Angels and direct investors']];
const INDUSTRIES = ['Artificial intelligence', 'Healthcare & biotech', 'Infrastructure & real estate', 'Energy & resources', 'Fintech & private credit', 'Many more'];
export function Online10Block({ link = true }) {
  return (
    <section className="sec hv-sec" id="online"><div className="wrap">
      <Head n="02" title="Legends Online10" sub="Your industry. Worldwide" one="Up to 10 investors per online session, once or twice a month." />
      <Problem p="The investors you need are in other cities and time zones." s="Networking, deals and insights, without the flight." />
      <div className="hv-bento">
        <div className="hv-map rv">
          <p className="hv-cap">Members and guests from</p>
          <div className="hv-map-in">
            <img src="/brand/world-dots.svg" alt="" />
            {PINS.map(([c, x, y, l], i) => <span key={c} className={'hv-pin' + (l ? ' l' : '')} style={{ left: `calc(${x}% * .94 + 3%)`, top: `calc(${y}% * .9 + 5%)`, '--i': i }}><i /><b>{c}</b></span>)}
          </div>
        </div>
        <div className="hv-who rv d1">
          <p className="hv-cap">Who is at the table</p>
          <ul>{WHO.map(([h, p]) => <li key={h}><b>{h}</b><span>{p}</span></li>)}</ul>
        </div>
        <div className="hv-call rv d2">
          <p className="hv-cap">On every call</p>
          <ol><li>Short intros</li><li>Asks & offers</li><li>Networking</li></ol>
        </div>
        <div className="hv-inds rv">
          <p className="hv-cap">By industry</p>
          <ul>{INDUSTRIES.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </div>
      {link && <More href="/events/online">Legends Online10 sessions</More>}
    </div></section>
  );
}

/* ---------- 02 InvestHack ---------- */
const MEMBERS = [['Alex Felman', 'Felman Family Office'], ['Abhineet Singh', 'Al Siraj Holdings'], ['Janneke Niessen', 'CapitalT'], ['Radhesh Kanumury', 'Suvan Ventures'], ['Walied Albasheer', 'Intuitio Ventures'], ['Vijay Sivaram', 'RVAI Global'], ['Julius Bachmann', 'Bachmann Catalyst'], ['Amit Grover', 'Grover & Company']];
export function InvestHackBlock({ link = true }) {
  return (
    <section className="sec hv-sec" id="investhack"><div className="wrap">
      <Head n="02" title="InvestHack" sub="Inside members’ playbooks" one="Members share how they decide. Live Q&A, online." />
      <HvVoices />
      <div className="hv-stage">
        <div className="hv-ys rv"><h3>Your stage</h3><p>Speak at InvestHack as a member and share your thesis with the investors who make the decisions.</p></div>
        <div className="hv-mem rv d1"><h3>Members include</h3><ul>{MEMBERS.map(([n, c]) => <li key={n}><b>{n}</b>{c}</li>)}</ul></div>
      </div>
      {link && <More href="/events/online">InvestHack sessions</More>}
    </div></section>
  );
}

/* ---------- 03 AI platform ---------- */
const CHAT = [['me', 'Can’t make Singapore this time. Anything in Dubai or Riyadh?'], ['lm', 'Yes: Legends10 Dubai during SuperReturn Middle East week, or Riyadh during FII week.'], ['me', 'Dubai works.'], ['lm', 'Done, your seat is reserved. You’ll get the venue details with your confirmation.']];
export function Chat() {
  return (
    <div className="pf-chat hv-chat rv d1" data-chat>
      <div className="pf-ch-h"><img src="/brand/symbol.png" alt="" /><span><b>Personal Legends Manager</b><em>Online</em></span></div>
      <ul>{CHAT.map(([w, t], i) => <li key={i} className={'pf-m ' + w}>{t}</li>)}<li className="pf-m lm pf-ty" aria-hidden="true"><i /><i /><i /></li></ul>
    </div>
  );
}
export function Manager() {
  return (
    <div className="hv-human rv"><h3>A real person on your side</h3><p className="pm">Your Personal Legends Manager</p>
      <ul><li>Always in touch, one message away</li><li>Finds matches, makes intros</li><li>Handles whatever you need across the network</li><li>Saves you time</li></ul>
      <small>One call maps your mandate. After that, matches come to you.</small></div>
  );
}
export function Hub() {
  const IN = [['01', 'Legends10', 'Dinners by city'], ['02', 'Legends Online10', 'Calls by industry'], ['02', 'InvestHack', 'Member sessions']];
  const OUT = ['Co-investors & deals', 'Capital & LPs', 'Peers & hobbies'];
  const ys = [50, 150, 250];
  return (
    <div className="hv-hub rv">
      <div className="hv-hub-in">{IN.map(([n, h, p]) => <div key={h}><span>{n}</span><b>{h}</b><em>{p}</em></div>)}</div>
      <svg className="hv-hub-l" viewBox="0 0 100 300" preserveAspectRatio="none" aria-hidden="true">{ys.map((y) => <path key={y} d={`M0 ${y} C 60 ${y}, 40 150, 100 150`} />)}</svg>
      <div className="hv-hub-core"><img src="/brand/symbol.png" alt="" /><b>Legends AI platform</b><em>Profile, asks, matches, intros</em></div>
      <svg className="hv-hub-l r" viewBox="0 0 100 300" preserveAspectRatio="none" aria-hidden="true">{ys.map((y) => <path key={y} d={`M0 150 C 60 150, 40 ${y}, 100 ${y}`} />)}</svg>
      <div className="hv-hub-out">{OUT.map((t) => <div key={t}><b>{t}</b></div>)}</div>
    </div>
  );
}
export function AiBlock({ link = true }) {
  return (
    <section className="sec hv-sec" id="ai"><div className="wrap">
      <Head n="03" title="AI platform" sub="Legends investors worldwide, in one place" />
      <Problem p="The right co-investor, peer or hobby partner takes years to find." s="AI matches you with investors based on your asks, needs and offers." />
      <div className="hv-ai"><Manager /><Chat /></div>
      <h3 className="hv-k rv">One platform connects it all</h3>
      <Hub />
      {link && <More href="/ai-platform">Explore the AI platform</More>}
    </div></section>
  );
}

/* ---------- We unite legends + founder + join ---------- */
export function Founder() {
  return (
    <div className="hv-fd rv"><figure><img src="/brand/yanis.webp" alt="Yanis Chkhatval" /></figure>
      <div><span className="k2">From the founder</span><q>Every deal I regret started with the wrong introduction. Every deal I’m proud of started with the right one.</q><span className="by"><b>Yanis Chkhatval</b>Private investor and entrepreneur, founder of Legends</span></div></div>
  );
}
export function JoinCard() {
  return (
    <div className="hv-join rv"><div className="hv-join-h"><h3>Join Legends</h3><a className="btn gold big" href={WA} target="_blank" rel="noopener">Book a call on WhatsApp <Arr /></a></div>
      <ol className="hv-steps"><li><span>01</span><b>Apply</b><em>Application and private interview</em></li><li><span>02</span><b>Verify</b><em>KYC and payment</em></li><li><span>03</span><b>Onboarding</b><em>Welcome to Legends</em></li></ol>
      <small>We review applications in the order received. <a href={WA} target="_blank" rel="noopener"><b>WhatsApp +357 97 916299</b></a>, <a href="mailto:concierge@legends.app">concierge@legends.app</a></small></div>
  );
}
export function UniteBlock() {
  return (
    <section className="sec hv-sec" id="join"><div className="wrap">
      <Head title="We unite legends" sub="You keep the deals and contacts" />
      <div className="hv-group rv"><img src="/brand/unite.jpg" alt="Legends members and guests" /></div>
      <Founder />
      <JoinCard />
    </div></section>
  );
}

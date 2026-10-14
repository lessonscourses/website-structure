// Home / About / AI platform building blocks (overview structure, Tony-style visuals). Styles: app/hv.css
import HvCarousel from './HvCarousel';
import HvVoices from './HvVoices';
import HvOnline from './HvOnline';
import HvBars from './HvBars';
import { EssayTile } from '@/components/Cards';
import { ESSAYS } from '@/data/blog';
import { ONLINE10 } from '@/data/online';
import HvSteps from './HvSteps';
import { StackHub } from './HvPick';

export const Arr = () => <svg className="hv-ar" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const WA = 'https://wa.me/35797916299';

export function Head({ n, title, sub, one, children }) {
  return (
    <div className="hv-head">
      
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

/* AI platform card art: the member's ask, key words light up, matches come forward one by one */
const AI_M = [['FO', 'Family office', 'Dubai', '94%', ['Co-invests', 'Healthcare', 'GCC']], ['FM', 'Fund manager', 'London', '89%', ['Healthcare', '$5-20M', 'GCC']], ['PI', 'Private investor', 'Zurich', '86%', ['Co-invests', '$5-20M']]];
function AiArt() {
  const w = (t, k) => <mark style={{ '--k': k }}>{t}</mark>;
  return (
    <span className="aiart" aria-hidden="true">
      <span className="aiart-k">Your ask</span>
      <span className="aiart-q">Looking for {w('co-investors', 0)} in {w('healthcare', 1)}, tickets {w('$5-20M', 2)}, focus on the {w('GCC', 3)}.</span>
      <span className="aiart-lab">Matched to your ask</span>
      <span className="aiart-st">{AI_M.map(([a, h, c, p, t], k) => <span key={a} className="aiart-c" style={{ '--k': k }}><span className="aiart-r"><b>{a}</b><span><strong>{h}</strong>{c}</span><em>{p}</em></span><span className="aiart-t">{t.map((x) => <i key={x}>✓ {x}</i>)}</span></span>)}</span>
    </span>
  );
}

/* ---------- formats index ---------- */
export function Formats({ title = 'One network. Three ways in.', sub = 'Dinners by city, sessions by industry and one platform in between.' }) {
  const F = [
    ['01', 'Legends10', 'In person, city by city', '/events', '/gallery/evening-1.jpg'],
    ['02', 'Online', 'Legends Online10, InvestHack', '/events/online', '/brand/online10-dark.jpg'],
    ['03', 'AI platform', 'Matches and introductions', '/ai-platform', null],
  ];
  return (
    <>
      <Head title={title} sub={sub} />
      <div className="hv-ix">
        {F.map(([n, h, p, href, img], i) => (
          <a key={h} className={'rv d' + i + (img ? '' : ' ai')} href={href}>{img ? <img src={img} alt="" /> : <AiArt />}<span className="hv-ix-t"><b>{h}</b><em>{p}</em><i>Explore <Arr /></i></span></a>
        ))}
      </div>
    </>
  );
}

/* ---------- 01 Legends10 ---------- */
const CITY_PICS = [['Dubai', 'dubai'], ['Singapore', 'singapore'], ['London', 'london'], ['Riyadh', 'riyadh'], ['Abu Dhabi', 'abu-dhabi']];
export function Legends10Block({ link = true }) {
  return (
    <section className="sec hv-sec" id="legends10"><div className="wrap">
      <Head n="01" title="Legends10" sub="Up to 10 investors. One dinner" one="In person, city by city: private dinners during the world’s leading investment summits." />
      <Problem p="Big conferences: thousands of people, no vetting." s="Vetted investors only. Premium venues. Private setting." />
      <div className="hv-pics"><figure className="rv"><img src="/gallery/singapore-dinner.jpg" alt="" /></figure><figure className="rv d1"><img src="/gallery/evening-2.jpg" alt="" /></figure></div>
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
const GLOBE_PTS = [['San Francisco', 37.8, -122.4], ['New York', 40.7, -74], ['London', 51.5, -0.1], ['Amsterdam', 52.4, 4.9, 0], ['Zurich', 47.4, 8.5, 0], ['Monaco', 43.7, 7.4, 0], ['Riyadh', 24.7, 46.7, 0], ['Dubai, Abu Dhabi', 25.2, 55.3], ['Mumbai', 19.1, 72.9], ['Hong Kong', 22.3, 114.2], ['Singapore', 1.35, 103.8]];
const O10 = ONLINE10[0];
// city, lat, lon, local time of the session (13:00 UTC). TODO: confirm time
const MAP10 = [['San Francisco', 37.8, -122.4, '6:00 AM'], ['New York', 40.7, -74, '9:00 AM'], ['London', 51.5, -0.1, '2:00 PM'], ['Zurich', 47.4, 8.5, '3:00 PM', 0], ['Monaco', 43.7, 7.4, '3:00 PM', 0], ['Riyadh', 24.7, 46.7, '4:00 PM', 0], ['Dubai', 25.2, 55.3, '5:00 PM'], ['Mumbai', 19.1, 72.9, '6:30 PM', 0], ['Singapore', 1.35, 103.8, '9:00 PM'], ['Hong Kong', 22.3, 114.2, '9:00 PM']];
const SEATS10 = [['FO', 'Dubai'], ['GP', 'London'], ['LP', 'Zurich'], ['FM', 'New York'], ['PI', 'Singapore'], ['CIO', 'Riyadh'], ['VC', 'San Francisco'], ['FO', 'Monaco'], ['PI', 'Mumbai'], ['LP', 'Hong Kong']];
const FORMATS_ON = [['Legends Online10', 'o10', 'One industry. Up to 10 investors. 60 minutes.', ['Short intros', 'Asks & offers', 'Networking']], ['InvestHack', 'ih', 'A member shares how they decide. Then live Q&A.', ['Member talk', 'Live Q&A', 'Intros after']]];
const WHO = [['Family offices', 'Principals, CIOs'], ['Fund managers', 'VC, PE, private credit'], ['LPs & allocators', 'Funds and strategies'], ['Private investors', 'Angels and direct investors']];
const INDUSTRIES = ['Artificial intelligence', 'Healthcare & biotech', 'Infrastructure & real estate', 'Energy & resources', 'Fintech & private credit', 'Many more'];
export function OnlineBlock({ link = true }) {
  return (
    <section className="sec hv-sec" id="online"><div className="wrap">
      <Head title="Online" sub="Your industry. Worldwide"  />
      <Problem p="The investors you need are in other cities and time zones." s="Networking, deals and insights, without the flight." />
      <div className="o10b">
        <div className="o10b-tx">
          <div className="o10b-who rv"><span className="hv-lab">Who joins</span>
            <ol>{WHO.map(([h, p], k) => <li key={h}><span>0{k + 1}</span><b>{h}</b><em>{p}</em></li>)}</ol>
          </div>
          <dl className="hof-q rv d1">{FORMATS_ON.map(([tg, , , steps]) => <div key={tg}><dt>{tg}</dt><dd>{steps.map((t, j) => <span key={t}><i>{j + 1}</i>{t}</span>)}</dd></div>)}</dl>
        </div>
        <div className="onx-map lt rv d2" aria-hidden="true">
          <canvas data-flatmap={JSON.stringify(MAP10)} data-theme="light" />
        </div>
      </div>
      <HvOnline />
      <div className="hv-stage">
        <div className="hv-ys rv"><h3>Your stage</h3><p>Speak at InvestHack as a member and share your thesis with the investors who make the decisions.</p></div>
        <div className="hv-mem2 rv d1"><h3>Members include</h3><ul>{MEMBERS.map(([n, c]) => <li key={n}><b>{n}</b><span>{c}</span></li>)}</ul></div>
      </div>
      <div className="o10b-mq rv" aria-label="By industry"><div className="o10b-mq-in">{[0, 1].map((r) => <span key={r} aria-hidden={r === 1}>{INDUSTRIES.map((t) => <em key={t}>{t}</em>)}</span>)}</div></div>

      {link && <More href="/events/online">All online sessions</More>}
    </div></section>
  );
}
export const Online10Block = OnlineBlock;
export function InvestHackBlock() { return null; }

/* ---------- The network: wall of member faces + top-3 lists (About). Copy: LEGENDS_NETWORK_STATS_FINAL 2 ---------- */
const NET_TOP = [
  ['Where our investors are based and invest', [['38%', 'GCC & Middle East'], ['22%', 'UK & Europe'], ['21%', 'Asia']], 'Plus North America 15% and CIS 4%'],
  ['Who they are', [['30%', 'Venture capital'], ['23%', 'Private investors & angels'], ['18%', 'Family offices']], 'Plus private equity, holdings and private credit'],
  ['What they invest in', [['22%', 'Technology & AI'], ['15%', 'Energy & Climate'], ['12%', 'Healthcare & Biotech']], 'Plus 8 more industries'],
];
// order keeps studio / call-screenshot faces under the centre card
const FACE_ORDER = [0, 13, 2, 3, 4, 5, 6, 7, 8, 9, 25, 11, 12, 15, 1, 10, 16, 17, 18, 19, 20, 21, 22, 23, 14, 24, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
const FACES = FACE_ORDER.map((i) => `/network/f${String(i).padStart(2, '0')}.jpg`);
export function NetworkBlock() {
  return (
    <section className="sec hv-sec nw" id="network"><div className="wrap">
      <Head title="Legends in numbers" sub="The numbers speak for themselves" />
      <div className="nw-wall rv">
        <div className="nw-faces" aria-hidden="true">{FACES.map((f, i) => <img key={i} src={f} alt="" style={{ '--i': i }} />)}</div>
        <div className="nw-mid">
          <div className="nw-card">
            <b>260+</b>
            <p>investors in the network, in total</p>
            <div className="nw-eq"><span><strong>200+</strong>represent funds<br />& family offices</span><em>+</em><span className="d"><strong>60+</strong>private investors<br />& angels</span></div>
            <div className="nw-caps"><span><b>$10B+</b>managed, invested and deployed</span><span><b>$1M+</b>average ticket</span></div>
          </div>
        </div>
      </div>
    </div></section>
  );
}

/* About: shares as animated block bars (before Online) */
export function NetSharesBlock() {
  return (
    <section className="sec hv-sec" id="shares"><div className="wrap">
      <Head title="Who our investors are" sub="Where they are, who they are, what they back" />
      <HvBars />
      <p className="nw-trust rv">Every member is personally vetted. No brokers, no service providers.</p>
    </div></section>
  );
}

/* ---------- 02 InvestHack ---------- */
const MEMBERS = [['Alex Felman', 'Felman Family Office'], ['Abhineet Singh', 'Al Siraj Holdings'], ['Janneke Niessen', 'CapitalT'], ['Radhesh Kanumury', 'Suvan Ventures'], ['Walied Albasheer', 'Intuitio Ventures'], ['Vijay Sivaram', 'RVAI Global'], ['Julius Bachmann', 'Bachmann Catalyst'], ['Amit Grover', 'Grover & Company']];

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
      <Problem p="The right co-investor, peer or hobby partner takes years to find." s="AI matches you with investors based on your asks, needs and opportunities." />
      <HvSteps />
      <h3 className="hv-k rv">One platform connects it all</h3>
      <div className="rv"><StackHub /></div>
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
      <div className="hv-gal rv">
        <figure className="big v"><video autoPlay muted loop playsInline poster="/gallery/evening-5.jpg"><source src="https://legends.app/events/shared/media/highlights.mp4" type="video/mp4" /></video><span className="play"><i><svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg></i>Watch the highlights</span></figure>
        <figure><img src="/gallery/evening-3.jpg" alt="Legends members at a private evening" loading="lazy" /></figure>
        <figure><img src="/gallery/yanis-mic.jpg" alt="Yanis Chkhatval speaking at a Legends evening" loading="lazy" /></figure>
        <figure><img src="/gallery/yanis-duo.jpg" alt="Yanis Chkhatval with a Legends member" loading="lazy" /></figure>
        <figure><img src="/gallery/evening-4.jpg" alt="Legends members at a private evening in Dubai" loading="lazy" /></figure>
      </div>
      <Founder />
      <JoinCard />
    </div></section>
  );
}

/* Home: blog slider (bottom of the page, before Unite) */
export function BlogBlock() {
  return (
    <section className="sec hv-sec" id="blog"><div className="wrap">
      <Head title="Blog" sub="Essays from members and speakers" />
      <HvCarousel title="Latest essays" className="hv-blog">{ESSAYS.map((e) => <div key={e.url} className="hv-blog-i"><EssayTile e={e} /></div>)}</HvCarousel>
      <More href="/blog">All essays</More>
    </div></section>
  );
}

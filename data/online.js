// Legends Online: monthly live session with a top speaker (Zoom, 60 minutes).
// TODO: `url` - link to the session landing once it is published (cards show "Registration opens soon" while it is empty).
// TODO: the next session below is the current template (speaker and date to be confirmed).
export const ONLINE_NEXT = {
  slug: 'legends-online-06',
  no: '06',
  title: 'How a $200M+ Family Office Decides What Gets a $1-10M Direct Investment',
  speaker: 'Alex Felman',
  role: 'General Partner, Felman Family Office',
  day: 27, dow: 'Tue', month: 'October', iso: '2026-10-27',
  times: [['Dubai', '5:00 PM'], ['London', '1:00 PM'], ['New York', '9:00 AM'], ['Singapore', '9:00 PM']],
  format: '30-minute talk, then a closed discussion with the speaker',
  seats: 40,
  photo: 'https://belegends.club/api/files/pbc_2443081517/kfzgg99w8mivqcf/alex_f_l_q_rd9qlb3hjv.png',
  // standing figure for the page hero (same as belegends.club speaker intro)
  hero: 'https://belegends.club/api/files/pbc_2443081517/kfzgg99w8mivqcf/alex_f_lend_tk1a658sfq.png',
  url: '/events/legends-online-06',
  startsAt: '2026-10-27T13:00:00Z',
  lead: 'Alex Felman on what it takes to get to a yes - and why a yes means an 8-10-year horizon.',
  idea: { quote: ['A yes is a decade,', 'not a round.'], text: 'Patient capital does not answer to the pressure of a closing round. For Alex, four things matter more than the timing of the raise.',
    points: [['The science', 'Does the underlying technology actually hold?'], ['The commercial logic', 'Is there a business that can carry it?'], ['The people', 'Are the founders aligned for a decade, not a round?'], ['Staying power', 'Can it last beyond a single fundraising cycle?']] },
  bio: [
    'Alex came to investing from the lab. Trained in molecular toxicology and biochemistry, he spent the first part of his career on scientific commercialisation - the hard step between a discovery and a business that can carry it.',
    'Today he leads technology investments at Felman Family Office, a $200M+ family office where around 90% of the portfolio sits in direct investments. Typical checks are $1-10M across biotech, healthcare, agriculture and energy.',
    'His approach combines scientific rigor with family office discipline: the underlying science, commercial viability, founders’ alignment and the capacity to last beyond a single fundraising cycle. A yes from Alex means an 8-10-year minimum horizon.',
  ],
  creds: [['Family office', '$200M+, 90% direct'], ['Invests in', 'Biotech · Healthcare · Agriculture · Energy'], ['Typical check', '$1-10M'], ['Horizon', '8-10 years minimum']],
  hour: [[1.5, '01 · 10 min', 'The journey', 'How molecular toxicology and scientific commercialisation shaped his investment philosophy and risk framework.'], [2.3, '02 · 20 min', 'The decision framework', 'Underlying science, commercial viability, founders’ alignment and the capacity to last beyond a single fundraising cycle.'], [2.8, '03 · 30 min', 'The closed discussion', 'Questions from the room, candid discussion and relevant introductions with the speaker.']],
  forWho: ['An investor building a direct-investment practice', 'A fund manager working with family offices', 'A founder who wants to understand how patient capital decides'],
  notFor: 'pitching the speaker or looking for clients as a service provider.',
};

// Previous sessions (most recent first) - same cards as belegends.club/events.
const BF = 'https://belegends.club/api/files/pbc_1687431684', LU = 'https://images.lumacdn.com/uploads';
export const ONLINE_PAST = [
  { speaker: 'Alex Felman', role: 'General Partner, Felman Family Office', title: 'How a $200M+ Family Office Decides What Gets a $1-10M Direct Investment', date: 'Tue, 29 Sept 2026', label: 'InvestHack', img: `${BF}/8orlny5gc6hpprk/how_200_m_family_office_decides_what_gets_1_10_m_direct_investment_bd2byiyiet.png`, url: '/events/online/after-20-investments-what-makes-me-say-yes' },
  { speaker: 'Janneke Niessen', role: 'Founding Partner, CapitalT', title: 'How a Startup With No Revenue Raises Up to €2.5M', date: 'Tue, 22 Sept 2026', label: 'InvestHack', img: `${BF}/kwj6ys0yl8rpp2z/84lqdbvecvo_jxfp00qtbs.png`, url: '/events/online/how-a-startup-with-no-revenue-raises-up-to-2-5m' },
  { speaker: 'Walied Albasheer', role: 'Founder & Managing Partner', title: 'How a 30-Year Tech Founder Spots Real Companies Behind AI-Perfect Pitches', date: 'Tue, 15 Sept 2026', label: 'InvestHack', img: `${BF}/vl5gdqr1s6vdjjp/walied_albasheer_6at4u98zk4.png`, url: '/events/online/how-to-spot-real-companies-in-the-age-of-ai' },
  { speaker: 'Varun Malik', role: 'Founder & CEO, Konsälidön', title: 'How to Profit as a Human in an Unforgiving AI World', date: 'Tue, 8 Sept 2026', label: 'InvestHack', img: `${BF}/senl9tnhxv04zgw/varun_prev_f85bcua4y1.jpg`, url: '/events/online/one-business-hundreds-of-independent-minds' },
  { speaker: 'Julius Bachmann', role: 'Founder, Bachmann Catalyst', title: 'How to Build Ownership Culture & Care: Insights from 200+ Scale-Up Companies', date: 'Tue, 25 Aug 2026', label: 'Speaker session', img: `${LU}/bs/ac902c55-d881-468b-bfdb-320677d8a8ec.png`, url: 'https://belegends.club/events/ownership-culture-and-care' },
  { speaker: 'Vijay Sivaram', role: 'Co-Founder, RVAI Global', title: 'How to Build a $2B Company and Manage 650k+ People', date: 'Tue, 11 Aug 2026', label: 'Speaker session', img: `${LU}/2o/559112b4-ca42-4a7d-bfe8-66797fbb0833.png`, url: 'https://luma.com/gxeiw4sg' },
  { speaker: 'Abhineet Singh', role: 'CIO, Al Siraj Holdings', title: 'Inside the Family Office: How Patient Capital Decides', date: 'Thu, 30 Jul 2026', label: 'Speaker session', img: `${LU}/sx/b253d992-9e8f-48f5-b19e-2ce299ddee0c.png`, url: 'https://luma.com/2uelini6' },
  { speaker: 'Radhesh Kanumury', role: 'Managing Partner, Suvan Ventures', title: 'AI in the Enterprise: An Investor’s View', date: 'Thu, 23 Jul 2026', label: 'Speaker session', img: `${LU}/f1/589abc2d-6f41-4c2f-b9d2-dc4b90c88713.png`, url: 'https://luma.com/au6shx7n' },
  { speaker: 'Legends', role: 'AI-matched rooms', title: 'Private Founders & CEOs Online Networking: AI-Matched Rooms', date: 'Thu, 4 Jun 2026', label: 'AI-matched rooms', img: `${LU}/mq/8fd45b4c-0a1e-4620-9e8a-362b0f5dece5.png`, url: 'https://luma.com/0bpr2u1i' },
];

// Recaps of past sessions (content from belegends.club/events/<slug>), shown at /events/online/<slug>.
const P = 'https://belegends.club/api/files/pbc_2443081517', R = 'https://belegends.club/api/files/pbc_1321337024';
const SEPT_TIMES = [['Dubai', '5:00 PM'], ['London', '2:00 PM'], ['New York', '9:00 AM']];
export const ONLINE_RECAPS = [
  {
    slug: 'after-20-investments-what-makes-me-say-yes', no: '06', date: 'Tuesday, 29 September', times: SEPT_TIMES,
    title: 'How a $200M+ Family Office Decides What Gets a $1-10M Direct Investment',
    lead: '$200M+ family office. 90% direct investments, $5-10M checks. Alex Felman explains why saying yes means an 8-10-year commitment - and why scientific depth and commercial logic matter more than the pressure of a closing round.',
    speaker: 'Alex Felman', role: 'General Partner, Felman Family Office · Founder, Exponential U',
    hero: `${P}/kfzgg99w8mivqcf/alex_f_lend_tk1a658sfq.png`, photo: `${P}/kfzgg99w8mivqcf/alex_f_l_q_rd9qlb3hjv.png`,
    video: `${P}/kfzgg99w8mivqcf/investors_disappointment_w80zcz5bgs.mp4`,
    // TODO: seconds where only the speaker is talking (each plays 5s in the online hero). Replace with checked timecodes.
    reel: [8, 26, 44],
    shots: [`${P}/kfzgg99w8mivqcf/alex_speaking_4x3_xd5yplsfyq.jpg`, `${P}/kfzgg99w8mivqcf/alex_qu_nxt69yjfnx.png`],
    room: 'A funding deadline does not have to become an investor’s decision deadline. Alex Felman explained how his family office uses the time between rounds to assess execution, communication and the relationship itself. Drawing on his scientific background, he also described how promising claims can fail closer scrutiny - and why liking a team can make it harder to turn down a deal that falls below the investment threshold.',
    highlights: ['Why sitting out a funding round gives Alex time to compare founders’ promises with their results', 'How scientific claims can fall apart when the underlying studies and data are checked', 'Why a strong opportunity may still deserve a clear no when investment capacity is limited'],
    pull: 'We can sit out a specific funding round.',
    bio: 'Alex Felman is General Partner at Felman Family Office and Founder of Exponential U. Trained in molecular toxicology, biochemistry and bio-entrepreneurship, he moved from research and science education into commercialisation, venture building and investing. Today, he leads technology investments across biotech, healthcare, agriculture and energy. His approach combines a scientist’s view of what could become possible with a family office’s attention to risk, alignment and long-term relationships.',
    quote: 'Buy till exit: an 8-10-year minimum horizon.',
    focus: [['Investigates', 'The underlying science, commercial potential and problems a company is built to solve.'], ['Evaluates', 'Founders and fund managers beyond the urgency of a single fundraising round.'], ['Backs', 'Technology across biotech, healthcare, agriculture and selected areas of energy.']],
    stats: [['8-10 years', 'Minimum investment horizon'], ['1-2 years', 'Relationship before commitment'], ['90% · 10%', 'Direct · fund investments']],
  },
  {
    slug: 'how-a-startup-with-no-revenue-raises-up-to-2-5m', no: '05', date: 'Tuesday, 22 September', times: SEPT_TIMES,
    title: 'How a Startup With No Revenue Raises Up to €2.5M',
    lead: 'Before revenue, a startup cannot prove itself through financial results. Janneke Niessen explains how CapitalT evaluates founders, teams and early evidence when deciding whether to invest up to €2.5M.',
    speaker: 'Janneke Niessen', role: 'Founding Partner, CapitalT · Serial Entrepreneur · Investor',
    hero: `${P}/nkx8sv2d9mrxvkq/janneke_niessen_l_1n3fn26cd9.png`, photo: `${P}/nkx8sv2d9mrxvkq/janneke_niessen_l_q_mn6b93nrqu.png`,
    video: `${P}/nkx8sv2d9mrxvkq/passions_for_venture_vzuomgcl1g.mp4`,
    // TODO: seconds where only the speaker is talking (each plays 5s in the online hero). Replace with checked timecodes.
    reel: [8, 26, 44],
    shots: [`${P}/nkx8sv2d9mrxvkq/r_jn_2_z3d4ulm371.png`, `${P}/nkx8sv2d9mrxvkq/r_jn_3_fl4qi6t65.png`],
    room: 'Before a startup has revenue, an investor is placing a bet on the people who will build it. Drawing on her experience as both a founder and an investor, Janneke Niessen explained how CapitalT evaluates teams - and why even an exceptional founder may be pursuing a path that does not fit venture capital.',
    highlights: ['How CapitalT evaluates a founding team before revenue can provide evidence', 'Why shared vision and the ability to disagree productively matter as much as individual talent', 'How founders’ ambitions shape whether venture capital is the right fit'],
    pull: 'The main thing I look at is the founders and the founding team.',
    bio: 'Janneke Niessen is Founding Partner at CapitalT, a serial entrepreneur and investor. She co-founded DQ&A and Improve Digital, scaled both technology companies internationally and exited them before moving to the other side of the investment table.',
    quote: 'Before revenue, the team is the evidence.',
    focus: [['Evaluates', 'Founders and founding teams before revenue provides conventional evidence of performance.'], ['Investigates', 'The ambition, perseverance, experience and team dynamics behind an early-stage company.'], ['Backs', 'Pre-seed companies in Climate Tech and the Future of Work across Northern Europe.']],
    stats: [['2', 'Companies built and exited'], ['€500K-€1.2M', 'Typical investment'], ['Up to €2.5M', 'Maximum commitment']],
  },
  {
    slug: 'how-to-spot-real-companies-in-the-age-of-ai', no: '04', date: 'Tuesday, 15 September', times: SEPT_TIMES,
    title: 'How a 30-Year Tech Founder Spots Real Companies Behind AI-Perfect Pitches',
    lead: 'AI can now create polished pitches, market research and working MVPs before actual business substance develops. Drawing on nearly three decades as a founder and investor, Walied shows where polish ends and genuine substance begins.',
    speaker: 'Walied Albasheer', role: 'Founder & Managing Partner, Intuitio Ventures',
    hero: `${P}/limyhdr7l2k2qzo/walied_baner_4uq2nlyted.webp`, photo: `${P}/limyhdr7l2k2qzo/walied_quote_6m7wfe64io.webp`,
    video: `${P}/limyhdr7l2k2qzo/walied_video_gdltkz1dza.mp4`,
    // TODO: seconds where only the speaker is talking (each plays 5s in the online hero). Replace with checked timecodes.
    reel: [8, 26, 44],
    shots: [`${R}/o3lfehk0n70t7o6/walied_recap_speaker_kn68wsgc1i.webp`, `${R}/zikmno08g03lrb4/walied_recap_conversation_h6zhuavrc4.webp`],
    room: 'AI can now create a polished pitch, market research and working MVP before the business underneath has developed the same depth. Drawing on nearly three decades as a founder and investor, Walied showed where polish ends and real substance begins.',
    highlights: ['Why a polished pitch and working MVP no longer prove a real company exists underneath', 'How AI slop hides across the interface, functionality, business model and fundraising story', 'Why founder knowledge, defensibility, retention, referrals and revenue now matter more than polish'],
    pull: 'If you are a founder, you have to own your own numbers.',
    bio: 'Walied Albasheer is Founder and Managing Partner of Intuitio Ventures in Dubai, and Founder and CEO of Inbound LLC. He has been building and backing technology companies since 1996, across the UAE, Estonia, the United States and beyond.',
    quote: 'We need to look beyond chat models and focus on deeper, more sustainable applications of AI.',
    focus: [['Builds', 'Seven technology companies across different markets and technology shifts.'], ['Backs', 'Early-stage technology companies through Intuitio Ventures.'], ['Evaluates', 'Product, functionality, business model and fundraising story.']],
    stats: [['7 · 4', 'Companies founded · folded'], ['265', 'Ventures submitted to his fund'], ['4', 'Layers in The Slop Stack']],
  },
  {
    slug: 'one-business-hundreds-of-independent-minds', no: '03', date: 'Tuesday, 8 September', times: SEPT_TIMES,
    title: 'How to Profit as a Human in an Unforgiving AI World',
    lead: 'The AI shift won’t wait for leaders to catch up. Varun on where humans can still create value - and what investors should back next.',
    speaker: 'Varun Malik', role: 'Entrepreneur · Investor · Founder of Konsälidön',
    hero: `${P}/m0nw01p7ifx5xus/varun_baner_8miqz1fy27.webp`, photo: `${P}/m0nw01p7ifx5xus/varun_quote_doz79zzg7u.webp`,
    video: null,
    shots: [`${R}/5gxizhbsd8igauu/varun_recap_wide_iwejppjli7.webp`, `${R}/hkbt1im79iet34j/varun_recap_speaking_ffywfml5jk.webp`, `${R}/sxu4lreckuyfd5s/varun_recap_listening_5vzouf3vlf.webp`],
    room: 'Varun connected an exponential future to a practical investment question: where can humans still create and capture value when intelligence, decisions and execution become abundant?',
    highlights: ['Where human value can still compound as AI capabilities grow', 'How Varun turns exponential change into an investment filter', 'Why leaders need to understand, embrace and prepare'],
    pull: 'Powering humanity into an exponential future.',
    bio: 'Varun is an entrepreneur, investor and the Founder of Konsälidön. He has built and led consulting practices at PwC, Protiviti and Encreate Consulting, created technology and learning ventures, and spent years developing businesses across different operating models.',
    quote: null,
    focus: [['Invests in', 'Media, communities, experiences, training and practical tools.'], ['', 'Longevity, superintelligence, robotics and converging technologies.'], ['', 'Micro-investments designed to help leaders understand and prepare.']],
    stats: null,
  },
];
export const recap = (slug) => ONLINE_RECAPS.find((r) => r.slug === slug);

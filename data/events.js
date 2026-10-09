// Upcoming offline events. Each one has its own landing on legends.app/events/<slug>/.
// To add a dinner: copy an entry, change the fields, keep the list in date order.
export const EVENTS = [
  { slug: 'singapore-081026', img: 'https://belegends.club/api/files/pbc_1687431684/sxxpr1szvneou6e/sin_new_9oaezpbbck.png', city: 'Singapore', day: 8, dow: 'Thu', month: 'October', iso: '2026-10-08', week: 'Milken Institute Asia Summit', heroWeek: 'the investment week', start: 18 },
  { slug: 'dubai-141026', img: 'https://belegends.club/api/files/pbc_1687431684/00ygzgeuzspeeth/dub_new_thv6ckc02r.png', city: 'Dubai', day: 14, dow: 'Wed', month: 'October', iso: '2026-10-14', week: 'SuperReturn Middle East' },
  { slug: 'abu-dhabi-211026', img: 'https://belegends.club/api/files/pbc_1687431684/diywjxw1g7gaa3w/ab_new_uezs24w1ty.png', city: 'Abu Dhabi', day: 21, dow: 'Wed', month: 'October', iso: '2026-10-21', week: 'Campden Congress' },
  { slug: 'riyadh-281026', img: 'https://belegends.club/api/files/pbc_1687431684/k1d63i22rfmjpqu/ri_new_3u553kgk59.png', city: 'Riyadh', day: 28, dow: 'Wed', month: 'October', iso: '2026-10-28', week: 'FII10' },
].map((e) => ({ ...e, start: e.start || 17, time: `${e.start || 17}:00-${(e.start || 17) + 3}:00`, seats: 10, url: `/events/${e.slug}`, heroWeek: e.heroWeek || `${e.week} week` }));

export const event = (slug) => EVENTS.find((e) => e.slug === slug);
// the evening for a given start hour (17 -> 17:00 ... 20:00)
export const scheduleFor = (start = 17) => [[0, 0], [0, 30], [1, 0], [1, 30], [3, 0]].map(([h, m], i) => [`${start + h}:${m ? '30' : '00'}`, SCHEDULE[i][1], SCHEDULE[i][2]]);
export const DOW = { Mon: 'Mon', Tue: 'Tue', Wed: 'Wed', Thu: 'Thu', Fri: 'Fri' };
// shared media used on every dinner page
export const MEDIA = 'https://legends.app/events/shared';

export const SCHEDULE = [
  ['17:00', 'Arrival', 'Meet the other nine investors.'],
  ['17:30', 'Introductions', 'Who you are, what you invest in.'],
  ['18:00', 'Asks & gives', 'What you need. What you can offer.'],
  ['18:30', 'Dinner', 'Deals, market views, open conversation.'],
  ['20:00', 'Close', 'The network continues after dinner.'],
];

// Events that have not ended yet (the day itself still counts as upcoming).
export const upcoming = (now = new Date()) => EVENTS.filter((e) => new Date(e.iso + 'T23:59:59Z') >= now);

// Past in-person events (as on belegends.club/events), newest first. They link to Luma until a recap exists.
// A recap page (/events/recap/<slug>) is built for every entry that has a `story`; set `url` to `/events/recap/<slug>` then.
export const PAST_DINNERS = [
  { slug: 'luma-5gxj0edv', city: 'Dubai', dow: 'Wed', day: 11, month: 'March', title: 'Private Founders & Investors Dinner · $5M-50M revenue · CityWalk', cover: 'https://images.lumacdn.com/event-covers/8h/5df7222a-61e2-4b98-8d0a-48c753506dea.png', url: 'https://luma.com/5gxj0edv' },
  { slug: 'luma-wm2cnsor', city: 'Dubai', dow: 'Tue', day: 10, month: 'March', title: 'Private Founders & CEOs Dinner · $1M-5M revenue · Bluewaters', cover: 'https://images.lumacdn.com/event-covers/go/4246de9c-9ea4-4ac0-b088-48713ac3385b.png', url: 'https://luma.com/wm2cnsor' },
  { slug: 'luma-tqezkgzp', city: 'Dubai', dow: 'Wed', day: 4, month: 'March', title: 'Private Founders & CEOs Dinner · $30M-100M revenue · Bluewaters', cover: 'https://images.lumacdn.com/event-covers/sz/6e2bd345-02fb-4a82-bcc7-462dc155f00b.png', url: 'https://luma.com/tqezkgzp' },
  { slug: 'luma-t5mz36t1', city: 'Dubai', dow: 'Tue', day: 3, month: 'March', title: 'Private Founders & CEOs Dinner · $5M-30M revenue · Bluewaters', cover: 'https://images.lumacdn.com/event-covers/up/3be01720-678f-421b-b083-618f0866989d.png', url: 'https://luma.com/t5mz36t1' },
  { slug: 'luma-ljn82zc1', city: 'Dubai', dow: 'Wed', day: 25, month: 'February', title: 'Founders & CEOs Roundtable · 8 seats · $1M+ revenue', cover: 'https://images.lumacdn.com/event-covers/0z/e029a7d5-9ca7-422b-a6ef-30fa356b061f.png', url: 'https://luma.com/ljn82zc1' },
  { slug: 'luma-r7z7hy3x', city: 'Dubai', dow: 'Tue', day: 24, month: 'February', title: 'Founders & CEOs Roundtable · 8 seats · $1M+ revenue', cover: 'https://images.lumacdn.com/event-covers/od/1b39359a-ad42-423a-acfb-d8fb3fe07b07.png', url: 'https://luma.com/r7z7hy3x' },
  { slug: 'luma-2zrzkgam', city: 'Dubai', dow: 'Thu', day: 19, month: 'February', title: 'Private Networking Dinner · 8 seats · founders & senior executives', cover: 'https://images.lumacdn.com/event-covers/zg/cbc33b3e-536d-4bd5-ad66-fc061efde2d1.png', url: 'https://luma.com/2zrzkgam' },
].map((e) => ({ ...e, date: `${e.dow}, ${e.day} ${e.month.slice(0, 3)} 2026` }));

const G = '/gallery';
// Layout example for a dinner recap, open at /events/recap/example.
// TODO: replace with a real evening (text, numbers, photos, video) and list it in PAST_DINNERS.
export const RECAPS = [
  // TODO: demo recap for Legends10 Singapore (8 Oct 2026) - replace text, numbers and photos with the real evening.
  { slug: 'singapore-081026', city: 'Singapore', day: 8, dow: 'Thu', month: 'October', week: 'Milken Institute Asia Summit week', cover: 'https://belegends.club/api/files/pbc_1687431684/sxxpr1szvneou6e/sin_new_9oaezpbbck.png',
    title: 'Legends10 Singapore · Milken Institute Asia Summit week',
    lead: 'Ten investors at one table during Milken Asia week. Family offices from Singapore and the Gulf, two fund managers and a private investor compared notes on Asian private credit, AI infrastructure and co-investing across the region.',
    story: ['The evening opened with short intros around the table: who each guest is, what they invest in and where.', 'Then asks and gives - one each. Two guests were looking for co-investors in data-centre deals in Southeast Asia, another offered access to a private credit fund closing later this year.', 'Dinner turned into open conversation. By the end of the night several follow-ups were agreed person to person, only where both sides said yes.'],
    stats: [['10', 'Investors at the table'], ['5', 'Countries represented'], ['7', 'Follow-ups agreed']],
    themes: ['Asian private credit', 'AI and data-centre infrastructure', 'Family office co-investment', 'Gulf capital into Asia'],
    photos: [`${G}/evening-3.jpg`, `${G}/evening-1.jpg`, `${G}/evening-4.jpg`, `${G}/evening-2.jpg`, `${G}/evening-5.jpg`], video: `${MEDIA}/media/highlights.mp4` },
  { slug: 'example', city: 'Dubai', day: 17, dow: 'Thu', month: 'September', week: 'Dubai FinTech week', template: true, cover: `${G}/evening-4.jpg`,
    lead: 'Ten investors, one table on the 70th floor. Family offices from the Gulf, two GPs from London and a founder-turned-LP compared notes on private credit and secondaries.',
    story: ['The evening opened with a short round of asks and gives: what each guest was looking for this quarter and what they could offer the table.', 'By dessert three co-investment conversations had started, and two guests agreed to look at the same secondary deal together the following week.', 'As always, nothing was pitched from a stage. The introductions were made person to person, only where both sides said yes.'],
    stats: [['10', 'Investors at the table'], ['4', 'Countries represented'], ['6', 'Introductions made after dinner']],
    themes: ['Private credit', 'GP-led secondaries', 'Family office co-investment', 'Gulf capital into Europe'],
    photos: [`${G}/evening-4.jpg`, `${G}/evening-1.jpg`, `${G}/evening-3.jpg`, `${G}/evening-2.jpg`, `${G}/evening-5.jpg`], video: `${MEDIA}/media/highlights.mp4` },
].map((e) => ({ ...e, url: `/events/recap/${e.slug}`, date: `${e.dow}, ${e.day} ${e.month.slice(0, 3)} 2026` }));
export const pastDinner = (slug) => RECAPS.find((e) => e.slug === slug);

// Past dinners list: recaps (newest first) + the older Luma dinners
export const PAST_ALL = [...RECAPS.filter((r) => !r.template).map((r) => ({ ...r, title: r.title || `Legends10 ${r.city}` })), ...PAST_DINNERS];

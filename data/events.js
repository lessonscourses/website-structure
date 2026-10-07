// Upcoming offline events. Each one has its own landing on legends.app/events/<slug>/.
// To add a dinner: copy an entry, change the fields, keep the list in date order.
export const EVENTS = [
  { slug: 'singapore-081026', city: 'Singapore', day: 8, dow: 'Thu', month: 'October', iso: '2026-10-08', week: 'Milken Institute Asia Summit', heroWeek: 'the investment week', start: 18 },
  { slug: 'dubai-141026', city: 'Dubai', day: 14, dow: 'Wed', month: 'October', iso: '2026-10-14', week: 'SuperReturn Middle East' },
  { slug: 'abu-dhabi-211026', city: 'Abu Dhabi', day: 21, dow: 'Wed', month: 'October', iso: '2026-10-21', week: 'Campden Congress' },
  { slug: 'riyadh-281026', city: 'Riyadh', day: 28, dow: 'Wed', month: 'October', iso: '2026-10-28', week: 'FII10' },
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

// Past dinners with a recap page at /events/recap/<slug>.
// TODO: these are templates to show the layout - replace city, date, text, photos and video with the real ones.
const G = '/gallery';
export const PAST_DINNERS = [
  { slug: 'dubai-170926', city: 'Dubai', day: 17, dow: 'Thu', month: 'September', week: 'Dubai FinTech week', cover: `${G}/evening-4.jpg`,
    lead: 'Ten investors, one table on the 70th floor. Family offices from the Gulf, two GPs from London and a founder-turned-LP compared notes on private credit and secondaries.',
    story: ['The evening opened with a short round of asks and gives: what each guest was looking for this quarter and what they could offer the table.', 'By dessert three co-investment conversations had started, and two guests agreed to look at the same secondary deal together the following week.', 'As always, nothing was pitched from a stage. The introductions were made person to person, only where both sides said yes.'],
    stats: [['10', 'Investors at the table'], ['4', 'Countries represented'], ['6', 'Introductions made after dinner']],
    themes: ['Private credit', 'GP-led secondaries', 'Family office co-investment', 'Gulf capital into Europe'],
    photos: [`${G}/evening-4.jpg`, `${G}/evening-1.jpg`, `${G}/evening-3.jpg`, `${G}/evening-2.jpg`, `${G}/evening-5.jpg`], video: `${MEDIA}/media/highlights.mp4` },
  { slug: 'riyadh-100926', city: 'Riyadh', day: 10, dow: 'Wed', month: 'September', week: 'Riyadh investor week', cover: `${G}/evening-2.jpg`,
    lead: 'A private table for ten in Riyadh: sovereign-adjacent allocators, two single-family offices and growth investors looking at the region.',
    story: ['The conversation moved quickly from macro to specific mandates - what each investor could actually deploy in the next twelve months.', 'Two guests found they were already circling the same healthcare platform and agreed to compare diligence.', 'The table closed with a round of follow-ups that the Legends team coordinated over the next days.'],
    stats: [['10', 'Investors at the table'], ['3', 'Countries represented'], ['5', 'Introductions made after dinner']],
    themes: ['Healthcare platforms', 'Growth equity', 'Regional mandates'],
    photos: [`${G}/evening-2.jpg`, `${G}/evening-5.jpg`, `${G}/evening-3.jpg`, `${G}/evening-1.jpg`], video: null },
  { slug: 'abu-dhabi-030926', city: 'Abu Dhabi', day: 3, dow: 'Wed', month: 'September', week: 'Abu Dhabi finance week', cover: `${G}/evening-1.jpg`,
    lead: 'Ten investors over dinner by the water: allocators, fund managers and private investors with a shared interest in long-horizon capital.',
    story: ['Guests were seated by what they were looking for, not by title, so each conversation started from a real need.', 'The evening ended with two LP introductions and a standing invitation to the next table in Dubai.'],
    stats: [['10', 'Investors at the table'], ['5', 'Countries represented'], ['4', 'Introductions made after dinner']],
    themes: ['LP-GP relationships', 'Infrastructure', 'Long-horizon capital'],
    photos: [`${G}/evening-1.jpg`, `${G}/evening-4.jpg`, `${G}/evening-2.jpg`, `${G}/evening-3.jpg`], video: null },
  { slug: 'singapore-270826', city: 'Singapore', day: 27, dow: 'Thu', month: 'August', week: 'Singapore wealth week', cover: `${G}/evening-3.jpg`,
    lead: 'A table of ten in Singapore with family offices from Southeast Asia, a Swiss multi-family office and two venture GPs.',
    story: ['The talk centred on how Asian family offices are moving from funds to direct deals, and where they need partners to do it.', 'Three guests continued the conversation the following morning.'],
    stats: [['10', 'Investors at the table'], ['6', 'Countries represented'], ['5', 'Introductions made after dinner']],
    themes: ['Direct deals', 'Southeast Asia', 'Venture'],
    photos: [`${G}/evening-3.jpg`, `${G}/evening-5.jpg`, `${G}/evening-4.jpg`, `${G}/evening-1.jpg`], video: null },
  { slug: 'london-200826', city: 'London', day: 20, dow: 'Thu', month: 'August', week: 'London summer week', cover: `${G}/evening-5.jpg`,
    lead: 'Ten investors in a private room in Mayfair: European family offices, a pension allocator and growth investors.',
    story: ['Guests swapped views on secondaries pricing and the return of IPO windows, then moved to specific asks.', 'Four introductions followed within the week.'],
    stats: [['10', 'Investors at the table'], ['4', 'Countries represented'], ['4', 'Introductions made after dinner']],
    themes: ['Secondaries', 'Pension capital', 'Growth'],
    photos: [`${G}/evening-5.jpg`, `${G}/evening-2.jpg`, `${G}/evening-3.jpg`, `${G}/evening-4.jpg`], video: null },
  { slug: 'zurich-130826', city: 'Zurich', day: 13, dow: 'Thu', month: 'August', week: 'Zurich private banking week', cover: `${G}/evening-2.jpg`,
    lead: 'An evening in Zurich with private bankers turned principals, single-family offices and a deep-tech GP.',
    story: ['The table compared how Swiss family offices underwrite deep tech, and where they would rather co-invest than lead.', 'Three guests agreed to share deal flow in the same sector.'],
    stats: [['10', 'Investors at the table'], ['3', 'Countries represented'], ['3', 'Introductions made after dinner']],
    themes: ['Deep tech', 'Family offices', 'Co-investment'],
    photos: [`${G}/evening-2.jpg`, `${G}/evening-1.jpg`, `${G}/evening-5.jpg`, `${G}/evening-4.jpg`], video: null },
].map((e) => ({ ...e, url: `/events/recap/${e.slug}`, date: `${e.dow}, ${e.day} ${e.month.slice(0, 3)} 2026` }));
export const pastDinner = (slug) => PAST_DINNERS.find((e) => e.slug === slug);

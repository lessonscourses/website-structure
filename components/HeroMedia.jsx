// Right side of the light page heroes (components/PageHero.jsx, prop `aside`).
// Motion: [data-speed] parallax and [data-deck] rotation live in lib/site.js.
const DOW = { Mon: 'Mon', Tue: 'Tue', Wed: 'Wed', Thu: 'Thu', Fri: 'Fri', Sat: 'Sat', Sun: 'Sun' };
const MEDIA = 'https://belegends.club/assets';

// Events: film + photo collage with date chips (same as the Q4 series landing)
export function EventsCollage({ events }) {
  const [a, b] = events;
  return (
    <div className="hm hm-ev rv d1">
      <div className="hm-frame f1" data-speed="-.06"><video autoPlay muted loop playsInline poster={`${MEDIA}/site-loop-poster.jpg`}><source src={`${MEDIA}/site-loop.webm`} type="video/webm" /></video></div>
      <div className="hm-frame f2" data-speed=".08"><img src={`${MEDIA}/block-6-2.jpg`} alt="" /></div>
    </div>
  );
}

// Blog: a page where the essay is being written - author, title and excerpt appear word by word,
// then the page turns and the next essay starts (lib/site.js, [data-write]).
const SKETCHES = ['/sketch/evening-3.svg', '/sketch/evening-4.svg', '/sketch/evening-1.svg', '/sketch/evening-2.svg'];
export function EssayDeck({ essays }) {
  const list = essays.slice(0, 6).map((e, i) => ({ sk: SKETCHES[i % SKETCHES.length], au: e.author, ti: e.title, ex: e.excerpt, url: e.url }));
  return (
    <div className="hm hm-bl rv d1">
      <a className="wr" href={list[0].url} data-write={JSON.stringify(list)}>
        <span className="wr-pg" aria-hidden="true" />
        <span className="wr-au">{list[0].au}</span>
        <span className="wr-ti">{list[0].ti}</span>
        <span className="wr-ex">{list[0].ex}</span>
      </a>
    </div>
  );
}

// Online: one square film that is clear in the centre and dissolves into a dot screen towards the edges.
// Recaps crossfade slowly one after another (lib/site.js, [data-reel]).
export function SessionReel({ clips }) {
  return (
    <div className="hm hm-reel rv d1">
      <div className="dz" data-reel data-clips={JSON.stringify(clips.map((c) => ({ v: c.video, t: c.reel })))}>
        <video muted playsInline preload="auto" src={clips[0]?.video} />
        <video muted playsInline preload="auto" />
      </div>
    </div>
  );
}

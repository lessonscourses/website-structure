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

// Blog: an essay "being written" - the cover develops, then the author and title type in, it holds,
// fades away and the next essay is written. No card, no shadow. Logic: lib/site.js, [data-write].
export function EssayDeck({ essays }) {
  const list = essays.slice(0, 6).map((e) => ({ img: e.img, au: e.author, ti: e.title, url: e.url }));
  return (
    <div className="hm hm-bl rv d1">
      <a className="wr" href={list[0].url} data-write={JSON.stringify(list)}>
        <span className="wr-img"><img src={list[0].img} alt="" /></span>
        <span className="wr-au">{list[0].au}</span>
        <span className="wr-ti">{list[0].ti}</span>
      </a>
    </div>
  );
}

// Online: four tiles in a staggered 2x2 grid. Tiles 1-3 each play one recap and jump to a new moment
// every ~1.5s (quick cuts); tile 4 cycles through all recaps. Logic: lib/site.js, [data-reel].
export function SessionReel({ clips }) {
  const tiles = [clips[0], clips[1], clips[2], clips[0]].map((c, i) => ({ ...(c || clips[0]), all: i === 3 }));
  const col = (list, k) => list.map((c, i) => (
    <figure key={k + i} className="rt" data-clip={c.all ? 'all' : ''}>
      <video muted playsInline preload="auto" poster={c.poster} src={c.video} />
      {c.all ? <figcaption>Legends Online</figcaption> : <figcaption>{c.speaker}</figcaption>}
    </figure>
  ));
  return (
    <div className="hm hm-reel rv d1">
      <div className="rg" data-reel data-clips={JSON.stringify(clips.map((c) => c.video))}>
        <div className="rg-col">{col([tiles[0], tiles[2]], 'a')}</div>
        <div className="rg-col">{col([tiles[1], tiles[3]], 'b')}</div>
      </div>
    </div>
  );
}

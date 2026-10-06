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

// Blog: a deck of essay covers that deals itself, the author chip follows the top card
export function EssayDeck({ essays }) {
  const list = essays.slice(0, 5);
  return (
    <div className="hm hm-bl rv d1">
      <div className="deck" data-deck>
        {list.map((e) => (
          <a key={e.url} href={e.url} className="deck-c" data-au={e.author} data-role={e.role} data-title={e.title}>
            <img src={e.img} alt={e.title} />
          </a>
        ))}
      </div>
    </div>
  );
}

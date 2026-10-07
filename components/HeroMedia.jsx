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

// Blog: a strip of essay covers that moves on by itself - one large in the middle,
// the neighbours half visible and fading into the background (lib/site.js, [data-strip])
export function EssayDeck({ essays }) {
  return (
    <div className="hm hm-bl rv d1">
      <div className="strip" data-strip>
        {essays.map((e) => <a key={e.url} href={e.url} className="strip-c" aria-label={e.title}><img src={e.img} alt="" /></a>)}
      </div>
    </div>
  );
}

// Online: a live call - the speaker on the main screen, the room in small tiles (lib/site.js rotates who speaks)
export function LiveCall({ s, past }) {
  const room = ['/gallery/evening-1.jpg', '/gallery/evening-4.jpg', '/gallery/evening-2.jpg', '/gallery/evening-3.jpg', '/gallery/evening-5.jpg', '/gallery/evening-1.jpg'];
  const pos = ['20% 40%', '35% 45%', '60% 40%', '75% 45%', '45% 40%', '85% 40%'];
  return (
    <div className="hm hm-call rv d1" data-call>
      <div className="call">
        <div className="call-bar"><span className="call-live"><i />Live</span><b>Legends Online {s.no}</b><span className="call-t" data-call-time>00:00</span></div>
        <div className="call-main">
          <img src={s.photo} alt={s.speaker} />
          <span className="call-name"><i />{s.speaker}</span>
        </div>
        <div className="call-room">
          {room.map((src, i) => <span key={i} className="call-tile" style={{ backgroundImage: `url(${src})`, backgroundPosition: pos[i] }} />)}
          <span className="call-tile more"><b>+{s.seats - 7}</b>investors</span>
        </div>
      </div>
      {past[0] && <div className="call-prev" data-speed=".08"><img src={past[0].img} alt="" /><span>Last session · {past[0].speaker}</span></div>}
    </div>
  );
}

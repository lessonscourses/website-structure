import DayLine from './DayLine';
import { pillarName } from '@/data/blog';

const Arr = () => <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

export function EventCard({ e, next = false }) {
  return (
    <a className={'ev' + (next ? ' next' : '') + (e.img ? ' has-img' : '')} href={e.url}>
      {e.img && <span className="ev-img"><img src={e.img} alt="" loading="lazy" /></span>}
      <span className="ev-d"><b>{e.day}</b><span>{e.dow}<br />{e.month.slice(0, 3)}</span></span>
      <h3>{e.city}</h3>
      <p>{e.week} week</p>
      <ul className="ev-meta"><li>{e.time}</li><li>{e.seats} investors</li></ul>
      <span className="ev-go">View the dinner <Arr /></span>
    </a>
  );
}

// Next Legends Online session - wide card.
// Next online session on the home page: title + day line (components/DayLine.jsx)
export function OnlineCard({ s }) {
  const Tag = s.url ? 'a' : 'div';
  return (
    <Tag className="obd" {...(s.url ? { href: s.url } : {})}>
      <div className="obd-tx">
        <h3>{s.title}</h3>
        <p className="obd-spk"><b>{s.speaker}</b> · {s.role}</p>
        {s.url && <span className="btn gold big">Reserve your seat <Arr /></span>}
      </div>
      <DayLine s={s} />
    </Tag>
  );
}

export function PastList({ items, paged }) {
  return (
    <div className="pc-grid" {...(paged ? { 'data-paged': paged } : {})}>
      {items.map((p) => (
        <a key={p.url} className={'pc' + (p.next ? ' next' : '')} href={p.url} {...(p.url.startsWith('/') ? {} : { target: '_blank', rel: 'noopener' })}>
          <span className="pc-img"><img src={p.img} alt="" loading="lazy" /><em>Online · {p.label}</em></span>
          <span className="pc-tx">
            <h4>{p.title}</h4>
            <span className="pc-by"><b>{p.speaker}</b>{p.role}</span>
            <span className="pc-d">{p.date} · Online{p.next && <b> · Registration open</b>}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

export function ArticleCard({ a, big = false }) {
  return (
    <a className={'ar' + (big ? ' big' : '')} href={`/blog/${a.slug}`} data-pillar={a.pillar}>
      <h3>{a.title}</h3>
      <p>{a.lede}</p>
      <span className="ar-meta">{pillarName(a.pillar)} · {a.read} min read</span>
      {big && <span className="ev-go">Read <Arr /></span>}
    </a>
  );
}

// Line icons for the three ways Legends works.
export function WayIcon({ k }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (k === 0) return (
    <svg className="way-ic" viewBox="0 0 64 64" {...p}><path d="M8 54h48M12 54V26M24 54V26M40 54V26M52 54V26M6 26h52M32 8L6 22h52z" /></svg>
  );
  if (k === 1) return (
    <svg className="way-ic" viewBox="0 0 64 64" {...p}><circle cx="32" cy="32" r="13" />{Array.from({ length: 10 }, (_, i) => { const a = (i * 36 - 90) * Math.PI / 180; return <circle key={i} cx={(32 + 22 * Math.cos(a)).toFixed(1)} cy={(32 + 22 * Math.sin(a)).toFixed(1)} r="3" />; })}</svg>
  );
  return (
    <svg className="way-ic" viewBox="0 0 64 64" {...p}><circle cx="32" cy="32" r="5" /><circle cx="10" cy="14" r="4" /><circle cx="54" cy="12" r="4" /><circle cx="12" cy="52" r="4" /><circle cx="54" cy="50" r="4" /><path d="M28 29L13 17M36 29l15-14M28 35L15 49M36 35l15 12M14 14h36M12 18v30M54 16v30" opacity=".45" /></svg>
  );
}

// Essay by a Legends speaker (photo card, links to belegends.club)
export function EssayCard({ e, big = false }) {
  return (
    <a className={'es' + (big ? ' big' : '')} href={e.url} target="_blank" rel="noopener" data-pillar="essay">
      <span className="es-img"><img src={e.img} alt="" loading="lazy" /></span>
      <span className="es-tx">
        <h3>{e.title}</h3>
        <p>{e.excerpt}</p>
        <span className="es-by"><b>{e.author}</b>{e.role} · {e.read} min read</span>
        {big && <span className="ev-go">Read the essay <Arr /></span>}
      </span>
    </a>
  );
}

// The next dinner, shown large with a countdown
export function FeaturedEvent({ e, wide = false }) {
  const day = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday' }[e.dow] || e.dow;
  return (
    <a className={'fe' + (wide ? ' wide' : '')} href={e.url}>
      <span className="fe-next"><i />Next dinner · in <b data-days={e.iso + 'T13:00:00Z'}>-</b> days</span>
      <h3>{e.city}</h3>
      <p className="fe-week">During {e.week} week</p>
      <div className="fe-bottom">
        <dl className="fe-facts">
          <div><dt>Date</dt><dd>{day}, {e.day} {e.month.slice(0, 3)}</dd></div>
          <div><dt>Time</dt><dd>{e.time}</dd></div>
          <div><dt>Guests</dt><dd>{e.seats} investors</dd></div>
        </dl>
        <span className="btn gold">Request an invitation <Arr /></span>
      </div>
    </a>
  );
}

// Next dinner on the left, the following ones listed on the right
export function Upcoming({ events }) {
  return (
    <div className="up">
      <div className="rv up-main"><FeaturedEvent e={events[0]} /></div>
      <div className="up-list">
        {events.slice(1).map((e, i) => <div key={e.slug} className={'rv d' + (i + 1)}><EventRow e={e} /></div>)}
      </div>
    </div>
  );
}

// Compact row for the dinners after the next one
export function EventRow({ e }) {
  return (
    <a className="er" href={e.url}>
      <span className="ev-d"><b>{e.day}</b><span>{e.dow}<br />{e.month.slice(0, 3)}</span></span>
      <span className="er-c"><h4>{e.city}</h4><span>{e.week} week · {e.time}</span></span>
      <Arr />
    </a>
  );
}

// Photo tile: the cover does the talking, a small caption below,
// the description slides up over the photo on hover.
export function EssayTile({ e, big = false }) {
  return (
    <a className={'et' + (big ? ' big' : '')} href={e.url}>
      <span className="et-img">
        <img src={e.img} alt="" loading="lazy" />
        <span className="et-pop"><span>{e.excerpt}</span><b>Read the essay <Arr /></b></span>
      </span>
      <span className="et-cap"><b className="et-au">{e.author}</b><h3>{e.title}</h3></span>
    </a>
  );
}

// Shown when no session or dinner is open
export function NoEvents() {
  return (
    <div className="noev rv">
      <h3>No public events open right now</h3>
      <p>New sessions are announced regularly. To hear about the next one first, <button type="button" data-open="apply">apply to join</button>.</p>
    </div>
  );
}

// Past dinner with a recap page
export function DinnerCard({ e, i = 0 }) {
  return (
    <a className={'drc rv d' + (i % 3)} href={e.url} {...(e.url.startsWith('/') ? {} : { target: '_blank', rel: 'noopener' })}>
      <span className="drc-img"><img src={e.cover} alt="" loading="lazy" /><em>{e.story ? 'Recap' : 'In person'}</em></span>
      <span className="drc-tx"><b>{e.city}</b><span>{e.date}</span>{e.title && <span className="drc-t">{e.title}</span>}</span>
    </a>
  );
}

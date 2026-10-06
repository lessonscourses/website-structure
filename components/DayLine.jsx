// Next online session: big date + a night-day-night line with each city's local time.
// Pins slide into place when the block is revealed (.rv -> .in, lib/site.js). Days left: data-days.
export const to24 = (t) => { const [hm, ap] = t.split(' '); let [h, m] = hm.split(':').map(Number); if (ap === 'PM' && h < 12) h += 12; if (ap === 'AM' && h === 12) h = 0; return [h, m]; };
const DOW = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' };
const pad = (n) => String(n).padStart(2, '0');

export default function DayLine({ s, className = '' }) {
  const days = Math.max(0, Math.ceil((new Date(s.startsAt) - Date.now()) / 864e5));
  const pins = s.times.map(([c, t]) => { const [h, m] = to24(t); return { c, h, m, x: ((h + m / 60) / 24) * 100 }; }).sort((a, b) => a.x - b.x);
  return (
    <div className={'dln rv ' + className}>
      <div className="dln-top">
        <span className="dln-num">{s.day}</span>
        <div className="dln-mo"><b>{s.month}, {DOW[s.dow] || s.dow}</b><span>Starts in <em><i data-days={s.startsAt}>{days}</i> days</em> · 60 min on Zoom</span></div>
      </div>
      <div className="dln-line">
        <div className="dln-bar" />
        {pins.map((p, i) => (
          <div key={p.c} className={'dln-pin' + (i % 2 ? ' lo' : '')} style={{ '--x': p.x + '%' }}>
            <b>{pad(p.h)}:{pad(p.m)}</b><span>{p.c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

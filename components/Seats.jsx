// Ten seats at one table: small silhouettes that take their places one by one
const Man = () => (
  <svg viewBox="0 0 24 36" aria-hidden="true"><circle cx="12" cy="7" r="5" /><path d="M2 36v-8.5C2 21 6.2 17.2 12 17.2S22 21 22 27.5V36z" /><path className="cut" d="M9.6 17.5 12 23.5l2.4-6z" /><path className="tie" d="M11.3 19.4h1.4l.5 5.6-1.2 1.4-1.2-1.4z" /></svg>
);
const Woman = () => (
  <svg viewBox="0 0 24 36" aria-hidden="true"><path d="M6.6 9.2C6.6 4.4 9 2 12 2s5.4 2.4 5.4 7.2v5.6c-1.6.8-3.4 1.1-5.4 1.1s-3.8-.3-5.4-1.1z" /><circle cx="12" cy="7.6" r="4.4" /><path d="M3.6 36v-7.8c0-6.3 3.6-10 8.4-10s8.4 3.7 8.4 10V36z" /><path className="cut" d="M10 18.4 12 23l2-4.6z" /></svg>
);
const ORDER = 'mmwmmwmmwm';

export default function Seats() {
  return (
    <span className="seats" aria-hidden="true">
      {ORDER.split('').map((k, i) => <i key={i} style={{ '--i': i }}>{k === 'w' ? <Woman /> : <Man />}</i>)}
    </span>
  );
}

// Quiet breadcrumbs with a small back button. items: [[label, href?], ...] - the last one is the current page.
export default function Crumbs({ items, dark = false }) {
  // back button only on inner pages (an item with a link exists above the current page)
  const back = [...items].reverse().find(([, h], i) => i > 0 && h);
  return (
    <nav className={'crumbs2 rv' + (dark ? ' dk' : '')} aria-label="Breadcrumb">
      {back && <a className="cb-back" href={back[1]} aria-label={`Back to ${back[0]}`}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M11 18l-6-6 6-6" /></svg></a>}
      <a href="/">Home</a>
      {items.map(([l, h], i) => <span key={l}><i>/</i>{h && i < items.length - 1 ? <a href={h}>{l}</a> : <b>{l}</b>}</span>)}
    </nav>
  );
}

import { ApplyButton } from './ApplyModal';

const Arr = () => <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const NAV = [['/events', 'Dinners'], ['/events/online', 'Online'], ['/blog', 'Blog']];

// dark: transparent over the home hero, turns light once you scroll past it.
export default function Header({ dark = false, cta = null }) {
  const Cta = ({ className }) => (cta ? <a className={className} href={cta.href}>{cta.label} <Arr /></a> : <ApplyButton className={className}>Apply to join <Arr /></ApplyButton>);
  return (
    <>
      <header className={'hdr' + (dark ? ' dark' : '')}><div className="hdr-in">
        <a className="brand" href="/"><img src="/brand/symbol.png" alt="" /><b>LEGENDS</b></a>
        <nav className="nav">{NAV.map(([h, t]) => <a key={h} href={h}>{t}</a>)}</nav>
        <div className="hdr-act">
          <ApplyButton mode="login" className="hdr-login">Member login</ApplyButton>
          <Cta className="btn gold hdr-cta" />
          <button type="button" className="burger" aria-label="Menu" aria-expanded="false"><i /><i /></button>
        </div>
      </div></header>
      <nav className="mnav">
        {NAV.map(([h, t]) => <a key={h} href={h}>{t}</a>)}
        <button type="button" className="mnav-login" data-open="login">Member login</button>
        <Cta className="btn gold" />
      </nav>
    </>
  );
}

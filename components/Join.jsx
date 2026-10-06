import { ApplyButton } from './ApplyModal';

const Arr = () => <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

export default function Join() {
  return (
    <section className="sec" style={{ paddingTop: 0 }}><div className="wrap">
      <div className="jn rv">
        <div className="jn-tx">
          <h2 className="h2">Membership by approval</h2>
          <p className="lead">Legends is for people who invest their own capital or manage it for a family office, fund or institution. Every application is reviewed personally.</p>
          <ApplyButton className="g-btn">Apply to join <Arr /></ApplyButton>
          <figure className="jn-q">
            <blockquote>“Every deal I regret started with the wrong introduction. Every one I’m proud of started with the right one.”</blockquote>
            <figcaption><b>Yanis Chkhatval</b>Private investor &amp; entrepreneur. Founder of Legends.</figcaption>
          </figure>
        </div>
        <div className="jn-ph" aria-hidden="true"><span className="jn-glow" /><img src="/brand/yanis.webp" alt="" /></div>
      </div>
    </div></section>
  );
}

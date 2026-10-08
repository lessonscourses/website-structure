import { ApplyButton } from './ApplyModal';

const Arr = () => <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

const STEPS = [['Apply', 'Application and private interview'], ['Verify', 'KYC and payment'], ['Onboarding', 'Welcome among legends']];

export default function Join() {
  return (
    <section className="sec" style={{ paddingTop: 0 }}><div className="wrap">
      <div className="jn rv">
        <div className="jn-tx">
          <h2 className="h2">Join Legends</h2>
          <ol className="jn-steps">
            {STEPS.map(([h, p], i) => <li key={h}><span>0{i + 1}</span><b>{h}</b><em>{p}</em></li>)}
          </ol>
          <ApplyButton className="g-btn">Apply to join <Arr /></ApplyButton>
          <p className="jn-ct">We contact applicants in order. WhatsApp <a href="https://wa.me/35797916299" target="_blank" rel="noopener">+357 97 916299</a>, <a href="mailto:concierge@legends.app">concierge@legends.app</a></p>
          <figure className="jn-q">
            <blockquote>“Every deal I regret started with the wrong introduction. Every deal I’m proud of started with the right one.”</blockquote>
            <figcaption><b>Yanis Chkhatval</b>Private investor and entrepreneur, founder of Legends</figcaption>
          </figure>
        </div>
        <div className="jn-ph" aria-hidden="true"><span className="jn-glow" /><img src="/brand/yanis.webp" alt="" /></div>
      </div>
    </div></section>
  );
}

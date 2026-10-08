import Crumbs from '@/components/Crumbs';
import Scene from './Scene';

// Light page header: title and text on the left, a line-drawn scene on the right.
// The cream wash fades into the page background, so there is no hard edge.
export default function PageHero({ title, lead, children, scene, aside, word, crumbs }) {
  return (
    <section className={'phero' + (scene || aside ? ' has-scene' : '') + (aside ? ' has-media' : '')}>
      <div className="ph-bg" aria-hidden="true"><i className="ph-glow" /><i className="ph-grid" />{word && <span className="ph-word" data-speed=".3" data-axis="x">{word}</span>}</div>
      {crumbs && <div className="wrap cb-wrap"><Crumbs items={crumbs} /></div>}
      <div className="wrap phero-in">
        <div className="ph-main">
          <h1 className="h1 rv">{title}</h1>
          {lead && <p className="lead rv d1">{lead}</p>}
          {children}
        </div>
        {aside || (scene && <Scene kind={scene} />)}
      </div>
    </section>
  );
}

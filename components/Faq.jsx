// FAQ for a dinner page (city and date filled in).
export default function Faq({ e }) {
  const QA = [
    ['Who pays for dinner?', 'Each guest pays for their own order.'],
    ['Who else will be there?', '10 active investors: family offices, allocators, GPs, LPs and private investors. Every guest is reviewed.'],
    ['Where is the venue?', `A private venue in ${e.city}. Shared after your seat is confirmed.`],
    ['What happens after I apply?', 'Personal review, a short call if needed, then seat confirmation and venue details.'],
    ['Is this part of the summit?', 'No. Legends is independent.'],
    [`Can't make ${e.day} ${e.month}?`, `Apply anyway. We may add a second ${e.city} date.`],
  ];
  return (
    <section className="sec" id="faq" style={{ paddingTop: 0 }}><div className="wrap fq">
      <div className="fq-l rv">
        <h2 className="h2">FAQ</h2>
        <a className="fq-mail" href="mailto:concierge@legends.app">concierge@legends.app</a>
        <button type="button" className="fq-copy" data-copy="concierge@legends.app">Copy email</button>
      </div>
      <div className="fq-list rv d1">
        {QA.map(([q, a], i) => <details key={q} open={i === 0}><summary>{q}<i /></summary><p>{a}</p></details>)}
      </div>
    </div></section>
  );
}

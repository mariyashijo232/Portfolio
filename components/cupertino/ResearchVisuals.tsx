import type { CaseResearch, MatrixCell, MatrixState } from '@/lib/data';

const LABEL: Record<MatrixState, string> = { y: 'Yes', p: 'Partial', n: 'No', o: 'Open' };
const CLS: Record<MatrixState, string> = { y: 'yes', p: 'part', n: 'no', o: 'open' };

function Mark({ s }: { s: MatrixCell }) {
  const [k, label] = Array.isArray(s) ? s : [s, LABEL[s]];
  return <span className={'rs-m ' + CLS[k]}>{label}</span>;
}

// Charts and tables for a case study's research section.
export default function ResearchVisuals({ r }: { r: CaseResearch }) {
  const lastCol = r.matrix.cols.length - 1;
  return (
    <div className="rs">
      <div data-reveal>
        <h3 className="rs-h">Where everyone sits</h3>
        <p className="rs-sub">{r.map.sub}</p>
        <div className="rs-panel">
          <svg className="rs-map" viewBox="0 0 760 510" role="img" aria-label={r.map.alt}>
            <rect className="plot" x="70" y="30" width="660" height="430" rx="10" />
            <line className="grid" x1="400" y1="30" x2="400" y2="460" />
            <line className="grid" x1="70" y1="245" x2="730" y2="245" />
            <text className="axis" x="70" y="488">Fixed structure</text>
            <text className="axis" x="730" y="488" textAnchor="end">Fully customizable</text>
            <text className="axis" transform="translate(40 460) rotate(-90)">Work and tasks</text>
            <text className="axis" transform="translate(40 30) rotate(-90)" textAnchor="end">Whole life</text>
            {r.map.points.map((p) => (
              <g key={p.n}>
                <circle cx={p.x} cy={p.y} r="10" fill={'var(--rs-' + p.c + ')'} />
                <text className="name" x={p.end ? p.x - 16 : p.x + 16} y={p.y + 5} textAnchor={p.end ? 'end' : 'start'}>{p.n}</text>
              </g>
            ))}
            <rect x="572" y="69" width="28" height="28" rx="6" fill="var(--rs-violet)" />
            <text className="me" x="610" y="89">Blocked</text>
          </svg>
          <div className="rs-legend">
            {r.map.legend.map(([c, label, square]) => (
              <span key={label}>
                <i className={'rs-sw' + (square ? '' : ' round')} style={{ background: 'var(--rs-' + c + ')' }}></i>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div data-reveal>
        <h3 className="rs-h">What a paid plan costs</h3>
        <p className="rs-sub">{r.prices.sub}</p>
        <div className="rs-panel">
          <div className="rs-bars">
            {r.prices.rows.map((x) => (
              <div className="rs-bar" key={x.n}>
                <div className="rs-bn">{x.n}</div>
                <div className="rs-bt"><div className={'rs-bf ' + (x.free ? 'free' : 'paid')} style={{ width: x.w + '%' }}></div></div>
                <div className="rs-bnote"><b>{x.p}</b> {x.note}</div>
              </div>
            ))}
          </div>
          <div className="rs-legend">
            <span><i className="rs-sw" style={{ background: 'var(--rs-blue)' }}></i>Has a free tier</span>
            <span><i className="rs-sw" style={{ background: 'var(--rs-coral)' }}></i>No free tier, trial only</span>
          </div>
        </div>
      </div>

      <div data-reveal>
        <h3 className="rs-h">Side by side</h3>
        <p className="rs-sub">{r.overview.sub}</p>
        <div className="rs-scroll">
          <table className="rs-tbl">
            <thead>
              <tr>{r.overview.cols.map((c) => <th scope="col" key={c}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {r.overview.rows.map((row) => (
                <tr key={row[0]}>
                  <th scope="row">{row[0]}</th>
                  {row.slice(1).map((cell, i) => <td key={i}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div data-reveal>
        <h3 className="rs-h">Feature coverage</h3>
        <p className="rs-sub">{r.matrix.sub}</p>
        <div className="rs-scroll">
          <table className="rs-tbl rs-mx">
            <thead>
              <tr>
                <th scope="col">Feature</th>
                {r.matrix.cols.map((c, i) => <th scope="col" key={c} className={i === lastCol ? 'blk' : undefined}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {r.matrix.rows.map(([label, ...cells]) => (
                <tr key={label}>
                  <td>{label}</td>
                  {cells.map((cell, i) => (
                    <td key={i} className={i === lastCol ? 'blk' : undefined}><Mark s={cell} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rs-legend">
          {r.matrix.legend.map(([k, label]) => <span key={k}><Mark s={[k, label]} /></span>)}
        </div>
      </div>

      <div data-reveal>
        <h3 className="rs-h">Sources and limits</h3>
        <p className="rs-sub">{r.limits}</p>
        <ul className="rs-src">
          {r.sources.map(([t, u]) => (
            <li key={u}><a href={u} target="_blank" rel="noopener noreferrer">{t}</a></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

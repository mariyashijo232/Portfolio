// Mono Plum — Project detail page.
// Card-style layout matching the user's reference: context pill, meta badges,
// big title, About + Key Features columns, Stack chips, screenshots gallery,
// footer with meta tags + CTAs. Themed by mode (dark / light).

const DirectionKineticDetail = ({ project, mode, accent, fp, onBack }) => {
  const [zoom, setZoom] = React.useState(null);
  React.useEffect(() => {
    if (!zoom) return;
    const onKey = (e) => { if (e.key === 'Escape') setZoom(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom]);
  const themes = {
    dark:  { bg: '#1f1419', fg: '#f8ecec', fgSoft: '#f8ecec cc', fgMute: '#f8ecec99', fgDim: '#f8ecec70', border: '#f8ecec20', borderSoft: '#f8ecec15', surface: '#f8ecec06', card: '#f8ecec08', pill: '#f8ecec0d' },
    light: { bg: '#f7eee8', fg: '#1f1419', fgSoft: '#1f1419cc', fgMute: '#1f141999', fgDim: '#1f141970', border: '#1f141920', borderSoft: '#1f141915', surface: '#1f141906', card: '#ffffff80', pill: '#1f14190a' },
  };
  const t = themes[mode];
  const p = project;

  const css = `
    .pd-root { background: ${t.bg}; color: ${t.fg}; font-family: ${fp.body}; min-height: 100%; padding: 36px 60px 80px; transition: background .4s ease, color .4s ease; }

    /* Back link */
    .pd-back { display:inline-flex; align-items:center; gap: 10px; font-family: ${fp.mono}; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; color: ${t.fgMute}; background: transparent; border: none; cursor: pointer; padding: 0 0 32px; transition: color .2s; }
    .pd-back:hover { color: ${accent}; }
    .pd-back svg { transition: transform .2s; }
    .pd-back:hover svg { transform: translateX(-4px); }

    /* Main detail card */
    .pd-card { background: ${t.card}; border: 1px solid ${t.borderSoft}; border-radius: 24px; overflow: hidden; }

    /* Header section: pills + title + subtitle */
    .pd-head { padding: 44px 48px; border-bottom: 1px solid ${t.borderSoft}; }
    .pd-pills { display:flex; flex-wrap: wrap; gap: 10px; margin-bottom: 28px; }
    .pd-pill { display:inline-flex; align-items:center; padding: 7px 16px; border: 1px solid ${t.border}; border-radius: 999px; font-family: ${fp.mono}; font-size: 12px; letter-spacing: .04em; color: ${t.fgSoft}; }
    .pd-pill.pd-pill-primary { background: ${accent}; color: #1f1419; border-color: ${accent}; }
    .pd-title { font-family: ${fp.display}; font-weight: ${fp.displayWeight}; font-size: 76px; line-height: .95; letter-spacing: -0.03em; margin: 0; color: ${t.fg}; }
    .pd-sub { font-size: 22px; line-height: 1.4; color: ${t.fgMute}; margin: 18px 0 0; max-width: 720px; }

    /* About + Features */
    .pd-body { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; padding: 48px; border-bottom: 1px solid ${t.borderSoft}; }
    .pd-section-label { font-family: ${fp.mono}; font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: ${t.fgMute}; margin: 0 0 22px; }
    .pd-about p { font-size: 17px; line-height: 1.65; color: ${t.fgSoft}; margin: 0; max-width: 540px; }
    .pd-features { display:flex; flex-direction: column; gap: 14px; }
    .pd-feature { display:flex; gap: 16px; align-items: flex-start; font-size: 16px; line-height: 1.5; color: ${t.fg}; }
    .pd-feature-check { flex: 0 0 18px; height: 18px; border: 1.5px solid ${accent}; border-radius: 3px; margin-top: 3px; display:flex; align-items: center; justify-content: center; color: ${accent}; }

    /* Stack */
    .pd-stack { padding: 40px 48px; border-bottom: 1px solid ${t.borderSoft}; }
    .pd-stack-chips { display:flex; flex-wrap: wrap; gap: 10px; }
    .pd-chip { display:inline-flex; align-items:center; padding: 8px 16px; border: 1px solid ${t.border}; border-radius: 999px; font-family: ${fp.mono}; font-size: 13px; color: ${t.fg}; background: ${t.pill}; }

    /* Footer */
    .pd-foot { padding: 32px 48px; display:flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap; }
    .pd-foot-meta { display:flex; flex-wrap: wrap; gap: 8px; font-family: ${fp.mono}; font-size: 12px; color: ${t.fgMute}; align-items: center; }
    .pd-foot-meta .pd-tick { display:inline-flex; align-items:center; gap: 8px; padding: 6px 4px; }
    .pd-foot-meta .pd-tick svg { color: ${t.fgDim}; }
    .pd-foot-ctas { display:flex; gap: 12px; }
    .pd-cta { display:inline-flex; align-items:center; gap: 10px; padding: 11px 20px; border: 1px solid ${t.border}; border-radius: 12px; font-family: ${fp.mono}; font-size: 13px; color: ${t.fg}; text-decoration: none; background: transparent; transition: background .2s, color .2s, border-color .2s; }
    .pd-cta:hover { background: ${t.fg}; color: ${t.bg}; border-color: ${t.fg}; }
    .pd-cta.pd-cta-primary { background: ${accent}; color: #1f1419; border-color: ${accent}; }
    .pd-cta.pd-cta-primary:hover { opacity: .85; background: ${accent}; color: #1f1419; }

    /* Screenshots */
    .pd-shots { margin-top: 36px; }
    .pd-shots-head { display:flex; justify-content: space-between; align-items: baseline; margin-bottom: 20px; }
    .pd-shots-head h3 { font-family: ${fp.display}; font-weight: ${fp.displayWeight}; font-size: 32px; letter-spacing: -.02em; margin: 0; }
    .pd-shots-head .pd-shots-count { font-family: ${fp.mono}; font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: ${t.fgMute}; }
    .pd-shots-grid { display:grid; grid-template-columns: 1fr; gap: 20px; }
    .pd-shot { background: ${t.card}; border: 1px solid ${t.borderSoft}; border-radius: 20px; overflow: hidden; padding: 16px; }
    .pd-shot img { display:block; width: 100%; height: auto; border-radius: 8px; border: 1px solid ${t.borderSoft}; cursor: zoom-in; transition: transform .25s ease; }
    .pd-shot img:hover { transform: scale(1.01); }
    .pd-shot-empty { aspect-ratio: 16/9; display:flex; align-items: center; justify-content: center; background: ${t.surface}; border: 1px dashed ${t.border}; border-radius: 12px; color: ${t.fgDim}; font-family: ${fp.mono}; font-size: 12px; letter-spacing: .14em; text-transform: uppercase; }

    /* Lightbox */
    .pd-lightbox { position: fixed; inset: 0; background: #00000099; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); display:flex; align-items:center; justify-content:center; padding: 40px; z-index: 100; cursor: zoom-out; animation: pd-fade .18s ease both; }
    .pd-lightbox img { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 6px; box-shadow: 0 30px 90px #00000080; }
    .pd-lightbox-close { position: absolute; top: 24px; right: 24px; width: 40px; height: 40px; border-radius: 50%; border: 1px solid #ffffff40; background: transparent; color: #fff; cursor: pointer; display:flex; align-items:center; justify-content:center; }
    .pd-lightbox-close:hover { background: #ffffff20; }
    @keyframes pd-fade { from { opacity: 0; } to { opacity: 1; } }
  `;

  const Check = () => (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 5.5L4.5 8L9 2.5" /></svg>
  );
  const Square = () => (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="1.5" y="1.5" width="8" height="8" rx="1" /></svg>
  );

  return (
    <div className="pd-root" data-screen-label={`02 Mono Plum · Project · ${mode}`}>
      <style>{css}</style>

      <button className="pd-back" onClick={onBack}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2L4 7l5 5"/></svg>
        Back to work
      </button>

      <div className="pd-card">
        <div className="pd-head">
          <div className="pd-pills">
            {p.context && <span className="pd-pill pd-pill-primary">{p.context}</span>}
            {(p.badges || []).map((b) => <span key={b} className="pd-pill">{b}</span>)}
          </div>
          <h1 className="pd-title">{p.title}</h1>
          <p className="pd-sub">{p.subtitle}</p>
        </div>

        <div className="pd-body">
          <div className="pd-about">
            <p className="pd-section-label">About</p>
            <p>{p.about || p.blurb}</p>
          </div>
          {p.features && p.features.length > 0 && (
            <div>
              <p className="pd-section-label">Key features</p>
              <div className="pd-features">
                {p.features.map((f) => (
                  <div key={f} className="pd-feature">
                    <span className="pd-feature-check"><Square /></span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {p.stack && p.stack.length > 0 && (
          <div className="pd-stack">
            <p className="pd-section-label">Stack</p>
            <div className="pd-stack-chips">
              {p.stack.map((s) => <span key={s} className="pd-chip">{s}</span>)}
            </div>
          </div>
        )}

        <div className="pd-foot">
          <div className="pd-foot-meta">
            {(p.meta || []).map((m, i) => (
              <span key={i} className="pd-tick">
                <Square /> {m.label}
              </span>
            ))}
          </div>
          <div className="pd-foot-ctas">
            {(p.links || []).map((l, i) => (
              <a key={l.label} className={`pd-cta ${i === 0 ? 'pd-cta-primary' : ''}`} href={l.href}>
                <Square /> {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {p.screenshots && p.screenshots.length > 0 && (
        <div className="pd-shots">
          <div className="pd-shots-head">
            <h3>Screenshots</h3>
            <div className="pd-shots-count">{p.screenshots.length} · click to enlarge</div>
          </div>
          <div className="pd-shots-grid">
            {p.screenshots.map((src) => (
              <div key={src} className="pd-shot">
                <img src={src} alt={p.title + ' screenshot'} onClick={() => setZoom(src)} />
              </div>
            ))}
          </div>
        </div>
      )}

      {zoom && (
        <div className="pd-lightbox" onClick={() => setZoom(null)} role="dialog" aria-label="Enlarged screenshot">
          <img src={zoom} alt="Enlarged screenshot" onClick={(e) => e.stopPropagation()} />
          <button className="pd-lightbox-close" onClick={() => setZoom(null)} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 3l8 8M11 3l-8 8"/></svg>
          </button>
        </div>
      )}

      {(!p.screenshots || p.screenshots.length === 0) && (
        <div className="pd-shots">
          <div className="pd-shots-head">
            <h3>Screenshots</h3>
            <div className="pd-shots-count">drop images soon</div>
          </div>
          <div className="pd-shots-grid">
            <div className="pd-shot">
              <div className="pd-shot-empty">[ project visuals · placeholder ]</div>
            </div>
            <div className="pd-shot">
              <div className="pd-shot-empty">[ project visuals · placeholder ]</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

window.DirectionKineticDetail = DirectionKineticDetail;

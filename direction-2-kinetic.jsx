// Direction 2 — "Mono Plum"
// Minimalist warm-plum design with light/dark toggle. Same composition in
// both modes — only the surface colors flip. Toggle lives in the nav.

const DirectionKinetic = ({ tweaks, initialPage = null, layout = 'desktop', onNavigate = null }) => {
  const fp = window.FONT_PAIRS[tweaks.fontPair];
  const accent = tweaks.accent;
  // Unique id so each instance's <style> only targets its own subtree —
  // otherwise dark + light artboards on the same page fight over .kn-root rules.
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const scope = `kn-i-${uid}`;
  const [open, setOpen] = React.useState(null);
  const toggle = (n) => setOpen((c) => c === n ? null : n);
  const [mode, setMode] = React.useState('dark'); // 'dark' | 'light'
  const [page, setPageState] = React.useState(initialPage);  // null = landing, else project slug
  const setPage = React.useCallback((next) => {
    setPageState(next);
    if (onNavigate) onNavigate(next);
  }, [onNavigate]);

  // Theme palette — same structure for both modes.
  const themes = {
    dark:  { bg: '#1f1419', fg: '#f8ecec', fgSoft: '#f8ececcc', fgMute: '#f8ecec80', fgDim: '#f8ecec70', border: '#f8ecec20', borderSoft: '#f8ecec18', surface: '#f8ecec08' },
    light: { bg: '#f7eee8', fg: '#1f1419', fgSoft: '#1f1419cc', fgMute: '#1f141988', fgDim: '#1f141970', border: '#1f141920', borderSoft: '#1f141918', surface: '#1f141908' },
  };
  const t = themes[mode];

  // Pixel + word colors. Same accents in both modes — pink pixels, pink word
  // base, reveals black on hover — only the page bg flips.
  const pixelColor  = '#ff4d8d';
  const wordBase    = accent;
  const wordReveal  = '#000';

  const css = `
    .kn-root { background: ${t.bg}; color: ${t.fg}; font-family: ${fp.body}; min-height: 100%; position: relative; transition: background .4s ease, color .4s ease; }
    /* Persistent pink-pixel disintegration canvas — backdrop for the hero. */
    .kn-hero { position: relative; }
    .kn-pixel-canvas { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; }
    .kn-hero > *:not(canvas) { position: relative; z-index: 1; }
    /* Soft pink → bg fade at the bottom of the hero so the hard pixel
       edges blur into the Selected Work section. */
    .kn-hero::after {
      content: '';
      position: absolute;
      left: 0; right: 0; bottom: -1px;
      height: 260px;
      pointer-events: none;
      z-index: 0;
      background: linear-gradient(to bottom, ${t.bg}00 0%, ${t.bg} 78%, ${t.bg} 100%);
    }
    /* Drop the work section's top border so it doesn't show through the fade. */
    .kn-work { border-top: none; }

    /* Nav */
    .kn-nav { display:flex; justify-content:space-between; align-items:center; padding: 36px 60px; gap: 36px; }
    .kn-logo { font-family: ${fp.display}; font-weight: ${fp.displayWeight}; font-size: 22px; letter-spacing: -0.02em; }
    .kn-nav-links { display: flex; gap: 36px; font-family: ${fp.mono}; font-size: 12px; letter-spacing:.08em; text-transform: uppercase; flex: 1; }
    .kn-nav-links a { color: ${t.fg}; text-decoration: none; opacity: .7; transition: opacity .2s, color .2s; }
    .kn-nav-links a:hover { opacity: 1; color: ${accent}; }
    .kn-mode { display:inline-flex; align-items:center; gap: 4px; padding: 4px; border: 1px solid ${t.border}; border-radius: 999px; }
    .kn-mode-btn { width: 30px; height: 30px; border-radius: 50%; border: none; background: transparent; color: ${t.fgMute}; cursor: pointer; display:flex; align-items:center; justify-content:center; transition: background .2s, color .2s; padding: 0; }
    .kn-mode-btn.active { background: ${t.fg}; color: ${t.bg}; }

    /* Hero */
    .kn-hero { padding: 100px 60px 120px; }
    .kn-hero-tag { display:inline-flex; align-items:center; gap: 10px; font-family: ${fp.mono}; font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: ${t.fgMute}; margin-bottom: 48px; }
    .kn-hero-tag::before { content:''; width: 8px; height: 8px; background: ${accent}; border-radius: 50%; }
    .kn-headline { font-family: ${fp.display}; font-weight: ${fp.displayWeight}; font-size: 140px; line-height: .95; letter-spacing: -0.04em; margin: 0; max-width: 1080px; }
    .kn-headline em { font-style: italic; color: ${wordBase}; font-weight: ${fp.displayWeight}; }
    /* Cursor paint reveal on "thoughtful": base + reveal-color overlay whose
       mask is built up from where the cursor has touched. Reveal stays once
       painted. */
    .kn-word-paint { position: relative; display: inline-block; }
    .kn-word-paint .kn-word-top {
      position: absolute; inset: 0;
      color: ${wordReveal};
      pointer-events: none;
      -webkit-mask-image: var(--paint-mask, none);
              mask-image: var(--paint-mask, none);
      -webkit-mask-size: 100% 100%;
              mask-size: 100% 100%;
      -webkit-mask-repeat: no-repeat;
              mask-repeat: no-repeat;
    }
    .kn-sub { display:grid; grid-template-columns: 1fr 1fr; gap: 80px; margin-top: 64px; align-items: end; }
    .kn-sub p { max-width: 480px; font-size: 17px; line-height: 1.55; color: ${t.fgSoft}; margin: 0; }
    .kn-sub-meta { font-family: ${fp.mono}; font-size: 11px; letter-spacing:.1em; text-transform: uppercase; color: ${t.fgMute}; line-height: 2; }
    .kn-sub-meta b { color: ${t.fg}; font-weight: 500; }

    /* Work */
    .kn-work { padding: 80px 60px; border-top: 1px solid ${t.borderSoft}; }
    .kn-work-head { display:flex; justify-content:space-between; align-items: baseline; margin-bottom: 56px; }
    .kn-work-head h2 { font-family: ${fp.display}; font-weight: ${fp.displayWeight}; font-size: 48px; letter-spacing: -0.03em; margin: 0; }
    .kn-work-head .kn-tag { font-family: ${fp.mono}; font-size: 12px; letter-spacing:.12em; text-transform: uppercase; color: ${t.fgMute}; }

    /* Collapsible work cards */
    .kn-acc { display:flex; flex-direction:column; }
    .kn-acc-item { border-top: 1px solid ${t.border}; }
    .kn-acc-item:last-child { border-bottom: 1px solid ${t.border}; }
    .kn-acc-head { display:grid; grid-template-columns: 60px 1fr 180px 40px; gap: 32px; align-items: center; padding: 28px 0; cursor:pointer; background: transparent; border: none; width: 100%; text-align: left; font-family: inherit; color: inherit; transition: padding .25s; }
    .kn-acc-head:hover { padding-left: 20px; }
    .kn-acc-head:hover .kn-acc-plus { color: ${accent}; border-color: ${accent}; }
    .kn-acc-n { font-family: ${fp.mono}; font-size: 13px; color: ${t.fgDim}; }
    .kn-acc-titles { display:flex; flex-direction:column; gap: 6px; }
    .kn-acc-title { font-family: ${fp.display}; font-weight: ${fp.displayWeight}; font-size: 32px; line-height: 1.05; letter-spacing: -.02em; color: ${t.fg}; }
    .kn-acc-sub { font-size: 15px; color: ${t.fgMute}; line-height: 1.4; }
    .kn-acc-tag { font-family: ${fp.mono}; font-size: 11px; letter-spacing:.12em; text-transform:uppercase; color: ${t.fgMute}; }
    .kn-acc-plus { width: 28px; height: 28px; border: 1px solid ${t.border}; border-radius: 50%; display:flex; align-items:center; justify-content:center; transition: transform .3s, color .2s, border-color .2s; color: ${t.fg}; justify-self: end; }
    .kn-acc-item.open .kn-acc-plus { transform: rotate(45deg); border-color: ${accent}; color: ${accent}; }
    .kn-acc-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .35s cubic-bezier(.2,.7,.3,1); }
    .kn-acc-item.open .kn-acc-body { grid-template-rows: 1fr; }
    .kn-acc-body-inner { overflow: hidden; }
    .kn-acc-body-grid { display:grid; grid-template-columns: 60px 1fr 220px; gap: 32px; padding: 0 0 36px; }
    .kn-acc-body p { font-size: 17px; line-height: 1.6; color: ${t.fgSoft}; margin: 0; max-width: 580px; }
    .kn-acc-tags { display:flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
    .kn-acc-tags span { font-family: ${fp.mono}; font-size: 11px; letter-spacing: .08em; padding: 4px 10px; border: 1px solid ${t.border}; border-radius: 999px; color: ${t.fgSoft}; }
    .kn-acc-cta { display:inline-flex; align-items:center; gap: 8px; font-family: ${fp.mono}; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; color: ${accent}; text-decoration: none; padding-bottom: 4px; border-bottom: 1px solid ${accent}; align-self: start; }
    .kn-acc-cta.kn-acc-cta-muted { color: ${t.fgMute}; border-color: ${t.border}; pointer-events: none; }
    .kn-acc-cta-stack { display:flex; flex-direction: column; gap: 12px; align-self: start; }
    .kn-acc-cta-stack .kn-acc-cta { align-self: start; }

    /* About */
    .kn-about { padding: 80px 60px; border-top: 1px solid ${t.borderSoft}; display:grid; grid-template-columns: 1fr 1fr; gap: 80px; }
    .kn-about h2 { font-family: ${fp.display}; font-weight: ${fp.displayWeight}; font-size: 48px; letter-spacing: -0.03em; margin: 0; }
    .kn-about p { font-size: 17px; line-height: 1.6; color: ${t.fgSoft}; margin: 0 0 18px; }

    /* Experience — timeline list. Same column rhythm as the work accordion. */
    .kn-exp { padding: 80px 60px; border-top: 1px solid ${t.borderSoft}; }
    .kn-exp-head { display:flex; justify-content:space-between; align-items: baseline; margin-bottom: 48px; }
    .kn-exp-head h2 { font-family: ${fp.display}; font-weight: ${fp.displayWeight}; font-size: 48px; letter-spacing: -0.03em; margin: 0; }
    .kn-exp-head .kn-tag { font-family: ${fp.mono}; font-size: 12px; letter-spacing:.12em; text-transform: uppercase; color: ${t.fgMute}; }
    .kn-exp-list { display:flex; flex-direction:column; }
    .kn-exp-item { display:grid; grid-template-columns: 200px 1fr 180px; gap: 32px; align-items: baseline; padding: 28px 0; border-top: 1px solid ${t.border}; }
    .kn-exp-item:last-child { border-bottom: 1px solid ${t.border}; }
    .kn-exp-period { font-family: ${fp.mono}; font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: ${t.fgDim}; }
    .kn-exp-body .kn-exp-role { font-family: ${fp.display}; font-weight: ${fp.displayWeight}; font-size: 24px; letter-spacing: -.01em; color: ${t.fg}; margin: 0 0 4px; }
    .kn-exp-body .kn-exp-company { font-size: 15px; color: ${accent}; margin: 0 0 10px; }
    .kn-exp-body .kn-exp-summary { font-size: 15px; line-height: 1.55; color: ${t.fgSoft}; margin: 0; max-width: 560px; }
    .kn-exp-location { font-family: ${fp.mono}; font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: ${t.fgMute}; justify-self: end; }

    /* Footer */
    .kn-foot { padding: 80px 60px; border-top: 1px solid ${t.borderSoft}; display:grid; grid-template-columns: 2fr 1fr 1fr; gap: 60px; align-items: end; }
    .kn-foot h2 { font-family: ${fp.display}; font-weight: ${fp.displayWeight}; font-size: 88px; line-height: .95; letter-spacing: -0.04em; margin: 0; }
    .kn-foot h2 a { color: ${accent}; text-decoration: none; }
    .kn-foot h2 a:hover { opacity: .8; }
    .kn-foot-col { font-family: ${fp.mono}; font-size: 12px; letter-spacing: .04em; line-height: 2; }
    .kn-foot-col b { display:block; color: ${t.fgMute}; font-weight: 500; text-transform: uppercase; letter-spacing: .12em; margin-bottom: 8px; font-size: 11px; }
    .kn-foot-col a { color: ${t.fg}; text-decoration: none; display: block; }
    .kn-foot-col a:hover { color: ${accent}; }

    /* ---------- Mobile ---------- */
    .kn-mobile .kn-nav { padding: 20px 20px; gap: 12px; }
    .kn-mobile .kn-logo { font-size: 18px; }
    .kn-mobile .kn-nav-links { display: none; }
    .kn-mobile .kn-mode-btn { width: 28px; height: 28px; }

    .kn-mobile .kn-hero { padding: 40px 20px 80px; }
    .kn-mobile .kn-hero-tag { margin-bottom: 28px; font-size: 11px; }
    .kn-mobile .kn-headline { font-size: 52px; letter-spacing: -0.03em; line-height: 1.0; }
    .kn-mobile .kn-sub { grid-template-columns: 1fr; gap: 32px; margin-top: 40px; }
    .kn-mobile .kn-sub p { font-size: 15px; }
    .kn-mobile .kn-hero::after { height: 160px; }

    .kn-mobile .kn-work { padding: 56px 20px; }
    .kn-mobile .kn-work-head { flex-direction: column; align-items: flex-start; gap: 8px; margin-bottom: 32px; }
    .kn-mobile .kn-work-head h2 { font-size: 36px; }
    .kn-mobile .kn-acc-head { grid-template-columns: 36px 1fr 28px; gap: 16px; padding: 22px 0; }
    .kn-mobile .kn-acc-head:hover { padding-left: 0; }
    .kn-mobile .kn-acc-tag { display: none; }
    .kn-mobile .kn-acc-title { font-size: 22px; }
    .kn-mobile .kn-acc-sub { font-size: 13px; }
    .kn-mobile .kn-acc-body-grid { grid-template-columns: 36px 1fr; gap: 16px; padding: 0 0 28px; }
    .kn-mobile .kn-acc-body p { font-size: 15px; }
    .kn-mobile .kn-acc-cta { grid-column: 2; margin-top: 18px; }

    .kn-mobile .kn-about { grid-template-columns: 1fr; gap: 28px; padding: 56px 20px; }
    .kn-mobile .kn-about h2 { font-size: 36px; }
    .kn-mobile .kn-about p { font-size: 15px; }

    .kn-mobile .kn-foot { grid-template-columns: 1fr; gap: 36px; padding: 56px 20px; }
    .kn-mobile .kn-foot h2 { font-size: 52px; }

    .kn-mobile .kn-exp { padding: 56px 20px; }
    .kn-mobile .kn-exp-head { flex-direction: column; align-items: flex-start; gap: 8px; margin-bottom: 32px; }
    .kn-mobile .kn-exp-head h2 { font-size: 36px; }
    .kn-mobile .kn-exp-item { grid-template-columns: 1fr; gap: 8px; padding: 22px 0; }
    .kn-mobile .kn-exp-location { justify-self: start; }
    .kn-mobile .kn-exp-body .kn-exp-role { font-size: 20px; }

    /* Detail page mobile overrides (the detail component lives inside .kn-root) */
    .kn-mobile .pd-root { padding: 16px 16px 56px; }
    .kn-mobile .pd-head { padding: 28px 20px; }
    .kn-mobile .pd-title { font-size: 36px; }
    .kn-mobile .pd-sub { font-size: 16px; }
    .kn-mobile .pd-body { grid-template-columns: 1fr; gap: 36px; padding: 32px 20px; }
    .kn-mobile .pd-about p { font-size: 15px; }
    .kn-mobile .pd-feature { font-size: 14px; }
    .kn-mobile .pd-stack { padding: 28px 20px; }
    .kn-mobile .pd-foot { padding: 24px 20px; flex-direction: column; align-items: flex-start; }
    .kn-mobile .pd-foot-ctas { width: 100%; flex-wrap: wrap; }
    .kn-mobile .pd-shots { margin-top: 24px; }
    .kn-mobile .pd-shots-head h3 { font-size: 22px; }

    /* Live-demo section mobile overrides */
    .kn-mobile .pd-demo { padding: 26px 16px 30px; border-radius: 20px; margin-top: 24px; }
    .kn-mobile .pd-demo-head { flex-direction: column; align-items: flex-start; gap: 8px; margin-bottom: 6px; }
    .kn-mobile .pd-demo-head h3 { font-size: 24px; white-space: nowrap; }
    .kn-mobile .pd-demo-tag { font-size: 10px; letter-spacing: .1em; }
    .kn-mobile .pd-demo-sub { font-size: 14px; margin-bottom: 22px; }
    .kn-mobile .pd-demo-phone { width: 100%; max-width: 340px; padding: 8px; border-radius: 32px; }
    .kn-mobile .pd-demo-phone iframe { height: 78vh; max-height: 680px; min-height: 560px; border-radius: 26px; }
    .kn-mobile .pd-demo-open { width: 100%; justify-content: center; }
  `;

  // Scope every selector in the CSS to this instance so dark/light artboards
  // on the same page don't fight over .kn-root rules. Selectors that lead
  // with a class that's actually applied to the root element get compound-
  // scoped (no space); everything else gets a descendant scope.
  const ROOT_CLASSES = /^\.(kn-root|kn-mobile|kn-landing|kn-light|kn-dark)/;
  const scopedCss = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|\})\s*([^{}@]+)\{/g, (m, prev, sel) => {
    const parts = sel.split(',').map((raw) => {
      const s = raw.trim();
      if (!s) return s;
      if (ROOT_CLASSES.test(s)) return `.${scope}${s}`;
      return `.${scope} ${s}`;
    });
    return `${prev}${parts.join(', ')}{`;
  });

  // Sun + moon glyphs for the toggle
  const Sun = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="7" cy="7" r="2.5" />
      <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.5 2.5l1 1M10.5 10.5l1 1M2.5 11.5l1-1M10.5 3.5l1-1" />
    </svg>
  );
  const Moon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8.5A5 5 0 016.5 2a5 5 0 105.5 6.5z" />
    </svg>
  );

  // Wrapper renders the same nav + footer with a scrollable middle that swaps
  // between the landing sections and a project-detail card based on `page`.
  const activeProject = page ? window.PROJECTS.find((p) => p.slug === page) : null;

  // Persistent pink-pixel paint trail on the landing page. Pixels are drawn
  // to a fixed-position canvas locked to the cursor; canvas is never cleared
  // so the trail builds up as you move.
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const c = canvasRef.current;
    if (!c || activeProject) return;
    const ctx = c.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const parent = c.parentElement;
    const sizeOf = () => ({
      w: Math.max(1, parent.offsetWidth),
      h: Math.max(1, parent.offsetHeight),
    });
    let dims = sizeOf();
    const sizeCanvas = () => {
      dims = sizeOf();
      c.width = Math.floor(dims.w * dpr);
      c.height = Math.floor(dims.h * dpr);
      c.style.width = dims.w + 'px';
      c.style.height = dims.h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
    };
    sizeCanvas();
    // Clear canvas before repainting backdrop (covers mode-toggle re-runs
    // where dimensions stayed the same but pixel color changed).
    ctx.clearRect(0, 0, dims.w, dims.h);

    const CELL = 4;                  // pixel block size (px)

    // Static disintegration pattern painted once on mount — dense on the
    // left edge, scattering into nothing toward the right (mirrors the
    // reference). The cursor then continues to add paint on top.
    const paintBackdrop = () => {
      const W = dims.w, H = dims.h;
      ctx.fillStyle = pixelColor;
      // Soft elliptical blob anchored to the upper-right corner, disintegrating
      // outward toward the left and bottom.
      const cx = W * 0.95;
      const cy = H * 0.18;
      const rx = W * 0.16;
      const ry = H * 0.24;
      for (let yy = 0; yy < H; yy += CELL) {
        for (let xx = 0; xx < W; xx += CELL) {
          const nx = (xx - cx) / rx;
          const ny = (yy - cy) / ry;
          const d = Math.hypot(nx, ny);
          let dens;
          if (d < 0.55) dens = 0.92;
          else if (d < 1.0) dens = 0.92 * (1 - (d - 0.55) / 0.45) + 0.18 * ((d - 0.55) / 0.45);
          else if (d < 1.45) dens = 0.18 * (1 - (d - 1.0) / 0.45);
          else dens = 0;
          const jitter = 0.8 + Math.random() * 0.35;
          if (Math.random() < dens * jitter) {
            const px = Math.floor(xx / CELL) * CELL;
            const py = Math.floor(yy / CELL) * CELL;
            ctx.fillRect(px, py, CELL, CELL);
          }
        }
      }
    };
    paintBackdrop();

    // Re-size + re-paint when the hero box resizes (fonts loading, window
    // resize, devtools, etc). We blow away the cursor paint trail on resize,
    // which is fine — the backdrop is the important part.
    const ro = new ResizeObserver(() => {
      sizeCanvas();
      paintBackdrop();
    });
    ro.observe(parent);

    // Radial density bands — chance per cell of being painted at the cursor.
    const bands = [
      { r: 32,  d: 0.70 },
      { r: 70,  d: 0.28 },
      { r: 120, d: 0.10 },
      { r: 180, d: 0.03 },
    ];

    const paint = (cx, cy) => {
      ctx.fillStyle = pixelColor;
      const R = bands[bands.length - 1].r;
      for (let yy = cy - R; yy <= cy + R; yy += CELL) {
        for (let xx = cx - R; xx <= cx + R; xx += CELL) {
          const dx = xx - cx, dy = yy - cy;
          const r = Math.hypot(dx, dy);
          if (r > R) continue;
          let dens = 0;
          for (let i = 0; i < bands.length; i++) {
            if (r <= bands[i].r) { dens = bands[i].d; break; }
          }
          if (Math.random() < dens) {
            // Snap to global pixel grid so blocks tile cleanly.
            const px = Math.floor(xx / CELL) * CELL;
            const py = Math.floor(yy / CELL) * CELL;
            ctx.fillRect(px, py, CELL, CELL);
          }
        }
      }
    };

    let raf = 0;
    let pending = null;
    const onMove = (e) => {
      // Convert client coords to canvas-local layout coords, compensating
      // for any ancestor CSS transform (design-canvas zoom). The CSS pixel
      // size of the canvas element is dims.w × dims.h; its on-screen rect
      // is the transformed size.
      const r = parent.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      const sx = dims.w / r.width;
      const sy = dims.h / r.height;
      const lx = (e.clientX - r.left) * sx;
      const ly = (e.clientY - r.top) * sy;
      if (lx < -50 || ly < -50 || lx > dims.w + 50 || ly > dims.h + 50) return;
      pending = { x: lx, y: ly };
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (pending) paint(pending.x, pending.y);
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [activeProject, mode, pixelColor]);

  // Cursor-paint reveal on the word "thoughtful". An offscreen canvas accumulates
  // white circles where the cursor has touched the word; we encode it as a data
  // URL and feed it to the black overlay's `mask-image`. Once a region is
  // painted it never reverts.
  const wordWrapRef = React.useRef(null);
  React.useEffect(() => {
    const wrap = wordWrapRef.current;
    if (!wrap) return;
    const topEl = wrap.querySelector('.kn-word-top');
    if (!topEl) return;

    let W = 0, H = 0;
    const trail = document.createElement('canvas');
    const tctx = trail.getContext('2d');

    const sizeTrail = () => {
      const w = Math.max(1, wrap.offsetWidth);
      const h = Math.max(1, wrap.offsetHeight);
      if (w === W && h === H) return;
      // Preserve existing paint on resize.
      const old = (W && H) ? tctx.getImageData(0, 0, W, H) : null;
      W = w; H = h;
      trail.width = W;
      trail.height = H;
      if (old) tctx.putImageData(old, 0, 0);
      flushMask();
    };

    let pendingFlush = false;
    const flushMask = () => {
      if (pendingFlush) return;
      pendingFlush = true;
      requestAnimationFrame(() => {
        pendingFlush = false;
        if (!W || !H) { topEl.style.setProperty('--paint-mask', 'none'); return; }
        topEl.style.setProperty('--paint-mask', `url(${trail.toDataURL('image/png')})`);
      });
    };

    let paintRaf = 0;
    let pendingPt = null;
    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      if (r.width < 1) return;
      const sx = W / r.width;
      const sy = H / r.height;
      const lx = (e.clientX - r.left) * sx;
      const ly = (e.clientY - r.top) * sy;
      if (lx < -20 || ly < -20 || lx > W + 20 || ly > H + 20) return;
      pendingPt = { x: lx, y: ly };
      if (paintRaf) return;
      paintRaf = requestAnimationFrame(() => {
        paintRaf = 0;
        if (!pendingPt) return;
        const { x, y } = pendingPt;
        // Soft brush so the reveal looks like ink soaking in.
        const radius = Math.max(18, H * 0.45);
        tctx.fillStyle = '#fff';
        tctx.beginPath();
        tctx.arc(x, y, radius, 0, Math.PI * 2);
        tctx.fill();
        flushMask();
      });
    };

    sizeTrail();
    window.addEventListener('mousemove', onMove, { passive: true });
    const ro = new ResizeObserver(sizeTrail);
    ro.observe(wrap);
    return () => {
      window.removeEventListener('mousemove', onMove);
      ro.disconnect();
      if (paintRaf) cancelAnimationFrame(paintRaf);
    };
  }, [activeProject, mode, accent, fp.display, fp.displayWeight]);

  return (
    <div
      className={`${scope} kn-root kn-${mode} ${activeProject ? '' : 'kn-landing'} ${layout === 'mobile' ? 'kn-mobile' : ''}`}
      data-screen-label={`02 Mono Plum · ${activeProject ? 'Detail · ' : ''}${mode}${layout === 'mobile' ? ' · mobile' : ''}`}
    >
      <style>{scopedCss}</style>

      <nav className="kn-nav">
        <div className="kn-logo" style={{ cursor: 'pointer' }} onClick={() => setPage(null)}>Mariya Shijo</div>
        <div className="kn-nav-links">
          <a href="#work" onClick={() => setPage(null)}>Projects</a>
          <a href="#experience" onClick={() => setPage(null)}>Experience</a>
          <a href="#about" onClick={() => setPage(null)}>About</a>
          <a href={window.__resources?.resume || "assets/Mariya Shijo - Resume.pdf"} target="_blank" rel="noopener noreferrer">Resume</a>
          <a href="#contact" onClick={() => setPage(null)}>Contact</a>
        </div>
        <div className="kn-mode" role="group" aria-label="Color mode">
          <button className={`kn-mode-btn ${mode === 'light' ? 'active' : ''}`} onClick={() => setMode('light')} aria-label="Light mode" aria-pressed={mode === 'light'}><Sun /></button>
          <button className={`kn-mode-btn ${mode === 'dark' ? 'active' : ''}`} onClick={() => setMode('dark')} aria-label="Dark mode" aria-pressed={mode === 'dark'}><Moon /></button>
        </div>
      </nav>

      {activeProject ? (
        <DirectionKineticDetail project={activeProject} mode={mode} accent={accent} fp={fp} onBack={() => setPage(null)} />
      ) : (<>
      <section className="kn-hero">
        <canvas ref={canvasRef} className="kn-pixel-canvas" aria-hidden="true" />
        <div className="kn-hero-tag">Available · May 2026</div>
        <h1 className="kn-headline">
          Front-end developer<br />
          building{' '}
          <span className="kn-word-paint" ref={wordWrapRef}>
            <em>thoughtful</em>
            <em className="kn-word-top" aria-hidden="true">thoughtful</em>
          </span><br />
          web experiences.
        </h1>
        <div className="kn-sub">
          <p>
            Computer science student designing and shipping interfaces with
            careful UX, considered motion and a love for the small details.
            Currently open to internships and freelance briefs.
          </p>
          <div className="kn-sub-meta">
            <div>Based <b>NJ / NYC</b></div>
            <div>Focus <b>Frontend · UX · Creative Code</b></div>
            <div>Studying <b>Computer Science</b></div>
          </div>
        </div>
      </section>

      <section className="kn-work" id="work">
        <div className="kn-work-head">
          <h2>Projects</h2>
          <div className="kn-tag">{window.PROJECTS.length} Projects · 2024–2026</div>
        </div>

        <div className="kn-acc">
          {window.PROJECTS.map((p) => (
            <div key={p.n} className={`kn-acc-item ${open === p.n ? 'open' : ''}`}>
              <button className="kn-acc-head" onClick={() => toggle(p.n)} aria-expanded={open === p.n}>
                <div className="kn-acc-n">{p.n}</div>
                <div className="kn-acc-titles">
                  <div className="kn-acc-title">{p.title}</div>
                  <div className="kn-acc-sub">{p.subtitle}</div>
                </div>
                <div className="kn-acc-tag">{p.tag} · {p.year}</div>
                <div className="kn-acc-plus" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 1v10M1 6h10"/></svg>
                </div>
              </button>
              <div className="kn-acc-body">
                <div className="kn-acc-body-inner">
                  <div className="kn-acc-body-grid">
                    <div></div>
                    <div>
                      <p>{p.blurb}</p>
                      <div className="kn-acc-tags">
                        {p.tags.map((tg) => <span key={tg}>{tg}</span>)}
                      </div>
                    </div>
                    <div className="kn-acc-cta-stack">
                      {p.slug === 'personal-portfolio' ? (
                        <span className="kn-acc-cta kn-acc-cta-muted">You're here ✓</span>
                      ) : (
                        <a className="kn-acc-cta" href="#" onClick={(e) => { e.preventDefault(); setPage(p.slug); }}>View project ↗</a>
                      )}
                      {p.slug === 'ats-for-candidates' && (
                        <a className="kn-acc-cta" href="https://github.com/digislav/The-Infinite-Loops" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>GitHub ↗</a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="kn-exp" id="experience">
        <div className="kn-exp-head">
          <h2>Experience</h2>
          <div className="kn-tag">{window.WORK_HISTORY.length} Roles · 2023 — Present</div>
        </div>
        <div className="kn-exp-list">
          {window.WORK_HISTORY.map((w, i) => (
            <div key={i} className="kn-exp-item">
              <div className="kn-exp-period">{w.period}</div>
              <div className="kn-exp-body">
                <div className="kn-exp-role">{w.role}</div>
                <div className="kn-exp-company">{w.company}</div>
                <p className="kn-exp-summary">{w.summary}</p>
              </div>
              <div className="kn-exp-location">{w.location}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="kn-about" id="about">
        <h2>About</h2>
        <div>
          <p>
            My practice sits between engineering and design. I sketch, prototype
            in code, and care about the small frictions that make a product feel
            cheap or feel resolved.
          </p>
          <p>
            Outside of client work I keep a notebook of creative coding sketches —
            a place to test ideas without a deadline.
          </p>
        </div>
      </section>

      <footer className="kn-foot" id="contact">
        <h2>
          Let's<br/>
          <a href="https://www.linkedin.com/in/mariya-s-b23743290/">work together →</a>
        </h2>
        <div className="kn-foot-col">
          <b>Elsewhere</b>
          <a href="https://www.linkedin.com/in/mariya-s-b23743290/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href="https://github.com/mariyashijo232" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href={window.__resources?.resume || "assets/Mariya Shijo - Resume.pdf"} target="_blank" rel="noopener noreferrer">Resume ↗</a>
        </div>
        <div className="kn-foot-col">
          <b>Index</b>
          <span>© 2026 Mariya Shijo</span>
        </div>
      </footer>
      </>)}
    </div>
  );
};

window.DirectionKinetic = DirectionKinetic;

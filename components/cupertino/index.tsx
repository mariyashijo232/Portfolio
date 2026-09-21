'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PROFILE, WORK, OTHER, CASES, EXPERIENCE, ABOUT, LIFE, TOOLBOX, AURA_BY_SLUG } from '@/lib/data';
import { useReveal } from '@/hooks/useReveal';
import { SunIcon, MoonIcon, ArrowIcon } from '@/components/icons';
import type { PageInfo } from '@/components/SiteWrapper';
import ResearchVisuals from './ResearchVisuals';

interface Props {
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  page: PageInfo;
}

const Aura = ({ tone, bleed, thumb, full, short }: {
  tone?: string; bleed?: boolean; thumb?: boolean; full?: boolean; short?: boolean;
}) => (
  <div
    className={
      'cu-aura' +
      (tone ? ' ' + tone : '') +
      (bleed ? ' is-bleed' : '') +
      (thumb ? ' is-thumb' : '') +
      (full ? ' is-full' : '') +
      (short ? ' is-short' : '')
    }
    aria-hidden="true"
  >
    <i/><i/><i/><i/><i/><i/>
    <span className="cu-grain"/>
  </div>
);

function SectionRail({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '');
  const [pct, setPct] = useState(0);

  return (
    <div className="cu-rail">
      <div className="cu-railrow">
        {items.map((s) => (
          <a
            key={s.id}
            href={'#' + s.id}
            aria-current={active === s.id ? 'true' : undefined}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(s.id);
              if (el) {
                window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: 'smooth' });
                setActive(s.id);
              }
            }}
          >
            <span>{s.label}</span>
          </a>
        ))}
      </div>
      <div className="cu-railbar"><i style={{ height: pct + '%' }}/></div>
    </div>
  );
}

export default function Cupertino({ theme, setTheme, page }: Props) {
  const [tab, setTab] = useState<'work' | 'other'>('work');
  const router = useRouter();
  useReveal([page.view, page.slug, tab]);

  const L = PROFILE.links;
  const list = tab === 'work' ? WORK : OTHER;

  const nav = (
    <nav className="cu-nav">
      <div className="cu-nav-in">
        <div className="cu-name" style={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
          {PROFILE.name}
        </div>
        <div className="cu-links">
          <Link href="/">Work</Link>
          <Link href="/about">About</Link>
        </div>
        <button
          className="cu-tog"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle appearance"
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
        <a className="cu-cta" href={L.resume} target="_blank" rel="noopener noreferrer">Résumé</a>
      </div>
    </nav>
  );

  let content: React.ReactNode;

  if (page.view === 'project') {
    const w = WORK.find((x) => x.slug === page.slug);
    const c = CASES[page.slug!];

    if (!w || !c) {
      content = (
        <header className="cu-hero" style={{ display: 'block', paddingTop: 'clamp(52px,9vh,104px)' }}>
          <div>
            <Link className="cu-back" href="/">← All work</Link>
            <h1 className="cu-h1">Not found</h1>
          </div>
        </header>
      );
    } else {
      const railItems = [
        ...c.sections.map((s) => ({ id: 'sec-' + s.h.toLowerCase().replace(/[^a-z]+/g, '-'), label: s.h })),
        ...(c.mockups ? [{ id: 'sec-mockups', label: 'Mockups' }] : []),
        ...(c.takeaways.length ? [{ id: 'sec-takeaways', label: 'Takeaways' }] : []),
      ];
      content = (
        <>
          <header
            className="cu-hero"
            style={{ display: 'block', paddingTop: 'clamp(52px,9vh,104px)', paddingBottom: 'clamp(72px,11vh,132px)' }}
          >
            <Aura tone={AURA_BY_SLUG[page.slug!]} bleed short />
            <div>
              <Link className="cu-back" href="/" data-reveal>← All work</Link>
              <div className="cu-ptop" data-reveal>
                {w.kind}
                {w.tag && <span>{w.tag}</span>}
                <span>{w.status}</span>
              </div>
              <h1 className="cu-h1" data-reveal data-d="1">{w.title}</h1>
              <p className="cu-plede" data-reveal data-d="2">{w.oneLiner}</p>
              <div className="cu-pmeta" data-reveal data-d="2">
                <div><span className="cu-pmlab">Role</span><span className="cu-pmval">{c.role}</span></div>
                <div><span className="cu-pmlab">Timeline</span><span className="cu-pmval">{c.timeline}</span></div>
                <div><span className="cu-pmlab">Team</span><span className="cu-pmval">{c.team}</span></div>
                <div><span className="cu-pmlab">Built with</span><span className="cu-pmval">{w.stack.join(', ')}</span></div>
              </div>
            </div>
          </header>

          <SectionRail items={railItems} />

          <section className="cu-sec cu-cs-first" style={{ paddingTop: 'clamp(52px,8vh,96px)' }}>
            {c.sections.map((s, i) => (
              <Fragment key={s.h}>
                <div className="cu-body" style={{ marginTop: i === 0 ? 0 : 'clamp(30px,4vw,46px)' }}>
                  <div id={'sec-' + s.h.toLowerCase().replace(/[^a-z]+/g, '-')} data-reveal>
                    <h2 className="cu-bh">{s.h}</h2>
                    {s.p.map((t, k) => (typeof t === 'string' ? <p key={k}>{t}</p> : <p key={k}><b>{t.b}</b> {t.t}</p>))}
                    {s.table && (
                      <table className="cu-cs-table">
                        <thead>
                          <tr>{s.table.cols.map((col) => <th key={col}>{col}</th>)}</tr>
                        </thead>
                        <tbody>
                          {s.table.rows.map((row, ri) => (
                            <tr key={ri}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                    {s.callout && <blockquote className="cu-cs-callout">{s.callout}</blockquote>}
                    {s.points && (
                      <div className="cu-cs-points">
                        {s.points.map((pt) => (
                          <div className="cu-cs-point" key={pt.h}>
                            <h4>{pt.h}</h4>
                            <p>{pt.p}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {s.research && c.research && <ResearchVisuals r={c.research} />}
              </Fragment>
            ))}

            {c.mockups && (
              <div className="cu-mock" id="sec-mockups" data-reveal>
                <h2 className="cu-bh">Mockups</h2>
                <p className="cu-mocklead">{c.mockups.lead}</p>
                <div className="cu-shots">
                  {c.mockups.shots.map((s) => (
                    <figure className="cu-shot" key={s.slot} style={{ margin: 0 }}>
                      <div className="cu-phone">
                        <div className="cu-shotimg" style={{ position: 'relative' }}>
                          {s.img ? (
                            <Image
                              src={s.img}
                              alt={s.label}
                              fill
                              sizes="(max-width:760px) 90vw, 340px"
                              style={{ objectFit: 'cover', objectPosition: 'top' }}
                            />
                          ) : (
                            <div className="cu-img-placeholder" style={{ width: '100%', height: '100%' }} />
                          )}
                        </div>
                      </div>
                      <figcaption className="cu-shotcap"><b>{s.label}</b><span>{s.note}</span></figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {c.takeaways.length > 0 && (
              <div className="cu-body" style={{ marginTop: 'clamp(30px,4vw,46px)' }}>
                <div className="cu-takebox" id="sec-takeaways" data-reveal>
                  <h2 className="cu-bh">Key takeaways</h2>
                  <ul className="cu-take">
                    {c.takeaways.map((t, k) => <li key={k}>{t}</li>)}
                  </ul>
                </div>
              </div>
            )}
          </section>
        </>
      );
    }
  } else if (page.view === 'about') {
    content = (
      <>
        <header className="cu-hero">
          <Aura tone="is-orange" bleed short />
          <div>
            <div className="cu-kick" data-reveal>{PROFILE.name}</div>
            <h1 className="cu-h1" data-reveal data-d="1">About<br/><em>me</em></h1>
          </div>
        </header>

        <div className="cu-life" data-reveal>
          <div className="cu-lgrid">
            {LIFE.map((p) => (
              <figure className="cu-lpic" key={p.src} style={{ margin: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.alt} loading="lazy" />
                <figcaption className="cu-lcap">{p.cap || p.alt}</figcaption>
              </figure>
            ))}
          </div>
          <span className="cu-bubble">
            Thanks for stopping by{' '}
            <svg className="cu-heart" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 20.4s-7.6-4.7-9.4-9C1.2 7.9 3 4.6 6.3 4.1c2-.3 3.9.7 4.9 2.4l.8 1.3.8-1.3c1-1.7 2.9-2.7 4.9-2.4 3.3.5 5.1 3.8 3.7 7.3-1.8 4.3-9.4 9-9.4 9Z"/>
            </svg>
          </span>
        </div>

        <section className="cu-sec" style={{ paddingTop: 'clamp(26px,3.4vw,40px)' }}>
          <div className="cu-about">
            <div data-reveal>
              {ABOUT.map((p, i) => <p key={i}>{p}</p>)}
              <div className="cu-sublab" style={{ marginTop: 30 }}>Toolbox</div>
              <div className="cu-tools">{TOOLBOX.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
            <div data-reveal data-d="1">
              <div className="cu-sublab">Experience</div>
              <div className="cu-group">
                {EXPERIENCE.map((e) => (
                  <div className="cu-exp" key={e.company}>
                    <div>
                      <div className="cu-erole">{e.role}</div>
                      <div className="cu-ecomp">{e.company}</div>
                    </div>
                    <div>
                      <div className="cu-eper">{e.period}</div>
                      <div className="cu-eplace">{e.place}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    content = (
      <>
        <header className="cu-hero">
          <Aura bleed />
          <div>
            <div className="cu-kick" data-reveal>{PROFILE.name}</div>
            <h1 className="cu-h1" data-reveal data-d="1">Product<br/><em>Designer</em></h1>
            <div className="cu-feat" data-reveal data-d="2"><span>Design</span><span>Build</span><span>Ship</span></div>
          </div>
          <div className="cu-line" data-reveal data-d="2">
            <p><i>Currently:</i> Working for The International Girls Academy</p>
            <p><i>In the works:</i> Blocked — a productivity app</p>
          </div>
        </header>

        <section className="cu-sec" id="cu-work">
          <div className="cu-head" data-reveal>
            <div className="cu-lab">{tab === 'work' ? 'Selected work' : 'Beyond the screen'}</div>
            <div className="cu-seg" role="tablist">
              <button role="tab" aria-selected={tab === 'work'} onClick={() => setTab('work')}>Work</button>
              <button role="tab" aria-selected={tab === 'other'} onClick={() => setTab('other')}>Other</button>
            </div>
          </div>
          <div className="cu-cards">
            {list.map((it) => (
              <article
                className="cu-card"
                key={it.slug || it.title}
                data-reveal
                onClick={() => { if (CASES[it.slug]) router.push('/work/' + it.slug); }}
                style={CASES[it.slug] ? { cursor: 'pointer' } : undefined}
              >
                <div className="cu-cshot cu-cshot--has-aura">
                  {(it as typeof WORK[0]).cover ? (
                    <Image
                      src={(it as typeof WORK[0]).cover!}
                      alt={it.title}
                      fill
                      sizes="(max-width:760px) 84vw, (max-width:1280px) 50vw, 600px"
                      style={{ objectFit: 'cover' }}
                      priority={false}
                    />
                  ) : (
                    <Aura tone={AURA_BY_SLUG[it.slug]} thumb />
                  )}
                </div>
                <div className="cu-cfoot">
                  <div className="cu-crow">
                    <h3 className="cu-ctitle">{it.title}</h3>
                    <span className="cu-cyear">{it.year}</span>
                  </div>
                  <div className="cu-ckind">{it.kind}</div>
                  <div className="cu-tags">
                    {it.tag && <span>{it.tag}</span>}
                    {it.status && <span className={(it as typeof WORK[0]).soon ? 'is-soon' : undefined}>{it.status}</span>}
                    {(it.stack || []).slice(0, 3).map((s) => <span key={s}>{s}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </>
    );
  }

  return (
    <div className="cu" data-theme={theme}>
      {nav}
      <div className="cu-wrap">
        {content}

        <section className="cu-sec" id="cu-contact">
          <div className="cu-contact">
            <div data-reveal>
              <h2 className="cu-ch2">Let&rsquo;s<br/><em>work together</em></h2>
              <p className="cu-csub">Open to new design or full-stack development roles. LinkedIn is the fastest way to reach me.</p>
            </div>
            <div className="cu-btns" data-reveal data-d="1">
              <a className="cu-btn is-p" href={L.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowIcon /></a>
              <a className="cu-btn" href={L.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowIcon /></a>
              <a className="cu-btn" href={L.resume} target="_blank" rel="noopener noreferrer">Résumé <ArrowIcon /></a>
            </div>
          </div>
          <div className="cu-foot">
            <span>© 2026 {PROFILE.name}</span>
            <span>Designed and built in {PROFILE.location}</span>
          </div>
        </section>
      </div>
    </div>
  );
}

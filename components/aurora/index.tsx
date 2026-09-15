'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PROFILE, WORK, OTHER, EXPERIENCE, ABOUT, TOOLBOX, AURA_BY_SLUG } from '@/lib/data';

const TINT_GRADIENT: Record<string, string> = {
  'is-teal':   'linear-gradient(135deg, #0f8f8f 0%, #5fcfc4 60%, #a8e6de 100%)',
  'is-pink':   'linear-gradient(135deg, #e01e86 0%, #ff6fb0 60%, #ffc2dd 100%)',
  'is-sunset': 'linear-gradient(135deg, #f0561f 0%, #e23a5c 55%, #ffa03d 100%)',
  'is-orange': 'linear-gradient(135deg, #ff9a3d 0%, #e8590c 100%)',
  'is-violet': 'linear-gradient(135deg, #7a2ad8 0%, #b18aff 100%)',
};
import { useReveal } from '@/hooks/useReveal';
import { useScrollY } from '@/hooks/useScrollY';
import { SunIcon, MoonIcon, ArrowIcon } from '@/components/icons';
import AppRail from '@/components/AppRail';
import type { PageInfo } from '@/components/SiteWrapper';

interface Props {
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  page: PageInfo;
}

export default function Aurora({ theme, setTheme, page }: Props) {
  const [tab, setTab] = useState<'work' | 'other'>('work');
  const router = useRouter();
  useReveal([page, tab]);
  const y = useScrollY();
  const L = PROFILE.links;

  const nav = (
    <nav className="au-nav">
      <div className="au-name" style={{ cursor: 'pointer' }} onClick={() => router.push('/')}>{PROFILE.name}</div>
      <div className="au-links">
        <Link href="/">Work</Link>
        <Link href="/about">About</Link>
      </div>
      <button className="au-tog" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle appearance">
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
      <a className="au-cta" href={L.resume} target="_blank" rel="noopener noreferrer">Résumé</a>
    </nav>
  );

  return (
    <div className="au" data-theme={theme}>
      <div className="au-mesh" style={{ transform: `translate3d(0,${y * -0.09}px,0)` }}>
        <div className="au-blob"/><div className="au-blob"/><div className="au-blob"/><div className="au-blob"/>
      </div>

      <div className="au-body">
        {nav}
        <div className="au-wrap">
          {page.view === 'about' ? (
            <>
              <header className="au-hero">
                <div className="au-kick" data-reveal>Mariya Shijo</div>
                <div className="au-pill" data-reveal><span className="au-dot"/>{PROFILE.availability}</div>
                <h1 className="au-h1" data-reveal data-d="1" style={{ transform: `translate3d(0,${y * -0.04}px,0)` }}>
                  About<br/><em>me</em>
                </h1>
              </header>

              <section className="au-sec" id="au-about">
                <div className="au-about">
                  <div data-reveal>{ABOUT.map((p, i) => <p key={i}>{p}</p>)}</div>
                  <div className="au-tools" data-reveal data-d="1">
                    {TOOLBOX.map((t) => <span key={t}>{t}</span>)}
                  </div>
                </div>
                <div className="au-sublab" data-reveal>Experience</div>
                <div className="au-exp" data-reveal>
                  {EXPERIENCE.map((e) => (
                    <div className="au-erow" key={e.company}>
                      <div>
                        <div className="au-erole">{e.role}</div>
                        <div className="au-ecomp">{e.company}</div>
                      </div>
                      <div>
                        <div className="au-eper">{e.period}</div>
                        <div className="au-eplace">{e.place}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <>
              <header className="au-hero">
                <div className="au-kick" data-reveal>Mariya Shijo</div>
                <div className="au-pill" data-reveal><span className="au-dot"/>{PROFILE.availability}</div>
                <h1 className="au-h1" data-reveal data-d="1" style={{ transform: `translate3d(0,${y * -0.04}px,0)` }}>
                  Product<br/><em>Designer</em>
                </h1>
                <p className="au-line" data-reveal data-d="2">I design interfaces that feel obvious, then build them myself.</p>
                <div className="au-feat" data-reveal data-d="2"><span>Design</span><span>Build</span><span>Ship</span></div>
                <div style={{ marginTop: 34 }} data-reveal data-d="2"><AppRail center /></div>
              </header>

              <section className="au-sec" id="au-work">
                <div className="au-lab" data-reveal>Selected work</div>
                <h2 className="au-h2" data-reveal>
                  {tab === 'work'
                    ? <><span>Three things</span><br/><span>I&rsquo;m building</span></>
                    : <><span>Where else</span><br/><span>I make things</span></>}
                </h2>
                <div className="au-segwrap" data-reveal>
                  <div className="au-seg" role="tablist">
                    <button role="tab" aria-selected={tab === 'work'} onClick={() => setTab('work')}>Work</button>
                    <button role="tab" aria-selected={tab === 'other'} onClick={() => setTab('other')}>Other</button>
                  </div>
                </div>
                <div className="au-tiles">
                  {tab === 'other' ? OTHER.map((o) => (
                    <article className="au-tile" key={o.title} data-reveal>
                      <div className="au-tshot au-img-placeholder" />
                      <div className="au-tover">
                        <div className="au-trow"><span>{o.kind}</span></div>
                        <h3 className="au-ttitle">{o.title}</h3>
                      </div>
                    </article>
                  )) : WORK.map((w) => (
                    <article
                      className="au-tile"
                      key={w.slug}
                      data-reveal
                      onClick={() => router.push('/work/' + w.slug)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="au-tshot" style={{
                        position: 'relative',
                        background: !w.cover ? (TINT_GRADIENT[AURA_BY_SLUG[w.slug]] ?? TINT_GRADIENT['is-violet']) : undefined,
                      }}>
                        {w.cover && (
                          <Image
                            src={w.cover}
                            alt={w.title}
                            fill
                            sizes="(max-width:620px) 100vw, (max-width:940px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                          />
                        )}
                      </div>
                      <div className="au-tover">
                        <div className="au-trow">
                          <span>{w.kind}</span>
                          <span className="au-stat">{w.status}</span>
                        </div>
                        <h3 className="au-ttitle">{w.title}</h3>
                        <div className="au-chips">{w.stack.map((s) => <span key={s}>{s}</span>)}</div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </>
          )}

          <section className="au-contact" id="au-contact">
            <h2 className="au-ch2" data-reveal>Let&rsquo;s<br/><em>work together</em></h2>
            <p className="au-csub" data-reveal data-d="1">
              Open to new design or full-stack development roles. LinkedIn is the fastest way to reach me.
            </p>
            <div className="au-btns" data-reveal data-d="2">
              <a className="au-btn is-p" href={L.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowIcon /></a>
              <a className="au-btn" href={L.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowIcon /></a>
              <a className="au-btn" href={L.resume} target="_blank" rel="noopener noreferrer">Résumé <ArrowIcon /></a>
            </div>
            <div className="au-foot">
              <span>© 2026 {PROFILE.name}</span>
              <span>Designed and built by me</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

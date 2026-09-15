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
import { SunIcon, MoonIcon, ChevronIcon } from '@/components/icons';
import AppRail from '@/components/AppRail';
import type { PageInfo } from '@/components/SiteWrapper';

interface Props {
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  page: PageInfo;
}

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95C20.3 8.75 22 10.7 22 14.3V21h-4v-6c0-1.6-.6-2.7-2-2.7-1.1 0-1.8.75-2.05 1.5-.1.25-.13.6-.13.95V21H9V9Z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.88 1.52 2.32 1.08 2.88.82.09-.64.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.4 9.4 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/>
  </svg>
);

const ResumeIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 3v5h5M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Z"/>
  </svg>
);

export default function Inset({ theme, setTheme, page }: Props) {
  const [tab, setTab] = useState<'work' | 'other'>('work');
  const router = useRouter();
  useReveal([page, tab]);
  const L = PROFILE.links;

  return (
    <div className="inx" data-theme={theme}>
      <nav className="inx-nav">
        <div className="inx-nav-in">
          <div className="inx-name" style={{ cursor: 'pointer' }} onClick={() => router.push('/')}>{PROFILE.name}</div>
          <div className="inx-navwrap">
            <Link className={'inx-navlink' + (page.view === 'home' ? ' is-on' : '')} href="/">Work</Link>
            <Link className={'inx-navlink' + (page.view === 'about' ? ' is-on' : '')} href="/about">About</Link>
          </div>
          <button className="inx-tog" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle appearance">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <a className="inx-cta" href={L.resume} target="_blank" rel="noopener noreferrer">Résumé</a>
        </div>
      </nav>

      <div className="inx-wrap">
        {page.view === 'about' ? (
          <>
            <header className="inx-hero">
              <div className="inx-kick" data-reveal>Mariya Shijo</div>
              <h1 className="inx-h1" data-reveal>About</h1>
              <div className="inx-avail" data-reveal data-d="2"><span className="inx-dot"/>{PROFILE.availability}</div>
            </header>

            <section className="inx-sec">
              <div className="inx-lab" data-reveal>Background</div>
              <div className="inx-group" data-reveal>
                <div className="inx-row inx-about">{ABOUT.map((p, i) => <p key={i}>{p}</p>)}</div>
                <div className="inx-row"><div className="inx-tools">{TOOLBOX.map((t) => <span key={t}>{t}</span>)}</div></div>
              </div>
              <div className="inx-lab" style={{ paddingTop: 26 }} data-reveal>Experience</div>
              <div className="inx-group" data-reveal>
                {EXPERIENCE.map((e) => (
                  <div className="inx-row" key={e.company}>
                    <div className="inx-erow">
                      <div className="inx-emain">
                        <div className="inx-erole">{e.role}</div>
                        <div className="inx-ecomp">{e.company}</div>
                      </div>
                      <div>
                        <div className="inx-eper">{e.period}</div>
                        <div className="inx-eplace">{e.place}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
            <header className="inx-hero">
              <div className="inx-kick" data-reveal>Mariya Shijo</div>
              <h1 className="inx-h1" data-reveal>Product Designer</h1>
              <div className="inx-avail" data-reveal data-d="1"><span className="inx-dot"/>{PROFILE.availability}</div>
              <p className="inx-line" data-reveal data-d="2">I design interfaces that feel obvious, then build them myself.</p>
              <div className="inx-feat" data-reveal data-d="2"><span>Design</span><span>Build</span><span>Ship</span></div>
              <div style={{ marginTop: 26 }} data-reveal data-d="2"><AppRail /></div>
              <div className="inx-group inx-ident" data-reveal data-d="2">
                <div className="inx-row">
                  <div className="inx-irow">
                    <span className="inx-ilab">Focus</span>
                    <span className="inx-ival">{PROFILE.focus}</span>
                  </div>
                </div>
              </div>
            </header>

            <section className="inx-sec">
              <div className="inx-lab" data-reveal>{tab === 'work' ? 'Work' : 'Beyond the screen'}</div>
              <div className="inx-seg" role="tablist" data-reveal>
                <button role="tab" aria-selected={tab === 'work'} onClick={() => setTab('work')}>Work</button>
                <button role="tab" aria-selected={tab === 'other'} onClick={() => setTab('other')}>Other</button>
              </div>
              <div className="inx-group" data-reveal>
                {tab === 'work' ? WORK.map((w) => (
                  <div className="inx-row inx-card" key={w.slug} onClick={() => router.push('/work/' + w.slug)} style={{ cursor: 'pointer' }}>
                    <div className="inx-shot" style={{
                      position: 'relative',
                      background: !w.cover ? (TINT_GRADIENT[AURA_BY_SLUG[w.slug]] ?? TINT_GRADIENT['is-violet']) : undefined,
                    }}>
                      {w.cover && (
                        <Image
                          src={w.cover}
                          alt={w.title}
                          fill
                          sizes="(max-width:680px) 100vw, 640px"
                          style={{ objectFit: 'cover' }}
                        />
                      )}
                      <div className="inx-cover">
                        <div className="inx-chead">
                          <div className="inx-cmain">
                            <div className="inx-ctitle">{w.title}</div>
                            <div className="inx-ckind">{w.kind} · {w.period}</div>
                          </div>
                          <div className="inx-cright"><span className="inx-badge">{w.status}</span></div>
                        </div>
                        <div className="inx-chips">{w.stack.map((s) => <span key={s}>{s}</span>)}</div>
                      </div>
                    </div>
                  </div>
                )) : OTHER.map((o) => (
                  <div className="inx-row inx-card" key={o.title}>
                    <div className="inx-shot inx-img-placeholder" style={{ position: 'relative' }}>
                      <div className="inx-cover">
                        <div className="inx-ctitle">{o.title}</div>
                        <div className="inx-ckind">{o.kind}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="inx-note">Full case studies go up as each project ships.</div>
            </section>
          </>
        )}

        <section className="inx-sec">
          <div className="inx-lab" data-reveal>Contact</div>
          <div className="inx-group inx-links" data-reveal>
            <a className="inx-row" href={L.linkedin} target="_blank" rel="noopener noreferrer">
              <span className="inx-lico"><LinkedInIcon /></span>
              LinkedIn <span className="inx-lval">Fastest reply <ChevronIcon /></span>
            </a>
            <a className="inx-row" href={L.github} target="_blank" rel="noopener noreferrer">
              <span className="inx-lico"><GitHubIcon /></span>
              GitHub <span className="inx-lval">Code <ChevronIcon /></span>
            </a>
            <a className="inx-row" href={L.resume} target="_blank" rel="noopener noreferrer">
              <span className="inx-lico"><ResumeIcon /></span>
              Résumé <span className="inx-lval">PDF <ChevronIcon /></span>
            </a>
          </div>
        </section>

        <div className="inx-foot">© 2026 {PROFILE.name}<br/>{PROFILE.focus}</div>
      </div>
    </div>
  );
}

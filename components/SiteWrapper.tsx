'use client';

import { useState, useEffect } from 'react';
import BuiltWith from './BuiltWith';
import Cupertino from './cupertino';
import Aurora from './aurora';
import Inset from './inset';

const DIRECTIONS = ['cupertino', 'aurora', 'inset'] as const;
type Direction = (typeof DIRECTIONS)[number];

export interface PageInfo {
  view: 'home' | 'about' | 'project';
  slug?: string;
}

interface Props {
  page: PageInfo;
}

export default function SiteWrapper({ page }: Props) {
  const [dir, setDir] = useState<Direction>('cupertino');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedDir = (localStorage.getItem('ms-dir') as Direction) || 'cupertino';
    const savedTheme = (localStorage.getItem('ms-theme') as 'light' | 'dark') || 'light';
    setDir(savedDir);
    setTheme(savedTheme);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem('ms-dir', dir);
  }, [dir, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem('ms-theme', theme);
    document.body.style.background = theme === 'dark' ? '#0b0b0c' : '#fff';
  }, [theme, ready]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).matches('input,textarea')) return;
      const idx = ['1', '2', '3'].indexOf(e.key);
      if (idx > -1) setDir(DIRECTIONS[idx]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!ready) return null;

  const props = { theme, setTheme, page };

  return (
    <>
      {dir === 'cupertino' && <Cupertino key="cupertino" {...props} />}
      {dir === 'aurora' && <Aurora key="aurora" {...props} />}
      {dir === 'inset' && <Inset key="inset" {...props} />}
      <BuiltWith />
    </>
  );
}

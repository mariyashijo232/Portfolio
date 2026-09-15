'use client';

import { useState, useRef } from 'react';
import { RAIL_ITEMS } from '@/lib/data';

const STEP = 120;

export default function AppRail({ center }: { center?: boolean }) {
  const [i, setI] = useState(0);
  const [dx, setDx] = useState(0);
  const from = useRef<number | null>(null);
  const n = RAIL_ITEMS.length;

  const step = (dir: number) => setI((k) => (k + (dir > 0 ? 1 : n - 1)) % n);

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    from.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (from.current == null) return;
    const raw = e.clientX - from.current;
    setDx(Math.abs(raw) <= STEP ? raw : Math.sign(raw) * (STEP + (Math.abs(raw) - STEP) * 0.32));
  };
  const onUp = () => {
    if (from.current == null) return;
    const d = dx;
    from.current = null;
    setDx(0);
    if (Math.abs(d) > STEP * 0.28) step(d < 0 ? 1 : -1);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
  };

  const dragging = from.current != null;
  const pos = i - dx / STEP;
  const front = RAIL_ITEMS[i];

  return (
    <>
      <div className={'ms-car' + (center ? ' is-center' : '') + (dragging ? ' is-live' : '')}>
        <div
          className="ms-stage"
          role="group"
          tabIndex={0}
          aria-label={`${front.name} — ${front.sub}. Arrow keys to browse.`}
          onKeyDown={onKey}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          {RAIL_ITEMS.map((t, k) => {
            let off = k - pos;
            while (off > n / 2) off -= n;
            while (off < -n / 2) off += n;
            const a = Math.abs(off);
            return (
              <span
                className="ms-cslot"
                key={t.name}
                data-active={a < 0.5 ? 'true' : 'false'}
                style={{
                  transform: `translate(-50%,-50%) translateX(${off * STEP}px) scale(${Math.max(0.76, 1 - a * 0.13)})`,
                  opacity: Math.max(0, 1 - a * 0.52),
                  zIndex: Math.round(10 - a * 2),
                }}
                onClick={() => { if (a >= 0.5) setI(k); }}
              >
                <span className="ms-tile">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.img} alt="" loading="lazy" draggable={false} />
                </span>
              </span>
            );
          })}
        </div>
        <div className="ms-cap"><b>{front.name}</b><span>{front.sub}</span></div>
        <div className="ms-dots">
          {RAIL_ITEMS.map((t, k) => (
            <button key={t.name} aria-current={k === i ? 'true' : undefined} aria-label={t.name} onClick={() => setI(k)} />
          ))}
        </div>
      </div>
    </>
  );
}

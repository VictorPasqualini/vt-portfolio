'use client';

import { useEffect, useRef } from 'react';

const CHARSET = '01<>/{}[]#$%&*+-=:;.ETLSPARKFWIODNM';
const COL_WIDTH = 22;
const ROW_HEIGHT = 24;
const MAX_LETTERS = 700;

// Sweep: the pointer drags the fabric, so letters are thrown *against* the
// direction of travel (mouse to the right pushes letters left) and then swing
// back on a slow, lightly damped spring so it reads as a curtain settling.
const REACH_X = 170;
const REACH_Y = 130;
const SWEEP_GAIN = 0.85;
const SPRING = 0.012;
const DAMPING = 0.97;
const MAX_OFFSET = 70;

type Letter = {
  el: HTMLSpanElement;
  homeX: number;
  homeY: number;
  /** How freely this letter swings — bottom of the curtain moves more than the top. */
  weight: number;
  /** Per-letter spring jitter so the fabric returns unevenly instead of in lockstep. */
  spring: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  awake: boolean;
};

export default function LetterCurtain() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: -9999, y: -9999, active: false };
    // Horizontal distance the pointer covered since the last animation frame.
    let sweep = 0;
    let letters: Letter[] = [];
    let rect = host.getBoundingClientRect();
    let frame = 0;

    const build = () => {
      host.replaceChildren();
      letters = [];
      rect = host.getBoundingClientRect();
      const cols = Math.ceil(rect.width / COL_WIDTH);
      const maxRows = Math.floor(MAX_LETTERS / Math.max(cols, 1));
      const rows = Math.min(Math.ceil(rect.height / ROW_HEIGHT), maxRows);

      for (let c = 0; c < cols; c++) {
        const strip = document.createElement('div');
        strip.className = 'curtain-strip';
        strip.style.left = `${c * COL_WIDTH}px`;
        strip.style.animationDelay = `${-(c % 9) * 0.8}s`;

        for (let r = 0; r < rows; r++) {
          const el = document.createElement('span');
          el.className = 'curtain-letter';
          el.style.top = `${r * ROW_HEIGHT}px`;
          el.textContent = CHARSET[Math.floor(Math.random() * CHARSET.length)];
          strip.appendChild(el);
          letters.push({
            el,
            homeX: c * COL_WIDTH + COL_WIDTH / 2,
            homeY: r * ROW_HEIGHT + ROW_HEIGHT / 2,
            weight: 0.35 + 0.65 * (rows > 1 ? r / (rows - 1) : 1),
            spring: SPRING * (0.75 + Math.random() * 0.5),
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            awake: false,
          });
        }
        host.appendChild(strip);
      }
    };

    const step = () => {
      const gust = sweep;
      sweep = 0;

      for (const l of letters) {
        const dx = l.homeX - pointer.x;
        const dy = l.homeY - pointer.y;
        const near = pointer.active && Math.abs(dx) < REACH_X && Math.abs(dy) < REACH_Y;
        if (!near && !l.awake) continue;

        if (near && gust !== 0) {
          const falloff = (1 - Math.abs(dx) / REACH_X) * (1 - Math.abs(dy) / REACH_Y);
          const impulse = -gust * SWEEP_GAIN * falloff * l.weight;
          l.vx += impulse;
          // A little vertical lift, always upward, like cloth catching air.
          l.vy -= Math.abs(impulse) * 0.12;
        }

        l.vx = (l.vx - l.spring * l.x) * DAMPING;
        l.vy = (l.vy - l.spring * 1.6 * l.y) * DAMPING;
        l.x = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, l.x + l.vx));
        l.y = Math.max(-MAX_OFFSET / 2, Math.min(MAX_OFFSET / 2, l.y + l.vy));

        const still =
          Math.abs(l.x) < 0.05 && Math.abs(l.y) < 0.05 && Math.abs(l.vx) < 0.05 && Math.abs(l.vy) < 0.05;
        if (still) {
          l.x = l.y = l.vx = l.vy = 0;
          l.awake = false;
        } else {
          l.awake = true;
        }

        const lift = Math.min(Math.abs(l.x) / 45, 1);
        l.el.style.transform = `translate3d(${l.x.toFixed(2)}px, ${l.y.toFixed(2)}px, 0)`;
        l.el.style.opacity = (0.5 + lift * 0.45).toFixed(2);
      }
      frame = requestAnimationFrame(step);
    };

    build();

    if (reduced) {
      return () => host.replaceChildren();
    }

    let lastX: number | null = null;
    const onPointerMove = (event: PointerEvent) => {
      const x = event.clientX - rect.left;
      pointer.x = x;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
      if (lastX !== null) sweep += x - lastX;
      lastX = x;
    };
    const onPointerOut = (event: PointerEvent) => {
      if (event.relatedTarget) return;
      pointer.active = false;
      lastX = null;
    };
    const syncRect = () => {
      rect = host.getBoundingClientRect();
      lastX = null;
    };

    const resizeObserver = new ResizeObserver(build);
    resizeObserver.observe(host);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerout', onPointerOut, { passive: true });
    window.addEventListener('scroll', syncRect, { passive: true });
    frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerout', onPointerOut);
      window.removeEventListener('scroll', syncRect);
      host.replaceChildren();
    };
  }, []);

  return <div ref={hostRef} className="curtain" aria-hidden="true" />;
}

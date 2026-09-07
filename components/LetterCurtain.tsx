'use client';

import { useEffect, useRef } from 'react';

const CHARSET = '01<>/{}[]#$%&*+-=:;.ETLSPARKFWIODNM';
const COL_WIDTH = 22;
const ROW_HEIGHT = 24;
const RADIUS = 130;
const PUSH = 34;
const SPRING = 0.11;
const DAMPING = 0.8;
const MAX_LETTERS = 700;

type Letter = {
  el: HTMLSpanElement;
  homeX: number;
  homeY: number;
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
    const pointer = { x: -9999, y: -9999 };
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
      for (const l of letters) {
        const dx = l.homeX + l.x - pointer.x;
        const dy = l.homeY + l.y - pointer.y;
        const distSq = dx * dx + dy * dy;
        const near = distSq < RADIUS * RADIUS;
        if (!near && !l.awake) continue;

        let fx = -SPRING * l.x;
        let fy = -SPRING * l.y;
        let glow = 0;

        if (near) {
          const dist = Math.sqrt(distSq) || 1;
          glow = 1 - dist / RADIUS;
          const force = glow * PUSH * SPRING * 2;
          fx += (dx / dist) * force;
          fy += (dy / dist) * force * 0.45;
        }

        l.vx = (l.vx + fx) * DAMPING;
        l.vy = (l.vy + fy) * DAMPING;
        l.x += l.vx;
        l.y += l.vy;

        const atRest =
          !near && Math.abs(l.x) < 0.08 && Math.abs(l.y) < 0.08 && Math.abs(l.vx) < 0.08 && Math.abs(l.vy) < 0.08;
        if (atRest) {
          l.x = l.y = l.vx = l.vy = 0;
          l.awake = false;
        } else {
          l.awake = true;
        }

        l.el.style.transform = `translate3d(${l.x.toFixed(2)}px, ${l.y.toFixed(2)}px, 0)`;
        l.el.style.opacity = (0.5 + glow * 0.5).toFixed(2);
      }
      frame = requestAnimationFrame(step);
    };

    build();

    if (reduced) {
      return () => host.replaceChildren();
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onPointerOut = (event: PointerEvent) => {
      if (event.relatedTarget) return;
      pointer.x = pointer.y = -9999;
    };
    const syncRect = () => {
      rect = host.getBoundingClientRect();
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

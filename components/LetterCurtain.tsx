'use client';

import { useEffect, useRef } from 'react';

// Verlet cloth, ported from the "Strings" pen by shubniggurath
// (https://codepen.io/shubniggurath/pen/ZYpjorm): a grid of characters with the
// top row pinned, stiff-ish vertical ropes and very loose horizontal spacers,
// so the columns hang and swing like a string curtain. The pointer pushes
// characters away from it; gravity and the constraints bring them back.
const CHARSET = '01<>/{}[]#$%&*+-=:;.ETLSPARKFWIODNM';
const COL_WIDTH = 22;
const ROW_HEIGHT = 24;
const MAX_PARTICLES = 700;

const GRAVITY = 0.18;
const DAMPING = 0.99;
const ITERATIONS = 5;
// Vertical links act like rope: free to collapse, barely able to stretch.
const V_COMPRESS = 0.02;
const V_STRETCH = 1.1;
// Horizontal links only stop columns from merging or drifting apart.
const H_COMPRESS = 0.6;
const H_STRETCH = 4;
const MOUSE_SIZE = 5000; // squared px, ~70px radius
const MOUSE_PUSH = 3.4; // px of displacement at the centre of a shove
const SLEEP_SPEED = 0.02;
const SLEEP_FRAMES = 40;

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

export default function LetterCurtain() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    host.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let cols = 0;
    let rows = 0;
    let count = 0;
    let x = new Float32Array(0);
    let y = new Float32Array(0);
    let oldX = new Float32Array(0);
    let oldY = new Float32Array(0);
    let accX = new Float32Array(0);
    let accY = new Float32Array(0);
    let glyph = new Uint8Array(0);

    // constraints, flattened: a/b are particle indices
    let ca = new Int32Array(0);
    let cb = new Int32Array(0);
    let cMin = new Float32Array(0);
    let cMax = new Float32Array(0);
    let cLen = new Float32Array(0);

    let atlas: HTMLCanvasElement[] = [];
    let glyphBox = 0;
    let frame = 0;
    let idleFrames = 0;
    let rect = host.getBoundingClientRect();

    const index = (col: number, row: number) => col * rows + row;

    const buildAtlas = () => {
      const color = window.getComputedStyle(host).color;
      const fontSize = 13;
      glyphBox = Math.ceil(fontSize * 1.6);
      atlas = [...CHARSET].map((char) => {
        const off = document.createElement('canvas');
        off.width = off.height = glyphBox * dpr;
        const octx = off.getContext('2d')!;
        octx.scale(dpr, dpr);
        octx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        octx.textAlign = 'center';
        octx.textBaseline = 'middle';
        octx.fillStyle = color;
        octx.fillText(char, glyphBox / 2, glyphBox / 2);
        return off;
      });
    };

    const build = () => {
      rect = host.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      cols = Math.max(2, Math.ceil(width / COL_WIDTH) + 1);
      rows = Math.max(2, Math.min(Math.ceil(height / ROW_HEIGHT), Math.floor(MAX_PARTICLES / cols)));
      count = cols * rows;

      const cellWidth = width / (cols - 1);
      const cellHeight = height / (rows - 1);

      x = new Float32Array(count);
      y = new Float32Array(count);
      oldX = new Float32Array(count);
      oldY = new Float32Array(count);
      accX = new Float32Array(count);
      accY = new Float32Array(count);
      glyph = new Uint8Array(count);

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const i = index(c, r);
          x[i] = oldX[i] = c * cellWidth;
          y[i] = oldY[i] = r * cellHeight;
          glyph[i] = Math.floor(Math.random() * CHARSET.length);
        }
      }

      const links = cols * (rows - 1) + (cols - 1) * rows;
      ca = new Int32Array(links);
      cb = new Int32Array(links);
      cMin = new Float32Array(links);
      cMax = new Float32Array(links);
      cLen = new Float32Array(links);

      let n = 0;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          if (r < rows - 1) {
            ca[n] = index(c, r);
            cb[n] = index(c, r + 1);
            cLen[n] = cellHeight;
            cMin[n] = cellHeight * V_COMPRESS;
            cMax[n] = cellHeight * V_STRETCH;
            n++;
          }
          if (c < cols - 1) {
            ca[n] = index(c, r);
            cb[n] = index(c + 1, r);
            cLen[n] = cellWidth;
            cMin[n] = cellWidth * H_COMPRESS;
            cMax[n] = cellWidth * H_STRETCH;
            n++;
          }
        }
      }
    };

    const draw = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const half = glyphBox / 2;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const i = index(c, r);
          let cos = 1;
          let sin = 0;
          if (r < rows - 1) {
            const b = index(c, r + 1);
            // Glyphs tilt along their own strand, which is what sells the swing.
            const angle = Math.atan2(y[b] - y[i], x[b] - x[i]) - Math.PI / 2;
            cos = Math.cos(angle);
            sin = Math.sin(angle);
          }
          ctx.setTransform(dpr * cos, dpr * sin, -dpr * sin, dpr * cos, dpr * x[i], dpr * y[i]);
          ctx.drawImage(atlas[glyph[i]], -half, -half, glyphBox, glyphBox);
        }
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    const step = () => {
      let fastest = 0;

      for (let i = 0; i < count; i++) {
        if (i % rows === 0) {
          // top row is pinned to the rail
          accX[i] = accY[i] = 0;
          continue;
        }
        const vx = (x[i] - oldX[i]) * DAMPING;
        const vy = (y[i] - oldY[i]) * DAMPING;
        oldX[i] = x[i];
        oldY[i] = y[i];
        x[i] += vx + accX[i];
        y[i] += vy + accY[i] + GRAVITY;
        accX[i] = accY[i] = 0;
        const speed = Math.abs(vx) + Math.abs(vy);
        if (speed > fastest) fastest = speed;
      }

      for (let pass = 0; pass < ITERATIONS; pass++) {
        for (let k = 0; k < ca.length; k++) {
          const a = ca[k];
          const b = cb[k];
          const dx = x[b] - x[a];
          const dy = y[b] - y[a];
          const distance = Math.hypot(dx, dy);
          if (distance === 0) continue;

          let target = cLen[k];
          if (distance < cMin[k]) target = cMin[k];
          else if (distance > cMax[k]) target = cMax[k];
          else continue;

          const percent = (target - distance) / distance / 2;
          const offsetX = dx * percent;
          const offsetY = dy * percent;

          if (a % rows !== 0) {
            x[a] -= offsetX;
            y[a] -= offsetY;
          }
          if (b % rows !== 0) {
            x[b] += offsetX;
            y[b] += offsetY;
          }
        }
      }

      draw();

      idleFrames = fastest < SLEEP_SPEED ? idleFrames + 1 : 0;
      if (idleFrames > SLEEP_FRAMES) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(step);
    };

    const wake = () => {
      idleFrames = 0;
      if (!frame) frame = requestAnimationFrame(step);
    };

    buildAtlas();
    build();
    draw();

    if (reduced) {
      return () => {
        canvas.remove();
      };
    }

    const onPointerMove = (event: PointerEvent) => {
      const px = event.clientX - rect.left;
      const py = event.clientY - rect.top;
      if (px < -80 || py < -80 || px > rect.width + 80 || py > rect.height + 80) return;

      let touched = false;
      for (let i = 0; i < count; i++) {
        if (i % rows === 0) continue;
        const dx = x[i] - px;
        const dy = y[i] - py;
        const distSq = dx * dx + dy * dy;
        if (distSq > MOUSE_SIZE) continue;

        const distance = Math.sqrt(distSq) || 1;
        const push = smoothstep(MOUSE_SIZE, -2000, distSq) * MOUSE_PUSH;
        accX[i] += (dx / distance) * push;
        accY[i] += (dy / distance) * push;
        touched = true;
      }
      if (touched) wake();
    };

    const syncRect = () => {
      rect = host.getBoundingClientRect();
    };

    const resizeObserver = new ResizeObserver(() => {
      build();
      wake();
    });
    resizeObserver.observe(host);

    // The glyph atlas is baked with the current text color, so it has to be
    // redrawn whenever the theme class flips.
    const themeObserver = new MutationObserver(() => {
      buildAtlas();
      wake();
      if (!frame) draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', syncRect, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', syncRect);
      canvas.remove();
    };
  }, []);

  return <div ref={hostRef} className="curtain" aria-hidden="true" />;
}

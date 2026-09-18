'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocale } from '@/lib/i18n-context';
import { CloseIcon, ZoomInIcon, ZoomOutIcon } from '@/lib/icons';

const MIN_SCALE = 1;
const MAX_SCALE = 6;
/** How much one button press, one key press or one notch of the wheel moves. */
const STEP = 1.4;

type Point = { x: number; y: number };
/** The image's transform: scale about the centre, then a translation in pixels. */
type View = { scale: number; x: number; y: number };

const RESET: View = { scale: MIN_SCALE, x: 0, y: 0 };

/**
 * A full-screen view of one screenshot, with zoom.
 *
 * The maths is all done against measurements taken once per layout (the image's
 * unscaled box and the stage around it), never by reading the DOM mid-gesture:
 * a pointer can move several times between two renders, so every update has to
 * be a pure function of the previous view.
 */
export default function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const { t } = useLocale();
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [view, setView] = useState<View>(RESET);

  /** Unscaled layout sizes, refreshed when the image loads and on resize. */
  const bounds = useRef({ image: { x: 0, y: 0 }, stage: { x: 0, y: 0 } });

  const measure = useCallback(() => {
    const image = imageRef.current;
    const stage = stageRef.current;
    if (!image || !stage) return;
    bounds.current = {
      image: { x: image.offsetWidth, y: image.offsetHeight },
      stage: { x: stage.clientWidth, y: stage.clientHeight },
    };
  }, []);

  /** Set once, when the image first reports a size. */
  const framed = useRef(false);

  /**
   * A wide screenshot inside a portrait phone fits the width and then occupies
   * a strip an inch tall, which is not worth opening. In that case the viewer
   * opens at the scale that fills the screen, scrolled to the left edge where
   * the reading starts; zooming out brings the whole image back.
   */
  const frame = useCallback(() => {
    measure();
    if (framed.current) return;
    const { image, stage } = bounds.current;
    if (!image.x || !image.y || !stage.y) return;
    framed.current = true;
    const fill = Math.min(MAX_SCALE, (stage.y * 0.96) / image.y);
    if (fill < 1.5) return;
    setView({ scale: fill, x: Math.max(0, (image.x * fill - stage.x) / 2), y: 0 });
  }, [measure]);

  useEffect(() => {
    frame();
    // A rotated phone is a different frame: the fit is worked out again.
    const onResize = () => {
      framed.current = false;
      setView(RESET);
      frame();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [frame]);

  /** Nothing can be dragged further than the overflow the zoom created. */
  const settle = useCallback((next: View): View => {
    const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next.scale));
    if (scale === MIN_SCALE) return RESET;
    const { image, stage } = bounds.current;
    const limitX = Math.max(0, (image.x * scale - stage.x) / 2);
    const limitY = Math.max(0, (image.y * scale - stage.y) / 2);
    return {
      scale,
      x: Math.min(limitX, Math.max(-limitX, next.x)),
      y: Math.min(limitY, Math.max(-limitY, next.y)),
    };
  }, []);

  /**
   * @param focus a point in client coordinates that must stay put — the cursor
   * under the wheel, or the middle of a pinch. Without it the zoom is centred.
   */
  const zoomTo = useCallback(
    (wanted: number, focus?: Point) => {
      setView((current) => {
        const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, wanted));
        const stage = stageRef.current;
        if (!focus || !stage) return settle({ ...current, scale });
        const box = stage.getBoundingClientRect();
        // Everything is measured from the stage's centre, which is where the
        // transform's origin sits. Holding the focus point still means
        // offset' = f - (scale' / scale) * (f - offset).
        const f = { x: focus.x - box.left - box.width / 2, y: focus.y - box.top - box.height / 2 };
        const ratio = scale / current.scale;
        return settle({ scale, x: f.x - ratio * (f.x - current.x), y: f.y - ratio * (f.y - current.y) });
      });
    },
    [settle],
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      else if (event.key === '+' || event.key === '=') setView((v) => settle({ ...v, scale: v.scale * STEP }));
      else if (event.key === '-' || event.key === '_') setView((v) => settle({ ...v, scale: v.scale / STEP }));
      else if (event.key === '0') setView(RESET);
      else return;
      event.preventDefault();
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, settle]);

  // Registered by hand because React's onWheel is passive: the page behind
  // would scroll while the image zoomed.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      setView((v) => {
        const wanted = v.scale * (event.deltaY < 0 ? STEP : 1 / STEP);
        const box = stage.getBoundingClientRect();
        const f = { x: event.clientX - box.left - box.width / 2, y: event.clientY - box.top - box.height / 2 };
        const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, wanted));
        const ratio = scale / v.scale;
        return settle({ scale, x: f.x - ratio * (f.x - v.x), y: f.y - ratio * (f.y - v.y) });
      });
    };
    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => stage.removeEventListener('wheel', onWheel);
  }, [settle]);

  // Pointers currently down: one is a drag, two are a pinch.
  const pointers = useRef(new Map<number, Point>());
  const dragFrom = useRef<{ pointer: Point; view: View } | null>(null);
  const pinchFrom = useRef<{ distance: number; scale: number } | null>(null);

  const spread = () => {
    const [a, b] = [...pointers.current.values()];
    return { distance: Math.hypot(a.x - b.x, a.y - b.y), middle: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } };
  };

  const onPointerDown = (event: React.PointerEvent<HTMLImageElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 2) {
      dragFrom.current = null;
      pinchFrom.current = { distance: spread().distance, scale: view.scale };
    } else {
      dragFrom.current = { pointer: { x: event.clientX, y: event.clientY }, view };
    }
  };

  const onPointerMove = (event: React.PointerEvent<HTMLImageElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.current.size === 2 && pinchFrom.current) {
      const { distance, middle } = spread();
      zoomTo((pinchFrom.current.scale * distance) / pinchFrom.current.distance, middle);
      return;
    }

    const from = dragFrom.current;
    if (!from || from.view.scale === MIN_SCALE) return;
    setView((v) =>
      settle({ ...v, x: from.view.x + event.clientX - from.pointer.x, y: from.view.y + event.clientY - from.pointer.y }),
    );
  };

  const onPointerUp = (event: React.PointerEvent<HTMLImageElement>) => {
    pointers.current.delete(event.pointerId);
    if (pointers.current.size < 2) pinchFrom.current = null;
    if (pointers.current.size === 0) dragFrom.current = null;
  };

  const zoomed = view.scale > MIN_SCALE;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-sm"
    >
      <div className="flex shrink-0 items-center justify-end gap-2 px-4 py-3">
        <button
          type="button"
          onClick={() => setView((v) => settle({ ...v, scale: v.scale / STEP }))}
          disabled={!zoomed}
          aria-label={t.viewer.zoomOut}
          title={t.viewer.zoomOut}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ZoomOutIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setView(RESET)}
          disabled={!zoomed}
          aria-label={t.viewer.reset}
          title={t.viewer.reset}
          className="min-w-[4rem] rounded-full border border-white/20 px-3 py-1.5 font-mono text-xs text-white transition-colors hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          {Math.round(view.scale * 100)}%
        </button>
        <button
          type="button"
          onClick={() => setView((v) => settle({ ...v, scale: v.scale * STEP }))}
          disabled={view.scale >= MAX_SCALE}
          aria-label={t.viewer.zoomIn}
          title={t.viewer.zoomIn}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ZoomInIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label={t.viewer.close}
          title={t.viewer.close}
          className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Clicking the backdrop closes; clicking the image itself does not, so
          the check is for the stage as the direct target. */}
      <div
        ref={stageRef}
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
        className="flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 pb-4"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          onLoad={frame}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onDoubleClick={(event) => (zoomed ? setView(RESET) : zoomTo(2.5, { x: event.clientX, y: event.clientY }))}
          draggable={false}
          // touch-none: the browser's own pan and pinch would fight the ones
          // below. The transform is applied without a transition so a drag
          // tracks the finger instead of lagging behind it.
          className={`max-h-full max-w-full touch-none select-none rounded-card ${
            zoomed ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
          }`}
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}
        />
      </div>

      <p className="shrink-0 px-4 pb-4 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-white/60">
        {alt}
      </p>
    </div>
  );
}

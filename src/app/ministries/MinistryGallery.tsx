'use client';

import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export type GalleryPhoto = { url: string; caption: string | null };

export default function MinistryGallery({
  photos,
  accent,
  accentBg,
}: {
  photos: GalleryPhoto[];
  accent: string;
  accentBg: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active, close, step]);

  const current = active === null ? null : photos[active];

  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 sm:pb-20">
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center gap-3">
          <span className={`h-0.5 w-8 ${accentBg}`} />
          <span className={`text-xs font-bold uppercase tracking-widest ${accent}`}>Gallery</span>
          <span className={`h-0.5 w-8 ${accentBg}`} />
        </div>
        <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-slate-900">Moments Together</h2>
      </div>

      {photos.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {photos.map((p, i) => (
            <button
              key={p.url}
              type="button"
              onClick={() => setActive(i)}
              aria-label={p.caption ? `Open photo: ${p.caption}` : `Open photo ${i + 1}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white bg-slate-200 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <img
                src={`${p.url}?w=700&auto=format`}
                alt={p.caption ?? ''}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              {p.caption && (
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
                  {p.caption}
                </span>
              )}
            </button>
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-stone-300 bg-white/70 px-6 py-10 text-center text-sm text-stone-500">
          Photos from this ministry will appear here.
        </p>
      )}

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/10 p-2.5 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <X className="h-5 w-5" />
          </button>
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); step(-1); }}
                aria-label="Previous photo"
                className="absolute left-3 rounded-full border border-white/15 bg-white/10 p-2.5 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); step(1); }}
                aria-label="Next photo"
                className="absolute right-3 rounded-full border border-white/15 bg-white/10 p-2.5 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          <figure className="max-h-full max-w-5xl text-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={`${current.url}?w=1600&auto=format`}
              alt={current.caption ?? ''}
              className="max-h-[80vh] w-auto rounded-2xl border border-white/10 object-contain shadow-2xl"
            />
            {current.caption && (
              <figcaption className="mt-3 text-sm text-stone-300">{current.caption}</figcaption>
            )}
          </figure>
        </div>
      )}
    </section>
  );
}

'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import type { GalleryItem } from '@/src/sanity/queries';

const formatDate = (date: string) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-GH', { dateStyle: 'medium' }).format(new Date(`${date}T00:00:00`));
};

export default function GalleryView({ items }: { items: GalleryItem[] }) {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(items.map((item) => item.category).filter(Boolean))).sort()],
    [items],
  );
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const filteredImages = useMemo(
    () =>
      activeCategory === 'All' ? items : items.filter((item) => item.category === activeCategory),
    [activeCategory, items],
  );

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredImages.length) % filteredImages.length,
    );
  }, [filteredImages.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredImages.length,
    );
  }, [filteredImages.length]);

  const isLightboxOpen = lightboxIndex !== null;

  useEffect(() => {
    if (!isLightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
      if (e.key === 'Tab') {
        const focusable = lightboxRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled])',
        );
        if (!focusable?.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    closeButtonRef.current?.focus();
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
      if (triggerRef.current?.isConnected) triggerRef.current.focus();
    };
  }, [isLightboxOpen, closeLightbox, goPrev, goNext]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: items.length };
    for (const cat of categories) {
      if (cat === 'All') continue;
      map[cat] = items.filter((item) => item.category === cat).length;
    }
    return map;
  }, [categories, items]);

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <section className="relative flex min-h-[370px] w-full items-center justify-center overflow-hidden bg-[#0f172a] px-5 py-16 text-white sm:min-h-[410px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.22),transparent_52%),radial-gradient(ellipse_at_8%_100%,rgba(15,23,42,0.6),transparent_48%)]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/40 via-[#0f172a]/20 to-[#0f172a]" />
        <div aria-hidden="true" className="absolute -left-28 -top-44 h-[28rem] w-[28rem] rounded-full border border-white/[0.07]" />
        <div aria-hidden="true" className="absolute -left-12 -top-32 h-[22rem] w-[22rem] rounded-full border border-blue-400/[0.14]" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]} />
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Gallery
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Moments of worship, fellowship, and service across the La Area - a visual journey of faith in action.
          </p>
        </div>
      </section>

      <section className="sticky top-[64px] z-30 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-4 md:px-8">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#0f172a] text-white shadow-sm dark:bg-blue-600'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-[#0f172a] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  {counts[cat]}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {filteredImages.map((img, index) => (
            <button
              key={img.id}
              type="button"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setLightboxIndex(index);
              }}
              aria-label={`View image: ${img.title}`}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-[0_12px_36px_-20px_rgba(15,23,42,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-900"
            >
              <Image
                src={img.image.url}
                alt={img.image.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                placeholder={img.image.lqip ? 'blur' : 'empty'}
                blurDataURL={img.image.lqip ?? undefined}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-[#0f172a]/10 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
              <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                {img.category}
              </span>
              <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                <ZoomIn className="h-4 w-4" />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                <p className="translate-y-2 text-xs font-medium leading-snug text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {img.title}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-white/65">{formatDate(img.date)}</p>
              </div>
            </button>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <p className="py-20 text-center text-sm text-slate-500 dark:text-slate-400">No photos in this category yet.</p>
        )}
      </section>

      <section className="relative overflow-hidden border-t border-slate-800 bg-[#0f172a] px-4 py-14 text-center text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.22),transparent_65%)]"
        />
        <div className="relative mx-auto max-w-2xl space-y-5">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Experience It in Person
          </h2>
          <p className="text-sm leading-relaxed text-slate-300">
            Photos capture a moment, but there&apos;s nothing like being part of the family. Come worship with us this Sunday.
          </p>
          <Link
            href="/assemblies"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-7 py-3 text-xs font-bold text-slate-950 shadow-[0_12px_36px_-12px_rgba(245,158,11,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-400"
          >
            <span>Find a Local Assembly</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {lightboxIndex !== null && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-md"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close viewer"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div
            className="relative mx-auto max-h-[85vh] max-w-5xl px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filteredImages[lightboxIndex].image.url}
              alt={filteredImages[lightboxIndex].image.alt}
              width={1200}
              height={800}
              className="mx-auto max-h-[78vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <div className="mt-4 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/80">
                {filteredImages[lightboxIndex].category}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                {filteredImages[lightboxIndex].title}
              </p>
              <p className="mt-1 text-xs text-slate-400">{formatDate(filteredImages[lightboxIndex].date)}</p>
              <p className="mt-1 text-xs text-slate-400">
                {lightboxIndex + 1} of {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

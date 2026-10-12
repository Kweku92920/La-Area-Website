'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

type GalleryImage = {
  src: string;
  alt: string;
  category: string;
  span?: 'tall' | 'wide' | 'normal';
};

const CATEGORIES = ['All', 'Worship', 'Fellowship', 'Choir', 'Youth', 'Outreach'] as const;
type Category = (typeof CATEGORIES)[number];

const IMAGES: GalleryImage[] = [
  // Worship
  { src: 'https://images.pexels.com/photos/29422232/pexels-photo-29422232.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Congregation in worship during a Sunday service', category: 'Worship', span: 'wide' },
  { src: 'https://images.pexels.com/photos/34504327/pexels-photo-34504327.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Hands raised in praise during worship', category: 'Worship', span: 'tall' },
  { src: 'https://images.pexels.com/photos/34328505/pexels-photo-34328505.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Lively worship service with stage lighting', category: 'Worship', span: 'wide' },
  { src: 'https://images.pexels.com/photos/13899687/pexels-photo-13899687.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Congregation standing in prayer together', category: 'Worship', span: 'tall' },
  { src: 'https://images.pexels.com/photos/12618113/pexels-photo-12618113.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Sunlit church interior filled with worshippers', category: 'Worship', span: 'tall' },
  { src: 'https://images.pexels.com/photos/34623696/pexels-photo-34623696.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Church congregation participating in worship', category: 'Worship', span: 'normal' },

  // Fellowship
  { src: 'https://images.pexels.com/photos/29422233/pexels-photo-29422233.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Congregation seated with choir and instruments', category: 'Fellowship', span: 'wide' },
  { src: 'https://images.pexels.com/photos/35555142/pexels-photo-35555142.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Couple sharing a heartfelt moment at church', category: 'Fellowship', span: 'normal' },
  { src: 'https://images.pexels.com/photos/34328517/pexels-photo-34328517.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Hands raised in vibrant worship under stage lights', category: 'Fellowship', span: 'wide' },
  { src: 'https://images.pexels.com/photos/10823376/pexels-photo-10823376.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Large congregation gathered in a wooden church interior', category: 'Fellowship', span: 'normal' },
  { src: 'https://images.pexels.com/photos/34680729/pexels-photo-34680729.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Senior woman singing during a church service', category: 'Fellowship', span: 'tall' },

  // Choir
  { src: 'https://images.pexels.com/photos/8815025/pexels-photo-8815025.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Choir singers in red robes clapping and singing', category: 'Choir', span: 'wide' },
  { src: 'https://images.pexels.com/photos/14990429/pexels-photo-14990429.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Choir singing passionately in harmony', category: 'Choir', span: 'normal' },
  { src: 'https://images.pexels.com/photos/8815017/pexels-photo-8815017.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Diverse choir singing during a church service', category: 'Choir', span: 'wide' },
  { src: 'https://images.pexels.com/photos/7567340/pexels-photo-7567340.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Conductor leading a choir in practice', category: 'Choir', span: 'tall' },

  // Youth
  { src: 'https://images.pexels.com/photos/21782665/pexels-photo-21782665.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Young man reading the Bible in a prayer group', category: 'Youth', span: 'wide' },
  { src: 'https://images.pexels.com/photos/8674206/pexels-photo-8674206.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Three people reading Bibles together at church', category: 'Youth', span: 'normal' },
  { src: 'https://images.pexels.com/photos/6860826/pexels-photo-6860826.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Bible study discussion group', category: 'Youth', span: 'wide' },
  { src: 'https://images.pexels.com/photos/6860380/pexels-photo-6860380.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Group praying and singing with guitar', category: 'Youth', span: 'normal' },
  { src: 'https://images.pexels.com/photos/23015910/pexels-photo-23015910.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Young adults gathered for a religious event', category: 'Youth', span: 'tall' },

  // Outreach
  { src: '/pemem-pic.jpg', alt: "Men's Ministry gathering — PEMEM", category: 'Outreach', span: 'normal' },
  { src: '/women-pic.jpg', alt: "Women's Ministry fellowship gathering", category: 'Outreach', span: 'normal' },
  { src: '/youth-pic.jpg', alt: 'Youth Ministry celebration', category: 'Outreach', span: 'normal' },
  { src: '/children-pic.jpg', alt: 'Children Ministry at the La Area', category: 'Outreach', span: 'normal' },
];

const spanClass: Record<NonNullable<GalleryImage['span']>, string> = {
  tall: 'row-span-2',
  wide: 'sm:col-span-2',
  normal: '',
};

export default function GalleryView() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = useMemo(
    () =>
      activeCategory === 'All'
        ? IMAGES
        : IMAGES.filter((img) => img.category === activeCategory),
    [activeCategory],
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

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: IMAGES.length };
    for (const cat of CATEGORIES) {
      if (cat === 'All') continue;
      map[cat] = IMAGES.filter((img) => img.category === cat).length;
    }
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* ---------- HERO ---------- */}
      <section className="relative isolate flex min-h-[440px] items-center justify-center overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center opacity-40"
            style={{ backgroundImage: "url('/theme.jpg')" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(245,158,11,0.12),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/45" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 text-center sm:py-28">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur-md">
            <Link href="/" className="transition hover:text-amber-300">Home</Link>
            <span aria-hidden="true" className="text-white/40">/</span>
            <span className="text-white">Gallery</span>
          </p>
          <h1 className="mb-5 font-serif text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl">
            Gallery
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-200/85 sm:text-lg">
            Moments of worship, fellowship, and service across the La Area — a visual journey of faith in action.
          </p>
        </div>
      </section>

      {/* ---------- FILTER BAR ---------- */}
      <section className="sticky top-[64px] z-30 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-4 md:px-8">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-[0_8px_24px_-10px_rgba(6,78,59,0.6)]'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-emerald-800'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {counts[cat]}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ---------- MASONRY GRID ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {filteredImages.map((img, index) => (
            <button
              key={`${img.src}-${index}`}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-[0_12px_36px_-20px_rgba(15,23,42,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)] ${spanClass[img.span ?? 'normal']}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />

              {/* Category badge */}
              <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                {img.category}
              </span>

              {/* Zoom icon */}
              <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                <ZoomIn className="h-4 w-4" />
              </span>

              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                <p className="translate-y-2 text-xs font-medium leading-snug text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {img.alt}
                </p>
              </div>
            </button>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <p className="py-20 text-center text-sm text-slate-500">No photos in this category yet.</p>
        )}
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative overflow-hidden border-t border-emerald-950/20 bg-emerald-900 px-4 py-14 text-center text-white">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,185,129,0.22),transparent_65%)]" />
        <div className="relative mx-auto max-w-2xl space-y-5">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-emerald-50 sm:text-3xl">
            Experience It in Person
          </h2>
          <p className="text-sm leading-relaxed text-emerald-100/80">
            Photos capture a moment, but there&apos;s nothing like being part of the family. Come worship with us this Sunday.
          </p>
          <Link
            href="/assemblies"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-600 px-7 py-3 text-xs font-bold text-white shadow-[0_12px_36px_-12px_rgba(217,119,6,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-700"
          >
            <span>Find a Local Assembly</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ---------- LIGHTBOX ---------- */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-md"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          {/* Close */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close viewer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Image */}
          <div
            className="relative mx-auto max-h-[85vh] max-w-5xl px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].alt}
              className="mx-auto max-h-[78vh] rounded-2xl object-contain shadow-2xl"
            />
            <div className="mt-4 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/80">
                {filteredImages[lightboxIndex].category}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                {filteredImages[lightboxIndex].alt}
              </p>
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

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Tag,
  Folder,
  Play,
  X,
  ExternalLink,
  Search,
} from 'lucide-react';

export type Sermon = {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  description: string;
  series: string;
  category: string;
  youtubeUrl: string;
  youtubeId: string;
  thumbnail: string;
};

const categories = ['All', 'Teaching', 'Worship', 'Faith', 'Youth'];

export default function SermonsView({ sermons }: { sermons: Sermon[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSermon, setActiveSermon] = useState<Sermon | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveSermon(null);
    };
    if (activeSermon) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [activeSermon]);

  const filteredSermons = sermons.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      s.title.toLowerCase().includes(q) ||
      s.speaker.toLowerCase().includes(q) ||
      s.series.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      }).toUpperCase();
    } catch { return dateStr; }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 font-sans">
      <section className="relative flex min-h-[370px] w-full items-center justify-center overflow-hidden bg-[#1C0D0D] px-5 py-16 text-white sm:min-h-[410px]">
        <div aria-hidden="true" className="absolute inset-0 opacity-35">
          <img src="https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1600&q=80" alt="" className="h-full w-full object-cover" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(184,134,11,0.3),transparent_54%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#1C0D0D]/75 via-[#1C0D0D]/65 to-[#1C0D0D]" />
        <div aria-hidden="true" className="absolute -right-24 -top-44 h-[28rem] w-[28rem] rounded-full border border-white/[0.08] sm:-right-10" />
        <div aria-hidden="true" className="absolute -right-12 -top-32 h-[22rem] w-[22rem] rounded-full border border-amber-200/[0.1]" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-200 backdrop-blur-md sm:text-xs">
            <Link href="/" className="transition hover:text-amber-300">Home</Link>
            <span aria-hidden="true" className="text-white/40">/</span>
            <span className="text-white">Sermons</span>
          </div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-amber-300 sm:text-xs">
            Messages · Worship · Teaching
          </p>
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Sermons &amp; Media</h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-stone-300 sm:text-base">
            Be encouraged and equipped by messages from our pastors and leaders.
          </p>
        </div>
      </section>

      {/* SECTION TITLE */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-8 text-center">
        <div className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-[#B8860B] mb-2">
          <span className="w-8 h-[1px] bg-[#B8860B]/40"></span>
          THE WORD
          <span className="w-8 h-[1px] bg-[#B8860B]/40"></span>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1C0D0D]">Sermon Library</h2>
      </section>

      {/* SEARCH + FILTERS */}
      <section className="max-w-7xl mx-auto px-6 pb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search sermons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full text-sm border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40"
            />
          </div>
          <div className="flex items-center justify-center flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition duration-150 ${
                    isActive
                      ? 'bg-[#8B2621] text-white shadow-sm'
                      : 'bg-[#F5EFEC] text-stone-700 hover:bg-stone-200/70 border border-stone-200/60'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERMON CARDS GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {filteredSermons.length === 0 ? (
          <div className="text-center py-20 text-stone-500">
            <p className="text-sm">No sermons found. Try a different search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSermons.map((sermon) => (
              <div
                key={sermon.id}
                role="button"
                tabIndex={0}
                aria-label={`Play sermon: ${sermon.title}`}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-[1.6rem] border border-white/80 bg-white/75 shadow-[0_18px_50px_-24px_rgba(50,35,28,0.24)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white hover:shadow-[0_24px_60px_-22px_rgba(50,35,28,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2621]/40 focus-visible:ring-offset-2"
                onClick={() => setActiveSermon(sermon)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setActiveSermon(sermon);
                  }
                }}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
                  <img
                    src={sermon.thumbnail}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#1C0D0D]/65 via-black/10 to-black/10 transition-colors duration-300 group-hover:from-[#1C0D0D]/75">
                    <div className="flex h-full items-center justify-center">
                      <span className="grid h-14 w-14 place-items-center rounded-full border border-white/30 bg-white/90 text-[#8B2621] shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                        <Play className="ml-0.5 h-6 w-6 fill-current" />
                      </span>
                    </div>
                  </div>
                  {sermon.duration && (
                    <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[10px] font-semibold text-white shadow-sm backdrop-blur-md">
                      {sermon.duration}
                    </span>
                  )}
                </div>
                <div className="flex flex-grow flex-col p-5 sm:p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#B8860B]/15 bg-[#B8860B]/[0.08] px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#795812]">
                      <Calendar aria-hidden="true" className="h-3.5 w-3.5 text-[#B8860B]" />
                      {formatDate(sermon.date)}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#8B2621]/10 bg-[#8B2621]/[0.06] px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#70221e]">
                      <Tag aria-hidden="true" className="h-3.5 w-3.5 text-[#8B2621]" />
                      {sermon.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold leading-snug tracking-tight text-[#1C0D0D]">
                    {sermon.title}
                  </h3>
                  <p className="mt-3 inline-flex max-w-full items-center gap-2 self-start rounded-full border border-[#8B2621]/10 bg-[#8B2621]/[0.06] px-3 py-2 text-xs font-medium text-[#70221e]">
                    <span className="truncate">{sermon.speaker}</span>
                  </p>
                  {sermon.description && (
                    <p className="mt-4 flex-grow text-sm leading-relaxed text-stone-600">
                      {sermon.description}
                    </p>
                  )}
                  {sermon.series && (
                    <div className="mt-5 flex items-center gap-2 border-t border-stone-200/70 pt-4 text-xs font-medium text-stone-600">
                      <Folder aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                      <span className="truncate">{sermon.series}</span>
                    </div>
                  )}
                  <div className="mt-5 inline-flex w-full items-center justify-between rounded-full border border-[#8B2621]/10 bg-[#8B2621]/[0.04] py-2 pl-4 pr-2 text-sm font-semibold text-[#70221e] transition-all duration-300 group-hover:border-[#8B2621]/20 group-hover:bg-[#8B2621] group-hover:text-white">
                    <span>Watch sermon</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#8B2621] shadow-sm transition-transform duration-300 group-hover:translate-x-0.5">
                      <Play aria-hidden="true" className="ml-0.5 h-3.5 w-3.5 fill-current" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* YOUTUBE MODAL PLAYER */}
      {activeSermon && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActiveSermon(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeSermon.youtubeId}?autoplay=1&rel=0`}
                title={activeSermon.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {/* Info */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[#8B2621] uppercase mb-2">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(activeSermon.date)}</span>
                    {activeSermon.duration && <span>· {activeSermon.duration}</span>}
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[#1C0D0D] leading-snug mb-1">{activeSermon.title}</h3>
                  <p className="text-xs font-medium text-stone-500 mb-3">{activeSermon.speaker}</p>
                  <p className="text-sm text-stone-600 leading-relaxed">{activeSermon.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSermon(null)}
                  className="flex-shrink-0 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-stone-600" />
                </button>
              </div>
              <a
                href={activeSermon.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-xs font-semibold text-[#8B2621] hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import {
  Calendar,
  Tag,
  Folder,
  Play,
  X,
  ExternalLink,
  Search,
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

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
    const matchesSearch =
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.speaker.toLowerCase().includes(q) ||
      s.series.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr)
        .toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
        .toUpperCase();
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <section className="relative flex min-h-[370px] w-full items-center justify-center overflow-hidden bg-[#0f172a] px-5 py-16 text-white sm:min-h-[410px]">
        <div aria-hidden="true" className="absolute inset-0 opacity-40">
          <img
            src="/theme.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.24),transparent_54%)]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/70 via-[#0f172a]/55 to-[#0f172a]" />
        <div aria-hidden="true" className="absolute -right-24 -top-44 h-[28rem] w-[28rem] rounded-full border border-white/[0.08] sm:-right-10" />
        <div aria-hidden="true" className="absolute -right-12 -top-32 h-[22rem] w-[22rem] rounded-full border border-blue-400/[0.14]" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Sermons' }]} />
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-yellow-300 sm:text-xs">
            Messages · Worship · Teaching
          </p>
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Sermons &amp; Media
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Be encouraged and equipped by messages from our pastors and leaders.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8 pt-16 text-center">
        <div className="mb-2 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-yellow-600 dark:text-yellow-400">
          <span className="h-[1px] w-8 bg-yellow-500/40" />
          THE WORD
          <span className="h-[1px] w-8 bg-yellow-500/40" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-slate-50 md:text-4xl">
          Sermon Library
        </h2>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search sermons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition duration-150 ${
                    isActive
                      ? 'bg-[#0f172a] text-white shadow-sm dark:bg-blue-600'
                      : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        {filteredSermons.length === 0 ? (
          <div className="py-20 text-center text-slate-500 dark:text-slate-400">
            <p className="text-sm">No sermons found. Try a different search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredSermons.map((sermon) => (
              <div
                key={sermon.id}
                role="button"
                tabIndex={0}
                aria-label={`Play sermon: ${sermon.title}`}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900"
                onClick={() => setActiveSermon(sermon)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setActiveSermon(sermon);
                  }
                }}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0f172a]">
                  <img
                    src={sermon.thumbnail}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-black/15 to-black/10 transition-colors duration-300 group-hover:from-[#0f172a]/80"
                  >
                    <div className="flex h-full items-center justify-center">
                      <span className="grid h-14 w-14 place-items-center rounded-full border border-white/30 bg-white/95 text-[#0f172a] shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                        <Play className="ml-0.5 h-6 w-6 fill-current" />
                      </span>
                    </div>
                  </div>
                  {sermon.duration && (
                    <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[10px] font-semibold text-white shadow-sm backdrop-blur-md">
                      {sermon.duration}
                    </span>
                  )}
                </div>
                <div className="flex flex-grow flex-col p-5 sm:p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar aria-hidden="true" className="h-3.5 w-3.5 text-yellow-600 dark:text-yellow-400" />
                      {formatDate(sermon.date)}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 text-[#0f172a] dark:text-blue-300">
                      <Tag aria-hidden="true" className="h-3 w-3" />
                      {sermon.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold leading-snug tracking-tight text-slate-900 dark:text-slate-50">
                    {sermon.title}
                  </h3>
                  <p className="mt-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                    {sermon.speaker}
                  </p>
                  {sermon.description && (
                    <p className="mt-4 flex-grow text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {sermon.description}
                    </p>
                  )}
                  {sermon.series && (
                    <div className="mt-5 flex items-center gap-2 border-t border-slate-200/70 pt-4 text-xs font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400">
                      <Folder aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">{sermon.series}</span>
                    </div>
                  )}
                  <div className="mt-5 inline-flex w-full items-center justify-between rounded-full border border-slate-200 bg-slate-50 py-2 pl-4 pr-2 text-sm font-semibold text-[#0f172a] transition-all duration-300 group-hover:border-[#0f172a] group-hover:bg-[#0f172a] group-hover:text-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:group-hover:bg-blue-600">
                    <span>Watch sermon</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#0f172a] shadow-sm transition-transform duration-300 group-hover:translate-x-0.5 dark:bg-slate-900 dark:text-blue-300">
                      <Play aria-hidden="true" className="ml-0.5 h-3.5 w-3.5 fill-current" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {activeSermon && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveSermon(null)}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeSermon.youtubeId}?autoplay=1&rel=0`}
                title={activeSermon.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-yellow-600 dark:text-yellow-400">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(activeSermon.date)}</span>
                    {activeSermon.duration && <span>· {activeSermon.duration}</span>}
                  </div>
                  <h3 className="mb-1 font-serif text-xl font-bold leading-snug text-slate-900 dark:text-white">
                    {activeSermon.title}
                  </h3>
                  <p className="mb-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {activeSermon.speaker}
                  </p>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {activeSermon.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSermon(null)}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 transition hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                  aria-label="Close"
                >
                  <X className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                </button>
              </div>
              <a
                href={activeSermon.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#0f172a] hover:underline dark:text-yellow-300"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

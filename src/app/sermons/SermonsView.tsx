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
      {/* HERO */}
      <section className="relative h-[360px] w-full flex items-center justify-center bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
          <img src="https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1600&q=80" alt="Open Bible on table" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C0D0D] via-black/50 to-[#1C0D0D]/70 z-0" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <div className="text-xs uppercase tracking-widest text-stone-300 mb-3 flex items-center justify-center gap-2 font-medium">
            <Link href="/" className="">Home</Link>
            <span>&rsaquo;</span>
            <span className="text-stone-100">Sermons</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">Sermons &amp; Media</h1>
          <p className="text-stone-300 text-sm md:text-base font-normal max-w-xl mx-auto leading-relaxed">
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
                className="bg-[#F6F2EC] rounded-2xl overflow-hidden border border-stone-200/70 hover:shadow-lg transition duration-200 flex flex-col group cursor-pointer"
                onClick={() => setActiveSermon(sermon)}
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-stone-300 relative">
                  <img src={sermon.thumbnail} alt={sermon.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-[#8B2621] fill-current ml-1" />
                    </div>
                  </div>
                  {sermon.duration && (
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-stone-800 text-[11px] font-medium px-2.5 py-0.5 rounded-full shadow-sm">
                      {sermon.duration}
                    </span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[#8B2621] uppercase mb-2">
                    <Calendar className="w-3 h-3 text-[#8B2621]" />
                    <span>{formatDate(sermon.date)}</span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[#1C0D0D] leading-snug mb-1">{sermon.title}</h3>
                  <p className="text-xs font-medium text-stone-500 mb-4">{sermon.speaker}</p>
                  <p className="text-xs text-stone-600 leading-relaxed mb-6 flex-grow">{sermon.description}</p>
                  <div className="flex items-center gap-4 text-[11px] text-stone-500 pt-3 border-t border-stone-200/60 font-medium">
                    {sermon.series && (
                      <span className="flex items-center gap-1.5">
                        <Folder className="w-3 h-3 text-stone-400" />
                        {sermon.series}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3 h-3 text-stone-400" />
                      {sermon.category}
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

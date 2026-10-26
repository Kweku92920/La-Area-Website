'use client';

import {useMemo, useState} from 'react';
import {Search, X} from 'lucide-react';
import type {NewsItem} from '@/src/sanity/queries';
import NewsCard from './NewsCard';

export default function NewsDirectory({articles}: {articles: NewsItem[]}) {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const categories = useMemo(() => ['All', ...Array.from(new Set(articles.map((article) => article.category))).sort()], [articles]);
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory = category === 'All' || article.category === category;
      const matchesSearch = !query || [article.title, article.excerpt, article.category].some((value) => value.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [articles, category, search]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-20">
      <div className="mb-10 flex flex-col gap-5 rounded-[1.6rem] border border-stone-200/80 bg-white p-4 shadow-[0_18px_45px_-30px_rgba(50,35,28,0.3)] backdrop-blur-md md:flex-row md:items-center md:justify-between md:p-5">
        <label className="relative w-full md:max-w-sm">
          <span className="sr-only">Search news</span>
          <Search aria-hidden="true" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search news..." className="w-full rounded-full border border-stone-200 bg-stone-50 py-3 pl-11 pr-11 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#8B2621]/40 focus:bg-white focus:ring-2 focus:ring-[#8B2621]/10" />
          {search && <button type="button" onClick={() => setSearch('')} aria-label="Clear news search" className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-stone-400 transition hover:bg-stone-200 hover:text-[#8B2621]"><X aria-hidden="true" className="h-4 w-4" /></button>}
        </label>
        <div className="flex flex-wrap gap-2" aria-label="Filter news by category">
          {categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${category === item ? 'border-[#8B2621] bg-[#8B2621] text-white' : 'border-stone-200 bg-white text-stone-600 hover:border-[#8B2621]/40 hover:text-[#8B2621]'}`}>{item}</button>)}
        </div>
      </div>
      <p className="mb-6 text-xs font-medium uppercase tracking-[0.16em] text-stone-500">{filtered.length} {filtered.length === 1 ? 'story' : 'stories'}</p>
      {filtered.length > 0 ? <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{filtered.map((article) => <NewsCard key={article.id} article={article} />)}</div> : <div className="rounded-2xl border border-dashed border-stone-300 bg-white/70 px-6 py-16 text-center text-sm text-stone-500">No stories match your search.</div>}
    </section>
  );
}

'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import type { NewsItem } from '@/src/sanity/queries';
import NewsCard from './NewsCard';

export default function NewsDirectory({ articles }: { articles: NewsItem[] }) {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(articles.map((article) => article.category))).sort()],
    [articles]
  );
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory = category === 'All' || article.category === category;
      const matchesSearch =
        !query ||
        [article.title, article.excerpt, article.category].some((value) =>
          value.toLowerCase().includes(query)
        );
      return matchesCategory && matchesSearch;
    });
  }, [articles, category, search]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-20">
      <div className="mb-10 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between md:p-5">
        <label className="relative w-full md:max-w-sm">
          <span className="sr-only">Search news</span>
          <Search aria-hidden="true" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search news..."
            className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-11 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/15 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              aria-label="Clear news search"
              className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-slate-400 transition hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          )}
        </label>
        <div className="flex flex-wrap gap-2" aria-label="Filter news by category">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                category === item
                  ? 'border-[#173262] bg-[#173262] text-white dark:border-blue-500 dark:bg-blue-600'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-[#173262] dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <p className="mb-6 text-xs font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
        {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
      </p>
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          No stories match your search.
        </div>
      )}
    </section>
  );
}

import Link from 'next/link';
import {ArrowRight, CalendarDays, Newspaper} from 'lucide-react';
import type {NewsItem} from '@/src/sanity/queries';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

export default function NewsPreview({articles}: {articles: NewsItem[]}) {
  return (
    <section id="news" className="bg-[#F7F4EE] px-6 py-20 text-[#1A2E26] md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#0F4C3A]">
              <Newspaper aria-hidden="true" className="h-4 w-4" /> Recent news
            </p>
            <h2 className="font-heading text-4xl tracking-tight text-[#1A2E26] sm:text-5xl">What&apos;s happening in La Area</h2>
            <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-[#4A5568]">Stay close to the stories, milestones, and moments shaping our church family.</p>
          </div>
          <Link href="/news" className="inline-flex items-center gap-2 self-start rounded-full border border-[#0F4C3A]/25 bg-white/40 px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#0F4C3A] transition hover:border-[#0F4C3A] hover:bg-[#0F4C3A] hover:text-white md:self-auto">
            View all news <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 rounded-2xl border border-[#DCD6C9] bg-[#F1ECE1]/60 sm:grid-cols-2 lg:grid-cols-4">
            {articles.map((article, index) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className={`group flex min-h-[230px] flex-col p-6 transition hover:bg-white/60 ${index < articles.length - 1 ? 'border-b border-[#DCD6C9] lg:border-b-0 lg:border-r' : ''}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#0F4C3A] px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                    {article.category || 'Church life'}
                  </span>
                  <span className="font-sans text-[11px] text-[#4A5568]">{formatDate(article.publishedAt)}</span>
                </div>
                <h3 className="mt-7 font-heading text-xl font-bold uppercase leading-tight text-[#1A2E26] transition group-hover:text-[#0F4C3A]">
                  {article.title}
                </h3>
                {article.excerpt ? <p className="mt-3 line-clamp-3 font-sans text-sm leading-relaxed text-[#4A5568]">{article.excerpt}</p> : null}
                <span className="mt-auto inline-flex items-center gap-2 pt-6 font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#B8860B]">
                  <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" /> Read story <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#DCD6C9] bg-[#F1ECE1]/60 px-6 py-12 text-center font-sans text-sm text-[#4A5568]">News stories will appear here once they are published.</div>
        )}
      </div>
    </section>
  );
}

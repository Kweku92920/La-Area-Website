import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { NewsItem } from '@/src/sanity/queries';
import SanityImage from '../components/SanityImage';

function formatLongDate(value: string) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export default function NewsCard({ article, compact = false }: { article: NewsItem; compact?: boolean }) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 ${
        compact ? 'sm:flex-row' : ''
      }`}
    >
      <Link
        href={`/news/${article.slug}`}
        className={`relative block overflow-hidden bg-[#173262] ${
          compact ? 'aspect-[16/10] sm:w-2/5 sm:shrink-0' : 'aspect-[16/10]'
        }`}
      >
        {article.featuredImage ? (
          <SanityImage
            image={article.featuredImage}
            altFallback={article.title}
            sizes={compact ? '(min-width: 640px) 240px, 100vw' : '(min-width: 1024px) 33vw, 100vw'}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden="true"
            className="h-full w-full bg-[radial-gradient(circle_at_25%_20%,rgba(59,130,246,0.28),transparent_38%),linear-gradient(135deg,#173262,#1e3f7a)]"
          />
        )}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#173262]/60 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-md bg-[#173262]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm backdrop-blur-md">
          {article.category}
        </span>
      </Link>
      <div className={`flex flex-1 flex-col p-6 ${compact ? 'sm:justify-center' : ''}`}>
        <time dateTime={article.publishedAt} className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {formatLongDate(article.publishedAt)}
        </time>
        <h3
          className={`${
            compact ? 'text-lg' : 'text-xl'
          } mt-2.5 font-serif font-extrabold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-[#0f172a] dark:text-slate-50 dark:group-hover:text-yellow-300`}
        >
          <Link href={`/news/${article.slug}`}>{article.title}</Link>
        </h3>
        {article.excerpt && (
          <p className="mt-3 line-clamp-3 font-serif text-sm font-bold leading-snug text-slate-900 dark:text-slate-100">
            {article.excerpt}
          </p>
        )}
        <div className="mt-auto pt-6">
          <Link
            href={`/news/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0f172a] transition-colors hover:text-yellow-600 dark:text-slate-200 dark:hover:text-yellow-400"
          >
            <span>Full Story</span>
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}

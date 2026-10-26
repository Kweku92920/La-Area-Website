import Link from 'next/link';
import {ArrowUpRight, CalendarDays} from 'lucide-react';
import type {NewsItem} from '@/src/sanity/queries';
import {formatDate} from '@/src/sanity/format';
import SanityImage from '../components/SanityImage';

export default function NewsCard({article, compact = false}: {article: NewsItem; compact?: boolean}) {
  return (
    <article className={`group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-white/80 bg-white/75 shadow-[0_18px_50px_-24px_rgba(50,35,28,0.24)] backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:border-white hover:shadow-[0_24px_60px_-22px_rgba(50,35,28,0.3)] ${compact ? 'sm:flex-row' : ''}`}>
      <Link href={`/news/${article.slug}`} className={`relative block overflow-hidden bg-slate-900 ${compact ? 'aspect-[16/10] sm:w-2/5 sm:shrink-0' : 'aspect-[16/10]'}`}>
        {article.featuredImage ? (
          <SanityImage
            image={article.featuredImage}
            altFallback={article.title}
            sizes={compact ? '(min-width: 640px) 240px, 100vw' : '(min-width: 1024px) 33vw, 100vw'}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div aria-hidden="true" className="h-full w-full bg-[radial-gradient(circle_at_25%_20%,rgba(245,158,11,0.35),transparent_34%),linear-gradient(135deg,#183d35,#0b1720)]" />
        )}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#8B2621]/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
          {article.category}
        </span>
      </Link>
      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${compact ? 'sm:justify-center' : ''}`}>
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-500">
          <CalendarDays aria-hidden="true" className="h-3.5 w-3.5 text-[#B8860B]" />
          {formatDate(article.publishedAt)}
        </div>
        <h3 className={`${compact ? 'text-xl' : 'text-2xl'} mt-3 font-serif font-semibold leading-tight tracking-tight text-[#1C0D0D]`}>
          <Link href={`/news/${article.slug}`} className="transition-colors hover:text-[#8B2621]">
            {article.title}
          </Link>
        </h3>
        {article.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-stone-600">{article.excerpt}</p>}
        <Link href={`/news/${article.slug}`} className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#8B2621] transition-colors hover:text-[#5f1714]">
          Read story <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}

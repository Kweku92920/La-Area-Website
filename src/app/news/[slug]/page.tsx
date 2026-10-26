import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ArrowLeft, CalendarDays} from 'lucide-react';
import Link from 'next/link';
import {sanityFetch} from '@/src/sanity/fetch';
import {formatDate} from '@/src/sanity/format';
import {newsBySlugQuery, newsSlugsQuery, type NewsItem} from '@/src/sanity/queries';
import Breadcrumb from '../../components/Breadcrumb';
import RichText from '../../components/RichText';
import SanityImage from '../../components/SanityImage';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const slugs = await sanityFetch<{slug: string}[]>(newsSlugsQuery, {}, {revalidate: false, documentType: 'newsItem'});
  return slugs.map(({slug}) => ({slug}));
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const article = await sanityFetch<NewsItem | null>(newsBySlugQuery, {slug}, {revalidate: false, documentType: 'newsItem'});
  return article ? {title: `${article.title} - LA Area News`, description: article.excerpt || 'News from The Church of Pentecost LA Area'} : {title: 'News story not found'};
}

export default async function NewsArticlePage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const article = await sanityFetch<NewsItem | null>(newsBySlugQuery, {slug}, {revalidate: false, documentType: 'newsItem'});
  if (!article) notFound();

  return (
    <article className="min-h-screen bg-[#FAF8F5] font-sans text-slate-800">
      <section className="relative overflow-hidden bg-[#1C0D0D] px-6 pb-16 pt-10 text-white sm:pb-24 sm:pt-14">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(184,134,11,0.3),transparent_54%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#1C0D0D]/70 via-[#1C0D0D]/65 to-[#1C0D0D]" />
        <div aria-hidden="true" className="absolute -right-24 -top-44 h-[28rem] w-[28rem] rounded-full border border-white/[0.08] sm:-right-10" />
        <div aria-hidden="true" className="absolute -right-12 -top-32 h-[22rem] w-[22rem] rounded-full border border-amber-200/[0.1]" />
        <div className="relative mx-auto max-w-5xl">
          <Breadcrumb items={[{label: 'Home', href: '/'}, {label: 'News', href: '/news'}, {label: article.category}]} />
          <div className="mt-10 max-w-4xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-amber-300">{article.category}</p>
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">{article.title}</h1>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-stone-300"><CalendarDays className="h-4 w-4 text-amber-300" /> {formatDate(article.publishedAt)}</div>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        {article.featuredImage && <div className="relative mb-12 overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_28px_80px_-35px_rgba(50,35,28,0.4)]"><SanityImage image={article.featuredImage} altFallback={article.title} sizes="(min-width: 1024px) 960px, 100vw" className="h-auto max-h-[620px] w-full object-cover" priority /></div>}
        {article.excerpt && <p className="mx-auto mb-10 max-w-3xl font-serif text-xl leading-relaxed text-stone-700 sm:text-2xl">{article.excerpt}</p>}
        <div className="mx-auto max-w-3xl"><RichText value={article.body} /></div>
        <div className="mx-auto mt-14 max-w-3xl border-t border-stone-200 pt-6"><Link href="/news" className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#70221e] transition hover:border-[#8B2621]/40 hover:text-[#8B2621]"><ArrowLeft className="h-4 w-4" /> Back to news</Link></div>
      </div>
    </article>
  );
}

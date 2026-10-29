import { sanityFetch } from '@/src/sanity/fetch';
import { newsItemsQuery, type NewsItem } from '@/src/sanity/queries';
import Breadcrumb from '../components/Breadcrumb';
import NewsDirectory from './NewsDirectory';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'News - The Church of Pentecost LA Area',
  description: 'Latest news, stories, and updates from The Church of Pentecost LA Area.',
};

export default async function NewsPage() {
  const articles = await sanityFetch<NewsItem[]>(newsItemsQuery, {}, { revalidate: false, documentType: 'newsItem' });

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <section className="relative flex min-h-[370px] w-full items-center justify-center overflow-hidden bg-[#0f172a] px-5 py-16 text-white sm:min-h-[410px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.24),transparent_54%),radial-gradient(ellipse_at_8%_100%,rgba(15,23,42,0.65),transparent_48%)]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/50 via-[#0f172a]/35 to-[#0f172a]" />
        <div aria-hidden="true" className="absolute -right-24 -top-44 h-[28rem] w-[28rem] rounded-full border border-white/[0.08] sm:-right-10" />
        <div aria-hidden="true" className="absolute -right-12 -top-32 h-[22rem] w-[22rem] rounded-full border border-blue-400/[0.14]" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'News' }]} />
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-yellow-300 sm:text-xs">
            Dispatches · Bulletins · Community
          </p>
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Area News &amp; Updates
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A closer look at the people, moments, and ministry shaping the LA Area.
          </p>
        </div>
      </section>
      <NewsDirectory articles={articles} />
    </div>
  );
}

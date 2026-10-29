import Link from 'next/link';
import { Archive, ArrowRight } from 'lucide-react';
import type { NewsItem } from '@/src/sanity/queries';
import SanityImage from '../components/SanityImage';

function formatLongDate(value: string) {
  if (!value) return 'February 18, 2025';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

type FallbackNewsCard = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  fallbackImageUrl: string;
};

const fallbackArticles: FallbackNewsCard[] = [
  {
    id: 'fallback-news-1',
    title: 'La Area Launches Annual Evangelism & Discipleship Drive Across 24 Districts',
    slug: 'annual-evangelism-discipleship-drive',
    excerpt:
      'Thousands of members and officers gathered to commission a renewed season of house-to-house outreach, community transformation, and youth discipleship.',
    category: 'Area Bulletin',
    publishedAt: '2025-02-18',
    fallbackImageUrl: '/theme.jpg',
  },
  {
    id: 'fallback-news-2',
    title: 'Youth Ministry Convenes Leadership & Career Empowerment Summit in Accra',
    slug: 'youth-ministry-leadership-summit',
    excerpt:
      'Young professionals, students, and ministry leaders came together for intensive equipping sessions on faith, ethical leadership, and marketplace excellence.',
    category: 'Youth Ministry',
    publishedAt: '2025-02-10',
    fallbackImageUrl: '/youth-pic.jpg',
  },
  {
    id: 'fallback-news-3',
    title: 'Women’s Ministry Extends Community Care & Medical Outreach to Local Families',
    slug: 'womens-ministry-community-outreach',
    excerpt:
      'Demonstrating thepractical love of Christ, the Women’s Ministry provided free health screenings, counseling, and family support across the Area.',
    category: 'Community Impact',
    publishedAt: '2025-01-29',
    fallbackImageUrl: '/women-pic.jpg',
  },
];

export default function NewsPreview({ articles }: { articles: NewsItem[] }) {
  const displayArticles = articles.length > 0 ? articles.slice(0, 3) : null;

  return (
    <section id="news" className="bg-white px-6 py-20 text-slate-900 dark:bg-slate-950 dark:text-slate-50 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* 1. Section Header Layout */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl text-left">
            <div className="mb-2.5 flex items-center gap-2.5">
              <span className="h-px w-6 bg-yellow-500" />
              <span className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-yellow-600 dark:text-yellow-400">
                DISPATCHES &amp; BULLETINS
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
              Area News &amp; Updates
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
              Stay informed with the latest ministry reports, official communiqués, and stories of transformation across the La Area.
            </p>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center gap-2.5 self-start rounded-full bg-[#173262] px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1e3f7a] dark:bg-blue-600 dark:hover:bg-blue-500 md:self-auto"
          >
            <Archive aria-hidden="true" className="h-3.5 w-3.5 text-yellow-300 transition-colors" />
            <span>READ NEWS ARCHIVE</span>
          </Link>
        </div>

        {/* 2. Three-Column Card Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayArticles
            ? displayArticles.map((article, idx) => {
                const fallbackImg = fallbackArticles[idx % fallbackArticles.length].fallbackImageUrl;
                return (
                  <article
                    key={article.id}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                  >
                    {/* Image Header */}
                    <Link
                      href={`/news/${article.slug}`}
                      className="relative block aspect-[16/10] w-full overflow-hidden bg-[#173262]"
                    >
                      {article.featuredImage ? (
                        <SanityImage
                          image={article.featuredImage}
                          altFallback={article.title}
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <img
                          src={fallbackImg}
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-[#173262]/55 via-transparent to-black/15"
                      />
                      <span className="absolute left-4 top-4 rounded-md bg-[#173262]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm backdrop-blur-md">
                        {article.category || 'Bulletin'}
                      </span>
                    </Link>

                    {/* Card Content */}
                    <div className="flex flex-1 flex-col p-6">
                      {/* Publication Date */}
                      <time
                        dateTime={article.publishedAt}
                        className="text-xs font-medium text-slate-500 dark:text-slate-400"
                      >
                        {formatLongDate(article.publishedAt)}
                      </time>

                      {/* Title */}
                      <h3 className="mt-2.5 font-serif text-xl font-extrabold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-[#0f172a] dark:text-slate-50 dark:group-hover:text-yellow-300">
                        <Link href={`/news/${article.slug}`}>{article.title}</Link>
                      </h3>

                      {/* Excerpt / Headline */}
                      {article.excerpt && (
                        <p className="mt-3 line-clamp-3 font-serif text-sm font-bold leading-snug text-slate-900 dark:text-slate-100">
                          {article.excerpt}
                        </p>
                      )}

                      {/* Footer Action */}
                      <div className="mt-auto pt-6">
                        <Link
                          href={`/news/${article.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0f172a] transition-colors hover:text-yellow-600 dark:text-slate-200 dark:hover:text-yellow-400"
                        >
                          <span>Full Story</span>
                          <ArrowRight
                            aria-hidden="true"
                            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                          />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })
            : fallbackArticles.map((article) => (
                <article
                  key={article.id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                >
                  {/* Image Header */}
                  <Link
                    href="/news"
                    className="relative block aspect-[16/10] w-full overflow-hidden bg-[#173262]"
                  >
                    <img
                      src={article.fallbackImageUrl}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#173262]/55 via-transparent to-black/15"
                    />
                    <span className="absolute left-4 top-4 rounded-md bg-[#173262]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm backdrop-blur-md">
                      {article.category}
                    </span>
                  </Link>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-6">
                    {/* Publication Date */}
                    <time
                      dateTime={article.publishedAt}
                      className="text-xs font-medium text-slate-500 dark:text-slate-400"
                    >
                      {formatLongDate(article.publishedAt)}
                    </time>

                    {/* Title */}
                    <h3 className="mt-2.5 font-serif text-xl font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-[#173262] dark:text-slate-50 dark:group-hover:text-yellow-300">
                      <Link href="/news">{article.title}</Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {article.excerpt}
                    </p>

                    {/* Footer Action */}
                    <div className="mt-auto pt-6">
                      <Link
                        href="/news"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#173262] transition-colors hover:text-yellow-600 dark:text-slate-200 dark:hover:text-yellow-400"
                      >
                        <span>Full Story</span>
                        <ArrowRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
}

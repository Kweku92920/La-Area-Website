import Link from 'next/link';
import { ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { sanityFetchSafe } from '@/src/sanity/fetch';
import { formatDate } from '@/src/sanity/format';
import { eventsQuery, type HomeEvent } from '@/src/sanity/queries';
import { FALLBACK_EVENTS } from '@/src/data/events';

export const metadata = {
  title: 'Events - The Church of Pentecost LA Area',
  description: 'Upcoming events, conventions, and gatherings across The Church of Pentecost LA Area.',
};

export default async function EventsPage() {
  const sanityEvents = await sanityFetchSafe<HomeEvent[]>(eventsQuery, {}, [], {
    revalidate: false,
    documentType: 'event',
  });

  const featuredSanity = sanityEvents.find((e) => e.featured) ?? sanityEvents[0] ?? null;
  const defaultFeatured = FALLBACK_EVENTS[0];

  const featuredEvent = featuredSanity
    ? {
        id: featuredSanity.id,
        title: featuredSanity.title,
        category: featuredSanity.category || 'Area-Wide Convention',
        dateLabel: formatDate(featuredSanity.startDate),
        location: featuredSanity.location || defaultFeatured.location,
        image: featuredSanity.image || defaultFeatured.image,
      }
    : {
        id: defaultFeatured.id,
        title: defaultFeatured.title,
        category: defaultFeatured.category,
        dateLabel: 'April 18 – 20, 2025',
        location: defaultFeatured.location,
        image: defaultFeatured.image,
      };

  const upcomingList =
    sanityEvents.length > 1
      ? sanityEvents
          .filter((e) => e.id !== featuredEvent.id)
          .map((e) => {
            const d = new Date(e.startDate);
            const month = Number.isNaN(d.getTime())
              ? 'APR'
              : d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
            const day = Number.isNaN(d.getTime())
              ? '12'
              : String(d.getDate()).padStart(2, '0');
            return {
              id: e.id,
              month,
              day,
              category: e.category || 'AREA GATHERING',
              title: e.title,
              details: e.location || 'La Area',
            };
          })
      : FALLBACK_EVENTS.slice(1).map((e) => ({
          id: e.id,
          month: e.month,
          day: e.day,
          category: e.category,
          title: e.title,
          details: e.location,
        }));

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
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Events' }]} />
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-amber-300 sm:text-xs">
            Calendar of Fellowship
          </p>
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Upcoming Events &amp; Gatherings
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Join us for powerful times of worship, apostolic teaching, fellowship, and divine encounters across our districts.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Featured Event Card */}
          <div className="group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0a1120] p-8 text-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.45)] sm:p-10 lg:col-span-7">
            {featuredEvent.image && (
              <img
                src={featuredEvent.image}
                alt={featuredEvent.title}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45 transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1120]/90 via-[#0f172a]/55 to-[#0f172a]/35"
            />

            <div className="relative z-10 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-md bg-amber-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-950 shadow-sm">
                  FEATURED GATHERING
                </span>
                <span className="text-xs font-semibold tracking-wide text-slate-200">
                  • {featuredEvent.category}
                </span>
              </div>

              <h2 className="max-w-2xl font-serif text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
                {featuredEvent.title}
              </h2>
            </div>

            <div className="relative z-10 mt-12 flex flex-col gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-200 sm:text-sm">
                <div className="flex items-center gap-2">
                  <Calendar aria-hidden="true" className="h-4 w-4 shrink-0 text-amber-400" />
                  <span>{featuredEvent.dateLabel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-amber-400" />
                  <span>{featuredEvent.location}</span>
                </div>
              </div>

              <Link
                href={`/events/${encodeURIComponent(featuredEvent.id)}`}
                className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#0f172a] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-400 hover:text-slate-950 sm:self-auto"
              >
                <span>EVENT DETAILS</span>
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Upcoming Events List */}
          <div className="flex flex-col justify-between gap-4 lg:col-span-5">
            {upcomingList.map((item) => (
              <Link
                key={item.id}
                href={`/events/${encodeURIComponent(item.id)}`}
                className="group flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
              >
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-center transition-colors group-hover:border-[#0f172a] group-hover:bg-[#0f172a] group-hover:text-white dark:border-slate-700 dark:bg-slate-800 dark:group-hover:border-blue-500 dark:group-hover:bg-blue-600">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 group-hover:text-amber-300 dark:text-amber-400">
                    {item.month}
                  </span>
                  <span className="mt-0.5 font-serif text-xl font-bold leading-none text-slate-900 tabular-nums group-hover:text-white dark:text-white">
                    {item.day}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">
                    {item.category}
                  </p>
                  <h3 className="mt-1 truncate font-serif text-base font-bold text-slate-900 transition-colors group-hover:text-blue-900 dark:text-slate-50 dark:group-hover:text-amber-300 sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Clock aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                    <span className="truncate">{item.details}</span>
                  </p>
                </div>

                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#0f172a] dark:text-slate-600 dark:group-hover:text-amber-300"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

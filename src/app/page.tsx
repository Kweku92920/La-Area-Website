import React from 'react';
import Link from 'next/link';
import { sanityFetchSafe } from '@/src/sanity/fetch';
import { formatDate, youtubeThumb } from '@/src/sanity/format';
import {
  eventsQuery,
  latestSermonsQuery,
  recentNewsQuery,
  type HomeEvent,
  type HomeSermon,
  type NewsItem,
} from '@/src/sanity/queries';
import NewsPreview from './news/NewsPreview';
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Play,
  Quote,
} from 'lucide-react';

export default async function HomePage() {
  const [sanityEvents, sermons, recentNews] = await Promise.all([
    sanityFetchSafe<HomeEvent[]>(eventsQuery, {}, [], { revalidate: false, documentType: 'event' }),
    sanityFetchSafe<HomeSermon[]>(latestSermonsQuery, {}, [], { documentType: 'sermon' }),
    sanityFetchSafe<NewsItem[]>(recentNewsQuery, {}, [], { revalidate: false, documentType: 'newsItem' }),
  ]);

  const featuredEvent = sanityEvents.find((e) => e.featured) ?? sanityEvents[0] ?? null;
  const upcomingGatherings = featuredEvent
    ? sanityEvents
        .filter((e) => e.id !== featuredEvent.id)
        .slice(0, 3)
        .map((e) => {
          const d = new Date(e.startDate);
          const month = Number.isNaN(d.getTime())
            ? 'TBA'
            : d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
          const day = Number.isNaN(d.getTime())
            ? '--'
            : String(d.getDate()).padStart(2, '0');
          return {
            id: e.id,
            month,
            day,
            category: e.category || 'AREA GATHERING',
            title: e.title,
            details: e.location || 'La Area',
            href: `/events/${encodeURIComponent(e.id)}`,
          };
        })
    : [];

  return (
    <div className="church-page min-h-screen bg-white font-sans text-slate-900 antialiased selection:bg-yellow-500 selection:text-white dark:bg-slate-950 dark:text-slate-100">
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative flex min-h-[78vh] items-center justify-center overflow-hidden bg-[#0f172a] text-white">
        {/* Background Image & Calibrated Deep Blue Editorial Overlays */}
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat opacity-45 mix-blend-normal filter contrast-105"
          style={{ backgroundImage: "url('/theme.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120]/90 via-[#0f172a]/65 to-[#0f172a]/30" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.5),transparent_65%)]" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_15%,rgba(59,130,246,0.18),transparent_58%)]"
        />

        <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center sm:py-36">
          <div className="mb-6 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-yellow-300">
            <span className="h-px w-10 bg-yellow-300/70" />
          </div>
          <h1 className="mb-6 font-serif text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl">
            The Church of Pentecost.
            <br />
            <span className="text-yellow-300">La Area.</span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-base font-light leading-relaxed text-slate-200 sm:text-lg md:text-xl">
            Welcome to The Church of Pentecost, La Area. We are a family of believers rooted in the Word, empowered by the Holy Spirit, and ready to walk with you.
          </p>

          <div className="mb-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/assemblies"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/45 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 sm:w-auto"
            >
              <span>Find a Local Assembly</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/sermons"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/45 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 sm:w-auto"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#0f172a]">
                <Play className="ml-0.5 h-3 w-3 fill-current" />
              </div>
              <span>Watch Latest Sermons</span>
            </Link>
          </div>

          <div className="inline-flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-white/35 bg-white/10 p-4 text-xs font-medium text-white backdrop-blur-sm">
            <div className="flex items-center gap-2 px-3 py-1">
              <Calendar className="h-4 w-4 text-yellow-300" />
              <span>Office Hours: Mon - Fri, 9:00 AM &amp; 4:00 PM</span>
            </div>
            <div className="hidden h-4 w-px bg-white/15 sm:block" />
            <div className="flex items-center gap-2 px-3 py-1">
              <MapPin className="h-4 w-4 text-yellow-300" />
              <span>La Area Office, Accra</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- WELCOME SECTION (EDITORIAL MAGAZINE LAYOUT) ---------------- */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Editorial Image Composition */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo Frame */}
              <div className="aspect-[4/5] overflow-hidden rounded-sm border-8 border-white bg-slate-200 shadow-[0_24px_50px_-28px_rgba(15,23,42,0.55)] dark:border-slate-900 dark:bg-slate-900">
                <img
                  src="/AREA HEAD.png"
                  alt="Area Head"
                  className="h-full w-full object-cover object-top grayscale-[15%] contrast-105 transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Overlapping Institutional Badge */}
              <div className="absolute -bottom-6 -right-6 hidden max-w-xs flex-col border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:flex">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-blue-900 dark:text-yellow-400">
                    Leadership
                  </span>
                </div>
                <p className="font-serif text-sm font-bold text-slate-900 dark:text-white">
                  Apostle Dr Dieudonne
                </p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">La Area Head</p>
              </div>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2">
              <span className="h-px w-8 bg-yellow-500" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-600 dark:text-yellow-400">
                Welcome to La Area
              </span>
            </div>

            <h2 className="font-serif text-3xl font-bold leading-[1.15] tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl md:text-5xl">
              Message From The Area Head
            </h2>

            <div className="relative my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-900/60">
              <Quote className="mb-2 h-6 w-6 text-yellow-500/40 fill-current" />
              <p className="font-serif text-base italic leading-relaxed text-slate-700 dark:text-slate-300 md:text-lg">
                &ldquo;Rooted in the Word of God and guided by the Holy Spirit, we are committed to spreading the Gospel of Jesus Christ, nurturing believers, and strengthening families across our communities.&rdquo;
              </p>
            </div>

            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
              Whether you are visiting for the first time, searching for a permanent church home, or looking to reconnect with your faith, our doors and hearts are wide open to receive you.
            </p>

            <div className="flex items-center gap-6 pt-4">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 text-sm font-bold text-[#0f172a] transition-colors hover:text-blue-800 dark:text-yellow-400 dark:hover:text-yellow-300"
              >
                <span className="border-b border-[#0f172a]/40 pb-0.5 transition-all group-hover:border-blue-800 dark:border-yellow-400/40">
                  Read More
                </span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- STATS COUNTER BAR ---------------- */}
      <section className="mx-auto mb-20 max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-2 gap-8 rounded-2xl border border-slate-200 bg-white px-8 py-10 text-center text-[#0f172a] shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white md:grid-cols-4">
          <div className="border-r border-slate-200 last:border-0 dark:border-slate-800">
            <div className="font-serif text-4xl font-semibold text-[#0f172a] tabular-nums dark:text-white sm:text-5xl">
              81
            </div>
            <div className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-400">
              Local Assemblies
            </div>
          </div>
          <div className="border-r border-slate-200 last:border-0 dark:border-slate-800">
            <div className="font-serif text-4xl font-semibold text-[#0f172a] tabular-nums dark:text-white sm:text-5xl">
              24
            </div>
            <div className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-400">
              Districts
            </div>
          </div>
          <div className="border-r border-slate-200 last:border-0 dark:border-slate-800">
            <div className="font-serif text-4xl font-semibold text-[#0f172a] tabular-nums dark:text-white sm:text-5xl">
              40+
            </div>
            <div className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-400">
              Years of Ministry
            </div>
          </div>
          <div>
            <div className="font-serif text-4xl font-semibold text-[#0f172a] tabular-nums dark:text-white sm:text-5xl">
              58,000+
            </div>
            <div className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-400">
              Members &amp; Families
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- UPCOMING EVENTS (GATHER WITH US) ---------------- */}
      <section id="events" className="mx-auto max-w-7xl px-6 py-20 md:px-12">
        {/* 1. Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-2.5 flex items-center gap-2.5">
              <span className="h-px w-6 bg-yellow-500" />
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-yellow-600 dark:text-yellow-400">
                CALENDAR OF FELLOWSHIP
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
              Gather With Us
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
              Join us for powerful times of worship, apostolic teaching, fellowship, and divine encounters across our districts.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2.5 self-start rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#0f172a] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0f172a] hover:bg-[#0f172a] hover:text-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:bg-blue-600 dark:hover:text-white md:self-auto"
          >
            <Calendar aria-hidden="true" className="h-3.5 w-3.5 text-yellow-600 dark:text-yellow-400" />
            <span>VIEW ALL EVENTS</span>
          </Link>
        </div>

        {/* 2. Events Content (Real Sanity Data Only) */}
        {featuredEvent ? (
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            {/* Featured Event Card */}
            <div
              className={`group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0a1120] p-8 text-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.45)] sm:p-10 ${
                upcomingGatherings.length > 0 ? 'lg:col-span-7' : 'lg:col-span-12'
              }`}
            >
              {featuredEvent.image && (
                <img
                  src={`${featuredEvent.image}?w=1600&auto=format`}
                  alt={featuredEvent.title}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55 transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1120]/90 via-[#0f172a]/45 to-[#0f172a]/30"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_10%,rgba(59,130,246,0.22),transparent_55%),radial-gradient(ellipse_at_10%_90%,rgba(250, 204, 21,0.12),transparent_50%)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/[0.06]"
              />

              <div className="relative z-10 space-y-5">
                {/* Top Tag */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-md bg-yellow-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-950 shadow-sm">
                    FEATURED GATHERING
                  </span>
                  <span className="text-xs font-semibold tracking-wide text-slate-200">
                    • {featuredEvent.category || 'Area-Wide Convention'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="max-w-2xl font-serif text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
                  {featuredEvent.title}
                </h3>
              </div>

              {/* Bottom Metadata & Action Button */}
              <div className="relative z-10 mt-12 flex flex-col gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-200 sm:text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar aria-hidden="true" className="h-4 w-4 shrink-0 text-yellow-400" />
                    <span>{featuredEvent.startDate ? formatDate(featuredEvent.startDate) : 'Date TBA'}</span>
                  </div>
                  {featuredEvent.location && (
                    <div className="flex items-center gap-2">
                      <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-yellow-400" />
                      <span>{featuredEvent.location}</span>
                    </div>
                  )}
                </div>

                <Link
                  href={`/events/${encodeURIComponent(featuredEvent.id)}`}
                  className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#0f172a] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-yellow-400 hover:text-slate-950 sm:self-auto"
                >
                  <span>EVENT DETAILS</span>
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Side: Upcoming Events List (only rendered when additional real events exist) */}
            {upcomingGatherings.length > 0 && (
              <div className="flex flex-col justify-between gap-4 lg:col-span-5">
                {upcomingGatherings.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="group flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                  >
                    {/* Distinct Date Block */}
                    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-center transition-colors group-hover:border-[#0f172a] group-hover:bg-[#0f172a] group-hover:text-white dark:border-slate-700 dark:bg-slate-800 dark:group-hover:border-blue-500 dark:group-hover:bg-blue-600">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-600 group-hover:text-yellow-300 dark:text-yellow-400">
                        {item.month}
                      </span>
                      <span className="mt-0.5 font-serif text-xl font-bold leading-none text-slate-900 tabular-nums group-hover:text-white dark:text-white">
                        {item.day}
                      </span>
                    </div>

                    {/* Event Details */}
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-600 dark:text-yellow-400">
                        {item.category}
                      </p>
                      <h4 className="mt-1 truncate font-serif text-base font-bold text-slate-900 transition-colors group-hover:text-blue-900 dark:text-slate-50 dark:group-hover:text-yellow-300 sm:text-lg">
                        {item.title}
                      </h4>
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <Clock aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                        <span className="truncate">{item.details}</span>
                      </p>
                    </div>

                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#0f172a] dark:text-slate-600 dark:group-hover:text-yellow-300"
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-8 py-16 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Calendar className="mx-auto mb-3 h-8 w-8 text-yellow-500" />
            <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-50">
              No Upcoming Events Scheduled
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">
              Upcoming conventions, services, and ministry gatherings will appear here once published.
            </p>
          </div>
        )}
      </section>

      {/* ---------------- NEWS & UPDATES ---------------- */}
      <NewsPreview articles={recentNews} />

      {/* ---------------- SERMONS & MEDIA ---------------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <div className="mb-2 flex items-center justify-center space-x-2">
            <span className="h-0.5 w-6 bg-yellow-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-yellow-600 dark:text-yellow-400">
              SERMONS &amp; MEDIA
            </span>
            <span className="h-0.5 w-6 bg-yellow-500" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-slate-50 md:text-4xl">
            Be Encouraged &amp; Equipped
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Listen to recent messages from our pastors and be strengthened in your walk with God.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {sermons.map((s) => (
            <div
              key={s.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="relative aspect-video overflow-hidden bg-[#0f172a]">
                <img
                  src={s.customThumb ?? youtubeThumb(s.youtubeUrl)}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/55 via-transparent to-black/10" />
                {s.duration && (
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md">
                    {s.duration}
                  </span>
                )}
              </div>
              <div className="p-5 sm:p-6">
                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <Calendar className="h-3.5 w-3.5 text-yellow-600 dark:text-yellow-400" />
                  <span>{formatDate(s.date)}</span>
                </div>
                <h3 className="font-serif text-lg font-semibold leading-snug tracking-tight text-slate-900 dark:text-slate-50">
                  {s.title}
                </h3>
                <p className="mt-3 text-xs font-medium text-slate-600 dark:text-slate-400">
                  {s.speaker}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/sermons"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f172a] px-7 py-3 text-xs font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1e293b] dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            <span>Browse Sermon Library</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ---------------- OUR MINISTRIES ---------------- */}
      <section id="ministries" className="mx-auto max-w-7xl px-6 py-20 md:px-12">
        <div className="mx-auto mb-16 max-w-xl text-center">
          <div className="mb-2 flex items-center justify-center space-x-2">
            <span className="h-px w-6 bg-yellow-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-yellow-600 dark:text-yellow-400">
              OUR MINISTRIES
            </span>
            <span className="h-px w-6 bg-yellow-500" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-slate-50 md:text-4xl">
            Grow, Serve &amp; Belong
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            There is a ministry for every age and season of life. Find your place to connect and serve.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Men's Ministry */}
          <Link
            href="/men"
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src="/pemem-pic.jpg"
                alt="Men's Ministry"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 h-10 w-10 overflow-hidden rounded-xl border border-white/20 bg-white p-1 shadow-md">
                <img src="/Pemem.png" alt="PEMEM" className="h-full w-full object-contain" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 font-serif text-lg font-bold text-slate-900 dark:text-slate-50">
                Men&apos;s Ministry
              </h3>
              <p className="space-y-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                <span className="block font-medium text-[#0f172a] dark:text-yellow-400">
                  Man! The Image and Glory of God!
                </span>
                <span className="block">Be Strong and Courageous. Firmly established in Christ.</span>
              </p>
            </div>
          </Link>

          {/* Women's Ministry */}
          <Link
            href="/women"
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src="/women-pic.jpg"
                alt="Women's Ministry"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 h-10 w-10 overflow-hidden rounded-xl border border-white/20 bg-white p-1 shadow-md">
                <img src="/Women.png" alt="WOMEN" className="h-full w-full object-contain" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 font-serif text-lg font-bold text-slate-900 dark:text-slate-50">
                Women&apos;s Ministry
              </h3>
              <p className="space-y-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                <span className="block font-medium text-[#0f172a] dark:text-yellow-400">
                  Kronkron! Ma Awurade.
                </span>
                <span className="block">
                  Exemplary Christian womanhood and impactful community service.
                </span>
              </p>
            </div>
          </Link>

          {/* Youth Ministry */}
          <Link
            href="/youth"
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src="/youth-pic.jpg"
                alt="Youth Ministry"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 h-10 w-10 overflow-hidden rounded-xl border border-white/20 bg-white p-1 shadow-md">
                <img src="/Youth.jpg" alt="YOUTH" className="h-full w-full object-contain" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 font-serif text-lg font-bold text-slate-900 dark:text-slate-50">
                Youth Ministry
              </h3>
              <p className="space-y-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                <span className="block font-medium text-yellow-600 dark:text-yellow-400">
                  Youth! Arise and Shine.
                </span>
                <span className="block">Empowered to live for Christ everywhere.</span>
              </p>
            </div>
          </Link>

          {/* Children's Ministry */}
          <Link
            href="/children"
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src="/children-pic.jpg"
                alt="Children Ministry"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 h-10 w-10 overflow-hidden rounded-xl border border-white/20 bg-white p-1 shadow-md">
                <img src="/Children.jpg" alt="CHILDREN" className="h-full w-full object-contain" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 font-serif text-lg font-bold text-slate-900 dark:text-slate-50">
                Children&apos;s Ministry
              </h3>
              <p className="space-y-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                <span className="block font-medium text-yellow-600 dark:text-yellow-400">
                  Jesus! Friend of Little Children.
                </span>
                <span className="block">
                  Nurturing young hearts in the fear and admonition of the Lord.
                </span>
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/ministries"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f172a] px-8 py-3.5 text-xs font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1e293b] dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            <span>Explore Ministries</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

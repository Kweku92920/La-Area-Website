import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Navigation,
} from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import { sanityFetchSafe } from '@/src/sanity/fetch';
import { formatDate } from '@/src/sanity/format';
import { eventByIdQuery, type HomeEvent } from '@/src/sanity/queries';
import { FALLBACK_EVENTS } from '@/src/data/events';

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  const sanityEvent = await sanityFetchSafe<HomeEvent | null>(
    eventByIdQuery,
    { id: decodedId },
    null,
    { revalidate: false, documentType: 'event' }
  );

  const fallbackMatch =
    FALLBACK_EVENTS.find((item) => item.id === decodedId) ??
    (decodedId === 'featured' ? FALLBACK_EVENTS[0] : null);

  if (!sanityEvent && !fallbackMatch) {
    notFound();
  }

  const title = sanityEvent?.title || fallbackMatch?.title || 'Upcoming Event';
  const category = sanityEvent?.category || fallbackMatch?.category || 'Area Gathering';
  const dateDisplay = sanityEvent?.startDate
    ? sanityEvent.endDate
      ? `${formatDate(sanityEvent.startDate)} – ${formatDate(sanityEvent.endDate)}`
      : formatDate(sanityEvent.startDate)
    : fallbackMatch?.id === 'officers-retreat'
      ? 'April 18 – 20, 2025'
      : fallbackMatch?.startDate
        ? formatDate(fallbackMatch.startDate)
        : 'Upcoming';
  const timeDisplay = fallbackMatch?.time || '9:00 AM';
  const locationDisplay =
    sanityEvent?.location || fallbackMatch?.location || 'La Area, Accra';
  const descriptionDisplay =
    sanityEvent?.description ||
    fallbackMatch?.description ||
    'Join believers and leaders across the La Area for a time of worship, teaching, prayer, and fellowship.';
  const imageDisplay = sanityEvent?.image || fallbackMatch?.image || '/theme.jpg';
  const highlights = fallbackMatch?.highlights ?? [
    'Spirit-filled praise, worship, and intercession',
    'Sound biblical teaching and ministry impartation',
    'Fellowship with members and leaders across the La Area',
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      {/* Hero Banner */}
      <section className="relative flex min-h-[380px] w-full items-center justify-center overflow-hidden bg-[#0f172a] px-6 py-20 text-white sm:min-h-[430px]">
        {imageDisplay && (
          <img
            src={imageDisplay}
            alt={title}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.22),transparent_52%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-[#0f172a]/70 to-[#0f172a]/40"
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Events', href: '/events' },
              { label: title },
            ]}
          />
          <div className="mt-2 flex flex-col items-center">
            <span className="mb-4 inline-flex items-center rounded-md bg-amber-500 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-950">
              {category}
            </span>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-200 sm:text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-amber-400" />
                <span>{dateDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-400" />
                <span>{locationDisplay}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Event Details */}
          <div className="space-y-8 lg:col-span-8">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0f172a]">
                <img
                  src={imageDisplay}
                  alt={title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/50 via-transparent to-transparent" />
              </div>
              <div className="p-6 sm:p-10">
                <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-50">
                  About This Gathering
                </h2>
                <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  {descriptionDisplay}
                </p>

                <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-800">
                  <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-50">
                    What to Expect
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {highlights.map((point, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#0f172a] transition hover:border-[#0f172a] hover:bg-[#0f172a] hover:text-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-blue-600"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to all events</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Schedule & Venue Card */}
          <div className="space-y-6 lg:col-span-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-50">
                Event Information
              </h3>

              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-[#0f172a] dark:bg-slate-800 dark:text-amber-300">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Date
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {dateDisplay}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-[#0f172a] dark:bg-slate-800 dark:text-amber-300">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Time
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {timeDisplay}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-[#0f172a] dark:bg-slate-800 dark:text-amber-300">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Venue / Location
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {locationDisplay}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3 border-t border-slate-200 pt-6 dark:border-slate-800">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationDisplay)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0f172a] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-md transition hover:bg-[#1e293b] dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  <Navigation className="h-4 w-4" />
                  <span>Get Directions</span>
                </a>
                <Link
                  href="/assemblies"
                  className="flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  Find Local Assembly
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

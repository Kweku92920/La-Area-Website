import { notFound } from 'next/navigation';
import {
  Clock,
  MapPin,
  Navigation,
  UserRound,
} from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import { sanityFetch } from '@/src/sanity/fetch';
import { MINISTER_TBA } from '@/src/sanity/format';
import { assemblyBySlugQuery, assemblySlugsQuery, type AssemblyDetail } from '@/src/sanity/queries';

export async function generateStaticParams() {
  return sanityFetch<{ id: string }[]>(assemblySlugsQuery);
}

export default async function AssemblyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const assembly = await sanityFetch<AssemblyDetail | null>(assemblyBySlugQuery, { id });

  if (!assembly) {
    notFound();
  }

  const serviceTimes = Array.isArray(assembly.time)
    ? assembly.time
    : [assembly.time || 'Sunday Worship - 9:00 AM'];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <section className="relative flex min-h-[370px] w-full items-center justify-center overflow-hidden bg-[#0f172a] px-6 py-20 text-white sm:min-h-[410px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.22),transparent_52%),radial-gradient(ellipse_at_8%_100%,rgba(15,23,42,0.6),transparent_48%)]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/40 via-[#0f172a]/20 to-[#0f172a]" />
        <div aria-hidden="true" className="absolute -left-28 -top-44 h-[28rem] w-[28rem] rounded-full border border-white/[0.07]" />
        <div aria-hidden="true" className="absolute -left-12 -top-32 h-[22rem] w-[22rem] rounded-full border border-blue-400/[0.14]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Local Assemblies', href: '/assemblies' },
              { label: assembly.name },
            ]}
          />

          <div className="flex flex-col items-center">
            {assembly.district && (
              <span className="mb-4 inline-block rounded-full border border-amber-400/30 bg-amber-400/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300">
                {assembly.district} District
              </span>
            )}
            <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              {assembly.name}
            </h1>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-slate-300 md:text-base">
              <MapPin className="h-4 w-4 shrink-0 text-amber-400" />
              {assembly.location}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-slate-900/70 sm:p-8">
              <h2 className="mb-6 font-serif text-xl font-bold text-slate-900 dark:text-slate-50">
                Service Times
              </h2>
              <div className="space-y-4">
                {serviceTimes.map((timeStr: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-blue-900/15 bg-blue-900/[0.06] text-blue-800 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
                      <Clock className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium sm:text-base">{timeStr}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-slate-900/70">
              <div className="h-80 w-full overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800">
                <iframe
                  title={`Map showing location of ${assembly.name}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(assembly.location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-blue-900/15 bg-blue-900/[0.06] text-blue-800 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
                  <UserRound className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    District Minister
                  </p>
                  <p className="mt-0.5 text-base font-semibold text-[#173262] dark:text-blue-300">
                    {assembly.districtMinister ?? MINISTER_TBA}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {assembly.district} District
                  </p>
                </div>
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(assembly.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#173262] px-6 py-4 font-semibold text-white shadow-md transition-all hover:bg-[#1e3f7a] focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              <Navigation className="h-4 w-4 shrink-0" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

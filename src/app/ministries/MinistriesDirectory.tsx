'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  Baby,
  HeartHandshake,
  Search,
  UsersRound,
  UserRound,
} from 'lucide-react';
import type { MinistryItem } from '@/src/sanity/queries';

const ministryPages: Record<string, string> = {
  'youth-ministry': '/youth',
  'womens-ministry': '/women',
  'mens-ministry': '/men',
  'childrens-ministry': '/children',
};

const sectorNames: Record<string, string> = {
  children: 'Children',
  men: 'Men',
  women: 'Women',
  youth: 'Youth',
  other: 'Other',
};

const getSector = (ministry: MinistryItem) => {
  if (ministry.sector) return ministry.sector.toLowerCase();
  const id = ministry.id.toLowerCase();
  const title = ministry.title.toLowerCase();
  if (id.includes('child') || title.includes('child')) return 'children';
  if (id.includes('youth') || title.includes('youth')) return 'youth';
  if (id.includes('women') || title.includes('women')) return 'women';
  if (id.includes('men') || title.includes('men')) return 'men';
  return 'other';
};

const getSectorIcon = (sector: string) => {
  switch (sector) {
    case 'children':
      return Baby;
    case 'men':
      return UsersRound;
    case 'women':
      return HeartHandshake;
    case 'youth':
      return UsersRound;
    default:
      return UsersRound;
  }
};

export default function MinistriesDirectory({ ministries }: { ministries: MinistryItem[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const sectors = useMemo(
    () =>
      [...new Set(ministries.map(getSector))].sort((a, b) => {
        const order = ['youth', 'women', 'men', 'children', 'other'];
        return order.indexOf(a) - order.indexOf(b);
      }),
    [ministries],
  );
  const query = searchQuery.trim().toLowerCase();
  const filteredMinistries = ministries.filter((ministry) => {
    const ministryLeaders = ministry.leaders ?? [];
    const sector = getSector(ministry);
    const matchesSector = selectedSector === 'all' || sector === selectedSector;
    const matchesSearch = [
      ministry.title,
      ministry.description,
      ...ministryLeaders.flatMap((leader) => [leader.name, leader.title, leader.bio]),
      sectorNames[sector] ?? sector,
    ].some((value) => value.toLowerCase().includes(query));
    return matchesSector && matchesSearch;
  });

  return (
    <>
      <section className="mx-auto max-w-7xl px-0 pb-6 sm:pb-8">
        <div className="flex flex-col items-center justify-between gap-5 rounded-[1.6rem] border border-slate-200/80 bg-white p-4 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.3)] backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 md:flex-row md:p-5">
          <label htmlFor="ministry-search" className="relative w-full md:max-w-sm">
            <span className="sr-only">Search ministries by keyword or sector</span>
            <Search aria-hidden="true" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="ministry-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search ministries or sectors..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-600/40 focus:bg-white focus:ring-2 focus:ring-blue-600/15 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </label>
          <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end" aria-label="Filter by ministry sector">
            <button
              type="button"
              aria-pressed={selectedSector === 'all'}
              onClick={() => setSelectedSector('all')}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                selectedSector === 'all'
                  ? 'border-[#0f172a] bg-[#0f172a] text-white shadow-sm dark:border-blue-500 dark:bg-blue-600'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'
              }`}
            >
              All ministries
            </button>
            {sectors.map((sector) => (
              <button
                key={sector}
                type="button"
                aria-pressed={selectedSector === sector}
                onClick={() => setSelectedSector(sector)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                  selectedSector === sector
                    ? 'border-[#0f172a] bg-[#0f172a] text-white shadow-sm dark:border-blue-500 dark:bg-blue-600'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'
                }`}
              >
                {sectorNames[sector] ?? sector}
              </button>
            ))}
          </div>
        </div>
        <p aria-live="polite" className="mt-4 text-center text-xs font-medium text-slate-500 dark:text-slate-400 md:text-left">
          Showing <span className="font-bold text-slate-800 dark:text-slate-200">{filteredMinistries.length}</span>{' '}
          {filteredMinistries.length === 1 ? 'ministry' : 'ministries'}
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-0 pb-20" aria-label="Ministry directory">
        {filteredMinistries.length ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {filteredMinistries.map((ministry) => {
              const primaryLeader = ministry.leaders?.[0];
              const sector = getSector(ministry);
              const SectorIcon = getSectorIcon(sector);
              const href = ministryPages[ministry.id] ?? `/ministries/${ministry.id}`;
              return (
                <article
                  key={ministry.id}
                  id={ministry.id}
                  className="group flex w-full min-w-0 flex-col overflow-hidden rounded-[1.4rem] border border-slate-200/80 bg-white shadow-[0_18px_50px_-24px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-600/30 hover:shadow-[0_24px_60px_-22px_rgba(15,23,42,0.26)] dark:border-slate-800 dark:bg-slate-900 sm:rounded-[1.6rem]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[radial-gradient(ellipse_at_18%_8%,rgba(59,130,246,0.24),transparent_38%),linear-gradient(135deg,#1e293b_0%,#0f172a_58%,#0a1120_100%)]">
                    {ministry.image && (
                      <Image
                        src={ministry.image}
                        alt={`${ministry.title} community`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    {!ministry.image && (
                      <>
                        <div aria-hidden="true" className="absolute -right-12 -top-20 h-64 w-64 rounded-full border border-white/10 bg-white/[0.04] shadow-[0_0_90px_rgba(59,130,246,0.16)]" />
                        <div aria-hidden="true" className="absolute -bottom-28 -left-8 h-64 w-64 rounded-full border border-blue-400/20 bg-blue-400/[0.06]" />
                        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.08)_50%,transparent_70%)]" />
                      </>
                    )}
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-[#0f172a]/15 to-black/10" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-yellow-300">
                        {sectorNames[sector] ?? 'Community'} ministry
                      </p>
                      <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-[1.8rem]">
                        {ministry.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-grow flex-col p-5 sm:p-6">
                    <p className="flex-grow text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {ministry.description}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full border border-blue-900/15 bg-blue-900/[0.06] px-3 py-2 text-xs font-medium text-[#0f172a] dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-200">
                        <SectorIcon aria-hidden="true" className="h-3.5 w-3.5 text-blue-700 dark:text-blue-300" />
                        {sectorNames[sector] ?? 'Community'}
                      </span>
                      {primaryLeader && (
                        <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-yellow-600/15 bg-yellow-500/[0.08] px-3 py-2 text-xs font-medium text-yellow-900 dark:border-yellow-400/20 dark:bg-yellow-400/10 dark:text-yellow-200">
                          <UserRound aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-yellow-700 dark:text-yellow-300" />
                          <span className="truncate">{primaryLeader.name}</span>
                        </span>
                      )}
                    </div>
                    <Link
                      href={href}
                      className="mt-5 inline-flex w-full items-center justify-between rounded-full border border-slate-200 bg-slate-50 py-2 pl-4 pr-2 text-sm font-semibold text-[#0f172a] transition-all duration-300 hover:border-[#0f172a] hover:bg-[#0f172a] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-blue-600"
                    >
                      <span>Get involved</span>
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#0f172a] shadow-sm transition-transform duration-300 group-hover:translate-x-0.5 dark:bg-slate-900 dark:text-blue-300">
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                      </span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            No ministries match your search. Try another keyword or sector.
          </p>
        )}
      </section>
    </>
  );
}

'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  Baby,
  HeartHandshake,
  Search,
  Sparkles,
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
    () => [...new Set(ministries.map(getSector))].sort((a, b) => {
      const order = ['youth', 'women', 'men', 'children', 'other'];
      return order.indexOf(a) - order.indexOf(b);
    }),
    [ministries],
  );
  const query = searchQuery.trim().toLowerCase();
  const filteredMinistries = ministries.filter((ministry) => {
    const sector = getSector(ministry);
    const matchesSector = selectedSector === 'all' || sector === selectedSector;
    const matchesSearch = [
      ministry.title,
      ministry.description,
      ministry.leader?.name ?? '',
      ministry.leader?.role ?? '',
      ministry.assistantLeader?.name ?? '',
      ministry.secretary?.name ?? '',
      sectorNames[sector] ?? sector,
    ].some((value) => value.toLowerCase().includes(query));
    return matchesSector && matchesSearch;
  });

  return (
    <>
      <section className="mx-auto max-w-7xl px-0 pb-6 sm:pb-8">
        <div className="flex flex-col items-center justify-between gap-5 rounded-[1.6rem] border border-slate-200/80 bg-white/80 p-4 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.3)] backdrop-blur-md md:flex-row md:p-5">
          <label htmlFor="ministry-search" className="relative w-full md:max-w-sm">
            <span className="sr-only">Search ministries by keyword or sector</span>
            <Search aria-hidden="true" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="ministry-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search ministries or sectors..."
              className="w-full rounded-full border border-slate-200 bg-slate-50/80 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-700/40 focus:bg-white focus:ring-2 focus:ring-emerald-800/10"
            />
          </label>
          <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end" aria-label="Filter by ministry sector">
            <button
              type="button"
              aria-pressed={selectedSector === 'all'}
              onClick={() => setSelectedSector('all')}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                selectedSector === 'all'
                  ? 'border-emerald-800 bg-emerald-800 text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-800/30 hover:bg-emerald-50'
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
                    ? 'border-emerald-800 bg-emerald-800 text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-800/30 hover:bg-emerald-50'
                }`}
              >
                {sectorNames[sector] ?? sector}
              </button>
            ))}
          </div>
        </div>
        <p aria-live="polite" className="mt-4 text-center text-xs font-medium text-slate-500 md:text-left">
          Showing <span className="font-bold text-slate-800">{filteredMinistries.length}</span>{' '}
          {filteredMinistries.length === 1 ? 'ministry' : 'ministries'}
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-0 pb-20" aria-label="Ministry directory">
        {filteredMinistries.length ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {filteredMinistries.map((ministry) => {
              const sector = getSector(ministry);
              const SectorIcon = getSectorIcon(sector);
              const href = ministryPages[ministry.id] ?? `/ministries/${ministry.id}`;
              return (
                <article
                  key={ministry.id}
                  id={ministry.id}
                  className="group flex w-full min-w-0 flex-col overflow-hidden rounded-[1.4rem] border border-white/80 bg-white/75 shadow-[0_18px_50px_-24px_rgba(50,35,28,0.24)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white hover:shadow-[0_24px_60px_-22px_rgba(50,35,28,0.3)] sm:rounded-[1.6rem]"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[radial-gradient(ellipse_at_18%_8%,rgba(255,255,255,0.24),transparent_38%),linear-gradient(135deg,#31514a_0%,#1e3433_58%,#171821_100%)]">
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
                        <div aria-hidden="true" className="absolute -right-12 -top-20 h-64 w-64 rounded-full border border-white/10 bg-white/[0.04] shadow-[0_0_90px_rgba(218,175,112,0.16)]" />
                        <div aria-hidden="true" className="absolute -bottom-28 -left-8 h-64 w-64 rounded-full border border-[#d9b777]/25 bg-[#d9b777]/[0.08]" />
                        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.08)_50%,transparent_70%)]" />
                      </>
                    )}
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#101715]/80 via-[#101715]/10 to-black/10" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">
                        {sectorNames[sector] ?? 'Community'} ministry
                      </p>
                      <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-[1.7rem]">
                        {ministry.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-grow flex-col p-5 sm:p-6">
                    <p className="flex-grow text-sm leading-relaxed text-stone-600">{ministry.description}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-800/10 bg-emerald-800/[0.05] px-3 py-2 text-xs font-medium text-emerald-900">
                        <SectorIcon aria-hidden="true" className="h-3.5 w-3.5 text-emerald-700" />
                        {sectorNames[sector] ?? 'Community'}
                      </span>
                      {ministry.leader && (
                        <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-amber-600/15 bg-amber-500/[0.08] px-3 py-2 text-xs font-medium text-amber-900">
                          <UserRound aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-amber-700" />
                          <span className="truncate">{ministry.leader.name}</span>
                        </span>
                      )}
                    </div>
                    <Link
                      href={href}
                      className="mt-5 inline-flex w-full items-center justify-between rounded-full border border-emerald-800/15 bg-emerald-800/[0.04] py-2 pl-4 pr-2 text-sm font-semibold text-emerald-900 transition-all duration-300 hover:border-emerald-800/20 hover:bg-emerald-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800/40 focus-visible:ring-offset-2"
                    >
                      <span>Get involved</span>
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-emerald-800 shadow-sm transition-transform duration-300 group-hover:translate-x-0.5">
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                      </span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center text-sm text-slate-500">
            No ministries match your search. Try another keyword or sector.
          </p>
        )}
      </section>
    </>
  );
}

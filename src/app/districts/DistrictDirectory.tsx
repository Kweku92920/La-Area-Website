'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Search, UserRound, Church } from 'lucide-react';
import { districtLabel, MINISTER_TBA } from '@/src/sanity/format';
import type { DistrictItem } from '@/src/sanity/queries';

export default function DistrictDirectory({ districts }: { districts: DistrictItem[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const query = searchQuery.trim().toLowerCase();
  const filteredDistricts = districts.filter((district) =>
    [
      district.name,
      districtLabel(district.name),
      district.pastor ?? '',
      ...district.assemblies.map((assembly) => assembly.name),
    ].some((value) => value.toLowerCase().includes(query)),
  );
  const visibleDistricts = showAll ? filteredDistricts : filteredDistricts.slice(0, 6);

  return (
    <>
      <div className="mb-8">
        <label htmlFor="district-search" className="sr-only">
          Search districts by name, minister, or assembly
        </label>
        <div className="relative mx-auto max-w-md">
          <Search
            aria-hidden="true"
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          />
          <input
            id="district-search"
            type="search"
            placeholder="Search districts..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 transition focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
          />
        </div>
      </div>

      <p aria-live="polite" className="mb-6 text-center text-xs font-medium text-slate-500 dark:text-slate-400">
        Showing <span className="font-bold text-slate-800 dark:text-slate-200">{visibleDistricts.length}</span> of {filteredDistricts.length}{' '}
        {filteredDistricts.length === 1 ? 'district' : 'districts'}
      </p>

      {filteredDistricts.length > 6 && (
        <div className="mb-8 flex justify-center">
          <button
            type="button"
            aria-expanded={showAll}
            onClick={() => setShowAll((current) => !current)}
            className="rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:border-[#0f172a] hover:text-[#0f172a] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-400"
          >
            {showAll ? 'SHOW FEWER' : 'ALL DISTRICTS'}
          </button>
        </div>
      )}

      {visibleDistricts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visibleDistricts.map((district) => (
            <article
              key={district.name}
              className="group overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_18px_50px_-24px_rgba(15,23,42,0.24)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_24px_60px_-22px_rgba(30,58,138,0.2)] dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-blue-500/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[radial-gradient(ellipse_at_18%_8%,rgba(59,130,246,0.25),transparent_40%),linear-gradient(135deg,#1e293b_0%,#0f172a_58%,#0a1120_100%)]">
                {district.image ? (
                  <Image
                    src={district.image}
                    alt={`${districtLabel(district.name)} community`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <div aria-hidden="true" className="absolute -right-12 -top-20 h-64 w-64 rounded-full border border-blue-500/10 bg-blue-500/[0.04] shadow-[0_0_90px_rgba(59,130,246,0.1)]" />
                    <div aria-hidden="true" className="absolute -bottom-28 -left-8 h-64 w-64 rounded-full border border-blue-400/20 bg-blue-400/[0.06]" />
                    <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.05)_50%,transparent_70%)]" />
                  </>
                )}
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-[#0f172a]/10 to-black/10" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-yellow-300">
                    District
                  </p>
                  <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-[1.7rem]">
                    {districtLabel(district.name)}
                  </h3>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex min-h-12 flex-wrap items-center gap-2">
                  <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-blue-900/15 bg-blue-900/[0.06] px-3 py-2 text-xs font-medium text-[#0f172a] dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-200">
                    <UserRound aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-blue-800 dark:text-blue-300" />
                    <span className="truncate">{district.pastor ?? MINISTER_TBA}</span>
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                    <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                    La Area
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                    <Church aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-blue-600 dark:text-blue-400" />
                    {district.assemblies.length} {district.assemblies.length === 1 ? 'assembly' : 'assemblies'}
                  </span>
                </div>

                <Link
                  href={`/assemblies?district=${encodeURIComponent(district.name)}`}
                  className="mt-5 inline-flex w-full items-center justify-between rounded-full border border-slate-200 bg-slate-50 py-2 pl-4 pr-2 text-sm font-semibold text-[#0f172a] transition-all duration-300 hover:border-[#0f172a] hover:bg-[#0f172a] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-blue-600 dark:hover:text-white"
                >
                  <span>Explore assemblies</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#0f172a] shadow-sm transition-transform duration-300 group-hover:translate-x-0.5 dark:bg-slate-900 dark:text-blue-300">
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
          No districts match your search. Try another name, minister, or assembly.
        </p>
      )}
    </>
  );
}

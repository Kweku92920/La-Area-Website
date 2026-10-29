'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  MapPin,
  Clock,
  ArrowUpRight,
  X,
  Sparkles,
} from 'lucide-react';
import { MINISTER_TBA } from '@/src/sanity/format';
import type { DirectoryAssembly, DirectoryDistrict } from '@/src/sanity/queries';
import Breadcrumb from '../components/Breadcrumb';

const FEATURED_DISTRICT_LIMIT = 2;
const FEATURED_ASSEMBLIES_PER_DISTRICT = 3;
const FEATURED_PILL_LIMIT = 4;

export default function LocalAssembliesPage({
  initialDistrict = 'All Districts',
  assemblies: assembliesData,
  districtList,
}: {
  initialDistrict?: string;
  assemblies: DirectoryAssembly[];
  districtList: DirectoryDistrict[];
}) {
  const allDistrictNames = useMemo(
    () => districtList.map((d) => d.name),
    [districtList]
  );

  const getDistrictMinister = (name: string) =>
    districtList.find((d) => d.name === name)?.minister ?? MINISTER_TBA;

  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [searchQuery, setSearchQuery] = useState('');

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const isFiltering = trimmedQuery.length > 0 || selectedDistrict !== 'All Districts';

  // Full dynamic search across all assemblies & districts when user searches or selects a district
  const matchingAssemblies = useMemo(() => {
    return assembliesData.filter((item) => {
      const matchesDistrict =
        selectedDistrict === 'All Districts' || item.district === selectedDistrict;
      const matchesSearch =
        !trimmedQuery ||
        item.name.toLowerCase().includes(trimmedQuery) ||
        item.district.toLowerCase().includes(trimmedQuery) ||
        item.location.toLowerCase().includes(trimmedQuery) ||
        item.pastor.toLowerCase().includes(trimmedQuery);

      return matchesDistrict && matchesSearch;
    });
  }, [assembliesData, selectedDistrict, trimmedQuery]);

  // Determine which districts and assemblies to render:
  // - Default (no search & 'All Districts'): small featured subset (2 districts, up to 3 assemblies each)
  // - Searching / District selected: dynamically display the relevant district(s) and matching assembly(ies)
  const displayedGroups = useMemo(() => {
    if (!isFiltering) {
      const featuredDistricts = allDistrictNames
        .filter((d) => assembliesData.some((a) => a.district === d))
        .slice(0, FEATURED_DISTRICT_LIMIT);

      return featuredDistricts.map((districtName) => ({
        districtName,
        minister: getDistrictMinister(districtName),
        assemblies: assembliesData
          .filter((a) => a.district === districtName)
          .slice(0, FEATURED_ASSEMBLIES_PER_DISTRICT),
      }));
    }

    const activeDistricts = allDistrictNames.filter((d) =>
      matchingAssemblies.some((a) => a.district === d)
    );

    return activeDistricts.map((districtName) => ({
      districtName,
      minister: getDistrictMinister(districtName),
      assemblies: matchingAssemblies.filter((a) => a.district === districtName),
    }));
  }, [isFiltering, allDistrictNames, assembliesData, matchingAssemblies, districtList]);

  // District pills to show in the filter bar (never dump all 24 districts at once)
  const visibleDistrictPills = useMemo(() => {
    const baseDistricts = allDistrictNames.slice(0, FEATURED_PILL_LIMIT);
    if (trimmedQuery) {
      const matchedDistricts = allDistrictNames.filter((d) =>
        matchingAssemblies.some((a) => a.district === d)
      );
      return matchedDistricts.slice(0, 6);
    }
    if (
      selectedDistrict !== 'All Districts' &&
      !baseDistricts.includes(selectedDistrict)
    ) {
      return [selectedDistrict, ...baseDistricts.slice(0, FEATURED_PILL_LIMIT - 1)];
    }
    return baseDistricts;
  }, [allDistrictNames, trimmedQuery, matchingAssemblies, selectedDistrict]);

  const totalDisplayedCount = useMemo(
    () => displayedGroups.reduce((acc, group) => acc + group.assemblies.length, 0),
    [displayedGroups]
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <section className="relative flex min-h-[370px] w-full items-center justify-center overflow-hidden bg-[#0f172a] px-5 py-16 text-white sm:min-h-[410px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.22),transparent_52%),radial-gradient(ellipse_at_8%_100%,rgba(15,23,42,0.6),transparent_48%)]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/40 via-[#0f172a]/20 to-[#0f172a]" />
        <div aria-hidden="true" className="absolute -right-24 -top-44 h-[28rem] w-[28rem] rounded-full border border-white/[0.07] sm:-right-10" />
        <div aria-hidden="true" className="absolute -right-12 -top-32 h-[22rem] w-[22rem] rounded-full border border-blue-400/[0.14]" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Local Assemblies' }]} />

          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Find a Local Assembly
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Search for your local assembly by name to discover its district, service times, directions, and contact details.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8 pt-16 text-center">
        <div className="mb-2 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-yellow-700 dark:text-yellow-300">
          <span className="h-px w-8 bg-yellow-500/40" />
          OUR DIRECTORY
          <span className="h-px w-8 bg-yellow-500/40" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-slate-50 md:text-4xl">
          Local Assemblies
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
          Type the name of a local assembly below to dynamically display its district and assembly profile.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        {/* Search & Compact District Filter Bar */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                aria-label="Search for a Local Assembly by name, district, location, or pastor"
                placeholder="Search local assembly by name (e.g., La Central, Bethel, Grace)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm text-slate-800 placeholder-slate-400 transition focus:border-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-blue-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear assembly search"
                  className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-slate-400 transition hover:bg-slate-200 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {visibleDistrictPills.map((dist) => {
                const isActive = selectedDistrict === dist;
                return (
                  <button
                    key={dist}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() =>
                      setSelectedDistrict((current) =>
                        current === dist ? 'All Districts' : dist
                      )
                    }
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition duration-150 ${
                      isActive
                        ? 'bg-[#0f172a] text-white shadow-sm dark:bg-blue-600'
                        : 'border border-slate-200 bg-slate-100/80 text-slate-700 hover:bg-slate-200/70 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    {dist}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Status Bar (only shown when actively searching or filtering) */}
        {isFiltering && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Found{' '}
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {totalDisplayedCount}
                </span>{' '}
                matching {totalDisplayedCount === 1 ? 'assembly' : 'assemblies'} across{' '}
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {displayedGroups.length}
                </span>{' '}
                {displayedGroups.length === 1 ? 'district' : 'districts'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDistrict('All Districts');
                }}
                className="text-xs font-bold text-blue-700 underline underline-offset-4 hover:text-[#0f172a] dark:text-yellow-400"
              >
                Clear search
              </button>
            </div>
          </div>
        )}

        {displayedGroups.length > 0 ? (
          <div className="space-y-14">
            {displayedGroups.map(({ districtName, minister, assemblies }) => (
              <div key={districtName}>
                <div className="mb-6 border-b border-slate-200 pb-3 dark:border-slate-800">
                  <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-50">
                    {districtName}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-blue-900 dark:text-yellow-300">
                    District Minister: {minister}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {assemblies.map((assembly) => (
                    <article
                      key={assembly.id}
                      className="group flex flex-col overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_18px_50px_-24px_rgba(15,23,42,0.24)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_24px_60px_-22px_rgba(30,58,138,0.2)] dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-blue-500/40"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[radial-gradient(ellipse_at_18%_8%,rgba(59,130,246,0.25),transparent_40%),linear-gradient(135deg,#1e293b_0%,#0f172a_58%,#0a1120_100%)]">
                        {assembly.image ? (
                          <Image
                            src={assembly.image}
                            alt={`${assembly.name} assembly`}
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
                        <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-[#0f172a]/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md">
                          {assembly.district}
                        </span>
                        <div className="absolute bottom-5 left-5 right-5">
                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-yellow-300">
                            Local assembly
                          </p>
                          <h4 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-[1.7rem]">
                            {assembly.name}
                          </h4>
                        </div>
                      </div>

                      <div className="flex flex-grow flex-col p-5 sm:p-6">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                            <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                            <span className="truncate">{assembly.location || 'Location to be announced'}</span>
                          </span>

                          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                            <Clock aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-blue-600 dark:text-blue-400" />
                            {assembly.time}
                          </span>
                        </div>

                        <Link
                          href={`/assemblies/${assembly.id}`}
                          className="mt-5 inline-flex w-full items-center justify-between rounded-full bg-[#0f172a] py-2 pl-4 pr-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1e293b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-500"
                        >
                          <span>View assembly details</span>
                          <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#0f172a] shadow-sm transition-transform duration-300 group-hover:translate-x-0.5">
                            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                          </span>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900/50">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No local assemblies match &ldquo;{searchQuery}&rdquo;.
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Try searching by another local assembly name, district, or location.
            </p>
          </div>
        )}
      </section>

      <section className="border-t border-slate-800 bg-[#0f172a] px-6 py-12 text-center text-white">
        <blockquote className="mx-auto max-w-3xl font-serif text-lg italic text-yellow-100/90 md:text-xl">
          &ldquo;Go into all the world and preach the gospel to every creature.&rdquo;
        </blockquote>
        <p className="mt-2 text-xs font-medium uppercase tracking-widest text-slate-400">
          &mdash; Mark 16:15
        </p>
      </section>
    </div>
  );
}

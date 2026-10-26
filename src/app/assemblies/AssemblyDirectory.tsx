'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  MapPin,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { MINISTER_TBA } from '@/src/sanity/format';
import type { DirectoryAssembly, DirectoryDistrict } from '@/src/sanity/queries';
import Breadcrumb from '../components/Breadcrumb';

export default function LocalAssembliesPage({
  initialDistrict = 'All Districts',
  assemblies: assembliesData,
  districtList,
}: {
  initialDistrict?: string;
  assemblies: DirectoryAssembly[];
  districtList: DirectoryDistrict[];
}) {
  const districts = ['All Districts', ...districtList.map((d) => d.name)];
  const getDistrictMinister = (name: string) =>
    districtList.find((d) => d.name === name)?.minister ?? MINISTER_TBA;
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssemblies = assembliesData.filter((item) => {
    const matchesDistrict =
      selectedDistrict === 'All Districts' || item.district === selectedDistrict;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pastor.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDistrict && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      {/* 1. Updated Banner with Dark Navy & Emerald Accent */}
      <section className="relative flex min-h-[370px] w-full items-center justify-center overflow-hidden bg-[#0A1120] px-5 py-16 text-white sm:min-h-[410px]">
        <div 
          aria-hidden="true" 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,185,129,0.22),transparent_52%),radial-gradient(ellipse_at_8%_100%,rgba(15,23,42,0.6),transparent_48%)]" 
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#0A1120]/40 via-[#0A1120]/20 to-[#0A1120]" />
        <div aria-hidden="true" className="absolute -right-24 -top-44 h-[28rem] w-[28rem] rounded-full border border-white/[0.07] sm:-right-10" />
        <div aria-hidden="true" className="absolute -right-12 -top-32 h-[22rem] w-[22rem] rounded-full border border-emerald-500/[0.12]" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Local Assemblies' }]} />
          
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Find a Local Assembly
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Search and discover the local assembly nearest you &mdash; service times, directions, and contact details.
          </p>
        </div>
      </section>

      {/* 2. DIRECTORY INTRO HEADER */}
      <section className="mx-auto max-w-7xl px-6 pb-8 pt-16 text-center">
        <div className="mb-2 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-300">
          <span className="h-px w-8 bg-emerald-500/40" />
          OUR DIRECTORY
          <span className="h-px w-8 bg-emerald-500/40" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-slate-50 md:text-4xl">
          Local Assemblies
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
          Discover {assembliesData.length} local assemblies across the LA Area. Filter by district or search by name, city, or pastor.
        </p>
      </section>

      {/* 3. SEARCH & FILTER SECTION */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative min-w-[240px] max-w-xs flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              aria-label="Search assemblies by name, city, or pastor"
              placeholder="Search by name, city, or pastor" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/20"
            />
          </div>

          {/* District Pill Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {districts.map((dist) => {
              const isActive = selectedDistrict === dist;
              return (
                <button
                  key={dist}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedDistrict(dist)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition duration-150 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm dark:bg-emerald-500'
                      : 'border border-slate-200 bg-slate-100/80 text-slate-700 hover:bg-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  {dist}
                </button>
              );
            })}
          </div>
        </div>

        {/* Count Label */}
        <p className="mb-8 text-xs font-medium text-slate-500 dark:text-slate-400">
          Showing <span className="font-bold text-slate-800 dark:text-slate-200">{filteredAssemblies.length}</span> assemblies
        </p>

        {/* 4. ASSEMBLIES GRID */}
        {filteredAssemblies.length > 0 ? (
          <div className="space-y-14">
            {districts.filter((d) => d !== 'All Districts' && filteredAssemblies.some((x) => x.district === d)).map((d) => (
              <div key={d}>
                <div className="mb-6 border-b border-slate-200 pb-3 dark:border-slate-800">
                  <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-50">{d}</h3>
                  <p className="mt-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    District Minister: {getDistrictMinister(d)}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredAssemblies.filter((x) => x.district === d).map((assembly) => (
                    <article 
                      key={assembly.id} 
                      className="group flex flex-col overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_18px_50px_-24px_rgba(15,23,42,0.24)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_24px_60px_-22px_rgba(16,185,129,0.2)] dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-emerald-500/40"
                    >
                      {/* Image / Header Gradient */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[radial-gradient(ellipse_at_18%_8%,rgba(16,185,129,0.25),transparent_40%),linear-gradient(135deg,#0d1f2d_0%,#091522_58%,#050b14_100%)]">
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
                            <div aria-hidden="true" className="absolute -right-12 -top-20 h-64 w-64 rounded-full border border-emerald-500/10 bg-emerald-500/[0.04] shadow-[0_0_90px_rgba(16,185,129,0.1)]" />
                            <div aria-hidden="true" className="absolute -bottom-28 -left-8 h-64 w-64 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06]" />
                            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.05)_50%,transparent_70%)]" />
                          </>
                        )}
                        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0A1120]/80 via-[#0A1120]/10 to-black/10" />
                        <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-slate-900/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md">
                          {assembly.district}
                        </span>
                        <div className="absolute bottom-5 left-5 right-5">
                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                            Local assembly
                          </p>
                          <h4 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-[1.7rem]">
                            {assembly.name}
                          </h4>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="flex flex-grow flex-col p-5 sm:p-6">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Location Badge */}
                          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                            <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                            <span className="truncate">{assembly.location || 'Location to be announced'}</span>
                          </span>

                          {/* Time Badge */}
                          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                            <Clock aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                            {assembly.time}
                          </span>

                        </div>

                        {/* Action Link */}
                        <Link 
                          href={`/assemblies/${assembly.id}`}
                          className="mt-5 inline-flex w-full items-center justify-between rounded-full border border-emerald-800/10 bg-emerald-800/[0.04] py-2 pl-4 pr-2 text-sm font-semibold text-emerald-950 transition-all duration-300 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200 dark:hover:bg-emerald-500 dark:hover:text-white"
                        >
                          <span>View assembly details</span>
                          <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-emerald-700 shadow-sm transition-transform duration-300 group-hover:translate-x-0.5 dark:bg-slate-900 dark:text-emerald-300">
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
          <p className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
            No assemblies match your search. Try another name, city, or district.
          </p>
        )}
      </section>

      {/* 5. SCRIPTURE QUOTE BANNER */}
      <section className="border-t border-slate-800 bg-slate-950 px-6 py-12 text-center text-white">
        <blockquote className="mx-auto max-w-3xl font-serif text-lg italic text-amber-100/90 md:text-xl">
          &ldquo;Go into all the world and preach the gospel to every creature.&rdquo;
        </blockquote>
        <p className="mt-2 text-xs font-medium uppercase tracking-widest text-slate-400">
          &mdash; Mark 16:15
        </p>
      </section>
    </div>
  );
}

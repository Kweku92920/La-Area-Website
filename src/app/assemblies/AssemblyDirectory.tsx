'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  MapPin,
  Clock,
  UserRound,
  ArrowUpRight,
} from 'lucide-react';
import { MINISTER_TBA } from '@/src/sanity/format';
import type { DirectoryAssembly, DirectoryDistrict } from '@/src/sanity/queries';

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
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 font-sans">
      <section className="relative flex min-h-[370px] w-full items-center justify-center overflow-hidden bg-[#1C0D0D] px-5 py-16 text-white sm:min-h-[410px]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(184,134,11,0.24),transparent_52%),radial-gradient(ellipse_at_8%_100%,rgba(139,38,33,0.38),transparent_48%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#1C0D0D]/35 via-[#1C0D0D]/20 to-[#1C0D0D]" />
        <div aria-hidden="true" className="absolute -right-24 -top-44 h-[28rem] w-[28rem] rounded-full border border-white/[0.07] sm:-right-10" />
        <div aria-hidden="true" className="absolute -right-12 -top-32 h-[22rem] w-[22rem] rounded-full border border-amber-200/[0.08]" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-200 backdrop-blur-md sm:text-xs">
            <Link href="/" className="transition hover:text-amber-300">Home</Link>
            <span aria-hidden="true" className="text-white/40">/</span>
            <span className="text-white">Local Assemblies</span>
          </div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-amber-300 sm:text-xs">
            Find your church community
          </p>
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Find a Local Assembly
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-stone-300 sm:text-base">
            Search and discover the local assembly nearest you &mdash; service times, directions, and contact details.
          </p>
        </div>
      </section>

      {/* 4. DIRECTORY INTRO HEADER */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-8 text-center">
        <div className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-[#B8860B] mb-2">
          <span className="w-8 h-[1px] bg-[#B8860B]/40"></span>
          OUR DIRECTORY
          <span className="w-8 h-[1px] bg-[#B8860B]/40"></span>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1C0D0D]">
          Local Assemblies
        </h2>
        <p className="text-stone-600 text-sm md:text-base max-w-lg mx-auto mt-3 leading-relaxed">
          Discover {assembliesData.length} local assemblies across the LA Area. Filter by district or search by name, city, or pastor.
        </p>
      </section>

      {/* 5. SEARCH & FILTER SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px] max-w-xs">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input 
              type="text" 
              aria-label="Search assemblies by name, city, or pastor"
              placeholder="Search by name, city, or pastor" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F5EFEC] text-stone-800 placeholder-stone-400 pl-10 pr-4 py-2.5 rounded-full text-xs border border-stone-200/80 focus:outline-none focus:border-[#8B2621] transition"
            />
          </div>

          {/* District Pill Filters */}
          <div className="flex items-center flex-wrap gap-2">
            {districts.map((dist) => {
              const isActive = selectedDistrict === dist;
              return (
                <button
                  key={dist}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedDistrict(dist)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition duration-150 ${
                    isActive
                      ? 'bg-[#8B2621] text-white shadow-sm'
                      : 'bg-[#F5EFEC] text-stone-700 hover:bg-stone-200/70 border border-stone-200/60'
                  }`}
                >
                  {dist}
                </button>
              );
            })}
          </div>
        </div>

        {/* Count Label */}
        <p className="text-xs text-stone-500 mb-8 font-medium">
          Showing <span className="font-bold text-stone-800">{filteredAssemblies.length}</span> assemblies
        </p>

        {/* 6. ASSEMBLIES GRID */}
        {filteredAssemblies.length > 0 ? (
          <div className="space-y-14">
            {districts.filter((d) => d !== 'All Districts' && filteredAssemblies.some((x) => x.district === d)).map((d) => (
              <div key={d}>
                <div className="mb-6 border-b border-stone-200 pb-3">
                  <h3 className="font-serif text-2xl font-bold text-[#1C0D0D]">{d}</h3>
                  <p className="mt-1 text-xs font-semibold text-[#8B2621]">District Minister: {getDistrictMinister(d)}</p>
                </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAssemblies.filter((x) => x.district === d).map((assembly) => (
            <div 
              key={assembly.id} 
              className="group overflow-hidden rounded-[1.6rem] border border-white/80 bg-white/75 shadow-[0_18px_50px_-24px_rgba(50,35,28,0.24)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white hover:shadow-[0_24px_60px_-22px_rgba(50,35,28,0.3)] flex flex-col"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[radial-gradient(ellipse_at_18%_8%,rgba(255,255,255,0.28),transparent_38%),linear-gradient(135deg,#31514a_0%,#1e3433_58%,#171821_100%)]">
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
                    <div aria-hidden="true" className="absolute -right-12 -top-20 h-64 w-64 rounded-full border border-white/10 bg-white/[0.04] shadow-[0_0_90px_rgba(218,175,112,0.16)]" />
                    <div aria-hidden="true" className="absolute -bottom-28 -left-8 h-64 w-64 rounded-full border border-[#d9b777]/25 bg-[#d9b777]/[0.08]" />
                    <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.08)_50%,transparent_70%)]" />
                  </>
                )}
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#101715]/80 via-[#101715]/10 to-black/10" />
                <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md">
                  {assembly.district}
                </span>
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">
                    Local assembly
                  </p>
                  <h4 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-[1.7rem]">
                    {assembly.name}
                  </h4>
                </div>
              </div>

              <div className="flex flex-grow flex-col p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-stone-200/80 bg-stone-50/90 px-3 py-2 text-xs font-medium text-stone-600">
                    <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                    <span className="truncate">{assembly.location || 'Location to be announced'}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#B8860B]/15 bg-[#B8860B]/[0.08] px-3 py-2 text-xs font-medium text-[#795812]">
                    <Clock aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                    {assembly.time}
                  </span>
                  <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#8B2621]/10 bg-[#8B2621]/[0.06] px-3 py-2 text-xs font-medium text-[#70221e]">
                    <UserRound aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#8B2621]" />
                    <span className="truncate">{assembly.pastor || MINISTER_TBA}</span>
                  </span>
                </div>

                <Link 
                  href={`/assemblies/${assembly.id}`}
                  className="mt-5 inline-flex w-full items-center justify-between rounded-full border border-[#8B2621]/10 bg-[#8B2621]/[0.04] py-2 pl-4 pr-2 text-sm font-semibold text-[#70221e] transition-all duration-300 hover:border-[#8B2621]/20 hover:bg-[#8B2621] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2621]/40 focus-visible:ring-offset-2"
                >
                  <span>View assembly details</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#8B2621] shadow-sm transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>
            ))}
          </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-600">
            No assemblies match your search. Try another name, city, or district.
          </p>
        )}
      </section>

      {/* 7. SCRIPTURE QUOTE BANNER */}
      <section className="bg-[#180A0A] text-white py-12 px-6 text-center border-t border-white/10">
        <blockquote className="font-serif italic text-lg md:text-xl text-amber-100/90 max-w-3xl mx-auto">
          &ldquo;Go into all the world and preach the gospel to every creature.&rdquo;
        </blockquote>
        <p className="text-xs tracking-widest uppercase text-stone-400 mt-2 font-medium">
          &mdash; Mark 16:15
        </p>
      </section>

    </div>
  );
}

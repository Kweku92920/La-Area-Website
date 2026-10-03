'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  MapPin,
  Clock,
  ArrowRight,
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
      {/* HERO BANNER SECTION */}
      <section className="relative h-[380px] w-full flex items-center justify-center bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-45 mix-blend-overlay">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/30 via-stone-900 to-[#1C0D0D]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C0D0D] via-black/40 to-[#1C0D0D]/60 z-0" />

        <div className="relative z-10 text-center px-4 max-w-3xl">
          <div className="text-xs uppercase tracking-widest text-stone-300 mb-3 flex items-center justify-center gap-2 font-medium">
            <Link href="/" className="">Home</Link> 
            <span>&rsaquo;</span> 
            <span className="text-stone-100">Local Assemblies</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            Find a Local Assembly
          </h1>
          <p className="text-stone-300 text-sm md:text-base font-normal max-w-xl mx-auto leading-relaxed">
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
              className="bg-[#F6F2EC] rounded-2xl overflow-hidden border border-stone-200/70 hover:shadow-md transition duration-200 flex flex-col"
            >
              {/* Image Container with Badge */}
              <div className="aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-emerald-950 to-stone-800 relative flex items-center justify-center">
                {assembly.image ? (
                  <Image
                    src={assembly.image}
                    alt={`${assembly.name} assembly`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-center text-emerald-50/90">
                    <MapPin className="h-8 w-8 text-amber-400" aria-hidden="true" />
                    <span className="text-sm font-semibold">{assembly.location}</span>
                  </div>
                )}
                <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm text-stone-800 text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                  {assembly.district}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-serif font-bold text-xl text-[#1C0D0D] mb-3">
                  {assembly.name}
                </h3>

                <div className="space-y-2 text-xs text-stone-600 mb-6 flex-grow">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{assembly.location}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1 text-stone-500">
                    <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{assembly.time}</span>
                  </div>
                </div>

                <Link 
                  href={`/assemblies/${assembly.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B2621] hover:text-[#721F1B] transition pt-2 border-t border-stone-200/60"
                >
                  View details <ArrowRight className="w-3.5 h-3.5" />
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

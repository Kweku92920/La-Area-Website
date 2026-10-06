'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Search, Users, UserRound } from 'lucide-react';
import { districtLabel, MINISTER_TBA } from '@/src/sanity/format';
import type { DistrictItem } from '@/src/sanity/queries';

export default function DistrictDirectory({ districts }: { districts: DistrictItem[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const query = searchQuery.trim().toLowerCase();
  const filteredDistricts = districts.filter((district) =>
    [
      district.name,
      districtLabel(district.name),
      district.pastor ?? '',
      ...district.assemblies.map((assembly) => assembly.name),
    ].some((value) => value.toLowerCase().includes(query)),
  );

  return (
    <>
      <div className="mb-8">
        <label htmlFor="district-search" className="sr-only">
          Search districts by name, minister, or assembly
        </label>
        <div className="relative mx-auto max-w-md">
          <Search
            aria-hidden="true"
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
          />
          <input
            id="district-search"
            type="search"
            placeholder="Search districts..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full rounded-full border border-stone-200/80 bg-white py-3 pl-11 pr-4 text-sm text-stone-800 placeholder-stone-400 transition focus:border-[#8B2621] focus:outline-none focus:ring-2 focus:ring-[#8B2621]/20"
          />
        </div>
      </div>

      <p aria-live="polite" className="mb-6 text-center text-xs font-medium text-stone-500">
        Showing <span className="font-bold text-stone-800">{filteredDistricts.length}</span>{' '}
        {filteredDistricts.length === 1 ? 'district' : 'districts'}
      </p>

      {filteredDistricts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredDistricts.map((district) => (
            <article
              key={district.name}
              className="group overflow-hidden rounded-[1.6rem] border border-white/80 bg-white/75 shadow-[0_18px_50px_-24px_rgba(50,35,28,0.24)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white hover:shadow-[0_24px_60px_-22px_rgba(50,35,28,0.3)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[radial-gradient(ellipse_at_18%_8%,rgba(255,255,255,0.28),transparent_38%),linear-gradient(135deg,#762d27_0%,#3d1c20_58%,#171821_100%)]">
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
                    <div aria-hidden="true" className="absolute -right-12 -top-20 h-64 w-64 rounded-full border border-white/10 bg-white/[0.04] shadow-[0_0_90px_rgba(218,175,112,0.16)]" />
                    <div aria-hidden="true" className="absolute -bottom-28 -left-8 h-64 w-64 rounded-full border border-[#d9b777]/25 bg-[#d9b777]/[0.08]" />
                    <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.08)_50%,transparent_70%)]" />
                  </>
                )}
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#160f14]/80 via-[#160f14]/10 to-black/10" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">
                    District
                  </p>
                  <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-[1.7rem]">
                    {districtLabel(district.name)}
                  </h3>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex min-h-12 flex-wrap items-center gap-2">
                  <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#8B2621]/10 bg-[#8B2621]/[0.06] px-3 py-2 text-xs font-medium text-[#70221e]">
                    <UserRound aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#8B2621]" />
                    <span className="truncate">{district.pastor ?? MINISTER_TBA}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-stone-200/80 bg-stone-50/90 px-3 py-2 text-xs font-medium text-stone-600">
                    <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                    LA Area
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#B8860B]/15 bg-[#B8860B]/[0.08] px-3 py-2 text-xs font-medium text-[#795812]">
                    <Users aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                    {district.assemblies.length} {district.assemblies.length === 1 ? 'assembly' : 'assemblies'}
                  </span>
                </div>

                <Link
                  href={`/assemblies?district=${encodeURIComponent(district.name)}`}
                  className="mt-5 inline-flex w-full items-center justify-between rounded-full border border-[#8B2621]/10 bg-[#8B2621]/[0.04] py-2 pl-4 pr-2 text-sm font-semibold text-[#70221e] transition-all duration-300 hover:border-[#8B2621]/20 hover:bg-[#8B2621] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2621]/40 focus-visible:ring-offset-2"
                >
                  <span>Explore assemblies</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#8B2621] shadow-sm transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-sm text-stone-500">
          No districts match your search. Try another name, minister, or assembly.
        </p>
      )}
    </>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Search, Users } from 'lucide-react';
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
              className="rounded-2xl border border-stone-200/70 bg-[#F6F2EC] p-6 transition hover:shadow-md"
            >
              <h3 className="font-serif text-xl font-bold text-[#1C0D0D]">
                {districtLabel(district.name)}
              </h3>
              <p className="mt-2 text-xs font-semibold text-[#8B2621]">
                {district.pastor ?? MINISTER_TBA}
              </p>
              <div className="mt-5 space-y-3 text-xs text-stone-600">
                <div className="flex items-start gap-2">
                  <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
                  <span>LA Area</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users aria-hidden="true" className="h-4 w-4 shrink-0 text-stone-400" />
                  <span>{district.assemblies.length} local assemblies</span>
                </div>
                <ul className="ml-6 list-disc space-y-1 marker:text-[#B8860B]">
                  {district.assemblies.map((assembly) => (
                    <li key={assembly.slug}>{assembly.name}</li>
                  ))}
                </ul>
              </div>
              <Link
                href={`/assemblies?district=${encodeURIComponent(district.name)}`}
                className="mt-6 inline-flex w-full items-center gap-1.5 border-t border-stone-200/70 pt-4 text-xs font-semibold text-[#8B2621] transition hover:text-[#721F1B]"
              >
                View assemblies <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
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

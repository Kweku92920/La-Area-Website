import Link from 'next/link';
import { sanityFetch } from '@/src/sanity/client';
import { districtsQuery, type DistrictItem } from '@/src/sanity/queries';
import DistrictDirectory from './DistrictDirectory';


export default async function DistrictListPage() {
  const districts = await sanityFetch<DistrictItem[]>(districtsQuery);
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 font-sans">
      <section className="relative flex min-h-[370px] items-center justify-center overflow-hidden bg-[#1C0D0D] px-5 py-16 text-white sm:min-h-[410px]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(184,134,11,0.24),transparent_52%),radial-gradient(ellipse_at_8%_100%,rgba(139,38,33,0.38),transparent_48%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#1C0D0D]/35 via-[#1C0D0D]/20 to-[#1C0D0D]" />
        <div aria-hidden="true" className="absolute -left-28 -top-44 h-[28rem] w-[28rem] rounded-full border border-white/[0.07]" />
        <div aria-hidden="true" className="absolute -left-12 -top-32 h-[22rem] w-[22rem] rounded-full border border-amber-200/[0.08]" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-200 backdrop-blur-md sm:text-xs">
            <Link href="/" className="transition hover:text-amber-300">Home</Link>
            <span aria-hidden="true" className="text-white/40">/</span>
            <span className="text-white">Districts</span>
          </div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-amber-300 sm:text-xs">
            The Church of Pentecost · LA Area
          </p>
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            La Area Districts
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-stone-300 sm:text-base">
            Explore the districts that serve and support local assemblies across
            The Church Of Pentecost La Area.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-[#B8860B] mb-2">
            <span className="w-8 h-[1px] bg-[#B8860B]/40" />
            AREA STRUCTURE
            <span className="w-8 h-[1px] bg-[#B8860B]/40" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1C0D0D]">
            {districts.length} Districts, One Mission
          </h2>
          <p className="text-stone-600 text-sm md:text-base mt-3 leading-relaxed">
            Each district provides pastoral care, coordination, and support for
            the local assemblies in its region.
          </p>
        </div>

        <DistrictDirectory districts={districts} />
      </section>
    </div>
  );
}

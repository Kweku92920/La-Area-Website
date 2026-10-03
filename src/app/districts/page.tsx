import Link from 'next/link';
import { sanityFetch } from '@/src/sanity/client';
import { districtsQuery, type DistrictItem } from '@/src/sanity/queries';
import DistrictDirectory from './DistrictDirectory';


export default async function DistrictListPage() {
  const districts = await sanityFetch<DistrictItem[]>(districtsQuery);
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 font-sans">
      <section className="relative h-[360px] flex items-center justify-center bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <div className="text-xs uppercase tracking-widest text-slate-300 mb-3 flex items-center justify-center gap-2 font-medium">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>&rsaquo;</span>
            <span className="text-slate-100">Districts</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            La Area Districts
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
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

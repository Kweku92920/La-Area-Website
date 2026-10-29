import { sanityFetch } from '@/src/sanity/fetch';
import { districtsQuery, type DistrictItem } from '@/src/sanity/queries';
import DistrictDirectory from './DistrictDirectory';
import Breadcrumb from '../components/Breadcrumb';

export default async function DistrictListPage() {
  const districts = await sanityFetch<DistrictItem[]>(districtsQuery);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <section className="relative flex min-h-[370px] w-full items-center justify-center overflow-hidden bg-[#0f172a] px-5 py-16 text-white sm:min-h-[410px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.22),transparent_52%),radial-gradient(ellipse_at_8%_100%,rgba(15,23,42,0.6),transparent_48%)]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/40 via-[#0f172a]/20 to-[#0f172a]" />
        <div aria-hidden="true" className="absolute -left-28 -top-44 h-[28rem] w-[28rem] rounded-full border border-white/[0.07]" />
        <div aria-hidden="true" className="absolute -left-12 -top-32 h-[22rem] w-[22rem] rounded-full border border-blue-400/[0.14]" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Districts' }]} />

          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            La Area Districts
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Explore the districts that serve and support local assemblies across
            The Church Of Pentecost La Area.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-2 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-yellow-700 dark:text-yellow-300">
            <span className="h-px w-8 bg-yellow-500/40" />
            AREA STRUCTURE
            <span className="h-px w-8 bg-yellow-500/40" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-slate-50 md:text-4xl">
            {districts.length} Districts, One Mission
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
            Each district provides pastoral care, coordination, and support for
            the local assemblies in its region.
          </p>
        </div>

        <DistrictDirectory districts={districts} />
      </section>
    </div>
  );
}

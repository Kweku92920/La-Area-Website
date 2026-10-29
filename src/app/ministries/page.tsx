import { sanityFetch } from '@/src/sanity/fetch';
import { ministriesQuery, type MinistryItem } from '@/src/sanity/queries';
import MinistriesDirectory from './MinistriesDirectory';
import Breadcrumb from '../components/Breadcrumb';

export default async function MinistriesPage() {
  const ministriesData = await sanityFetch<MinistryItem[]>(ministriesQuery);
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <section className="relative isolate flex min-h-[460px] items-end overflow-hidden bg-[#0f172a] text-white md:min-h-[520px]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center opacity-45"
            style={{ backgroundImage: "url('/theme.jpg')" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),transparent_32%),linear-gradient(120deg,_rgba(15,23,42,0.88),_rgba(15,23,42,0.68),_rgba(10,17,32,0.85))]" />
          <div className="absolute -left-16 top-10 h-48 w-48 rounded-full bg-amber-400/15 blur-3xl" />
          <div className="absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-blue-400/15 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 text-left sm:px-6 md:pb-20 lg:px-8">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Ministries' }]} />
          <p className="mb-4 max-w-md text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
            Find your place to serve
          </p>
          <h1 className="mb-4 max-w-3xl font-serif text-5xl font-bold tracking-tight text-white md:text-7xl">
            Our Ministries
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-200 md:text-lg">
            Discover opportunities to grow in faith, serve, and build community across the La Area.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <div className="mb-2 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-300">
            <span className="h-px w-8 bg-amber-500/40" />
            Serve &amp; Belong
            <span className="h-px w-8 bg-amber-500/40" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-slate-50 md:text-4xl">
            A Ministry for Everyone
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
            Explore the ways to connect, grow, and serve in the La Area.
          </p>
        </div>

        <MinistriesDirectory ministries={ministriesData} />
      </section>
    </div>
  );
}

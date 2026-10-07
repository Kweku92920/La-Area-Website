import Link from 'next/link';
import { sanityFetch } from '@/src/sanity/client';
import { ministriesQuery, type MinistryItem } from '@/src/sanity/queries';
import MinistriesDirectory from './MinistriesDirectory';

export default async function MinistriesPage() {
  const ministriesData = await sanityFetch<MinistryItem[]>(ministriesQuery);
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800">
      <section className="relative isolate flex min-h-[420px] items-center justify-center overflow-hidden bg-stone-950 text-white md:min-h-[460px]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{ backgroundImage: "url('/theme.jpg')" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.2),transparent_28%),linear-gradient(120deg,_rgba(17,24,39,0.9),_rgba(17,24,39,0.82),_rgba(28,13,13,0.92))]" />
          <div className="absolute -left-16 top-10 h-48 w-48 rounded-full bg-amber-400/15 blur-3xl" />
          <div className="absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-200 backdrop-blur-sm">
            <Link href="/" className="transition hover:text-amber-300">Home</Link>
            <span aria-hidden="true" className="text-stone-400">/</span>
            <span className="text-white">Ministries</span>
          </p>
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight text-white md:text-6xl">
            Our Ministries
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-stone-200 md:text-base">
            Discover opportunities to grow in faith, serve, and build community across the La Area.
          </p>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-2 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-[#B8860B]">
            <span className="h-px w-8 bg-[#B8860B]/40" />
            Serve &amp; Belong
            <span className="h-px w-8 bg-[#B8860B]/40" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#1C0D0D] md:text-4xl">A Ministry for Everyone</h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600 md:text-base">
            Explore the ways to connect, grow, and serve in the La Area.
          </p>
        </div>

        <MinistriesDirectory ministries={ministriesData} />
      </section>
    </div>
  );
}
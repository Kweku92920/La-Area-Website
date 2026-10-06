import Link from 'next/link';
import { sanityFetch } from '@/src/sanity/client';
import { ministriesQuery, type MinistryItem } from '@/src/sanity/queries';
import MinistriesDirectory from './MinistriesDirectory';

export default async function MinistriesPage() {
  const ministriesData = await sanityFetch<MinistryItem[]>(ministriesQuery);
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800">
      <section className="relative flex h-[340px] items-center justify-center overflow-hidden bg-stone-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/30 via-stone-900 to-[#1C0D0D]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C0D0D] via-black/40 to-[#1C0D0D]/60" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-stone-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">&rsaquo;</span>
            <span className="text-white">Ministries</span>
          </p>
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight md:text-6xl">Our Ministries</h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-stone-300 md:text-base">
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
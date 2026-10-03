import Link from 'next/link';
import { sanityFetch } from '@/src/sanity/client';
import { ministriesQuery, type MinistryItem } from '@/src/sanity/queries';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const ministryPages: Record<string, string> = {
  'youth-ministry': '/youth',
  'womens-ministry': '/women',
  'mens-ministry': '/men',
  'childrens-ministry': '/children',
};

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

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8">
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ministriesData.map((ministry) => (
            <div
              key={ministry.id}
              id={ministry.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/70 bg-white shadow-sm transition hover:shadow-md"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-stone-100">
                  {ministry.image ? (
                    <Image
                      src={ministry.image}
                      alt={ministry.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-stone-200" aria-hidden="true" />
                  )}
                </div>

                <div className="space-y-2 p-6">
                  <h3 className="font-serif text-xl font-bold text-[#1C0D0D]">{ministry.title}</h3>
                  <p className="text-sm leading-relaxed text-stone-600">{ministry.description}</p>
                </div>
                {ministry.leader && (
                  <div className="mx-6 mb-5 flex items-center gap-3 border-t border-stone-200 pt-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-emerald-950 to-stone-800">
                      {ministry.leader.photo ? (
                        <Image
                          src={ministry.leader.photo}
                          alt={ministry.leader.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="flex h-full items-center justify-center font-serif font-bold text-amber-100">
                          {ministry.leader.name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('')}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#1C0D0D]">{ministry.leader.name}</p>
                      <p className="truncate text-xs text-[#8B2621]">{ministry.leader.role}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 pb-6 pt-2">
                {ministryPages[ministry.id] ? (
                  <Link
                    href={ministryPages[ministry.id]}
                    className="group inline-flex items-center text-sm font-bold text-[#8B2621] transition-colors hover:text-[#721F1B]"
                  >
                    Get involved
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                ) : (
                  <a
                    href={`mailto:info@coplaarea.org?subject=${encodeURIComponent(`Getting involved: ${ministry.title}`)}`}
                    className="group inline-flex items-center text-sm font-bold text-[#8B2621] transition-colors hover:text-[#721F1B]"
                  >
                    Get involved
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
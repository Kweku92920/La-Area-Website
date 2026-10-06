import Link from 'next/link';
import Image from 'next/image';
import { MapPin, UserRound } from 'lucide-react';
import { sanityFetch } from '@/src/sanity/client';
import { leadersQuery, type Leader } from '@/src/sanity/queries';


export default async function LeadershipPage() {
  const leaders = await sanityFetch<Leader[]>(leadersQuery);
  return (
    <div className="min-h-screen bg-[#FAF8F5] font-sans text-slate-800">
      <section className="relative flex min-h-[370px] w-full items-center justify-center overflow-hidden bg-[#1C0D0D] px-5 py-16 text-white sm:min-h-[410px]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(184,134,11,0.24),transparent_52%),radial-gradient(ellipse_at_8%_100%,rgba(139,38,33,0.38),transparent_48%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#1C0D0D]/35 via-[#1C0D0D]/20 to-[#1C0D0D]" />
        <div aria-hidden="true" className="absolute -right-24 -top-44 h-[28rem] w-[28rem] rounded-full border border-white/[0.07] sm:-right-10" />
        <div aria-hidden="true" className="absolute -right-12 -top-32 h-[22rem] w-[22rem] rounded-full border border-amber-200/[0.08]" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-200 backdrop-blur-md sm:text-xs">
            <Link href="/" className="transition hover:text-amber-300">Home</Link>
            <span aria-hidden="true" className="text-white/40">/</span>
            <span className="text-white">Leadership</span>
          </div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-amber-300 sm:text-xs">
            The Church of Pentecost · LA Area
          </p>
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Our Leadership</h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-stone-300 sm:text-base md:text-lg">
            Faithful servants called to shepherd, equip, and serve the people of God.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-16 text-center">
        <div className="mb-2 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-[#B8860B]">
          <span className="h-px w-8 bg-[#B8860B]/40" />
          Servant Leaders
          <span className="h-px w-8 bg-[#B8860B]/40" />
        </div>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-stone-600 md:text-base">
          Our leaders are committed to shepherding the La Area with humility, wisdom, and a heart for the Gospel.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {leaders.map((leader) => (
            <article
              key={leader._id}
              className="group flex flex-col overflow-hidden rounded-[1.6rem] border border-white/80 bg-white/75 shadow-[0_18px_50px_-24px_rgba(50,35,28,0.24)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white hover:shadow-[0_24px_60px_-22px_rgba(50,35,28,0.3)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[radial-gradient(ellipse_at_18%_8%,rgba(255,255,255,0.28),transparent_38%),linear-gradient(135deg,#762d27_0%,#3d1c20_58%,#171821_100%)]">
                {leader.photo ? (
                  <Image
                    src={leader.photo}
                    alt={leader.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <div aria-hidden="true" className="absolute -right-12 -top-20 h-64 w-64 rounded-full border border-white/10 bg-white/[0.04] shadow-[0_0_90px_rgba(218,175,112,0.16)]" />
                    <div aria-hidden="true" className="absolute -bottom-28 -left-8 h-64 w-64 rounded-full border border-[#d9b777]/25 bg-[#d9b777]/[0.08]" />
                    <span aria-hidden="true" className="absolute inset-0 grid place-items-center font-serif text-5xl font-semibold tracking-widest text-white/80">
                      {leader.name.split(' ').filter((part) => part !== 'Pastor').map((part) => part[0]).join('').slice(0, 2)}
                    </span>
                  </>
                )}
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#160f14]/65 via-transparent to-black/10" />
              </div>

              <div className="flex flex-grow flex-col p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#8B2621]/10 bg-[#8B2621]/[0.06] px-3 py-2 text-xs font-medium text-[#70221e]">
                    <UserRound aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#8B2621]" />
                    <span className="truncate">{leader.role}</span>
                  </span>
                  {leader.location && (
                    <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-stone-200/80 bg-stone-50/90 px-3 py-2 text-xs font-medium text-stone-600">
                      <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                      <span className="truncate">{leader.location}</span>
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight text-[#1C0D0D]">
                  {leader.name}
                </h3>
                {leader.bio && (
                  <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-stone-600">
                    {leader.bio}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#180A0A] px-6 py-12 text-center text-white">
        <blockquote className="mx-auto max-w-3xl font-serif text-lg italic text-amber-100/90 md:text-xl">
          “Go into all the world and preach the gospel to every creature.”
        </blockquote>
        <p className="mt-2 text-xs font-medium uppercase tracking-widest text-stone-400">— Mark 16:15</p>
      </section>
    </div>
  );
}

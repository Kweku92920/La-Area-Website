import Image from 'next/image';
import { MapPin, UserRound } from 'lucide-react';
import { sanityFetch } from '@/src/sanity/fetch';
import { leadersQuery, type Leader } from '@/src/sanity/queries';
import Breadcrumb from '../components/Breadcrumb';

export default async function LeadershipPage() {
  const leaders = await sanityFetch<Leader[]>(leadersQuery);
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <section className="relative flex min-h-[370px] w-full items-center justify-center overflow-hidden bg-[#0f172a] px-5 py-16 text-white sm:min-h-[410px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.22),transparent_52%),radial-gradient(ellipse_at_8%_100%,rgba(15,23,42,0.6),transparent_48%)]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/40 via-[#0f172a]/20 to-[#0f172a]" />
        <div aria-hidden="true" className="absolute -right-24 -top-44 h-[28rem] w-[28rem] rounded-full border border-white/[0.07] sm:-right-10" />
        <div aria-hidden="true" className="absolute -right-12 -top-32 h-[22rem] w-[22rem] rounded-full border border-blue-400/[0.14]" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Leadership' }]} />
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Our Leadership
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base md:text-lg">
            Faithful servants called to shepherd, equip, and serve the people of God under La Area.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-16 text-center">
        <div className="mb-2 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-yellow-700 dark:text-yellow-300">
          <span className="h-px w-8 bg-yellow-500/40" />
          Servant Leaders
          <span className="h-px w-8 bg-yellow-500/40" />
        </div>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
          Our leaders are committed to shepherding the La Area with humility, wisdom, and a heart for the Gospel.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {leaders.map((leader) => (
            <article
              key={leader._id}
              className="group flex flex-col overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_18px_50px_-24px_rgba(15,23,42,0.24)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_24px_60px_-22px_rgba(30,58,138,0.22)] dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-blue-500/40"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[radial-gradient(ellipse_at_18%_8%,rgba(59,130,246,0.24),transparent_40%),linear-gradient(135deg,#1e293b_0%,#0f172a_58%,#0a1120_100%)]">
                {leader.photo ? (
                  <Image
                    src={leader.photo}
                    alt={leader.photoAlt || leader.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <div aria-hidden="true" className="absolute -right-12 -top-20 h-64 w-64 rounded-full border border-blue-500/10 bg-blue-500/[0.04] shadow-[0_0_90px_rgba(59,130,246,0.1)]" />
                    <div aria-hidden="true" className="absolute -bottom-28 -left-8 h-64 w-64 rounded-full border border-blue-400/20 bg-blue-400/[0.06]" />
                    <span aria-hidden="true" className="absolute inset-0 grid place-items-center font-serif text-5xl font-semibold tracking-widest text-slate-200">
                      {leader.name
                        .split(' ')
                        .filter((part) => part !== 'Pastor')
                        .map((part) => part[0])
                        .join('')
                        .slice(0, 2)}
                    </span>
                  </>
                )}
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/75 via-transparent to-black/10" />
              </div>

              <div className="flex flex-grow flex-col p-5 sm:p-6">
                <h3 className="text-xl font-semibold leading-snug tracking-tight text-slate-900 dark:text-slate-50">
                  {leader.name}
                </h3>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {leader.location && (
                    <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                      <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">{leader.location}</span>
                    </span>
                  )}
                  {leader.role && (
                    <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-blue-900/15 bg-blue-900/[0.06] px-3 py-1.5 text-xs font-medium text-[#0f172a] dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-200">
                      <UserRound aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-blue-800 dark:text-blue-300" />
                      <span className="truncate">{leader.role}</span>
                    </span>
                  )}
                </div>

                {leader.bio && (
                  <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {leader.bio}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-800 bg-[#0f172a] px-6 py-12 text-center text-white">
        <blockquote className="mx-auto max-w-3xl font-serif text-lg italic text-yellow-100/90 md:text-xl">
          “Go into all the world and preach the gospel to every creature.”
        </blockquote>
        <p className="mt-2 text-xs font-medium uppercase tracking-widest text-slate-400">— Mark 16:15</p>
      </section>
    </div>
  );
}

import Image from 'next/image';
import type { MinistryLeaderProfile as Leader } from '@/src/sanity/queries';

export default function MinistryLeaderProfile({
  ministryTitle,
  leader,
}: {
  ministryTitle: string;
  leader: Leader | null;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-[#B8860B]">
          Ministry Leadership
        </p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-[#1C0D0D]">
          {ministryTitle} Leader
        </h2>
      </div>

      {leader ? (
        <article className="grid overflow-hidden rounded-2xl border border-stone-200/70 bg-[#F6F2EC] md:grid-cols-[minmax(220px,0.8fr)_1.2fr]">
          <div className="relative aspect-[4/3] bg-gradient-to-br from-emerald-950 to-stone-800 md:aspect-auto md:min-h-72">
            {leader.photo ? (
              <Image
                src={leader.photo}
                alt={leader.name}
                fill
                sizes="(min-width: 768px) 35vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full min-h-64 items-center justify-center">
                <span aria-hidden="true" className="font-serif text-5xl font-bold tracking-widest text-amber-100/80">
                  {leader.name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('')}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center p-6 md:p-9">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8B2621]">
              {leader.role}
            </p>
            <h3 className="mt-2 font-serif text-2xl font-bold text-[#1C0D0D] md:text-3xl">
              {leader.name}
            </h3>
            {leader.location && (
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-stone-400">
                {leader.location}
              </p>
            )}
            {leader.bio && (
              <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-stone-600">
                {leader.bio}
              </p>
            )}
          </div>
        </article>
      ) : (
        <p className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-8 text-sm text-stone-500">
          The {ministryTitle} leader profile will appear here once it has been added in the ministry settings.
        </p>
      )}
    </section>
  );
}

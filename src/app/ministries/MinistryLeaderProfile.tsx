import Image from 'next/image';
import { UserRound } from 'lucide-react';
import type {
  MinistryLeaderProfile as Leader,
  MinistryRoleProfile,
} from '@/src/sanity/queries';

type Profile = Leader | MinistryRoleProfile;

export default function MinistryLeaderProfile({
  ministryTitle,
  leader,
  leadership,
}: {
  ministryTitle: string;
  leader: Leader | null;
  leadership?: { title: string; profile: Profile | null }[];
}) {
  const profiles = leadership ?? (leader ? [{ title: leader.role, profile: leader }] : []);

  if (profiles.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 sm:pb-20">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
          Servant leadership
        </p>
        <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {ministryTitle} Leadership
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
          Meet the leaders serving and equipping this ministry across the LA Area.
        </p>
      </div>

      <div className={`grid grid-cols-1 gap-5 ${profiles.length > 1 ? 'md:grid-cols-2 xl:grid-cols-3' : 'max-w-4xl'}`}>
        {profiles.map(({ title, profile }) => (
          <article
            key={title}
            className="group overflow-hidden rounded-[1.6rem] border border-white/80 bg-white/80 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.24)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-22px_rgba(15,23,42,0.3)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[radial-gradient(ellipse_at_18%_8%,rgba(245,158,11,0.15),transparent_38%),linear-gradient(135deg,#334155_0%,#1e293b_58%,#0f172a_100%)]">
              {profile && ('image' in profile ? profile.image : profile.photo) ? (
                <Image
                  src={('image' in profile ? profile.image : profile.photo)!}
                  alt={profile.name}
                  fill
                  sizes="(min-width: 1280px) 28vw, (min-width: 768px) 45vw, 100vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
                  {profile ? (
                    <span className="font-serif text-5xl font-semibold tracking-widest text-white/80">
                      {profile.name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('')}
                    </span>
                  ) : (
                    <span className="grid h-16 w-16 place-items-center rounded-full border border-white/20 bg-white/[0.07] text-amber-300 backdrop-blur-md">
                      <UserRound aria-hidden="true" className="h-7 w-7" />
                    </span>
                  )}
                </div>
              )}
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/10" />
              <p className="absolute bottom-4 left-4 right-4 text-sm font-semibold uppercase tracking-[0.15em] text-white">
                {title}
              </p>
            </div>

            <div className="p-5 sm:p-6">
              {profile ? (
                <>
                  <h3 className="font-serif text-xl font-semibold leading-snug tracking-tight text-slate-900">
                    {profile.name}
                  </h3>
                  {'role' in profile && profile.role && (
                    <span className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full border border-amber-600/15 bg-amber-500/[0.08] px-3 py-2 text-xs font-medium text-amber-900">
                    <UserRound aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-amber-700" />
                    <span className="truncate">{profile.role}</span>
                    </span>
                  )}
                  {'location' in profile && profile.location && (
                    <p className="mt-3 text-xs font-medium text-slate-500">{profile.location}</p>
                  )}
                  {'bio' in profile && profile.bio && (
                    <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-600">{profile.bio}</p>
                  )}
                </>
              ) : (
                <p className="text-sm leading-relaxed text-slate-500">
                  Add this person&apos;s full name and picture in the ministry settings in Sanity Studio.
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

import Image from 'next/image';
import { UserRound } from 'lucide-react';
import type {
  MinistryLeaderImage,
  MinistryInlineLeader,
  MinistryLeaderProfile as Leader,
  MinistryRoleProfile,
} from '@/src/sanity/queries';

type Profile = Leader | MinistryRoleProfile | MinistryInlineLeader;

export default function MinistryLeaderProfile({
  ministryTitle,
  leader,
  leadership,
  leaders,
}: {
  ministryTitle: string;
  leader: Leader | null;
  leadership?: { title: string; profile: Profile | null }[];
  leaders?: MinistryInlineLeader[];
}) {
  const inlineProfiles = (leaders ?? [])
    .slice()
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .map((profile) => ({ title: profile.title, profile }));
  const profiles = inlineProfiles.length > 0
    ? inlineProfiles
    : leadership ?? (leader ? [{ title: leader.role, profile: leader }] : []);

  if (profiles.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 sm:pb-20">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
          Servant leadership
        </p>
        <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
          {ministryTitle} Leadership
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Meet the leaders serving and equipping this ministry across the LA Area.
        </p>
      </div>

      <div className={`grid grid-cols-1 gap-5 ${profiles.length > 1 ? 'md:grid-cols-2 xl:grid-cols-3' : 'max-w-4xl'}`}>
        {profiles.map(({ title, profile }) => {
          const imageValue = profile && 'image' in profile ? profile.image : profile && 'photo' in profile ? profile.photo?.url : null;
          const imageUrl = typeof imageValue === 'string' ? imageValue : imageValue?.url;
          const imageAlt = profile && 'photo' in profile
            ? profile.photo?.alt || profile.name
            : profile && 'image' in profile && typeof profile.image !== 'string'
              ? profile.image?.alt || profile.name
              : profile?.name || 'Leader photo';
          const profileTitle = profile && 'role' in profile ? profile.role : profile && 'title' in profile ? profile.title : title;
          return (
          <article
            key={title}
            className="group overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white/80 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.24)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-22px_rgba(15,23,42,0.3)] dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[radial-gradient(ellipse_at_18%_8%,rgba(245,158,11,0.15),transparent_38%),linear-gradient(135deg,#334155_0%,#1e293b_58%,#0f172a_100%)]">
              {profile && imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={imageAlt}
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
                  <h3 className="font-serif text-xl font-semibold leading-snug tracking-tight text-slate-900 dark:text-slate-50">
                    {profile.name}
                  </h3>
                  {profileTitle && (
                    <span className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full border border-amber-600/15 bg-amber-500/[0.08] px-3 py-2 text-xs font-medium text-amber-900 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200">
                    <UserRound aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-amber-700 dark:text-amber-300" />
                    <span className="truncate">{profileTitle}</span>
                    </span>
                  )}
                  {'location' in profile && profile.location && (
                    <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">{profile.location}</p>
                  )}
                  {'bio' in profile && profile.bio && (
                    <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-slate-300">{profile.bio}</p>
                  )}
                </>
              ) : (
                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  Add this person&apos;s full name and picture in the ministry settings in Sanity Studio.
                </p>
              )}
              {profile && 'photo' in profile && (
                <>
                  <MinistryLeaderGallery images={profile.gallery} />
                  {profile.documents.length > 0 && (
                    <ul className="mt-5 space-y-2 border-t border-slate-200 pt-4 dark:border-slate-800">
                      {profile.documents.map((document) => (
                        document.url ? (
                          <li key={`${document.title}-${document.url}`}>
                            <a
                              href={document.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm font-medium text-emerald-800 underline-offset-4 hover:underline dark:text-emerald-300"
                            >
                              {document.title}
                            </a>
                            {document.description && (
                              <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{document.description}</p>
                            )}
                          </li>
                        ) : null
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          </article>
          );
        })}
      </div>
    </section>
  );
}

function MinistryLeaderGallery({ images }: { images: MinistryLeaderImage[] }) {
  const availableImages = images.filter((image) => image.url);
  if (availableImages.length === 0) return null;

  return (
    <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Gallery</h4>
      <div className="grid grid-cols-2 gap-2">
        {availableImages.map((image, index) => (
          <figure key={`${image.url}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
            <Image
              src={image.url!}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 20vw, 45vw"
              className="object-cover"
            />
            {image.caption && (
              <figcaption className="absolute inset-x-0 bottom-0 bg-slate-950/70 px-2 py-1 text-xs text-white">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}

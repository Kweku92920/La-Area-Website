import Link from 'next/link';
import MinistryGallery, { type GalleryPhoto } from './MinistryGallery';
import MinistryLeaderProfile from './MinistryLeaderProfile';
import type {
  MinistryLeaderProfile as Leader,
  MinistryRoleProfile,
} from '@/src/sanity/queries';

export type MinistryPageContent = {
  galleryId: string;
  title: string;
  tagline: string;
  showTagline?: boolean;
  image: string;
  gradient: string;
  accent: string;
  accentBg: string;
  intro: string;
  scripture?: { text: string; ref: string };
  meets?: { label: string; value: string }[];
};

export default function MinistryPageClient({
  ministry,
  gallery = [],
  leader,
  leadership,
  mottoStatements = [],
}: {
  ministry: MinistryPageContent;
  gallery?: GalleryPhoto[];
  leader: Leader | null;
  leadership?: { title: string; profile: Leader | MinistryRoleProfile | null }[];
  mottoStatements?: string[];
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <section className="relative overflow-hidden bg-slate-950 px-6 py-24 text-center text-white sm:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('${ministry.image}')` }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_15%,rgba(16,185,129,0.2),transparent_58%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/45" />
        <div className="relative mx-auto max-w-3xl space-y-5">
          <p className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
            <Link href="/" className="transition hover:text-amber-300">Home</Link>
            <span aria-hidden="true" className="text-white/40">/</span>
            <Link href="/ministries" className="transition hover:text-amber-300">Ministries</Link>
            <span aria-hidden="true" className="text-white/40">/</span>
            {ministry.title}
          </p>
          <h1 className="font-serif text-4xl font-bold tracking-tight md:text-6xl">{ministry.title}</h1>
          {ministry.showTagline !== false && (
            <p className="text-base italic text-slate-200/90 md:text-lg">{ministry.tagline}</p>
          )}
        </div>
      </section>

      {mottoStatements.length > 0 && (
        <section
          aria-label={`${ministry.title} motto and vision`}
          className="overflow-hidden border-y border-slate-700 bg-slate-900 py-4 text-amber-300"
        >
          <p className="sr-only">{mottoStatements.join(' · ')}</p>
          <div aria-hidden="true" className="flex w-max animate-[ministry-marquee_28s_linear_infinite] motion-reduce:animate-none">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {mottoStatements.map((statement) => (
                  <span key={`${copy}-${statement}`} className="mx-5 inline-flex items-center gap-5 text-xs font-semibold uppercase tracking-[0.2em] sm:mx-8 sm:text-sm">
                    {statement}
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
        <div className={`grid gap-8 ${ministry.meets?.length ? 'lg:grid-cols-[1fr_1.1fr] lg:items-center' : ''}`}>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Our purpose</p>
            <p className="max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
              {ministry.intro}
            </p>
          </div>
          {ministry.meets && ministry.meets.length > 0 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {ministry.meets.map((m) => (
                <div key={m.label} className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-[0_14px_35px_-28px_rgba(15,23,42,0.35)] backdrop-blur-md sm:p-5">
                  <p className={`text-[10px] font-bold uppercase tracking-[0.16em] ${ministry.accent}`}>{m.label}</p>
                  <p className="mt-2 font-serif text-base font-semibold text-slate-900 sm:text-lg">{m.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <MinistryLeaderProfile
        ministryTitle={ministry.title}
        leader={leader}
        leadership={leadership}
      />

      {ministry.scripture && (
        <section className="relative overflow-hidden bg-slate-900 px-6 py-14 text-center text-white">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,185,129,0.18),transparent_65%)]" />
          <div className="relative">
            <blockquote className="mx-auto max-w-3xl font-serif text-xl italic leading-relaxed text-amber-100/90 md:text-2xl">
              “{ministry.scripture.text}”
            </blockquote>
            <p className="mt-3 text-xs font-medium uppercase tracking-widest text-slate-400">
              — {ministry.scripture.ref}
            </p>
          </div>
        </section>
      )}

      <MinistryGallery
        photos={gallery}
        accent={ministry.accent}
        accentBg={ministry.accentBg}
      />
    </div>
  );
}

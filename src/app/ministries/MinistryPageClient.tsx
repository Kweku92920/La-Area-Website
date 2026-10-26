import type { PortableTextBlock } from 'next-sanity';
import RichText from '../components/RichText';
import MinistryGallery, { type GalleryPhoto } from './MinistryGallery';
import MinistryLeaderProfile from './MinistryLeaderProfile';
import Breadcrumb from '../components/Breadcrumb';
import type {
  MinistryLeaderProfile as Leader,
  MinistryInlineLeader,
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
  body?: PortableTextBlock[] | null;
  scripture?: { text: string; ref: string };
  meets?: { label: string; value: string }[];
};

export default function MinistryPageClient({
  ministry,
  gallery = [],
  leader,
  leadership,
  leaders,
  mottoStatements = [],
}: {
  ministry: MinistryPageContent;
  gallery?: GalleryPhoto[];
  leader: Leader | null;
  leadership?: { title: string; profile: Leader | MinistryRoleProfile | null }[];
  leaders?: MinistryInlineLeader[];
  mottoStatements?: string[];
}) {
  return (
    <div className="min-h-screen bg-[#f7f8f6] text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <section className="relative flex min-h-[460px] items-end overflow-hidden bg-slate-950 px-6 py-16 text-left text-white sm:min-h-[520px] sm:py-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('${ministry.image}')` }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_15%,rgba(16,185,129,0.2),transparent_58%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/45" />
        <div className="relative mx-auto w-full max-w-7xl space-y-5">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Ministries', href: '/ministries' }, { label: ministry.title }]} />
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">A community to grow in</p>
          <h1 className="max-w-4xl font-serif text-5xl font-bold tracking-tight md:text-7xl">{ministry.title}</h1>
          {ministry.showTagline !== false && (
            <p className="max-w-2xl text-base italic text-slate-200/90 md:text-lg">{ministry.tagline}</p>
          )}
        </div>
      </section>

      {mottoStatements.length > 0 && (
        <section
          aria-label={`${ministry.title} motto and vision`}
          className="overflow-hidden border-y border-slate-700 bg-slate-900 py-4 text-amber-300 dark:border-slate-800 dark:bg-slate-950"
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

      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className={`grid gap-8 ${ministry.meets?.length ? 'lg:grid-cols-[1fr_1.1fr] lg:items-center' : ''}`}>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">Our purpose</p>
            <p className="max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
              {ministry.intro}
            </p>
          </div>
          {ministry.meets && ministry.meets.length > 0 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {ministry.meets.map((m) => (
                <div key={m.label} className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-[0_14px_35px_-28px_rgba(15,23,42,0.35)] backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70 sm:p-5">
                  <p className={`text-[10px] font-bold uppercase tracking-[0.16em] ${ministry.accent}`}>{m.label}</p>
                  <p className="mt-2 font-serif text-base font-semibold text-slate-900 dark:text-slate-50 sm:text-lg">{m.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {ministry.body && ministry.body.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 pb-14 sm:pb-16">
          <RichText value={ministry.body} />
        </section>
      )}

      <MinistryLeaderProfile
        ministryTitle={ministry.title}
        leader={leader}
        leadership={leadership}
        leaders={leaders}
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

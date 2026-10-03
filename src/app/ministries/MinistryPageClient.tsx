import Link from 'next/link';
import MinistryGallery, { type GalleryPhoto } from './MinistryGallery';
import MinistryLeaderProfile from './MinistryLeaderProfile';
import type { MinistryLeaderProfile as Leader } from '@/src/sanity/queries';

export type MinistryPageContent = {
  /** Slug of the matching ministry in Sanity; its photo gallery is loaded by this. */
  galleryId: string;
  title: string;
  tagline: string;
  /** Hero background image (URL or /public path). */
  image: string;
  /** Tailwind gradient classes for the hero overlay, e.g. "from-rose-700/80 via-fuchsia-950/70 to-stone-950". */
  gradient: string;
  /** Tailwind text colour class, e.g. "text-rose-600". */
  accent: string;
  /** Tailwind background colour class, e.g. "bg-rose-500". */
  accentBg: string;
  intro: string;
  scripture: { text: string; ref: string };
  meets: { label: string; value: string }[];
};

export default function MinistryPageClient({
  ministry,
  gallery = [],
  leader,
}: {
  ministry: MinistryPageContent;
  gallery?: GalleryPhoto[];
  leader: Leader | null;
}) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-stone-900 px-6 py-24 text-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${ministry.image}')` }}
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${ministry.gradient}`} />
        <div className="relative mx-auto max-w-3xl space-y-4">
          <p className="text-xs font-medium uppercase tracking-widest text-white/80">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-1">&gt;</span>
            <Link href="/ministries" className="hover:text-white">Ministries</Link>
            <span className="mx-1">&gt;</span>
            {ministry.title}
          </p>
          <h1 className="font-serif text-4xl font-bold tracking-tight md:text-6xl">{ministry.title}</h1>
          <p className="text-base italic text-white/90 md:text-lg">{ministry.tagline}</p>
        </div>
      </section>

      <MinistryLeaderProfile ministryTitle={ministry.title} leader={leader} />

      {/* Intro + when we meet */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-stone-600 md:text-lg">
          {ministry.intro}
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {ministry.meets.map((m) => (
            <div key={m.label} className="rounded-2xl border border-stone-200/70 bg-white p-5 text-center shadow-sm">
              <p className={`text-xs font-bold uppercase tracking-widest ${ministry.accent}`}>{m.label}</p>
              <p className="mt-2 font-serif text-lg font-semibold text-stone-900">{m.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Scripture */}
      <section className="bg-stone-900 px-6 py-14 text-center text-white">
        <blockquote className="mx-auto max-w-3xl font-serif text-xl italic leading-relaxed text-amber-100/90 md:text-2xl">
          “{ministry.scripture.text}”
        </blockquote>
        <p className="mt-3 text-xs font-medium uppercase tracking-widest text-stone-400">
          — {ministry.scripture.ref}
        </p>
      </section>

      <MinistryGallery
        photos={gallery}
        accent={ministry.accent}
        accentBg={ministry.accentBg}
      />

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="mt-12 text-center">
          <a
            href={`mailto:info@coplaarea.org?subject=${encodeURIComponent(`Getting involved: ${ministry.title}`)}`}
            className={`inline-flex items-center rounded-full px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 ${ministry.accentBg}`}
          >
            Get involved &rarr;
          </a>
        </div>
      </section>
    </div>
  );
}

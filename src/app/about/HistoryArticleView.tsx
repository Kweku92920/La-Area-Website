'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Camera,
  Church,
  Clock,
  Expand,
  Quote,
  RotateCcw,
  Search,
  Users,
  X,
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import RichText from '../components/RichText';
import type { GalleryPhotoItem, HistoryPageData } from '@/src/sanity/queries';

type HistoryArticleViewProps = {
  history: HistoryPageData;
  companionHref: string;
  companionLabel: string;
  companionSubtitle: string;
};

type LeaderFilterMode = 'all' | 'former' | 'current';
type GalleryFilterMode = 'all' | 'leaders' | 'ministry';

function isCurrentLeaderCheck(tenure: string, role: string): boolean {
  const t = (tenure || '').toLowerCase();
  const r = (role || '').toLowerCase();
  return t.includes('present') || t.includes('current') || r.includes('current');
}

function isLeaderGalleryItem(photo: GalleryPhotoItem): boolean {
  const text = `${photo.alt || ''} ${photo.caption || ''} ${photo.url || ''}`.toLowerCase();
  return (
    text.includes('chairman') ||
    text.includes('chairmen') ||
    text.includes('area head') ||
    text.includes('mckeown') ||
    text.includes('safo') ||
    text.includes('yeboah') ||
    text.includes('ntumy') ||
    text.includes('onyinah') ||
    text.includes('nyamekye') ||
    text.includes('amaniampong') ||
    text.includes('appiah aidoo') ||
    text.includes('nuekpe')
  );
}

export default function HistoryArticleView({
  history,
  companionHref,
  companionLabel,
  companionSubtitle,
}: HistoryArticleViewProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [leaderFilter, setLeaderFilter] = useState<LeaderFilterMode>('all');
  const [galleryFilter, setGalleryFilter] = useState<GalleryFilterMode>('all');
  const [activeChapterIdx, setActiveChapterIdx] = useState<number>(0);
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhotoItem | null>(null);

  const isAreaHistory = history.slug === 'la-area';
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredMilestones = useMemo(() => {
    return history.milestones.filter((m) => {
      if (!normalizedQuery) return true;
      const haystack = `${m.year} ${m.era} ${m.title} ${m.location || ''} ${m.description}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [history.milestones, normalizedQuery]);

  // 2. Filtered Leadership Succession (All / Former / Current + Search)
  const leaderCounts = useMemo(() => {
    let former = 0;
    let current = 0;
    for (const l of history.leadershipLegacy) {
      if (isCurrentLeaderCheck(l.tenure, l.role)) {
        current += 1;
      } else {
        former += 1;
      }
    }
    return {
      all: history.leadershipLegacy.length,
      former,
      current,
    };
  }, [history.leadershipLegacy]);

  const filteredLeaders = useMemo(() => {
    return history.leadershipLegacy
      .map((leader, originalIdx) => ({ leader, originalIdx }))
      .filter(({ leader }) => {
        const isCurrent = isCurrentLeaderCheck(leader.tenure, leader.role);
        if (leaderFilter === 'former' && isCurrent) return false;
        if (leaderFilter === 'current' && !isCurrent) return false;
        if (!normalizedQuery) return true;
        const haystack = `${leader.name} ${leader.role} ${leader.tenure} ${leader.note || ''}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      });
  }, [history.leadershipLegacy, leaderFilter, normalizedQuery]);

  // 3. Filtered Gallery Photos
  const galleryItems = useMemo(() => history.gallery ?? [], [history.gallery]);

  const galleryCounts = useMemo(() => {
    let leaders = 0;
    let ministry = 0;
    for (const item of galleryItems) {
      if (isLeaderGalleryItem(item)) {
        leaders += 1;
      } else {
        ministry += 1;
      }
    }
    return {
      all: galleryItems.length,
      leaders,
      ministry,
    };
  }, [galleryItems]);

  const filteredGallery = useMemo(() => {
    return galleryItems.filter((photo) => {
      const isLeaderPhoto = isLeaderGalleryItem(photo);
      if (galleryFilter === 'leaders' && !isLeaderPhoto) return false;
      if (galleryFilter === 'ministry' && isLeaderPhoto) return false;
      if (!normalizedQuery) return true;
      const haystack = `${photo.alt || ''} ${photo.caption || ''}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [galleryItems, galleryFilter, normalizedQuery]);

  const hasActiveFilters =
    normalizedQuery.length > 0 ||
    leaderFilter !== 'all' ||
    galleryFilter !== 'all';

  const resetAllFilters = () => {
    setSearchQuery('');
    setLeaderFilter('all');
    setGalleryFilter('all');
  };

  const scrollToSection = (elementId: string, idx?: number) => {
    if (typeof idx === 'number') {
      setActiveChapterIdx(idx);
    }
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 30);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
      {/* ---------------- INSTITUTIONAL HERO ---------------- */}
      <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-[#0f172a] px-6 py-20 text-white sm:min-h-[480px]">
        {history.heroImage && (
          <Image
            src={history.heroImage}
            alt={history.heroImageAlt || history.title}
            fill
            priority
            sizes="100vw"
            referrerPolicy="no-referrer"
            className="object-cover object-center opacity-35"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.22),transparent_58%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-[#0f172a]/70 to-[#0f172a]/40"
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'About Us', href: '/about' },
              { label: history.title },
            ]}
          />

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
            {history.kicker}
          </p>

          <h1 className="mx-auto max-w-3xl font-serif text-4xl font-bold tracking-tight text-white [text-wrap:balance] sm:text-5xl md:text-6xl">
            {history.title}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-200/90 sm:text-lg">
            {history.subtitle}
          </p>

          {/* Sub-navigation switcher between the two History pages */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] p-1.5 backdrop-blur-md">
            <Link
              href="/about/history-of-pentecost"
              className={`rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                !isAreaHistory
                  ? 'bg-yellow-400 text-slate-950 shadow-sm'
                  : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              History of The Church of Pentecost
            </Link>
            <Link
              href="/about/history-of-la-area"
              className={`rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                isAreaHistory
                  ? 'bg-yellow-400 text-slate-950 shadow-sm'
                  : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              History of The Area (La Area)
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- INTERACTIVE ARCHIVE SEARCH & FILTER BAR ---------------- */}
      <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/90 p-4 dark:border-slate-800 dark:bg-slate-900/90 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isAreaHistory
                    ? 'Search Area Heads, districts, milestones, or photographs...'
                    : 'Search Chairmen, milestones, or photographs...'
                }
                aria-label="Search leaders, milestones, and photographs"
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0f172a] focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center justify-center gap-1 rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-3 py-2.5 text-xs font-semibold text-yellow-800 transition-colors hover:bg-yellow-500/20 dark:text-yellow-300"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset All</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- ASYMMETRIC EDITORIAL READING CANVAS ---------------- */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left / Main Narrative Column (8 cols) */}
          <div className="lg:col-span-8">
            {/* Lead Archival Monograph Header */}
            <div className="border-b border-slate-200 pb-10 dark:border-slate-800">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-yellow-700 dark:text-yellow-400">
                <span>Verified Historical Record</span>
                <span aria-hidden="true">·</span>
                <span>{history.sections.length} Chapters</span>
                <span aria-hidden="true">·</span>
                <span>{history.milestones.length} Milestones</span>
              </div>

              <p className="max-w-prose font-serif text-lg leading-relaxed text-slate-800 first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:leading-none first-letter:text-[#0f172a] dark:text-slate-200 dark:first-letter:text-yellow-400 sm:text-xl sm:leading-8">
                {history.intro}
              </p>
            </div>

            {/* Featured Pull Quote */}
            {history.quote?.text && (
              <figure className="my-12 border-y border-slate-200 py-8 dark:border-slate-800">
                <Quote
                  aria-hidden="true"
                  className="mb-3 h-6 w-6 text-yellow-600/60 dark:text-yellow-400/60"
                />
                <blockquote className="max-w-2xl font-serif text-xl italic leading-relaxed text-slate-900 dark:text-slate-100 sm:text-2xl">
                  &ldquo;{history.quote.text}&rdquo;
                </blockquote>
                <figcaption className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    {history.quote.attribution}
                  </span>
                  {history.quote.role && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{history.quote.role}</span>
                    </>
                  )}
                </figcaption>
              </figure>
            )}

            {/* Narrative Chapters */}
            <div className="space-y-16">
                {history.sections.map((section, originalIdx) => (
                  <article
                    key={section._key || `chapter-${originalIdx}`}
                    id={`chapter-${originalIdx}`}
                    className="scroll-mt-28 border-b border-slate-200/80 pb-14 last:border-b-0 last:pb-0 dark:border-slate-800/80"
                  >
                    <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-yellow-700 tabular-nums dark:text-yellow-400">
                      <span>{section.kicker || `Chapter 0${originalIdx + 1}`}</span>
                    </div>

                    <h2 className="max-w-2xl font-serif text-2xl font-bold tracking-tight text-slate-900 [text-wrap:balance] dark:text-slate-50 sm:text-3xl">
                      {section.title}
                    </h2>

                    {section.image && (
                      <figure className="group my-7 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900">
                        <button
                          type="button"
                          onClick={() =>
                            setLightboxPhoto({
                              url: section.image!,
                              alt: section.imageAlt || section.title,
                              caption: section.imageCaption || section.title,
                            })
                          }
                          className="relative block aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#0f172a] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                          aria-label={`View full size image: ${section.imageAlt || section.title}`}
                        >
                          <Image
                            src={section.image}
                            alt={section.imageAlt || section.title}
                            fill
                            sizes="(min-width: 1024px) 760px, 100vw"
                            referrerPolicy="no-referrer"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-slate-950/75 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                            <Expand className="h-3.5 w-3.5" />
                            <span>Enlarge Photograph</span>
                          </span>
                        </button>
                        {section.imageCaption && (
                          <figcaption className="px-3 py-2.5 text-xs italic text-slate-500 dark:text-slate-400">
                            {section.imageCaption}
                          </figcaption>
                        )}
                      </figure>
                    )}

                    <div className="mt-6 max-w-prose space-y-5 text-base leading-8 text-slate-700 dark:text-slate-300">
                      {section.paragraphs.map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>

                    {section.highlight && (
                      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
                        <p className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-yellow-700 dark:text-yellow-400">
                          Key Historical Takeaway
                        </p>
                        <p className="font-serif text-base leading-relaxed text-slate-800 dark:text-slate-200">
                          {section.highlight}
                        </p>
                      </div>
                    )}
                  </article>
                ))}
            </div>

            {/* Optional Sanity Portable Text Body */}
            {history.body && history.body.length > 0 && (
              <div className="mt-14 border-t border-slate-200 pt-12 dark:border-slate-800">
                <RichText value={history.body} />
              </div>
            )}
          </div>

          {/* Right / Sticky Archival Margin Rail (4 cols) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Chapter Index Navigation */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-slate-100">
                    Chapter Index
                  </span>
                  <BookOpen className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </div>

                <nav aria-label="Historical chapters" className="space-y-1.5">
                  {history.sections.map((sec, idx) => {
                    const isCurrent = activeChapterIdx === idx;
                    return (
                      <button
                        key={sec._key || `nav-${idx}`}
                        type="button"
                        onClick={() => scrollToSection(`chapter-${idx}`, idx)}
                        className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition-colors ${
                          isCurrent
                            ? 'bg-[#0f172a] font-semibold text-white dark:bg-blue-600'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                        }`}
                      >
                        <span
                          className={`mt-0.5 font-mono text-[11px] tabular-nums ${
                            isCurrent ? 'text-yellow-300' : 'text-slate-400'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <span className="line-clamp-2 leading-snug">{sec.title}</span>
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => scrollToSection('leadership-succession')}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-yellow-700 transition-colors hover:bg-slate-100 dark:text-yellow-400 dark:hover:bg-slate-800"
                  >
                    <span>
                      {isAreaHistory ? 'Former & Current Area Heads' : 'Chairmen of the Church'}
                    </span>
                    <Users className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('chronological-timeline')}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-yellow-700 transition-colors hover:bg-slate-100 dark:text-yellow-400 dark:hover:bg-slate-800"
                  >
                    <span>Chronological Timeline</span>
                    <Clock className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('photo-archive')}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-yellow-700 transition-colors hover:bg-slate-100 dark:text-yellow-400 dark:hover:bg-slate-800"
                  >
                    <span>Official Photo Archive</span>
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                </nav>
              </div>

              {/* Featured Archival Photograph Card */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxPhoto({
                      url: history.heroImage || '/theme.jpg',
                      alt: history.heroImageAlt || history.title,
                      caption: history.heroImageCaption || history.title,
                    })
                  }
                  className="group relative block aspect-[4/3] w-full overflow-hidden bg-[#0f172a] text-left"
                >
                  <Image
                    src={history.heroImage || '/theme.jpg'}
                    alt={history.heroImageAlt || history.title}
                    fill
                    sizes="(min-width: 1024px) 360px, 100vw"
                    referrerPolicy="no-referrer"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-lg bg-slate-950/75 px-2.5 py-1 text-[11px] font-medium text-white">
                    <Expand className="h-3 w-3" />
                    <span>Enlarge</span>
                  </span>
                </button>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-yellow-700 dark:text-yellow-400">
                    Official Photograph
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    {history.heroImageCaption ||
                      'Preserving the verified apostolic heritage and leadership of The Church of Pentecost.'}
                  </p>
                </div>
              </div>

              {/* Companion History Card */}
              <div className="rounded-2xl border border-slate-200 bg-[#0f172a] p-6 text-white dark:border-slate-800">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-yellow-300">
                  Companion Chronicle
                </p>
                <h3 className="mt-2 font-serif text-lg font-bold text-white">
                  {companionLabel}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  {companionSubtitle}
                </p>
                <Link
                  href={companionHref}
                  className="mt-5 inline-flex w-full items-center justify-between rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#0f172a] transition-colors hover:bg-yellow-400"
                >
                  <span>Read Companion History</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ---------------- LEADERSHIP SUCCESSION / FORMER & CURRENT AREA HEADS ---------------- */}
      {history.leadershipLegacy.length > 0 && (
        <section
          id="leadership-succession"
          className="scroll-mt-24 border-t border-slate-200 bg-slate-50/70 py-16 dark:border-slate-800 dark:bg-slate-900/40 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-8 dark:border-slate-800 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-700 dark:text-yellow-400">
                  {isAreaHistory
                    ? 'La Area Roll of Honour · 2007 to Present'
                    : 'Apostolic Succession · 1937 to Present'}
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
                  {isAreaHistory
                    ? 'Former & Current Area Heads of the La Area'
                    : 'Chairmen of The Church of Pentecost'}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                  {isAreaHistory
                    ? 'Official portraits and tenures of the Former Area Heads who served the La Area alongside our Current Area Head, Apostle Dr. Dieudonne Komla Nuekpe.'
                    : 'Official portraits and tenures of Founder Pastor James McKeown and the indigenous Ghanaian Chairmen of The Church of Pentecost.'}
                </p>
              </div>

              {/* Interactive Leader Status Filter Tabs */}
              <div
                role="tablist"
                aria-label="Filter leaders by tenure status"
                className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1.5 dark:border-slate-800 dark:bg-slate-900"
              >
                <button
                  role="tab"
                  aria-selected={leaderFilter === 'all'}
                  type="button"
                  onClick={() => setLeaderFilter('all')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                    leaderFilter === 'all'
                      ? 'bg-[#0f172a] text-white shadow-sm dark:bg-blue-600'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  All ({leaderCounts.all})
                </button>
                <button
                  role="tab"
                  aria-selected={leaderFilter === 'former'}
                  type="button"
                  onClick={() => setLeaderFilter('former')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                    leaderFilter === 'former'
                      ? 'bg-[#0f172a] text-white shadow-sm dark:bg-blue-600'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {isAreaHistory
                    ? `Former Area Heads (${leaderCounts.former})`
                    : `Former Chairmen (${leaderCounts.former})`}
                </button>
                <button
                  role="tab"
                  aria-selected={leaderFilter === 'current'}
                  type="button"
                  onClick={() => setLeaderFilter('current')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                    leaderFilter === 'current'
                      ? 'bg-yellow-400 text-slate-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {isAreaHistory
                    ? `Current Area Head (${leaderCounts.current})`
                    : `Current Chairman (${leaderCounts.current})`}
                </button>
              </div>
            </div>

            {filteredLeaders.length > 0 ? (
              <div
                className={`mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 ${
                  isAreaHistory ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
                }`}
              >
                {filteredLeaders.map(({ leader, originalIdx }) => {
                  const isCurrentLeader = isCurrentLeaderCheck(leader.tenure, leader.role);

                  return (
                    <article
                      key={leader._key || `${leader.name}-${originalIdx}`}
                      className={`group flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-200 hover:-translate-y-0.5 dark:bg-slate-900 ${
                        isCurrentLeader
                          ? 'border-yellow-500/70 shadow-[0_18px_50px_-24px_rgba(234,179,8,0.28)] dark:border-yellow-400/60'
                          : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          leader.photo &&
                          setLightboxPhoto({
                            url: leader.photo,
                            alt: `${leader.name} — ${leader.role}`,
                            caption: `${leader.name} (${leader.tenure}) — ${leader.role}. ${leader.note || ''}`,
                          })
                        }
                        className="relative aspect-[3/4] w-full overflow-hidden bg-[#0f172a] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                        aria-label={`View portrait of ${leader.name}`}
                      >
                        {leader.photo ? (
                          <Image
                            src={leader.photo}
                            alt={leader.name}
                            fill
                            quality={85}
                            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                            referrerPolicy="no-referrer"
                            style={{
                              objectPosition:
                                leader.photo === '/history/official/mckeown-archival-restored.jpg'
                                  ? '20% center'
                                  : 'center top',
                            }}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-slate-800 to-[#0f172a] font-serif text-3xl font-bold text-yellow-300">
                            {leader.name
                              .split(' ')
                              .filter(
                                (w) =>
                                  !['Apostle', 'Prophet', 'Pastor', 'Rev.', 'Dr.', 'Prof.'].includes(w),
                              )
                              .map((w) => w[0])
                              .join('')
                              .slice(0, 2)}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/15 to-transparent" />
                        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-lg bg-slate-950/75 px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                          <Expand className="h-3 w-3" />
                          <span>Portrait</span>
                        </span>
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2 text-xs text-slate-200 tabular-nums">
                          <span className="font-mono font-bold text-yellow-300">
                            0{originalIdx + 1}
                          </span>
                          <span
                            className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                              isCurrentLeader
                                ? 'bg-yellow-400 text-slate-950'
                                : 'bg-white/15 text-white backdrop-blur-sm'
                            }`}
                          >
                            {leader.tenure}
                          </span>
                        </div>
                      </button>

                      <div className="flex flex-1 flex-col justify-between p-6">
                        <div>
                          <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-50">
                            {leader.name}
                          </h3>

                          <p className="mt-1 text-xs font-semibold text-yellow-700 dark:text-yellow-300">
                            {leader.role}
                          </p>

                          {leader.note && (
                            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                              {leader.note}
                            </p>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
                <p className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
                  No leaders matched your current filter
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setLeaderFilter('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#0f172a] px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-blue-600"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Show All Leaders</span>
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ---------------- CHRONOLOGICAL TIMELINE SECTION ---------------- */}
      <section
        id="chronological-timeline"
        className="scroll-mt-24 border-t border-slate-200 py-16 dark:border-slate-800 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-8 dark:border-slate-800 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-700 dark:text-yellow-400">
                Historical Timeline · {filteredMilestones.length}{' '}
                {filteredMilestones.length === 1 ? 'Milestone' : 'Milestones'}
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
                Milestones Through the Years
              </h2>
            </div>
          </div>

          {filteredMilestones.length > 0 ? (
            <ol className="relative mt-10 space-y-6 before:absolute before:bottom-4 before:left-[15px] before:top-4 before:w-px before:bg-slate-200 dark:before:bg-slate-800 sm:space-y-8">
              {filteredMilestones.map((item, idx) => {
                const isCurrentMilestone = /\b(present|current)\b/i.test(
                  `${item.year} ${item.era}`,
                );

                return (
                  <li
                    key={item._key || `${item.year}-${idx}`}
                    className="relative pl-12 sm:pl-16"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute left-[8px] top-5 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-white ring-4 ring-white dark:bg-slate-950 dark:ring-slate-950 ${
                        isCurrentMilestone
                          ? 'border-emerald-600 dark:border-emerald-400'
                          : 'border-yellow-600 dark:border-yellow-400'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isCurrentMilestone
                            ? 'bg-emerald-600 dark:bg-emerald-400'
                            : 'bg-yellow-600 dark:bg-yellow-400'
                        }`}
                      />
                    </span>
                    <article
                      className={`rounded-2xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:bg-slate-900 sm:p-7 ${
                        isCurrentMilestone
                          ? 'border-emerald-500/60 ring-1 ring-emerald-500/10 dark:border-emerald-400/50'
                          : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <time className="font-serif text-xl font-bold tracking-tight text-[#0f172a] tabular-nums dark:text-yellow-300 sm:text-2xl">
                          {item.year}
                        </time>
                        {isCurrentMilestone && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                            Current milestone
                          </span>
                        )}
                        {item.era && (
                          <span className="rounded-full bg-yellow-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-yellow-800 dark:text-yellow-300">
                            {item.era}
                          </span>
                        )}
                        {item.location && (
                          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            {item.location}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 font-serif text-xl font-bold text-slate-900 dark:text-slate-50 sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {item.description}
                      </p>
                    </article>
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900">
              <p className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
                No milestones matched your search
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#0f172a] px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-blue-600"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Milestone Filter</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ---------------- ARCHIVAL PHOTO GALLERY ---------------- */}
      {galleryItems.length > 0 && (
        <section
          id="photo-archive"
          className="scroll-mt-24 mx-auto max-w-7xl border-t border-slate-200 px-4 py-16 dark:border-slate-800 sm:px-6 lg:px-8 lg:py-20"
        >
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-700 dark:text-yellow-400">
                Authentic Visual Heritage
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-slate-900 dark:text-slate-50 sm:text-4xl">
                Official Historical Photo Archive
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Real photographs from The Church of Pentecost archives and La Area events. Click any image to inspect full-resolution details.
              </p>
            </div>

            {/* Gallery Category Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter gallery photographs"
              className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-1.5 dark:border-slate-800 dark:bg-slate-900"
            >
              <button
                role="tab"
                aria-selected={galleryFilter === 'all'}
                type="button"
                onClick={() => setGalleryFilter('all')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                  galleryFilter === 'all'
                    ? 'bg-[#0f172a] text-white shadow-sm dark:bg-blue-600'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                All Photos ({galleryCounts.all})
              </button>
              <button
                role="tab"
                aria-selected={galleryFilter === 'leaders'}
                type="button"
                onClick={() => setGalleryFilter('leaders')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                  galleryFilter === 'leaders'
                    ? 'bg-[#0f172a] text-white shadow-sm dark:bg-blue-600'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                Leadership Portraits ({galleryCounts.leaders})
              </button>
              <button
                role="tab"
                aria-selected={galleryFilter === 'ministry'}
                type="button"
                onClick={() => setGalleryFilter('ministry')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                  galleryFilter === 'ministry'
                    ? 'bg-[#0f172a] text-white shadow-sm dark:bg-blue-600'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                Sanctuaries & Ministry ({galleryCounts.ministry})
              </button>
            </div>
          </div>

          {filteredGallery.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredGallery.map((photo, idx) => (
                <figure
                  key={`${photo.url}-${idx}`}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxPhoto(photo)}
                    className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#0f172a] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                    aria-label={`Enlarge archival photo: ${photo.alt || photo.caption || 'Historical photo'}`}
                  >
                    <Image
                      src={photo.url}
                      alt={photo.alt || photo.caption || 'Historical photo'}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      referrerPolicy="no-referrer"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    <span className="absolute bottom-2.5 right-2.5 grid h-8 w-8 place-items-center rounded-lg bg-slate-950/75 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                      <Expand className="h-4 w-4" />
                    </span>
                  </button>
                  {photo.caption && (
                    <figcaption className="px-2.5 py-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      {photo.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900">
              <p className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
                No photographs matched the selected filter
              </p>
              <button
                type="button"
                onClick={() => {
                  setGalleryFilter('all');
                  setSearchQuery('');
                }}
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#0f172a] px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-blue-600"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Show All Photographs</span>
              </button>
            </div>
          )}
        </section>
      )}

      {/* ---------------- LIGHTBOX MODAL ---------------- */}
      {lightboxPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxPhoto.alt || lightboxPhoto.caption || 'Archival image viewer'}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-[#0f172a] p-3 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex items-center justify-between px-2 py-1">
              <p className="truncate text-xs font-semibold text-yellow-300">
                {lightboxPhoto.alt || 'Official Archival Photograph'}
              </p>
              <button
                type="button"
                onClick={() => setLightboxPhoto(null)}
                aria-label="Close image viewer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-black">
              <Image
                src={lightboxPhoto.url}
                alt={lightboxPhoto.alt || lightboxPhoto.caption || 'Historical photo'}
                fill
                sizes="100vw"
                referrerPolicy="no-referrer"
                className="object-contain"
              />
            </div>
            {lightboxPhoto.caption && (
              <p className="mt-3 px-2 pb-1 text-center text-xs text-slate-200 sm:text-sm">
                {lightboxPhoto.caption}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ---------------- CLOSING CALL TO ACTION BANNER ---------------- */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.8rem] border border-slate-800 bg-[#0f172a] px-6 py-12 text-center text-white sm:px-10 sm:py-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.2),transparent_62%)]"
          />
          <div className="relative mx-auto max-w-3xl">
            <span className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-yellow-300">
              <Church aria-hidden="true" className="h-5 w-5" />
            </span>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-yellow-300">
              Living the Legacy Today
            </p>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white [text-wrap:balance] sm:text-4xl">
              Be Part of What God Is Doing in the La Area
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Explore our companion history, meet our current leadership, or visit one of our 81 local assemblies across 24 districts in Accra.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={companionHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-6 py-3 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:bg-white/[0.16]"
              >
                <span>{companionLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/assemblies"
                className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-bold text-slate-950 whitespace-nowrap transition-colors hover:bg-yellow-300"
              >
                <span>Find a Local Assembly</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/leadership"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-slate-200 whitespace-nowrap transition-colors hover:bg-white/10 hover:text-white"
              >
                <span>Meet Our Leadership</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

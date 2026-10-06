import React from 'react';
import Link from 'next/link';
import { sanityFetch, sanityFetchWithOptions } from '@/src/sanity/client';
import { formatDate, youtubeThumb } from '@/src/sanity/format';
import { nextEventQuery, latestSermonsQuery, type HomeEvent, type HomeSermon } from '@/src/sanity/queries';
import {
  ArrowRight,
  Calendar,
  MapPin,
  Play,
} from 'lucide-react';

export default async function HomePage() {
  const [event, sermons] = await Promise.all([
    sanityFetchWithOptions<HomeEvent | null>(nextEventQuery, {}, { revalidate: false }),
    sanityFetch<HomeSermon[]>(latestSermonsQuery),
  ]);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-slate-950 text-white">
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
          style={{
            backgroundImage: "url('/theme.jpg')"
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(245,158,11,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/45" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-28 text-center sm:py-32">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Welcome to LA Area
          </span>
          <h1 className="mb-6 font-serif text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl">
            The Church of Pentecost- La.
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-base font-normal leading-relaxed text-slate-200/85 sm:text-lg">
            The Church of Pentecost – La Area welcomes you to worship with us. Find
            your nearest local assembly, grow in faith, and experience the love of Christ in
            community.
          </p>

          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/assemblies"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-amber-500/30 bg-amber-600 px-8 py-3.5 font-semibold text-white shadow-[0_12px_36px_-12px_rgba(217,119,6,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-700 sm:w-auto"
            >
              <span>Find a Local Assembly</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/sermons"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-8 py-3.5 font-semibold text-slate-100 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 sm:w-auto"
            >
              <Play className="h-4 w-4 fill-current text-amber-400" />
              <span>Watch Sermons</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 border-t border-white/10 pt-7 text-xs font-medium text-slate-200/85">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 backdrop-blur-md">
              <Calendar className="h-4 w-4 text-amber-500" />
              <span>Monday - Fridays 8:30 AM & 4:00 PM</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 backdrop-blur-md">
              <MapPin className="h-4 w-4 text-amber-500" />
              <span>La Area Office</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- WELCOME SECTION ---------------- */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Image with Overlay Badge */}
          <div className="relative">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.24)]">
              <img
                src="/AREA HEAD.png"
                alt="Area Head"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <span className="h-0.5 w-6 bg-amber-500"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                WELCOME TO LA AREA
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Message From The Area Head
            </h2>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
             The Church of Pentecost – La Area is an Area of The Church of Pentecost, serving the communities and local assemblies within the La Area.
             Rooted in the Word of God and guided by the Holy Spirit, we are committed to spreading the Gospel of Jesus Christ, nurturing believers, strengthening families, and reaching communities with the transforming message of Christ.
            </p>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Whether you are visiting for the first time, searching for a church home, or
              looking to reconnect with God, there is a place for you here.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-xs font-bold text-emerald-800 transition hover:text-emerald-900"
              >
                <span className="group-hover:underline underline-offset-4">Learn more about us</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- STATS COUNTER BAR ---------------- */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-20">
        <div className="grid grid-cols-2 gap-8 rounded-[1.6rem] border border-slate-800 bg-slate-900 px-8 py-10 text-center text-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.45)] md:grid-cols-4">
        <div className="border-r border-slate-800 last:border-0">
          <div className="font-serif text-3xl font-bold text-amber-500 sm:text-4xl">81</div>
          <div className="mt-1 text-xs font-medium text-slate-400">Local Assemblies</div>
          </div>
        <div className="border-r border-slate-800 last:border-0">
          <div className="font-serif text-3xl font-bold text-amber-500 sm:text-4xl">24</div>
          <div className="mt-1 text-xs font-medium text-slate-400">Districts</div>
          </div>
        <div className="border-r border-slate-800 last:border-0">
          <div className="font-serif text-3xl font-bold text-amber-500 sm:text-4xl">40+</div>
          <div className="mt-1 text-xs font-medium text-slate-400">Years of Ministry</div>
          </div>
          <div>
          <div className="font-serif text-3xl font-bold text-amber-500 sm:text-4xl">58,000+</div>
          <div className="mt-1 text-xs font-medium text-slate-400">Members & Families</div>
          </div>
        </div>
      </section>

      {/* ---------------- UPCOMING EVENTS ---------------- */}
      <section id="events" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="h-0.5 w-6 bg-amber-500"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              UPCOMING EVENTS
            </span>
            <span className="h-0.5 w-6 bg-amber-500"></span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">
            Gather With Us
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Join us for worship, teaching, fellowship, and service across the La Area.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Featured Event */}
          {event ? (
            <div className="group relative lg:col-span-12 flex min-h-[380px] flex-col justify-end overflow-hidden rounded-[1.6rem] border border-slate-200 bg-[radial-gradient(ellipse_at_18%_8%,rgba(245,158,11,0.16),transparent_38%),linear-gradient(135deg,#334155_0%,#1e293b_58%,#0f172a_100%)] shadow-[0_24px_60px_-24px_rgba(15,23,42,0.32)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-24px_rgba(15,23,42,0.4)]">
              {event.image && (
                <img
                  src={`${event.image}?w=1600&auto=format`}
                  alt={event.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-black/10" />
              <div className="relative space-y-3 p-6 text-white sm:p-8">
                <span className="inline-flex rounded-full border border-amber-400/25 bg-amber-600/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                  Upcoming Event
                </span>
                <h3 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">{event.title}</h3>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-100/85">
                  <div className="flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/40 px-3 py-2 backdrop-blur-md">
                    <Calendar className="h-3.5 w-3.5 text-amber-400" />
                    <span>{formatDate(event.startDate)}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/40 px-3 py-2 backdrop-blur-md">
                      <MapPin className="h-3.5 w-3.5 text-amber-400" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="lg:col-span-12 text-center text-sm text-slate-500">
              No upcoming events right now. Check back soon.
            </p>
          )}
        </div>
      </section>

      {/* ---------------- SERMONS & MEDIA ---------------- */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="h-0.5 w-6 bg-amber-500"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              SERMONS & MEDIA
            </span>
            <span className="h-0.5 w-6 bg-amber-500"></span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">
            Be Encouraged & Equipped
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Listen to recent messages from our pastors and be strengthened in your walk with God.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sermons.map((s) => (
            <div key={s.id} className="group overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_18px_50px_-24px_rgba(15,23,42,0.2)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_60px_-22px_rgba(15,23,42,0.28)]">
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <img
                  src={s.customThumb ?? youtubeThumb(s.youtubeUrl)}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-black/10" />
                {s.duration && (
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md">
                    {s.duration}
                  </span>
                )}
              </div>
              <div className="p-5 sm:p-6">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/15 bg-amber-50 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
                  <Calendar className="h-3.5 w-3.5 text-amber-600" />
                  <span>{formatDate(s.date)}</span>
                </div>
                <h3 className="font-serif text-lg font-semibold leading-snug tracking-tight text-slate-900">{s.title}</h3>
                <p className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
                  <span className="truncate">{s.speaker}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/sermons"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-7 py-3 text-xs font-bold text-white shadow-[0_10px_30px_-12px_rgba(6,78,59,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-900"
          >
            <span>Browse Sermon Library</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ---------------- OUR MINISTRIES ---------------- */}
      <section id="ministries" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="h-0.5 w-6 bg-amber-500"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              OUR MINISTRIES
            </span>
            <span className="h-0.5 w-6 bg-amber-500"></span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">
            Grow, Serve & Belong
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            There is a ministry for every age and season of life. Find your place to grow and serve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_18px_50px_-24px_rgba(15,23,42,0.2)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_60px_-22px_rgba(15,23,42,0.28)]">
          <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
              <img
                src="/pemem-pic.jpg"
                alt="Men's Ministry"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-black/5" />
          </div>
          <div className="p-5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-white bg-white/80 text-sm font-bold text-emerald-800 shadow-sm">
              <img src="/Pemem.png" alt="PEMEM" className="w-full h-full object-cover" />
            </div>
            <h3 className="mb-2 font-serif text-lg font-semibold tracking-tight text-slate-900">Men&apos;s Ministry</h3>
            <p className="text-xs leading-relaxed text-slate-600">
                Man!!!! The Image and the Glory Of God!<br />
                Man!!!! Be Strong and Courageous!!<br />
                Man!!!! We are firmly established!!!
              </p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_18px_50px_-24px_rgba(15,23,42,0.2)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_60px_-22px_rgba(15,23,42,0.28)]">
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
              <img
                src="/women-pic.jpg"
                alt="Women's Ministry"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-black/5" />
            </div>
            <div className="p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-white bg-white/80 text-sm font-bold text-emerald-800 shadow-sm">
                <img src="/Women.png" alt="WOMEN" className="w-full h-full object-cover" />
              </div>
              <h3 className="mb-2 font-serif text-lg font-semibold tracking-tight text-slate-900">Women&apos;s Ministry</h3>
              <p className="text-xs leading-relaxed text-slate-600">
                Kronkron!!!, Ma Awurade.
              </p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_18px_50px_-24px_rgba(15,23,42,0.2)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_60px_-22px_rgba(15,23,42,0.28)]">
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
              <img
                src="/youth-pic.jpg"
                alt="Youth Ministry"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-black/5" />
            </div>
            <div className="p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-white bg-white/80 text-sm font-bold text-amber-700 shadow-sm">
               <img src="/Youth.jpg" alt="YOUTH" className="w-full h-full object-cover" />
              </div>
              <h3 className="mb-2 font-serif text-lg font-semibold tracking-tight text-slate-900">Youth Ministry</h3>
              <p className="text-xs leading-relaxed text-slate-600">
                Youth!!!! Arise and Shine<br />
                Youth!!!! Remember Your Creator Now<br />
                Youth!!!! Empowered to Live For Christ Everywhere
              </p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_18px_50px_-24px_rgba(15,23,42,0.2)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_60px_-22px_rgba(15,23,42,0.28)]">
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
              <img
                src="/children-pic.jpg"
                alt="Children Ministry"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-black/5" />
            </div>
            <div className="p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-white bg-white/80 text-sm font-bold text-amber-700 shadow-sm">
                <img src="/Children.jpg" alt="CHILDREN" className="w-full h-full object-cover" />
              </div>
              <h3 className="mb-2 font-serif text-lg font-semibold tracking-tight text-slate-900">Children Ministry</h3>
              <p className="text-xs leading-relaxed text-slate-600">
                Jesus!!!!, Friend of Little Children<br />
                Jesus!!!!, The One who welcomes all Children unto Himself<br />
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-10">
          <Link
            href="/ministries"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-7 py-3 text-xs font-bold text-white shadow-[0_10px_30px_-12px_rgba(6,78,59,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-900"
          >
            <span>Get Involved</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ---------------- SCRIPTURE BANNER ---------------- */}
      <section className="relative overflow-hidden border-t border-emerald-950/20 bg-emerald-900 px-4 py-16 text-center text-white">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,185,129,0.22),transparent_65%)]" />
        <div className="relative mx-auto max-w-3xl space-y-3">
          <blockquote className="font-serif text-2xl font-semibold leading-relaxed text-emerald-50 sm:text-3xl">
            “Go into all the world and preach the gospel to every creature.”
          </blockquote>
          <p className="pt-2 text-xs font-bold uppercase tracking-widest text-amber-400">
            — MARK 16:15
          </p>
        </div>
      </section>
      
    </div>
  );
}
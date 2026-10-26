import React from 'react';
import Link from 'next/link';
import { sanityFetchSafe } from '@/src/sanity/fetch';
import { formatDate, youtubeThumb } from '@/src/sanity/format';
import { nextEventQuery, latestSermonsQuery, type HomeEvent, type HomeSermon } from '@/src/sanity/queries';
import {
  ArrowRight,
  Calendar,
  MapPin,
  Play,
  Quote,
  Building2,
  Users2,
} from 'lucide-react';

export default async function HomePage() {
  const [event, sermons] = await Promise.all([
    sanityFetchSafe<HomeEvent | null>(nextEventQuery, {}, null, { revalidate: false, documentType: 'event' }),
    sanityFetchSafe<HomeSermon[]>(latestSermonsQuery, {}, [], { documentType: 'sermon' }),
  ]);

  return (
    <div className="church-page min-h-screen text-slate-900 font-sans antialiased selection:bg-amber-500 selection:text-white dark:bg-slate-950 dark:text-slate-100">
      
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative flex min-h-[78vh] items-center justify-center overflow-hidden bg-[#17362c] text-white">
        {/* Background Image & Editorial Overlays */}
        <div 
          className="absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat opacity-45 mix-blend-normal filter contrast-105"
          style={{ backgroundImage: "url('/theme.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10251e] via-[#17362c]/75 to-[#17362c]/35" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,37,30,0.45),transparent_65%)]" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center sm:py-36">
          

          <div className="mb-6 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
           
            <span className="h-px w-10 bg-amber-300/70" />
          </div>
          <h1 className="mb-6 font-serif text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl">
            The Church of Pentecost.<br /><span className="text-amber-300">La Area.</span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-base font-light leading-relaxed text-slate-300 sm:text-lg md:text-xl">
            Welcome to The Church of Pentecost, La Area. We are a family of believers rooted in the Word, empowered by the Holy Spirit, and ready to walk with you.
          </p>

         <div className="mb-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
  <Link
    href="/assemblies"
    className="group inline-flex w-full items-center justify-center gap-3 rounded-md bg-amber-500 px-8 py-4 text-sm font-semibold text-[#17362c] transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-400 sm:w-auto"
  >
    <span>Find a Local Assembly</span>
    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
  </Link>
  <Link
    href="/sermons"
    className="group inline-flex w-full items-center justify-center gap-3 rounded-md border border-white/45 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 sm:w-auto"
  >
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-slate-950">
      <Play className="h-3 w-3 fill-current ml-0.5" />
    </div>
    <span>Watch Latest Sermons</span>
  </Link>
</div>

          <div className="inline-flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-xl text-xs font-medium text-slate-300">
            <div className="flex items-center gap-2 px-3 py-1">
              <Calendar className="h-4 w-4 text-green-400" />
              <span>Office Hours: Mon - Fri, 9:00 AM & 4:00 PM</span>
            </div>
            <div className="hidden h-4 w-px bg-white/10 sm:block" />
            <div className="flex items-center gap-2 px-3 py-1">
              <MapPin className="h-4 w-4 text-green-400" />
              <span>La Area Office, Accra</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- WELCOME SECTION (EDITORIAL MAGAZINE LAYOUT) ---------------- */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Editorial Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo Frame */}
              <div className="aspect-[4/5] overflow-hidden rounded-sm border-8 border-[#fffdf8] bg-slate-200 shadow-[0_24px_50px_-28px_rgba(28,41,35,0.6)] dark:border-slate-900 dark:bg-slate-900">
                <img
                  src="/AREA HEAD.png"
                  alt="Area Head"
                  className="h-full w-full object-cover object-top grayscale-[15%] contrast-105 transition-transform duration-700 hover:scale-105"
                />
              </div>
              
              {/* Overlapping Institutional Badge */}
              <div className="absolute -bottom-6 -right-6 hidden max-w-xs flex-col border border-[#ded7c9] bg-[#fffdf8] p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:flex">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-600" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">Leadership</span>
                </div>
                <p className="font-serif text-sm font-bold text-slate-900 dark:text-white">Apostle Dr Dieudonne</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">La Area Head</p>
              </div>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="h-px w-8 bg-green-500" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-green-700 dark:text-green-400">
                Welcome to La Area
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] dark:text-slate-50">
              Message From The Area Head
            </h2>

            <div className="relative pl-6 border-l-2 border-green-500/40 my-6">
              <Quote className="absolute -top-2 -left-3 h-6 w-6 text-green-500/20 fill-current" />
              <p className="text-slate-700 text-base md:text-lg leading-relaxed dark:text-slate-300 font-serif italic">
                &ldquo;Rooted in the Word of God and guided by the Holy Spirit, we are committed to spreading the Gospel of Jesus Christ, nurturing believers, and strengthening families across our communities.&rdquo;
              </p>
            </div>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed dark:text-slate-400">
              Whether you are visiting for the first time, searching for a permanent church home, or looking to reconnect with your faith, our doors and hearts are wide open to receive you.
            </p>

            <div className="pt-4 flex items-center gap-6">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 text-sm font-bold text-emerald-800 transition-colors hover:text-emerald-950 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                <span className="border-b border-emerald-800/40 pb-0.5 transition-all group-hover:border-emerald-800 dark:border-emerald-400/40">Read More</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
              
          </div>

        </div>
      </section>

      {/* ---------------- STATS COUNTER BAR ---------------- */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-20">
        <div className="grid grid-cols-2 gap-8 border-y border-[#d8cdbb] bg-[#eee7d8] px-8 py-10 text-center text-[#17362c] md:grid-cols-4">
        <div className="border-r border-slate-800 last:border-0">
          <div className="font-serif text-4xl font-semibold text-emerald-900 sm:text-5xl">81</div>
          <div className="mt-1 text-xs font-medium text-slate-600">Local Assemblies</div>
          </div>
        <div className="border-r border-slate-800 last:border-0">
          <div className="font-serif text-4xl font-semibold text-emerald-900 sm:text-5xl">24</div>
          <div className="mt-1 text-xs font-medium text-slate-600">Districts</div>
          </div>
        <div className="border-r border-slate-800 last:border-0">
          <div className="font-serif text-4xl font-semibold text-emerald-900 sm:text-5xl">40+</div>
          <div className="mt-1 text-xs font-medium text-slate-600">Years of Ministry</div>
          </div>
          <div>
          <div className="font-serif text-4xl font-semibold text-emerald-900 sm:text-5xl">58,000+</div>
          <div className="mt-1 text-xs font-medium text-slate-600">Members & Families</div>
          </div>
        </div>
      </section>


      {/* ---------------- UPCOMING EVENTS ---------------- */}
      <section id="events" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="h-px w-6 bg-green-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-green-700 dark:text-green-400">
                UPCOMING EVENTS
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50">
              Gather With Us
            </h2>
          </div>
          <p className="text-slate-600 text-sm mt-3 md:mt-0 max-w-md dark:text-slate-400">
            Join us for powerful times of worship, teaching, fellowship, and service across the La Area.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {event ? (
            <div className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-2xl transition-all duration-500 hover:shadow-3xl dark:border-slate-800">
              {event.image && (
                <img
                  src={`${event.image}?w=1600&auto=format`}
                  alt={event.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-110"
                />
              )}
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="relative p-8 sm:p-12 space-y-4 max-w-3xl">
                <span className="inline-flex rounded-full bg-amber-500 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-950">
                  Featured Event
                </span>
                
                <h3 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">{event.title}</h3>
                
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-medium text-slate-200">
                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-md">
                    <Calendar className="h-4 w-4 text-amber-400" />
                    <span>{formatDate(event.startDate)}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-md">
                      <MapPin className="h-4 w-4 text-amber-400" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500 dark:border-slate-800 dark:bg-slate-900">
              No upcoming events right now. Check back soon.
            </div>
          )}
        </div>
      </section>

     {/* ---------------- SERMONS & MEDIA ---------------- */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="h-0.5 w-6 bg-green-500"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-green-700">
              SERMONS & MEDIA
            </span>
            <span className="h-0.5 w-6 bg-green-500"></span>
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
      <section id="ministries" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="h-px w-6 bg-amber-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
              OUR MINISTRIES
            </span>
            <span className="h-px w-6 bg-amber-500" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50">
            Grow, Serve & Belong
          </h2>
          <p className="text-slate-600 text-sm mt-3 dark:text-slate-400">
            There is a ministry for every age and season of life. Find your place to connect and serve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Men's Ministry */}
          <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img src="/pemem-pic.jpg" alt="Men's Ministry" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 h-10 w-10 overflow-hidden rounded-xl border border-white/20 bg-white shadow-md p-1">
                <img src="/Pemem.png" alt="PEMEM" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 font-serif text-lg font-bold text-slate-900 dark:text-slate-50">Men&apos;s Ministry</h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 space-y-1">
                <span className="block font-medium text-emerald-800 dark:text-emerald-400">Man! The Image and Glory of God!</span>
                <span className="block">Be Strong and Courageous. Firmly established in Christ.</span>
              </p>
            </div>
          </div>

          {/* Women's Ministry */}
          <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img src="/women-pic.jpg" alt="Women's Ministry" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 h-10 w-10 overflow-hidden rounded-xl border border-white/20 bg-white shadow-md p-1">
                <img src="/Women.png" alt="WOMEN" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 font-serif text-lg font-bold text-slate-900 dark:text-slate-50">Women&apos;s Ministry</h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 space-y-1">
                <span className="block font-medium text-emerald-800 dark:text-emerald-400">Kronkron! Ma Awurade.</span>
                <span className="block">Exemplary Christian womanhood and impactful community service.</span>
              </p>
            </div>
          </div>

          {/* Youth Ministry */}
          <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img src="/youth-pic.jpg" alt="Youth Ministry" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 h-10 w-10 overflow-hidden rounded-xl border border-white/20 bg-white shadow-md p-1">
                <img src="/Youth.jpg" alt="YOUTH" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 font-serif text-lg font-bold text-slate-900 dark:text-slate-50">Youth Ministry</h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 space-y-1">
                <span className="block font-medium text-amber-600 dark:text-amber-400">Youth! Arise and Shine.</span>
                <span className="block">Empowered to live for Christ everywhere.</span>
              </p>
            </div>
          </div>

          {/* Children's Ministry */}
          <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img src="/children-pic.jpg" alt="Children Ministry" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 h-10 w-10 overflow-hidden rounded-xl border border-white/20 bg-white shadow-md p-1">
                <img src="/Children.jpg" alt="CHILDREN" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 font-serif text-lg font-bold text-slate-900 dark:text-slate-50">Children&apos;s Ministry</h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 space-y-1">
                <span className="block font-medium text-amber-600 dark:text-amber-400">Jesus! Friend of Little Children.</span>
                <span className="block">Nurturing young hearts in the fear and admonition of the Lord.</span>
              </p>
            </div>
          </div>

        </div>

        <div className="text-center mt-12">
          <Link
            href="/ministries"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-8 py-3.5 text-xs font-bold text-white shadow-lg shadow-emerald-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-900"
          >
            <span>Explore Ministries</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      
    </div>
  );
}

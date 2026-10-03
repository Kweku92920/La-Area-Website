import React from 'react';
import Link from 'next/link';
import { sanityFetch, sanityFetchWithOptions } from '@/src/sanity/client';
import { formatDate, youtubeThumb } from '@/src/sanity/format';
import { nextEventQuery, latestSermonsQuery, type HomeEvent, type HomeSermon } from '@/src/sanity/queries';
import {
  Phone,
  ArrowRight,
  Flame,
  Calendar,
  MapPin,
  Clock,
  Play,
  Heart,
} from 'lucide-react';

export default async function HomePage() {
  const [event, sermons] = await Promise.all([
    sanityFetchWithOptions<HomeEvent | null>(nextEventQuery, {}, { revalidate: false }),
    sanityFetch<HomeSermon[]>(latestSermonsQuery),
  ]);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden">
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage: "url('/theme.jpg')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-24">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.15] text-white">
            The Church of Pentecost- La.
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            The Church of Pentecost – La Area welcomes you to worship with us. Find
            your nearest local assembly, grow in faith, and experience the love of Christ in
            community.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/assemblies"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3.5 rounded-lg transition shadow-lg shadow-amber-600/20"
            >
              <span>Find a Local Assembly</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/sermons"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-100 font-semibold px-8 py-3.5 rounded-lg backdrop-blur-sm transition"
            >
              <Play className="w-4 h-4 fill-current text-amber-400" />
              <span>Watch Sermons</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-medium text-slate-300/90 border-t border-slate-800/80 pt-8">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>Monday - Fridays 8:30 AM & 4:00 PM</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-amber-500" />
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
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 relative aspect-[4/3]">
              <img
                src="/AREA HEAD.png"
                alt="Area Head"
                className="w-full h-full object-cover"
              />
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
                className="group inline-flex items-center space-x-2 text-xs font-bold text-emerald-800 hover:text-emerald-900 transition"
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
        <div className="bg-slate-900 text-white rounded-2xl py-10 px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center shadow-xl border border-slate-800">
          <div className="border-r border-slate-800 last:border-0">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-amber-500">81</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Local Assemblies</div>
          </div>
          <div className="border-r border-slate-800 last:border-0">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-amber-500">24</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Districts</div>
          </div>
          <div className="border-r border-slate-800 last:border-0">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-amber-500">40+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Years of Ministry</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-amber-500">58,000+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Members & Families</div>
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
            <div className="lg:col-span-12 relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 flex flex-col justify-end min-h-[380px] group bg-slate-900">
              {event.image && (
                <img
                  src={`${event.image}?w=1600&auto=format`}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
              <div className="relative p-6 text-white space-y-2">
                <span className="bg-amber-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Upcoming Event
                </span>
                <h3 className="font-serif text-2xl font-bold">{event.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{formatDate(event.startDate)}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
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
            <div key={s.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
              <div className="relative aspect-video">
                <img
                  src={s.customThumb ?? youtubeThumb(s.youtubeUrl)}
                  alt={s.title}
                  className="w-full h-full object-cover"
                />
                {s.duration && (
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded">
                    {s.duration}
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-slate-400 uppercase mb-1">
                  <Calendar className="w-3 h-3 text-amber-500" />
                  <span>{formatDate(s.date)}</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-slate-900 leading-snug">{s.title}</h3>
                <p className="text-xs text-slate-500 mt-2 font-medium">{s.speaker}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/sermons"
            className="inline-flex items-center justify-center space-x-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-7 py-3 rounded-lg transition shadow-sm"
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
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
            <div className="aspect-[4/3]">
              <img
                src="/pemem-pic.jpg"
                alt="Men's Ministry"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3 font-bold text-sm overflow-hidden">
                <img src="/Pemem.png" alt="PEMEM" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-2">Men&apos;s Ministry</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Man!!!! The Image and the Glory Of God!<br />
                Man!!!! Be Strong and Courageous!!<br />
                Man!!!! We are firmly established!!!
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
            <div className="aspect-[4/3]">
              <img
                src="/women-pic.jpg"
                alt="Women's Ministry"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3 font-bold text-sm">
                <img src="/Women.png" alt="WOMEN" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-2">Women&apos;s Ministry</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kronkron!!!, Ma Awurade.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
            <div className="aspect-[4/3]">
              <img
                src="/youth-pic.jpg"
                alt="Youth Ministry"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
               <img src="/Youth.jpg" alt="YOUTH" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-2">Youth Ministry</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Youth!!!! Arise and Shine<br />
                Youth!!!! Remember Your Creator Now<br />
                Youth!!!! Empowered to Live For Christ Everywhere
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
            <div className="aspect-[4/3]">
              <img
                src="/children-pic.jpg"
                alt="Children Ministry"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                <img src="/Children.jpg" alt="CHILDREN" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-2">Children Ministry</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Jesus!!!!, Friend of Little Children<br />
                Jesus!!!!, The One who welcomes all Children unto Himself<br />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SCRIPTURE BANNER ---------------- */}
      <section className="bg-emerald-900 text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <blockquote className="font-serif text-2xl sm:text-3xl font-semibold leading-relaxed text-emerald-50">
            “Go into all the world and preach the gospel to every creature.”
          </blockquote>
          <p className="text-xs font-bold tracking-widest text-amber-400 uppercase pt-2">
            — MARK 16:15
          </p>
        </div>
      </section>
      
    </div>
  );
}
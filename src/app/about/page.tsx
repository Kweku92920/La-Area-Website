import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <section className="relative flex h-[360px] items-center justify-center overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
         <div className="mb-3 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-widest text-stone-300">
            <Link href="/" className="">Home</Link>
            <span aria-hidden="true">&rsaquo;</span>
            <span className="text-stone-100">About</span>
          </div>
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
            About the LA Area
          </h1>
          <p className="mx-auto max-w-xl text-base font-normal text-slate-300 sm:text-lg">
            A vibrant, Spirit-filled church family serving the Lord
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="flex items-center space-x-2">
              <span className="h-0.5 w-6 bg-amber-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700">Who We Are</span>
            </div>
            <h2 className="font-serif text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              An Area Unleashed to Transform Soicety Through the Gospel and Power of the Holy Spirit
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 md:text-base">
              The Church of Pentecost – La Area is a vibrant Christian community serving under the Church Of Pentecost. Rooted in Scripture and led by the Holy Spirit, we exist to bring the love of Jesus Christ to every home, every neighborhood, and every life.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-slate-200 shadow-md">
              <img
                src=""
                alt="Picture 1"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-6 aspect-[4/5] overflow-hidden rounded-2xl border border-slate-200 shadow-md">
              <img
                src=""
                alt="Picture 2"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200/80 bg-slate-100/70 px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
            Our Area Structure
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            We are organized as an Area, made up of districts, each overseeing a network of local assemblies across the region.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
            <Link href="/districts" className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-800 px-7 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-900 sm:w-auto">
              Explore Districts
            </Link>
            <Link href="/assemblies" className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-7 py-3 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:w-auto">
              Find a Local Assembly
            </Link>
          </div>
        </div>
      </section>

      
    </div>
  );
}

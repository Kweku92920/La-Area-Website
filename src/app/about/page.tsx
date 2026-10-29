import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Church, MapPin } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
      <section className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-[#0f172a] px-4 py-20 text-white sm:min-h-[400px]">
        <Image
          src="/theme.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_10%,rgba(59,130,246,0.22),transparent_58%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0a1120]/90 via-[#0f172a]/65 to-[#0f172a]/35"
        />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            About the La Area
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-200/85 sm:text-lg">
            A vibrant, Spirit-filled church family serving the Lord
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-yellow-700 dark:text-yellow-300">
              <span className="h-px w-8 bg-yellow-500/50" />
              Who We Are
            </div>
            <h2 className="max-w-2xl font-serif text-3xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl md:text-[2.75rem]">
              An Area Unleashed to Transform Society Through the Gospel and Power of the Holy Spirit
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">
              The Church of Pentecost – La Area is a vibrant Christian community serving under the Church Of Pentecost. Rooted in Scripture and led by the Holy Spirit, we exist to bring the love of Jesus Christ to every home, every neighborhood, and every life.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div
              aria-hidden="true"
              className="absolute -right-4 -top-4 h-28 w-28 rounded-full border border-yellow-500/20 bg-yellow-500/[0.06] sm:-right-6 sm:-top-6 sm:h-36 sm:w-36"
            />
            <div className="relative grid grid-cols-[1.1fr_0.9fr] items-center gap-3 sm:gap-4">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-[1.6rem] border border-white bg-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.28)]">
                <Image
                  src="/AREA HEAD.png"
                  alt="Area Head serving the LA Area"
                  fill
                  sizes="(min-width: 1024px) 28vw, 55vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/35 via-transparent to-transparent" />
              </div>
              <div className="group relative mt-10 aspect-[4/5] overflow-hidden rounded-[1.6rem] border border-white bg-slate-200 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.24)] sm:mt-14">
                <Image
                  src="/theme.jpg"
                  alt="Church community gathered in worship"
                  fill
                  sizes="(min-width: 1024px) 24vw, 45vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/45 via-transparent to-transparent" />
              </div>
            </div>
            <div className="absolute -bottom-5 left-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-4 py-3 text-xs font-semibold text-slate-700 shadow-xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-200 sm:left-6">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-yellow-500/10 text-yellow-700 dark:text-yellow-300">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
              </span>
              La Area, Accra
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 md:px-8 md:pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.8rem] border border-slate-800 bg-[#0f172a] px-6 py-12 text-center text-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.4)] sm:px-10 sm:py-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.2),transparent_62%)]"
          />
          <div className="relative mx-auto max-w-3xl">
            <span className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-yellow-300">
              <Church aria-hidden="true" className="h-5 w-5" />
            </span>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-yellow-300">
              Growing together
            </p>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Our Area Structure
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              We are organized as an Area, made up of districts, each overseeing a network of local assemblies across the region.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/districts"
                className="inline-flex w-full items-center justify-between gap-8 rounded-full border border-white/15 bg-white/[0.07] py-2 pl-5 pr-2 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.14] sm:w-auto"
              >
                Explore Districts
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-slate-950">
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </Link>
              <Link
                href="/assemblies"
                className="inline-flex w-full items-center justify-between gap-8 rounded-full bg-blue-600 py-2 pl-5 pr-2 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(37,99,235,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 sm:w-auto"
              >
                Find a Local Assembly
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-blue-700">
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

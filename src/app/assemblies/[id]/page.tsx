import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Navigation, 
  ChevronRight 
} from 'lucide-react';
import { sanityFetch } from '@/src/sanity/client';
import { MINISTER_TBA } from '@/src/sanity/format';
import { assemblyBySlugQuery, assemblySlugsQuery, type AssemblyDetail } from '@/src/sanity/queries';

export async function generateStaticParams() {
  return sanityFetch<{ id: string }[]>(assemblySlugsQuery);
}

export default async function AssemblyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const assembly = await sanityFetch<AssemblyDetail | null>(assemblyBySlugQuery, { id });

  if (!assembly) {
    notFound();
  }

  // Supporting flexible types if data has arrays or strings
  const serviceTimes = Array.isArray(assembly.time) 
    ? assembly.time 
    : [assembly.time || "Sunday Worship - 9:00 AM"];

  const phone = assembly.phone || "";
  const email = assembly.email || `${assembly.id}@coplaarea.org`;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-950 px-6 py-24 text-white overflow-hidden">
        {/* Optional background image overlay styling if available */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="mx-auto max-w-6xl relative z-10">
          {/* Breadcrumbs */}
          <div className="mb-6 flex items-center gap-2 text-xs md:text-sm text-emerald-200/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-emerald-400" />
            <Link href="/assemblies" className="hover:text-white transition-colors">Local Assemblies</Link>
            <ChevronRight className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-white font-medium">{assembly.name}</span>
          </div>

          <div className="flex flex-col items-center text-center mt-4">
            {assembly.district && (
              <span className="mb-4 inline-block rounded-full bg-amber-500/20 border border-amber-500/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300">
                {assembly.district}
              </span>
            )}
            <h1 className="font-serif text-4xl font-bold md:text-6xl tracking-tight text-white">
              {assembly.name}
            </h1>
            <p className="mt-4 flex items-center gap-1.5 text-emerald-100/90 text-sm md:text-base">
              <MapPin className="h-4 w-4 text-amber-400" />
              {assembly.location}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Service Times, Map) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Service Times Card */}
            <div className="rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-stone-900 mb-6">Service Times</h2>
              <div className="space-y-4">
                {serviceTimes.map((timeStr: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 text-stone-700">
                    <Clock className="h-5 w-5 text-amber-700 shrink-0" />
                    <span className="text-sm md:text-base">{timeStr}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map View */}
            <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm overflow-hidden">
              <div className="w-full h-80 rounded-xl overflow-hidden border border-stone-100">
                <iframe
                  title={`Map showing location of ${assembly.name}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(assembly.location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                />
              </div>
            </div>

          </div>

          {/* Right Column (Pastor, Contact Info, Get Directions) */}
          <div className="space-y-6">
            
            {/* Pastor Card */}
            <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
              
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">District Minister</p>
                <p className="mt-1 text-sm font-medium text-[#8B2621]">{(assembly.districtMinister ?? MINISTER_TBA)}</p>
                <p className="text-xs text-stone-500">{assembly.district} District</p>
              </div>
            </div>
            
            {/* Get Directions Button */}
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(assembly.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#7C2D27] hover:bg-[#65231F] text-white py-4 px-6 font-medium shadow-md transition-colors text-center"
            >
              <Navigation className="h-4 w-4" />
              Get Directions
            </a>

          </div>

        </div>
      </section>
    </div>
  );
}
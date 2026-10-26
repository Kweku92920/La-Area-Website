import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import type { Scripture, SiteSettings } from '@/src/sanity/queries';
import ScriptureTicker from './ScriptureTicker';

export default function SiteFooter({ settings, scriptures = [] }: { settings?: SiteSettings; scriptures?: Scripture[] }) {
  const address = settings?.address || 'La Area Office, Accra, Ghana';
  const phone = settings?.phone || '(213) 555-0142';
  const email = settings?.email || 'info@coplaarea.org';

  return (
    <footer className="relative overflow-hidden border-t border-emerald-950 bg-[#17362c] px-4 py-14 text-xs text-emerald-100/70 md:px-8 md:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(201,151,66,0.14),transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl">
        <ScriptureTicker scriptures={scriptures} />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        <div className="space-y-5">
          <Link href="/" className="group inline-flex items-center space-x-3">
            <div className="h-11 w-11 flex-shrink-0 overflow-hidden rounded-full border border-amber-300/30 bg-slate-900 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <img src="/Logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-serif text-lg font-semibold tracking-tight text-white">
                The Church of Pentecost
              </div>
              <div className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-amber-500">
                LA AREA
              </div>
            </div>
          </Link>
          <p className="max-w-xs leading-relaxed text-slate-400">
            A welcoming church family, serving the La Area through the Gospel and the power of the Holy Spirit.
          </p>
        </div>
        <div>
          <h2 className="mb-4 font-serif text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">Quick Links</h2>
          <ul className="space-y-1">
            <li><Link href="/about" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-amber-300">About Us</Link></li>
            <li><Link href="/leadership" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-amber-300">Leadership</Link></li>
            <li><Link href="/districts" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-amber-300">Districts</Link></li>
            <li><Link href="/assemblies" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-amber-300">Local Assemblies</Link></li>
            <li><Link href="/sermons" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-amber-300">Sermons</Link></li>
            <li><Link href="/ministries" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-amber-300">Ministries</Link></li>
            <li><a href={`mailto:${email}`} className="inline-flex rounded-lg py-1.5 transition-colors hover:text-amber-300">Contact</a></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-serif text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">Office Hours</h2>
          <div className="rounded-2xl border border-slate-800 bg-white/[0.04] p-4">
            <div className="flex flex-col gap-2">
              <span className="text-slate-400">Monday – Friday</span>
              <span className="font-medium text-white">8:00 AM – 4:30 PM</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-4 font-serif text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">Contact Us</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-amber-500/15 bg-amber-500/[0.08]">
                <MapPin className="h-3.5 w-3.5 text-amber-400" />
              </span>
              <span>{address}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-amber-500/15 bg-amber-500/[0.08]">
                <Phone className="h-3.5 w-3.5 text-amber-400" />
              </span>
              <span>{phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-amber-500/15 bg-amber-500/[0.08]">
                <Mail className="h-3.5 w-3.5 text-amber-400" />
              </span>
              <a href={`mailto:${email}`} className="transition-colors hover:text-white">{email}</a>
            </li>
          </ul>
        </div>
        </div>
      </div>
      <div className="relative mx-auto mt-12 flex max-w-7xl flex-col gap-2 border-t border-emerald-100/15 pt-5 text-[11px] text-emerald-100/45 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} The Church of Pentecost · LA Area</span>
        <span>Rooted in Christ. Ready to serve.</span>
      </div>
    </footer>
  );
}

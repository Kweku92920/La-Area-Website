import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-950 px-4 py-14 text-xs text-slate-400 md:px-8 md:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(16,185,129,0.12),transparent_45%)]" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        <div className="space-y-5">
          <Link href="/" className="group inline-flex items-center space-x-3">
            <div className="h-11 w-11 flex-shrink-0 overflow-hidden rounded-full border border-slate-700 bg-slate-900 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <img src="/Logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-serif text-base font-bold tracking-tight text-white">
                The Church of Pentecost
              </div>
              <div className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-amber-500">
                LA AREA
              </div>
            </div>
          </Link>
          <p className="max-w-xs leading-relaxed text-slate-400">
            The Church Unleashed to Transform Society through the Gospel and the Power of the Holy Spirit.
          </p>
        </div>
        <div>
          <h2 className="mb-4 font-serif text-xs font-bold uppercase tracking-[0.16em] text-white">Quick Links</h2>
          <ul className="space-y-1">
            <li><Link href="/about" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-amber-300">About Us</Link></li>
            <li><Link href="/leadership" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-amber-300">Leadership</Link></li>
            <li><Link href="/districts" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-amber-300">Districts</Link></li>
            <li><Link href="/assemblies" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-amber-300">Local Assemblies</Link></li>
            <li><Link href="/sermons" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-amber-300">Sermons</Link></li>
            <li><a href="mailto:info@coplaarea.org" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-amber-300">Contact</a></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-serif text-xs font-bold uppercase tracking-[0.16em] text-white">Office Hours</h2>
          <div className="rounded-2xl border border-slate-800 bg-white/[0.04] p-4">
            <div className="flex flex-col gap-2">
              <span className="text-slate-400">Monday – Friday</span>
              <span className="font-medium text-white">8:00 AM – 4:30 PM</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-4 font-serif text-xs font-bold uppercase tracking-[0.16em] text-white">Contact Us</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-amber-500/15 bg-amber-500/[0.08]">
                <MapPin className="h-3.5 w-3.5 text-amber-400" />
              </span>
              <span>La Area Office, Accra, Ghana</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-amber-500/15 bg-amber-500/[0.08]">
                <Phone className="h-3.5 w-3.5 text-amber-400" />
              </span>
              <span>(213) 555-0142</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-amber-500/15 bg-amber-500/[0.08]">
                <Mail className="h-3.5 w-3.5 text-amber-400" />
              </span>
              <a href="mailto:info@coplaarea.org" className="transition-colors hover:text-white">info@coplaarea.org</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

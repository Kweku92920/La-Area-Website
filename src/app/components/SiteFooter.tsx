import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs py-16 px-4 md:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full overflow-hidden shadow-sm border border-slate-700 flex-shrink-0">
              <img src="/Logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-serif font-bold text-base text-white">
                The Church of Pentecost
              </div>
              <div className="text-[9px] tracking-widest text-amber-500 font-bold uppercase">
                LA AREA
              </div>
            </div>
          </Link>
          <p className="leading-relaxed">
            The Church Unleashed to Transform Society through the Gospel and the Power of the Holy Spirit.
          </p>
        </div>
        <div>
          <h2 className="font-serif font-bold text-white uppercase text-xs tracking-wider mb-4">Quick Links</h2>
          <ul className="space-y-2.5">
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/leadership" className="hover:text-white transition">Leadership</Link></li>
            <li><Link href="/districts" className="hover:text-white transition">Districts</Link></li>
            <li><Link href="/assemblies" className="hover:text-white transition">Local Assemblies</Link></li>
            <li><Link href="/sermons" className="hover:text-white transition">Sermons</Link></li>
            <li><a href="mailto:info@coplaarea.org" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>
        <div>
          <h2 className="font-serif font-bold text-white uppercase text-xs tracking-wider mb-4">Office Hours</h2>
          <div className="space-y-3">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Monday – Friday</span>
              <span className="text-white font-medium">8:00 AM – 4:30 PM</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-serif font-bold text-white uppercase text-xs tracking-wider mb-4">Contact Us</h2>
          <ul className="space-y-3">
            <li className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <span>La Area Office, Accra, Ghana</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>(213) 555-0142</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>info@coplaarea.org</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import { AtSign, Camera, Globe, Mail, MapPin, Phone, Play } from 'lucide-react';
import type { Scripture, SiteSettings } from '@/src/sanity/queries';
import ScriptureTicker from './ScriptureTicker';

const defaultSocials = [
  {
    platform: 'YouTube',
    url: 'https://www.youtube.com',
    icon: Play,
  },
  {
    platform: 'Facebook',
    url: 'https://www.facebook.com',
    icon: Globe,
  },
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com',
    icon: Camera,
  },
  {
    platform: 'Twitter / X',
    url: 'https://x.com',
    icon: AtSign,
  },
];

export default function SiteFooter({ settings, scriptures = [] }: { settings?: SiteSettings; scriptures?: Scripture[] }) {
  const address = settings?.address || 'La Area Office, Accra, Ghana';
  const phone = settings?.phone || '(213) 555-0142';
  const email = settings?.email || 'info@coplaarea.org';

  const getSocialUrl = (platformKey: string, fallbackUrl: string) => {
    const match = settings?.socials?.find(
      (s) => s.platform && s.platform.toLowerCase().includes(platformKey.toLowerCase()) && s.url
    );
    return match?.url || fallbackUrl;
  };

  const socialLinks = [
    {
      label: 'YouTube',
      href: getSocialUrl('youtube', defaultSocials[0].url),
      icon: Play,
    },
    {
      label: 'Facebook',
      href: getSocialUrl('facebook', defaultSocials[1].url),
      icon: Globe,
    },
    {
      label: 'Instagram',
      href: getSocialUrl('instagram', defaultSocials[2].url),
      icon: Camera,
    },
    {
      label: 'Twitter / X',
      href: getSocialUrl('twitter', getSocialUrl('x', defaultSocials[3].url)),
      icon: AtSign,
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0f172a] px-4 py-14 text-xs text-slate-200 md:px-8 md:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(59,130,246,0.2),transparent_48%),radial-gradient(ellipse_at_85%_100%,rgba(245,158,11,0.1),transparent_45%)]"
      />
      <div className="relative mx-auto max-w-7xl">
        <ScriptureTicker scriptures={scriptures} />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="space-y-5">
            <Link href="/" className="group inline-flex items-center space-x-3">
              <div className="h-11 w-11 flex-shrink-0 overflow-hidden rounded-full border border-amber-400/30 bg-slate-900 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <img src={settings?.logo || '/Logo.png'} alt="Logo" className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="font-serif text-lg font-semibold tracking-tight text-white">
                  The Church of Pentecost
                </div>
                <div className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-amber-400">
                  LA AREA
                </div>
              </div>
            </Link>
            <p className="max-w-xs leading-relaxed text-slate-400">
              A welcoming church family, serving the La Area through the Gospel and the power of the Holy Spirit.
            </p>
            <div className="pt-1">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Follow Our Ministry
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400/60 hover:bg-amber-400 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
              Quick Links
            </h2>
            <ul className="space-y-1">
              <li><Link href="/about" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-amber-300">About Us</Link></li>
              <li><Link href="/leadership" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-amber-300">Leadership</Link></li>
              <li><Link href="/districts" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-amber-300">Districts</Link></li>
              <li><Link href="/assemblies" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-amber-300">Local Assemblies</Link></li>
              <li><Link href="/sermons" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-amber-300">Sermons</Link></li>
              <li><Link href="/ministries" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-amber-300">Ministries</Link></li>
              <li><Link href="/news" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-amber-300">News &amp; Updates</Link></li>
              <li><a href={`mailto:${email}`} className="inline-flex rounded-lg py-1.5 transition-colors hover:text-amber-300">Contact</a></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
              Office Hours
            </h2>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex flex-col gap-2">
                <span className="text-slate-400">Monday – Friday</span>
                <span className="font-medium text-white">8:00 AM – 4:30 PM</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
              Contact Us
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-amber-500/20 bg-amber-500/10">
                  <MapPin className="h-3.5 w-3.5 text-amber-400" />
                </span>
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-amber-500/20 bg-amber-500/10">
                  <Phone className="h-3.5 w-3.5 text-amber-400" />
                </span>
                <span>{phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-amber-500/20 bg-amber-500/10">
                  <Mail className="h-3.5 w-3.5 text-amber-400" />
                </span>
                <a href={`mailto:${email}`} className="transition-colors hover:text-white">{email}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} The Church of Pentecost · LA Area</span>
        <div className="flex items-center gap-4">
          <span>Rooted in Christ. Ready to serve.</span>
        </div>
      </div>
    </footer>
  );
}

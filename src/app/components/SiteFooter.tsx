import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import type { Scripture, SiteSettings } from '@/src/sanity/queries';
import ScriptureTicker from './ScriptureTicker';

function YouTubeBrandIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function FacebookBrandIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramBrandIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function XTwitterBrandIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function WhatsAppBrandIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

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
      label: 'Facebook',
      href: getSocialUrl('facebook', 'https://www.facebook.com'),
      icon: FacebookBrandIcon,
      hoverClass: 'hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white',
    },
    {
      label: 'Instagram',
      href: getSocialUrl('instagram', 'https://www.instagram.com'),
      icon: InstagramBrandIcon,
      hoverClass: 'hover:border-[#E4405F] hover:bg-[#E4405F] hover:text-white',
    },
    {
      label: 'YouTube',
      href: getSocialUrl('youtube', 'https://www.youtube.com'),
      icon: YouTubeBrandIcon,
      hoverClass: 'hover:border-[#FF0000] hover:bg-[#FF0000] hover:text-white',
    },
    {
      label: 'X (Twitter)',
      href: getSocialUrl('twitter', getSocialUrl('x', 'https://x.com')),
      icon: XTwitterBrandIcon,
      hoverClass: 'hover:border-white hover:bg-black hover:text-white',
    },
    {
      label: 'WhatsApp',
      href: getSocialUrl('whatsapp', 'https://whatsapp.com'),
      icon: WhatsAppBrandIcon,
      hoverClass: 'hover:border-[#25D366] hover:bg-[#25D366] hover:text-white',
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0f172a] px-4 py-14 text-xs text-slate-200 md:px-8 md:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(59,130,246,0.2),transparent_48%),radial-gradient(ellipse_at_85%_100%,rgba(250,204,21,0.1),transparent_45%)]"
      />
      <div className="relative mx-auto max-w-7xl">
        <ScriptureTicker scriptures={scriptures} />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="space-y-5">
            <Link href="/" className="group inline-flex items-center space-x-3">
              <div className="h-11 w-11 flex-shrink-0 overflow-hidden rounded-full border border-yellow-400/30 bg-slate-900 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <img src={settings?.logo || '/Logo.png'} alt="Logo" className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="font-serif text-lg font-semibold tracking-tight text-white">
                  The Church of Pentecost
                </div>
                <div className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-yellow-400">
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
                {socialLinks.map(({ label, href, icon: Icon, hoverClass }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className={`grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${hoverClass}`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-sm font-semibold uppercase tracking-[0.16em] text-yellow-300">
              Quick Links
            </h2>
            <ul className="space-y-1">
              <li><Link href="/about" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-yellow-300">About Us</Link></li>
              <li><Link href="/leadership" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-yellow-300">Leadership</Link></li>
              <li><Link href="/districts" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-yellow-300">Districts</Link></li>
              <li><Link href="/assemblies" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-yellow-300">Local Assemblies</Link></li>
              <li><Link href="/sermons" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-yellow-300">Sermons</Link></li>
              <li><Link href="/ministries" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-yellow-300">Ministries</Link></li>
              <li><Link href="/news" className="inline-flex rounded-lg py-1.5 transition-colors hover:text-yellow-300">News &amp; Updates</Link></li>
              <li><a href={`mailto:${email}`} className="inline-flex rounded-lg py-1.5 transition-colors hover:text-yellow-300">Contact</a></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-sm font-semibold uppercase tracking-[0.16em] text-yellow-300">
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
            <h2 className="mb-4 font-serif text-sm font-semibold uppercase tracking-[0.16em] text-yellow-300">
              Contact Us
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white">
                  <MapPin className="h-4 w-4 text-white" />
                </span>
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white">
                  <Phone className="h-4 w-4 text-white" />
                </span>
                <span>{phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white">
                  <Mail className="h-4 w-4 text-white" />
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

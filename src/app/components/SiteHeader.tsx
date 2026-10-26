'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';

const navLinkClass =
  'rounded-full border border-slate-200 px-5 py-2 font-jakarta font-semibold transition-all duration-200 hover:border-amber-600 hover:text-emerald-900';
const dropdownLinkClass =
  'group/link flex items-center justify-between px-3 py-2.5 text-slate-700 transition hover:bg-[#f7f0df] hover:text-emerald-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-300';
const dropdownPanelClass =
  'invisible absolute left-0 top-full z-50 w-56 translate-y-2 border border-[#ded7c9] bg-[#fffdf8] p-2 opacity-0 shadow-[0_24px_60px_-20px_rgba(28,41,35,0.3)] transition-all duration-200 dark:border-slate-800 dark:bg-slate-900/95';
const mobileLinkClass =
  'block border-l-2 border-transparent px-3 py-2.5 text-slate-700 transition hover:border-amber-600 hover:bg-[#f7f0df] hover:text-emerald-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-300';

export default function SiteHeader({ logoUrl }: { logoUrl?: string | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };
  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown((current) => (current === dropdown ? null : dropdown));
  };
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };
    const desktopQuery = window.matchMedia('(min-width: 1024px)');

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    desktopQuery.addEventListener('change', closeMenu);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      desktopQuery.removeEventListener('change', closeMenu);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-[#ded7c9] bg-[#fffdf8]/95 dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-[90rem] items-center justify-between px-4 py-3 md:px-8 lg:px-10">
        <Link href="/" className="group flex items-center space-x-3" onClick={closeMenu}>
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-amber-600/30 bg-white shadow-sm transition-transform duration-300 group-hover:scale-105 dark:border-amber-400/25 dark:bg-slate-900">
            <img src={logoUrl || '/Logo.png'} alt="Logo" className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="font-serif text-lg font-semibold leading-tight tracking-tight text-slate-900 dark:text-slate-50 sm:text-xl">
              The Church of Pentecost
            </div>
            <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
              LA AREA
            </div>
          </div>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-300 lg:flex">
          <div className="group relative py-2">
              <button type="button" onClick={() => toggleDropdown('about')} className="flex items-center gap-1.5 rounded-full border border-slate-200 px-5 py-2 font-jakarta font-semibold transition-all duration-200 hover:border-amber-600 hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400" aria-haspopup="true" aria-expanded={activeDropdown === 'about'}>
              <span>About</span>
              <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 dark:text-slate-500 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`${dropdownPanelClass} ${activeDropdown === 'about' ? 'visible translate-y-0 opacity-100' : ''}`}>
              <p className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Discover</p>
              <Link href="/about" className={dropdownLinkClass}>
                About Us <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-emerald-700 dark:text-slate-500 dark:group-hover/link:text-emerald-300" />
              </Link>
              <Link href="/leadership" className={dropdownLinkClass}>
                Leadership <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-emerald-700 dark:text-slate-500 dark:group-hover/link:text-emerald-300" />
              </Link>
              <Link href="/tenets" className={dropdownLinkClass}>
                Tenets <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-emerald-700 dark:text-slate-500 dark:group-hover/link:text-emerald-300" />
              </Link>
            </div>
          </div>
          <Link href="/districts" className={`${navLinkClass} ${isActive('/districts') ? 'border-emerald-800/15 bg-emerald-50 text-emerald-900 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300' : ''}`}>Districts</Link>
          <Link href="/assemblies" className={`${navLinkClass} ${isActive('/assemblies') ? 'border-emerald-800/15 bg-emerald-50 text-emerald-900 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300' : ''}`}>Assemblies</Link>

          <div className="group relative py-2">
            <button type="button" onClick={() => toggleDropdown('ministries')} className="flex items-center gap-1.5 rounded-full border border-slate-200 px-5 py-2 font-jakarta font-semibold transition-all duration-200 hover:border-amber-600 hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400" aria-haspopup="true" aria-expanded={activeDropdown === 'ministries'}>
              <span>Ministries</span>
              <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 dark:text-slate-500 ${activeDropdown === 'ministries' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`${dropdownPanelClass} ${activeDropdown === 'ministries' ? 'visible translate-y-0 opacity-100' : ''}`}>
              <p className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Find your community</p>
              <Link href="/ministries#youth-ministry" className={dropdownLinkClass}>
                Youth <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-emerald-700 dark:text-slate-500 dark:group-hover/link:text-emerald-300" />
              </Link>
              <Link href="/ministries#womens-ministry" className={dropdownLinkClass}>
                Women <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-emerald-700 dark:text-slate-500 dark:group-hover/link:text-emerald-300" />
              </Link>
              <Link href="/ministries#mens-ministry" className={dropdownLinkClass}>
                Men <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-emerald-700 dark:text-slate-500 dark:group-hover/link:text-emerald-300" />
              </Link>
              <Link href="/ministries#childrens-ministry" className={dropdownLinkClass}>
                Children <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-emerald-700 dark:text-slate-500 dark:group-hover/link:text-emerald-300" />
              </Link>
            </div>
          </div>

          <div className="group relative py-2">
            <button type="button" onClick={() => toggleDropdown('media')} className="flex items-center gap-1.5 rounded-full border border-slate-200 px-5 py-2 font-jakarta font-semibold transition-all duration-200 hover:border-amber-600 hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400" aria-haspopup="true" aria-expanded={activeDropdown === 'media'}>
              <span>Media</span>
              <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 dark:text-slate-500 ${activeDropdown === 'media' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`${dropdownPanelClass} ${activeDropdown === 'media' ? 'visible translate-y-0 opacity-100' : ''}`}>
              <p className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Watch & listen</p>
              <Link href="/sermons" className={dropdownLinkClass}>
                Sermons <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-emerald-700 dark:text-slate-500 dark:group-hover/link:text-emerald-300" />
              </Link>
              <Link href="/#gallery" className={dropdownLinkClass}>
                Gallery <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-emerald-700 dark:text-slate-500 dark:group-hover/link:text-emerald-300" />
              </Link>
              <Link href="/#live-streaming" className={dropdownLinkClass}>
                Live Streaming <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-emerald-700 dark:text-slate-500 dark:group-hover/link:text-emerald-300" />
              </Link>
            </div>
          </div>

          <Link href="mailto:info@coplaarea.org" className={navLinkClass}>Contact</Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/assemblies" className="inline-flex items-center space-x-2 rounded-md bg-emerald-900 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-800">
            <span>Plan a Visit</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 p-2.5 text-slate-700 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:ring-slate-500"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
        className={`overflow-y-auto border-t border-slate-200/70 bg-white/95 px-4 shadow-lg backdrop-blur-xl transition-[max-height,opacity,padding] duration-300 ease-in-out motion-reduce:transition-none dark:border-slate-800 dark:bg-slate-950/95 md:px-8 lg:hidden ${
          isMenuOpen
            ? 'max-h-[80vh] py-3 opacity-100'
            : 'pointer-events-none max-h-0 border-t-0 py-0 opacity-0'
        }`}
      >
        <div className="mx-auto max-w-7xl space-y-1 border-b border-slate-200/70 pb-4 text-sm font-medium dark:border-slate-800">
          <p className="px-3 pt-2 text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-300">About</p>
          <Link href="/about" onClick={closeMenu} className={mobileLinkClass}>About Us</Link>
          <Link href="/leadership" onClick={closeMenu} className={mobileLinkClass}>Leadership</Link>
          <Link href="/tenets" onClick={closeMenu} className={mobileLinkClass}>Tenets</Link>
          <Link href="/districts" onClick={closeMenu} className={mobileLinkClass}>Districts</Link>
          <Link href="/assemblies" onClick={closeMenu} className={mobileLinkClass}>Assemblies</Link>
          <p className="px-3 pt-3 text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-300">Ministries</p>
          <Link href="/ministries#youth-ministry" onClick={closeMenu} className={mobileLinkClass}>Youth Ministry</Link>
          <Link href="/ministries#womens-ministry" onClick={closeMenu} className={mobileLinkClass}>Women&apos;s Ministry</Link>
          <Link href="/ministries#mens-ministry" onClick={closeMenu} className={mobileLinkClass}>Men&apos;s Ministry</Link>
          <Link href="/ministries#childrens-ministry" onClick={closeMenu} className={mobileLinkClass}>Children&apos;s Ministry</Link>
          <p className="px-3 pt-3 text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-300">Media</p>
          <Link href="/sermons" onClick={closeMenu} className={mobileLinkClass}>Sermons</Link>
          <Link href="/#events" onClick={closeMenu} className={mobileLinkClass}>Events</Link>
          <Link href="/gallery" onClick={closeMenu} className={mobileLinkClass}>Gallery</Link>
          <Link
            href="/assemblies"
            onClick={closeMenu}
            className="mt-3 inline-flex w-full items-center justify-center space-x-2 rounded-full bg-emerald-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-900"
          >
            <span>Plan a Visit</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

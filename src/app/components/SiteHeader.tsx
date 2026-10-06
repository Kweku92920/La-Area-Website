'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        closeMenu();
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

  return (
    <>

      <header ref={headerRef} className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 shadow-[0_8px_30px_-24px_rgba(15,23,42,0.35)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 md:px-8">
          <Link href="/" className="group flex items-center space-x-3" onClick={closeMenu}>
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm transition-transform duration-300 group-hover:scale-105">
              <img src="/Logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-serif text-base font-bold leading-tight tracking-tight text-slate-900 sm:text-lg">
                The Church of Pentecost
              </div>
              <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600">
                LA AREA
              </div>
            </div>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 text-sm font-medium text-slate-700 lg:flex">
            <div className="group relative py-2">
              <button className="flex items-center gap-1.5 rounded-full border border-transparent px-3.5 py-2 transition-all duration-200 hover:border-slate-200 hover:bg-slate-50 hover:text-emerald-800 focus:outline-none focus-visible:border-emerald-800/20 focus-visible:bg-emerald-50/60 focus-visible:text-emerald-800" aria-haspopup="true">
                <span>About</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-56 translate-y-2 rounded-2xl border border-slate-200/80 bg-white/95 p-2 opacity-0 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.3)] backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <p className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Discover</p>
                <Link href="/about" className="group/link flex items-center justify-between rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-amber-50 hover:text-emerald-900">
                  About Us <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-emerald-700" />
                </Link>
                <Link href="/leadership" className="group/link flex items-center justify-between rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-amber-50 hover:text-emerald-900">
                  Leadership <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-emerald-700" />
                </Link>
                <Link href="/#tenets" className="group/link flex items-center justify-between rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-amber-50 hover:text-emerald-900">
                  Tenets <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-emerald-700" />
                </Link>
              </div>
            </div>
            <Link href="/districts" className="rounded-full border border-transparent px-3.5 py-2 transition-all duration-200 hover:border-slate-200 hover:bg-slate-50 hover:text-emerald-800">Districts</Link>
            <Link href="/assemblies" className="rounded-full border border-transparent px-3.5 py-2 transition-all duration-200 hover:border-slate-200 hover:bg-slate-50 hover:text-emerald-800">Assemblies</Link>

            <div className="group relative py-2">
              <button className="flex items-center gap-1.5 rounded-full border border-transparent px-3.5 py-2 transition-all duration-200 hover:border-slate-200 hover:bg-slate-50 hover:text-emerald-800 focus:outline-none focus-visible:border-emerald-800/20 focus-visible:bg-emerald-50/60 focus-visible:text-emerald-800" aria-haspopup="true">
                <span>Ministries</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-56 translate-y-2 rounded-2xl border border-slate-200/80 bg-white/95 p-2 opacity-0 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.3)] backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <p className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Find your community</p>
                <Link href="/ministries#youth-ministry" className="group/link flex items-center justify-between rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-amber-50 hover:text-emerald-900">
                  Youth <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-emerald-700" />
                </Link>
                <Link href="/ministries#womens-ministry" className="group/link flex items-center justify-between rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-amber-50 hover:text-emerald-900">
                  Women <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-emerald-700" />
                </Link>
                <Link href="/ministries#mens-ministry" className="group/link flex items-center justify-between rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-amber-50 hover:text-emerald-900">
                  Men <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-emerald-700" />
                </Link>
                <Link href="/ministries#childrens-ministry" className="group/link flex items-center justify-between rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-amber-50 hover:text-emerald-900">
                  Children <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-emerald-700" />
                </Link>
              </div>
            </div>

            <div className="group relative py-2">
              <button className="flex items-center gap-1.5 rounded-full border border-transparent px-3.5 py-2 transition-all duration-200 hover:border-slate-200 hover:bg-slate-50 hover:text-emerald-800 focus:outline-none focus-visible:border-emerald-800/20 focus-visible:bg-emerald-50/60 focus-visible:text-emerald-800" aria-haspopup="true">
                <span>Media</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-56 translate-y-2 rounded-2xl border border-slate-200/80 bg-white/95 p-2 opacity-0 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.3)] backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <p className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Watch & listen</p>
                <Link href="/sermons" className="group/link flex items-center justify-between rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-amber-50 hover:text-emerald-900">
                  Sermons <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-emerald-700" />
                </Link>
                <Link href="/#gallery" className="group/link flex items-center justify-between rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-amber-50 hover:text-emerald-900">
                  Gallery <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-emerald-700" />
                </Link>
                <Link href="/#live-streaming" className="group/link flex items-center justify-between rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-amber-50 hover:text-emerald-900">
                  Live Streaming <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-emerald-700" />
                </Link>
              </div>
            </div>

            
            <Link href="mailto:info@coplaarea.org" className="rounded-full border border-transparent px-3.5 py-2 transition-all duration-200 hover:border-slate-200 hover:bg-slate-50 hover:text-emerald-800">Contact</Link>
          </nav>

          <Link href="/assemblies" className="hidden items-center space-x-2 rounded-full border border-emerald-700/20 bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-14px_rgba(6,78,59,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-900 lg:inline-flex">
            <span>Plan a Visit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 p-2.5 text-slate-700 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 lg:hidden"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          aria-hidden={!isMenuOpen}
          inert={!isMenuOpen}
          className={`overflow-y-auto border-t border-slate-200/70 bg-white/95 px-4 shadow-lg backdrop-blur-xl transition-[max-height,opacity,padding] duration-300 ease-in-out motion-reduce:transition-none md:px-8 lg:hidden ${
            isMenuOpen
              ? 'max-h-[80vh] py-3 opacity-100'
              : 'max-h-0 border-t-0 py-0 opacity-0 pointer-events-none'
          }`}
        >
            <div className="mx-auto max-w-7xl space-y-1 text-sm font-medium text-slate-700">
              <p className="px-3 pt-2 text-xs font-bold uppercase tracking-widest text-amber-700">About</p>
              <Link href="/about" onClick={closeMenu} className="block rounded-xl px-3 py-2.5 transition hover:bg-amber-50 hover:text-emerald-900">About Us</Link>
              <Link href="/leadership" onClick={closeMenu} className="block rounded-xl px-3 py-2.5 transition hover:bg-amber-50 hover:text-emerald-900">Leadership</Link>
              <Link href="/districts" onClick={closeMenu} className="block rounded-xl px-3 py-2.5 transition hover:bg-amber-50 hover:text-emerald-900">Districts</Link>
              <Link href="/assemblies" onClick={closeMenu} className="block rounded-xl px-3 py-2.5 transition hover:bg-amber-50 hover:text-emerald-900">Assemblies</Link>
              <Link href="/#tenets" onClick={closeMenu} className="block rounded-xl px-3 py-2.5 transition hover:bg-amber-50 hover:text-emerald-900">Tenets</Link>
              <p className="px-3 pt-3 text-xs font-bold uppercase tracking-widest text-amber-700">Ministries</p>
        
              <Link href="/ministries#youth-ministry" onClick={closeMenu} className="block rounded-xl px-3 py-2.5 transition hover:bg-amber-50 hover:text-emerald-900">Youth Ministry</Link>
              <Link href="/ministries#womens-ministry" onClick={closeMenu} className="block rounded-xl px-3 py-2.5 transition hover:bg-amber-50 hover:text-emerald-900">Women&apos;s Ministry</Link>
              <Link href="/ministries#mens-ministry" onClick={closeMenu} className="block rounded-xl px-3 py-2.5 transition hover:bg-amber-50 hover:text-emerald-900">Men&apos;s Ministry</Link>
              <Link href="/ministries#childrens-ministry" onClick={closeMenu} className="block rounded-xl px-3 py-2.5 transition hover:bg-amber-50 hover:text-emerald-900">Children&apos;s Ministry</Link>

              <p className="px-3 pt-3 text-xs font-bold uppercase tracking-widest text-amber-700">Media</p>
              <Link href="/sermons" onClick={closeMenu} className="block rounded-xl px-3 py-2.5 transition hover:bg-amber-50 hover:text-emerald-900">Sermons</Link>
              <Link href="/#events" onClick={closeMenu} className="block rounded-xl px-3 py-2.5 transition hover:bg-amber-50 hover:text-emerald-900">Events</Link>
              <Link href="/#gallery" onClick={closeMenu} className="block rounded-xl px-3 py-2.5 transition hover:bg-amber-50 hover:text-emerald-900">Gallery</Link>
              <Link href="/#live-streaming" onClick={closeMenu} className="block rounded-xl px-3 py-2.5 transition hover:bg-amber-50 hover:text-emerald-900">Live Streaming</Link>

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
    </>
  );
}

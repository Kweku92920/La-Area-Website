'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
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

      <header ref={headerRef} className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3" onClick={closeMenu}>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
              <img src="/Logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-serif font-bold text-lg leading-tight text-slate-900">
                The Church of Pentecost
              </div>
              <div className="text-[10px] tracking-widest text-amber-600 font-bold uppercase">
                LA AREA
              </div>
            </div>
          </Link>

          <nav aria-label="Main navigation" className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-700">
            <div className="relative group py-2">
              <button className="flex items-center space-x-1 hover:text-emerald-800 transition focus:outline-none" aria-haspopup="true">
                <span>About</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block group-focus-within:block w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                <Link href="/about" className="block px-4 py-2 hover:bg-amber-50/60 transition">About Us</Link>
                <Link href="/leadership" className="block px-4 py-2 hover:bg-amber-50/60 transition">Leadership</Link>
              </div>
            </div>
            <Link href="/districts" className="hover:text-emerald-800 transition">Districts</Link>
            <Link href="/assemblies" className="hover:text-emerald-800 transition">Assemblies</Link>

            <div className="relative group py-2">
              <button className="flex items-center space-x-1 hover:text-emerald-800 transition focus:outline-none" aria-haspopup="true">
                <span>Ministries</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block group-focus-within:block w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                <Link href="/ministries#youth-ministry" className="block px-4 py-2 hover:bg-amber-50/60 transition">Youth</Link>
                <Link href="/ministries#womens-ministry" className="block px-4 py-2 hover:bg-amber-50/60 transition">Women</Link>
                <Link href="/ministries#mens-ministry" className="block px-4 py-2 hover:bg-amber-50/60 transition">Men</Link>
                <Link href="/ministries#childrens-ministry" className="block px-4 py-2 hover:bg-amber-50/60 transition">Children</Link>
              </div>
            </div>

            <div className="relative group py-2">
              <button className="flex items-center space-x-1 hover:text-emerald-800 transition focus:outline-none" aria-haspopup="true">
                <span>Media</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block group-focus-within:block w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                <Link href="/sermons" className="block px-4 py-2 hover:bg-amber-50/60 transition">Sermons</Link>
              </div>
            </div>

            
            <Link href="mailto:info@coplaarea.org" className="hover:text-emerald-800 transition">Contact</Link>
          </nav>

          <Link href="/assemblies" className="hidden lg:inline-flex items-center space-x-2 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition">
            <span>Plan a Visit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
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
          className={`lg:hidden border-t border-slate-200 bg-white px-4 shadow-lg md:px-8 overflow-y-auto transition-[max-height,opacity,padding] duration-300 ease-in-out motion-reduce:transition-none ${
            isMenuOpen
              ? 'max-h-[80vh] py-3 opacity-100'
              : 'max-h-0 border-t-0 py-0 opacity-0 pointer-events-none'
          }`}
        >
            <div className="mx-auto max-w-7xl space-y-1 text-sm font-medium text-slate-700">
              <p className="px-3 pt-2 text-xs font-bold uppercase tracking-widest text-amber-700">About</p>
              <Link href="/about" onClick={closeMenu} className="block rounded-lg px-3 py-2.5 hover:bg-amber-50 transition">About Us</Link>
              <Link href="/leadership" onClick={closeMenu} className="block rounded-lg px-3 py-2.5 hover:bg-amber-50 transition">Leadership</Link>
              <Link href="/districts" onClick={closeMenu} className="block rounded-lg px-3 py-2.5 hover:bg-amber-50 transition">Districts</Link>
              <Link href="/assemblies" onClick={closeMenu} className="block rounded-lg px-3 py-2.5 hover:bg-amber-50 transition">Assemblies</Link>

              <p className="px-3 pt-3 text-xs font-bold uppercase tracking-widest text-amber-700">Ministries</p>
        
              <Link href="/ministries#youth-ministry" onClick={closeMenu} className="block rounded-lg px-3 py-2.5 hover:bg-amber-50 transition">Youth Ministry</Link>
              <Link href="/ministries#womens-ministry" onClick={closeMenu} className="block rounded-lg px-3 py-2.5 hover:bg-amber-50 transition">Women&apos;s Ministry</Link>
              <Link href="/ministries#mens-ministry" onClick={closeMenu} className="block rounded-lg px-3 py-2.5 hover:bg-amber-50 transition">Men&apos;s Ministry</Link>
              <Link href="/ministries#childrens-ministry" onClick={closeMenu} className="block rounded-lg px-3 py-2.5 hover:bg-amber-50 transition">Children&apos;s Ministry</Link>

              <p className="px-3 pt-3 text-xs font-bold uppercase tracking-widest text-amber-700">Media</p>
              <Link href="/sermons" onClick={closeMenu} className="block rounded-lg px-3 py-2.5 hover:bg-amber-50 transition">Sermons</Link>
              <Link href="/#events" onClick={closeMenu} className="block rounded-lg px-3 py-2.5 hover:bg-amber-50 transition">Events</Link>
              
              <Link
                href="/assemblies"
                onClick={closeMenu}
                className="mt-3 inline-flex w-full items-center justify-center space-x-2 rounded-lg bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
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

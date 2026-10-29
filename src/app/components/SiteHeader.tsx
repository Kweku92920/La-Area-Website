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
  'rounded-full border border-slate-200 px-5 py-2 font-sans font-semibold transition-all duration-200 hover:border-yellow-500 hover:text-[#0f172a] dark:border-slate-800 dark:hover:border-yellow-400 dark:hover:text-white';
const dropdownLinkClass =
  'group/link flex items-center justify-between rounded-lg px-3 py-2.5 text-slate-700 transition hover:bg-slate-100 hover:text-[#0f172a] dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-yellow-300';
const dropdownPanelBaseClass =
  'absolute left-0 top-full z-50 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.28)] transition-all duration-200 dark:border-slate-800 dark:bg-slate-900';
const mobileLinkClass =
  'flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-[#0f172a] dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-yellow-300';

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
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const handleViewportChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    desktopQuery.addEventListener('change', handleViewportChange);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      desktopQuery.removeEventListener('change', handleViewportChange);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95"
    >
      <div className="mx-auto flex max-w-[90rem] items-center justify-between px-4 py-3 md:px-8 lg:px-10">
        <Link href="/" className="group flex items-center space-x-3" onClick={closeMenu}>
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-yellow-500/30 bg-white shadow-sm transition-transform duration-300 group-hover:scale-105 dark:border-yellow-400/25 dark:bg-slate-900">
            <img src={logoUrl || '/Logo.png'} alt="Logo" className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="font-serif text-lg font-semibold leading-tight tracking-tight text-slate-900 dark:text-slate-50 sm:text-xl">
              The Church of Pentecost
            </div>
            <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-700 dark:text-yellow-400">
              LA AREA
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 lg:flex">
          {/* About Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown('about')}
            onMouseLeave={() => setActiveDropdown((current) => (current === 'about' ? null : current))}
          >
            <button
              type="button"
              onClick={() => toggleDropdown('about')}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 px-5 py-2 font-sans font-semibold transition-all duration-200 hover:border-yellow-500 hover:text-[#0f172a] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:hover:border-yellow-400 dark:hover:text-white"
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'about'}
            >
              <span>About</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 dark:text-slate-500 ${
                  activeDropdown === 'about' ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`${dropdownPanelBaseClass} ${
                activeDropdown === 'about'
                  ? 'pointer-events-auto visible translate-y-0 opacity-100'
                  : 'pointer-events-none invisible translate-y-2 opacity-0'
              }`}
            >
              <p className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Discover
              </p>
              <Link href="/about" onClick={closeMenu} className={dropdownLinkClass}>
                <span>About Us</span>
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-blue-700 dark:text-slate-500 dark:group-hover/link:text-yellow-300" />
              </Link>
              <Link href="/leadership" onClick={closeMenu} className={dropdownLinkClass}>
                <span>Leadership</span>
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-blue-700 dark:text-slate-500 dark:group-hover/link:text-yellow-300" />
              </Link>
              <Link href="/tenets" onClick={closeMenu} className={dropdownLinkClass}>
                <span>Tenets</span>
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-blue-700 dark:text-slate-500 dark:group-hover/link:text-yellow-300" />
              </Link>
            </div>
          </div>

          <Link
            href="/districts"
            onClick={closeMenu}
            className={`${navLinkClass} ${
              isActive('/districts')
                ? 'border-blue-900/20 bg-slate-100 text-[#0f172a] dark:border-blue-400/25 dark:bg-slate-800 dark:text-white'
                : ''
            }`}
          >
            Districts
          </Link>

          <Link
            href="/assemblies"
            onClick={closeMenu}
            className={`${navLinkClass} ${
              isActive('/assemblies')
                ? 'border-blue-900/20 bg-slate-100 text-[#0f172a] dark:border-blue-400/25 dark:bg-slate-800 dark:text-white'
                : ''
            }`}
          >
            Assemblies
          </Link>

          {/* Ministries Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown('ministries')}
            onMouseLeave={() => setActiveDropdown((current) => (current === 'ministries' ? null : current))}
          >
            <button
              type="button"
              onClick={() => toggleDropdown('ministries')}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 px-5 py-2 font-sans font-semibold transition-all duration-200 hover:border-yellow-500 hover:text-[#0f172a] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:hover:border-yellow-400 dark:hover:text-white"
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'ministries'}
            >
              <span>Ministries</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 dark:text-slate-500 ${
                  activeDropdown === 'ministries' ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`${dropdownPanelBaseClass} ${
                activeDropdown === 'ministries'
                  ? 'pointer-events-auto visible translate-y-0 opacity-100'
                  : 'pointer-events-none invisible translate-y-2 opacity-0'
              }`}
            >
              <p className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Find your community
              </p>
              <Link href="/ministries" onClick={closeMenu} className={dropdownLinkClass}>
                <span>All Ministries</span>
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-blue-700 dark:text-slate-500 dark:group-hover/link:text-yellow-300" />
              </Link>
              <Link href="/youth" onClick={closeMenu} className={dropdownLinkClass}>
                <span>Youth</span>
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-blue-700 dark:text-slate-500 dark:group-hover/link:text-yellow-300" />
              </Link>
              <Link href="/women" onClick={closeMenu} className={dropdownLinkClass}>
                <span>Women</span>
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-blue-700 dark:text-slate-500 dark:group-hover/link:text-yellow-300" />
              </Link>
              <Link href="/men" onClick={closeMenu} className={dropdownLinkClass}>
                <span>Men</span>
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-blue-700 dark:text-slate-500 dark:group-hover/link:text-yellow-300" />
              </Link>
              <Link href="/children" onClick={closeMenu} className={dropdownLinkClass}>
                <span>Children</span>
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-blue-700 dark:text-slate-500 dark:group-hover/link:text-yellow-300" />
              </Link>
            </div>
          </div>

          {/* Media Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown('media')}
            onMouseLeave={() => setActiveDropdown((current) => (current === 'media' ? null : current))}
          >
            <button
              type="button"
              onClick={() => toggleDropdown('media')}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 px-5 py-2 font-sans font-semibold transition-all duration-200 hover:border-yellow-500 hover:text-[#0f172a] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:hover:border-yellow-400 dark:hover:text-white"
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'media'}
            >
              <span>Media</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 dark:text-slate-500 ${
                  activeDropdown === 'media' ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`${dropdownPanelBaseClass} ${
                activeDropdown === 'media'
                  ? 'pointer-events-auto visible translate-y-0 opacity-100'
                  : 'pointer-events-none invisible translate-y-2 opacity-0'
              }`}
            >
              <p className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Watch &amp; listen
              </p>
              <Link href="/sermons" onClick={closeMenu} className={dropdownLinkClass}>
                <span>Sermons</span>
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-blue-700 dark:text-slate-500 dark:group-hover/link:text-yellow-300" />
              </Link>
              <Link href="/events" onClick={closeMenu} className={dropdownLinkClass}>
                <span>Events</span>
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-blue-700 dark:text-slate-500 dark:group-hover/link:text-yellow-300" />
              </Link>
              <Link href="/gallery" onClick={closeMenu} className={dropdownLinkClass}>
                <span>Gallery</span>
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-blue-700 dark:text-slate-500 dark:group-hover/link:text-yellow-300" />
              </Link>
              <Link href="/news" onClick={closeMenu} className={dropdownLinkClass}>
                <span>News &amp; Articles</span>
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-300 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-blue-700 dark:text-slate-500 dark:group-hover/link:text-yellow-300" />
              </Link>
            </div>
          </div>

          <a href="mailto:info@coplaarea.org" className={navLinkClass}>
            Contact
          </a>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/assemblies"
            onClick={closeMenu}
            className="inline-flex items-center space-x-2 rounded-md bg-[#0f172a] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1e293b] dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            <span>Plan a Visit</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile / Tablet Hamburger Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-slate-200 bg-white px-4 py-5 shadow-xl dark:border-slate-800 dark:bg-slate-950 md:px-8 lg:hidden"
        >
          <div className="mx-auto max-w-7xl space-y-5">
            <div>
              <p className="mb-1.5 px-3 text-[11px] font-bold uppercase tracking-[0.2em] text-yellow-600 dark:text-yellow-400">
                About &amp; Directory
              </p>
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                <Link href="/about" onClick={closeMenu} className={mobileLinkClass}>
                  <span>About Us</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </Link>
                <Link href="/leadership" onClick={closeMenu} className={mobileLinkClass}>
                  <span>Leadership</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </Link>
                <Link href="/tenets" onClick={closeMenu} className={mobileLinkClass}>
                  <span>Tenets</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </Link>
                <Link href="/districts" onClick={closeMenu} className={mobileLinkClass}>
                  <span>Districts</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </Link>
                <Link href="/assemblies" onClick={closeMenu} className={mobileLinkClass}>
                  <span>Local Assemblies</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </Link>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 dark:border-slate-800/80">
              <p className="mb-1.5 px-3 text-[11px] font-bold uppercase tracking-[0.2em] text-yellow-600 dark:text-yellow-400">
                Ministries
              </p>
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                <Link href="/ministries" onClick={closeMenu} className={mobileLinkClass}>
                  <span>All Ministries</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </Link>
                <Link href="/youth" onClick={closeMenu} className={mobileLinkClass}>
                  <span>Youth Ministry</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </Link>
                <Link href="/women" onClick={closeMenu} className={mobileLinkClass}>
                  <span>Women&apos;s Ministry</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </Link>
                <Link href="/men" onClick={closeMenu} className={mobileLinkClass}>
                  <span>Men&apos;s Ministry</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </Link>
                <Link href="/children" onClick={closeMenu} className={mobileLinkClass}>
                  <span>Children&apos;s Ministry</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </Link>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 dark:border-slate-800/80">
              <p className="mb-1.5 px-3 text-[11px] font-bold uppercase tracking-[0.2em] text-yellow-600 dark:text-yellow-400">
                Media &amp; Updates
              </p>
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                <Link href="/sermons" onClick={closeMenu} className={mobileLinkClass}>
                  <span>Sermons</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </Link>
                <Link href="/events" onClick={closeMenu} className={mobileLinkClass}>
                  <span>Events</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </Link>
                <Link href="/gallery" onClick={closeMenu} className={mobileLinkClass}>
                  <span>Gallery</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </Link>
                <Link href="/news" onClick={closeMenu} className={mobileLinkClass}>
                  <span>News &amp; Articles</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </Link>
                <a href="mailto:info@coplaarea.org" onClick={closeMenu} className={mobileLinkClass}>
                  <span>Contact Us</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </a>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
              <Link
                href="/assemblies"
                onClick={closeMenu}
                className="inline-flex w-full items-center justify-center space-x-2 rounded-full bg-[#0f172a] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1e293b] dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                <span>Plan a Visit</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

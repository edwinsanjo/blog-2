'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, Search, Heart } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  
  // Pages that should have a floating/curved navbar with top margin
  const floatingPages = ['/', '/blog', '/blog/series', '/blog/tags', '/search'];
  // Adapt floating check to our dynamic routes
  const segments = pathname?.split('/').filter(Boolean) ?? [];
  const folder = segments.length > 0 ? segments[0] : null;
  const isFloatingPage = folder ? true : floatingPages.includes(pathname);

  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Adapt links to use the current blog folder
  const navLinks = folder ? [
    { href: `/${folder}`, label: 'Home' },
    { href: `/${folder}/blogs`, label: 'Blogs' },
    { href: `/${folder}/series`, label: 'Series' },
    { href: `/${folder}/tags`, label: 'Tags' },
    { href: `/${folder}/search`, label: 'Search', icon: Search }
  ] : [];

  const [showToast, setShowToast] = useState(false);
  const toggleTheme = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const themeColor = '#a78bfa'; // Obsidian Purple accent
  
  return (
    <>
      <header className={`sticky top-0 z-50 bg-white/40 dark:bg-white/5 backdrop-blur-md border-b border-x border-white/60 dark:border-white/10 rounded-b-2xl mx-4 md:mx-8 transition-all duration-300 ${
        isFloatingPage ? 'mt-4 md:mt-6' : 'mt-0'
      }`}>
        <nav className="flex items-center justify-between px-6 py-4 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMobileMenu}>
            <div 
              className="p-2 rounded-lg transition-colors"
              style={{ backgroundColor: `${themeColor}1a` }} // 10% opacity
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-vault w-5 h-5" aria-hidden="true" style={{ color: themeColor }}>
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
                <path d="m7.9 7.9 2.7 2.7" />
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                <path d="m13.4 10.6 2.7-2.7" />
                <circle cx="7.5" cy="16.5" r=".5" fill="currentColor" />
                <path d="m7.9 16.1 2.7-2.7" />
                <circle cx="16.5" cy="16.5" r=".5" fill="currentColor" />
                <path d="m13.4 13.4 2.7 2.7" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <span className="font-bold text-xl hidden sm:inline text-[#2d2d2d] dark:text-[#e8e6e1]">ObsidianBlog</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-oklab-gray hover:text-white transition-colors font-bold text-sm flex items-center gap-1.5"
                style={{ '--tw-text-opacity': '1' } as React.CSSProperties} // Ensure opacity is full on hover if needed
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-white/30 dark:bg-white/10 hover:bg-white/50 dark:hover:bg-white/20 border border-white/60 dark:border-white/10 hover:border-white/80 dark:hover:border-white/20 transition-all duration-200"
              aria-label="Toggle dark/light mode"
            >
              {isMounted ? (
                theme === 'dark' ? (
                  <Sun className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
                )
              ) : (
                <div className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2.5 rounded-lg bg-white/30 dark:bg-white/10 border border-white/60 dark:border-white/10 transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          {/* Menu panel */}
          <div className="absolute right-0 top-0 h-full w-72 bg-[#1A1A1A]/95 backdrop-blur-xl border-l border-[#2C2C2C] shadow-2xl p-8 flex flex-col transition-all duration-300">
            <div className="flex items-center justify-between mb-10">
              <span className="text-xl font-bold text-[#e8e6e1]">Menu</span>
              <button
                onClick={closeMobileMenu}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-[#e8e6e1]" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 rounded-xl text-lg font-medium text-[#9a9a9a] hover:text-[#e8e6e1] hover:bg-white/5 transition-all flex items-center gap-3 group"
                  onClick={closeMobileMenu}
                >
                  {link.icon && <link.icon className="w-5 h-5 group-hover:text-[var(--primary-color)] transition-colors" />}
                  {link.label}
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4 text-[var(--primary-color)]"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </span>
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-[#2C2C2C]">
                <Link
                  href="/feed.xml"
                  className="px-4 py-3 rounded-xl text-lg font-medium text-[#9a9a9a] hover:text-[#e8e6e1] hover:bg-white/5 transition-all flex items-center gap-3"
                  onClick={closeMobileMenu}
                  target="_blank"
                >
                  <Heart className="w-5 h-5 text-red-500" />
                  RSS Feed
                </Link>
              </div>
            </nav>

            <div className="mt-auto p-6 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-sm font-medium text-[var(--primary-color)] mb-1">Obsidian Blog</p>
              <p className="text-xs text-[#9a9a9a] leading-relaxed">
                Write in Obsidian, publish automatically. Minimalist design for thoughtful writing.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Toast Notification */}
      <div className={`fixed bottom-6 right-6 bg-[#1A1A1A] border border-[#2C2C2C] text-[#e8e6e1] px-5 py-3 rounded-xl shadow-2xl backdrop-blur-md z-[100] transition-all duration-300 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info text-primary"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
          <span className="text-sm font-medium">Light theme is under development!</span>
        </div>
      </div>
    </>
  );
}

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const { folder } = router.query;
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const baseRoute = folder ? `/${folder}` : '';

  return (
    <header className="sticky top-0 z-40 bg-white/40 dark:bg-[#292929] backdrop-blur-md border border-white/60 dark:border-white/10 rounded-b-xl mx-4 mt-4 md:mx-8 md:mt-6">
      <nav className="flex items-center justify-between px-6 py-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-lg bg-brand/10 group-hover:bg-brand/20 transition-colors">
            {/* Vault Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="3" /><path d="m19 5-3.5 3.5" /><path d="m5 19 3.5-3.5" /><path d="m5 5 3.5 3.5" /><path d="m19 19-3.5-3.5" /></svg>
          </div>
          <span className="font-bold text-xl hidden sm:inline text-foreground">AxisWrite</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href={baseRoute || '#'}
            className="text-foreground/80 hover:text-accent transition-colors font-medium text-sm"
            title="Home"
          >
            Home
          </Link>
          <Link
            href={folder ? `/${folder}/blogs` : '#'}
            className="text-foreground/80 hover:text-accent transition-colors font-medium text-sm"
            title="Browse all blog posts"
          >
            Blogs
          </Link>
          <Link
            href={folder ? `/${folder}/series` : '#'}
            className="text-foreground/80 hover:text-accent transition-colors font-medium text-sm"
            title="Organized blog series"
          >
            Series
          </Link>
          <Link
            href={folder ? `/${folder}/tags` : '#'}
            className="text-foreground/80 hover:text-accent transition-colors font-medium text-sm"
            title="Search by tags"
          >
            Tags
          </Link>
          <Link
            href={folder ? `/${folder}/search` : '#'}
            className="text-foreground/80 hover:text-accent transition-colors"
            title="Search posts"
          >
            {/* Search Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-lg bg-white/30 dark:bg-white/10 hover:bg-white/50 dark:hover:bg-white/20 border border-white/60 dark:border-white/10 hover:border-white/80 dark:hover:border-white/20 transition-all duration-200"
            aria-label="Toggle dark/light mode"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isMounted ? (
              theme === 'dark' ? (
                /* Sun Icon */
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M4.93 19.07l1.41-1.41"/><path d="M17.66 6.34l1.41-1.41"/></svg>
              ) : (
                /* Moon Icon */
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              )
            ) : (
              <div className="w-4 h-4 md:w-5 md:h-5" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}

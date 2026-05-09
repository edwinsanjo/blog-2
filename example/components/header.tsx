'use client'

import Link from 'next/link'
import { Vault, Moon, Sun, Search } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-b-xl mx-4 mt-4 md:mx-8 md:mt-6">
      <nav className="flex items-center justify-between px-6 py-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
            <Vault className="w-5 h-5 text-accent" />
          </div>
          <span className="font-bold text-xl hidden sm:inline text-foreground">ObsidianBlog</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="/home"
            className="text-foreground hover:text-accent transition-colors font-medium text-sm"
            title="Featured posts and latest articles"
          >
            Home
          </Link>
          <Link
            href="/"
            className="text-foreground hover:text-accent transition-colors font-medium text-sm"
            title="Browse all blog posts"
          >
            Blogs
          </Link>
          <Link
            href="/series"
            className="text-foreground hover:text-accent transition-colors font-medium text-sm"
            title="Organized blog series"
          >
            Series
          </Link>
          <Link
            href="/archive"
            className="text-foreground hover:text-accent transition-colors font-medium text-sm"
            title="Search and filter posts"
          >
            Tags
          </Link>
          <Link
            href="/search"
            className="text-foreground hover:text-accent transition-colors"
            title="Search posts"
          >
            <Search className="w-4 h-4 md:w-5 md:h-5" />
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
                <Sun className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
              )
            ) : (
              <div className="w-4 h-4 md:w-5 md:h-5" />
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}

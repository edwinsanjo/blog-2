'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Search, X } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { blogPosts, searchPosts } from '@/lib/blog-data'

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = useMemo(() => {
    return searchQuery.trim()
      ? searchPosts(searchQuery)
      : blogPosts
  }, [searchQuery])

  // Group posts by year
  const groupedPosts = useMemo(() => {
    const groups: Record<number, typeof blogPosts> = {}

    filteredPosts.forEach((post) => {
      const year = new Date(post.date).getFullYear()
      if (!groups[year]) {
        groups[year] = []
      }
      groups[year].push(post)
    })

    return Object.entries(groups)
      .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
      .map(([year, posts]) => ({
        year: Number(year),
        posts: posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      }))
  }, [filteredPosts])

  return (
    <div className="max-w-3xl mx-auto space-y-12">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">Archive</h1>
        <p className="text-lg text-muted-foreground">
          All posts, organized by year. Use the search to find specific topics.
        </p>
      </section>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg glass border-0 outline-none focus:ring-2 focus:ring-accent"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Results count */}
      {searchQuery && (
        <p className="text-sm text-muted-foreground">
          Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Posts grouped by year */}
      {groupedPosts.length > 0 ? (
        groupedPosts.map(({ year, posts }) => (
          <section key={year} className="space-y-6">
            {/* Year heading */}
            <h2 className="text-2xl font-bold text-accent sticky top-0 bg-background/80 backdrop-blur-sm py-2">
              {year}
            </h2>

            {/* Posts for this year */}
            <div className="space-y-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group glass-hover block rounded-lg p-4 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-fit">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold group-hover:text-accent transition-colors flex-1 line-clamp-1">
                      {post.title}
                    </h3>

                    {/* Reading time */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-fit">
                      <Clock className="w-4 h-4" />
                      <span>{post.readingTime} min</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <p>No posts found matching &quot;{searchQuery}&quot;</p>
        </div>
      )}
    </div>
  )
}

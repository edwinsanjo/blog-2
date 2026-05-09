'use client'

import { useState, useMemo, Suspense } from 'react'
import Link from 'next/link'
import { blogPosts } from '@/lib/blog-data'
import { formatDate } from '@/lib/utils'
import { Search, X } from 'lucide-react'

function SearchContent() {
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  const results = useMemo(() => {
    if (!query.trim()) return []
    
    const lowerQuery = query.toLowerCase()
    return blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.content.toLowerCase().includes(lowerQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
        post.author.name.toLowerCase().includes(lowerQuery)
    )
  }, [query])

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Search Posts</h1>
        <p className="text-muted-foreground">
          Find articles by title, content, tags, or author
        </p>
      </section>

      {/* Search Input */}
      <section className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3 rounded-lg bg-muted text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </section>

      {/* Results */}
      {query && (
        <section className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Found <span className="font-semibold text-foreground">{results.length}</span> result
            {results.length !== 1 ? 's' : ''}
          </div>

          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group p-6 rounded-lg glass-hover transition-all block"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right text-xs text-muted-foreground whitespace-nowrap">
                      <div>{formatDate(post.date)}</div>
                      <div className="mt-1">{post.readingTime} min</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No posts match your search.</p>
              <p className="text-sm mt-2">Try different keywords or browse all posts</p>
            </div>
          )}
        </section>
      )}

      {!query && (
        <section className="text-center py-12 text-muted-foreground">
          <Search className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p>Enter a search query to find posts</p>
        </section>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchContent />
    </Suspense>
  )
}

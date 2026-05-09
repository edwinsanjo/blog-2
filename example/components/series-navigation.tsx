'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { BlogSeries, BlogPostMeta } from '@/lib/blog-data'

interface SeriesNavigationProps {
  series: BlogSeries
  currentIndex: number
  totalPosts: number
  previousPost?: BlogPostMeta
  nextPost?: BlogPostMeta
}

const seriesColorMap: Record<string, string> = {
  purple: 'from-purple-500/10 to-transparent',
  blue: 'from-blue-500/10 to-transparent',
  pink: 'from-pink-500/10 to-transparent',
  green: 'from-green-500/10 to-transparent',
}

export function SeriesNavigation({
  series,
  currentIndex,
  totalPosts,
  previousPost,
  nextPost,
}: SeriesNavigationProps) {
  const gradientClass = seriesColorMap[series.color] || seriesColorMap.purple

  return (
    <div className={`bg-gradient-to-r ${gradientClass} border border-border rounded-lg p-6 mb-8`}>
      {/* Series Info */}
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-5 h-5 text-accent" />
        <div>
          <p className="text-sm font-semibold text-muted-foreground">Part of series</p>
          <Link href={`/series/${series.id}`} className="text-lg font-bold hover:text-accent transition-colors">
            {series.name}
          </Link>
        </div>
        <div className="ml-auto text-right">
          <p className="text-sm font-semibold text-muted-foreground">
            Post {currentIndex} of {totalPosts}
          </p>
          <div className="w-24 h-2 bg-border rounded-full mt-2">
            <div
              className="h-full bg-accent rounded-full transition-all"
              style={{ width: `${(currentIndex / totalPosts) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {previousPost ? (
          <Link href={`/blog/${previousPost.slug}`}>
            <div className="group glass-hover rounded-lg p-4 h-full transition-all">
              <div className="flex items-start gap-3">
                <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    Previous Post
                  </p>
                  <h4 className="font-semibold group-hover:text-accent transition-colors line-clamp-2">
                    {previousPost.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatDate(previousPost.date)}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div className="opacity-50 pointer-events-none">
            <div className="rounded-lg p-4 bg-border/30">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Previous Post
              </p>
              <p className="text-muted-foreground">You are at the beginning of the series</p>
            </div>
          </div>
        )}

        {nextPost ? (
          <Link href={`/blog/${nextPost.slug}`}>
            <div className="group glass-hover rounded-lg p-4 h-full transition-all">
              <div className="flex items-start gap-3 justify-end">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    Next Post
                  </p>
                  <h4 className="font-semibold group-hover:text-accent transition-colors line-clamp-2 text-right">
                    {nextPost.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatDate(nextPost.date)}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 mt-1" />
              </div>
            </div>
          </Link>
        ) : (
          <div className="opacity-50 pointer-events-none">
            <div className="rounded-lg p-4 bg-border/30">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Next Post
              </p>
              <p className="text-muted-foreground">You&apos;ve reached the end of the series</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

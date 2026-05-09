'use client'

import Link from 'next/link'
import { ChevronRight, BookOpen } from 'lucide-react'
import type { BlogSeries } from '@/lib/blog-data'

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-950/30',
    text: 'text-pink-700 dark:text-pink-300',
    border: 'border-pink-200 dark:border-pink-800',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-950/30',
    text: 'text-green-700 dark:text-green-300',
    border: 'border-green-200 dark:border-green-800',
  },
}

interface SeriesCardProps {
  series: BlogSeries
  postCount: number
}

export function SeriesCard({ series, postCount }: SeriesCardProps) {
  const colors = colorMap[series.color] || colorMap.purple

  return (
    <Link href={`/series/${series.id}`}>
      <article className={`group glass-hover rounded-lg p-6 h-full flex flex-col gap-4 cursor-pointer border ${colors.border}`}>
        {/* Badge */}
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${colors.bg}`}>
            <BookOpen className={`w-5 h-5 ${colors.text}`} />
          </div>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}>
            SERIES
          </span>
        </div>

        {/* Title and Description */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
            {series.name}
          </h3>
          <p className="text-muted-foreground mt-2 line-clamp-3">
            {series.description}
          </p>
        </div>

        {/* Post Count */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className={`text-sm font-medium ${colors.text}`}>
            {postCount} {postCount === 1 ? 'post' : 'posts'}
          </span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-accent" />
        </div>
      </article>
    </Link>
  )
}

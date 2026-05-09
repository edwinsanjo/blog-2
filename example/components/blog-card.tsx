import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { BlogType } from '@/lib/blog-data'

export interface BlogPostMeta {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  readingTime: number
  tags: string[]
  featured?: boolean
  blog: BlogType
}

interface BlogCardProps {
  post: BlogPostMeta
  featured?: boolean
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group glass-hover rounded-lg p-6 h-full flex flex-col gap-4 cursor-pointer">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent dark:bg-accent/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold group-hover:text-accent transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-muted-foreground mt-2 line-clamp-2">
            {post.excerpt}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <time>{formatDate(post.date)}</time>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.readingTime} min read</span>
          </div>
          <div className="ml-auto">
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Author */}
        <p className="text-xs text-muted-foreground">By {post.author}</p>
      </article>
    </Link>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { BlogPostMeta } from './blog-card'

interface FeaturedPostProps {
  post: BlogPostMeta
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group glass-hover rounded-xl overflow-hidden mb-12 cursor-pointer grid md:grid-cols-2 gap-0">
        {/* Featured Image */}
        <div className="relative h-48 md:h-full min-h-80 overflow-hidden">
          <Image
            src="/featured-image.jpg"
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 relative flex flex-col justify-center space-y-4">
          {/* Background accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-4">
            {/* Badge */}
            <div className="inline-block">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/20 text-accent dark:bg-accent/30">
                Featured
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold group-hover:text-accent transition-colors max-w-xl">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Metadata */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center text-sm text-muted-foreground pt-6 border-t border-border/50">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time>{formatDate(post.date)}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
              <div className="text-xs">By {post.author}</div>
              <div className="ml-auto">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

'use client'

import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { getPostBySlug, getPostsByBlog, getSeriesNavigation, blogs } from '@/lib/blog-data'
import { SeriesNavigation } from '@/components/series-navigation'
import { notFound, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { BlogType } from '@/lib/blog-data'

function ShareButton({ title, excerpt }: { title: string; excerpt: string }) {
  return (
    <button
      onClick={() => {
        if (navigator.share) {
          navigator.share({
            title: title,
            text: excerpt,
            url: window.location.href,
          })
        }
      }}
      className="ml-auto p-2 rounded-lg hover:bg-accent/10 transition-colors"
    >
      <Share2 className="w-4 h-4" />
    </button>
  )
}

export default function PostPage() {
  const params = useParams<{ blog: string; slug: string }>()
  const [post, setPost] = useState<any>(null)
  const [seriesNav, setSeriesNav] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const { blog, slug } = params
    const foundPost = getPostBySlug(slug)
    const foundSeriesNav = getSeriesNavigation(slug)

    if (!foundPost || foundPost.blog !== blog) {
      notFound()
    }

    setPost(foundPost)
    setSeriesNav(foundSeriesNav)
    setIsLoading(false)
  }, [params])

  if (isLoading || !post) {
    return <div className="text-center py-12">Loading...</div>
  }

  const { blog, slug } = params
  const content = (
    <div className="prose dark:prose-invert max-w-none">
      <h2>Introduction</h2>
      <p>
        {post.excerpt} This is a sample article content that demonstrates how the blog
        structure works. In a production application, you would load this content from markdown
        files or a CMS.
      </p>

      <h2>Key Points</h2>
      <ul>
        <li>First key insight from the article</li>
        <li>Second important concept to understand</li>
        <li>Third valuable takeaway for readers</li>
      </ul>

      <h2>Deep Dive</h2>
      <p>
        This section would contain the main body of the article with detailed explanations,
        code examples, and practical demonstrations relevant to the topic.
      </p>

      <h2>Conclusion</h2>
      <p>
        The article concludes with a summary of the main points and suggestions for further
        exploration or implementation in your own projects.
      </p>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link
        href={`/${blog}`}
        className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to {blog.charAt(0).toUpperCase() + blog.slice(1)}
      </Link>

      {/* Post Header */}
      <article className="space-y-6">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-balance">{post.title}</h1>

          {/* Post Meta */}
          <div className="flex flex-col gap-4">
            <p className="text-lg text-muted-foreground">{post.excerpt}</p>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                  By {post.author}
                </span>
              </div>
              <ShareButton title={post.title} excerpt={post.excerpt} />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Series Navigation */}
        {seriesNav && (
          <SeriesNavigation
            series={seriesNav.series}
            currentIndex={seriesNav.currentIndex}
            totalPosts={seriesNav.totalPosts}
            previousPost={seriesNav.previous}
            nextPost={seriesNav.next}
          />
        )}

        {/* Content */}
        <div className="py-8">{content}</div>

        {/* Related Posts */}
        <section className="border-t border-border pt-12">
          <h2 className="text-2xl font-bold mb-6">More from {blog.charAt(0).toUpperCase() + blog.slice(1)}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getPostsByBlog(blog as BlogType)
              .filter((p) => p.slug !== slug)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/${blog}/blog/${relatedPost.slug}`}
                  className="group p-6 rounded-lg glass-hover space-y-3"
                >
                  <h3 className="font-semibold group-hover:text-accent transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(relatedPost.date)} • {relatedPost.readingTime} min read
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </article>
    </div>
  )
}

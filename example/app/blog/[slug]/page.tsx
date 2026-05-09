import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { getPostBySlug, blogPosts, getSeriesNavigation } from '@/lib/blog-data'
import { SeriesNavigation } from '@/components/series-navigation'
import { notFound } from 'next/navigation'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: `${post.title} | ObsidianBlog`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Get series navigation if this post is part of a series
  const seriesNav = getSeriesNavigation(slug)

  // Sample content - in a real app, this would be loaded from markdown files
  const content = (
    <article className="prose prose-invert dark:prose max-w-none">
      <p>
        This is a sample blog post. In a production application, this content
        would be dynamically loaded from markdown files or a CMS. The design
        beautifully showcases the Obsidian-inspired interface with glassmorphic
        cards and a smooth light/dark theme.
      </p>

      <h2>Design Philosophy</h2>
      <p>
        The design emphasizes minimalism and clarity, much like Obsidian&apos;s
        interface. Every element serves a purpose, and the visual hierarchy
        guides readers naturally through the content.
      </p>

      <h3>Key Features</h3>
      <ul>
        <li>Dark and light theme support</li>
        <li>Glassmorphism effects on cards</li>
        <li>Responsive design for all devices</li>
        <li>Smooth animations and transitions</li>
        <li>Semantic HTML and accessibility</li>
      </ul>

      <h2>Getting Started</h2>
      <p>
        To create your own blog with this design, you can customize the blog
        posts in the blog-data.ts file and update the content loading logic to
        use your preferred content source.
      </p>

      <blockquote>
        &quot;The best blogs focus on substance and style in equal measure.
        This template provides both.&quot;
      </blockquote>

      <p>
        Whether you&apos;re documenting your knowledge, sharing insights, or
        building a professional presence online, this blog template provides a
        beautiful foundation to express your ideas.
      </p>
    </article>
  )

  return (
    <article className="max-w-3xl mx-auto">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-accent hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to posts
      </Link>

      {/* Post Header */}
      <header className="mb-12 space-y-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent dark:bg-accent/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-balance leading-tight">
          {post.title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap gap-6 text-muted-foreground border-t border-b border-border py-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.readingTime} min read</span>
          </div>
          <div>By {post.author}</div>
          <button className="ml-auto p-2 rounded-lg glass-hover inline-flex">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Excerpt */}
        <p className="text-xl text-muted-foreground leading-relaxed">
          {post.excerpt}
        </p>
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
      <div className="prose dark:prose-invert max-w-none mb-20">
        {content}
      </div>

      {/* Related Posts */}
      <section className="border-t border-border pt-12">
        <h2 className="text-2xl font-bold mb-6">More Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blogPosts
            .filter((p) => p.slug !== slug)
            .slice(0, 2)
            .map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="group glass-hover rounded-lg p-4 cursor-pointer"
              >
                <h3 className="font-semibold group-hover:text-accent transition-colors line-clamp-2">
                  {relatedPost.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {relatedPost.excerpt}
                </p>
              </Link>
            ))}
        </div>
      </section>
    </article>
  )
}

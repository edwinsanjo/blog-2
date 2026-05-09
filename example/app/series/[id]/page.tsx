import Link from 'next/link'
import { BlogCard } from '@/components/blog-card'
import { getSeriesById, getSeriesPostsWithMetadata, blogSeries } from '@/lib/blog-data'
import { ChevronLeft } from 'lucide-react'

const colorMap: Record<string, { bg: string; text: string; accent: string }> = {
  purple: {
    bg: 'from-purple-500/10 to-transparent',
    text: 'text-purple-700 dark:text-purple-300',
    accent: 'bg-purple-100 dark:bg-purple-900/30',
  },
  blue: {
    bg: 'from-blue-500/10 to-transparent',
    text: 'text-blue-700 dark:text-blue-300',
    accent: 'bg-blue-100 dark:bg-blue-900/30',
  },
  pink: {
    bg: 'from-pink-500/10 to-transparent',
    text: 'text-pink-700 dark:text-pink-300',
    accent: 'bg-pink-100 dark:bg-pink-900/30',
  },
  green: {
    bg: 'from-green-500/10 to-transparent',
    text: 'text-green-700 dark:text-green-300',
    accent: 'bg-green-100 dark:bg-green-900/30',
  },
}

export async function generateStaticParams() {
  return blogSeries.map((series) => ({
    id: series.id,
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const series = getSeriesById(params.id)

  if (!series) {
    return {
      title: 'Series Not Found | ObsidianBlog',
      description: 'The series you are looking for does not exist.',
    }
  }

  return {
    title: `${series.name} | ObsidianBlog`,
    description: series.description,
  }
}

export default function SeriesDetailPage({ params }: { params: { id: string } }) {
  const series = getSeriesById(params.id)

  if (!series) {
    return (
      <div className="space-y-8 text-center py-12">
        <h1 className="text-4xl font-bold">Series Not Found</h1>
        <p className="text-muted-foreground">The series you are looking for does not exist.</p>
        <Link
          href="/series"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Series
        </Link>
      </div>
    )
  }

  const posts = getSeriesPostsWithMetadata(series.id)
  const colors = colorMap[series.color] || colorMap.purple

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <Link
          href="/series"
          className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Series
        </Link>

        <div className={`bg-gradient-to-r ${colors.bg} border border-border rounded-lg p-8 md:p-12`}>
          <div className="space-y-4">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${colors.accent}`}>
              Series
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-balance">
              {series.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl text-balance">
              {series.description}
            </p>
            <div className="flex items-center gap-4 pt-4 text-muted-foreground">
              <span className="font-semibold">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this series
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Posts in This Series</h2>

        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div className="group glass-hover rounded-lg p-6 h-full flex gap-6 items-start cursor-pointer">
                  {/* Number */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${colors.accent} flex items-center justify-center font-bold text-lg`}>
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                      <span>{post.readingTime} min read</span>
                      <span>By {post.author}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts in this series yet.</p>
          </div>
        )}
      </section>
    </div>
  )
}

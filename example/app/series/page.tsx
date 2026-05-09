import { SeriesCard } from '@/components/series-card'
import { blogSeries, getSeriesPostsWithMetadata } from '@/lib/blog-data'

export const metadata = {
  title: 'Blog Series | ObsidianBlog',
  description: 'Explore our curated blog series on design, web development, and productivity.',
}

export default function SeriesPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="py-12 text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold text-balance">
          Blog Series
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          Dive deep into our curated series covering design principles, web development, and digital productivity.
        </p>
      </section>

      {/* Series Grid */}
      <section>
        {blogSeries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogSeries.map((series) => {
              const posts = getSeriesPostsWithMetadata(series.id)
              return (
                <SeriesCard
                  key={series.id}
                  series={series}
                  postCount={posts.length}
                />
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No series available yet.</p>
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="py-12 px-6 bg-gradient-to-r from-accent/5 to-transparent rounded-lg border border-border">
        <h2 className="text-2xl font-bold mb-4">About Series</h2>
        <p className="text-muted-foreground max-w-2xl">
          Blog Series are carefully organized collections of related articles that build upon each other.
          Each series guides you through a topic sequentially, allowing you to explore concepts in depth
          while maintaining continuity between posts. Use the navigation within each post to move through
          the series at your own pace.
        </p>
      </section>
    </div>
  )
}

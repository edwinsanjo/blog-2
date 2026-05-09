'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { getPaginatedPosts, getPostsByBlog, blogSeries } from '@/lib/blog-data'
import { formatDate } from '@/lib/utils'
import { Pagination } from '@/components/pagination'
import { FeaturedPost } from '@/components/featured-post'
import { Grid, List, BookOpen } from 'lucide-react'
import type { BlogType } from '@/lib/blog-data'

interface BlogPageProps {
  params: Promise<{ blog: string }>
  searchParams: Promise<{ page?: string }>
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { blog } = await params
  const { page } = await searchParams
  const currentPage = page ? parseInt(page, 10) : 1

  return <BlogPageContent blog={blog as BlogType} currentPage={currentPage} />
}

function BlogPageContent({
  blog,
  currentPage,
}: {
  blog: BlogType
  currentPage: number
}) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const blogPosts = getPostsByBlog(blog)
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    blogPosts.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [blogPosts])

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return blogPosts
    return blogPosts.filter((post) => post.tags.includes(selectedTag))
  }, [blogPosts, selectedTag])

  const { posts, totalPages } = useMemo(() => {
    const postsPerPage = 6
    const start = (currentPage - 1) * postsPerPage
    const end = start + postsPerPage
    const paginatedPosts = filteredPosts.slice(start, end)
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

    return {
      posts: paginatedPosts,
      totalPages,
    }
  }, [filteredPosts, currentPage])

  const blogSeriesForBlog = useMemo(() => {
    return blogSeries.filter((series) =>
      series.posts.some((slug) => blogPosts.some((p) => p.slug === slug))
    )
  }, [blogPosts])

  const featuredPost = blogPosts.find((post) => post.featured) || blogPosts[0]

  return (
    <div className="space-y-8">
      {/* Featured Post */}
      {featuredPost && <FeaturedPost post={featuredPost} />}

      {/* Blog Series Section */}
      {blogSeriesForBlog.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Blog Series</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blogSeriesForBlog.map((series) => (
              <Link
                key={series.id}
                href={`/series/${series.id}`}
                className="group p-6 rounded-lg glass-hover space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                      {series.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{series.description}</p>
                  </div>
                </div>
                <div className="text-xs font-medium text-accent">{series.posts.length} posts</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Posts Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">All Posts ({filteredPosts.length})</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-accent/20 text-accent'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              title="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-accent/20 text-accent'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tag Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedTag === null
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            All Tags
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTag === tag
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Posts Grid/List */}
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
              : 'space-y-4'
          }
        >
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${blog}/blog/${post.slug}`}
              className={`group rounded-lg glass-hover p-6 transition-all ${
                viewMode === 'list' ? 'flex items-start justify-between' : ''
              }`}
            >
              <div className={viewMode === 'list' ? 'flex-1' : ''}>
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
              <div
                className={`text-xs text-muted-foreground ${
                  viewMode === 'list' ? 'text-right ml-4 flex-shrink-0' : 'mt-4'
                }`}
              >
                <div>{formatDate(post.date)}</div>
                <div className="mt-1">{post.readingTime} min read</div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No posts found with the selected tag.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={`/${blog}`} />
        )}
      </section>
    </div>
  )
}

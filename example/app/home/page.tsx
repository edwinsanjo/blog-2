'use client'

import { useMemo, Suspense } from 'react'
import { BlogCard } from '@/components/blog-card'
import { FeaturedPost } from '@/components/featured-post'
import { Pagination } from '@/components/pagination'
import { getPaginatedPosts, getFeaturedPost } from '@/lib/blog-data'
import { useSearchParams } from 'next/navigation'

function HomeContent() {
  const searchParams = useSearchParams()
  const page = useMemo(() => {
    const p = searchParams.get('page')
    return p ? parseInt(p, 10) : 1
  }, [searchParams])

  const { posts, currentPage, totalPages } = useMemo(
    () => getPaginatedPosts(page),
    [page]
  )

  const featured = useMemo(() => getFeaturedPost(), [])

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="py-12 text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold text-balance">
          ObsidianBlog
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          A minimalist blog inspired by Obsidian. Thoughtful writing, beautiful design,
          and seamless reading experiences.
        </p>
      </section>

      {/* Featured Post */}
      <section>
        <FeaturedPost post={featured} />
      </section>

      {/* Blog Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/home" />
        )}
      </section>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}

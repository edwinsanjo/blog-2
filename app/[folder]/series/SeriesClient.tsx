'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Post, BlogMeta } from '../../../types/blog';
import TagPostCard from '../../../components/TagPostCard';

interface SeriesClientProps {
  blog: BlogMeta;
  posts: Post[];
}

export default function SeriesClient({ blog, posts }: SeriesClientProps) {
  // Default to null (show all series posts) or could default to the first series
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);

  // Extract unique series
  const allSeries = posts.flatMap(post => post.series ? [post.series] : []);
  const uniqueSeries = [...new Set(allSeries)];

  // Filter posts based on selected series
  const filteredPosts = selectedSeries
    ? posts.filter(post => post.series === selectedSeries)
    : posts.filter(post => post.series); // Default to show all posts that belong to some series

  return (
    <div
      className="max-w-6xl mx-auto px-6 py-12"
      style={{ '--primary-color': blog.primary } as React.CSSProperties}
    >
      <Link href={`/${blog.folder}`} className="inline-flex items-center text-sm font-medium text-foreground/70 hover:text-accent transition-colors mb-8 group">
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Home
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-foreground">Series</h1>
        <p className="text-foreground/70">Deep dive into curated collections of related articles.</p>
      </div>

      {/* Series selection buttons (like tags) */}
      <div className="flex flex-wrap gap-3 mb-10">
        <button
          onClick={() => setSelectedSeries(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedSeries === null ? 'bg-accent text-white' : 'glass text-foreground hover:bg-white/20 dark:hover:bg-white/10'
          }`}
        >
          All Series ({posts.filter(p => p.series).length})
        </button>
        {uniqueSeries.map(seriesName => {
          const count = posts.filter(post => post.series === seriesName).length;
          return (
            <button
              key={seriesName}
              onClick={() => setSelectedSeries(seriesName)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedSeries === seriesName ? 'bg-accent text-white' : 'glass text-foreground hover:bg-white/20 dark:hover:bg-white/10'
              }`}
            >
              {seriesName} ({count})
            </button>
          );
        })}
      </div>

      {/* Posts list (like tags page) */}
      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts
            .sort((a, b) => (a.frontmatter.order ?? 0) - (b.frontmatter.order ?? 0))
            .map(post => (
              <TagPostCard key={`${post.series ?? ''}-${post.slug}`} folder={blog.folder} post={post} />
            ))
        ) : (
          <div className="text-center py-20 text-foreground/50">No posts found for this series.</div>
        )}
      </div>
    </div>
  );
}

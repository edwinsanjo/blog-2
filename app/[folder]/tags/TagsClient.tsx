'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Post, BlogMeta } from '../../../types/blog';
import TagPostCard from '../../../components/TagPostCard';

interface TagsClientProps {
  blog: BlogMeta;
  posts: Post[];
}

export default function TagsClient({ blog, posts }: TagsClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = posts.flatMap(post => post.frontmatter.tags ?? []);
  const uniqueTags = [...new Set(allTags)];

  const filteredPosts = selectedTag
    ? posts.filter(post => (post.frontmatter.tags ?? []).includes(selectedTag))
    : posts;

  return (
    <div
      className="max-w-6xl mx-auto px-6 pt-6 pb-12"
      style={{ '--primary-color': blog.primary } as React.CSSProperties}
    >
      <Link href={`/${blog.folder}`} className="inline-flex items-center text-sm font-medium text-foreground/70 hover:text-accent transition-colors mb-8 group">
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Home
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-foreground">Tags</h1>
        <p className="text-foreground/70">Sort and filter articles by topics.</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-10">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedTag === null ? 'bg-accent text-white' : 'glass text-foreground hover:bg-white/20 dark:hover:bg-white/10'
          }`}
        >
          All Posts ({posts.length})
        </button>
        {uniqueTags.map(tag => {
          const count = posts.filter(post => (post.frontmatter.tags ?? []).includes(tag)).length;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTag === tag ? 'bg-accent text-white' : 'glass text-foreground hover:bg-white/20 dark:hover:bg-white/10'
              }`}
            >
              #{tag} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <TagPostCard key={`${post.series ?? ''}-${post.slug}`} folder={blog.folder} post={post} />
          ))
        ) : (
          <div className="text-center py-20 text-foreground/50">No posts found for this tag.</div>
        )}
      </div>
    </div>
  );
}

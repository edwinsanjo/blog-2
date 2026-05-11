'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Post, BlogMeta } from '../../../types/blog';
import Fuse from 'fuse.js';

interface SearchClientProps {
  blog: BlogMeta;
  posts: Post[];
}

export default function SearchClient({ blog, posts }: SearchClientProps) {
  const [query, setQuery] = useState('');

  const fuse = new Fuse(posts, {
    keys: ['frontmatter.title', 'frontmatter.description', 'content'],
    threshold: 0.4,
  });

  const filteredPosts = query ? fuse.search(query).map(r => r.item) : posts;

  return (
    <div
      className="max-w-6xl mx-auto px-6 py-12"
      style={
        {
          '--primary-color': blog.primary,
        } as React.CSSProperties
      }
    >
      <Link href={`/${blog.folder}`} className="inline-flex items-center text-sm font-medium text-foreground/70 hover:text-accent transition-colors mb-8 group">
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Home
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-foreground">Search</h1>
        <p className="text-foreground/70">Find articles across the entire blog.</p>
      </div>

      <div className="relative mb-10">
        <input
          type="text"
          placeholder="Search for articles, topics, or content..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full bg-background border border-border focus:border-accent rounded-xl py-4 px-6 text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="space-y-6">
        {query && filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <Link
              href={post.series ? `/${blog.folder}/${post.series}/${post.slug}` : `/${blog.folder}/blog/${post.slug}`}
              key={`${post.series ?? ''}-${post.slug}`}
              className="block glass p-6 rounded-xl group hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
            >
              <div>
                {post.series && (
                  <span className="text-xs font-mono text-accent uppercase tracking-wider mb-1 block">{post.series}</span>
                )}
                <h2 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">{post.frontmatter.title}</h2>
                <p className="text-foreground/70 text-sm mt-1">{post.frontmatter.description}</p>
                <div className="flex items-center gap-3 text-xs text-foreground/50 font-mono mt-3">
                  <span>{post.frontmatter.date ?? 'No Date'}</span>
                </div>
              </div>
            </Link>
          ))
        ) : query ? (
          <div className="text-center py-20 text-foreground/50">No posts found matching &ldquo;{query}&rdquo;.</div>
        ) : (
          <div className="text-center py-20 text-foreground/50">Start typing to search...</div>
        )}
      </div>
    </div>
  );
}

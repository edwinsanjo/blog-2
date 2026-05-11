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
    <div className="max-w-6xl mx-auto px-6 pt-6 pb-12">
      <Link href={`/${blog.folder}`} className="inline-flex items-center text-sm font-medium text-foreground/70 hover:text-accent transition-colors mb-8 group">
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Home
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-foreground">Search</h1>
        <p className="text-foreground/70">Find articles across the entire blog.</p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-2xl mx-auto mb-12 group">
        <input
          type="text"
          placeholder="Search for articles, topics, or content..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full bg-[#1A1A1A]/80 backdrop-blur-md border border-[#2C2C2C] focus:border-primary rounded-2xl py-4 pl-14 pr-6 text-[#e8e6e1] placeholder-[#9a9a9a]/50 focus:outline-none focus:ring-2 focus:ring-primary/10 shadow-2xl transition-all duration-300"
        />
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9a9a9a] pointer-events-none transition-colors group-focus-within:text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {query && filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <Link
              href={post.series ? `/${blog.folder}/${post.series}/${post.slug}` : `/${blog.folder}/blog/${post.slug}`}
              key={`${post.series ?? ''}-${post.slug}`}
              className="block bg-[#292929] hover:bg-[#2C2C2C] p-6 rounded-2xl group transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-5">
                <div className="flex-1 min-w-0">
                  {post.series && (
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-[#404040] text-[#9A9A9A] inline-block mb-2">
                      SERIES: {post.series}
                    </span>
                  )}
                  <h2 className="text-2xl font-bold group-hover:text-primary transition-colors line-clamp-1 leading-tight">
                    {post.frontmatter.title}
                  </h2>
                  <p className="text-[#9a9a9a] text-sm mt-1 line-clamp-1 leading-relaxed">
                    {post.frontmatter.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-[#9a9a9a] font-medium mt-3">
                    <span>{post.frontmatter.date ?? 'No Date'}</span>
                  </div>
                </div>

                {/* Arrow element with pure CSS hover */}
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4 text-primary group-hover:text-white group-hover:translate-x-0.5 transition-all" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
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

import { getBlogs, getPosts } from '../../lib/blogs';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useState } from 'react';

export default function TagsPage({ blog, posts }) {
  const [selectedTag, setSelectedTag] = useState(null);

  // Extract unique tags for this folder's posts
  const allTags = posts.flatMap(post => post.frontmatter.tags || []);
  const uniqueTags = [...new Set(allTags)];

  const filteredPosts = selectedTag
    ? posts.filter(post => (post.frontmatter.tags || []).includes(selectedTag))
    : posts;

  return (
    <Layout>
      <div 
        className="max-w-6xl mx-auto px-6 py-12"
        style={{ '--primary-color': blog.primary, '--primary-color-rgb': hexToRgb(blog.primary) }}
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
              selectedTag === null
                ? 'bg-accent text-white'
                : 'glass text-foreground hover:bg-white/20 dark:hover:bg-white/10'
            }`}
          >
            All Posts ({posts.length})
          </button>
          {uniqueTags.map(tag => {
            const count = posts.filter(post => (post.frontmatter.tags || []).includes(tag)).length;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-accent text-white'
                    : 'glass text-foreground hover:bg-white/20 dark:hover:bg-white/10'
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
              <Link 
                href={post.series ? `/${blog.folder}/${post.series}/${post.slug}` : `/${blog.folder}/blog/${post.slug}`} 
                key={post.slug}
                className="block glass p-6 rounded-xl group hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    {post.series && (
                      <span className="text-xs font-mono text-accent uppercase tracking-wider mb-1 block">{post.series}</span>
                    )}
                    <h2 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">{post.frontmatter.title}</h2>
                    <p className="text-foreground/70 text-sm mt-1">{post.frontmatter.description}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-foreground/50 font-mono whitespace-nowrap">
                    <span>{post.frontmatter.date || 'No Date'}</span>
                    {post.frontmatter.tags && (
                      <div className="flex gap-1">
                        {post.frontmatter.tags.slice(0, 2).map(t => (
                          <span key={t} className="bg-background px-2 py-0.5 rounded border border-border">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-20 text-foreground/50">
              No posts found for this tag.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '138, 180, 248';
}

export async function getStaticPaths() {
  const blogs = getBlogs();
  const paths = blogs.map(blog => ({
    params: { folder: blog.folder },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const blogs = getBlogs();
  const blog = blogs.find(b => b.folder === params.folder);
  const posts = getPosts(params.folder);
  return {
    props: {
      blog,
      posts,
    },
  };
}

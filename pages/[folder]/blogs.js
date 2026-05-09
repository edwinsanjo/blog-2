import { getBlogs, getPosts } from '../../lib/blogs';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function BlogsPage({ blog, posts }) {
  const standalonePosts = posts.filter(p => !p.series);
  const seriesPosts = posts.filter(p => p.series);

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
          <h1 className="text-4xl font-extrabold mb-4 text-foreground">All Blogs</h1>
          <p className="text-foreground/70">Browse all standalone articles and series posts.</p>
        </div>

        {standalonePosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center">
              <span className="w-8 h-1 bg-accent rounded-full mr-4 inline-block opacity-70"></span>
              Standalone Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {standalonePosts.map(post => (
                <Link 
                  href={`/${blog.folder}/blog/${post.slug}`} 
                  key={post.slug}
                  className="glass p-6 flex flex-col group rounded-lg transition-colors hover:bg-white/10 dark:hover:bg-white/5 cursor-pointer"
                >
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(post.frontmatter.tags || []).slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent dark:bg-accent/20 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Title & Excerpt */}
                  <div className="flex-1 mb-4">
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-accent transition-colors line-clamp-2">{post.frontmatter.title}</h3>
                    <p className="text-foreground/70 text-sm line-clamp-2">{post.frontmatter.description}</p>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-4 text-xs text-foreground/50 pt-4 border-t border-border items-center">
                    <div className="flex items-center gap-2">
                      {/* Calendar Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                      <span>{post.frontmatter.date || 'No Date'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Clock Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      <span>5 min read</span>
                    </div>
                    <div className="ml-auto">
                      {/* Arrow Right Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {seriesPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center">
              <span className="w-8 h-1 bg-accent rounded-full mr-4 inline-block opacity-70"></span>
              Series Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {seriesPosts.map(post => (
                <Link 
                  href={`/${blog.folder}/${post.series}/${post.slug}`} 
                  key={post.slug}
                  className="glass p-6 flex flex-col group rounded-lg transition-colors hover:bg-white/10 dark:hover:bg-white/5 cursor-pointer"
                >
                  <div className="mb-2">
                    <span className="text-xs font-mono text-accent uppercase tracking-wider">{post.series}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-accent transition-colors">{post.frontmatter.title}</h3>
                  <p className="text-foreground/70 text-sm mb-4 flex-1">{post.frontmatter.description}</p>
                  <div className="flex items-center justify-between mt-auto text-xs text-foreground/50">
                    <span>Order: {post.frontmatter.order}</span>
                    <span className="text-accent font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Read &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
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

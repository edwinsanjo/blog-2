import { getBlogs, getPosts } from '../../lib/blogs';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BookOpen, Folder, TrendingUp, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ folder: string }>;
}

export async function generateStaticParams() {
  const blogs = getBlogs();
  return blogs.map(blog => ({ folder: blog.folder }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { folder } = await params;
  const blogs = getBlogs();
  const blog = blogs.find(b => b.folder === folder);
  return {
    title: blog?.name ?? folder,
    description: blog?.description,
  };
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '138, 180, 248';
}

export default async function BlogHomePage({ params }: PageProps) {
  const { folder } = await params;
  const blogs = getBlogs();
  const blog = blogs.find(b => b.folder === folder);
  if (!blog) notFound();

  const posts = getPosts(folder);
  const standalonePosts = posts.filter(p => !p.series);
  const series = posts.reduce<Record<string, typeof posts>>((acc, post) => {
    if (post.series) {
      if (!acc[post.series]) acc[post.series] = [];
      acc[post.series].push(post);
    }
    return acc;
  }, {});

  const featuredPost = standalonePosts[0];
  const recommendedPosts = standalonePosts.slice(1, 4);
  const recommendedSeries = Object.entries(series).slice(0, 2);

  return (
    <div
      className="max-w-6xl mx-auto px-4 md:px-8 py-12 w-full space-y-16"
      style={
        {
          '--primary-color': blog.primary,
          '--primary-color-rgb': hexToRgb(blog.primary),
        } as React.CSSProperties
      }
    >
      {/* Hero Section */}
      <section className="relative py-12 text-center space-y-6 overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-primary/5 blur-[120px] rounded-full -z-10" />
        
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-balance text-foreground">
            {blog.name}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance font-medium leading-relaxed">
            {blog.description}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Published Posts', value: posts.length, icon: BookOpen },
          { label: 'Active Series', value: Object.keys(series).length, icon: Folder },
          { label: 'Words Written', value: "10k+", icon: TrendingUp },
          { label: 'Minutes to Read', value: "50+", icon: Clock },
        ].map((stat, index) => (
          <div key={index} className="glass p-6 rounded-2xl text-center space-y-2 flex flex-col items-center justify-center">
            <stat.icon className="w-5 h-5 text-primary mb-1" />
            <p className="text-3xl font-black text-foreground">{stat.value}</p>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">Featured Story</h2>
          </div>
          <Link href={`/${blog.folder}/blog/${featuredPost.slug}`} className="block group">
            <div className="glass rounded-2xl overflow-hidden border border-border/40 hover:border-border/80 transition-colors">
              <div className="md:flex">
                <div className="md:w-1/2 h-64 md:h-auto bg-secondary/50 flex items-center justify-center text-gray-500">
                  {featuredPost.frontmatter.banner ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`/api/images/${blog.folder}/assets/banner.png`}
                      alt={featuredPost.frontmatter.title ?? ''}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <span className="text-muted-foreground font-mono text-sm">No Banner</span>
                  )}
                </div>
                <div className="p-8 md:w-1/2 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-accent uppercase tracking-wider">Standalone Post</span>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{featuredPost.frontmatter.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{featuredPost.frontmatter.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/40">
                    <span className="text-xs text-muted-foreground font-mono">{featuredPost.frontmatter.date ?? 'No Date'}</span>
                    <span className="text-primary text-sm font-medium flex items-center gap-1">Read Article &rarr;</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recommended Posts */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground">Latest Stories</h2>
            <Link href={`/${blog.folder}/blogs`} className="text-primary hover:underline text-sm font-medium">
              View All &rarr;
            </Link>
          </div>
          <div className="space-y-4">
            {recommendedPosts.map(post => (
              <Link
                href={`/${blog.folder}/blog/${post.slug}`}
                key={post.slug}
                className="block glass p-6 rounded-xl border border-border/40 hover:border-border/80 transition-colors group"
              >
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{post.frontmatter.title}</h3>
                <p className="text-muted-foreground text-sm mb-3 mt-1">{post.frontmatter.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground font-mono">{post.frontmatter.date ?? 'No Date'}</span>
                  <span className="text-primary text-xs font-medium">Read &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Series */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground">Active Series</h2>
            <Link href={`/${blog.folder}/series`} className="text-primary hover:underline text-sm font-medium">
              View All &rarr;
            </Link>
          </div>
          <div className="space-y-4">
            {recommendedSeries.map(([seriesName, seriesPosts]) => (
              <div key={seriesName} className="glass p-6 rounded-xl border border-border/40 space-y-3">
                <div>
                  <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">Series</span>
                  <h3 className="text-xl font-bold text-foreground">{seriesPosts[0].frontmatter.series}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{seriesPosts.length} parts in this collection.</p>
                <Link href={`/${blog.folder}/${seriesName}/${seriesPosts[0].slug}`} className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1">
                  Start Reading &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

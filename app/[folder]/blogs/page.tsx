import { getBlogs, getPosts } from '../../../lib/blogs';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import StandalonePostCard from '../../../components/StandalonePostCard';
import SeriesPostCard from '../../../components/SeriesPostCard';

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
    title: `All Blogs — ${blog?.name ?? folder}`,
  };
}

export default async function BlogsPage({ params }: PageProps) {
  const { folder } = await params;
  const blogs = getBlogs();
  const blog = blogs.find(b => b.folder === folder);
  if (!blog) notFound();

  const posts = getPosts(folder);
  const standalonePosts = posts.filter(p => !p.series);
  const seriesPosts = posts.filter(p => p.series);

  return (
    <div className="max-w-6xl mx-auto px-6 pt-6 pb-12">
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
            <span className="w-8 h-1 rounded-full mr-4 inline-block bg-primary"></span>
            Standalone Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {standalonePosts.map(post => (
              <StandalonePostCard key={post.slug} folder={blog.folder} post={post} />
            ))}
          </div>
        </div>
      )}

      {seriesPosts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center">
            <span className="w-8 h-1 rounded-full mr-4 inline-block bg-primary"></span>
            Series Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {seriesPosts.map(post => (
              <SeriesPostCard key={`${post.series}-${post.slug}`} folder={blog.folder} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { getBlogs, getPosts } from '../../../lib/blogs';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

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
  return { title: `All Series — ${blog?.name ?? folder}` };
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '138, 180, 248';
}

export default async function SeriesPage({ params }: PageProps) {
  const { folder } = await params;
  const blogs = getBlogs();
  const blog = blogs.find(b => b.folder === folder);
  if (!blog) notFound();

  const posts = getPosts(folder);
  const series = posts.reduce<Record<string, typeof posts>>((acc, post) => {
    if (post.series) {
      if (!acc[post.series]) acc[post.series] = [];
      acc[post.series].push(post);
    }
    return acc;
  }, {});

  return (
    <div
      className="max-w-6xl mx-auto px-6 py-12"
      style={
        {
          '--primary-color': blog.primary,
          '--primary-color-rgb': hexToRgb(blog.primary),
        } as React.CSSProperties
      }
    >
      <Link href={`/${blog.folder}`} className="inline-flex items-center text-sm font-medium text-foreground/70 hover:text-accent transition-colors mb-8 group">
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Home
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-foreground">All Series</h1>
        <p className="text-foreground/70">Deep dive into curated collections of related articles.</p>
      </div>

      {Object.keys(series).length > 0 ? (
        <div className="space-y-12">
          {Object.entries(series).map(([seriesName, seriesPosts]) => (
            <div key={seriesName} className="glass rounded-2xl p-6 border border-gray-700/50">
              <h2 className="text-2xl font-bold mb-2 text-foreground">{seriesPosts[0].frontmatter.series}</h2>
              <p className="text-foreground/70 text-sm mb-5">A collection of {seriesPosts.length} parts.</p>

              <ul className="space-y-3">
                {seriesPosts
                  .sort((a, b) => (a.frontmatter.order ?? 0) - (b.frontmatter.order ?? 0))
                  .map((post, index) => (
                    <li key={post.slug} className="group relative pl-8">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-xs text-foreground/50 font-mono group-hover:border-accent group-hover:text-accent transition-colors">
                        {index + 1}
                      </span>
                      <Link href={`/${blog.folder}/${seriesName}/${post.slug}`} className="block py-2">
                        <span className="text-foreground/80 group-hover:text-accent transition-colors font-medium">{post.frontmatter.title}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-foreground/50">No series found for this blog.</div>
      )}
    </div>
  );
}

import { getBlogs, getPosts, getPost } from '../../../../lib/blogs';
import Link from 'next/link';
import path from 'path';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ folder: string; series: string; slug: string }>;
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(markdown);
  return result.toString();
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '138, 180, 248';
}

export async function generateStaticParams() {
  const blogs = getBlogs();
  return blogs.flatMap(blog => {
    const posts = getPosts(blog.folder);
    return posts
      .filter(post => post.series)
      .map(post => ({
        folder: blog.folder,
        series: post.series!,
        slug: post.slug,
      }));
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { folder, series, slug } = await params;
  const post = getPost(folder, [series, slug]);
  return {
    title: post?.frontmatter.title ?? slug,
    description: post?.frontmatter.description,
  };
}

export default async function SeriesPostPage({ params }: PageProps) {
  const { folder, series, slug } = await params;
  const blogs = getBlogs();
  const blog = blogs.find(b => b.folder === folder);
  if (!blog) notFound();

  const post = getPost(folder, [series, slug]);
  if (!post) notFound();

  const bannerUrl = post.frontmatter.banner
    ? `/api/images/${path.normalize(path.join(path.dirname(post.filePath), post.frontmatter.banner)).replace(/\\/g, '/')}`
    : null;

  // Resolve relative image paths inside markdown
  const content = post.content.replace(/!\[(.*?)\]\(\.\/(.*?)\)/gim, (_match, alt, src) => {
    const imageUrl = `/api/images/${path.normalize(path.join(path.dirname(post.filePath), src)).replace(/\\/g, '/')}`;
    return `![${alt}](${imageUrl})`;
  });

  return (
    <div
      className="max-w-4xl mx-auto px-6 py-12"
      style={
        {
          '--primary-color': blog.primary,
          '--primary-color-rgb': hexToRgb(blog.primary),
        } as React.CSSProperties
      }
    >
      <Link href={`/${blog.folder}/series`} className="inline-flex items-center text-sm font-medium text-foreground/70 hover:text-accent transition-colors mb-10 group">
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Series
      </Link>

      <article>
        <header className="mb-12">
          <div className="mb-3">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">{post.series}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-foreground">{post.frontmatter.title}</h1>
          {post.frontmatter.description && (
            <p className="text-xl text-foreground/70 leading-relaxed mb-8">{post.frontmatter.description}</p>
          )}

          {bannerUrl && (
            <div className="rounded-2xl overflow-hidden mt-8 shadow-2xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={bannerUrl} alt={post.frontmatter.title ?? ''} className="w-full max-h-[500px] object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          )}
        </header>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12"></div>

        <div
          className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-a:text-accent hover:prose-a:text-accent/80 prose-img:rounded-xl prose-img:shadow-lg prose-pre:bg-background prose-pre:border prose-pre:border-border"
          dangerouslySetInnerHTML={{ __html: await markdownToHtml(content) }}
        />
      </article>
    </div>
  );
}

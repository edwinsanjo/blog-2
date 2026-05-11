import { getBlogs, getPosts, getPost } from '../../../../lib/blogs';
import Link from 'next/link';
import path from 'path';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ folder: string; slug: string }>;
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(markdown);
  return result.toString();
}

export async function generateStaticParams() {
  const blogs = getBlogs();
  return blogs.flatMap(blog => {
    const posts = getPosts(blog.folder);
    return posts
      .filter(post => !post.series)
      .map(post => ({ folder: blog.folder, slug: post.slug }));
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { folder, slug } = await params;
  const post = getPost(folder, [slug]);
  return {
    title: post?.frontmatter.title ?? slug,
    description: post?.frontmatter.description,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { folder, slug } = await params;
  const blogs = getBlogs();
  const blog = blogs.find(b => b.folder === folder);
  if (!blog) notFound();

  const post = getPost(folder, [slug]);
  if (!post) notFound();

  const bannerUrl = post.frontmatter.banner
    ? `/api/images/${path.normalize(path.join(path.dirname(post.filePath), post.frontmatter.banner)).replace(/\\/g, '/')}`
    : null;

  // Resolve relative image paths inside markdown
  const content = post.content.replace(/!\[(.*?)\]\(((?!https?:\/\/|\/).*?)\)/gim, (_match, alt, src) => {
    const imageUrl = `/api/images/${path.normalize(path.join(path.dirname(post.filePath), src)).replace(/\\/g, '/')}`;
    return `![${alt}](${imageUrl})`;
  });

  return (
    <div className="max-w-4xl mx-auto px-6 pt-6 pb-12">
      <Link href={`/${blog.folder}/blogs`} className="inline-flex items-center text-sm font-medium text-foreground/70 hover:text-primary transition-colors mb-8 group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Blogs
      </Link>

      <article className="space-y-8">
        {/* Banner Image / Space at the top */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#2C2C2C] bg-[#1A1A1A] h-[300px] md:h-[450px] flex items-center justify-center relative group">
          {bannerUrl ? (
            <img src={bannerUrl} alt={post.frontmatter.title ?? ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e1e1e] to-[#292929] flex items-center justify-center">
              <span className="text-5xl font-bold text-white/5 group-hover:text-primary/10 transition-colors text-center px-4">
                {post.frontmatter.title}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors pointer-events-none" />
        </div>

        <header className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-balance text-foreground tracking-tight">{post.frontmatter.title}</h1>

          {post.frontmatter.description && (
            <p className="text-lg text-[#9a9a9a] leading-relaxed">{post.frontmatter.description}</p>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-[#9a9a9a] pt-4 border-t border-[#2C2C2C]">
            {post.frontmatter.date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.frontmatter.readingTime ?? '5'} min read</span>
            </div>
            {post.frontmatter.tags && (
              <div className="flex flex-wrap gap-2">
                {post.frontmatter.tags.map(tag => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-[#404040] text-[#9A9A9A] font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#2C2C2C] to-transparent mb-8"></div>

        <div
          className="prose dark:prose-invert max-w-none prose-headings:text-foreground prose-h2:border-b prose-h2:border-[#2C2C2C] prose-h2:pb-2 prose-a:text-primary hover:prose-a:text-primary/80 prose-li:marker:text-primary prose-img:rounded-xl prose-img:shadow-lg prose-pre:bg-[#1A1A1A] prose-pre:border prose-pre:border-[#2C2C2C]"
          dangerouslySetInnerHTML={{ __html: await markdownToHtml(content) }}
        />
      </article>
    </div>
  );
}

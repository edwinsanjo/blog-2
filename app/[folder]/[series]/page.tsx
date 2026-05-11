import { getBlogs, getPosts } from '../../../lib/blogs';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ folder: string; series: string }>;
}

export async function generateStaticParams() {
  const blogs = getBlogs();
  const params: { folder: string; series: string }[] = [];
  
  for (const blog of blogs) {
    const posts = getPosts(blog.folder);
    const uniqueSeries = [...new Set(posts.flatMap(p => p.series ? [p.series] : []))];
    for (const series of uniqueSeries) {
      params.push({ folder: blog.folder, series });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { folder, series } = await params;
  const blogs = getBlogs();
  const blog = blogs.find(b => b.folder === folder);
  return { title: `${series} — ${blog?.name ?? folder}` };
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  // Return space-separated values for modern CSS rgb()
  return result
    ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`
    : '138 180 248';
}

export default async function SeriesDetailPage({ params }: PageProps) {
  const { folder, series: seriesName } = await params;
  const blogs = getBlogs();
  const blog = blogs.find(b => b.folder === folder);
  if (!blog) notFound();

  const posts = getPosts(folder);
  const seriesPosts = posts
    .filter(post => post.series === seriesName)
    .sort((a, b) => (a.frontmatter.order ?? 0) - (b.frontmatter.order ?? 0));

  if (seriesPosts.length === 0) notFound();

  // Read series metadata from index.json
  const seriesPath = path.join(process.cwd(), 'vault', folder, seriesName);
  const indexPath = path.join(seriesPath, 'index.json');
  let displayTitle = seriesName;
  let displayDescription = `A collection of ${seriesPosts.length} articles.`;
  
  if (fs.existsSync(indexPath)) {
    try {
      const jsonContent = fs.readFileSync(indexPath, 'utf8');
      const data = JSON.parse(jsonContent);
      displayTitle = data.name || seriesName;
      displayDescription = data.description || displayDescription;
    } catch (e) {
      console.error(`Failed to parse index.json for ${seriesName}`, e);
    }
  }

  return (
    <div 
      className="max-w-4xl mx-auto px-6 pt-6 pb-12"
      style={
        {
          '--primary-color': blog.primary,
          '--primary-color-rgb': hexToRgb(blog.primary),
        } as React.CSSProperties
      }
    >
      <Link href={`/${blog.folder}/series`} className="inline-flex items-center text-sm font-medium text-foreground/70 hover:text-accent transition-colors mb-8 group">
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Series
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-foreground">{displayTitle}</h1>
        <p className="text-foreground/70">{displayDescription}</p>
      </div>

      <div className="space-y-4">
        {seriesPosts.map((post, index) => (
          <Link 
            key={post.slug} 
            href={`/${blog.folder}/${seriesName}/${post.slug}`}
            className="block bg-[#292929] hover:bg-[#2C2C2C] p-5 rounded-xl group transition-all"
          >
            <div className="flex items-center gap-5">
              {/* Number circle with opacity reduced color */}
              <span 
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{ 
                  backgroundColor: `${blog.primary}1a`, // 10% opacity in hex
                  color: blog.primary 
                }}
              >
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-foreground group-hover:text-[var(--primary-color)] transition-colors line-clamp-1 leading-tight">
                  {post.frontmatter.title}
                </h2>
                {post.frontmatter.description && (
                  <p className="text-[#9a9a9a] text-sm mt-1 line-clamp-1">{post.frontmatter.description}</p>
                )}
              </div>
              
              {/* Date and tags column wise */}
              <div className="hidden sm:flex flex-col items-end gap-1.5 text-xs text-[#9a9a9a] font-mono whitespace-nowrap">
                <span>{post.frontmatter.date ?? 'No Date'}</span>
                {post.frontmatter.tags && (
                  <div className="flex flex-wrap gap-1 justify-end">
                    {post.frontmatter.tags.slice(0, 2).map(t => (
                      <span key={t} className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-[#404040] text-[#9A9A9A]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Arrow element with theme color */}
              <div className="w-8 h-8 rounded-full bg-[rgb(var(--primary-color-rgb)_/_0.05)] flex items-center justify-center group-hover:bg-[rgb(var(--primary-color-rgb)_/_0.2)] flex-shrink-0 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4 text-[var(--primary-color)] group-hover:translate-x-0.5 transition-transform" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

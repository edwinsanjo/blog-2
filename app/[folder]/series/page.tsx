import { getBlogs, getPosts } from '../../../lib/blogs';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

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

export default async function SeriesPage({ params }: PageProps) {
  const { folder } = await params;
  const blogs = getBlogs();
  const blog = blogs.find(b => b.folder === folder);
  if (!blog) notFound();

  const posts = getPosts(folder);
  
  // Extract unique series and count posts
  const seriesMap = posts.reduce<Record<string, number>>((acc, post) => {
    if (post.series) {
      acc[post.series] = (acc[post.series] || 0) + 1;
    }
    return acc;
  }, {});
  
  const seriesList = Object.entries(seriesMap);

  // Enrich with index.json data
  const seriesWithMeta = seriesList.map(([folderName, count]) => {
    const seriesPath = path.join(process.cwd(), 'vault', folder, folderName);
    const indexPath = path.join(seriesPath, 'index.json');
    let name = folderName;
    let description = `Deep dive into curated collections of related articles.`;
    
    if (fs.existsSync(indexPath)) {
      try {
        const jsonContent = fs.readFileSync(indexPath, 'utf8');
        const data = JSON.parse(jsonContent);
        name = data.name || folderName;
        description = data.description || description;
      } catch (e) {
        console.error(`Failed to parse index.json for ${folderName}`, e);
      }
    }
    return { folderName, name, description, count };
  });

  return (
    <div className="max-w-6xl mx-auto px-6 pt-6 pb-12">
      <Link href={`/${blog.folder}`} className="inline-flex items-center text-sm font-medium text-foreground/70 hover:text-accent transition-colors mb-8 group">
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Home
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-foreground">All Series</h1>
        <p className="text-foreground/70">Deep dive into curated collections of related articles.</p>
      </div>

      {seriesWithMeta.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seriesWithMeta.map(({ folderName, name, description, count }) => (
            <Link 
              key={folderName} 
              href={`/${blog.folder}/${folderName}`}
              className="group bg-[#292929] hover:bg-[#2C2C2C] rounded-2xl p-6 flex flex-col justify-between gap-5 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {name}
                </h2>
                <p className="text-[#9a9a9a] text-sm line-clamp-2">
                  {description}
                </p>
                <p className="text-[#9a9a9a] text-xs mt-2">
                  {count} {count === 1 ? 'article' : 'articles'}
                </p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  Series
                </span>
                <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4 text-primary group-hover:translate-x-0.5 transition-transform" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-foreground/50">No series found for this blog.</div>
      )}
    </div>
  );
}

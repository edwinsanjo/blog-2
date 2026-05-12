import { getBlogs, getPosts } from '../../../lib/blogs';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

import SearchClient from './SearchClient';

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
  return { title: `Search — ${blog?.name ?? folder}` };
}

export default async function SearchPage({ params }: PageProps) {
  const { folder } = await params;
  const blogs = getBlogs();
  const blog = blogs.find(b => b.folder === folder);
  if (!blog) notFound();

  const posts = getPosts(folder);

  return <SearchClient blog={blog} posts={posts} />;
}

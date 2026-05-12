import { getBlogs, getPosts } from '../../../lib/blogs';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

import TagsClient from './TagsClient';

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
  return { title: `Tags — ${blog?.name ?? folder}` };
}

export default async function TagsPage({ params }: PageProps) {
  const { folder } = await params;
  const blogs = getBlogs();
  const blog = blogs.find(b => b.folder === folder);
  if (!blog) notFound();

  const posts = getPosts(folder);

  return <TagsClient blog={blog} posts={posts} />;
}

import { Feed } from 'feed';
import { getBlogs, getPosts } from '../../../lib/blogs';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const blogs = getBlogs();
  return blogs.map(blog => ({ folder: blog.folder }));
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ folder: string }> }
) {
  const { folder } = await params;
  const blogs = getBlogs();
  const blog = blogs.find(b => b.folder === folder);
  if (!blog) notFound();

  const posts = getPosts(folder);

  const feed = new Feed({
    title: `${blog.name} | Obsidian Blog`,
    description: blog.description,
    id: `https://blog.crucibles.studio/${folder}`,
    link: `https://blog.crucibles.studio/${folder}`,
    language: 'en',
    image: `https://blog.crucibles.studio/${folder}/og-image.png`,
    favicon: `https://blog.crucibles.studio/favicon.ico`,
    copyright: `All rights reserved 2026, Edwin Sanjo`,
    author: {
      name: 'Edwin Sanjo',
      link: 'https://crucibles.studio',
    },
  });

  posts.forEach(post => {
    feed.addItem({
      title: post.frontmatter.title ?? '',
      id: post.series 
        ? `https://blog.crucibles.studio/${folder}/${post.series}/${post.slug}`
        : `https://blog.crucibles.studio/${folder}/blog/${post.slug}`,
      link: post.series 
        ? `https://blog.crucibles.studio/${folder}/${post.series}/${post.slug}`
        : `https://blog.crucibles.studio/${folder}/blog/${post.slug}`,
      description: post.frontmatter.description,
      content: post.content,
      author: [
        {
          name: 'Edwin Sanjo',
          link: 'https://crucibles.studio',
        },
      ],
      date: post.frontmatter.date ? new Date(post.frontmatter.date) : new Date(),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

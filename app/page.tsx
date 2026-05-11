import { getBlogs } from '../lib/blogs';
import type { Metadata } from 'next';
import BlogCard from '../components/BlogCard';

export const metadata: Metadata = {
  title: 'AxisWrite — Home',
  description: 'Browse all blogs powered by ObsidianBlog.',
};

export default function HomePage() {
  const blogs = getBlogs();

  return (
    <div className="max-w-6xl mx-auto px-6 pt-6 pb-12">
      <div className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-foreground tracking-tight">
          AxisWrite
        </h1>
        <p className="text-[#9a9a9a] text-lg max-w-2xl mx-auto">
          Welcome to AxisWrite! Choose a space to explore articles, tutorials, and insights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map(blog => (
          <BlogCard key={blog.folder} blog={blog} />
        ))}
      </div>
    </div>
  );
}

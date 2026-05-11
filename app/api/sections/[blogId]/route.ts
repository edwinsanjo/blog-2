import { NextRequest, NextResponse } from 'next/server';
import { getBlogs } from '@/lib/blogs';
import type { BlogSection } from '@/lib/blog/sections';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ blogId: string }> }
) {
  const { blogId } = await params;

  try {
    const blogs = getBlogs();
    const blog = blogs.find(b => b.folder === blogId);

    if (!blog) {
      return NextResponse.json({ error: 'Section not found' }, { status: 404 });
    }

    // Map BlogMeta → BlogSection (primary → color)
    const section: BlogSection = {
      folder: blog.folder,
      name: blog.name,
      description: blog.description,
      color: blog.primary,
      image: blog.image,
    };

    return NextResponse.json(section);
  } catch {
    return NextResponse.json({ error: 'Failed to load section' }, { status: 500 });
  }
}

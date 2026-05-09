import { getBlogs, getPosts, getPost } from '../../../lib/blogs';
import Link from 'next/link';
import path from 'path';
import { marked } from 'marked';
import Layout from '../../../components/Layout';

function markdownToHtml(markdown) {
  return marked.parse(markdown);
}

export default function PostPage({ blog, post }) {
  if (!post) {
    return <div className="text-center py-20 text-foreground/50">Post not found</div>;
  }

  const bannerUrl = post.frontmatter.banner
    ? `/api/images/${path.normalize(path.join(path.dirname(post.filePath), post.frontmatter.banner)).replace(/\\/g, '/')}`
    : null;

  // Update how images inside markdown are resolved
  const content = post.content.replace(/!\[(.*?)\]\(\.\/(.*?)\)/gim, (match, alt, src) => {
    const imageUrl = `/api/images/${path.normalize(path.join(path.dirname(post.filePath), src)).replace(/\\/g, '/')}`;
    return `![${alt}](${imageUrl})`;
  });

  return (
    <Layout>
      <div 
        className="max-w-4xl mx-auto px-6 py-12"
        style={{ '--primary-color': blog.primary, '--primary-color-rgb': hexToRgb(blog.primary) }}
      >
        <Link href={`/${blog.folder}/blogs`} className="inline-flex items-center text-sm font-medium text-foreground/70 hover:text-accent transition-colors mb-10 group">
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Blogs
        </Link>
        
        <article>
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-foreground">{post.frontmatter.title}</h1>
            {post.frontmatter.description && (
              <p className="text-xl text-foreground/70 leading-relaxed mb-8">{post.frontmatter.description}</p>
            )}
            
            {bannerUrl && (
              <div className="rounded-2xl overflow-hidden mt-8 shadow-2xl border border-border">
                <img src={bannerUrl} alt={post.frontmatter.title} className="w-full max-h-[500px] object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            )}
          </header>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12"></div>
          
          <div 
            className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-a:text-accent hover:prose-a:text-accent/80 prose-img:rounded-xl prose-img:shadow-lg prose-pre:bg-background prose-pre:border prose-pre:border-border" 
            dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} 
          />
        </article>
      </div>
    </Layout>
  );
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '138, 180, 248';
}

export async function getStaticPaths() {
  const blogs = getBlogs();
  const paths = blogs.flatMap(blog => {
    const posts = getPosts(blog.folder);
    return posts
      .filter(post => !post.series)
      .map(post => ({
        params: {
          folder: blog.folder,
          slug: post.slug,
        },
      }));
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { folder, slug } = params;
  const blogs = getBlogs();
  const blog = blogs.find(b => b.folder === folder);
  const post = getPost(folder, [slug]);

  return {
    props: {
      blog,
      post,
    },
  };
}

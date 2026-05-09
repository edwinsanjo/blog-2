import { getBlogs, getPosts, getPost } from '../../lib/blogs';
import Link from 'next/link';
import path from 'path';

function markdownToHtml(markdown) {
  // A very basic markdown to html converter
  return markdown
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*)\*/gim, '<i>$1</i>')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
    .replace(/\n/g, '<br />');
}

export default function PostPage({ blog, post }) {
  if (!post) {
    return <div>Post not found</div>;
  }

  const bannerUrl = post.frontmatter.banner
    ? `/api/images/${path.normalize(path.join(path.dirname(post.filePath), post.frontmatter.banner)).replace(/\\/g, '/')}`
    : null;

  // Also update how images inside markdown are resolved
  const content = post.content.replace(/!\[(.*?)\]\(\.\/(.*?)\)/gim, (match, alt, src) => {
    const imageUrl = `/api/images/${path.normalize(path.join(path.dirname(post.filePath), src)).replace(/\\/g, '/')}`;
    return `![${alt}](${imageUrl})`;
  });

  return (
    <div className="container">
      <style jsx global>{`
        :root {
          --primary-color: ${blog.primary};
        }
      `}</style>
      <Link href={`/${blog.folder}`}><a>&larr; Back to {blog.name}</a></Link>
      {bannerUrl && <img src={bannerUrl} alt={post.frontmatter.title} style={{width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "8px", margin: "2rem 0"}}/>}
      <h1>{post.frontmatter.title}</h1>
      <p>{post.frontmatter.description}</p>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} />
    </div>
  );
}

export async function getStaticPaths() {
  const blogs = getBlogs();
  const paths = blogs.flatMap(blog => {
    const posts = getPosts(blog.folder);
    return posts.map(post => ({
      params: {
        folder: blog.folder,
        slug: post.series ? [post.series, post.slug] : [post.slug],
      },
    }));
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { folder, slug } = params;
  const blogs = getBlogs();
  const blog = blogs.find(b => b.folder === folder);
  const post = getPost(folder, slug);

  return {
    props: {
      blog,
      post,
    },
  };
}

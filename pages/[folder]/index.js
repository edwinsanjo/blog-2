import { getBlogs, getPosts } from '../../lib/blogs';
import Link from 'next/link';

export default function BlogIndex({ blog, posts }) {
  const standalonePosts = posts.filter(p => !p.series);
  const series = posts.reduce((acc, post) => {
    if (post.series) {
      if (!acc[post.series]) {
        acc[post.series] = [];
      }
      acc[post.series].push(post);
    }
    return acc;
  }, {});

  return (
    <div className="container">
      <style jsx global>{`
        :root {
          --primary-color: ${blog.primary};
        }
      `}</style>
      <Link href="/"><a>&larr; Back to Home</a></Link>
      <h1>{blog.name}</h1>
      <p>{blog.description}</p>

      <h2>Standalone Posts</h2>
      <ul>
        {standalonePosts.map(post => (
          <li key={post.slug}>
            <Link href={`/${blog.folder}/${post.slug}`}>
              <a>{post.frontmatter.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <h2>Series</h2>
      {Object.entries(series).map(([seriesName, seriesPosts]) => (
        <div key={seriesName}>
          <h3>{seriesPosts[0].frontmatter.series}</h3>
          <ul>
            {seriesPosts.sort((a, b) => a.frontmatter.order - b.frontmatter.order).map(post => (
              <li key={post.slug}>
                <Link href={`/${blog.folder}/${seriesName}/${post.slug}`}>
                  <a>{post.frontmatter.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export async function getStaticPaths() {
  const blogs = getBlogs();
  const paths = blogs.map(blog => ({
    params: { folder: blog.folder },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const blogs = getBlogs();
  const blog = blogs.find(b => b.folder === params.folder);
  const posts = getPosts(params.folder);
  return {
    props: {
      blog,
      posts,
    },
  };
}

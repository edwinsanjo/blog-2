import { getBlogs } from '../lib/blogs';
import Link from 'next/link';

export default function Home({ blogs }) {
  return (
    <div className="container">
      <h1 className="main-title">Obsidian Blog</h1>
      <div className="blog-grid">
        {blogs.map(blog => (
          <Link href={`/${blog.folder}`} key={blog.folder}>
            <a className="blog-card">
              <img src={`/api/images/assets/${blog.image}`} alt={blog.name} className="blog-card-image" />
              <div className="blog-card-content">
                <h2 style={{color: blog.primary}}>{blog.name}</h2>
                <p>{blog.description}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const blogs = getBlogs();
  return {
    props: {
      blogs,
    },
  };
}

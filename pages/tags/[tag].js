import { getTags, getPostsByTag } from '../../lib/blogs';
import Link from 'next/link';

export default function TagPage({ tag, posts }) {
  return (
    <div className="container">
      <h1>Posts tagged with "#{tag}"</h1>
      <Link href="/tags"><a>&larr; Back to all tags</a></Link>
      <ul>
        {posts.map(post => (
          <li key={`${post.blog.folder}-${post.slug}`}>
             <Link href={`/${post.blog.folder}/${post.series ? `${post.series}/` : ''}${post.slug}`}>
              <a style={{color: post.blog.primary}}>{post.frontmatter.title}</a>
            </Link>
            <span> in </span>
            <Link href={`/${post.blog.folder}`}>
                <a style={{color: post.blog.primary}}>{post.blog.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticPaths() {
  const tags = getTags();
  const paths = tags.map(tag => ({
    params: { tag },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { tag } = params;
  const posts = getPostsByTag(tag);
  return {
    props: {
      tag,
      posts,
    },
  };
}

import { getBlogs, getPosts } from '../../lib/blogs';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function SeriesPage({ blog, posts }) {
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
    <Layout>
      <div 
        className="max-w-6xl mx-auto px-6 py-12"
        style={{ '--primary-color': blog.primary, '--primary-color-rgb': hexToRgb(blog.primary) }}
      >
        <Link href={`/${blog.folder}`} className="inline-flex items-center text-sm font-medium text-foreground/70 hover:text-accent transition-colors mb-8 group">
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Home
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold mb-4 text-foreground">All Series</h1>
          <p className="text-foreground/70">Deep dive into curated collections of related articles.</p>
        </div>

        {Object.keys(series).length > 0 ? (
          <div className="space-y-12">
            {Object.entries(series).map(([seriesName, seriesPosts]) => (
              <div key={seriesName} className="glass rounded-2xl p-6 border border-gray-700/50">
                <h2 className="text-2xl font-bold mb-2 text-foreground">{seriesPosts[0].frontmatter.series}</h2>
                <p className="text-foreground/70 text-sm mb-5">A collection of {seriesPosts.length} parts.</p>
                
                <ul className="space-y-3">
                  {seriesPosts.sort((a, b) => a.frontmatter.order - b.frontmatter.order).map((post, index) => (
                    <li key={post.slug} className="group relative pl-8">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-xs text-foreground/50 font-mono group-hover:border-accent group-hover:text-accent transition-colors">
                        {index + 1}
                      </span>
                      <Link href={`/${blog.folder}/${seriesName}/${post.slug}`} className="block py-2">
                        <span className="text-foreground/80 group-hover:text-accent transition-colors font-medium">{post.frontmatter.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-foreground/50">
            No series found for this blog.
          </div>
        )}
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

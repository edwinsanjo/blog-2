import { getBlogs, getPosts } from '../../lib/blogs';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function BlogHome({ blog, posts }) {
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

  const featuredPost = standalonePosts[0];
  const recommendedPosts = standalonePosts.slice(1, 4);
  const recommendedSeries = Object.entries(series).slice(0, 2);

  return (
    <Layout>
      <div 
        className="max-w-6xl mx-auto px-6 py-12"
        style={{ '--primary-color': blog.primary, '--primary-color-rgb': hexToRgb(blog.primary) }}
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-foreground">
            {blog.name}
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            {blog.description}
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Featured Post</h2>
            <Link href={`/${blog.folder}/blog/${featuredPost.slug}`} className="block">
              <div className="glass rounded-2xl overflow-hidden group">
                <div className="md:flex">
                  <div className="md:w-1/2 h-64 md:h-auto bg-gray-800 flex items-center justify-center text-gray-500">
                    {/* Placeholder or banner if available */}
                    {featuredPost.frontmatter.banner ? (
                      <img src={`/api/images/${blog.folder}/assets/banner.png`} alt={featuredPost.frontmatter.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <span>No Banner</span>
                    )}
                  </div>
                  <div className="p-8 md:w-1/2 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono text-accent uppercase tracking-wider mb-2 block">Standalone Post</span>
                      <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors">{featuredPost.frontmatter.title}</h3>
                      <p className="text-foreground/70 text-sm mb-4">{featuredPost.frontmatter.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs text-foreground/50 font-mono">{featuredPost.frontmatter.date || 'No Date'}</span>
                      <span className="text-accent text-sm font-medium">Read Article &rarr;</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Recommended Posts */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Recommended Reads</h2>
              <Link href={`/${blog.folder}/blogs`} className="text-accent hover:underline text-sm font-medium">
                View All &rarr;
              </Link>
            </div>
            <div className="space-y-6">
              {recommendedPosts.map(post => (
                <Link 
                  href={`/${blog.folder}/blog/${post.slug}`} 
                  key={post.slug}
                  className="block glass p-6 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 transition-colors group"
                >
                  <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-accent transition-colors">{post.frontmatter.title}</h3>
                  <p className="text-foreground/70 text-sm mb-3">{post.frontmatter.description}</p>
                  <span className="text-accent text-xs font-medium">Read &rarr;</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Series */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Active Series</h2>
              <Link href={`/${blog.folder}/series`} className="text-accent hover:underline text-sm font-medium">
                View All &rarr;
              </Link>
            </div>
            <div className="space-y-6">
              {recommendedSeries.map(([seriesName, seriesPosts]) => (
                <div key={seriesName} className="glass p-6 rounded-xl">
                  <span className="text-xs font-mono text-accent uppercase tracking-wider mb-1 block">Series</span>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{seriesPosts[0].frontmatter.series}</h3>
                  <p className="text-foreground/70 text-sm mb-4">{seriesPosts.length} parts in this collection.</p>
                  <Link href={`/${blog.folder}/${seriesName}/${seriesPosts[0].slug}`} className="text-accent text-sm font-medium hover:underline">
                    Start Reading &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
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

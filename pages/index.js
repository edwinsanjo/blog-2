import { getBlogs } from '../lib/blogs';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home({ blogs }) {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-foreground">
          AxisWrite
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <Link 
              href={`/${blog.folder}`} 
              key={blog.folder}
              className="glass flex flex-col group overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{ '--primary-color': blog.primary, '--primary-color-rgb': hexToRgb(blog.primary) }}
            >
              <div className="relative h-48 bg-gray-800 flex items-center justify-center text-gray-500">
                <img src={`/api/images/assets/${blog.image}`} alt={blog.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-accent" style={{color: blog.primary}}>{blog.name}</h2>
                <p className="text-foreground/70 text-sm leading-relaxed mb-4 flex-1">{blog.description}</p>
                <span className="text-accent text-sm font-medium">Explore Blog &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '138, 180, 248';
}

export async function getStaticProps() {
  const blogs = getBlogs();
  return {
    props: {
      blogs,
    },
  };
}

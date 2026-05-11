import Link from 'next/link';

interface TagPostCardProps {
  folder: string;
  post: {
    slug: string;
    series?: string;
    frontmatter: {
      title?: string;
      description?: string;
      date?: string;
      tags?: string[];
    };
  };
}

export default function TagPostCard({ folder, post }: TagPostCardProps) {
  return (
    <Link
      href={post.series ? `/${folder}/${post.series}/${post.slug}` : `/${folder}/blog/${post.slug}`}
      className="block bg-[#292929] hover:bg-[#2C2C2C] p-6 rounded-2xl group transition-all hover:shadow-xl hover:-translate-y-1"
    >
      <div className="flex items-center justify-between gap-5">
        <div className="flex-1 min-w-0">
          {post.series && (
            <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-[#404040] text-[#9A9A9A] inline-block mb-2">
              SERIES: {post.series}
            </span>
          )}
          <h2 className="text-2xl font-bold group-hover:text-primary transition-colors line-clamp-1 leading-tight">
            {post.frontmatter.title}
          </h2>
          <p className="text-[#9a9a9a] text-sm mt-1 line-clamp-1 leading-relaxed">
            {post.frontmatter.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-[#9a9a9a] font-medium mt-3">
            <div className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar w-3.5 h-3.5" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
              <span>{post.frontmatter.date ?? 'No Date'}</span>
            </div>
            {!post.series && post.frontmatter.tags && (
              <div className="flex flex-wrap gap-1.5">
                {post.frontmatter.tags.slice(0, 2).map(t => (
                  <span key={t} className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-[#404040] text-[#9A9A9A]">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Arrow element with pure CSS hover */}
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4 text-primary group-hover:text-white group-hover:translate-x-0.5 transition-all" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </div>
      </div>
    </Link>
  );
}

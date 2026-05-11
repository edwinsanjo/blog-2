'use client';

import Link from 'next/link';

interface StandalonePostCardProps {
  folder: string;
  post: {
    slug: string;
    frontmatter: {
      title?: string;
      description?: string;
      date?: string;
      tags?: string[];
    };
  };
}

export default function StandalonePostCard({ folder, post }: StandalonePostCardProps) {
  return (
    <Link
      href={`/${folder}/blog/${post.slug}`}
      className="group bg-[#292929] hover:bg-[#2C2C2C] rounded-2xl p-7 h-full flex flex-col gap-5 cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(post.frontmatter.tags ?? []).slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-[#404040] text-[#9A9A9A]">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex-1 space-y-3">
        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors line-clamp-2 leading-tight">
          {post.frontmatter.title}
        </h3>
        <p className="text-[#9a9a9a] text-sm line-clamp-3 leading-relaxed">
          {post.frontmatter.description}
        </p>
      </div>

      <div 
        className="pt-5 border-t flex items-center justify-between"
        style={{ borderTopColor: 'oklab(0.348457 0.0000158995 0.00000697374 / 0.5)' }}
      >
        <div className="flex items-center gap-4 text-xs text-[#9a9a9a] font-medium">
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar w-3.5 h-3.5" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
            <time>{post.frontmatter.date ?? 'No Date'}</time>
          </div>
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock w-3.5 h-3.5" aria-hidden="true"><path d="M12 6v6l4 2"></path><circle cx="12" cy="12" r="10"></circle></svg>
            <span>5 min read</span>
          </div>
        </div>
        {/* Arrow element with pure CSS hover */}
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
            className="lucide lucide-arrow-right w-4 h-4 text-primary group-hover:text-white group-hover:translate-x-0.5 transition-all" 
            aria-hidden="true"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </Link>
  );
}

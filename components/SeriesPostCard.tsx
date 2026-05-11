'use client';

import Link from 'next/link';

interface SeriesPostCardProps {
  folder: string;
  post: {
    slug: string;
    series?: string;
    frontmatter: {
      title?: string;
      description?: string;
      order?: number;
      date?: string;
      tags?: string[];
    };
  };
}

export default function SeriesPostCard({ folder, post }: SeriesPostCardProps) {
  return (
    <Link
      href={`/${folder}/${post.series}/${post.slug}`}
      className="group relative bg-[#292929] hover:bg-[#2C2C2C] rounded-3xl p-8 h-full flex flex-col gap-6 cursor-pointer transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden"
    >
      <div className="flex flex-wrap items-center gap-3">
        {/* Series name on the left with Obsidian minimal colors */}
        <div 
          className="flex items-center text-[10px] uppercase tracking-wider font-bold px-3 py-0.5 rounded bg-[#404040] text-[#9A9A9A]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-folder w-3.5 h-3.5 mr-1.5" aria-hidden="true"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path></svg>
          SERIES: {post.series}
        </div>
        <div className="flex flex-wrap gap-2">
          {/* Empty tags place as requested for series cards */}
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list w-3.5 h-3.5" aria-hidden="true"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            <span>Order: {post.frontmatter.order}</span>
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

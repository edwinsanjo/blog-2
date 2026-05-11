'use client';

import Link from 'next/link';

interface BlogCardProps {
  blog: {
    folder: string;
    name: string;
    description: string;
    image?: string;
  };
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link
      href={`/${blog.folder}`}
      className="group bg-[#292929] hover:bg-[#2C2C2C] rounded-3xl overflow-hidden flex flex-col transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
    >
      <div className="relative h-48 bg-[#1A1A1A] flex items-center justify-center overflow-hidden">
        {/* Fallback pattern/gradient if image fails or is missing */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e1e1e] to-[#292929] opacity-50" />
        <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
        
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/api/images/assets/${blog.image}`}
          alt={blog.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Fallback if image fails to load
            e.currentTarget.style.display = 'none';
          }}
        />
        
        {/* Big Initial as a fallback or design element */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-7xl font-bold text-white/5 group-hover:text-primary/10 transition-colors">
            {blog.name.charAt(0)}
          </span>
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
            {blog.name}
          </h2>
          <p className="text-[#9a9a9a] text-sm mt-2 line-clamp-3 leading-relaxed">
            {blog.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-medium text-[#e8e6e1] group-hover:text-primary transition-colors">
            Explore Blog
          </span>
          
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
      </div>
    </Link>
  );
}

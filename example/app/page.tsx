'use client'

import Link from 'next/link'
import { blogs } from '@/lib/blog-data'
import { Vault } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Minimal Header */}
      <header className="border-b border-border sticky top-0 z-40 bg-white/40 dark:bg-white/5 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <Vault className="w-5 h-5 text-accent" />
          </div>
          <h1 className="font-bold text-xl text-foreground">ObsidianBlog</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 md:px-8 py-20 w-full flex flex-col justify-center">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-balance">
            Discover Insights Across Topics
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Choose a blog category to explore in-depth articles, tutorials, and insights
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/${blog.id}`}>
              <div
                className={`group h-80 rounded-2xl bg-gradient-to-br ${blog.color} p-px overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105`}
              >
                {/* Inner card with glassmorphism */}
                <div className="h-full bg-background/95 dark:bg-background/90 backdrop-blur-sm rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden">
                  {/* Background glow effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${blog.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-6xl mb-4">{blog.icon}</div>
                    <h3 className="text-3xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors">
                      {blog.name}
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {blog.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="relative z-10 flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                    Explore
                    <span className="text-2xl group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center text-muted-foreground text-sm">
          <p>Select a category above to start exploring articles and insights</p>
        </div>
      </main>
    </div>
  )
}

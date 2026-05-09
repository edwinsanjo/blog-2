import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { blogs } from '@/lib/blog-data'
import { notFound } from 'next/navigation'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ blog: string }>
}

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    blog: blog.id,
  }))
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { blog } = await params
  const blogData = blogs.find((b) => b.id === blog)

  if (!blogData) {
    return {}
  }

  return {
    title: `${blogData.name} - ObsidianBlog`,
    description: blogData.description,
  }
}

export default async function BlogLayout({ children, params }: LayoutProps) {
  const { blog } = await params
  const blogData = blogs.find((b) => b.id === blog)

  if (!blogData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 md:px-8 py-8 w-full">
        {children}
      </main>
      <Footer />
    </div>
  )
}

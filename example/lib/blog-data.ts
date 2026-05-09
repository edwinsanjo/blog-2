import type { BlogPostMeta } from '@/components/blog-card'

export type BlogType = 'tech' | 'finance'

export interface Blog {
  id: BlogType
  name: string
  description: string
  color: string
  icon: string
}

export const blogs: Blog[] = [
  {
    id: 'tech',
    name: 'Tech Blog',
    description: 'Insights on web development, design, and technology trends',
    color: 'from-blue-600 to-purple-600',
    icon: '💻',
  },
  {
    id: 'finance',
    name: 'Finance Blog',
    description: 'Deep dives into financial analysis, investing, and market trends',
    color: 'from-emerald-600 to-teal-600',
    icon: '💰',
  },
]

export interface BlogSeries {
  id: string
  name: string
  description: string
  color: string
  posts: string[] // slugs in order
}

export const blogSeries: BlogSeries[] = [
  {
    id: 'obsidian-deep-dive',
    name: 'Obsidian Deep Dive',
    description: 'A comprehensive series exploring Obsidian design principles, implementation, and best practices.',
    color: 'purple',
    posts: [
      'obsidian-inspired-design',
      'dark-mode-implementation',
      'note-taking-apps',
    ],
  },
  {
    id: 'nextjs-web-design',
    name: 'Next.js & Web Design',
    description: 'Master modern web design with Next.js and the latest design trends.',
    color: 'blue',
    posts: [
      'glassmorphism-guide',
      'web-design-trends-2024',
    ],
  },
]

export const blogPosts: BlogPostMeta[] = [
  {
    slug: 'obsidian-inspired-design',
    title: 'The Art of Building Obsidian-Inspired Interfaces',
    excerpt:
      'Explore the design principles behind Obsidian and how to create beautiful, minimalist interfaces that feel natural and intuitive.',
    author: 'Design Team',
    date: '2024-04-15',
    readingTime: 8,
    tags: ['Design', 'UI/UX', 'Obsidian'],
    featured: true,
    blog: 'tech',
  },
  {
    slug: 'glassmorphism-guide',
    title: 'Glassmorphism: A Modern Design Trend',
    excerpt:
      'Learn how to implement glassmorphism effects using CSS and Tailwind. Discover best practices for performance and accessibility.',
    author: 'Frontend Dev',
    date: '2024-04-10',
    readingTime: 6,
    tags: ['CSS', 'Design', 'Tutorial'],
    blog: 'tech',
  },
  {
    slug: 'dark-mode-implementation',
    title: 'Implementing Dark Mode the Right Way',
    excerpt:
      'A comprehensive guide to adding dark mode support to your Next.js application with smooth transitions and user preferences.',
    author: 'Tech Writer',
    date: '2024-04-05',
    readingTime: 10,
    tags: ['Dark Mode', 'Next.js', 'Frontend'],
    blog: 'tech',
  },
  {
    slug: 'note-taking-apps',
    title: 'Why Note-Taking Apps Have Changed Everything',
    excerpt:
      'Digital note-taking has revolutionized how we organize thoughts and manage information. Discover the tools shaping modern knowledge management.',
    author: 'Productivity Expert',
    date: '2024-03-28',
    readingTime: 7,
    tags: ['Productivity', 'Notes', 'Tools'],
    blog: 'tech',
  },
  {
    slug: 'web-design-trends-2024',
    title: '2024 Web Design Trends You Need to Know',
    excerpt:
      'From AI-powered interfaces to sustainable design, explore the latest trends shaping web design in 2024.',
    author: 'Design Team',
    date: '2024-03-20',
    readingTime: 9,
    tags: ['Design Trends', 'Web Design', '2024'],
    blog: 'tech',
  },
  {
    slug: 'accessibility-guidelines',
    title: 'Building Accessible Web Experiences',
    excerpt:
      'Accessibility is not optional. Learn the fundamentals of creating inclusive digital experiences for all users.',
    author: 'A11y Specialist',
    date: '2024-03-15',
    readingTime: 11,
    tags: ['Accessibility', 'Guidelines', 'Best Practices'],
    blog: 'tech',
  },
  {
    slug: 'tailwind-advanced-tips',
    title: 'Advanced Tailwind CSS Techniques',
    excerpt:
      'Master Tailwind CSS with these advanced techniques for custom components, utilities, and responsive design patterns.',
    author: 'CSS Expert',
    date: '2024-03-10',
    readingTime: 8,
    tags: ['Tailwind CSS', 'CSS', 'Tutorial'],
    blog: 'finance',
  },
  {
    slug: 'next-js-13-features',
    title: 'Exploring Next.js 13+ Features',
    excerpt:
      'Next.js continues to evolve with powerful new features. Discover App Router, Server Components, and more.',
    author: 'Full Stack Dev',
    date: '2024-03-05',
    readingTime: 12,
    tags: ['Next.js', 'React', 'Backend'],
    blog: 'finance',
  },
  {
    slug: 'performance-optimization',
    title: 'Performance Optimization: Beyond Basics',
    excerpt:
      'Go beyond basic performance metrics and learn advanced optimization techniques for modern web applications.',
    author: 'Performance Engineer',
    date: '2024-02-28',
    readingTime: 10,
    tags: ['Performance', 'Optimization', 'Web'],
    blog: 'finance',
  },
  {
    slug: 'typescript-best-practices',
    title: 'TypeScript Best Practices for 2024',
    excerpt:
      'Write type-safe code like a pro. Discover TypeScript best practices that will level up your development skills.',
    author: 'Full Stack Dev',
    date: '2024-02-20',
    readingTime: 9,
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    blog: 'finance',
  },
]

const POSTS_PER_PAGE = 6

export function getPostsByBlog(blog: BlogType) {
  return blogPosts.filter((post) => post.blog === blog)
}

export function getPaginatedPosts(page: number = 1, blog?: BlogType) {
  const filteredPosts = blog ? getPostsByBlog(blog) : blogPosts
  const start = (page - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE
  const posts = filteredPosts.slice(start, end)
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  return {
    posts,
    currentPage: page,
    totalPages,
    totalPosts: filteredPosts.length,
  }
}

export function getFeaturedPost() {
  return blogPosts.find((post) => post.featured) || blogPosts[0]
}

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export function searchPosts(query: string) {
  const lowerQuery = query.toLowerCase()
  return blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )
}

export function getSeriesById(seriesId: string) {
  return blogSeries.find((series) => series.id === seriesId)
}

export function getSeriesByPostSlug(slug: string) {
  return blogSeries.find((series) => series.posts.includes(slug))
}

export function getSeriesPostsWithMetadata(seriesId: string) {
  const series = getSeriesById(seriesId)
  if (!series) return []

  return series.posts
    .map((slug) => blogPosts.find((post) => post.slug === slug))
    .filter((post) => post !== undefined) as BlogPostMeta[]
}

export function getSeriesNavigation(slug: string) {
  const series = getSeriesByPostSlug(slug)
  if (!series) return null

  const postIndex = series.posts.indexOf(slug)
  const previousSlug = postIndex > 0 ? series.posts[postIndex - 1] : null
  const nextSlug = postIndex < series.posts.length - 1 ? series.posts[postIndex + 1] : null

  const previousPost = previousSlug ? blogPosts.find((p) => p.slug === previousSlug) : null
  const nextPost = nextSlug ? blogPosts.find((p) => p.slug === nextSlug) : null

  return {
    series,
    currentIndex: postIndex + 1,
    totalPosts: series.posts.length,
    previous: previousPost,
    next: nextPost,
  }
}

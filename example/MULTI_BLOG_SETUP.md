# Multi-Blog Setup Documentation

## Overview

Your ObsidianBlog has been restructured to support multiple independent blogs. Users start at a simple landing page where they select which blog to explore (Tech or Finance), then each blog has its own dedicated interface with separate navigation, posts, and series.

## Architecture

### Routes Structure

```
/                          → Landing page (blog selector)
/tech                      → Tech blog home (featured post, series, all posts)
/tech/blog/[slug]         → Tech blog post detail
/finance                   → Finance blog home
/finance/blog/[slug]      → Finance blog post detail

Shared routes:
/series/[id]              → Series detail (shared across blogs)
/archive                   → Archive page (shared)
/home                      → Home feed (shared)
/search                    → Search page (shared)
```

## Features

### Landing Page (`/`)
- Clean, minimal design with two blog cards
- Tech blog (💻) with blue gradient
- Finance blog (💰) with emerald gradient
- Click any card to enter that blog

### Blog Pages (`/[blog]`)
- **Header**: Navigation with Home, Blogs, Series, Tags, Search links
- **Featured Post**: Large hero card with post image and metadata
- **Blog Series**: Cards showing series belonging to that blog
- **All Posts**: Grid/list view with 6 posts per page
- **Tag Filtering**: Filter posts by tags
- **View Modes**: Toggle between grid and list layouts
- **Pagination**: Navigate through paginated posts

### Blog Post Pages (`/[blog]/blog/[slug]`)
- Back button to blog home
- Full post title and metadata
- Author, date, reading time, share button
- Series navigation (if part of series)
- Full post content
- Related posts from same blog
- Dark/light theme support

## Data Structure

### Blog Categories
```typescript
interface Blog {
  id: 'tech' | 'finance'
  name: string
  description: string
  color: string      // Gradient color
  icon: string       // Emoji icon
}
```

### Post Structure
```typescript
interface BlogPostMeta {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  readingTime: number
  tags: string[]
  featured?: boolean
  blog: 'tech' | 'finance'  // NEW: Blog category
}
```

### Helper Functions

#### Get posts by blog type
```typescript
const techPosts = getPostsByBlog('tech')
const financePosts = getPostsByBlog('finance')
```

#### Paginated posts for specific blog
```typescript
const { posts, totalPages } = getPaginatedPosts(1, 'tech')
```

#### Series for specific blog
```typescript
const seriesForBlog = blogSeries.filter(s => 
  s.posts.some(slug => techPosts.some(p => p.slug === slug))
)
```

## Customization

### Adding a New Blog

1. **Add blog to blogs array** in `lib/blog-data.ts`:
```typescript
export const blogs: Blog[] = [
  // ... existing blogs
  {
    id: 'business',
    name: 'Business Blog',
    description: 'Business strategies and insights',
    color: 'from-orange-600 to-red-600',
    icon: '📊',
  },
]
```

2. **Update BlogType**:
```typescript
export type BlogType = 'tech' | 'finance' | 'business'
```

3. **Add blog field to posts**:
```typescript
{
  slug: 'post-slug',
  // ... other fields
  blog: 'business',
}
```

4. Routes automatically work! The `[blog]` dynamic segments handle it.

### Customizing Colors

Edit colors in the blogs array:
- Light theme background: `#faf8f3`
- Dark theme background: `#1e1e1e`
- Accent color: `#7c3aed` (light), `#a78bfa` (dark)

Update gradient colors in `/app/page.tsx` (landing page):
```typescript
color: 'from-blue-600 to-purple-600'  // Change these
```

### Adding Posts

Add to `blogPosts` array in `lib/blog-data.ts`:
```typescript
{
  slug: 'my-post',
  title: 'My Post Title',
  excerpt: 'Short description',
  author: 'Author Name',
  date: '2024-05-09',
  readingTime: 8,
  tags: ['Tag1', 'Tag2'],
  featured: false,
  blog: 'tech',  // Assign to blog
}
```

### Creating Series

Add to `blogSeries` array:
```typescript
{
  id: 'my-series',
  name: 'Series Name',
  description: 'Series description',
  color: 'purple',
  posts: ['slug1', 'slug2', 'slug3'],
}
```

Series automatically work across blogs - they'll display in whichever blog(s) contain their posts.

## Component Updates

### Blog Card Component
Updated to include `blog: BlogType` field in `BlogPostMeta` interface.

### Header Component
Shows navigation: Home, Blogs, Series, Tags, Search
- Links adjust based on current blog context
- Theme toggle in top-right

### Series Navigation Component
Shows post position in series with prev/next navigation

## Navigation Flow

```
Landing Page (/)
    ↓
Select Blog (Tech/Finance)
    ↓
Blog Home (/tech or /finance)
    ↓
Browse Posts
    ├→ Click Post → Post Detail (/tech/blog/[slug])
    ├→ Click Series → Series Detail (/series/[id])
    ├→ Filter by Tag
    └→ Change View (Grid/List)
```

## Theme Support

- Automatic dark/light theme detection
- Persistent user preference
- Theme toggle in header (top-right)
- All colors Obsidian-inspired:
  - Light: Warm off-white with purple accents
  - Dark: Deep charcoal with light purple accents

## Performance

- Static generation for all pages
- Automatic caching
- Optimized images
- Fast page transitions
- No JavaScript required for basic navigation

## SEO

- Proper metadata for each page
- Structured data for posts
- Meta descriptions for blogs
- Open Graph support for sharing

## Future Enhancements

Potential additions:
- Search within specific blog
- Blog-specific RSS feeds
- Comments system
- User authentication for saved articles
- Email subscriptions by blog
- Related posts from all blogs
- Blog statistics/analytics

## Troubleshooting

### Blog pages not showing posts
Check that posts have the `blog` field set correctly in `blog-data.ts`.

### Series not showing in blog
Ensure the series `posts` array contains slugs of posts that belong to that blog.

### Navigation links broken
Make sure routes are properly nested:
- Blog home: `/[blog]/page.tsx`
- Blog post: `/[blog]/blog/[slug]/page.tsx`
- Blog layout: `/[blog]/layout.tsx`

### Theme not persisting
Check that `ThemeProvider` is properly wrapped in layout and `next-themes` is installed.

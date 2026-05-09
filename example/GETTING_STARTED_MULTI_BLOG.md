# Getting Started with Multi-Blog Setup

## Quick Start (2 minutes)

### 1. Visit the Landing Page
Navigate to `/` and you'll see two blog cards:
- **Tech Blog** (💻) - Blue gradient
- **Finance Blog** (💰) - Emerald gradient

### 2. Click a Blog
Click either card to enter that blog's interface.

### 3. Explore the Blog
You'll see:
- Featured post at top
- Blog series section
- All posts below
- Tag filter buttons
- Grid/list view toggle

### 4. Read a Post
Click any post to view full article with:
- Metadata (author, date, reading time)
- Series navigation (if applicable)
- Related posts
- Dark/light theme toggle

### 5. Navigate Between Blogs
Use the "All Blogs" link in header to go back to landing page.

## Current Content

### Tech Blog (5 posts)
1. Obsidian-Inspired Design
2. Glassmorphism Guide
3. Dark Mode Implementation
4. Note-Taking Apps
5. Web Design Trends 2024

Tags: Design, CSS, Next.js, Frontend, Dark Mode

### Finance Blog (5 posts)
1. Advanced Tailwind CSS
2. Exploring Next.js 13+
3. Performance Optimization
4. TypeScript Best Practices
5. Accessibility Guidelines

Tags: Tailwind CSS, Next.js, Performance, TypeScript, Accessibility

## Adding Content

### Add a New Post

Edit `lib/blog-data.ts`:

```typescript
export const blogPosts: BlogPostMeta[] = [
  // ... existing posts
  {
    slug: 'my-new-post',
    title: 'My New Post Title',
    excerpt: 'Brief description of the post',
    author: 'Your Name',
    date: '2024-05-09',
    readingTime: 7,
    tags: ['Tag1', 'Tag2', 'Tag3'],
    featured: false,
    blog: 'tech',  // or 'finance'
  },
]
```

The post automatically appears in that blog!

### Add a New Blog

1. Add to `blogs` array:
```typescript
{
  id: 'business',
  name: 'Business Blog',
  description: 'Business insights',
  color: 'from-orange-600 to-red-600',
  icon: '📊',
}
```

2. Update `BlogType`:
```typescript
export type BlogType = 'tech' | 'finance' | 'business'
```

3. Add `blog: 'business'` to posts

Done! New blog appears on landing page.

### Create a Series

Edit `blogSeries` array in `lib/blog-data.ts`:

```typescript
{
  id: 'my-series',
  name: 'Series Name',
  description: 'What this series covers',
  color: 'purple',
  posts: [
    'post-slug-1',
    'post-slug-2',
    'post-slug-3',
  ],
}
```

Series automatically shows in applicable blog(s)!

## Customization

### Change Landing Page Colors

Edit `/app/page.tsx`, find the color in each blog card:

```typescript
{`group h-80 rounded-2xl bg-gradient-to-br ${'from-blue-600 to-purple-600'} p-px`}
```

Change the gradient string to any Tailwind gradient.

### Change Blog Icons

Edit `lib/blog-data.ts`:

```typescript
{
  id: 'tech',
  icon: '💻',  // Change this emoji
  // ...
}
```

### Change Featured Post

A featured post is marked with `featured: true`:

```typescript
{
  slug: 'post-slug',
  featured: true,  // Makes this the featured post
  // ...
}
```

### Change Posts Per Page

Edit `/app/[blog]/page.tsx`:

```typescript
const postsPerPage = 6  // Change this number
```

## Features You Can Use

- **Dark/Light Theme** - Toggle in header top-right
- **Tag Filtering** - Click tags to filter posts
- **View Toggle** - Grid or list view icons
- **Pagination** - Navigate pages at bottom
- **Series Navigation** - Prev/next buttons in posts
- **Search** - Click search icon in header
- **Share** - Share icon on post pages

## Directory Structure

```
app/
├── page.tsx                 ← Landing page
├── [blog]/
│   ├── layout.tsx          ← Blog layout
│   ├── page.tsx            ← Blog home
│   └── blog/
│       └── [slug]/
│           └── page.tsx    ← Blog post detail
├── series/
├── archive/
├── home/
└── search/

lib/
└── blog-data.ts           ← All content here

components/
├── header.tsx             ← Navigation
├── footer.tsx
├── blog-card.tsx
├── featured-post.tsx
└── ... other components
```

## Routing

```
/                      → Landing (blog selector)
/tech                  → Tech blog home
/tech/blog/slug        → Tech post
/finance               → Finance blog home
/finance/blog/slug     → Finance post
/series                → All series
/series/[id]          → Series detail
/archive              → Archive
/home                 → Home feed
/search               → Search
```

## Common Tasks

### Find a Post
1. Go to blog home
2. Use tag filter or list view
3. Or use search from header

### Share a Post
1. Open post
2. Click share icon
3. Choose platform

### Filter by Tag
1. Go to blog home
2. Click a tag button
3. Shows only posts with that tag

### Switch Theme
1. Click moon/sun icon (top-right)
2. Theme switches instantly
3. Preference saved automatically

## Troubleshooting

### Posts not showing in blog
Check that post has correct `blog` field in `blog-data.ts`

### Blog card not appearing
Add blog to `blogs` array and update `BlogType`

### Series not showing
Ensure series post slugs match actual post slugs

### Navigation broken
Check that layout and page files are in correct folders

## Performance Tips

- Keep post excerpts under 150 characters
- Use meaningful tags (5-7 per post)
- Optimize images before adding
- Keep reading time accurate (affects UX)

## Next Steps

1. ✅ View landing page and select blog
2. ✅ Explore current posts
3. ✅ Try tag filtering and view toggle
4. 📝 Add your own posts
5. 🎨 Customize colors and content
6. 🚀 Deploy to production

## Need Help?

Check these files:
- `MULTI_BLOG_SETUP.md` - Complete setup guide
- `MULTI_BLOG_SUMMARY.md` - What changed and why
- `lib/blog-data.ts` - All content examples
- `app/[blog]/page.tsx` - Blog home structure

Questions? Review the code comments and TypeScript types for detailed documentation.

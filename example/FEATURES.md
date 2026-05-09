# ObsidianBlog - Features Documentation

## Overview

ObsidianBlog is a beautifully designed, fully-featured blog platform inspired by Obsidian with Obsidian-dark-theme colors, glassmorphism effects, and comprehensive blog management capabilities.

---

## 1. Dark/Light Theme Toggle

### Implementation

The theme toggle uses `next-themes` for seamless light/dark mode switching with persistent user preferences.

**Location:** Top navigation header, right side - easily accessible moon/sun icon button

### Features

- **Automatic Detection:** Respects system preferences on first visit
- **Persistent Storage:** User's theme choice is saved in localStorage
- **Smooth Transitions:** CSS transitions between themes
- **Obsidian-Inspired Colors:**
  - **Light Mode:**
    - Background: `#faf8f3` (warm off-white)
    - Text: `#2d2d2d` (deep charcoal)
    - Accent: `#7c3aed` (purple)
    - Cards: `#fff` (white)
  
  - **Dark Mode:**
    - Background: `#1e1e1e` (Obsidian deep charcoal)
    - Text: `#e8e6e1` (warm off-white)
    - Accent: `#a78bfa` (light purple)
    - Cards: `#2d2d2d` (dark gray)

### How to Use

Click the moon icon in the header to switch to dark mode, or the sun icon to switch to light mode. Your preference is automatically saved.

### Files

- `components/header.tsx` - Theme toggle button with hydration handling
- `app/globals.css` - Color tokens and dark mode styles
- `components/theme-provider.tsx` - Next-themes integration

---

## 2. Blog Series Feature

### What is a Blog Series?

A Blog Series is a collection of related blog posts organized sequentially. Each post in the series can link to the next and previous posts, allowing readers to follow a narrative or learning path through the series.

### Series Components

#### Series Listing Page (`/series`)

The main series page displays all available blog series in a beautiful grid layout. Each series card shows:

- Series name and description
- Number of posts in the series
- Color-coded badge
- Hover effects with glassmorphism

#### Series Detail Page (`/series/[id]`)

Individual series pages show:

- Series header with description
- Numbered list of all posts in the series
- Direct links to each post
- Color-coded visual indicators

#### Series Navigation in Posts

When viewing a blog post that's part of a series, you'll see:

- Series information badge
- Progress indicator (e.g., "Post 2 of 5")
- Progress bar showing position in series
- Previous/next post navigation links
- Disabled states for first/last posts

### Available Series

#### 1. "Obsidian Deep Dive"
- Posts: obsidian-inspired-design, dark-mode-implementation, note-taking-apps
- Color: Purple
- Description: A comprehensive series exploring Obsidian design principles, implementation, and best practices

#### 2. "Next.js & Web Design"
- Posts: glassmorphism-guide, web-design-trends-2024
- Color: Blue
- Description: Master modern web design with Next.js and the latest design trends

### How to Add a New Series

1. Open `lib/blog-data.ts`
2. Add a new object to the `blogSeries` array:

```typescript
{
  id: 'your-series-id',
  name: 'Your Series Name',
  description: 'Description of what the series covers',
  color: 'purple', // or 'blue', 'pink', 'green'
  posts: ['slug1', 'slug2', 'slug3'], // array of post slugs in order
}
```

3. The series will automatically appear on `/series` and create a route at `/series/your-series-id`

### How to Add Posts to a Series

1. Add the post normally to `blogPosts` array in `lib/blog-data.ts`
2. Add the post's slug to the `posts` array in the desired series
3. The series navigation will automatically appear on that post

### Series Color Options

- `purple` - Purple accent (default)
- `blue` - Blue accent
- `pink` - Pink accent
- `green` - Green accent

Each color has custom styling for the series badges and navigation elements.

### Files

- `lib/blog-data.ts` - Series data and helper functions
- `components/series-card.tsx` - Series card component
- `components/series-navigation.tsx` - In-post series navigation
- `app/series/page.tsx` - Series listing page
- `app/series/[id]/page.tsx` - Series detail page

---

## 3. Glassmorphism Design

### What is Glassmorphism?

Glassmorphism is a modern design trend featuring frosted glass effect elements with backdrop blur and transparency.

### Implementation

All interactive elements use custom glassmorphism classes:

```css
.glass {
  backdrop-filter: blur(12px);
  background-color: rgb(255 255 255 / 0.4);
  border: 1px solid rgb(255 255 255 / 0.6);
}

.glass-hover {
  /* Same as .glass + hover effects */
  transition: all 300ms ease;
}
```

### Where It's Used

- Navigation header
- Blog cards
- Featured post section
- Series cards
- Series navigation
- Theme toggle button
- All interactive buttons

### Color Adaptation

The glassmorphism effect automatically adapts to the theme:

- **Light Mode:** Light frosted glass with subtle borders
- **Dark Mode:** Very subtle transparency with refined borders

---

## Navigation Structure

### Header Navigation

- **Home** - Link to homepage
- **Archive** - View all posts with search/filtering
- **Series** - Browse all blog series
- **Contact** - Link to contact section
- **Theme Toggle** - Switch between light/dark mode

### File Structure

```
app/
├── page.tsx                 # Homepage with featured post + pagination
├── archive/
│   └── page.tsx            # All posts with search
├── blog/
│   └── [slug]/
│       └── page.tsx        # Individual post with series navigation
├── series/
│   ├── page.tsx            # Series listing
│   └── [id]/
│       └── page.tsx        # Series detail with ordered posts
└── layout.tsx              # Root layout with theme provider

components/
├── header.tsx              # Navigation header with theme toggle
├── footer.tsx              # Footer section
├── blog-card.tsx           # Blog post card
├── featured-post.tsx       # Featured post hero
├── pagination.tsx          # Pagination controls
├── series-card.tsx         # Series card
├── series-navigation.tsx   # In-post series navigation
├── theme-provider.tsx      # Next-themes wrapper
```

---

## Customization Guide

### Changing Colors

Edit `app/globals.css` and modify the color tokens in `:root` and `.dark` sections:

```css
:root {
  --accent: #7c3aed;  /* Purple accent */
  --primary: #7c3aed;
  /* ... other colors */
}

.dark {
  --accent: #a78bfa;  /* Light purple for dark mode */
  --primary: #a78bfa;
  /* ... other colors */
}
```

### Adding New Blog Posts

Add to `blogPosts` array in `lib/blog-data.ts`:

```typescript
{
  slug: 'your-post-slug',
  title: 'Post Title',
  excerpt: 'Short excerpt',
  author: 'Author Name',
  date: '2024-04-21',
  readingTime: 8,
  tags: ['Tag1', 'Tag2'],
  featured: false, // Set to true for featured post
}
```

### Modifying Series

Update `blogSeries` array in `lib/blog-data.ts` with new series or modify existing ones.

---

## Performance & Accessibility

- **Optimized Images:** Next.js Image optimization
- **Static Generation:** Series and posts pre-generated at build time
- **Semantic HTML:** Proper heading hierarchy and ARIA labels
- **Keyboard Navigation:** All interactive elements are keyboard accessible
- **Dark Mode Support:** WCAG contrast ratio compliance in both themes
- **Fast Load Times:** Glassmorphism effects use efficient CSS blur

---

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

Glassmorphism effects degrade gracefully in older browsers.

---

## Future Enhancement Ideas

- Markdown content support
- Comments section
- Related posts by tag
- Reading list / bookmarks
- Social sharing buttons
- Search with Algolia
- Analytics integration
- RSS feed generation

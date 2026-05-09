# ObsidianBlog Components Guide

A detailed overview of all components used in the blog, their properties, and usage patterns.

## Component Architecture

```
Layout (Root)
├── ThemeProvider
│   └── Header
│   │   └── Theme Toggle (inside provider)
│   └── Main Content
│   │   ├── FeaturedPost
│   │   └── BlogGrid
│   │       ├── BlogCard (repeated)
│   │       └── Pagination
│   └── Footer
```

## Components

### 1. ThemeProvider

**File**: `/components/theme-provider.tsx`

Manages light/dark theme switching using `next-themes`.

**Props**:
- `children`: React.ReactNode - Child components
- Inherits all NextThemesProvider props

**Features**:
- Persistent theme preference (localStorage)
- System preference detection
- Smooth transitions between themes
- Fixed position theme toggle button

**Usage**:
```tsx
<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
  {children}
</ThemeProvider>
```

---

### 2. Header

**File**: `/components/header.tsx`

Sticky navigation header with logo and main navigation links.

**Props**: None

**Features**:
- Glassmorphic sticky header
- Logo with Obsidian Vault icon
- Navigation links: Home, Archive, Contact
- Responsive logo text (hidden on mobile)

**Usage**:
```tsx
import { Header } from '@/components/header'

export default function Layout() {
  return (
    <>
      <Header />
      {/* page content */}
    </>
  )
}
```

---

### 3. BlogCard

**File**: `/components/blog-card.tsx`

Individual blog post preview card with glassmorphism.

**Props**:
```typescript
interface BlogCardProps {
  post: BlogPostMeta
  featured?: boolean  // Optional, not currently used
}

interface BlogPostMeta {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  readingTime: number
  tags: string[]
  featured?: boolean
}
```

**Features**:
- Glassmorphic background with hover effect
- Tag display (up to 3 tags)
- Title with clamp to 2 lines
- Excerpt with clamp to 2 lines
- Metadata: date, reading time, author
- Animated arrow icon on hover
- Link to full post

**Usage**:
```tsx
import { BlogCard } from '@/components/blog-card'

{posts.map((post) => (
  <BlogCard key={post.slug} post={post} />
))}
```

---

### 4. FeaturedPost

**File**: `/components/featured-post.tsx`

Large hero-style card for featured blog post with featured image.

**Props**:
```typescript
interface FeaturedPostProps {
  post: BlogPostMeta
}
```

**Features**:
- Two-column layout on desktop (image + content)
- Responsive single column on mobile
- Featured badge
- Large title (text-3xl/4xl)
- Excerpt paragraph
- All tags visible
- Complete metadata display
- Image scale animation on hover
- Link to full post

**Visual Layout**:
```
┌─────────────────────────────────────────┐
│  Image   │  Featured Badge              │
│  Section │  Large Title                 │
│  (auto   │  Excerpt Text                │
│  height) │  Tags...                     │
│          │  Metadata (date, time, etc.) │
└─────────────────────────────────────────┘
```

**Usage**:
```tsx
import { FeaturedPost } from '@/components/featured-post'

const featured = getFeaturedPost()
<FeaturedPost post={featured} />
```

---

### 5. Pagination

**File**: `/components/pagination.tsx`

Navigation controls for paginated content.

**Props**:
```typescript
interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl?: string  // Default: ''
}
```

**Features**:
- Previous/Next navigation buttons
- Page number indicators
- Disabled states for edge cases
- Current page highlighted with accent color
- Responsive button text (hidden on mobile)
- Smooth transitions

**Layout**:
```
[Prev] [1] [2] [3] [Next]
        ↑
    Current page highlighted
```

**Usage**:
```tsx
import { Pagination } from '@/components/pagination'

<Pagination 
  currentPage={currentPage} 
  totalPages={totalPages}
  baseUrl="/"
/>
```

---

### 6. Footer

**File**: `/components/footer.tsx`

Footer section with links, about, and social media.

**Props**: None

**Features**:
- Three-column layout on desktop
- About section with blog description
- Links section (Home, Archive, Contact)
- Social media buttons (Twitter, GitHub, Email)
- Copyright information with current year
- Responsive stacking on mobile
- Glassmorphic social icon buttons

**Sections**:
1. **About**: Description of the blog
2. **Links**: Navigation links
3. **Connect**: Social media icons (Twitter, GitHub, Mail)
4. **Copyright**: Annual copyright notice

**Usage**:
```tsx
import { Footer } from '@/components/footer'

export default function Layout() {
  return (
    <>
      {/* content */}
      <Footer />
    </>
  )
}
```

---

## Design System Integration

### Colors Used Across Components

All components use CSS variables from `globals.css`:

```css
--accent: #7c3aed (light) | #a78bfa (dark)
--muted-foreground: #5a5a5a (light) | #9a9a9a (dark)
--background: #faf8f3 (light) | #1e1e1e (dark)
--foreground: #2d2d2d (light) | #e8e6e1 (dark)
--border: #e0d5c7 (light) | #3a3a3a (dark)
```

### Glassmorphism Classes

```css
.glass {
  backdrop-filter: blur(12px);
  background-color: rgb(255 255 255 / 0.4);  /* Light mode */
  border: 1px solid rgb(255 255 255 / 0.6);
}

.glass-hover {
  /* .glass + hover effects */
  transition: all 300ms ease;
}
```

### Spacing & Layout

- **Container**: `max-w-6xl mx-auto px-4 md:px-8`
- **Grid Gap**: `gap-6` for blog cards
- **Padding**: `p-4 md:p-8` for major sections
- **Margin**: `mb-12` for section spacing

---

## Icon Library

All icons from **Lucide React** (`lucide-react`):

- `Vault` - Logo in header
- `Moon` - Dark theme toggle
- `Sun` - Light theme toggle
- `Calendar` - Date indicator
- `Clock` - Reading time
- `ArrowRight` - Link indicators
- `ChevronLeft` / `ChevronRight` - Pagination
- `Github` - Social link
- `Twitter` - Social link
- `Mail` - Social link
- `Search` - Archive search
- `X` - Clear search

---

## Responsive Behavior

### Breakpoints

```
Mobile (<768px):
  - Single column layouts
  - Stacked navigation items
  - Hidden logo text
  - Full-width cards

Tablet (768px - 1024px):
  - Two-column grids
  - Adjusted padding
  - Visible navigation text

Desktop (>1024px):
  - Full featured layout
  - Multi-column grids
  - Optimal reading widths
  - Hover effects active
```

---

## Animation & Transitions

All components use consistent timing:

- **Duration**: `300ms`
- **Easing**: `ease` (default)

### Component-Specific Animations

1. **BlogCard**
   - Title color transition on hover
   - Arrow icon slide right

2. **FeaturedPost**
   - Image scale transform (1.05x)
   - Title color transition

3. **Pagination**
   - Button background/border transitions
   - Scale/opacity for active state

4. **Header**
   - Logo icon background change
   - Navigation link color transition

5. **Footer**
   - Social icon hover glow
   - Link color transitions

---

## Accessibility Features

### Semantic HTML
- `<header>` for navigation
- `<main>` for content
- `<article>` for blog posts
- `<footer>` for footer
- `<nav>` for navigation elements

### ARIA Labels
- `aria-label` on icon-only buttons (theme toggle, social icons)
- `dateTime` attributes on date elements
- Semantic heading hierarchy (h1, h2, h3)

### Focus States
- Default outline-ring/50 on all elements
- Visible focus on buttons and links
- Keyboard navigation support

### Color Contrast
- All text meets WCAG AA standards
- Light mode: Dark text on light backgrounds
- Dark mode: Light text on dark backgrounds

---

## Performance Optimization

1. **Image Optimization**: Next.js `Image` component with auto-optimization
2. **Code Splitting**: Components lazy-loaded where appropriate
3. **CSS**: Tailwind purgeing removes unused styles
4. **Rendering**: Use `useMemo` for expensive computations
5. **Caching**: Static generation with `generateStaticParams`

---

## Component State & Logic

### Client vs Server Components

**Client Components** (with 'use client'):
- `ThemeProvider` - Theme state management
- `Home` (page) - Search params handling
- `ArchivePage` - Search and filtering

**Server Components**:
- `Header` - Static content
- `BlogCard` - Static content
- `FeaturedPost` - Static content
- `Pagination` - Static UI
- `Footer` - Static content
- `PostPage` - Static generation

---

## Customization Examples

### Change Primary Accent Color

```css
:root {
  --accent: #your-color;
}

.dark {
  --accent: #your-light-variant;
}
```

### Modify BlogCard Styling

Edit `/components/blog-card.tsx`:
```tsx
className="group glass-hover rounded-lg p-6 h-full flex flex-col gap-4 cursor-pointer"
// Change padding, gap, border-radius, etc.
```

### Update Header Navigation

Edit `/components/header.tsx`:
```tsx
<Link href="/your-page" className="...">
  Your Link
</Link>
```

---

## Common Patterns

### Glassmorphism with Text

```tsx
<div className="glass rounded-lg p-6">
  <h2>Content</h2>
</div>
```

### Interactive Glass Elements

```tsx
<button className="glass-hover p-3 rounded-lg">
  Interactive Content
</button>
```

### Responsive Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {items.map(item => <Item key={item.id} item={item} />)}
</div>
```

### Link Wrapping

```tsx
<Link href={path}>
  <article className="glass-hover ...">
    Content
  </article>
</Link>
```

---

## Troubleshooting

**Component not rendering?**
- Check props match interface
- Verify import path
- Ensure data structure matches BlogPostMeta

**Styling not applied?**
- Verify Tailwind classes are correct
- Check that globals.css is imported
- Review responsive breakpoints (md:, lg:)

**Theme not switching?**
- Ensure ThemeProvider wraps entire app
- Check localStorage is not disabled
- Verify `suppressHydrationWarning` on html tag

---

## Future Component Ideas

- `BlogComments` - Giscus/Disqus integration
- `NewsletterSignup` - Email subscription form
- `TableOfContents` - Post navigation
- `RelatedPosts` - Suggestions component
- `SearchResults` - Full-text search display
- `AuthorCard` - Author bio section
- `CodeHighlight` - Syntax highlighting wrapper

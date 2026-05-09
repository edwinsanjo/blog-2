# Quick Reference - Navigation & Routes

## Five Navigation Sections

| Section | Route | Purpose | Best For |
|---------|-------|---------|----------|
| **Home** | `/home` | Featured posts feed | Getting latest content |
| **Blogs** | `/` | All posts with filtering | Browsing all content |
| **Series** | `/series` | Organized collections | Deep dives into topics |
| **Tags** | `/archive` | Search & year-based archive | Finding by date or tag |
| **Search** | `/search` | Global content search | Finding specific topics |

---

## What Each Page Shows

### `/` (All Blogs Dashboard)
- Quick navigation cards
- Featured series overview
- All posts in grid/list view
- Tag filtering
- View mode toggle

### `/home` (Featured Feed)
- Hero section
- Featured post
- Latest 6 posts
- Pagination
- Quick nav cards

### `/series` (Series Listing)
- All series cards
- Series descriptions
- Post counts per series
- Click to view series posts

### `/series/[id]` (Series Detail)
- Series header
- Numbered post list
- Post descriptions
- Click to read post

### `/blog/[slug]` (Blog Post)
- Full article
- Series navigation (if applicable)
- Related posts
- Author info
- Share buttons

### `/archive` (Archive & Tags)
- Search input
- Posts grouped by year
- Tag display
- Year-based timeline

### `/search` (Search Page)
- Search input (auto-focused)
- Real-time results
- Searches: titles, content, tags, authors
- Result counter

---

## Quick Actions

| Want To... | Click On... | Or Go To... |
|-----------|------------|-----------|
| See latest posts | Home | `/home` |
| Browse all blogs | Blogs | `/` |
| Explore series | Series | `/series` |
| Find by tag/date | Tags | `/archive` |
| Search content | 🔍 Icon | `/search` |
| Switch theme | 🌙/☀️ Icon | Header (anywhere) |
| Return home | Logo | `/` |

---

## Keyboard Shortcuts

- `Home/End` - Jump to top/bottom of page
- `Tab` - Navigate between elements
- `Enter` - Click focused link
- `Escape` - Close search (on `/search`)

---

## View Modes

### Grid View (Default)
- Better for visual browsing
- Shows more content at once
- 2 columns on desktop, 1 on mobile

### List View
- Better for scanning
- Shows one post per line
- Includes date/reading time

**Toggle**: Top-right of post section on `/`

---

## Filtering Options

### On `/` (Blogs Dashboard)
- Tag buttons at top
- Click tag to filter all posts
- "All Tags" to reset

### On `/archive` (Archive)
- Search input for text search
- Posts grouped by year
- Tags shown for each post

### On `/search` (Search)
- Type to search
- Searches across multiple fields
- Instant results

---

## Mobile Navigation

- All sections accessible from header
- Navigation links responsive
- Touch-friendly buttons
- Full features on mobile
- No desktop-only content

---

## Dark/Light Theme

- **Toggle**: Sun/Moon icon (top-right)
- **Storage**: Persisted to browser
- **Scope**: Applies everywhere
- **Instant**: No page reload
- **Light Mode**: Warm beige background
- **Dark Mode**: Deep charcoal background

---

## Color Scheme

### Light Mode
- Background: #faf8f3 (warm white)
- Text: #2d2d2d (dark charcoal)
- Accent: #7c3aed (purple)
- Cards: #fff (white)

### Dark Mode
- Background: #1e1e1e (deep charcoal)
- Text: #e8e6e1 (warm off-white)
- Accent: #a78bfa (light purple)
- Cards: #2d2d2d (dark gray)

---

## Glassmorphism Elements

Applied to:
- Header
- Blog cards
- Featured post
- Series cards
- Navigation buttons
- Search inputs
- Theme toggle

**Effect**: Frosted glass with 12px blur + transparency

---

## Metadata Shown

Per Post:
- Title
- Excerpt
- Author name
- Publication date
- Reading time (minutes)
- Tags
- (Featured image on cards)

Per Series:
- Name
- Description
- Number of posts
- Posts listed with metadata

---

## Special Features

### Series Navigation (Within Posts)
- Shows current position: "Post 2 of 5"
- Progress bar
- Previous button (if available)
- Next button (if available)
- Series breadcrumb

### Featured Post
- Large visual display
- On `/home` page
- Higher resolution image
- Prominent placement

### Tag Filtering
- Click any tag to filter
- Multiple tags per post
- Visual badge display
- Reset with "All Tags"

### Search
- Real-time instant search
- Searches 5 fields:
  - Titles
  - Excerpts
  - Full content
  - Tags
  - Author names

---

## Navigation Tips

1. **Always Accessible**: Header visible on every page
2. **Logo Return**: Click logo anytime to go back to `/`
3. **Quick Search**: Use search icon for fast lookups
4. **Series Exploration**: Use nav buttons to move through related posts
5. **Tag Discovery**: Click tags on posts to find similar content
6. **View Toggle**: Switch between grid/list for different experiences

---

## Performance Notes

- Static generation for all routes
- Instant search on client-side
- Lazy loading for images
- Optimized CSS and JavaScript
- Fast theme switching
- No page reloads for nav

---

## Supported Browsers

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Theme not saving | Clear browser cache, check localStorage |
| Search not working | Try full page refresh |
| Series nav missing | Post isn't in a series |
| Posts not loading | Check internet connection |
| Images not showing | Images may be loading, wait a moment |

---

## Routes Summary

```
/                      All blogs dashboard
/home                  Featured posts feed
/blog/:slug            Individual blog post
/series                Series listing
/series/:id            Series detail (posts in series)
/archive               Archive with search
/search                Global search page
```

**Accessible from**: Header navigation (any page)

---

Last Updated: Latest Build
Version: 2.0 (Navigation Redesign)

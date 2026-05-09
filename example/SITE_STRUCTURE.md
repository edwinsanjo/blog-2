# ObsidianBlog Site Structure & Flow Diagram

## Navigation Flow Chart

```
                          ┌─────────────────────────────────────┐
                          │   PERSISTENT HEADER NAVIGATION      │
                          │ Home │ Blogs │ Series │ Tags │ 🔍 🌙 │
                          └─────────────────────────────────────┘
                                          │
                    ┌───────────────────────┼───────────────────────┐
                    │                       │                       │
                    ▼                       ▼                       ▼
            ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
            │    HOME      │      │    BLOGS     │      │   SERIES     │
            │   (/home)    │      │     (/)      │      │  (/series)   │
            └──────────────┘      └──────────────┘      └──────────────┘
                    │                       │                       │
                    │                       │                       │
            ┌──────────────────┐   ┌──────────────────┐   ┌──────────────┐
            │ Featured Post    │   │ All Posts Grid   │   │ Series Cards │
            │ + Latest Posts   │   │ Tag Filters      │   │ (Clickable)  │
            │ (6 items)        │   │ View Toggle      │   │              │
            │ + Pagination     │   │ (Grid/List)      │   └──────────────┘
            └──────────────────┘   └──────────────────┘           │
                    │                       │                      │
                    └───────────┬───────────┘                      │
                                │                                  │
                                ▼                                  ▼
                    ┌──────────────────────┐        ┌──────────────────────┐
                    │   BLOG POST (/blog)  │        │  SERIES DETAIL       │
                    │                      │        │  (/series/[id])      │
                    │ • Full Article       │        │                      │
                    │ • Series Navigation  │        │ • Series Header      │
                    │ • Related Posts      │        │ • Numbered Post List │
                    │ • Comments           │        │ • Metadata per Post  │
                    └──────────────────────┘        └──────────────────────┘
                                │                             │
                                │                             │
                                └──────────────┬──────────────┘
                                               │
                                               ▼
                                   ┌──────────────────────┐
                                   │ Blog Post Details    │
                                   │ (/blog/[slug])       │
                                   │                      │
                                   │ • Article Content    │
                                   │ • Series Context     │
                                   │ • Prev/Next Buttons  │
                                   │ • Related Articles   │
                                   └──────────────────────┘
                                               │
                                               │
                                    ┌──────────┴──────────┐
                                    │                     │
                                    ▼                     ▼
                            ┌──────────────┐    ┌──────────────┐
                            │  TAGS PAGE   │    │ SEARCH PAGE  │
                            │  (/archive)  │    │  (/search)   │
                            │              │    │              │
                            │ • Posts by   │    │ • Search Box │
                            │   Year       │    │ • Real-time  │
                            │ • Search Box │    │   Results    │
                            │ • Tag Display│    │ • Global     │
                            └──────────────┘    │   Search     │
                                                 └──────────────┘
```

---

## Component Hierarchy

```
RootLayout
├─ ThemeProvider
├─ Header
│  ├─ Logo (links to /)
│  ├─ Navigation Links
│  │  ├─ Home (/home)
│  │  ├─ Blogs (/)
│  │  ├─ Series (/series)
│  │  ├─ Tags (/archive)
│  │  └─ Search Icon (/search)
│  └─ Theme Toggle
│
├─ Main Content
│  ├─ Dashboard (/)
│  │  ├─ Hero Section
│  │  ├─ Quick Nav Cards
│  │  ├─ Featured Series
│  │  └─ All Posts Section
│  │     ├─ View Toggle
│  │     ├─ Tag Filters
│  │     └─ BlogCard[] (grid/list)
│  │
│  ├─ Home Feed (/home)
│  │  ├─ Hero Section
│  │  ├─ FeaturedPost
│  │  ├─ BlogCard[] (latest)
│  │  └─ Pagination
│  │
│  ├─ Blog Post (/blog/[slug])
│  │  ├─ Post Header
│  │  ├─ SeriesNavigation (if in series)
│  │  ├─ Content
│  │  └─ Related Posts
│  │
│  ├─ Series Listing (/series)
│  │  ├─ Header
│  │  └─ SeriesCard[]
│  │
│  ├─ Series Detail (/series/[id])
│  │  ├─ Series Header
│  │  └─ Post List
│  │
│  ├─ Archive (/archive)
│  │  ├─ Search Input
│  │  └─ Posts Grouped by Year
│  │
│  └─ Search (/search)
│     ├─ Search Input
│     └─ Results
│
└─ Footer
   ├─ Links
   ├─ Social
   └─ Copyright
```

---

## Data Flow

```
                    blogPosts[] (10 items)
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
    [Dashboard]      [Series Data]     [Search Index]
        │                  │                  │
        │        ┌─────────┴──────────┐      │
        │        │                    │      │
        ▼        ▼                    ▼      ▼
    Grid/List  Series Cards      Series Nav  Search
        │           │                │        │
        └───────────┬────────────────┴────────┘
                    │
                    ▼
            Blog Post Detail
                    │
            ┌───────┴───────┐
            │               │
            ▼               ▼
    Series Navigation  Related Posts
```

---

## Routes Map

```
ROOT LEVEL
│
├─ / ◀─ Dashboard (All posts, series overview, tag filters)
│
├─ /home ◀─ Featured Feed (Latest posts, featured post)
│
├─ /blog/[slug] ◀─ Blog Post Detail
│    ├─ /blog/obsidian-inspired-design
│    ├─ /blog/dark-mode-implementation
│    ├─ /blog/note-taking-apps
│    ├─ /blog/glassmorphism-guide
│    ├─ /blog/web-design-trends-2024
│    ├─ /blog/accessibility-in-web-design
│    ├─ /blog/color-theory-basics
│    ├─ /blog/typography-guide
│    ├─ /blog/responsive-design-patterns
│    └─ /blog/nextjs-performance-tips
│
├─ /series ◀─ Series Listing
│
├─ /series/[id] ◀─ Series Detail
│    ├─ /series/obsidian-deep-dive
│    └─ /series/nextjs-web-design
│
├─ /archive ◀─ Search & Tags (Year-grouped, searchable)
│
└─ /search ◀─ Global Search (Real-time results)
```

---

## Page Layouts

### Dashboard (/) - Detailed View
```
┌─────────────────────────────────────────────────────┐
│                    HERO SECTION                     │
│     "ObsidianBlog" + Tagline + Description         │
└─────────────────────────────────────────────────────┘

┌─ Quick Navigation Cards ────────────────────────────┐
│ [🏠 Home] [📚 Series] [📖 Archive] [🔍 Search]     │
└─────────────────────────────────────────────────────┘

┌─ Featured Series ───────────────────────────────────┐
│ ┌─────────────────┐ ┌─────────────────┐            │
│ │ Series 1 (3)    │ │ Series 2 (2)    │            │
│ │ Description...  │ │ Description...  │            │
│ └─────────────────┘ └─────────────────┘            │
└─────────────────────────────────────────────────────┘

┌─ All Posts (10) ────────────────────────────────────┐
│ [Grid] [List] | [All Tags] [Design] [Dev] [UX]    │
├─────────────────────────────────────────────────────┤
│ ┌──────────────┐ ┌──────────────┐                 │
│ │ Post 1       │ │ Post 2       │                 │
│ │ Excerpt...   │ │ Excerpt...   │                 │
│ │ 5 min read   │ │ 8 min read   │                 │
│ └──────────────┘ └──────────────┘                 │
│ ┌──────────────┐ ┌──────────────┐                 │
│ │ Post 3       │ │ Post 4       │                 │
│ │ Excerpt...   │ │ Excerpt...   │                 │
│ │ 6 min read   │ │ 7 min read   │                 │
│ └──────────────┘ └──────────────┘                 │
│ ... (more posts)                                   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                    FOOTER                          │
└─────────────────────────────────────────────────────┘
```

### Home Feed (/home) - Detailed View
```
┌─────────────────────────────────────────────────────┐
│                    HERO SECTION                     │
│     Latest Posts from ObsidianBlog                 │
└─────────────────────────────────────────────────────┘

┌─ Featured Post ─────────────────────────────────────┐
│ ┌─────────────────────────────────────┐            │
│ │   Large Featured Post with Image    │            │
│ │   Title, Excerpt, CTA               │            │
│ └─────────────────────────────────────┘            │
└─────────────────────────────────────────────────────┘

┌─ Latest Posts (6) ──────────────────────────────────┐
│ ┌──────────────┐ ┌──────────────┐                 │
│ │ Post 1       │ │ Post 2       │                 │
│ └──────────────┘ └──────────────┘                 │
│ ┌──────────────┐ ┌──────────────┐                 │
│ │ Post 3       │ │ Post 4       │                 │
│ └──────────────┘ └──────────────┘                 │
│ ┌──────────────┐ ┌──────────────┐                 │
│ │ Post 5       │ │ Post 6       │                 │
│ └──────────────┘ └──────────────┘                 │
└─────────────────────────────────────────────────────┘

┌─ Pagination ────────────────────────────────────────┐
│ < Previous  [1] [2] [3]  Next >                    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                    FOOTER                          │
└─────────────────────────────────────────────────────┘
```

### Blog Post (/blog/[slug]) - Detailed View
```
┌─────────────────────────────────────────────────────┐
│ [Logo] [Nav Links] [Search] [Theme]              │
└─────────────────────────────────────────────────────┘

┌─ Post Header ───────────────────────────────────────┐
│ Title                                              │
│ Author | Date | Reading Time | Tags               │
└─────────────────────────────────────────────────────┘

┌─ Series Navigation (if applicable) ─────────────────┐
│ Series: Obsidian Deep Dive (Post 2 of 5)          │
│ [Progress Bar ████░░░░░░]                         │
│ [< Previous Post] [Next Post >]                   │
└─────────────────────────────────────────────────────┘

┌─ Article Content ───────────────────────────────────┐
│ [Full article text, images, code blocks]         │
│ ...                                               │
│ ...                                               │
└─────────────────────────────────────────────────────┘

┌─ Related Posts ─────────────────────────────────────┐
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐│
│ │ Related 1    │ │ Related 2    │ │ Related 3    ││
│ └──────────────┘ └──────────────┘ └──────────────┘│
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                    FOOTER                          │
└─────────────────────────────────────────────────────┘
```

### Archive (/archive) - Detailed View
```
┌─────────────────────────────────────────────────────┐
│           ARCHIVE - Search & Tag View              │
│ [Search Input: "search posts..."]                 │
└─────────────────────────────────────────────────────┘

2024 (5 posts)
├─ Oct 15 | Post Title 1 | [tag1] [tag2] | 5 min
├─ Oct 10 | Post Title 2 | [tag3]        | 8 min
├─ Sep 25 | Post Title 3 | [tag1] [tag4] | 6 min
├─ Sep 20 | Post Title 4 | [tag2]        | 7 min
└─ Sep 15 | Post Title 5 | [tag3] [tag5] | 4 min

2023 (5 posts)
├─ Dec 30 | Post Title 6 | [tag1]        | 10 min
├─ Dec 15 | Post Title 7 | [tag4] [tag5] | 9 min
├─ Nov 20 | Post Title 8 | [tag2]        | 6 min
├─ Nov 10 | Post Title 9 | [tag3]        | 7 min
└─ Oct 30 | Post Title 10| [tag1]        | 5 min
```

### Search (/search) - Detailed View
```
┌─────────────────────────────────────────────────────┐
│               SEARCH POSTS                         │
│ [🔍 Search posts...          ✕]                   │
└─────────────────────────────────────────────────────┘

Found 3 results

┌─ Result 1 ──────────────────────────────────────────┐
│ Post Title Matching Query                         │
│ Excerpt showing context...                        │
│ [tag1] [tag2]          10/15/2024 | 5 min read   │
└─────────────────────────────────────────────────────┘

┌─ Result 2 ──────────────────────────────────────────┐
│ Another Matching Post Title                       │
│ Different excerpt from content...                 │
│ [tag3]                 09/20/2024 | 8 min read   │
└─────────────────────────────────────────────────────┘

┌─ Result 3 ──────────────────────────────────────────┐
│ Post With Tag Match                               │
│ Content excerpt here...                           │
│ [tag1] [tag2] [tag4]   08/15/2024 | 6 min read   │
└─────────────────────────────────────────────────────┘
```

---

## User Journey Flows

### Flow 1: New Visitor Discovery
```
Enter / (Dashboard)
    ↓
[See all content at glance]
    ↓
Browse all posts OR Explore series
    ↓
Click post OR click series
    ↓
Read content
    ↓
Use header to explore other sections
```

### Flow 2: Series Enthusiast
```
Click Series in header
    ↓
View all series cards
    ↓
Click series of interest
    ↓
Browse numbered post list
    ↓
Click post to read
    ↓
Use series nav buttons to read previous/next
    ↓
Jump to other series
```

### Flow 3: Search-Focused User
```
Click search icon
    ↓
Type search query
    ↓
See instant results
    ↓
Click interesting result
    ↓
Read post
    ↓
Use header to explore more
```

### Flow 4: Latest Content Hunter
```
Click Home in header
    ↓
See featured post
    ↓
Browse latest posts
    ↓
Use pagination to see more
    ↓
Jump to any section via quick nav
```

---

## Key Metrics

- **Total Routes**: 7 main + dynamic routes
- **Static Pages**: 6
- **Dynamic Pages**: 3 (blog posts, series detail)
- **Blog Posts**: 10 sample posts
- **Series**: 2 sample series
- **Max Posts per Page**: 6 (home) or all (dashboard)
- **Navigation Sections**: 5 main + search + theme

---

## Performance Metrics

- **Build Time**: ~5.6s
- **Page Generation**: ~413ms
- **Static Routes**: Pre-rendered
- **Dynamic Routes**: SSG with caching
- **Search**: Client-side (instant)
- **Theme Toggle**: No reload required

---

## Summary

The ObsidianBlog now features a comprehensive site structure with:
- **7 main pages** accessible via persistent header navigation
- **Multiple discovery methods**: browse all, explore series, search, filter by tags
- **Flexible layouts**: dashboard, feed, search, archive
- **Elegant design**: glassmorphism, dark/light themes
- **Optimal UX**: fast navigation, context-aware sections, clear information hierarchy

All routes are linked, discoverable, and optimized for user experience.

# Navigation Guide - ObsidianBlog

## Overview

The ObsidianBlog now features a streamlined, context-aware navigation system with five main sections accessible from every page. The navigation intelligently displays relevant links whether you're browsing the dashboard, reading an article, or exploring series.

---

## Navigation Structure

### Header Navigation Bar

Located at the top of every page with the following sections:

```
[Logo] [Home] [Blogs] [Series] [Tags] [Search] [Theme Toggle]
```

### 1. **Home** (`/home`)
- **Purpose**: Featured posts and latest articles
- **Content**: 
  - Hero section with site description
  - Featured/pinned blog post
  - Latest 6 blog posts with pagination
  - Quick navigation cards
- **Access**: Click "Home" in header or use dashboard quick nav

### 2. **Blogs** (`/`)
- **Purpose**: Browse all blog posts with filtering and view modes
- **Content**:
  - Dashboard with all available blogs
  - Featured series overview
  - Tag-based filtering
  - Toggle between Grid and List views
  - Full post previews with metadata
- **Features**:
  - View mode toggle (Grid/List)
  - Tag filter buttons
  - Post count display
  - Reading time estimates
- **Navigation**: 
  - Click "Blogs" in header
  - Click "All Blogs" on any blog post page
  - Default landing page from logo

### 3. **Series** (`/series`)
- **Purpose**: Explore organized collections of related posts
- **Routes**:
  - `/series` - List all series
  - `/series/[id]` - View posts in a specific series
- **Content**:
  - All available series with descriptions
  - Series color-coding
  - Post count per series
  - Ordered post list within each series
  - Sequential navigation (previous/next post)
- **Features**:
  - Series overview cards
  - Numbered post progression
  - Series breadcrumbs
  - Navigation between series posts
- **Access**: Click "Series" in header

### 4. **Tags** (`/archive`)
- **Purpose**: Search, filter, and browse posts by tags and date
- **Content**:
  - All posts organized by year
  - Search functionality (real-time filtering)
  - Tag-based post grouping
  - Timeline view grouped by publication year
- **Features**:
  - Full-text search
  - Sticky year headers
  - Tag display for each post
  - Reading time indicators
  - Date sorting
- **Access**: Click "Tags" in header

### 5. **Search** (`/search`)
- **Purpose**: Global search across all post content
- **Content**:
  - Real-time search input
  - Searches through:
    - Post titles
    - Excerpts
    - Full content
    - Tags
    - Author names
- **Features**:
  - Auto-focus on page load
  - Clear button
  - Result counter
  - Instant filtering
  - No page reload needed
- **Access**: Click search icon in header

---

## Context-Aware Navigation

### When Viewing a Blog Post

When you open any blog post (`/blog/[slug]`), the navigation shows:
- **Series Navigation** (if the post is part of a series):
  - Shows series name and description
  - Displays current position: "Post 2 of 5"
  - Progress bar
  - Previous/Next buttons to navigate the series
  - Link to full series view
- **Header Navigation**: All five sections remain accessible for quick navigation away from the post

### Key Features

1. **Persistent Navigation**: Available on all pages
2. **Theme Toggle**: Sun/Moon icon in header for dark/light mode
3. **Logo Navigation**: Click logo anytime to return to main blog list (`/`)
4. **Breadcrumb Context**: Post titles show the navigation hierarchy
5. **Quick Access**: All major sections accessible from any page

---

## User Journey Examples

### Example 1: Discovering Content
1. Land on `/` (Blogs dashboard)
2. Browse all posts or filter by tags
3. Toggle between Grid and List view
4. Click a post to read
5. Use series navigation (if available) to explore related posts

### Example 2: Exploring a Series
1. Click "Series" in header
2. View all available series
3. Click a series to see its posts
4. Click a post to read
5. Use series navigation buttons to move through posts sequentially
6. Navigate back to series or all blogs

### Example 3: Searching for Content
1. Click search icon in header
2. Enter search query (title, tag, author, or content)
3. Instant results displayed
4. Click a result to read
5. Continue reading or return to search

### Example 4: Finding Posts by Date
1. Click "Tags" in header (Archive page)
2. Use search to filter or browse year-by-year
3. View posts grouped by publication year
4. Click to open a post
5. Use pagination/search to find more posts

---

## Header Components

### Logo
- **Icon**: Obsidian vault icon (purple)
- **Text**: "ObsidianBlog"
- **Action**: Clicking returns to all blogs dashboard (`/`)
- **Visual**: Glassmorphic container with hover effect

### Navigation Links
- **Home**: Featured posts and latest
- **Blogs**: All posts with filtering
- **Series**: Organized collections
- **Tags**: Search and archive
- **Search**: Quick global search

### Theme Toggle
- **Icon**: Sun (light mode) or Moon (dark mode)
- **Action**: Instantly switches theme
- **Position**: Far right of header
- **Visual**: Glassmorphic button with hover effect
- **Persistence**: Saved to browser localStorage

### Search Icon
- **Icon**: Magnifying glass
- **Action**: Opens dedicated search page
- **Quick Access**: No typing required in header

---

## Mobile Navigation

On mobile devices:
- Navigation links are condensed
- Icons are smaller (4x4 or 5x5)
- Logo text is hidden on small screens
- All functionality remains accessible
- Touch-friendly spacing maintained

---

## Accessibility Features

- Semantic HTML structure
- ARIA labels on all buttons
- Keyboard navigation support
- Proper focus states
- Color contrast compliance
- Screen reader compatible
- Skip links available
- Proper heading hierarchy

---

## Tips for Users

1. **Quick Navigation**: Use the search icon for rapid content discovery
2. **Series Exploration**: Click through series sequentially using navigation buttons
3. **Tag Filtering**: Use the archive page to find posts on specific topics
4. **Theme Switching**: Toggle dark/light mode instantly without losing your place
5. **Mobile**: All features available; scroll for full navigation
6. **Search**: Search across titles, content, tags, and authors simultaneously

---

## Current Routes Summary

```
/                    → All blogs dashboard
/home                → Featured posts feed
/blog/[slug]         → Individual blog post
/series              → Series listing
/series/[id]         → Series detail with posts
/archive             → Search and tag filtering
/search              → Global search page
```

All pages include the complete navigation header and theme toggle.

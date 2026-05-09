# ObsidianBlog - Design Documentation

A beautiful, minimalist blog website inspired by Obsidian with glassmorphism effects and seamless dark/light theme support.

## Design Philosophy

This blog design draws inspiration from Obsidian's clean, knowledge-focused interface while incorporating modern design trends like glassmorphism. Every element serves a purpose, and the visual hierarchy guides readers naturally through the content.

## Color System

### Light Theme
- **Background**: `#faf8f3` - Warm, off-white base
- **Foreground**: `#2d2d2d` - Deep charcoal for text
- **Accent**: `#7c3aed` - Purple for interactive elements
- **Border**: `#e0d5c7` - Soft tan for subtle divisions
- **Card**: `#fff` - Pure white for content containers

### Dark Theme
- **Background**: `#1e1e1e` - Deep charcoal base
- **Foreground**: `#e8e6e1` - Warm off-white for text
- **Accent**: `#a78bfa` - Light purple for interactive elements
- **Border**: `#3a3a3a` - Subtle dark borders
- **Card**: `#2d2d2d` - Slightly lighter than background

The color palette uses only **4-5 colors** for consistency and reduces visual noise.

## Typography

- **Font Stack**: Geist (sans-serif) for all text
- **Body Text Line Height**: 1.6 (leading-relaxed)
- **Heading Sizes**: 
  - H1: text-5xl/6xl (homepage hero)
  - H2: text-3xl/4xl (featured post)
  - H3: text-xl (blog card titles)

## Glassmorphism Implementation

The blog uses subtle glassmorphism effects exclusively on cards and interactive elements:

```css
.glass {
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.dark .glass {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Where Glass Effects Are Used
- Blog post cards (with hover state enhancement)
- Featured post container
- Pagination buttons
- Header navigation bar
- Footer social icons
- Theme toggle button

## Layout Structure

### Responsive Breakpoints
- **Mobile** (< 768px): Single column, full-width content
- **Tablet** (768px - 1024px): Grid layouts begin to activate
- **Desktop** (> 1024px): Two-column grids, optimal reading width (max-w-6xl)

### Key Sections
1. **Header**: Sticky, glassmorphic, with navigation and implicit theme toggle
2. **Hero**: Large, centered title and subtitle
3. **Featured Post**: Full-width glass card with image and metadata
4. **Blog Grid**: Responsive grid of blog post cards with glassmorphism
5. **Pagination**: Centered controls for post navigation
6. **Archive**: Full post list with search and year grouping
7. **Footer**: Multiple column layout with links and social

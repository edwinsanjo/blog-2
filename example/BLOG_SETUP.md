# ObsidianBlog - Complete Setup & Overview

Welcome to ObsidianBlog, a beautifully designed, minimalist blog inspired by Obsidian with full dark/light theme support and glassmorphism effects.

## Quick Start

1. **Install dependencies** (if not already done):
   ```bash
   pnpm install
   ```

2. **Run the development server**:
   ```bash
   pnpm dev
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

```
/vercel/share/v0-project/
├── app/
│   ├── layout.tsx              # Root layout with theme provider
│   ├── page.tsx                # Homepage with featured post & pagination
│   ├── globals.css             # Design tokens & glassmorphism styles
│   ├── blog/
│   │   └── [slug]/
│   │       └── page.tsx        # Individual blog post page
│   └── archive/
│       └── page.tsx            # Archive with search and year grouping
├── components/
│   ├── theme-provider.tsx      # Theme toggling with next-themes
│   ├── header.tsx              # Sticky navigation header
│   ├── blog-card.tsx           # Glassmorphic blog post card
│   ├── featured-post.tsx       # Featured post hero section
│   ├── pagination.tsx          # Page navigation controls
│   └── footer.tsx              # Footer with links and socials
├── lib/
│   ├── blog-data.ts            # Sample blog posts & utilities
│   └── utils.ts                # Formatting & utility functions
└── public/
    ├── featured-image.jpg      # Featured post image
    └── design-showcase.jpg     # Design preview
```

## Key Features

### 🎨 Design Highlights
- **Obsidian-Inspired**: Clean, minimal aesthetic matching the popular note-taking app
- **Glassmorphism**: Subtle frosted glass effects on cards and UI elements
- **Dark & Light Themes**: Seamless theme switching with persistent preference storage
- **Responsive Design**: Mobile-first approach that works on all screen sizes
- **Custom Color Palette**: Purple accent (#7c3aed) with warm light and cool dark variants

### 📝 Blog Features
- Featured post with large hero card and image
- Paginated blog post grid (6 posts per page)
- Individual post pages with metadata and related posts
- Archive page with full post list, search, and year grouping
- Post metadata: author, date, reading time, tags
- Static site generation for optimal performance

### 🎯 User Experience
- Theme toggle button (fixed position, bottom-right)
- Smooth hover animations and transitions
- Clear visual hierarchy and navigation
- Accessible semantic HTML
- Fast page loads with Next.js optimization

## Customization Guide

### Adding Blog Posts

Edit `/lib/blog-data.ts` to add new posts:

```typescript
{
  slug: 'unique-post-slug',
  title: 'Your Post Title',
  excerpt: 'Brief description...',
  author: 'Author Name',
  date: '2024-04-15',
  readingTime: 8,
  tags: ['Tag1', 'Tag2'],
  featured: false,
}
```

### Changing Colors

Update the CSS variables in `/app/globals.css`:

```css
:root {
  --primary: #your-color;
  --accent: #your-color;
  /* ... more colors ... */
}
```

### Modifying the Header

Edit `/components/header.tsx` to update navigation links, logo text, or styling.

### Styling Posts

Individual blog post styling is in `/app/blog/[slug]/page.tsx`. The prose typography can be customized with Tailwind classes.

## Theme System

The blog uses `next-themes` for theme management:

- **Storage**: Browser localStorage (persists across sessions)
- **Defaults**: System preference on first visit
- **Toggle**: Fixed button in bottom-right corner
- **Smooth Transitions**: CSS transitions for seamless theme switching

Theme toggle uses Lucide React icons:
- Light theme: Moon icon (🌙)
- Dark theme: Sun icon (☀️)

## Glassmorphism CSS

The glass effect is implemented with:

```css
.glass {
  backdrop-blur-md
  bg-white/40 (light) | bg-white/5 (dark)
  border border-white/60 (light) | border-white/10 (dark)
}

.glass-hover {
  hover:bg-white/50 (light) | hover:bg-white/10 (dark)
  hover:border-white/80 (light) | hover:border-white/20 (dark)
}
```

This creates a subtle frosted glass effect that adapts to both light and dark themes.

## Performance Notes

- **Static Generation**: Blog posts are pre-rendered at build time
- **Image Optimization**: Next.js automatically optimizes featured images
- **CSS Efficiency**: Tailwind purgeing removes unused styles
- **Fast Transitions**: Hardware-accelerated CSS transforms
- **Lightweight**: No heavy dependencies except next-themes and lucide-react

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile: iOS 14+, Android Chrome latest

Note: Glassmorphism effects require `backdrop-filter` support.

## Environment Variables

No additional environment variables are required for basic functionality. If you add external services, update `/app/layout.tsx` and `.env.local`:

```bash
# Example
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Deploy with one click
3. Theme preferences are stored client-side (no backend needed)

### Other Platforms

The blog is a static Next.js app that can be deployed anywhere:

```bash
pnpm build
# Deploy the .next folder and public assets
```

## Accessibility

- Semantic HTML elements throughout
- Alt text on all images
- ARIA labels on interactive elements
- Color contrast meets WCAG AA
- Keyboard navigation support
- Screen reader friendly

## Tips & Best Practices

1. **Content**: Keep excerpts concise (50-100 characters for preview)
2. **Tags**: Use consistent tag naming across posts
3. **Images**: Feature images should be 1200x800px (3:2 ratio)
4. **Reading Time**: Calculate as ~200 words per minute
5. **Dates**: Use ISO format (YYYY-MM-DD) for consistency

## Troubleshooting

**Theme toggle not appearing?**
- Clear browser cache and localStorage
- Check that `ThemeProvider` is in layout.tsx

**Images not loading?**
- Verify file paths in `/public` directory
- Check Next.js Image component alt text

**Styles not applying?**
- Ensure Tailwind CSS is properly configured
- Check that `globals.css` is imported in layout

**Posts not showing?**
- Verify post objects in `lib/blog-data.ts`
- Check that slug property is unique

## Further Customization

To extend this blog, consider adding:

- **Markdown Support**: Use `next-mdx-remote` for MDX content
- **Database**: Integrate Supabase or Prisma for dynamic content
- **Comments**: Add Disqus, Giscus, or custom comments
- **Analytics**: Integrate Vercel Analytics or Plausible
- **Email Signup**: Add newsletter integration
- **Social Sharing**: Add Open Graph and Twitter Card metadata

## Learn More

- [Next.js Documentation](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Lucide React Icons](https://lucide.dev)

---

**Built with ❤️ using Next.js 16, Tailwind CSS, and shadcn/ui**

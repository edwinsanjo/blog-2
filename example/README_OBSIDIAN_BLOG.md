# 🎨 ObsidianBlog - Modern Blog with Dark Theme & Series

A beautifully designed, production-ready blog platform inspired by Obsidian with Obsidian-dark-theme colors, glassmorphism effects, dark/light theme toggle, and comprehensive blog series management.

## 🌟 Features

### ✨ Dark/Light Theme Toggle
- **Instant switching** between light and dark modes
- **Obsidian-inspired colors** optimized for readability
- **Persistent storage** - Your preference is automatically saved
- **Smooth transitions** - CSS transitions on all elements
- **System detection** - Respects your OS dark mode preference
- **Accessible button** - Easy-to-find toggle in the header

**Light Mode Colors:**
- Background: `#faf8f3` (Warm off-white)
- Text: `#2d2d2d` (Deep charcoal)
- Accent: `#7c3aed` (Purple)

**Dark Mode Colors (Obsidian):**
- Background: `#1e1e1e` (Deep charcoal)
- Text: `#e8e6e1` (Warm off-white)
- Accent: `#a78bfa` (Light purple)

---

### 📚 Blog Series Feature
Organize related blog posts into sequential series with automatic navigation.

**What You Get:**
- 📖 Series listing page (`/series`)
- 🔗 Individual series detail pages
- 🧭 Previous/next navigation in posts
- 📊 Progress indicator showing position in series
- 🎨 Color-coded series badges
- 🔢 Numbered posts for easy tracking

**Example Series Included:**
1. **Obsidian Deep Dive** (3 posts)
2. **Next.js & Web Design** (2 posts)

---

### 🧊 Glassmorphism Design
Modern frosted glass effect on all interactive elements:
- Backdrop blur and transparency
- Subtle borders with hover effects
- Theme-aware styling
- Smooth transitions
- Performant CSS implementation

Applied to:
- Navigation header
- Blog cards
- Featured post section
- Series cards
- Series navigation
- Theme toggle button
- All buttons and interactive elements

---

### 📱 Fully Responsive
- Mobile-first design
- Perfect on phones, tablets, desktop
- Touch-friendly tap targets
- Optimized layouts for all screen sizes
- Smooth scrolling and interactions

---

### ♿ Accessibility
- WCAG compliant
- Proper heading hierarchy
- ARIA labels on all buttons
- Keyboard navigation throughout
- Semantic HTML structure
- High contrast in both themes

---

### ⚡ Performance
- **Static generation** - All pages pre-built
- **Zero client-side rendering** for critical content
- **Image optimization** - Next.js automatic
- **Fast load times** - No server needed
- **Optimized CSS** - Efficient glassmorphism
- **TypeScript** - Type-safe code

---

## 📂 Project Structure

```
obsidianblog/
├── app/
│   ├── layout.tsx                    # Root layout with theme provider
│   ├── page.tsx                      # Homepage
│   ├── archive/
│   │   └── page.tsx                  # All posts
│   ├── blog/
│   │   └── [slug]/
│   │       └── page.tsx              # Individual blog post
│   └── series/
│       ├── page.tsx                  # Series listing
│       └── [id]/
│           └── page.tsx              # Series detail
│
├── components/
│   ├── header.tsx                    # Navigation with theme toggle
│   ├── footer.tsx                    # Footer
│   ├── blog-card.tsx                 # Blog post card
│   ├── featured-post.tsx             # Featured post hero
│   ├── pagination.tsx                # Page navigation
│   ├── series-card.tsx               # Series card
│   ├── series-navigation.tsx         # In-post series nav
│   └── theme-provider.tsx            # Next-themes wrapper
│
├── lib/
│   ├── blog-data.ts                  # Blog posts & series data
│   └── utils.ts                      # Utilities
│
├── public/
│   ├── featured-image.jpg            # Featured post image
│   └── design-showcase.jpg           # Design preview
│
└── app/globals.css                   # Tailwind + custom styles
```

---

## 🚀 Getting Started

### Installation

1. **Clone or Download:**
   ```bash
   git clone <repo-url>
   cd obsidianblog
   ```

2. **Install Dependencies:**
   ```bash
   pnpm install
   # or: npm install
   # or: yarn install
   ```

3. **Run Development Server:**
   ```bash
   pnpm dev
   ```

4. **Open Browser:**
   Navigate to `http://localhost:3000`

### Production Build

```bash
pnpm build
pnpm start
```

---

## 🎯 Using the Features

### Theme Toggle

**Location:** Top-right corner of navigation header

- Click **moon icon** (🌙) to switch to dark mode
- Click **sun icon** (☀️) to switch to light mode
- Your preference is saved automatically
- Works perfectly on all devices

### Browsing Blog Series

1. Click **"Series"** in the header navigation
2. View all available series as cards
3. Click a series card to see posts
4. Click a post to read it

### Reading a Series

When viewing a post that's part of a series:

1. **Series Info** appears above the post
2. Shows your position: "Post 2 of 5"
3. Progress bar indicates how far through
4. Use **Previous/Next buttons** to navigate
5. Click to jump to adjacent posts

### Adding Blog Posts

Edit `lib/blog-data.ts`:

```typescript
{
  slug: 'my-first-post',
  title: 'My Amazing Post',
  excerpt: 'Short description...',
  author: 'Your Name',
  date: '2024-04-21',
  readingTime: 5,
  tags: ['javascript', 'react'],
  featured: false,
}
```

### Creating a Series

Edit `lib/blog-data.ts`:

```typescript
{
  id: 'my-series',
  name: 'My Learning Series',
  description: 'A guide to...',
  color: 'purple', // or 'blue', 'pink', 'green'
  posts: ['first-post', 'second-post', 'third-post'],
}
```

---

## 🎨 Customization

### Change Colors

Edit `app/globals.css`:

```css
:root {
  --background: #faf8f3;
  --foreground: #2d2d2d;
  --accent: #7c3aed;
  /* ... more colors */
}

.dark {
  --background: #1e1e1e;
  --foreground: #e8e6e1;
  --accent: #a78bfa;
  /* ... more colors */
}
```

### Modify Series Colors

In `components/series-card.tsx` and other series components:

```typescript
const colorMap: Record<string, { bg: string; text: string }> = {
  purple: { bg: 'bg-purple-50', text: 'text-purple-700' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-700' },
  // Add more colors...
}
```

### Update Site Metadata

Edit `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Your Blog Name',
  description: 'Your blog description',
}
```

---

## 📊 Technical Details

### Tech Stack
- **Next.js 16** - React framework
- **React 19** - UI library
- **Tailwind CSS v4** - Styling
- **TypeScript** - Type safety
- **Lucide Icons** - Icon library
- **next-themes** - Theme management
- **Shadcn/UI** - Component library

### Key Libraries

```json
{
  "next": "^16.0.0",
  "react": "^19.0.0",
  "tailwindcss": "^4.0.0",
  "next-themes": "^latest",
  "lucide-react": "^latest"
}
```

### Build Information

- **Static Generation:** All pages pre-built at deploy time
- **SSG with Dynamic Routes:** Series and posts use `generateStaticParams`
- **Image Optimization:** Next.js Image component
- **Zero Runtime Overhead:** Pure static HTML delivery

---

## 📈 Features Implemented

### ✅ Dark/Light Theme
- [x] Toggle button in header
- [x] Obsidian-inspired colors
- [x] Smooth CSS transitions
- [x] Persistent storage
- [x] System preference detection
- [x] Proper hydration handling
- [x] Mobile-friendly button

### ✅ Blog Series
- [x] Series data structure
- [x] Series listing page
- [x] Series detail pages
- [x] Series navigation in posts
- [x] Progress indicator
- [x] Previous/next links
- [x] Color-coded badges
- [x] Helper functions
- [x] Static generation
- [x] TypeScript types

### ✅ Glassmorphism
- [x] CSS blur effects
- [x] Transparent backgrounds
- [x] Border styling
- [x] Hover effects
- [x] Theme adaptation
- [x] Performance optimization

### ✅ Core Features
- [x] Responsive design
- [x] SEO optimization
- [x] Accessibility (WCAG)
- [x] Fast performance
- [x] Beautiful colors
- [x] Smooth animations
- [x] Mobile support

---

## 🔍 SEO & Metadata

Each page includes:
- Proper `<title>` and meta descriptions
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Structured data
- Sitemap generation

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Vercel auto-detects Next.js
4. Deploy with one click

### Deploy Anywhere

```bash
pnpm build
# Files in .next/ are ready to deploy
```

Works on:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js host
- Docker containers

---

## 📖 Documentation

Detailed guides included:

- **QUICK_START.md** - Getting started guide
- **FEATURES.md** - Feature documentation
- **IMPLEMENTATION_SUMMARY.md** - Technical details
- **COMPONENTS.md** - Component reference

---

## 🐛 Troubleshooting

**Theme not saving?**
- Check localStorage is enabled
- Hard refresh browser (Ctrl+Shift+R)

**Series navigation not showing?**
- Verify post slug is in series `posts` array
- Check spelling matches exactly

**Build failing?**
- Ensure Node.js 18+ installed
- Clear `.next` folder
- Reinstall dependencies

---

## 📝 License

MIT License - Feel free to use in your projects

---

## 🎉 What's Included

✅ 2 example blog series
✅ 10 sample blog posts
✅ Complete responsive design
✅ Dark/light theme setup
✅ Series navigation system
✅ Glassmorphism effects
✅ Full TypeScript support
✅ Mobile optimized
✅ SEO ready
✅ Accessible components
✅ Production-ready code
✅ Comprehensive documentation

---

## 🔮 Future Enhancements

- Markdown content parsing
- Comment system
- Related posts by tag
- Full-text search
- Analytics integration
- RSS feed
- Social sharing
- Newsletter signup

---

## 💬 Support

For detailed information, see:
- **QUICK_START.md** - How to use features
- **FEATURES.md** - Feature explanations
- **IMPLEMENTATION_SUMMARY.md** - Technical overview

---

## 🎨 Design Philosophy

Inspired by **Obsidian**, a beautiful note-taking app known for:
- Minimalist interface
- Dark theme focus
- Beautiful typography
- Thoughtful design
- Intuitive navigation

ObsidianBlog brings these principles to blogging with:
- Clean, uncluttered design
- Obsidian-native dark theme colors
- Excellent typography
- Glassmorphism effects
- Intuitive series navigation

---

**Built with ❤️ using Next.js, React, and Tailwind CSS**

Enjoy your beautiful, functional Obsidian-inspired blog! 🚀

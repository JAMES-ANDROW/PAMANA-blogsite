# Pamana: Through the Lens, Across Generations

A modern travel storytelling platform built with **Next.js App Router**, **React**, **Tailwind CSS**, and **TypeScript**, optimized for **Vercel** deployment.

## 🎯 Project Overview

Pamana is a digital heritage preservation platform that showcases cultural traditions, meaningful places, and generational stories through original photography and narrative writing. The website combines minimal, clean design with a heritage-inspired color palette to create an immersive storytelling experience.

## ✨ Features

- **Next.js 15 with App Router** - Modern React framework with file-based routing
- **Dynamic Blog Routes** - Auto-generated pages for each story with `[slug]` routing
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Heritage Color Palette** - Deep brown, beige, muted gold, and forest green
- **TypeScript Support** - Full type safety throughout the project
- **Vercel Optimized** - Ready for production deployment with zero-config
- **SEO Ready** - Metadata configuration and open graph tags
- **Performance First** - Optimized images and static generation

## 📁 Project Structure

```
pamana-blogsite/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with navbar & footer
│   │   ├── page.tsx            # Home page with featured stories
│   │   ├── globals.css         # Global styles
│   │   ├── blog/
│   │   │   ├── page.tsx        # Blog listing page
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Dynamic blog post page
│   │   └── about/
│   │       └── page.tsx        # About page
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky navigation bar
│   │   ├── Footer.tsx          # Footer with links
│   │   ├── BlogCard.tsx        # Blog post card component
│   │   └── HeroSection.tsx     # Reusable hero section
│   ├── data/
│   │   └── posts.ts            # Blog post data & utilities
│   └── types/
│       └── index.ts            # TypeScript types
├── public/
│   └── images/                 # Local blog images (add your images here)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. **Clone or navigate to the project:**

```bash
cd c:\Users\James\Documents\GitHub\PAMANA-blogsite
```

2. **Install dependencies:**

```bash
npm install
```

3. **Run development server:**

```bash
npm run dev
```

4. **Open in browser:**

Navigate to `http://localhost:3000`

## 🎨 Design System

### Color Palette (Heritage-Inspired)

- **Dark Brown** #3d2817 - Primary text, headings
- **Brown** #6b4423 - Secondary text
- **Beige** #e8dcc8 - Accents
- **Gold** #c9a961 - Links, highlights
- **Forest Green** #2d5016 - Optional accent
- **Light Beige** #f5f1e8 - Backgrounds

### Typography

- **Headings:** Georgia, Garamond, serif (serif fonts)
- **Body:** Inter, system-ui sans-serif (clean, readable)
- **Responsive scales** with clamp() for fluid typography

## 📝 Adding Your Own Content

### Step 1: Add Images

Place your original images in `/public/images/`:

```
public/images/
├── your-story-1.jpg
├── your-story-2.jpg
└── your-story-3.jpg
```

### Step 2: Create Blog Posts

Edit `src/data/posts.ts` and add your stories:

```typescript
{
  id: '4',
  slug: 'your-story-slug',
  title: 'Your Story Title',
  excerpt: 'Short excerpt for blog cards...',
  date: '2024-04-15',
  featured_image: '/images/your-image.jpg',
  images: [
    {
      src: '/images/your-image-1.jpg',
      alt: 'Description',
      caption: 'Image caption with cultural context'
    }
  ],
  story: 'Your full narrative story goes here. Can contain multiple paragraphs separated by blank lines.',
  tags: ['tag1', 'tag2', 'tag3']
}
```

## 🔧 Customization

### Change Site Title

Edit `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Your Site Title',
  // ... other metadata
}
```

### Modify Color Palette

Edit `tailwind.config.ts`:

```typescript
colors: {
  heritage: {
    'dark-brown': '#yourhex',
    // ... other colors
  }
}
```

### Update Headlines

Edit component files:
- Home hero: `src/app/page.tsx`
- Blog intro: `src/app/blog/page.tsx`
- About page: `src/app/about/page.tsx`

## 📦 Build & Deploy

### Local Build

```bash
npm run build
npm start
```

### Deploy to Vercel

1. **Push to GitHub** (required for Vercel integration)

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js and applies optimal settings
   - Click "Deploy"

3. **Site goes live** at your assigned Vercel domain

#### Vercel Benefits

- ✅ Automatic deployments on every push
- ✅ Built-in CI/CD pipeline
- ✅ Edge caching for optimal performance
- ✅ Preview deployments for PRs
- ✅ Analytics dashboard
- ✅ **Free tier available**

## 📱 Responsive Design

The site is **mobile-first** and fully responsive:

- **Mobile** (< 640px) - Single column, stacked navigation
- **Tablet** (640px - 1024px) - 2-column layouts
- **Desktop** (> 1024px) - 3-column grid with enhanced spacing

## 🔍 SEO Features

- Dynamic metadata for each page
- Open Graph tags for social sharing
- Sitemap ready (auto-generated by Vercel)
- Meta descriptions for all pages
- Keywords and robots directives

## 💨 Performance

- **Static Generation:** All blog posts pre-rendered at build time
- **Image Optimization:** Handled by Next.js Image component
- **Code Splitting:** Automatic with App Router
- **Zero JIT CSS:** Tailwind processes at build time
- **Minimal Bundle:** ~60KB JS (gzipped)

## 🛠 Development Tools

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📚 Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 15.x | React framework with App Router |
| React | 18.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Utility-first styling |
| Node.js | 18+ | Runtime |

## 🚨 Troubleshooting

### Port 3000 already in use

```bash
npx kill-port 3000
npm run dev
```

### Build fails with module errors

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Images not loading

- Check file path in `src/data/posts.ts`
- Images must be in `/public/images/`
- Use relative paths: `/images/filename.jpg`

## 📋 Checklist for Launch

- [ ] Replace `/public/images/placeholder-*.jpg` with real images
- [ ] Update all blog post content in `src/data/posts.ts`
- [ ] Customize metadata in `src/app/layout.tsx`
- [ ] Update social media links in Footer (if applicable)
- [ ] Test all routes locally: `/`, `/blog`, `/blog/[slug]`, `/about`
- [ ] Run `npm run build` to verify production build
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Test live deployment
- [ ] Set up custom domain (optional)

## 📄 Content Guidelines

For best results when adding stories:

1. **Use high-quality, original images** - No stock photos
2. **Write reflective narratives** - Focus on cultural heritage and lived experience
3. **Include captions** - Add context to each image
4. **Use consistent dating** - Format: YYYY-MM-DD
5. **Tag appropriately** - 3-5 tags per story for categorization
6. **Embrace specificity** - Particular stories that feel universal

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Vercel Deployment](https://vercel.com/docs)

## 📄 License

This project is open-source. Feel free to use it for your storytelling platform.

## ✉️ Support

For issues, questions, or improvements:

1. Check the troubleshooting section above
2. Review Next.js and Tailwind CSS documentation
3. Test locally with `npm run dev`

---

**Made with care.** Preserving heritage, one story at a time.

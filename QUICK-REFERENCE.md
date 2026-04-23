# Pamana Quick Reference

**Fast lookup for common tasks**

## 🚀 Essential Commands

```bash
# Start development server (auto-reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Install dependencies
npm install
```

## 📍 File Locations

| Task | File |
|------|------|
| Edit blog posts | `src/data/posts.ts` |
| Add images | `public/images/` |
| Change colors | `tailwind.config.ts` |
| Update site title | `src/app/layout.tsx` |
| Edit home page | `src/app/page.tsx` |
| Edit about page | `src/app/about/page.tsx` |
| Global styles | `src/app/globals.css` |
| Navbar | `src/components/Navbar.tsx` |
| Footer | `src/components/Footer.tsx` |

## 🎨 Color Codes

```
Dark Brown:    #3d2817 (text, headings)
Brown:         #6b4423 (secondary text)
Beige:         #e8dcc8 (accents)
Gold:          #c9a961 (highlights, links)
Forest:        #2d5016 (optional)
Light Beige:   #f5f1e8 (backgrounds)
```

## 📝 Blog Post Template

Copy this to `src/data/posts.ts`:

```typescript
{
  id: '4',
  slug: 'story-url-slug',
  title: 'Your Story Title',
  excerpt: 'Short excerpt for blog grid',
  date: '2024-04-15',
  featured_image: '/images/photo.jpg',
  images: [
    {
      src: '/images/photo1.jpg',
      alt: 'Image description',
      caption: 'Photo caption'
    }
  ],
  story: `Full story text here.
  
Multiple paragraphs separated by blank lines.`,
  tags: ['tag1', 'tag2']
}
```

## 🔗 Key URLs

| Page | URL |
|------|-----|
| Home | `/` |
| Blog listing | `/blog` |
| Single post | `/blog/[slug]` |
| About | `/about` |
| Dev server | `localhost:3000` |

## 🐛 Common Issues

| Problem | Solution |
|---------|----------|
| Port 3000 in use | `npx kill-port 3000` |
| Images not showing | Check path: `/images/filename.jpg` |
| Styles not updating | Restart: `npm run dev` |
| Build fails | Delete: `rm -r node_modules` then `npm install` |
| Changes not live | `git push origin main` (then wait 2 min) |

## 📦 Deploy to Vercel

```bash
# 1. Initialize git
git init
git add .
git commit -m "Initial"

# 2. Push to GitHub
git push origin main

# 3. Go to vercel.com and connect repository
# 4. Click Deploy
```

## 🎯 First-Time Setup

1. `npm install` (wait 2-3 min)
2. `npm run dev`
3. Open `http://localhost:3000`
4. Edit `src/data/posts.ts`
5. Add images to `public/images/`
6. Reload browser (auto-refreshes)

## 💾 Git Workflow

```bash
# Save changes locally
git add .
git commit -m "Description of changes"

# Push to GitHub (triggers Vercel deploy)
git push origin main

# View history
git log

# Undo last commit
git revert HEAD
```

## 🎨 Tailwind Classes Cheatsheet

```html
<!-- Text Colors -->
<p class="text-heritage-dark-brown">Dark text</p>
<p class="text-heritage-gold">Gold highlight</p>

<!-- Backgrounds -->
<div class="bg-heritage-light-beige">Beige background</div>
<div class="bg-heritage-dark-brown">Dark background</div>

<!-- Typography -->
<h1 class="font-serif text-4xl font-bold">Serif heading</h1>
<p class="font-sans text-lg font-light">Light body text</p>

<!-- Spacing -->
<div class="p-6">Padding</div>
<div class="m-4">Margin</div>
<div class="mb-8">Margin bottom</div>

<!-- Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <!-- Items -->
</div>

<!-- Hover Effects -->
<a class="hover:text-heritage-gold transition-colors">Link</a>
```

## 📱 Responsive Breakpoints

```
Mobile:   < 640px  (sm:)
Tablet:   640-1024px (md:)
Desktop:  > 1024px (lg:)
```

Example: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

## 🔐 Environment Setup

```bash
# Create .env.local for sensitive data
# (This file is auto-ignored by git)

# Example:
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Access in code:
```typescript
const url = process.env.NEXT_PUBLIC_SITE_URL
```

## 📊 Deployment Status

Check live site at:
- **Vercel URL:** `https://pamana-blogsite.vercel.app`
- **Custom Domain:** Soon!

## 🆘 Support Files

- [README.md](README.md) - Full documentation
- [GETTING-STARTED.md](GETTING-STARTED.md) - Setup walkthrough
- [DEPLOYMENT.md](DEPLOYMENT.md) - Detailed deployment guide

---

**Print this page or bookmark for quick reference!** 🔖

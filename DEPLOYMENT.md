# Pamana Deployment & Setup Guide

Complete guide for setting up, developing, and deploying your Pamana travel blog website.

## 📋 Table of Contents

1. [Initial Setup](#initial-setup)
2. [Local Development](#local-development)
3. [Adding Content](#adding-content)
4. [Building for Production](#building-for-production)
5. [Vercel Deployment](#vercel-deployment)
6. [Custom Domain Setup](#custom-domain-setup)
7. [Troubleshooting](#troubleshooting)

---

## Initial Setup

### Prerequisites

You need:
- **Node.js** (18.0 or newer) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (for version control) - [Download](https://git-scm.com/)
- **GitHub account** (for Vercel deployment)
- **Code editor** - [VS Code](https://code.visualstudio.com/) recommended

### Verify Installation

Open PowerShell/Terminal and check:

```powershell
node --version    # Should show v18.0 or higher
npm --version     # Should show 8.0 or higher
git --version     # Should show 2.0 or higher
```

### Install Dependencies

Navigate to your project folder:

```powershell
cd c:\Users\James\Documents\GitHub\PAMANA-blogsite
npm install
```

This downloads ~400 MB of dependencies. **First run takes 2-3 minutes.**

Expected output:
```
added XXX packages, and audited XXX packages in XXm
```

---

## Local Development

### Start Development Server

```powershell
npm run dev
```

Expected output:
```
> next dev

  ▲ Next.js 15.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local
```

### Open in Browser

Visit: **http://localhost:3000**

You should see:
- ✅ Navigation bar with logo
- ✅ Hero section with tagline
- ✅ Grid of 3 featured stories
- ✅ "About" section preview
- ✅ Footer with links

### Test All Routes

| Route | Expected Content |
|-------|-----------------|
| `/` | Home page with featured stories |
| `/blog` | All blog posts grid |
| `/blog/mountain-village-memories` | First story with full content |
| `/blog/coastal-traditions` | Second story |
| `/blog/market-rhythms` | Third story |
| `/about` | About page with mission statement |

### Hot Reload

Edit any file and browser updates **automatically**. No manual refresh needed.

---

## Adding Content

### 1. Prepare Your Images

Requirements:
- **Format:** JPG, PNG, or WebP
- **Size:** Minimum 1200px wide (recommend 1200x800px)
- **Quality:** High resolution, no compression artifacts
- **Type:** Original photos only (no stock images)

### 2. Add Images to Project

Copy images to: `public/images/`

Example structure:
```
public/images/
├── my-first-story-1.jpg
├── my-first-story-2.jpg
├── my-second-story-1.jpg
└── my-second-story-2.jpg
```

### 3. Create Blog Post Data

Edit: `src/data/posts.ts`

**Find the array** that looks like:
```typescript
export const blogPosts: BlogPost[] = [
  // Existing posts here...
]
```

**Add a new post** before the closing bracket:

```typescript
{
  id: '4',
  slug: 'my-first-story',
  title: 'My First Story',
  excerpt: 'A short description that will appear on the blog grid and in search results.',
  date: '2024-04-10',
  featured_image: '/images/my-first-story-1.jpg',
  images: [
    {
      src: '/images/my-first-story-1.jpg',
      alt: 'Description for accessibility',
      caption: 'A meaningful caption that provides context'
    },
    {
      src: '/images/my-first-story-2.jpg',
      alt: 'Another description',
      caption: 'Another caption for the second image'
    }
  ],
  story: `Write your full narrative here.

You can have multiple paragraphs. Just hit Enter twice to create a paragraph break.

Your story should be reflective and tell the cultural significance of what you're documenting. Connect it to heritage, tradition, and generational memory.`,
  tags: ['tag1', 'tag2', 'tag3', 'tag4']
}
```

### 4. Save and Reload

1. Save the file (Ctrl+S)
2. Browser auto-reloads
3. New post appears on `/blog` and is clickable

---

## Building for Production

### Test Production Build Locally

```powershell
npm run build
npm start
```

This:
1. Compiles TypeScript
2. Processes Tailwind CSS
3. Optimizes images
4. Generates static pages

Visit: **http://localhost:3000**

Should work identically to dev mode, but faster.

**Stop the server:** Press `Ctrl+C`

### Build Output

Expected `.next/` folder structure:
```
.next/
├── static/          (JavaScript bundles)
├── server/          (Server-side code)
└── public/          (Static assets)
```

---

## Vercel Deployment

### Step 1: Initialize Git Repository

```powershell
git init
git add .
git commit -m "Initial Pamana blog site"
```

### Step 2: Create GitHub Repository

1. Visit [github.com/new](https://github.com/new)
2. Name: `PAMANA-blogsite`
3. Click "Create repository"
4. **Copy the commands** for "push an existing repository"

### Step 3: Push to GitHub

```powershell
git remote add origin https://github.com/YOUR-USERNAME/PAMANA-blogsite.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### Step 4: Deploy to Vercel

1. Visit [vercel.com](https://vercel.com)
2. Sign up (or log in with GitHub - recommended)
3. Click "New Project"
4. Click "Import Git Repository"
5. **Select your** `PAMANA-blogsite` repository
6. Click "Import"
7. **Settings should auto-fill** - no changes needed
8. Click **"Deploy"**

### That's It! 🚀

Vercel builds and deploys automatically. You'll get:
- Unique URL (like `pamana-blogsite.vercel.app`)
- Live deployment in ~3 minutes
- Auto-redeploy on every GitHub push

### Automatic Future Deployments

Every time you:
```powershell
git add .
git commit -m "Update blog content"
git push origin main
```

**Your site updates automatically** on Vercel! No manual deployment needed.

---

## Custom Domain Setup

### Using Your Own Domain

If you own a domain (like `pamana-stories.com`):

1. **In Vercel:**
   - Project Settings → Domains
   - Add Custom Domain
   - Enter your domain name

2. **Update DNS Records** (in your domain registrar):
   - Add a CNAME record pointing to: `cname.vercel.app`
   - TTL: 3600 (or default)

3. **Wait 24-48 hours** for DNS propagation

4. **Verify:** Visit your domain - should show your site

For detailed domain setup, see Vercel docs: [vercel.com/domains](https://vercel.com/docs/concepts/projects/domains)

---

## Customization Guide

### Change Site Title

Edit: `src/app/layout.tsx`

Find:
```typescript
export const metadata: Metadata = {
  title: 'Pamana | Stories Through the Lens, Across Generations',
  description: '...',
```

Change the title and description.

### Change Colors

Edit: `tailwind.config.ts`

```typescript
colors: {
  heritage: {
    'dark-brown': '#3d2817',     // Change colors here
    'brown': '#6b4423',
    'beige': '#e8dcc8',
    'gold': '#c9a961',
    'forest': '#2d5016',
    'light-beige': '#f5f1e8',
  }
}
```

Then restart dev server: `npm run dev`

### Change Hero Message

Edit: `src/app/page.tsx`

Find the HeroSection component and change:
```typescript
<HeroSection
  subtitle="Your subtitle"
  title="Your main title"
  description="Your description"
/>
```

### Update Footer Text

Edit: `src/components/Footer.tsx`

Find the text sections and update them.

---

## Troubleshooting

### Problem: "npm: command not found"

**Solution:** Install Node.js from [nodejs.org](https://nodejs.org/)

### Problem: Port 3000 already in use

**Solution:**
```powershell
npx kill-port 3000
npm run dev
```

### Problem: Images not showing

**Check:**
1. Image file in `/public/images/` folder
2. Filename matches exactly in `posts.ts`
3. Path starts with `/images/`

Example: `/images/my-photo.jpg` ✅ (not `public/images/my-photo.jpg`)

### Problem: Build fails with "Module not found"

**Solution:**
```powershell
rm -r node_modules package-lock.json
npm install
```

### Problem: Vercel deployment fails

**Check:**
1. All code pushed to GitHub
2. No syntax errors in TypeScript
3. Repository is public (for free Vercel tier)

View Vercel logs: Click project → "View Function Logs"

### Problem: Changes don't appear after push

1. Wait 1-2 minutes for build
2. Check Vercel deployment status
3. Hard refresh browser: `Ctrl+Shift+R`

---

## Performance Tips

### Optimize Images

Images are the largest assets:

```bash
# Reduce size while maintaining quality
# Using ImageMagick or similar
convert input.jpg -quality 80 -resize 1200x output.jpg
```

### Monitor Build Time

Vercel dashboard shows build times. Aim for < 60 seconds.

### Check Core Web Vitals

Vercel provides Analytics dashboard:
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)

---

## Backup & Version Control

### Backup Workflow

```powershell
# Daily commits
git add .
git commit -m "Update: Added new story about [place]"
git push origin main

# Create releases for milestones
git tag -a v1.1 -m "Added 10 stories"
git push origin v1.1
```

### Restore Previous Version

```powershell
git log                    # See all commits
git revert [commit-hash]   # Undo specific commit
git push origin main       # Deploy
```

---

## Advanced: Environment Variables

For future features (newsletters, comments, etc.):

1. Create `.env.local` (not `.env.example`)
2. Add variables:
   ```
   NEXT_PUBLIC_API_URL=https://api.example.com
   SECRET_KEY=your-secret-key
   ```
3. Access in code:
   ```typescript
   const apiUrl = process.env.NEXT_PUBLIC_API_URL
   ```
4. Push only `.gitignore` ignores `.env.local`

---

## Next Steps

✅ **Setup Complete!** Here's what to do next:

1. **Personalize the site:**
   - [ ] Change colors in `tailwind.config.ts`
   - [ ] Update titles in `src/app/layout.tsx`
   - [ ] Edit the About page: `src/app/about/page.tsx`

2. **Add your content:**
   - [ ] Create folders for your images
   - [ ] Edit `src/data/posts.ts` with your stories
   - [ ] Test locally: `npm run dev`

3. **Deploy:**
   - [ ] Push to GitHub
   - [ ] Connect Vercel
   - [ ] Get your live URL

4. **Share:**
   - [ ] Share link with friends/family
   - [ ] Set up custom domain
   - [ ] Add to social media bio

---

## Support & Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs) - Framework
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling
- [React Docs](https://react.dev) - UI Library
- [TypeScript](https://www.typescriptlang.org/docs) - Type safety
- [Vercel Docs](https://vercel.com/docs) - Deployment

### Need Help?

1. Check the troubleshooting section above
2. Review file comments in the code
3. Read the main [README.md](README.md)
4. Consult documentation links above

---

## Deployment Checklist

Before going live:

- [ ] All text proofread and finalized
- [ ] All images in place and high quality
- [ ] No placeholder text remaining
- [ ] Local build runs: `npm run build`
- [ ] All routes tested locally
- [ ] Git committed and pushed
- [ ] Vercel deployment successful
- [ ] Live URL tested in browser
- [ ] Social media links updated (if applicable)
- [ ] Custom domain configured (optional)

**You're ready to share your stories with the world!** 🌍📖

---

*Made with care. Preserving heritage, one story at a time.*

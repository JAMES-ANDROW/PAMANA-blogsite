# 🌍 Welcome to Pamana

**Pamana: Through the Lens, Across Generations**

A modern, production-ready Next.js travel storytelling platform.

---

## ⚡ Quick Start (30 seconds)

**In PowerShell/Terminal:**

```bash
npm install
npm run dev
```

**Then visit:** http://localhost:3000

---

## 📚 Documentation (Pick Your Path)

### 🏃 I want to get started NOW
👉 Read: **[GETTING-STARTED.md](GETTING-STARTED.md)** (5 min read)
- Installation
- Running locally  
- Adding your first story
- Testing

### 🚀 I'm ready to deploy
👉 Read: **[DEPLOYMENT.md](DEPLOYMENT.md)** (10 min read)
- Detailed setup
- Building for production
- Vercel deployment (1-click!)
- Custom domain setup
- Troubleshooting

### ⚡ I just need commands
👉 Bookmark: **[QUICK-REFERENCE.md](QUICK-REFERENCE.md)**
- Command cheatsheet
- File locations
- Color codes
- Common fixes

### 📖 I want full details
👉 Read: **[README.md](README.md)** (15 min read)
- Complete documentation
- Tech stack explanation
- Design system
- Content guidelines
- Advanced configuration

### 🎯 I want an overview
👉 Read: **[PROJECT-SUMMARY.md](PROJECT-SUMMARY.md)** (10 min read)
- What you have
- How it's structured
- Key features
- What to customize

---

## 🎯 What You Have

✅ **Complete Next.js website** with:
- Home, Blog, Blog Post, and About pages
- Beautiful hero section
- Responsive grid layout for stories
- Heritage color palette (brown, beige, gold)
- 3 sample blog posts
- Mobile-friendly design
- SEO optimization
- Ready for Vercel deployment

✅ **Reusable Components:**
- Sticky navbar with mobile menu
- Newsletter-ready footer
- Blog card component
- Hero section

✅ **Content Ready:**
- 6 placeholder images (replace with yours)
- 3 complete sample stories
- Metadata optimized for SEO
- Social sharing ready

✅ **Production Ready:**
- Next.js 15 (Latest)
- TypeScript for safety
- Tailwind CSS for styling
- Zero-config Vercel deployment

---

## 📁 File Structure at a Glance

```
📂 src/
   📂 app/
      📄 layout.tsx         (← Update site title here)
      📄 page.tsx           (← Home page)
      📄 globals.css        (← Global styles)
      📂 blog/
         📄 page.tsx        (← Blog listing)
         📂 [slug] (← Individual blog posts)
      📂 about/ (← About page)
   📂 components/
      📄 Navbar.tsx
      📄 Footer.tsx
      📄 BlogCard.tsx
      📄 HeroSection.tsx
   📂 data/
      📄 posts.ts           (← ⚠️ EDIT THIS to add your stories)
   📂 types/
      📄 index.ts
📂 public/
   📂 images/               (← Put your photos here)
      📄 placeholder-*.jpg  (← 6 placeholders to replace)
```

---

## 🎨 Key Customization Points

| Task | File | Easy? |
|------|------|-------|
| Change site title | `src/app/layout.tsx` | ✅ Very |
| Add blog posts | `src/data/posts.ts` | ✅ Very |
| Change colors | `tailwind.config.ts` | ✅ Very |
| Update hero text | `src/app/page.tsx` | ✅ Easy |
| Modify footer | `src/components/Footer.tsx` | ✅ Easy |
| Edit about page | `src/app/about/page.tsx` | 🟡 Medium |
| Advanced styling | `src/app/globals.css` | 🟡 Medium |

---

## 🚀 Typical Workflow

### Day 1: Setup
```bash
npm install          # Get dependencies (2-3 min)
npm run dev          # Start dev server
# Test locally at http://localhost:3000
```

### Day 2-3: Personalize
```bash
# 1. Replace images (6 files in public/images/)
# 2. Edit stories in src/data/posts.ts  
# 3. Update title in src/app/layout.tsx
# 4. Test: npm run dev
```

### Day 4: Deploy
```bash
git add .            # Stage changes
git commit -m "msg"  # Commit
git push origin main # Push to GitHub

# Go to vercel.com → Deploy (auto-builds!)
```

### Day 5+: Update Anytime
```bash
# Add new story
# Update src/data/posts.ts
# git add . && git commit -m "msg" && git push
# Done! Vercel auto-deploys
```

---

## 🎨 Design System at a Glance

### Colors (Heritage-Inspired)
```css
Dark Brown:    #3d2817 (main text)
Medium Brown:  #6b4423 (secondary text)
Muted Gold:    #c9a961 (highlights)
Warm Beige:    #e8dcc8 (accents)
Light Beige:   #f5f1e8 (backgrounds)
Forest Green:  #2d5016 (optional)
```

### Fonts
- **Headings:** Georgia, Garamond (elegant serif)
- **Body:** Inter (clean sans-serif)

### Responsive
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

---

## ✨ Features

### Pages Included
- **Home** - Hero + featured stories + about preview
- **Blog** - Grid of all stories
- **Blog Post** - Full story with images, captions, narrative
- **About** - Your mission statement and philosophy

### Built-In
- Sticky navbar with mobile menu
- Responsive footer
- Dynamic routing
- SEO metadata
- Social sharing tags
- Light/dark text contrast (WCAG AA)

### Deployable
- Zero-config Vercel deployment
- Auto-rebuilds on git push
- Global CDN
- Automatic SSL/HTTPS
- Free hosting tier

---

## 💡 Quick Tips

1. **Images:** Place in `/public/images/` - these are your originals, no external URLs
2. **Stories:** Edit `/src/data/posts.ts` - change title, excerpt, add images, write narrative
3. **Colors:** Edit `tailwind.config.ts` heritage colors for branding
4. **Deploy:** Just `git push` to GitHub - Vercel auto-deploys!
5. **Test:** Always run `npm run dev` locally before pushing

---

## 🆘 Troubleshooting

**Errors? Check [DEPLOYMENT.md](DEPLOYMENT.md#troubleshooting) for solutions**

Common issues:
- Port 3000 in use? → `npx kill-port 3000`
- Images not showing? → Check path in `posts.ts`
- Build failing? → `npm install` again
- Changes not live? → Wait 2 min for Vercel build

---

## 📞 Documentation Links

- **[README.md](README.md)** - Complete documentation
- **[GETTING-STARTED.md](GETTING-STARTED.md)** - Setup guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy to Vercel
- **[PROJECT-SUMMARY.md](PROJECT-SUMMARY.md)** - Overview
- **[QUICK-REFERENCE.md](QUICK-REFERENCE.md)** - Cheatsheet

---

## 🎓 Tech Stack

| What | Which | Why |
|------|-------|-----|
| Framework | Next.js 15 | Modern, optimized |
| UI | React 18 | Component-based |
| Styling | Tailwind CSS | Fast, consistent |
| Types | TypeScript | Safer code |
| Deploy | Vercel | One-click, fast |

---

## ✅ Pre-Launch Checklist

Before going live:

```
- [ ] npm install (first time only)
- [ ] npm run dev (local testing)
- [ ] Replace 6 placeholder images
- [ ] Update 3 blog posts in src/data/posts.ts
- [ ] Change site title in src/app/layout.tsx
- [ ] npm run build (verify production build)
- [ ] git push origin main (to GitHub)
- [ ] Deploy on vercel.com
- [ ] Test live site
- [ ] Celebrate! 🎉
```

---

## 🎯 The Path Forward

```
START HERE
    ↓
[GETTING-STARTED.md] (5 min)
    ↓
[Local Dev + Customization] (1-2 days)
    ↓
[DEPLOYMENT.md] (30 min)
    ↓
[Vercel Deploy] (5 min)
    ↓
LIVE ON THE WEB! 🌍
```

---

## 🚀 Next Step

**Now:**
```bash
npm install
npm run dev
```

**Then:**
Open [GETTING-STARTED.md](GETTING-STARTED.md)

---

**Made with care for heritage preservation. Your stories matter.** 📖✨

*Pamana: Through the Lens, Across Generations*

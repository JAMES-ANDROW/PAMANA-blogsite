# Getting Started with Pamana

## 🎯 Quick Setup (5 minutes)

### 1. Install Dependencies

```bash
npm install
```

This downloads all required packages (Next.js, React, Tailwind CSS, TypeScript).

### 2. Start Development Server

```bash
npm run dev
```

This starts the local development server.

### 3. Open in Browsercd c:\Users\James\Documents\GitHub\PAMANA-blogsite
npm install
npm run dev

Navigate to: **http://localhost:3000**

You should see the homepage with 3 featured stories.

---

## 🔗 Navigation

Once running locally:

- **Home** — `http://localhost:3000/`
- **Stories (Blog)** — `http://localhost:3000/blog`
- **Mountain Village Memories** — `http://localhost:3000/blog/mountain-village-memories`
- **Coastal Traditions** — `http://localhost:3000/blog/coastal-traditions`
- **Market Rhythms** — `http://localhost:3000/blog/market-rhythms`
- **About** — `http://localhost:3000/about`

---

## 📸 Adding Your Stories

### Step 1: Add Images

1. Create your images in high quality (recommend 1200x800px minimum)
2. Save them in: `public/images/`
3. Supported formats: `.jpg`, `.png`, `.webp`

Example:
```
public/images/
├── my-village.jpg
├── my-tradition.jpg
└── my-market.jpg
```

### Step 2: Edit Blog Data

Open: `src/data/posts.ts`

Replace or add posts in this format:

```typescript
{
  id: '4',
  slug: 'my-story-slug',
  title: 'My Story Title',
  excerpt: 'A short excerpt that appears on the blog grid...',
  date: '2024-04-01',
  featured_image: '/images/my-village.jpg',
  images: [
    {
      src: '/images/my-tradition.jpg',
      alt: 'A description of the image',
      caption: 'A meaningful caption for this photo'
    },
    {
      src: '/images/my-market.jpg',
      alt: 'Another description',
      caption: 'Another caption'
    }
  ],
  story: `Your full narrative story goes here.
  
You can write multiple paragraphs. Just separate them with blank lines.

This is where you share the cultural context, the generational significance, and the lived experience behind the images and place.`,
  tags: ['heritage', 'tradition', 'culture']
}
```

### Step 3: Save and Reload

The browser automatically reloads. Your new story appears!

---

## 🎨 Customizing Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  heritage: {
    'dark-brown': '#3d2817',    // Primary text
    'brown': '#6b4423',         // Secondary text
    'beige': '#e8dcc8',         // Light accents
    'gold': '#c9a961',          // Highlights
    'forest': '#2d5016',        // Optional
    'light-beige': '#f5f1e8',   // Backgrounds
  }
}
```

Then restart the dev server to see changes.

---

## 🚀 Ready to Deploy?

### Option A: Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial Pamana blog"
   git push origin main
   ```

2. **Visit vercel.com:**
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy" (no config needed!)

3. **Site goes live** with automatic deployments on every push.

### Option B: Build Locally First

```bash
npm run build
npm start
```

This compiles the site for production and starts it locally.

---

## 📋 Content Tips

### Writing Great Stories

1. **Lead with the image** — Describe what viewers see
2. **Provide context** — Why does this place/tradition matter?
3. **Connect generations** — How does this preserve cultural memory?
4. **Be specific** — Names, dates, practices matter
5. **Use reflective tone** — Avoid commercial language

### Image Best Practices

- **Original photos only** — No stock images
- **High quality** — At least 1200px wide
- **Meaningful subjects** — Cultural, historical, or personal significance
- **Good composition** — People, places, details that tell the story
- **Consistent style** — Develops visual cohesion

---

## 🔧 Troubleshooting

### Dev server won't start?

```bash
# Kill process on port 3000
npx kill-port 3000
# Try again
npm run dev
```

### Images not showing?

- Check file is in `/public/images/`
- Check filename spelling in `posts.ts`
- Use format: `/images/filename.jpg`

### Styles look wrong?

```bash
# Restart server to rebuild Tailwind
npm run dev
```

### Want to change site title/description?

Edit `src/app/layout.tsx` and update the `metadata` object.

---

## 📚 File You'll Edit Most

**`src/data/posts.ts`** — This is where your stories live. Add, edit, or remove posts here.

---

## 🎓 Next Steps

- [ ] Replace placeholder images with your photos
- [ ] Add your first story in `src/data/posts.ts`
- [ ] Customize colors in `tailwind.config.ts`
- [ ] Update site title in `src/app/layout.tsx`
- [ ] Test: `npm run dev`
- [ ] Build: `npm run build`
- [ ] Deploy to Vercel

---

**You've got this!** The site is ready. Now it's time to tell your stories. 📖

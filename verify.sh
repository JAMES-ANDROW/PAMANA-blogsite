#!/usr/bin/env bash
# Project Verification Script - Pamana Blog

echo "🔍 Verifying Pamana Project Structure..."
echo ""

# Check required files
FILES=(
    "package.json"
    "tsconfig.json"
    "tailwind.config.ts"
    "next.config.js"
    "postcss.config.js"
    ".gitignore"
    ".env.example"
    "vercel.json"
    "README.md"
    "START-HERE.md"
    "GETTING-STARTED.md"
    "DEPLOYMENT.md"
    "PROJECT-SUMMARY.md"
    "QUICK-REFERENCE.md"
    "src/app/layout.tsx"
    "src/app/page.tsx"
    "src/app/globals.css"
    "src/app/blog/page.tsx"
    "src/app/blog/[slug]/page.tsx"
    "src/app/about/page.tsx"
    "src/components/Navbar.tsx"
    "src/components/Footer.tsx"
    "src/components/BlogCard.tsx"
    "src/components/HeroSection.tsx"
    "src/data/posts.ts"
    "src/types/index.ts"
    "public/images/placeholder-1.jpg"
    "public/images/placeholder-2.jpg"
    "public/images/placeholder-3.jpg"
    "public/images/placeholder-4.jpg"
    "public/images/placeholder-5.jpg"
    "public/images/placeholder-6.jpg"
    "public/og-image.jpg"
)

MISSING=0
FOUND=0

for file in "${FILES[@]}"; do
    if [ -f "$file" ] || [ -d "$file" ]; then
        echo "✅ $file"
        ((FOUND++))
    else
        echo "❌ $file"
        ((MISSING++))
    fi
done

echo ""
echo "📊 Summary:"
echo "   Found: $FOUND files"
echo "   Missing: $MISSING files"
echo ""

if [ $MISSING -eq 0 ]; then
    echo "✅ Project structure complete!"
    echo ""
    echo "Next steps:"
    echo "  1. npm install"
    echo "  2. npm run dev"
    echo "  3. Open http://localhost:3000"
else
    echo "❌ Some files are missing. Please check the structure."
fi

import { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import { getAllBlogPosts } from '@/data/posts'
import BlogCatalog from '@/components/blog/BlogCatalog'

export const metadata: Metadata = {
  title: 'Pamana | All Stories',
  description: 'Browse all stories on Pamana: cultural heritage, traditions, and generational narratives through photography.',
}

export default function BlogPage() {
  const allPosts = getAllBlogPosts()

  return (
    <>
      <HeroSection
        subtitle="Our Stories"
        title="Cultural Heritage Stories"
        description="Each story is a window into traditions, lived experiences, and the meaningful places that shape our identity across generations."
      />

      <section className="bg-heritage-light-beige/60 border-t border-heritage-gold/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <BlogCatalog posts={allPosts} />
        </div>
      </section>
    </>
  )
}

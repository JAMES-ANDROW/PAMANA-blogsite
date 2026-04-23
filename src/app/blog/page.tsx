import { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import BlogCard from '@/components/BlogCard'
import { getAllBlogPosts } from '@/data/posts'

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

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {allPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="font-sans text-heritage-brown text-lg">
              No stories yet. Check back soon!
            </p>
          </div>
        )}
      </section>
    </>
  )
}

import { Metadata } from 'next'
import ScrollReveal from '@/components/ScrollReveal'
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
      {/* Hero Section - WITH BACKGROUND */}
      <div 
        className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/images/bgstories1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Hue overlay with palette color and stronger blur */}
        <div className="absolute inset-0 backdrop-blur-lg bg-heritage-light-beige/30"></div>

        <div className="relative z-10 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-center py-10 sm:py-8">
          <ScrollReveal durationMs={1000} distancePx={40} blurPx={8}>
            <p className="font-sans text-white text-sm tracking-[0.2em] uppercase mb-4 font-medium">
              Our Stories
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-heritage-dark-brown mb-6 leading-tight">
              Cultural Heritage Stories
            </h1>
            <p className="font-sans text-base sm:text-lg text-white leading-relaxed max-w-2xl mx-auto font-light">
              Each story is a window into traditions, lived experiences, and the meaningful places that shape our identity across generations.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <section className="bg-heritage-light-beige/60 border-t border-heritage-gold/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <BlogCatalog posts={allPosts} />
        </div>
      </section>
    </>
  )
}

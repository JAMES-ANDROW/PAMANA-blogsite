import { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import BlogCard from '@/components/BlogCard'
import { getAllBlogPosts } from '@/data/posts'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pamana | Home',
  description:
    'Pamana: Through the Lens, Across Generations. Exploring cultural heritage and traditions through photography and storytelling.',
}

export default function Home() {
  const allPosts = getAllBlogPosts()
  const featuredPosts = allPosts.slice(0, 3)

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        subtitle="Pamana Stories"
        title="Through the Lens, Across Generations"
        description="A visual journey preserving cultural heritage, traditions, and meaningful places through original photography and narrative writing."
      />

      {/* Featured Stories Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-heritage-dark-brown mb-4">
            Featured Stories
          </h2>
          <p className="font-sans text-heritage-brown text-lg font-light">
            Discover stories that celebrate our heritage and connect us to our past
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-block px-8 py-3 bg-heritage-dark-brown text-heritage-light-beige font-sans font-semibold rounded hover:bg-heritage-gold hover:text-heritage-dark-brown transition-all duration-200"
          >
            Explore All Stories
          </Link>
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-heritage-light-beige py-16 border-t border-b border-heritage-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-heritage-dark-brown mb-4">
            What is Pamana?
          </h2>
          <p className="font-sans text-heritage-brown text-lg font-light mb-8">
            Pamana is a storytelling platform dedicated to preserving cultural identity through
            photography and narrative writing. Each story connects us to our heritage, our people,
            and the generations who came before us. Through carefully curated images and reflective
            narratives, we explore what it means to belong, remember, and carry forward the legacy
            of our ancestors.
          </p>
          <Link
            href="/about"
            className="inline-block text-heritage-dark-brown font-sans font-semibold hover:text-heritage-gold transition-colors"
          >
            Learn More About Our Mission →
          </Link>
        </div>
      </section>
    </>
  )
}

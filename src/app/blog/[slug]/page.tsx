import { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPost, getAllBlogPosts } from '@/data/posts'
import { notFound } from 'next/navigation'
import LikeButton from '@/components/social/LikeButton'
import CommentSection from '@/components/social/CommentSection'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: 'Story Not Found',
      description: 'This story could not be found.',
    }
  }

  return {
    title: `${post.title} | Pamana`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      authors: ['Pamana'],
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  // Find previous and next posts for navigation
  const allPosts = getAllBlogPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  return (
    <>
      {/* Hero with Title */}
      <section className="bg-heritage-light-beige border-b border-heritage-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <Link href="/blog" className="text-heritage-gold hover:text-heritage-dark-brown transition-colors font-sans text-sm">
              ← Back to Stories
            </Link>
          </div>
          <h1 className="font-serif text-5xl font-bold text-heritage-dark-brown mb-4">
            {post.title}
          </h1>
          <p className="text-heritage-gold font-sans text-sm">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </section>

      {/* Featured Image */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden bg-heritage-beige">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Story Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center justify-between gap-3 rounded-lg border border-heritage-gold/30 bg-white px-4 py-3">
          <p className="font-sans text-sm text-heritage-brown">
            Enjoyed this story? Leave a reaction.
          </p>
          <LikeButton postId={post.slug} />
        </div>

        {/* Main Story */}
        <div className="prose prose-custom max-w-none mb-12">
          {post.story.split('\n\n').map((paragraph, index) => (
            <p
              key={index}
              className="font-sans text-heritage-brown text-lg leading-relaxed mb-6 font-light"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Gallery */}
        {post.images.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-heritage-dark-brown mb-8">
              Visual Narrative
            </h2>
            <div className="space-y-12">
              {post.images.map((image, index) => (
                <div key={index} className="space-y-4">
                  <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden bg-heritage-beige">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-serif text-heritage-gold text-center italic">
                    {image.caption}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tags */}
        <div className="space-y-4 border-t border-heritage-gold pt-8 mb-12">
          <p className="font-sans text-heritage-brown text-sm font-semibold uppercase tracking-widest">
            Tags
          </p>
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-heritage-light-beige text-heritage-brown text-sm font-light rounded-full border border-heritage-gold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <CommentSection postId={post.slug} />
      </article>

      {/* Navigation */}
      {(prevPost || nextPost) && (
        <section className="bg-heritage-light-beige border-t border-heritage-gold">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {prevPost && (
                <Link href={`/blog/${prevPost.slug}`}>
                  <div className="group cursor-pointer">
                    <p className="text-heritage-gold font-sans text-sm uppercase tracking-widest mb-2">
                      ← Previous
                    </p>
                    <h3 className="font-serif text-xl font-bold text-heritage-dark-brown group-hover:text-heritage-gold transition-colors">
                      {prevPost.title}
                    </h3>
                  </div>
                </Link>
              )}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`}>
                  <div className="group cursor-pointer md:text-right">
                    <p className="text-heritage-gold font-sans text-sm uppercase tracking-widest mb-2">
                      Next →
                    </p>
                    <h3 className="font-serif text-xl font-bold text-heritage-dark-brown group-hover:text-heritage-gold transition-colors">
                      {nextPost.title}
                    </h3>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

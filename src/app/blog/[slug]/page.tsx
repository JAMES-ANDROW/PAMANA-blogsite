import { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPost, getAllBlogPosts } from '@/data/posts'
import { notFound } from 'next/navigation'
import LikeButton from '@/components/social/LikeButton'
import CommentSection from '@/components/social/CommentSection'
import ScrollToTop from '@/components/ScrollToTop'

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
      authors: [post.author],
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
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-heritage-dark-brown hover:bg-heritage-gold text-heritage-light-beige hover:text-heritage-dark-brown font-sans text-sm font-semibold rounded-lg transition-all duration-300 hover:shadow-md active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Stories
            </Link>
          </div>
          <h1 className="font-serif text-5xl font-bold text-heritage-dark-brown mb-4">
            {post.title}
          </h1>
          <div className="space-y-1">
            <p className="text-heritage-gold font-sans text-sm">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="font-sans text-sm text-heritage-brown">
              By <span className="font-semibold text-heritage-dark-brown">{post.author}</span>
            </p>
          </div>
        </div>
      </section>


      {/* Featured Image */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-lg overflow-hidden bg-heritage-beige">
          <img
            src={post.featured_image}
            alt={post.title}
            className="mx-auto block max-w-full h-auto"
          />
        </div>
      </section>

      {/* Excerpt lead — moved below featured image */}
      {post.excerpt && post.slug !== 'mirror-of-memory-pamana-resilience' && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-serif italic text-heritage-gold text-center text-lg mb-6">
            {post.excerpt}
          </p>
        </section>
      )}

      {/* Story Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center justify-between gap-3 rounded-lg border border-heritage-gold/30 bg-white px-4 py-3">
          <p className="font-sans text-sm text-heritage-brown">
            Enjoyed this story? Leave a reaction.
          </p>
          <LikeButton postId={post.slug} />
        </div>

        {/* Main Story */}
        <div className="prose prose-custom max-w-none mb-12 blog-content-protected">
          {post.story.split('\n\n').map((paragraph, index) => (
            <p
              key={index}
              className="font-sans text-heritage-brown text-lg leading-relaxed mb-6 font-light"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>

        {/* Gallery removed per request */}

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
            <h2 className="font-serif text-2xl font-bold text-heritage-dark-brown mb-8 text-center">
              Explore More Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {prevPost && (
                <Link href={`/blog/${prevPost.slug}`}>
                  <div className="group h-full p-6 rounded-lg border-2 border-heritage-gold bg-white hover:bg-heritage-light-beige hover:border-heritage-brown transition-all duration-300 hover:shadow-lg cursor-pointer">
                    <p className="text-heritage-gold font-sans text-xs uppercase tracking-widest mb-3 font-semibold flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous Story
                    </p>
                    <h3 className="font-serif text-lg font-bold text-heritage-dark-brown group-hover:text-heritage-gold transition-colors line-clamp-3">
                      {prevPost.title}
                    </h3>
                    <p className="text-heritage-brown text-sm mt-3 line-clamp-2">
                      {prevPost.excerpt}
                    </p>
                  </div>
                </Link>
              )}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`}>
                  <div className="group h-full p-6 rounded-lg border-2 border-heritage-gold bg-white hover:bg-heritage-light-beige hover:border-heritage-brown transition-all duration-300 hover:shadow-lg cursor-pointer">
                    <p className="text-heritage-gold font-sans text-xs uppercase tracking-widest mb-3 font-semibold flex items-center justify-end gap-2">
                      Next Story
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </p>
                    <h3 className="font-serif text-lg font-bold text-heritage-dark-brown group-hover:text-heritage-gold transition-colors line-clamp-3 text-right">
                      {nextPost.title}
                    </h3>
                    <p className="text-heritage-brown text-sm mt-3 line-clamp-2 text-right">
                      {nextPost.excerpt}
                    </p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Scroll to Top Button (Mobile Only) */}
      <ScrollToTop />
    </>
  )
}

import Link from 'next/link'
import { BlogPost } from '@/types'
import LikeButton from '@/components/social/LikeButton'

interface BlogCardProps {
  post: BlogPost
  likesCount?: number
  commentsCount?: number
}

export default function BlogCard({ post, likesCount, commentsCount }: BlogCardProps) {
  const displayLikes = likesCount ?? post.likes
  const displayComments = commentsCount ?? 0
  const excerptText = (post.excerpt && post.excerpt.trim()) || (post.story ? post.story.split('\n\n')[0].trim() : '')

  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
    <article className="group flex flex-col h-[520px] overflow-hidden rounded-2xl border border-heritage-gold/30 bg-white/90 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden bg-heritage-beige">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col p-4">
          {/* Date */}
          <p className="mb-2 font-sans text-xs uppercase tracking-wider text-heritage-gold font-light">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <div className="mb-3 flex items-start justify-between gap-3 font-sans text-sm text-heritage-brown/90">
            <div className="flex flex-col">
              <p className="">By <span className="font-semibold text-heritage-dark-brown">{post.author}</span></p>
              <p className="text-heritage-brown text-sm mt-1">{displayComments} comments</p>
            </div>

            <div className="shrink-0">
              <LikeButton postId={post.slug} />
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif font-bold text-xl text-heritage-dark-brown mb-3 group-hover:text-heritage-gold transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="font-sans text-heritage-brown text-sm leading-relaxed mb-6 line-clamp-2">
            {excerptText}
          </p>

          {/* Tags */}
          <div className="mt-auto pt-4 flex flex-wrap gap-3">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full border border-heritage-gold/40 bg-heritage-light-beige px-3 py-1 text-xs font-light text-heritage-brown"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}

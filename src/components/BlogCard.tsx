import Link from 'next/link'
import { BlogPost } from '@/types'

interface BlogCardProps {
  post: BlogPost
  likesCount?: number
  commentsCount?: number
}

export default function BlogCard({ post, likesCount, commentsCount }: BlogCardProps) {
  const displayLikes = likesCount ?? post.likes
  const displayComments = commentsCount ?? 0

  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-heritage-gold/30 bg-white/90 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-heritage-beige">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="flex h-full flex-col p-6">
          {/* Date */}
          <p className="mb-2 font-sans text-xs uppercase tracking-wider text-heritage-gold font-light">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <div className="mb-3 flex items-center justify-between gap-3 font-sans text-xs text-heritage-brown/90">
            <p className="truncate">By {post.author}</p>
            <p className="shrink-0">{displayLikes} likes</p>
          </div>

          <p className="mb-3 font-sans text-xs text-heritage-brown/80">{displayComments} comments</p>

          {/* Title */}
          <h3 className="font-serif font-bold text-xl text-heritage-dark-brown mb-3 group-hover:text-heritage-gold transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="font-sans text-heritage-brown text-sm leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="mt-auto flex flex-wrap gap-2">
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

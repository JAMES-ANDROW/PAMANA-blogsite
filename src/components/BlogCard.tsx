import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/types'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-heritage-beige">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Date */}
          <p className="text-xs text-heritage-gold font-sans font-light mb-2">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          {/* Title */}
          <h3 className="font-serif font-bold text-xl text-heritage-dark-brown mb-3 group-hover:text-heritage-gold transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="font-sans text-heritage-brown text-sm leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 bg-heritage-light-beige text-heritage-brown text-xs font-light rounded"
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

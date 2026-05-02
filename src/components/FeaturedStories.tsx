'use client'

import { useEffect, useState } from 'react'
import BlogCard from '@/components/BlogCard'
import { BlogPost } from '@/types'
import { supabase } from '@/lib/supabase/client'
import ScrollReveal from '@/components/ScrollReveal'
import Link from 'next/link'

type PostMetrics = {
  likes: number
  comments: number
}

interface FeaturedStoriesProps {
  posts: BlogPost[]
}

export default function FeaturedStories({ posts }: FeaturedStoriesProps) {
  const [metricsByPost, setMetricsByPost] = useState<Record<string, PostMetrics>>({})
  const [sortedPosts, setSortedPosts] = useState<BlogPost[]>(posts)

  useEffect(() => {
    let cancelled = false

    const fetchAndSortMetrics = async () => {
      const entries = await Promise.all(
        posts.map(async (post) => {
          const [likesResult, commentsResult] = await Promise.all([
            supabase
              .from('reactions')
              .select('*', { count: 'exact', head: true })
              .eq('post_id', post.slug)
              .eq('type', 'like'),
            supabase
              .from('comments')
              .select('*', { count: 'exact', head: true })
              .eq('post_id', post.slug),
          ])

          return [
            post.slug,
            {
              likes: likesResult.count ?? post.likes,
              comments: commentsResult.count ?? 0,
              post,
            },
          ] as const
        })
      )

      if (!cancelled) {
        const metricsMap = Object.fromEntries(
          entries.map(([slug, data]) => [slug, { likes: data.likes, comments: data.comments }])
        )
        setMetricsByPost(metricsMap)

        // Sort by likes + comments (most engaged first)
        const sorted = [...posts].sort((a, b) => {
          const aTotal =
            (metricsMap[a.slug]?.likes ?? 0) + (metricsMap[a.slug]?.comments ?? 0)
          const bTotal =
            (metricsMap[b.slug]?.likes ?? 0) + (metricsMap[b.slug]?.comments ?? 0)
          return bTotal - aTotal
        })

        setSortedPosts(sorted.slice(0, 3))
      }
    }

    fetchAndSortMetrics()

    return () => {
      cancelled = true
    }
  }, [posts])

  return (
    <>
      <ScrollReveal className="text-center mb-12" delayMs={100} direction="down" distancePx={28}>
        <h2 className="font-serif text-4xl font-bold text-heritage-dark-brown mb-4">
          Featured Stories
        </h2>
        <p className="font-sans text-heritage-brown text-lg font-light">
          Discover stories that celebrate our heritage and connect us to our past
        </p>
      </ScrollReveal>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {sortedPosts.map((post, index) => (
          <ScrollReveal
            key={post.id}
            delayMs={120 + index * 140}
            direction={index % 2 === 0 ? 'left' : 'right'}
            distancePx={36}
            durationMs={900}
            blurPx={7}
          >
            <BlogCard
              post={post}
              likesCount={metricsByPost[post.slug]?.likes}
              commentsCount={metricsByPost[post.slug]?.comments}
            />
          </ScrollReveal>
        ))}
      </div>

      {/* CTA Button */}
      <ScrollReveal className="text-center" delayMs={180} direction="up" distancePx={24}>
        <Link
          href="/blog"
          className="inline-block px-8 py-3 bg-heritage-dark-brown text-heritage-light-beige font-sans font-semibold rounded border-2 border-transparent shadow-[0_8px_20px_rgba(201,169,97,0.35)] hover:border-heritage-gold hover:bg-heritage-gold hover:text-heritage-dark-brown hover:-translate-y-1 transition-all duration-300"
        >
          Explore All Stories
        </Link>
      </ScrollReveal>
    </>
  )
}

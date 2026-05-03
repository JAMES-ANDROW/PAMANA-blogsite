'use client'

import { useEffect, useState } from 'react'
import BlogCard from '@/components/BlogCard'
import { BlogPost } from '@/types'
import { supabase } from '@/lib/supabase/client'
import ScrollReveal from '@/components/ScrollReveal'
import Link from 'next/link'
import { useUser } from '@/hooks/useUser'

type PostMetrics = {
  likes: number
  comments: number
}

const LIKED_POSTS_STORAGE_KEY = 'pamana-liked-posts'

const getStoredLikes = (): Record<string, boolean> => {
  if (typeof window === 'undefined') {
    return {}
  }

  try {
    const raw = window.localStorage.getItem(LIKED_POSTS_STORAGE_KEY)
    if (!raw) {
      return {}
    }

    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object') {
      return parsed as Record<string, boolean>
    }

    return {}
  } catch {
    return {}
  }
}

interface FeaturedStoriesProps {
  posts: BlogPost[]
}

export default function FeaturedStories({ posts }: FeaturedStoriesProps) {
  const { isAuthenticated } = useUser()
  const [metricsByPost, setMetricsByPost] = useState<Record<string, PostMetrics>>({})
  const [sortedPosts, setSortedPosts] = useState<BlogPost[]>(posts)

  useEffect(() => {
    let cancelled = false

    const fetchAndSortMetrics = async () => {
      const storedLikes = getStoredLikes()

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

          const localBoost = !isAuthenticated && storedLikes[post.slug] ? 1 : 0
          const likes = (likesResult.count ?? post.likes) + localBoost
          const comments = commentsResult.count ?? 0

          return [
            post.slug,
            {
              likes,
              comments,
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

        // Sort by likes (highest first), then by most recent post date for ties.
        const sorted = [...posts].sort((a, b) => {
          const aLikes = metricsMap[a.slug]?.likes ?? 0
          const bLikes = metricsMap[b.slug]?.likes ?? 0

          if (bLikes !== aLikes) {
            return bLikes - aLikes
          }

          return new Date(b.date).getTime() - new Date(a.date).getTime()
        })

        setSortedPosts(sorted.slice(0, 3))
      }
    }

    fetchAndSortMetrics()

    const reactionsChannel = supabase
      .channel('featured-likes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reactions',
        },
        () => {
          fetchAndSortMetrics()
        }
      )
      .subscribe()

    const handleLocalLikeChanged = () => {
      fetchAndSortMetrics()
    }

    window.addEventListener('pamana-like-changed', handleLocalLikeChanged)

    return () => {
      cancelled = true
      window.removeEventListener('pamana-like-changed', handleLocalLikeChanged)
      supabase.removeChannel(reactionsChannel)
    }
  }, [posts, isAuthenticated])

  const topStorySlug = sortedPosts[0]?.slug

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
            className={post.slug === topStorySlug ? 'md:order-2 lg:order-2' : index === 1 ? 'md:order-1 lg:order-1' : 'md:order-3 lg:order-3'}
          >
            <div className={post.slug === topStorySlug ? 'relative lg:-translate-y-3' : 'relative'}>
              {post.slug === topStorySlug && (
                <span className="absolute -top-3 left-4 z-10 rounded-full bg-heritage-gold px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-heritage-dark-brown shadow-md">
                  Most Liked
                </span>
              )}

              <div className={post.slug === topStorySlug ? 'rounded-2xl ring-2 ring-heritage-gold/70 shadow-[0_18px_36px_rgba(107,68,35,0.2)]' : ''}>
                <BlogCard
                  post={post}
                  likesCount={metricsByPost[post.slug]?.likes}
                  commentsCount={metricsByPost[post.slug]?.comments}
                />
              </div>
            </div>
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

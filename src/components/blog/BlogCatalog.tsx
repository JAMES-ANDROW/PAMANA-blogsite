'use client'

import { useEffect, useMemo, useState } from 'react'
import BlogCard from '@/components/BlogCard'
import { BlogPost } from '@/types'
import { supabase } from '@/lib/supabase/client'
import { useUser } from '@/hooks/useUser'

type SortMetric = 'date' | 'likes' | 'comments'
type SortDirection = 'asc' | 'desc'

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

interface BlogCatalogProps {
  posts: BlogPost[]
}

export default function BlogCatalog({ posts }: BlogCatalogProps) {
  const { isAuthenticated } = useUser()
  const [sortMetric, setSortMetric] = useState<SortMetric>('likes')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [searchQuery, setSearchQuery] = useState('')
  const [metricsByPost, setMetricsByPost] = useState<Record<string, PostMetrics>>({})

  useEffect(() => {
    let cancelled = false

    const fetchMetrics = async () => {
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

          return [
            post.slug,
            {
              likes: (likesResult.count ?? post.likes) + localBoost,
              comments: commentsResult.count ?? 0,
            },
          ] as const
        })
      )

      if (!cancelled) {
        setMetricsByPost(Object.fromEntries(entries))
      }
    }

    fetchMetrics()

    const reactionsChannel = supabase
      .channel('blog-catalog-reactions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reactions',
        },
        () => {
          fetchMetrics()
        }
      )
      .subscribe()

    const commentsChannel = supabase
      .channel('blog-catalog-comments')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
        },
        () => {
          fetchMetrics()
        }
      )
      .subscribe()

    const handleLocalLikeChanged = () => {
      fetchMetrics()
    }

    window.addEventListener('pamana-like-changed', handleLocalLikeChanged)

    return () => {
      cancelled = true
      window.removeEventListener('pamana-like-changed', handleLocalLikeChanged)
      supabase.removeChannel(reactionsChannel)
      supabase.removeChannel(commentsChannel)
    }
  }, [posts, isAuthenticated])

  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    const matched = posts.filter((post) => {
      if (!normalizedQuery) {
        return true
      }

      const dateText = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

      const searchable = [
        post.title,
        post.slug,
        post.excerpt,
        post.author,
        post.category,
        post.tags.join(' '),
        post.date,
        dateText,
      ]
        .join(' ')
        .toLowerCase()

      return searchable.includes(normalizedQuery)
    })

    const sorted = [...matched]

    sorted.sort((a, b) => {
      let left = 0
      let right = 0

      if (sortMetric === 'date') {
        left = new Date(a.date).getTime()
        right = new Date(b.date).getTime()
      } else if (sortMetric === 'likes') {
        left = metricsByPost[a.slug]?.likes ?? a.likes
        right = metricsByPost[b.slug]?.likes ?? b.likes
      } else {
        left = metricsByPost[a.slug]?.comments ?? 0
        right = metricsByPost[b.slug]?.comments ?? 0
      }

      const diff = left - right
      return sortDirection === 'asc' ? diff : -diff
    })

    if (sortMetric === 'date' && sortDirection === 'desc') {
      // preserve stable title order for posts with same date
      sorted.sort((a, b) => {
        const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime()
        if (dateDiff !== 0) {
          return dateDiff
        }
        return a.title.localeCompare(b.title)
      })
    }

    return sorted
  }, [posts, sortMetric, sortDirection, searchQuery, metricsByPost])

  const handleSortMetricClick = (metric: SortMetric) => {
    if (sortMetric === metric) {
      setSortDirection((current) => (current === 'desc' ? 'asc' : 'desc'))
      return
    }

    setSortMetric(metric)
    setSortDirection('desc')
  }

  return (
    <>
      <div className="mb-8 rounded-2xl border border-heritage-gold/30 bg-white/80 p-4 sm:p-5">
        <div>
          <p className="mb-2 block text-xs uppercase tracking-wider text-heritage-gold font-sans">
            Sort
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
            {[
              { value: 'likes' as const, label: 'Likes' },
              { value: 'date' as const, label: 'Date' },
              { value: 'comments' as const, label: 'Comments' },
            ].map((button) => (
              <button
                key={button.value}
                type="button"
                onClick={() => handleSortMetricClick(button.value)}
                className={`rounded-md border px-3 py-1.5 text-sm font-sans transition-colors ${
                  sortMetric === button.value
                    ? 'border-heritage-dark-brown bg-heritage-dark-brown text-heritage-light-beige'
                    : 'border-heritage-gold/40 bg-heritage-light-beige text-heritage-brown hover:border-heritage-gold'
                }`}
              >
                {button.label}
                {sortMetric === button.value ? ` (${sortDirection === 'desc' ? '↓' : '↑'})` : ''}
              </button>
            ))}
            </div>

            <div className="w-full md:max-w-sm">
              <label className="sr-only" htmlFor="blog-search">
                Search articles
              </label>
              <input
                id="blog-search"
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search title, date, author, tags..."
                className="w-full rounded-md border border-heritage-gold/40 bg-heritage-light-beige px-3 py-1.5 text-sm font-sans text-heritage-dark-brown outline-none focus:border-heritage-gold"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            likesCount={metricsByPost[post.slug]?.likes}
            commentsCount={metricsByPost[post.slug]?.comments}
          />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 rounded-2xl border border-dashed border-heritage-gold/40 bg-white/70 mt-8">
          <p className="font-sans text-heritage-brown text-lg">
            No stories match this filter yet.
          </p>
        </div>
      )}
    </>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/hooks/useUser'
import { supabase } from '@/lib/supabase/client'

type LikeButtonProps = {
  postId: string
  className?: string
  label?: string
}

const LIKED_POSTS_STORAGE_KEY = 'pamana-liked-posts'
const ANONYMOUS_REACTOR_STORAGE_KEY = 'pamana-anonymous-reactor-id'

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

const setStoredLike = (postId: string) => {
  if (typeof window === 'undefined') {
    return
  }

  const current = getStoredLikes()
  current[postId] = true
  window.localStorage.setItem(LIKED_POSTS_STORAGE_KEY, JSON.stringify(current))
}

const clearStoredLike = (postId: string) => {
  if (typeof window === 'undefined') {
    return
  }

  const current = getStoredLikes()
  delete current[postId]
  window.localStorage.setItem(LIKED_POSTS_STORAGE_KEY, JSON.stringify(current))
}

const getOrCreateAnonymousReactorId = (): string => {
  if (typeof window === 'undefined') {
    return 'server-render'
  }

  const existing = window.localStorage.getItem(ANONYMOUS_REACTOR_STORAGE_KEY)
  if (existing) {
    return existing
  }

  const generated =
    typeof window.crypto !== 'undefined' && typeof window.crypto.randomUUID === 'function'
      ? window.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`

  window.localStorage.setItem(ANONYMOUS_REACTOR_STORAGE_KEY, generated)
  return generated
}

const emitLikeChanged = (postId: string, liked: boolean) => {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(
    new CustomEvent('pamana-like-changed', {
      detail: { postId, liked },
    })
  )
}

export default function LikeButton({ postId, className, label }: LikeButtonProps) {
  const { user, isAuthenticated, loading: authLoading } = useUser()
  const [likesCount, setLikesCount] = useState(0)
  const [likedByUser, setLikedByUser] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const fetchReactions = async () => {
    const storedLikes = getStoredLikes()
    const likedOnDevice = Boolean(storedLikes[postId])
    const anonymousReactorId = getOrCreateAnonymousReactorId()

    const { count } = await supabase
      .from('reactions')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', postId)
      .eq('type', 'like')

    let serverLikedByUser = false

    if (user?.id) {
      const { data } = await supabase
        .from('reactions')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .eq('type', 'like')
        .limit(1)

      serverLikedByUser = Boolean(data && data.length > 0)
    } else {
      const { data } = await supabase
        .from('reactions')
        .select('id')
        .eq('post_id', postId)
        .eq('anonymous_id', anonymousReactorId)
        .eq('type', 'like')
        .limit(1)

      serverLikedByUser = Boolean(data && data.length > 0)

      if (likedOnDevice && !serverLikedByUser) {
        const { error } = await supabase.from('reactions').insert({
          post_id: postId,
          anonymous_id: anonymousReactorId,
          type: 'like',
        })

        if (!error || error.code === '23505') {
          serverLikedByUser = true
        }
      }
    }

    const mergedLikedState = likedOnDevice || serverLikedByUser

    setLikedByUser(mergedLikedState)
    setLikesCount(count ?? 0)
  }

  useEffect(() => {
    fetchReactions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, user?.id])

  const toggleLike = async () => {
    if (authLoading || isUpdating) {
      return
    }

    const optimisticLiked = !likedByUser
    const previousLiked = likedByUser
    const previousCount = likesCount

    if (optimisticLiked) {
      setStoredLike(postId)
    } else {
      clearStoredLike(postId)
    }

    emitLikeChanged(postId, optimisticLiked)

    setLikedByUser(optimisticLiked)
    setLikesCount((current) => (optimisticLiked ? current + 1 : Math.max(current - 1, 0)))
    setIsUpdating(true)

    try {
      const anonymousReactorId = getOrCreateAnonymousReactorId()

      if (optimisticLiked) {
        const reactionToInsert = isAuthenticated && user
          ? {
              post_id: postId,
              user_id: user.id,
              type: 'like',
            }
          : {
              post_id: postId,
              anonymous_id: anonymousReactorId,
              type: 'like',
            }

        const { error } = await supabase.from('reactions').insert(reactionToInsert)

        if (error && error.code !== '23505') {
          throw error
        }
      } else {
        const deleteQuery = supabase
          .from('reactions')
          .delete()
          .eq('post_id', postId)
          .eq('type', 'like')

        const { error } = isAuthenticated && user
          ? await deleteQuery.eq('user_id', user.id)
          : await deleteQuery.eq('anonymous_id', anonymousReactorId)

        if (error) {
          throw error
        }
      }
    } catch (_error) {
      if (previousLiked) {
        setStoredLike(postId)
      } else {
        clearStoredLike(postId)
      }

      emitLikeChanged(postId, previousLiked)

      setLikedByUser(previousLiked)
      setLikesCount(previousCount)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleLikeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    void toggleLike()
  }

  return (
    <>
      <button
        type="button"
        onClick={handleLikeClick}
        disabled={isUpdating || authLoading}
        className={`${className ? className + ' ' : ''}inline-flex items-center gap-2 rounded-full border px-4 py-2 font-sans text-sm font-semibold transition-all ${
          likedByUser
            ? 'border-heritage-gold bg-heritage-gold/15 text-heritage-dark-brown'
            : 'border-heritage-gold/50 bg-white text-heritage-brown hover:border-heritage-gold'
        } disabled:cursor-not-allowed disabled:opacity-60`}
        title={likedByUser ? 'Click to remove your reaction' : 'Click to react'}
      >
        <span aria-hidden="true">{likedByUser ? '♥' : '♡'}</span>
        <span>{likesCount}</span>
        <span>{label ? label : likesCount === 1 ? 'Like' : 'Likes'}</span>
      </button>
    </>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/hooks/useUser'
import { supabase } from '@/lib/supabase/client'
import LoginModal from '../LoginModal'

type LikeButtonProps = {
  postId: string
}

export default function LikeButton({ postId }: LikeButtonProps) {
  const { user, isAuthenticated, loading: authLoading } = useUser()
  const [likesCount, setLikesCount] = useState(0)
  const [likedByUser, setLikedByUser] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const fetchReactions = async () => {
    const { count } = await supabase
      .from('reactions')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', postId)
      .eq('type', 'like')

    setLikesCount(count ?? 0)

    if (!user?.id) {
      setLikedByUser(false)
      return
    }

    const { data } = await supabase
      .from('reactions')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .eq('type', 'like')
      .limit(1)

    setLikedByUser(Boolean(data && data.length > 0))
  }

  useEffect(() => {
    fetchReactions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, user?.id])

  const toggleLike = async () => {
    if (authLoading) {
      return
    }

    if (!isAuthenticated || !user) {
      setShowLoginModal(true)
      return
    }

    const optimisticLiked = !likedByUser
    const optimisticCount = optimisticLiked ? likesCount + 1 : Math.max(likesCount - 1, 0)

    setLikedByUser(optimisticLiked)
    setLikesCount(optimisticCount)
    setIsUpdating(true)

    try {
      if (optimisticLiked) {
        const { error } = await supabase.from('reactions').insert({
          post_id: postId,
          user_id: user.id,
          type: 'like',
        })

        if (error) {
          throw error
        }
      } else {
        const { error } = await supabase
          .from('reactions')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id)
          .eq('type', 'like')

        if (error) {
          throw error
        }
      }
    } catch (_error) {
      setLikedByUser(!optimisticLiked)
      setLikesCount(likesCount)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={toggleLike}
        disabled={isUpdating || authLoading}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-sans text-sm font-semibold transition-all ${
          likedByUser
            ? 'border-heritage-gold bg-heritage-gold/15 text-heritage-dark-brown'
            : 'border-heritage-gold/50 bg-white text-heritage-brown hover:border-heritage-gold'
        } disabled:cursor-not-allowed disabled:opacity-60`}
      >
        <span aria-hidden="true">{likedByUser ? '♥' : '♡'}</span>
        <span>{likesCount}</span>
        <span>{likesCount === 1 ? 'Like' : 'Likes'}</span>
      </button>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Sign in to react"
        message="Sign in with your email to like this story."
      />
    </>
  )
}

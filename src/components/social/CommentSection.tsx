'use client'

import { useEffect, useMemo, useState } from 'react'
import { useUser } from '@/hooks/useUser'
import { supabase } from '@/lib/supabase/client'
import CommentForm from './CommentForm'
import CommentItem, { CommentRecord } from './CommentItem'
import LoginModal from '../LoginModal'

type CommentSectionProps = {
  postId: string
}

type ProfileRow = {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
}

type CommentRow = {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
}

const FALLBACK_AUTHOR = 'Pamana Reader'

export default function CommentSection({ postId }: CommentSectionProps) {
  const { user, isAuthenticated, loading: authLoading } = useUser()
  const [comments, setComments] = useState<CommentRecord[]>([])
  const [loadingComments, setLoadingComments] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const currentUserEmail = user?.email ?? FALLBACK_AUTHOR

  const commentsCountLabel = useMemo(() => {
    if (comments.length === 1) {
      return '1 comment'
    }
    return `${comments.length} comments`
  }, [comments.length])

  const mapCommentRows = (
    rows: CommentRow[],
    profilesById: Map<string, ProfileRow>
  ): CommentRecord[] => {
    return rows.map((row) => {
      const profile = profilesById.get(row.user_id)
      const name =
        profile?.full_name ||
        (user?.id === row.user_id ? currentUserEmail : null) ||
        FALLBACK_AUTHOR

      const email =
        profile?.email ||
        (user?.id === row.user_id ? currentUserEmail : null) ||
        null

      const avatarUrl =
        profile?.avatar_url ||
        (user?.id === row.user_id ? user.user_metadata?.avatar_url : null) ||
        null

      return {
        ...row,
        author: {
          name,
          email,
          avatarUrl,
        },
      }
    })
  }

  const fetchComments = async () => {
    setLoadingComments(true)
    setErrorMessage(null)

    const { data: rows, error } = await supabase
      .from('comments')
      .select('id, post_id, user_id, content, created_at')
      .eq('post_id', postId)
      .order('created_at', { ascending: false })

    if (error) {
      setLoadingComments(false)
      setErrorMessage('Unable to load comments right now.')
      return
    }

    const commentRows = (rows ?? []) as CommentRow[]
    const userIds = Array.from(new Set(commentRows.map((row) => row.user_id)))
    const profilesById = new Map<string, ProfileRow>()

    if (userIds.length > 0) {
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, email, full_name, avatar_url')
        .in('id', userIds)

      if (profilesData) {
        profilesData.forEach((profile) => {
          profilesById.set(profile.id, profile)
        })
      }
    }

    setComments(mapCommentRows(commentRows, profilesById))
    setLoadingComments(false)
  }

  useEffect(() => {
    fetchComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, user?.id])

  useEffect(() => {
    const channel = supabase
      .channel(`comments-${postId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${postId}`,
        },
        () => {
          fetchComments()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId])

  const createComment = async (content: string) => {
    setErrorMessage(null)

    const optimisticComment: CommentRecord = {
      id: `temp-${Date.now()}`,
      post_id: postId,
      user_id: user.id,
      content,
      created_at: new Date().toISOString(),
      author: {
        name: user.email || FALLBACK_AUTHOR,
        email: user.email || null,
        avatarUrl: user.user_metadata?.avatar_url || null,
      },
    }

    setComments((current) => [optimisticComment, ...current])

    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        user_id: user.id,
        content,
      })
      .select('id, post_id, user_id, content, created_at')
      .single()

    if (error || !data) {
      setComments((current) => current.filter((comment) => comment.id !== optimisticComment.id))
      setErrorMessage('Your comment could not be posted. Please try again.')
      return
    }

    const savedComment: CommentRecord = {
      ...(data as CommentRow),
      author: optimisticComment.author,
    }

    setComments((current) =>
      current.map((comment) =>
        comment.id === optimisticComment.id ? savedComment : comment
      )
    )
  }

  const handleCommentSubmit = async (content: string) => {
    if (authLoading) {
      return
    }

    if (!isAuthenticated || !user) {
      setShowLoginModal(true)
      return
    }

    await createComment(content)
  }

  return (
    <section id="comments" className="rounded-xl border border-heritage-gold/30 bg-heritage-light-beige/60 p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="font-serif text-2xl text-heritage-dark-brown">Comments</h2>
        <p className="font-sans text-sm text-heritage-brown">{commentsCountLabel}</p>
      </div>

      {isAuthenticated && user && (
        <div className="mb-4 rounded-lg border border-heritage-gold/30 bg-white px-3 py-2 font-sans text-sm text-heritage-brown">
          Commenting as <span className="font-semibold text-heritage-dark-brown">{currentUserEmail}</span>
        </div>
      )}

      {errorMessage && (
        <p className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 font-sans text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      <CommentForm onSubmit={handleCommentSubmit} disabled={authLoading} />

      {!isAuthenticated && (
        <p className="mb-4 mt-2 font-sans text-xs text-heritage-brown">
          Submit will prompt email sign-in for posting your comment.
        </p>
      )}

      <div className="space-y-3">
        {loadingComments ? (
          <p className="font-sans text-sm text-heritage-brown">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="rounded-lg border border-dashed border-heritage-gold/40 bg-white p-4 font-sans text-sm text-heritage-brown">
            No comments yet. Be the first to leave one.
          </p>
        ) : (
          comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)
        )}
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Sign in to comment"
        message="Sign in with your email to join this heritage conversation."
      />
    </section>
  )
}

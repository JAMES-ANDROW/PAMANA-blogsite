'use client'

export type CommentAuthor = {
  name: string
  avatarUrl?: string | null
}

export type CommentRecord = {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
  author: CommentAuthor
}

type CommentItemProps = {
  comment: CommentRecord
}

function formatCommentDate(value: string) {
  const date = new Date(value)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function getInitial(name: string) {
  const trimmed = name.trim()
  if (!trimmed) {
    return 'P'
  }
  return trimmed[0].toUpperCase()
}

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <article className="rounded-lg border border-heritage-gold/25 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        {comment.author.avatarUrl ? (
          <img
            src={comment.author.avatarUrl}
            alt={comment.author.name}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-heritage-light-beige font-serif text-heritage-dark-brown">
            {getInitial(comment.author.name)}
          </div>
        )}

        <div>
          <p className="font-sans text-sm font-semibold text-heritage-dark-brown">
            {comment.author.name}
          </p>
          <p className="font-sans text-xs text-heritage-brown/80">
            {formatCommentDate(comment.created_at)}
          </p>
        </div>
      </div>

      <p className="font-sans text-sm leading-relaxed text-heritage-brown">{comment.content}</p>
    </article>
  )
}

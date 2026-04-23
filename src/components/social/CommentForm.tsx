'use client'

import { FormEvent, useState } from 'react'

type CommentFormProps = {
  onSubmit: (content: string) => Promise<void>
  disabled?: boolean
}

export default function CommentForm({ onSubmit, disabled = false }: CommentFormProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = content.trim()
    if (!trimmed || disabled) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(trimmed)
      setContent('')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isDisabled = disabled || isSubmitting || !content.trim()

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Share your reflection about this story..."
        className="min-h-28 w-full rounded-lg border border-heritage-gold/40 bg-white p-3 font-sans text-sm text-heritage-dark-brown outline-none ring-0 placeholder:text-heritage-brown/70 focus:border-heritage-gold"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isDisabled}
          className="rounded-md bg-heritage-dark-brown px-5 py-2 font-sans text-sm font-semibold text-heritage-light-beige hover:bg-heritage-gold hover:text-heritage-dark-brown disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </div>
    </form>
  )
}

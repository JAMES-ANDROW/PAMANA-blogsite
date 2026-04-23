'use client'

import { useState } from 'react'
import { useUser } from '@/hooks/useUser'

type LoginModalProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  message?: string
}

export default function LoginModal({
  isOpen,
  onClose,
  title = 'Sign in to continue',
  message = 'Join the conversation and react to stories with your email.',
}: LoginModalProps) {
  const { signInWithEmail } = useUser()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (!isOpen) {
    return null
  }

  const handleEmailSignIn = async () => {
    if (!email || !password) {
      setError('Please enter email and password')
      return
    }
    setLoading(true)
    setError('')
    try {
      await signInWithEmail(email, password)
      setEmail('')
      setPassword('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl border border-heritage-gold/40 bg-white p-6 shadow-2xl transition-all">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl text-heritage-dark-brown">{title}</h3>
            <p className="mt-2 text-sm text-heritage-brown">{message}</p>
          </div>
          <button
            aria-label="Close login modal"
            onClick={onClose}
            className="rounded-full border border-heritage-gold/50 px-2 py-1 text-sm text-heritage-dark-brown hover:bg-heritage-light-beige"
          >
            x
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full rounded-md border border-heritage-gold/30 bg-heritage-light-beige px-3 py-2 text-sm text-heritage-dark-brown placeholder-heritage-brown/60 focus:border-heritage-gold focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="w-full rounded-md border border-heritage-gold/30 bg-heritage-light-beige px-3 py-2 text-sm text-heritage-dark-brown placeholder-heritage-brown/60 focus:border-heritage-gold focus:outline-none"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="button"
            onClick={handleEmailSignIn}
            disabled={loading}
            className="mt-3 w-full rounded-md bg-heritage-dark-brown px-4 py-3 font-sans text-sm font-semibold text-heritage-light-beige hover:bg-heritage-gold hover:text-heritage-dark-brown disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Sign in with Email'}
          </button>
        </div>
      </div>
    </div>
  )
}

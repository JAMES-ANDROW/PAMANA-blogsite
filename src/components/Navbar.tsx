'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useUser } from '@/hooks/useUser'
import LoginModal from './social/LoginModal'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { user, isAuthenticated, loading, signOut } = useUser()

  return (
    <nav className="sticky top-0 z-50 bg-heritage-light-beige border-b border-heritage-gold shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif font-bold text-2xl text-heritage-dark-brown">
              Pamana
            </span>
            <span className="hidden sm:inline text-sm text-heritage-brown font-light">
              Stories
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="font-sans text-heritage-dark-brown hover:text-heritage-gold transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="font-sans text-heritage-dark-brown hover:text-heritage-gold transition-colors duration-200"
            >
              Stories
            </Link>
            <Link
              href="/about"
              className="font-sans text-heritage-dark-brown hover:text-heritage-gold transition-colors duration-200"
            >
              About
            </Link>

            {isAuthenticated && user ? (
              <button
                onClick={() => {
                  void signOut()
                }}
                className="rounded-md border border-heritage-gold/60 px-3 py-1.5 font-sans text-xs font-semibold text-heritage-dark-brown hover:bg-heritage-beige"
              >
                Sign out
              </button>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                disabled={loading}
                className="rounded-md bg-heritage-dark-brown px-3 py-1.5 font-sans text-xs font-semibold text-heritage-light-beige hover:bg-heritage-gold hover:text-heritage-dark-brown disabled:opacity-70"
              >
                Sign in
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-heritage-dark-brown"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-2 text-heritage-dark-brown hover:bg-heritage-beige rounded transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="block px-4 py-2 text-heritage-dark-brown hover:bg-heritage-beige rounded transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Stories
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-heritage-dark-brown hover:bg-heritage-beige rounded transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>

            {isAuthenticated && user ? (
              <button
                onClick={() => {
                  setIsOpen(false)
                  void signOut()
                }}
                className="mt-2 w-full rounded-md border border-heritage-gold/60 px-4 py-2 text-left font-sans text-sm font-semibold text-heritage-dark-brown hover:bg-heritage-beige"
              >
                Sign out
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false)
                  setShowLoginModal(true)
                }}
                disabled={loading}
                className="mt-2 w-full rounded-md bg-heritage-dark-brown px-4 py-2 text-left font-sans text-sm font-semibold text-heritage-light-beige hover:bg-heritage-gold hover:text-heritage-dark-brown disabled:opacity-70"
              >
                Sign in
              </button>
            )}
          </nav>
        </div>

        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      </div>
    </nav>
  )
}

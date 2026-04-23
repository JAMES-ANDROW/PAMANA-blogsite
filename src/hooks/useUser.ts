'use client'

import { useAuthContext } from '@/components/auth/AuthProvider'

export function useUser() {
  const { user, session, loading, signInWithEmail, signOut } = useAuthContext()

  return {
    user,
    session,
    loading,
    isAuthenticated: !!user,
    signInWithEmail,
    signOut,
  }
}

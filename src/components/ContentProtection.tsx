'use client'

import { useEffect } from 'react'

export function ContentProtection() {
  useEffect(() => {
    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Prevent copy
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      return false
    }

    // Prevent paste
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault()
      return false
    }

    // Prevent cut
    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault()
      return false
    }

    // Prevent text selection on mousedown
    const handleMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT' || 
          (e.target as HTMLElement).tagName === 'TEXTAREA') {
        return
      }
      // Allow selection on form inputs, but prevent everywhere else
      if (e.detail > 1) {
        e.preventDefault()
      }
    }

    // Prevent keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + C (Copy)
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault()
        return false
      }
      // Ctrl/Cmd + V (Paste)
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        e.preventDefault()
        return false
      }
      // Ctrl/Cmd + X (Cut)
      if ((e.ctrlKey || e.metaKey) && e.key === 'x') {
        e.preventDefault()
        return false
      }
      // Ctrl/Cmd + A (Select All)
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault()
        return false
      }
    }

    document.addEventListener('contextmenu', handleContextMenu, false)
    document.addEventListener('copy', handleCopy, false)
    document.addEventListener('paste', handlePaste, false)
    document.addEventListener('cut', handleCut, false)
    document.addEventListener('mousedown', handleMouseDown, false)
    document.addEventListener('keydown', handleKeyDown, false)

    // Disable developer tools with F12 and Ctrl+Shift+I
    const handleF12 = (e: KeyboardEvent) => {
      if (e.key === 'F12') {
        e.preventDefault()
        return false
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault()
        return false
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault()
        return false
      }
    }

    document.addEventListener('keydown', handleF12, false)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, false)
      document.removeEventListener('copy', handleCopy, false)
      document.removeEventListener('paste', handlePaste, false)
      document.removeEventListener('cut', handleCut, false)
      document.removeEventListener('mousedown', handleMouseDown, false)
      document.removeEventListener('keydown', handleKeyDown, false)
      document.removeEventListener('keydown', handleF12, false)
    }
  }, [])

  return null
}

'use client'

import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delayMs?: number
  durationMs?: number
  distancePx?: number
  blurPx?: number
  startScale?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export default function ScrollReveal({
  children,
  className = '',
  delayMs = 0,
  durationMs = 800,
  distancePx = 32,
  blurPx = 6,
  startScale = 0.98,
  direction = 'up',
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const hiddenTranslate = {
    up: `translate3d(0, ${distancePx}px, 0)`,
    down: `translate3d(0, -${distancePx}px, 0)`,
    left: `translate3d(${distancePx}px, 0, 0)`,
    right: `translate3d(-${distancePx}px, 0, 0)`,
  }[direction]

  const style: CSSProperties = {
    transitionDelay: `${delayMs}ms`,
    transitionDuration: `${durationMs}ms`,
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? 'translate3d(0, 0, 0) scale(1)'
      : `${hiddenTranslate} scale(${startScale})`,
    filter: isVisible ? 'blur(0px)' : `blur(${blurPx}px)`,
  }

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
      }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className={`${className} transform-gpu transition-all ease-out will-change-transform will-change-opacity`}
      style={style}
    >
      {children}
    </div>
  )
}
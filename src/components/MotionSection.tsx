'use client'

import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'

interface MotionOrb {
  className: string
  startX: number
  endX: number
  startY: number
  endY: number
  startScale?: number
  endScale?: number
  opacity?: number
}

interface MotionSectionProps {
  children: ReactNode
  className?: string
  contentClassName?: string
  orbs?: MotionOrb[]
}

const defaultOrbs: MotionOrb[] = [
  {
    className: 'h-52 w-52 rounded-full bg-orange-300/30 blur-3xl',
    startX: -60,
    endX: 20,
    startY: 20,
    endY: -30,
    startScale: 1,
    endScale: 1.08,
  },
  {
    className: 'h-64 w-64 rounded-full bg-emerald-300/25 blur-3xl',
    startX: 80,
    endX: 10,
    startY: -40,
    endY: 40,
    startScale: 1,
    endScale: 1.05,
  },
]

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress
}

export default function MotionSection({
  children,
  className = '',
  contentClassName = 'w-full',
  orbs = defaultOrbs,
}: MotionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setProgress(0.5)
      return
    }

    let animationFrame = 0

    const updateProgress = () => {
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      // 0 when section begins entering; 1 near the moment it exits.
      const start = viewportHeight
      const end = -rect.height
      const raw = (start - rect.top) / (start - end)
      const clamped = Math.max(0, Math.min(1, raw))
      setProgress(clamped)
    }

    const onScroll = () => {
      cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      {orbs.map((orb, index) => {
        const x = lerp(orb.startX, orb.endX, progress)
        const y = lerp(orb.startY, orb.endY, progress)
        const scale = lerp(orb.startScale ?? 1, orb.endScale ?? 1.04, progress)

        const style: CSSProperties = {
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
          opacity: orb.opacity ?? 1,
        }

        return <div key={`${orb.className}-${index}`} className={`pointer-events-none absolute ${orb.className}`} style={style} />
      })}

      <div className={`relative z-10 ${contentClassName}`}>{children}</div>
    </section>
  )
}
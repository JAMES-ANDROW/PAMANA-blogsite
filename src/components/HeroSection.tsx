"use client"

import LikeButton from '@/components/social/LikeButton'

interface HeroSectionProps {
  title: string
  subtitle: string
  description: string
}

export default function HeroSection({
  title,
  subtitle,
  description,
}: HeroSectionProps) {
  return (
    <section className="w-full min-h-[70vh] bg-heritage-light-beige flex items-center justify-center px-4 py-10 sm:px-6">
      <div className="max-w-4xl mx-auto w-full text-center px-2 sm:px-4 py-6 sm:py-8">
        {/* Subtitle */}
        <p className="font-sans text-heritage-gold text-sm tracking-[0.2em] uppercase mb-4 font-medium">
          {subtitle}
        </p>

        {/* Title */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-heritage-dark-brown mb-6 leading-tight">
          {title}
        </h1>

        {/* Description */}
        <p className="font-sans text-base sm:text-lg text-heritage-brown leading-relaxed max-w-2xl mx-auto font-light">
          {description}
        </p>

        {/* Like this page button */}
        <div className="h-3" />
        <div className="mt-6 flex justify-center">
          <LikeButton
            postId="homepage"
            className="px-8 py-3 text-base gap-3 font-semibold"
            label="Like our Website"
          />
        </div>
      </div>
    </section>
  )
}

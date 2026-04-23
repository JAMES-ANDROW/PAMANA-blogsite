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
    <section className="min-h-[60vh] bg-gradient-to-b from-heritage-light-beige to-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Subtitle */}
        <p className="font-sans text-heritage-gold text-sm tracking-widest uppercase mb-4 font-light">
          {subtitle}
        </p>

        {/* Title */}
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-heritage-dark-brown mb-6 leading-tight">
          {title}
        </h1>

        {/* Description */}
        <p className="font-sans text-lg text-heritage-brown leading-relaxed max-w-xl mx-auto font-light">
          {description}
        </p>
      </div>
    </section>
  )
}

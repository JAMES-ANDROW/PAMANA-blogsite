import { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import { getAllBlogPosts } from '@/data/posts'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import MotionSection from '@/components/MotionSection'
import FeaturedStories from '@/components/FeaturedStories'

export const metadata: Metadata = {
  title: 'Pamana | Home',
  description:
    'Pamana: Through the Lens, Across Generations. Exploring cultural heritage and traditions through photography and storytelling.',
}

export default function Home() {
  const allPosts = getAllBlogPosts()

  return (
    <>
      {/* Hero Section - WITH BACKGROUND */}
      <div 
        className="relative w-full py-16 lg:min-h-screen lg:flex lg:items-center lg:justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/images/bgselect3.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Hue overlay with palette color and subtle blur */}
        <div className="absolute inset-0 backdrop-blur-sm bg-heritage-light-beige/30"></div>

        <MotionSection
          className="relative z-10 bg-transparent"
          contentClassName="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8"
          orbs={[]}
        >
          <ScrollReveal durationMs={1000} distancePx={40} blurPx={8}>
            <HeroSection
              subtitle="Pamana Stories"
              title="Through the Lens, Across Generations"
              description="A visual journey preserving cultural heritage, traditions, and meaningful places through original photography and narrative writing."
            />
          </ScrollReveal>
        </MotionSection>
      </div>

      {/* Featured Stories Section - PLAIN */}
      <MotionSection
        className="bg-white/60 py-16 lg:min-h-screen lg:flex lg:items-center"
        contentClassName="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8"
        orbs={[
          {
            className: '-left-16 top-14 h-44 w-44 rounded-full bg-heritage-gold/15 blur-3xl',
            startX: -50,
            endX: 30,
            startY: 20,
            endY: -30,
          },
          {
            className: 'right-0 bottom-12 h-52 w-52 rounded-full bg-heritage-beige/20 blur-3xl',
            startX: 90,
            endX: -10,
            startY: 20,
            endY: -40,
          },
        ]}
      >
        <FeaturedStories posts={allPosts} />
      </MotionSection>

      {/* Story Journey - WITH BACKGROUND */}
      <div 
        className="relative w-full py-16 lg:min-h-screen lg:flex lg:items-center lg:justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/images/bgselect1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Hue overlay with palette color and stronger blur for readability */}
        <div className="absolute inset-0 backdrop-blur-lg bg-heritage-beige/30"></div>

        <MotionSection
          className="relative z-10 bg-transparent"
          contentClassName="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8"
          orbs={[
            {
              className: 'left-0 top-10 h-44 w-44 rounded-full bg-heritage-gold/15 blur-3xl',
              startX: -70,
              endX: 10,
              startY: 20,
              endY: -10,
            },
            {
              className: 'right-10 top-16 h-48 w-48 rounded-full bg-white/20 blur-3xl',
              startX: 90,
              endX: -20,
              startY: -20,
              endY: 30,
            },
          ]}
        >
          <ScrollReveal className="text-center mb-10" direction="down" distancePx={22}>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-heritage-dark-brown mb-3">
              From Field Notes To Published Story
            </h2>
            <p className="font-sans text-white text-lg font-normal force-regular">
              A glimpse at how each Pamana story is crafted with care.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Observe',
                body: 'We spend time in places and communities, documenting moments with context and respect.',
              },
              {
                title: 'Translate',
                body: 'Photographs are paired with reflective writing that preserves meaning, not just aesthetics.',
              },
              {
                title: 'Share',
                body: 'Stories are published as living memory for readers, families, and future generations.',
              },
            ].map((step, index) => (
              <ScrollReveal
                key={step.title}
                delayMs={120 + index * 140}
                direction={index === 1 ? 'up' : index === 0 ? 'left' : 'right'}
                distancePx={30}
              >
                <article className="h-full rounded-2xl border border-heritage-gold bg-white/85 p-6 shadow-[0_10px_26px_rgba(107,68,35,0.12)]">
                  <p className="font-sans text-sm uppercase tracking-[0.18em] text-heritage-gold font-semibold mb-3">
                    Step {index + 1}
                  </p>
                  <h3 className="font-serif text-2xl text-heritage-dark-brown mb-3">{step.title}</h3>
                  <p className="font-sans text-heritage-brown font-light leading-relaxed">{step.body}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </MotionSection>
      </div>

      {/* Themes - PLAIN */}
      <MotionSection
        className="bg-heritage-light-beige/60 py-16 lg:min-h-screen lg:flex lg:items-center"
        contentClassName="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8"
        orbs={[
          {
            className: '-left-10 bottom-8 h-44 w-44 rounded-full bg-heritage-gold/15 blur-3xl',
            startX: -40,
            endX: 20,
            startY: 40,
            endY: -20,
          },
          {
            className: 'right-2 top-8 h-56 w-56 rounded-full bg-heritage-beige/20 blur-3xl',
            startX: 80,
            endX: -30,
            startY: -30,
            endY: 30,
          },
        ]}
      >
        <ScrollReveal className="text-center mb-10" direction="down" distancePx={24}>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-heritage-dark-brown mb-3">
            What You Will Find Here
          </h2>
          <p className="font-sans text-heritage-brown text-lg font-light">
            Stories rooted in place, people, and practices that shape identity.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Places That Hold Memory',
              body: 'Mountain villages, coastlines, markets, and homes where traditions are lived daily.',
              accent: 'bg-heritage-beige/90 border-heritage-gold',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-heritage-gold" aria-hidden="true">
                  <path d="M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M5 18V9l4 3 4-6 6 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
            },
            {
              title: 'Everyday Cultural Practice',
              body: 'Foodways, craft, rituals, and routines that quietly carry heritage across generations.',
              accent: 'bg-heritage-light-beige/90 border-heritage-brown',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-heritage-brown" aria-hidden="true">
                  <path d="M8 3v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M12 3v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M8 7h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M10 11v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M17 3c1.6 2.2 1.6 5.2 0 7.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M17 10.4V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ),
            },
            {
              title: 'Intergenerational Voices',
              body: 'Narratives that connect elders, youth, and communities through shared stories.',
              accent: 'bg-heritage-beige/90 border-heritage-gold',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-heritage-forest" aria-hidden="true">
                  <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="16" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M3.5 18c.8-2.2 2.5-3.3 4.5-3.3S11.7 15.8 12.5 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M11.5 18c.8-2.2 2.5-3.3 4.5-3.3s3.7 1.1 4.5 3.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ),
            },
            {
              title: 'Visual Storytelling',
              body: 'Original photography paired with writing that preserves context, emotion, and meaning.',
              accent: 'bg-heritage-light-beige/90 border-heritage-brown',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-heritage-dark-brown" aria-hidden="true">
                  <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="9" cy="11" r="1.8" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M6 17l4.2-3.5L13 16l2.8-2.4L18 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
            },
          ].map((theme, index) => (
            <ScrollReveal
              key={theme.title}
              delayMs={100 + index * 120}
              direction={index % 2 === 0 ? 'left' : 'right'}
              distancePx={28}
            >
              <article className={`h-full rounded-2xl border p-6 shadow-[0_10px_24px_rgba(107,68,35,0.12)] ${theme.accent}`}>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-heritage-light-beige border border-heritage-gold shadow-sm">
                  {theme.icon}
                </div>
                <h3 className="font-serif text-2xl text-heritage-dark-brown mb-3">{theme.title}</h3>
                <p className="font-sans text-heritage-brown leading-relaxed font-light">{theme.body}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </MotionSection>

      {/* About Preview - WITH BACKGROUND */}
      <div 
        className="relative w-full py-16 lg:min-h-screen lg:flex lg:items-center lg:justify-center overflow-hidden border-t border-b border-heritage-gold"
        style={{
          backgroundImage: 'url(/images/bgselect2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Hue overlay with palette color and stronger blur for readability */}
        <div className="absolute inset-0 backdrop-blur-lg bg-heritage-beige/30"></div>

        <MotionSection
          className="relative z-10 bg-transparent"
          contentClassName="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          orbs={[
            {
              className: '-right-16 bottom-0 h-48 w-48 rounded-full bg-heritage-gold/15 blur-3xl',
              startX: 60,
              endX: -10,
              startY: 10,
              endY: -40,
            },
            {
              className: 'left-0 top-1/2 h-40 w-40 rounded-full bg-white/20 blur-3xl',
              startX: -80,
              endX: 20,
              startY: -20,
              endY: 20,
            },
          ]}
        >
          <div className="max-w-3xl mx-auto p-12 rounded-2xl bg-heritage-light-beige/95 border border-heritage-gold shadow-[0_10px_30px_rgba(107,68,35,0.12)]">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-heritage-dark-brown mb-8">
              What is Pamana?
            </h2>
            <p className="font-sans text-lg text-heritage-brown mb-8 leading-relaxed">
              Pamana is a storytelling platform dedicated to preserving cultural identity through
              photography and narrative writing.
            </p>
            <p className="font-sans text-heritage-brown text-base mb-10 leading-loose">
              Each story connects us to our heritage, our people, and the generations who came before
              us. Through carefully curated images and reflective narratives, we explore what it means
              to belong, remember, and carry forward the legacy of our ancestors.
            </p>
            <Link
              href="/about"
              className="inline-block px-8 py-3 bg-heritage-dark-brown text-heritage-light-beige font-sans font-semibold rounded-lg shadow-md hover:bg-heritage-gold hover:text-heritage-dark-brown transition-colors"
            >
              Learn More About Our Mission →
            </Link>
          </div>
        </MotionSection>
      </div>
    </>
  )
}

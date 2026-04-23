import { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pamana | About',
  description:
    'Learn about Pamana: a storytelling platform preserving cultural heritage through photography and narrative writing across generations.',
}

export default function AboutPage() {
  return (
    <>
      <HeroSection
        subtitle="About Pamana"
        title="Through the Lens, Across Generations"
        description="Understanding the why and how behind our storytelling mission"
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Main Section */}
        <section>
          <h2 className="font-serif text-3xl font-bold text-heritage-dark-brown mb-6">
            What is Pamana?
          </h2>
          <p className="font-sans text-lg text-heritage-brown leading-relaxed font-light mb-4">
            Pamana is a digital storytelling platform dedicated to preserving cultural heritage
            through the intersection of photography and narrative writing. The word itself carries
            the weight of tradition—it means "legacy" or "heritage" in many Southeast Asian
            languages, making it a fitting name for a project centered on generational continuity.
          </p>
          <p className="font-sans text-lg text-heritage-brown leading-relaxed font-light">
            In a world of rapid globalization and cultural homogenization, Pamana exists as a
            counterforce—a space where stories matter, where images become memory, and where the
            lived experiences of communities are honored and preserved for those who come after us.
          </p>
        </section>

        {/* Divider */}
        <div className="h-px bg-heritage-gold"></div>

        {/* Mission */}
        <section>
          <h2 className="font-serif text-3xl font-bold text-heritage-dark-brown mb-6">
            Our Mission
          </h2>
          <p className="font-sans text-lg text-heritage-brown leading-relaxed font-light mb-4">
            To create a visual and narrative documentation of cultural heritage that serves multiple
            purposes simultaneously:
          </p>
          <ul className="space-y-4 ml-4">
            <li className="font-sans text-lg text-heritage-brown leading-relaxed font-light">
              <span className="text-heritage-gold font-semibold">Preservation:</span> To document
              traditions, practices, and places before they fade from collective memory.
            </li>
            <li className="font-sans text-lg text-heritage-brown leading-relaxed font-light">
              <span className="text-heritage-gold font-semibold">Connection:</span> To create
              bridges between generations—showing younger members of our community the richness of
              their heritage.
            </li>
            <li className="font-sans text-lg text-heritage-brown leading-relaxed font-light">
              <span className="text-heritage-gold font-semibold">Recognition:</span> To give voice
              to communities and traditions that are often overlooked or underrepresented.
            </li>
            <li className="font-sans text-lg text-heritage-brown leading-relaxed font-light">
              <span className="text-heritage-gold font-semibold">Reflection:</span> To encourage
              contemplation about who we are, where we come from, and what we choose to pass forward.
            </li>
          </ul>
        </section>

        {/* Divider */}
        <div className="h-px bg-heritage-gold"></div>

        {/* Storytelling Approach */}
        <section>
          <h2 className="font-serif text-3xl font-bold text-heritage-dark-brown mb-6">
            Our Storytelling Approach
          </h2>
          <p className="font-sans text-lg text-heritage-brown leading-relaxed font-light mb-6">
            Every story on Pamana is centered around <em>the image first</em>. Photography is the
            anchor—each photograph is chosen not for aesthetic perfection alone, but for its ability
            to capture a moment, a place, or a practice that matters. The narrative that follows
            serves to contextualize the image, to give it history and meaning.
          </p>
          <p className="font-sans text-lg text-heritage-brown leading-relaxed font-light">
            We believe in the power of specificity. Rather than broad generalizations, we focus on
            particular stories—a specific market, a specific fishing village, a specific mountain
            home. In the particular, the universal becomes visible. When we honor the details of one
            community's story, we honor all communities engaged in similar practices.
          </p>
        </section>

        {/* Divider */}
        <div className="h-px bg-heritage-gold"></div>

        {/* Design Philosophy */}
        <section>
          <h2 className="font-serif text-3xl font-bold text-heritage-dark-brown mb-6">
            Design Philosophy
          </h2>
          <p className="font-sans text-lg text-heritage-brown leading-relaxed font-light mb-4">
            The visual design of Pamana reflects our values. We use a heritage-inspired color
            palette—deep browns, warm beiges, muted golds, and forest greens. These colors evoke
            natural materials, earth, and timelessness. Typography balances serif fonts (Georgia,
            Garamond) for headings with clean sans-serif for body text, creating a sense of
            refinement and readability.
          </p>
          <p className="font-sans text-lg text-heritage-brown leading-relaxed font-light">
            There is intentional minimalism here. We strip away ornamental elements to let the
            stories—both image and text—shine. White space is generous. Images are given prominence.
            This is a design approach that respects both the viewer's attention and the subject
            matter we are presenting.
          </p>
        </section>

        {/* Divider */}
        <div className="h-px bg-heritage-gold"></div>

        {/* Content Standards */}
        <section>
          <h2 className="font-serif text-3xl font-bold text-heritage-dark-brown mb-6">
            Our Content Standards
          </h2>
          <p className="font-sans text-lg text-heritage-brown leading-relaxed font-light mb-4">
            Every image on Pamana is original. We do not use stock photography or downloaded
            images. Every photograph represents a genuine encounter with a place, a person, or a
            practice. Every story is reflective and narrative-driven, never transactional or
            commercialized.
          </p>
          <p className="font-sans text-lg text-heritage-brown leading-relaxed font-light">
            We focus on stories that reveal connection to heritage, tradition, and lived experience.
            Whether we are documenting a mountain village, a coastal fishing community, or a
            bustling market, every piece of content serves our core mission: to preserve, celebrate,
            and share cultural heritage across generations.
          </p>
        </section>

        {/* Divider */}
        <div className="h-px bg-heritage-gold"></div>

        {/* Call to Action */}
        <section className="text-center py-8">
          <p className="font-sans text-lg text-heritage-brown leading-relaxed font-light mb-6">
            Ready to explore the stories we have to share?
          </p>
          <Link
            href="/blog"
            className="inline-block px-8 py-3 bg-heritage-dark-brown text-heritage-light-beige font-sans font-semibold rounded hover:bg-heritage-gold hover:text-heritage-dark-brown transition-all duration-200"
          >
            Browse All Stories
          </Link>
        </section>
      </article>
    </>
  )
}

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-heritage-dark-brown text-heritage-light-beige border-t border-heritage-gold mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif font-bold text-xl mb-2">Pamana</h3>
            <p className="text-sm font-light">
              Through the Lens, Across Generations
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-heritage-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-heritage-gold transition-colors">
                  Stories
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-heritage-gold transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-serif font-semibold mb-4">About</h4>
            <p className="text-sm font-light">
              A storytelling platform preserving cultural heritage through photography and narrative writing.
            </p>
          </div>
        </div>

        <div className="border-t border-heritage-gold pt-8 text-center">
          <p className="text-sm font-light">
            © 2026 Pamana Stories. Created with WordPress.org.
          </p>
        </div>
      </div>
    </footer>
  )
}

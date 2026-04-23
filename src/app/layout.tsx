import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/components/auth/AuthProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pamana | Stories Through the Lens, Across Generations',
  description:
    'A storytelling platform showcasing cultural heritage, traditions, and meaningful places through original photography and narrative writing.',
  keywords: [
    'travel',
    'cultural heritage',
    'storytelling',
    'photography',
    'generations',
  ],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pamana-stories.vercel.app',
    title: 'Pamana | Stories Through the Lens',
    description:
      'A storytelling platform showcasing cultural heritage and traditions',
      images: [
      {
        url: 'https://pamana-stories.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pamana Stories',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}

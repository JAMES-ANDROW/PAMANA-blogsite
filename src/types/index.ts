export interface Image {
  src: string
  alt: string
  caption: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  likes: number
  category: 'place' | 'tradition' | 'community' | 'livelihood'
  featured_image: string
  images: Image[]
  story: string
  tags: string[]
}

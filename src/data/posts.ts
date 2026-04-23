import { BlogPost } from '@/types'

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'mountain-village-memories',
    title: 'Mountain Village Memories',
    excerpt:
      'A journey through misty peaks and ancestral homelands, where every stone holds generations of stories.',
    date: '2024-03-15',
    featured_image: '/images/placeholder-1.jpg',
    images: [
      {
        src: '/images/placeholder-1.jpg',
        alt: 'Mountain village landscape',
        caption: 'Dawn breaks over the valley where our ancestors first settled',
      },
      {
        src: '/images/placeholder-2.jpg',
        alt: 'Traditional architecture',
        caption: 'Stone houses built to withstand centuries of mountain winds',
      },
    ],
    story: `Standing at the edge of this mountain village, I feel the presence of those who came before. The weathered stones of the houses, the ancient trails worn smooth by countless footsteps—these are the threads that connect us across generations.

My grandmother once described this place as the heart of our heritage. She told stories of ancestors who built these homes with their own hands, who nurtured the land with respect and gratitude. Today, as I walk these paths, I understand what she meant.

The mountains teach us about patience, about endurance, about the beauty found in simplicity. In this village, time moves differently. The rhythm is set by seasons, by the cycles of planting and harvest, by the gathering of families around evening fires.

This journey has become a pilgrimage of sorts—not just across physical terrain, but through layers of family memory and cultural continuity. Every photograph I take is an act of preservation, a way of saying: these stories matter, these places matter, and the legacy of our people deserves to be seen and remembered.`,
    tags: ['heritage', 'mountains', 'generations', 'culture'],
  },
  {
    id: '2',
    slug: 'coastal-traditions',
    title: 'Coastal Traditions',
    excerpt:
      'Where ocean and tradition meet, fishermen carry forward centuries of knowledge in every cast of their nets.',
    date: '2024-02-28',
    featured_image: '/images/placeholder-3.jpg',
    images: [
      {
        src: '/images/placeholder-3.jpg',
        alt: 'Coastal sunrise',
        caption: 'The ocean at dawn, as it has greeted fishermen for centuries',
      },
      {
        src: '/images/placeholder-4.jpg',
        alt: 'Fishing boats',
        caption: 'Boats painted in colors passed down through family traditions',
      },
    ],
    story: `The coast has always been a place of stories. Here, where land meets sea, generations have lived in harmony with the tides, passing down knowledge that no school could teach.

I spent a morning with the fishermen of this small village, watching them prepare their boats with rituals unchanged for decades. Every knot tied, every prayer whispered, every gesture speaks of respect for the ocean and gratitude for its bounty.

What struck me most was the intergenerational conversation happening right before my eyes. Fathers instructing sons, grandfathers offering wisdom earned through decades on the water. This is how culture survives—not in museums or books, but in the steady hands of those who practice it daily.

The ocean reminds us that we are part of something vast and ancient. It teaches humility, respect, and the importance of working with nature rather than against it. In watching these fishermen, I witnessed a living heritage—vibrant, evolving, yet rooted in centuries-old principles.

This coast is not just a place; it is a repository of memory, and every person who works these waters is a keeper of the flame.`,
    tags: ['fishing', 'coast', 'tradition', 'livelihood'],
  },
  {
    id: '3',
    slug: 'market-rhythms',
    title: 'Market Rhythms',
    excerpt:
      'In the bustling heart of the city, an ancient market pulses with the energy of community and commerce.',
    date: '2024-02-10',
    featured_image: '/images/placeholder-5.jpg',
    images: [
      {
        src: '/images/placeholder-5.jpg',
        alt: 'Market colors',
        caption: 'Vibrant produce and textiles create a tapestry of cultural identity',
      },
      {
        src: '/images/placeholder-6.jpg',
        alt: 'Market vendors',
        caption: 'Vendors share space, stories, and wisdom earned through generations of trading',
      },
    ],
    story: `Markets are where culture comes alive in its most tangible form. Here, amidst the calls of vendors, the aroma of spices, and the swirl of humanity, I found the heartbeat of a community that has thrived for centuries.

This particular market was established by my great-grandparents' generation. It started as a small gathering place and has grown into a bustling hub where thousands converge daily. Yet despite its evolution, certain rhythms remain unchanged—the same vendors in the same spots, the same haggling rituals, the same stories exchanged over transactions.

I watched a young vendor learning the trade from her mother, who learned it from her mother. The knowledge being transmitted wasn't just about commerce; it was about understanding people, about building relationships, about the responsibility of being a custodian of a place that means so much to so many.

What makes a market matter is not just what is being sold, but the invisible threads of relationship and memory that bind it together. Here, every transaction is weighted with history. Every interaction is an echo of countless generations before us.

In preserving these images and stories, I hope to honor not just a place, but an entire way of being—one rooted in community, continuity, and the belief that commerce, at its heart, should be about connection.`,
    tags: ['market', 'commerce', 'community', 'urban'],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

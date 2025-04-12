type Tags = string[]

export interface HeroTitle {
  id: number
  slug: string
  title: string
  subtitle: string
  description: string
  img: string
}

export interface OngoingTitle {
  id: number
  slug: string
  title: string
  img: string
  tags: Tags
  rating: number
  description: string
}

export interface RecentVoiceover {
  id: number
  slug: string
  title: string
  description: string
  img: string
  createdAt: string
  episode: number
  tags: Tags
}

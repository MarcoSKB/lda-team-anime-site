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
  tags: string[]
  rating: number
  description: string
}

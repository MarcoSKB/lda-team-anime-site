type Tags = string[]

export interface AnimeBaseModel {
  id: number
  slug: string
  title: string
}

export interface HeroTitle extends AnimeBaseModel {
  subtitle: string
  description: string
  img: string
}

export interface OngoingTitle extends AnimeBaseModel {
  img: string
  tags: Tags
  rating: number
  description: string
}

export interface RecentVoiceover extends AnimeBaseModel {
  description: string
  img: string
  createdAt: string
  episode: number
  tags: Tags
}

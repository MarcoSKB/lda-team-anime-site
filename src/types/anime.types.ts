type Tags = string[]

type AnimeFormatType = 'TV-Сериал' | 'Полнометражка' | 'Короткометражка' | 'OVA'

type AnimeVoiceoverType = 'Дубляж' | 'Закадровая' | 'Субтитры'

interface AnimeBaseModel {
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

export interface CatalogTitle extends AnimeBaseModel {
  img: string
  voiceoverType: AnimeVoiceoverType
  format: AnimeFormatType
  tags: Tags
}

import { TrackProps } from '@vidstack/react'

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

export interface AnimeSearch extends AnimeBaseModel {
  img: string
  rating: number
  description: string
}

export interface AnimeEpisodes {
  id: number
  slug: string
  episodeList: AnimeEpisode[]
}

export interface AnimeEpisode {
  id: number
  title: string
  episodeNumber: number
  src: string
  poster: string
  posterAlt: string
  trackList: TrackProps[]
  thumbnails: string
}

interface AnimeScheduleItem {
  id: number
  title: string
  slug: string
  img: string
  season: number
  episode: number
}

type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export type AnimeScheduleList = Record<Weekday, AnimeScheduleItem[]>

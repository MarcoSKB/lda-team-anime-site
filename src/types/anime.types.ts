import { ImageResponse, ImageResponseMap } from './image.types'

type Tags = string[]

/**
 * Тип статуса:
 * - 0 → Онгоинг
 * - 1 → Завершен
 * - 2 → Анонс
 */
export type AnimeTitleStatus = 0 | 1 | 2

/**
 * Тип статуса:
 * - 0 → Дубляж
 * - 1 → Закадр
 */
export type AnimeVoiceoverType = 0 | 1

/**
 * Тип статуса:
 * - 0 → Обработка
 * - 1 → В процессе
 * - 2 → Готов
 * - 3 → Ошибка
 */
export type EpisodeStatus = 0 | 1 | 2 | 3

interface AnimeBaseModel {
  id: number
  slug: string
  title: string
}

export interface RecentVoiceover extends Omit<AnimeBaseModel, 'id'> {
  description: string
  img: string
  createdAt: string
  episode: number
  tags: Tags
  id: string
}

export interface CatalogTitle extends AnimeBaseModel {
  img: string
  voiceoverType: AnimeVoiceoverType
  format: string
  tags: Genre[]
}

export interface AnimeEpisodes {
  id: number
  slug: string
  episodeList: Omit<AnimeEpisode, 'titleId' | 'titleName' | 'progress'>[]
}

export interface AnimeEpisode {
  id: string
  slug: string
  name: string
  number: number
  status: number
  progress: number
  titleId: string
  titleName: string
  previewId: string | null
  previewUrl: string | null
  videoUrl: string
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

export interface AnimeTitle {
  id: string
  slug: string
  name: string
  media: string
  currentTitleStatus: AnimeTitleStatus
  currentVoiceoverType: AnimeVoiceoverType
  description: string
  episodes: AnimeEpisode[] | []
  episodesTotal: number
  genres: Genre[] | []
  images: ImageResponse[] | []
  rating: number
  ratingsCount: number
}

export interface ShortAnimeTitle {
  id: string
  slug: string
  name: string
  description: string
  currentTitleStatus: AnimeTitleStatus
  currentVoiceoverType: AnimeVoiceoverType
  genres: Genre[] | []
  poster: ImageResponseMap['4'] | null
  lastEpisodeCreatedAt: string
  createdAt: string
  episodesTotal: number
  rating: number
  likesCount: number
  dislikesCount: number
}

export interface BannerAnime {
  id: string
  slug: string
  name: string
  description: string
  createdAt: string
  currentTitleStatus: AnimeTitleStatus
  currentVoiceoverType: AnimeVoiceoverType
  genres: Genre[] | []
  banner: ImageResponseMap['5'] | null
  episodesTotal: number
  rating: number
}

export interface ApiBaseModel<T> {
  results: T
  totalCount: number
  count: number
}

export interface Genre {
  id: string
  name: string
}

export interface ScoreResponse {
  titleId: string
  rating: number
  ratingsCount: number
}

export interface GenresList extends Genre {
  titles: AnimeTitle[] | []
}

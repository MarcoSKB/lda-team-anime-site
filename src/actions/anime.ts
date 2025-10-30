'use server'

import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { ValidationError } from 'yup'

import {
  AnimeTitle,
  ApiBaseModel,
  BannerAnime,
  Genre,
  ScoreResponse,
  ShortAnimeTitle,
} from '@/types/anime.types'
import { Result } from '@/types/fetch.types'
import { auth } from '@/utils/auth'
import { API_BASE } from '@/utils/global-vars'
import { requireAuth } from '@/utils/system'

import { addGenreToTitle, getGenres, removeGenresFromTitle } from './genres'
import { editImage } from './image'

export const getPopularAnime = async (): Promise<
  Result<ApiBaseModel<BannerAnime[]>>
> => {
  try {
    const res = await fetch(`${API_BASE}/titles/latest/banner?skip=0&take=5`, {
      method: 'GET',
      next: { tags: ['anime', 'popular-anime'], revalidate: 3600 },
    })
    if (!res.ok) {
      throw new Error('Не удалось получить список баннеров')
    }

    const data = (await res.json()) as ApiBaseModel<BannerAnime[]>
    return {
      type: 'ok',
      data,
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        type: 'error',
        message: err.message,
      }
    }
  }
  return {
    type: 'error',
    message: 'Что то пошло не так',
  }
}

export const getOngoingTitles = async (): Promise<
  Result<ApiBaseModel<ShortAnimeTitle[]>>
> => {
  try {
    const res = await fetch(`${API_BASE}/titles?skip=${0}&take=${9}`, {
      method: 'GET',
      next: { tags: ['anime', 'ongoing-titles'], revalidate: 3600 },
    })
    if (!res.ok) {
      throw new Error('Не удалось получить данные')
    }

    const data = (await res.json()) as ApiBaseModel<ShortAnimeTitle[]>
    return {
      type: 'ok',
      data,
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        type: 'error',
        message: err.message,
      }
    }
    if (err instanceof ValidationError) {
      return {
        type: 'error',
        message: err.message,
      }
    }
  }
  return {
    type: 'error',
    message: 'Что то пошло не так',
  }
}

export const getRecentVoiceover = async (): Promise<
  Result<ApiBaseModel<ShortAnimeTitle[]>>
> => {
  try {
    const res = await fetch(`${API_BASE}/titles/latest?skip=0&take=5`, {
      method: 'GET',
      next: { tags: ['anime', 'recent-anime'], revalidate: 3600 },
    })
    if (!res.ok) {
      throw new Error('Не удалось получить данные')
    }

    const data = (await res.json()) as ApiBaseModel<ShortAnimeTitle[]>
    return {
      type: 'ok',
      data,
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        type: 'error',
        message: err.message,
      }
    }
  }
  return {
    type: 'error',
    message: 'Что то пошло не так',
  }
}

export const getCatalogList = async (searchParams: {
  [key: string]: string | string[] | undefined
}): Promise<Result<ApiBaseModel<ShortAnimeTitle[]>>> => {
  try {
    const params = {
      skip: searchParams.page ?? 0,
      take: searchParams.take ?? 20,
      Statuses: searchParams.status,
      GenreIds: searchParams.tags,
      VoiceoverTypes: searchParams.voiceover,
      MinEpisodes: searchParams['min-ep'],
      MaxEpisodes: searchParams['max-ep'],
      MinRating: searchParams['min-rating'],
      MaxRating: searchParams['max-rating'],
      SortTypes: searchParams.order,
    }

    const query = new URLSearchParams()

    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null || value === '') continue

      if (key == 'GenreIds' && typeof value === 'string') {
        const genres = await getGenres()
        if (genres.type == 'ok') {
          if (value.includes(',')) {
            value
              .split(',')
              .map((v) => genres.data.find((genre) => genre.name == v)?.id)
              .filter((v) => v !== undefined)
              .forEach((v) => query.append(key, String(v)))
          } else {
            const genreId = genres.data.find((genre) => genre.name == value)?.id
            if (genreId) {
              query.append(key, String(genreId))
            }
          }
        }
        continue
      }
      if (typeof value === 'string' && value.includes(',')) {
        value.split(',').forEach((v) => query.append(key, v))
        continue
      }
      if (Array.isArray(value)) {
        value.forEach((v) => query.append(key, String(v)))
        continue
      }
      if (key == 'skip') {
        query.append(key, String(value))
      }
      if (key == 'SortTypes') {
        const orders = [
          'a-z',
          'z-a',
          'episodes-asc',
          'episodes-desc',
          'popular-asc',
          'popular-desc',
        ]
        if (orders.findIndex((order) => order == value) >= 0) {
          query.append(key, String(orders.findIndex((order) => order == value)))
        }
        continue
      }
      query.append(key, String(value))
    }

    const res = await fetch(`${API_BASE}/titles?${query.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      next: { tags: ['anime', 'anime-catalog'], revalidate: 60 * 60 },
    })
    if (!res.ok) {
      throw new Error('Не удалось получить данные')
    }
    const data = (await res.json()) as ApiBaseModel<ShortAnimeTitle[]>
    return {
      type: 'ok',
      data,
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        type: 'error',
        message: err.message,
      }
    }
    if (err instanceof ValidationError) {
      return {
        type: 'error',
        message: err.message,
      }
    }
  }
  return {
    type: 'error',
    message: 'Что то пошло не так',
  }
}

export const getAnimeTitle = async (
  slug: string,
  revalidate: boolean = true,
): Promise<Result<AnimeTitle>> => {
  try {
    const res = await fetch(`${API_BASE}/titles/slug/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: revalidate ? 'force-cache' : 'no-cache',
      next: revalidate
        ? { tags: ['anime', 'anime-title'], revalidate: 60 * 60 }
        : undefined,
    })
    if (!res.ok) {
      if (res.status == 404) {
        redirect('/404')
      }
      throw new Error('Не удалось получить данные')
    }
    const data = (await res.json()) as AnimeTitle
    const episodes =
      data.episodes.length !== 0
        ? data.episodes
        : [
            {
              id: 'placeholder',
              number: 1,
              titleName: 'Эпизод не вышел',
              videoUrl: '',
              name: 'Эпизод не вышел',
              previewId: null,
              previewUrl: null,
              slug: 'episode-not-found',
              status: 0,
              progress: 0,
              titleId: '0',
            },
          ]
    return {
      type: 'ok',
      data: {
        ...data,
        episodes: episodes,
      },
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        type: 'error',
        message: err.message,
      }
    }
    return {
      type: 'error',
      message: 'Не удалось получить данные',
    }
  }
}

export const getScheduleList = async () => {
  //Revalidate 1 hour
  return []
}

export const searchAnime = async (
  search: string | null,
): Promise<Result<ApiBaseModel<ShortAnimeTitle[]>>> => {
  try {
    const res = await fetch(
      `${API_BASE}/titles/titles-by-name?name=${search}&skip=${0}&take=${5}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    if (!res.ok) {
      throw new Error('Не удалось получить данные')
    }
    const data = (await res.json()) as ApiBaseModel<ShortAnimeTitle[]>

    return {
      type: 'ok',
      data,
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        type: 'error',
        message: err.message,
      }
    }
    return {
      type: 'error',
      message: 'Не удалось получить данные',
    }
  }
}

export const deleteAnimeTitle = async (id: string): Promise<Result> => {
  try {
    const session = await auth()
    if (requireAuth(session, ['Admin'])) {
      const res = await fetch(`${API_BASE}/titles/id/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session!.accessToken}`,
        },
      })
      if (!res.ok) {
        if (res.status == 400)
          throw new Error(`Аниме с этим идентификатором не найден.`)
        throw new Error('Не удалось удалить')
      }
      revalidateTag('anime')
      return {
        type: 'ok',
        data: undefined,
      }
    } else {
      throw new Error('Нет доступа')
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        type: 'error',
        message: err.message,
      }
    }
  }
  return {
    type: 'error',
    message: 'Что то пошло не так',
  }
}

export const updateAnimeTitle = async ({
  id,
  name,
  episodesTotal,
  currentVoiceoverType,
  currentTitleStatus,
  description,
  currentGenres,
  newGenres,
  posterId,
  poster,
}: {
  id: string
  name: string
  episodesTotal: number
  currentVoiceoverType: number
  currentTitleStatus: number
  description: string
  currentGenres: Genre[]
  newGenres: Genre[]
  posterId?: string
  poster: File | string
}): Promise<Result> => {
  try {
    const session = await auth()
    if (requireAuth(session, ['Admin'])) {
      // AnimeTitle
      const res = await fetch(`${API_BASE}/titles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session!.accessToken}`,
        },
        body: JSON.stringify({
          name,
          episodesTotal,
          currentVoiceoverType,
          currentTitleStatus,
          description,
        }),
      })

      if (!res.ok) {
        if (res.status == 400)
          throw new Error(`Аниме с этим идентификатором не найден.`)
        throw new Error('Не удалось изменить данные')
      }

      if (poster instanceof File && posterId) {
        const imageRes = await editImage(
          poster,
          `Постер аниме ${name}`,
          '4',
          id,
          posterId,
        )
        if (imageRes.type == 'error') {
          throw new Error('Аниме обновлено, но не удалось изменить постер.')
        }
      }

      // Genres
      const newIds = newGenres.map((g) => g.id)
      const genresToRemove = currentGenres.filter((g) => !newIds.includes(g.id))
      if (genresToRemove.length > 0) {
        const resRemoveGenre = await removeGenresFromTitle({
          titleId: id,
          genres: genresToRemove,
        })

        if (resRemoveGenre.type == 'error') {
          throw new Error(
            'Аниме обновлено, но часть жанров не удалось удалить.',
          )
        }
      }

      const resAddGenre = await addGenreToTitle({
        titleId: id,
        genres: newGenres,
      })

      if (resAddGenre.type == 'error') {
        throw new Error('Аниме обновлено, но часть жанров не удалось добавить.')
      }

      revalidateTag('anime')
      return {
        type: 'ok',
        data: undefined,
      }
    } else {
      throw new Error('Нет доступа')
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        type: 'error',
        message: err.message,
      }
    }
  }
  return {
    type: 'error',
    message: 'Что то пошло не так',
  }
}

export const rateAnimeTitle = async (
  titleId: string,
  score: number,
): Promise<Result<ScoreResponse>> => {
  try {
    const session = await auth()
    if (!session) throw new Error('Не авторизован')

    const res = await fetch(
      `${API_BASE}/me/titles/rate/${titleId}?score=${score}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      },
    )
    if (!res.ok) throw new Error('Не удалось оценить')

    const data = (await res.json()) as ScoreResponse

    revalidateTag('anime-title')
    return {
      type: 'ok',
      data,
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        type: 'error',
        message: err.message,
      }
    }
  }
  return {
    type: 'error',
    message: 'Что то пошло не так',
  }
}

export const addViewEpisode = async (episodeId: string): Promise<Result> => {
  try {
    const res = await fetch(`${API_BASE}/statistics/episode/view/${episodeId}`)
    if (!res.ok) throw new Error('Не удалось добавить просмотр')
    return {
      type: 'ok',
      data: undefined,
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        type: 'error',
        message: err.message,
      }
    }
  }
  return {
    type: 'error',
    message: 'Что то пошло не так',
  }
}

'use server'

import { revalidateTag } from 'next/cache'

import { Genre, GenresList } from '@/types/anime.types'
import { Result } from '@/types/fetch.types'
import { auth } from '@/utils/auth'
import { API_BASE } from '@/utils/global-vars'
import { requireAuth } from '@/utils/system'

export const getGenres = async (): Promise<Result<GenresList[]>> => {
  try {
    const res = await fetch(`${API_BASE}/genres`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['anime-genres'], revalidate: 43200 },
    })
    if (!res.ok) {
      throw new Error('Не удалось получить данные')
    }
    const data = (await res.json()) as unknown as GenresList[]

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
    message: 'Нету доступа',
  }
}

export const addGenreToTitle = async ({
  titleId,
  genres,
}: {
  titleId: string
  genres: { name: string; id: string }[]
}): Promise<Result> => {
  try {
    const session = await auth()
    if (requireAuth(session, ['Admin'])) {
      const res = await fetch(`${API_BASE}/titles/${titleId}/genres`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session!.accessToken}`,
        },
        body: JSON.stringify(genres.map((genre) => genre.id)),
      })
      if (!res.ok) throw new Error('Не удалось добавить жанр к аниме')

      revalidateTag('anime')
      return {
        type: 'ok',
        data: undefined,
      }
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
    message: 'Нету доступа',
  }
}

export const removeGenresFromTitle = async ({
  titleId,
  genres,
}: {
  titleId: string
  genres: Genre[]
}): Promise<Result> => {
  try {
    const session = await auth()
    if (requireAuth(session, ['Admin'])) {
      const res = await fetch(`${API_BASE}/titles/${titleId}/genres`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session!.accessToken}`,
        },
        body: JSON.stringify(genres.map((genre) => genre.id)),
      })
      if (!res.ok) throw new Error('Не удалось удалить жанр из аниме')

      return {
        type: 'ok',
        data: undefined,
      }
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
    message: 'Нету доступа',
  }
}

export const createGenres = async (
  genres: string[],
): Promise<Result<Genre[]>> => {
  try {
    const session = await auth()
    if (requireAuth(session, ['Admin'])) {
      const res = await getGenres()
      if (res.type === 'error') {
        throw new Error('Не удалось создать жанры')
      }
      const existGenres = res.data.map((genre) =>
        genre.name.normalize('NFKC').trim().toLowerCase(),
      )
      const newGenres = genres
        .map((g) => g.normalize('NFKC').trim())
        .filter((g) => g.length > 0)
        .filter((g, i, arr) => arr.indexOf(g) === i)
        .filter((g) => !existGenres.includes(g.toLowerCase()))

      if (newGenres.length === 0) {
        return {
          type: 'error',
          message: 'Нет новых жанров для создания',
        }
      }

      const promises = newGenres.map((genre) =>
        fetch(`${API_BASE}/genres`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session!.accessToken}`,
          },
          body: JSON.stringify({ name: genre }),
        }),
      )
      const responses = await Promise.all(promises)
      for (const res of responses) {
        if (!res.ok) throw new Error('Не удалось создать жанры')
      }
      revalidateTag('anime-genres')
      const results = (await Promise.all(
        responses.map((res) => res.json()),
      )) as Genre[]

      return {
        type: 'ok',
        data: results,
      }
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
    message: 'Нету доступа',
  }
}

export const deleteGenres = async (genres: string[]): Promise<Result> => {
  try {
    const session = await auth()
    if (requireAuth(session, ['Admin'])) {
      const res = await getGenres()
      if (res.type === 'error') {
        throw new Error('Не удалось удалить жанры')
      }
      const allGenres = res.data
      const existingGenres = allGenres.filter((g) => genres.includes(g.name))

      if (existingGenres.length === 0) {
        return {
          type: 'error',
          message: 'Указанные жанры не найдены',
        }
      }

      const promises = existingGenres.map((genre) =>
        fetch(`${API_BASE}/genres/${genre.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session!.accessToken}`,
          },
        }),
      )
      const responses = await Promise.all(promises)
      for (const res of responses) {
        if (!res.ok) throw new Error('Не удалось удалить жанры')
      }
      revalidateTag('anime-genres')

      return {
        type: 'ok',
        data: undefined,
      }
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
    message: 'Нету доступа',
  }
}

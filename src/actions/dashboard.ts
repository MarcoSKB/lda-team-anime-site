'use server'

import { revalidateTag } from 'next/cache'

import { ValidationError } from 'yup'

import {
  AnimeEpisode,
  AnimeTitle,
  AnimeTitleStatus,
  ApiBaseModel,
} from '@/types/anime.types'
import { DashboardUser, OnlineGraph, Statistics } from '@/types/dashboard.types'
import { Result } from '@/types/fetch.types'
import { ImageType } from '@/types/image.types'
import { auth } from '@/utils/auth'
import { sendEmail } from '@/utils/email'
import { ANIME_VOICEOVER_TYPE, API_BASE } from '@/utils/global-vars'
import { requireAuth } from '@/utils/system'

import { editImage, uploadImage } from './image'

// Anime methods

export const getDashboardAnimeList = async (
  page: number = 0,
  take: number = 10,
): Promise<Result<ApiBaseModel<AnimeTitle[]>>> => {
  const skip = page * take
  try {
    const session = await auth()
    if (!session) throw new Error('Нет доступа')

    const res = await fetch(
      `${API_BASE}/admin/titles?skip=${skip}&take=${take}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session!.accessToken}`,
        },
        cache: 'no-store',
      },
    )
    if (!res.ok) {
      throw new Error('Не удалось получить данные')
    }
    const data = (await res.json()) as ApiBaseModel<AnimeTitle[]>
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
    type: 'ok',
    data: {
      count: 0,
      totalCount: 0,
      results: [],
    },
  }
}

export const createAnimeTitle = async ({
  imageFile,
  imageText,
  imageType,
  animeName,
  animeStatus,
  animeVoiceover,
  animeDescription,
  episodesTotal,
}: {
  imageFile: File
  imageText: string
  imageType: ImageType
  animeName: string
  animeStatus: AnimeTitleStatus
  animeVoiceover: (typeof ANIME_VOICEOVER_TYPE)[number]
  animeDescription: string
  episodesTotal: number
}): Promise<Result<AnimeTitle>> => {
  const session = await auth()
  if (requireAuth(session, ['Admin'])) {
    try {
      const res = await fetch(`${API_BASE}/titles/create-title`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session!.accessToken}`,
        },
        body: JSON.stringify({
          name: animeName,
          currentTitleStatus: +animeStatus,
          currentVoiceoverType: ANIME_VOICEOVER_TYPE.indexOf(animeVoiceover),
          description: animeDescription,
          episodesTotal,
        }),
      })
      if (!res.ok) {
        throw new Error('Не удалось создать аниме')
      }
      const data = (await res.json()) as AnimeTitle
      const imageResponse = await uploadImage(
        imageFile,
        imageText,
        imageType,
        data.id,
      )
      if (imageResponse.type == 'error') {
        await fetch(`${API_BASE}/titles/id/${data.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session!.accessToken}`,
          },
        })
        throw new Error(imageResponse.message)
      }

      revalidateTag('anime')
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
        message: 'Не удалось создать аниме',
      }
    }
  } else {
    return {
      type: 'error',
      message: 'Не авторизован',
    }
  }
}

export const createAnimeBanner = async ({
  titleId,
  description,
  image,
}: {
  titleId: string
  description: string
  image: File
}): Promise<Result> => {
  const session = await auth()
  if (requireAuth(session, ['Admin'])) {
    try {
      const res = await uploadImage(image, description, '5', titleId)
      if (res.type == 'error') {
        throw new Error(res.message)
      }
      revalidateTag('popular-anime')
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
      return {
        type: 'error',
        message: 'Не удалось создать баннер',
      }
    }
  } else {
    return {
      type: 'error',
      message: 'Не авторизован',
    }
  }
}

// Episode methods

export const addAnimeEpisode = async (
  video: File,
  titleId: string,
  episodeNumber: number,
  episodeName: string,
  episodeImage: File,
): Promise<Result<AnimeEpisode>> => {
  try {
    const session = await auth()
    if (requireAuth(session, ['Admin'])) {
      const formData = new FormData()
      formData.append('File', video)
      formData.append('Name', episodeName)
      formData.append('Number', episodeNumber.toString())
      formData.append('titleId', titleId)

      const res = await fetch(`${API_BASE}/episode/upload`, {
        headers: {
          Authorization: `Bearer ${session!.accessToken}`,
        },
        method: 'POST',
        body: formData,
      })
      if (!res.ok) {
        throw new Error('Не удалось отправить данные')
      }

      const data = (await res.json()) as AnimeEpisode
      const imageRes = await uploadImage(
        episodeImage,
        `Превью эпизода ${data.number}`,
        '2',
        data.id,
      )

      if (imageRes.type == 'error') {
        await deleteEpisode(data.id)
        throw new Error('Не удалось загрузить превью эпизода')
      }
      revalidateTag('anime')
      return {
        type: 'ok',
        data,
      }
    } else {
      return {
        type: 'error',
        message: 'Нет доступа',
      }
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
    message: 'Неизвестная ошибка',
  }
}

export const editAnimeEpisode = async ({
  episodeId,
  name,
  number,
  previewId,
  image,
}: {
  episodeId: string
  name: string
  number: string
  previewId: string | null
  image: File | string | undefined
}): Promise<Result> => {
  try {
    const session = await auth()
    if (requireAuth(session, ['Admin'])) {
      const res = await fetch(`${API_BASE}/episode/${episodeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session!.accessToken}`,
        },
        body: JSON.stringify({
          name,
          number,
        }),
      })
      if (!res.ok) {
        throw new Error('Не удалось изменить данные')
      }

      if (image instanceof File && previewId) {
        const imageRes = await editImage(
          image,
          `Превью эпизода ${number}`,
          '2',
          episodeId,
          previewId,
        )
        if (imageRes.type == 'error') {
          throw new Error(imageRes.message)
        }
      }

      revalidateTag('anime')
      return {
        type: 'ok',
        data: undefined,
      }
    } else {
      return {
        type: 'error',
        message: 'Нет доступа',
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
    message: 'Неизвестная ошибка',
  }
}

export const deleteEpisode = async (episodeId: string): Promise<Result> => {
  try {
    const session = await auth()
    if (requireAuth(session, ['Admin'])) {
      const res = await fetch(`${API_BASE}/episode/${episodeId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session!.accessToken}`,
        },
        cache: 'no-store',
      })
      if (!res.ok) {
        throw new Error('Не удалось удалить эпизод')
      }
      revalidateTag('anime')
      return {
        type: 'ok',
        data: undefined,
      }
    } else {
      return {
        type: 'error',
        message: 'Нет доступа',
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
    message: 'Неизвестная ошибка',
  }
}

// User methods

export const changeUserRole = async (
  userId: string,
  newRoles: string[],
): Promise<Result> => {
  const session = await auth()
  if (requireAuth(session, ['Admin'])) {
    try {
      const res = await fetch(`${API_BASE}/admin/${userId}/change-user-roles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session!.accessToken}`,
        },
        body: JSON.stringify([...newRoles]),
      })
      if (!res.ok) {
        throw new Error('Не удалось изменить роль')
      }
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
  } else {
    return {
      type: 'error',
      message: 'Нет доступа',
    }
  }
  return {
    type: 'error',
    message: 'Неизвестная ошибка',
  }
}

export const getUserList = async (
  page: number = 0,
  take: number = 10,
): Promise<Result<ApiBaseModel<DashboardUser[]>>> => {
  const session = await auth()
  if (requireAuth(session, ['Admin'])) {
    try {
      const skip = page * take
      const res = await fetch(
        `${API_BASE}/admin/users?skip=${skip}&take=${take}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session!.accessToken}`,
          },
          cache: 'no-store',
        },
      )
      if (!res.ok) {
        throw new Error('Не удалось получить данные')
      }
      const users = (await res.json()) as ApiBaseModel<DashboardUser[]>
      return {
        type: 'ok',
        data: users,
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
  } else {
    return {
      type: 'error',
      message: 'Нет доступа',
    }
  }
  return {
    type: 'error',
    message: 'Что то пошло не так',
  }
}

export const deleteUserAccount = async (
  userId: string,
  email: string,
): Promise<Result> => {
  try {
    const session = await auth()
    if (requireAuth(session, ['Admin'])) {
      const res = await fetch(`${API_BASE}/admin/user/id/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session!.accessToken}`,
        },
      })
      if (!res.ok) {
        throw new Error('Не удалось удалить аккаунт')
      }

      await sendEmail({
        to: email,
        subject: 'Ваш аккаунт был удалён',
        html: `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <h2>Ваш аккаунт был удалён</h2>
    <p>Здравствуйте,</p>
    <p>Это уведомление о том, что ваш аккаунт был удалён из системы <strong>LDA Team</strong>.</p>
    <p>Если это действие было выполнено по ошибке, пожалуйста, свяжитесь с нашей поддержкой, ответив на это письмо.</p>
    <br />
    <p>С уважением,<br/>Команда поддержки LDA Team</p>
    <hr />
    <small>Вы получили это письмо, потому что ваш аккаунт был связан с LDA Team.</small>
  </div>
  `,
      })

      return {
        type: 'ok',
        data: undefined,
      }
    } else {
      return {
        type: 'error',
        message: 'Нет доступа',
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
    type: 'ok',
    data: undefined,
  }
}

export const banUserAccount = async ({
  userId,
  reason,
  blockedUntil,
  isPermanent,
}: {
  userId: string
  reason: string
  blockedUntil: string
  isPermanent: boolean
}): Promise<Result> => {
  try {
    const session = await auth()
    if (requireAuth(session, ['Admin'])) {
      const res = await fetch(`${API_BASE}/admin/${userId}/ban`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session!.accessToken}`,
        },
        body: JSON.stringify({
          reason,
          blockedUntil,
          isPermanent,
        }),
      })
      if (!res.ok) {
        throw new Error('Не удалось заблокировать пользователя')
      }
      return {
        type: 'ok',
        data: undefined,
      }
    } else {
      return {
        type: 'error',
        message: 'Нет доступа',
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
    type: 'ok',
    data: undefined,
  }
}

export const unbanUserAccount = async (userId: string): Promise<Result> => {
  try {
    const session = await auth()
    if (requireAuth(session, ['Admin'])) {
      const res = await fetch(`${API_BASE}/admin/${userId}/unban`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session!.accessToken}`,
        },
      })
      if (!res.ok) {
        throw new Error('Не удалось разблокировать пользователя')
      }
      return {
        type: 'ok',
        data: undefined,
      }
    } else {
      return {
        type: 'error',
        message: 'Нет доступа',
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
    message: 'Что то пошло не так',
  }
}

// Analytics

export const getStatistics = async (): Promise<Result<Statistics>> => {
  const session = await auth()
  if (requireAuth(session, ['Admin'])) {
    try {
      const res = await fetch(`${API_BASE}/statistics/dashboard`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session!.accessToken}`,
        },
        cache: 'no-store',
      })
      if (!res.ok) {
        throw new Error('Не удалось получить данные')
      }
      const data = (await res.json()) as Statistics
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
  } else {
    return {
      type: 'error',
      message: 'Нет доступа',
    }
  }
  return {
    type: 'error',
    message: 'Что то пошло не так',
  }
}

export const getOnlineGraph = async (
  period: string = '90d',
): Promise<Result<OnlineGraph>> => {
  const session = await auth()
  if (requireAuth(session, ['Admin'])) {
    try {
      const res = await fetch(
        `${API_BASE}/statistics/online/trends?period=${period}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session!.accessToken}`,
          },
          cache: 'no-store',
        },
      )
      if (!res.ok) {
        throw new Error('Не удалось получить данные')
      }
      const data = (await res.json()) as OnlineGraph
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
  } else {
    return {
      type: 'error',
      message: 'Нет доступа',
    }
  }
  return {
    type: 'error',
    message: 'Что то пошло не так',
  }
}

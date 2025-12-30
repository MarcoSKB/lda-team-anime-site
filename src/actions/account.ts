'use server'

import { Session } from 'next-auth'
import { revalidateTag } from 'next/cache'

import { ValidationError } from 'yup'

import { profileInfoSchema, profilePassSchema } from '@/schemas/account.schema'
import {
  ChangePasswordType,
  ChangeProfileInfoType,
  GetUserInfo,
  UserInfo,
} from '@/types/account.types'
import { ApiBaseModel, ShortAnimeTitle } from '@/types/anime.types'
import { Result } from '@/types/fetch.types'
import { ImageResponse } from '@/types/image.types'
import { auth } from '@/utils/auth'
import { API_BASE } from '@/utils/global-vars'

export const getUserInfo = async (): Promise<Result<GetUserInfo>> => {
  try {
    const session = await auth()
    if (!session) throw new Error('Не авторизован')

    return {
      type: 'ok',
      data: {
        username: session.user.username,
        email: session.user.email,
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
      message: 'Что-то пошло не так',
    }
  }
}

export const changeProfileInfo = async (
  profileInfo: ChangeProfileInfoType,
): Promise<Result> => {
  try {
    await profileInfoSchema.validate(profileInfo)
    const session = await auth()
    if (!session) throw new Error('Не авторизован')
    const res = await fetch(`${API_BASE}/user/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        nickname: profileInfo.username,
        description: '',
      }),
    })

    if (!res.ok) {
      throw new Error('Не удалось изменить пароль')
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
    return {
      type: 'error',
      message: 'Что-то пошло не так',
    }
  }

  return {
    type: 'ok',
    data: undefined,
  }
}

export const changeUserAvatar = async ({
  image,
  altText,
}: {
  image: File
  altText: string
}) => {
  try {
    const session = await auth()
    if (!session) throw new Error('Не авторизован')
    const formData = new FormData()
    formData.append('file', image)
    formData.append('altText', altText)

    const res = await fetch(`${API_BASE}/me/avatar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: formData,
    })
    if (!res.ok) {
      throw new Error('Не удалось изменить аватарку')
    }
    revalidateTag('user-avatar')
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
    if (err instanceof ValidationError) {
      return {
        type: 'error',
        message: err.message,
      }
    }
    return {
      type: 'error',
      message: 'Что-то пошло не так',
    }
  }
}

export const getUserAvatar = async (): Promise<Result<ImageResponse>> => {
  try {
    const session = await auth()
    if (!session) throw new Error('Не авторизован')

    const res = await fetch(`${API_BASE}/me/avatar`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      next: { tags: ['user-avatar'], revalidate: 3600 },
    })
    if (!res.ok) {
      throw new Error('Не удалось получить аватарку')
    }
    const data = (await res.json()) as ImageResponse
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
    return {
      type: 'error',
      message: 'Что-то пошло не так',
    }
  }
}

export const changePassword = async (
  profilePassword: ChangePasswordType,
): Promise<Result> => {
  try {
    await profilePassSchema.validate(profilePassword)
    const session = await auth()
    if (!session) throw new Error('Не авторизован')
    const res = await fetch(`${API_BASE}/user/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        currentPassword: profilePassword.password,
        newPassword: profilePassword.newPassword,
      }),
    })

    if (!res.ok) {
      if (res.status == 400) throw new Error('Не верные данные')
      throw new Error('Не удалось изменить пароль')
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
    return {
      type: 'error',
      message: 'Что-то пошло не так',
    }
  }
  return {
    type: 'ok',
    data: undefined,
  }
}

export const getUserFavoriteTitles = async (): Promise<
  Result<ApiBaseModel<ShortAnimeTitle[]>>
> => {
  try {
    const session = await auth()
    if (!session) throw new Error('Не авторизован')

    const res = await fetch(`${API_BASE}/me/titles/favorites`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      next: { tags: ['favorite-anime-list'], revalidate: 60 * 60 },
    })
    if (!res.ok) {
      const data = await res.json()
      if (data.error === 'access_denied') {
        throw new Error('access_denied')
      }
      throw new Error('Не удалось получить избранное')
    }
    const userFavoriteLists = (await res.json()) as ApiBaseModel<
      ShortAnimeTitle[]
    >
    return {
      type: 'ok',
      data: userFavoriteLists,
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
      message: 'Что-то пошло не так',
    }
  }
}

export const checkUserFavoriteTitle = async (
  titleId: string,
): Promise<Result<boolean>> => {
  try {
    const favoritesRes = await getUserFavoriteTitles()
    if (favoritesRes.type == 'error') {
      throw new Error('Ошибка при получении избранных тайтлов')
    }
    const favoriteList = favoritesRes.data.results
    return {
      type: 'ok',
      data: !!favoriteList.find((title) => title.id == titleId),
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        type: 'error',
        message: error.message,
      }
    }
    return {
      type: 'error',
      message: 'Произошла какая та ошибка',
    }
  }
}

export const changeFavoriteTitle = async (
  titleId: string,
): Promise<Result<boolean>> => {
  try {
    const session = await auth()
    if (!session) throw new Error('Не авторизован')

    const res = await fetch(
      `${API_BASE}/me/titles/favorites/${titleId}/toggle`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      },
    )
    if (!res.ok) {
      throw new Error('Не удалось изменить избранное у пользователя')
    }
    const data = (await res.json()) as {
      added: boolean
    }

    revalidateTag('favorite-anime-list')
    return {
      type: 'ok',
      data: data.added,
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
      message: 'Что-то пошло не так',
    }
  }
}

export const getUserFullInfo = async (
  session: Session,
): Promise<Result<UserInfo>> => {
  try {
    const res = await fetch(`${API_BASE}/user/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    if (!res.ok) throw new Error('Произошла какая та ошибка')
    const data = (await await res.json()) as UserInfo
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
    if (typeof err == 'string') {
      return {
        type: 'error',
        message: err,
      }
    }
  }
  return {
    type: 'error',
    message: 'Что то пошло не так',
  }
}

export const verifyAccount = async (
  email: string,
  token: string,
): Promise<Result> => {
  try {
    const res = await fetch(`${API_BASE}/auth/activate-and-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        token,
      }),
    })
    if (!res.ok) throw new Error('Не удалось потвердить аккаунт')

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
      message: 'Что то пошло не так',
    }
  }
}

export const getUserWatchedTitles = async (): Promise<
  Result<ApiBaseModel<ShortAnimeTitle[]>>
> => {
  try {
    const session = await auth()
    if (!session) throw new Error('Не авторизован')

    const res = await fetch(`${API_BASE}/me/titles/watched`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      next: { tags: ['watched-anime-list'], revalidate: 60 * 60 },
    })
    if (!res.ok) {
      const data = await res.json()
      if (data.error === 'access_denied') {
        throw new Error('access_denied')
      }
      throw new Error('Не удалось получить просмотренное')
    }
    const userWatchedLists = (await res.json()) as ApiBaseModel<
      ShortAnimeTitle[]
    >
    return {
      type: 'ok',
      data: userWatchedLists,
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
      message: 'Что-то пошло не так',
    }
  }
}

export const changeWatchedTitle = async (
  titleId: string,
): Promise<Result<boolean>> => {
  try {
    const session = await auth()
    if (!session) throw new Error('Не авторизован')

    const res = await fetch(`${API_BASE}/me/titles/watched/${titleId}/toggle`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    if (!res.ok) {
      throw new Error('Не удалось изменить просмотренное у пользователя')
    }
    const data = (await res.json()) as {
      added: boolean
    }

    revalidateTag('watched-anime-list')
    return {
      type: 'ok',
      data: data.added,
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
      message: 'Что-то пошло не так',
    }
  }
}

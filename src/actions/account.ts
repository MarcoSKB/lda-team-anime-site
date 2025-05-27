'use server'

import { cookies } from 'next/headers'

import {
  ChangePasswordType,
  ChangeProfileInfoType,
  GetUserInfo,
} from '@/types/account.types'
import { Result } from '@/types/fetch.types'
import { ValidationError } from 'yup'

import { profileInfoSchema } from '@/schemas/account.schema'
import { auth } from '@/utils/auth'
import { sleep } from '@/utils/system'

export const getUserInfo = async (): Promise<Result<GetUserInfo>> => {
  try {
    const session = await auth()
    if (!session) throw new Error('Не авторизован')

    return {
      type: 'ok',
      data: {
        username: session.user.username,
        email: session.user.email,
        birthday: session.user.birthday,
      },
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

export const changeProfileInfo = async (
  profileInfo: ChangeProfileInfoType,
): Promise<Result> => {
  try {
    await profileInfoSchema.validate(profileInfo)
    const session = await auth()
    if (!session) throw new Error('Не авторизован')
    // Fetch
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

export const changePassword = async (
  profilePassword: ChangePasswordType,
): Promise<Result> => {
  try {
    await sleep(3000)
    await profileInfoSchema.validate(profilePassword)
    const session = await auth()
    if (!session) throw new Error('Не авторизован')
    // Fetch
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

export const changeAccountTheme = async (
  theme: 'Dark' | 'Light',
): Promise<Result> => {
  try {
    const cookieStore = await cookies()
    const lastChange = cookieStore.get('theme_change')

    const now = Date.now()
    const cooldown = 5_000

    if (lastChange && now - parseInt(lastChange.value) < cooldown) {
      throw new Error('Подожди немного перед повторным изменением.')
    }

    cookieStore.set('theme_change', now.toString(), {
      maxAge: 60,
      path: '/',
    })

    await sleep(3000)
    // Check is Auth
    // Fetch to change theme on db
    console.log(theme)
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
  return {
    type: 'ok',
    data: undefined,
  }
}

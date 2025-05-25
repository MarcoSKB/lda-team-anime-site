'use server'

import { cookies } from 'next/headers'

import {
  ChangePasswordType,
  ChangeProfileInfoType,
  GetUserInfo,
  UserType,
} from '@/types/account.types'
import { Result } from '@/types/fetch.types'
import { ValidationError } from 'yup'

import { profileInfoSchema } from '@/schemas/account.schema'
import { sleep } from '@/utils/system'

export const getUser = async (): Promise<Result<UserType>> => {
  try {
    await sleep(3000)
    // Fetch
    return {
      type: 'ok',
      data: {
        username: 'Marco',
        email: 'Marco@marco.com',
        permission: 'admin',
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

export const getUserInfo = async (): Promise<Result<GetUserInfo>> => {
  try {
    await sleep(3000)
    // Fetch
    return {
      type: 'ok',
      data: {
        username: 'User name',
        email: 'somemail@mail.ru',
        birthday: undefined,
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
    await sleep(3000)
    await profileInfoSchema.validate(profileInfo)
    // Check is Auth
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
    // Check is Auth
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

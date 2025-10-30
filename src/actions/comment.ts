'use server'

import { revalidateTag } from 'next/cache'

import { ApiBaseModel } from '@/types/anime.types'
import { CommentType } from '@/types/comment.types'
import { Result } from '@/types/fetch.types'
import { auth } from '@/utils/auth'
import { API_BASE } from '@/utils/global-vars'

export const sendComment = async ({
  text,
  titleId,
  createdAt,
  parentId,
}: {
  text: string
  titleId: string
  createdAt: string
  parentId?: string
}): Promise<Result<CommentType>> => {
  try {
    const session = await auth()
    if (!session) throw new Error('Не авторизован')
    const res = await fetch(`${API_BASE}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        text,
        titleId,
        createdAt,
        parentId,
      }),
    })
    if (!res.ok) {
      throw new Error('Не удалось отправить комментарий')
    }
    revalidateTag('comments')
    const data = (await res.json()) as CommentType
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
    message: 'Что то пошло не так.',
  }
}

export const getComments = async (
  slug: string,
): Promise<Result<ApiBaseModel<CommentType[]>>> => {
  try {
    const session = await auth()

    const res = await fetch(
      `${API_BASE}/comments/title/${slug}?skip=0&take=999&sortType=3`,
      {
        headers: { Authorization: `Bearer ${session!.accessToken}` },
        next: { tags: ['comments'], revalidate: 60 },
      },
    )
    if (!res.ok) {
      throw new Error('Не удалось получить комментарии')
    }
    const data = (await res.json()) as ApiBaseModel<CommentType[]>
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

export const likeComment = async (
  commentId: string,
): Promise<Result<CommentType>> => {
  try {
    const session = await auth()
    if (!session) throw new Error('Не авторизован')

    const res = await fetch(`${API_BASE}/comments/${commentId}/like`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${session.accessToken}` },
    })
    if (!res.ok) {
      throw new Error('Не удалось лайкнуть комментарии')
    }

    const commentRes = await fetch(`${API_BASE}/comments/id/${commentId}`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    })

    if (!commentRes.ok) {
      throw new Error('Не удалось получить обновленный комментарий')
    }

    revalidateTag('comments')
    const data = (await commentRes.json()) as CommentType
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

export const dislikeComment = async (
  commentId: string,
): Promise<Result<CommentType>> => {
  try {
    const session = await auth()
    if (!session) throw new Error('Не авторизован')

    const res = await fetch(`${API_BASE}/comments/${commentId}/dislike`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${session.accessToken}` },
    })
    if (!res.ok) {
      throw new Error('Не удалось дизлайкнуть комментарии')
    }

    const commentRes = await fetch(`${API_BASE}/comments/id/${commentId}`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    })

    if (!commentRes.ok) {
      throw new Error('Не удалось получить обновленный комментарий')
    }

    revalidateTag('comments')
    const data = (await commentRes.json()) as CommentType
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

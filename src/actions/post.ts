'use server'

import { revalidateTag } from 'next/cache'

import { ValidationError } from 'yup'

import { ApiBaseModel } from '@/types/anime.types'
import { Result } from '@/types/fetch.types'
import { Post, PostTypes } from '@/types/post.types'
import { auth } from '@/utils/auth'
import { API_BASE } from '@/utils/global-vars'

export const getPostPreviewList = async (
  skip: number = 0,
  take: number = 5,
  toRevalidate: boolean = true,
): Promise<Result<ApiBaseModel<Post[]>>> => {
  try {
    const res = await fetch(`${API_BASE}/posts?skip=${skip}&take=${take}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: toRevalidate ? ['post-preview'] : undefined,
        revalidate: toRevalidate ? 3600 : undefined,
      },
    })
    if (!res.ok) {
      throw new Error('Не удалось получить посты')
    }
    const data = (await res.json()) as ApiBaseModel<Post[]>
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

export const getPost = async (postSlug: string): Promise<Result<Post>> => {
  try {
    const session = await auth()
    if (!session) throw new Error('Не авторизован')

    const res = await fetch(`${API_BASE}/posts/slug/${postSlug}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      next: { tags: [`post`], revalidate: 86400 },
    })
    if (!res.ok) throw new Error('Не удалось получить пост')
    const data = await res.json()

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

export const createPost = async ({
  title,
  postType,
  description,
  content,
}: {
  title: string
  postType: PostTypes
  description: string
  content: string
}): Promise<Result<Post>> => {
  try {
    const session = await auth()
    if (!session) throw new Error('Не авторизован')

    const res = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        postType,
        description,
        content,
      }),
    })
    if (!res.ok) {
      throw new Error('Не удалось создать пост')
    }
    revalidateTag('post-preview')
    return {
      type: 'ok',
      data: await res.json(),
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

export const deletePost = async (postId: string) => {
  try {
    const session = await auth()
    if (!session) throw new Error('Не авторизован')

    const res = await fetch(`${API_BASE}/posts/${postId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${session.accessToken}` },
    })
    if (!res.ok) {
      throw new Error('Не удалось удалить пост')
    }
    revalidateTag('post-preview')
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

export const editPost = async ({
  id,
  title,
  postType,
  description,
  content,
}: {
  id: string
  title: string
  postType: PostTypes
  description: string
  content: string
}): Promise<Result> => {
  try {
    const session = await auth()
    if (!session) throw new Error('Не авторизован')

    const res = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        title,
        postType,
        description,
        content,
      }),
    })
    if (!res.ok) {
      throw new Error('Не удалось изменить пост')
    }
    revalidateTag('post-preview')
    revalidateTag('post')
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

// export const sendCheck = async () => {
//   sendEmail({
//     to: 'test-5bywqyfsg@srv1.mail-tester.com',
//     subject: 'Ваш аккаунт был удалён',
//     html: `
//   <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
//     <h2>Ваш аккаунт был удалён</h2>
//     <p>Здравствуйте,</p>
//     <p>Это уведомление о том, что ваш аккаунт был удалён из системы <strong>LDA Team</strong>.</p>
//     <p>Если это действие было выполнено по ошибке, пожалуйста, свяжитесь с нашей поддержкой, ответив на это письмо.</p>
//     <br />
//     <p>С уважением,<br/>Команда поддержки LDA Team</p>
//     <hr />
//     <small>Вы получили это письмо, потому что ваш аккаунт был связан с LDA Team.</small>
//   </div>
//   `,
//   })
// }

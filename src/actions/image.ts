'use server'

import { Result } from '@/types/fetch.types'
import { ImageResponseMap, ImageType } from '@/types/image.types'
import { auth } from '@/utils/auth'
import { API_BASE } from '@/utils/global-vars'

export const uploadImage = async <T extends ImageType>(
  image: File,
  altText: string,
  imageType: T,
  id: string,
): Promise<Result<ImageResponseMap[T]>> => {
  const formData = new FormData()
  formData.append('file', image)
  formData.append('altText', altText)
  formData.append('imageType', imageType)
  if (imageType == '1' && id) {
    formData.append('titleId', id)
  }
  if (imageType == '2' && id) {
    formData.append('episodeId', id)
  }
  if (imageType == '3' && id) {
    formData.append('userId', id)
  }
  if (imageType == '4' && id) {
    formData.append('titleId', id)
  }
  if (imageType == '5' && id) {
    formData.append('titleId', id)
  }
  if (imageType == '6' && id) {
    formData.append('postId', id)
  }
  try {
    const session = await auth()
    if (!session) throw new Error('Не авторизован')
    const res = await fetch(`${API_BASE}/images/add-image`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      method: 'POST',
      body: formData,
    })
    if (!res.ok) {
      throw new Error('Не удалось создать изображение')
    }
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
    return {
      type: 'error',
      message: 'Не удалось создать изображение',
    }
  }
}

export const editImage = async <T extends ImageType>(
  image: File,
  altText: string,
  imageType: T,
  id: string,
  imageId: string,
): Promise<Result<ImageResponseMap[T]>> => {
  const formData = new FormData()
  formData.append('file', image)
  formData.append('altText', altText)
  formData.append('imageType', imageType)
  if (imageType == '1' && id) {
    formData.append('titleId', id)
  }
  if (imageType == '2' && id) {
    formData.append('episodeId', id)
  }
  if (imageType == '3' && id) {
    formData.append('userId', id)
  }
  if (imageType == '4' && id) {
    formData.append('titleId', id)
  }
  if (imageType == '5' && id) {
    formData.append('titleId', id)
  }
  if (imageType == '6' && id) {
    formData.append('postId', id)
  }
  try {
    const session = await auth()
    if (!session) throw new Error('Не авторизован')
    const res = await fetch(`${API_BASE}/images/${imageId}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      method: 'PUT',
      body: formData,
    })
    if (!res.ok) {
      throw new Error('Не удалось создать изображение')
    }
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
    return {
      type: 'error',
      message: 'Не удалось создать изображение',
    }
  }
}

export const deleteImage = async (imageId: string): Promise<Result> => {
  try {
    const session = await auth()
    if (!session) throw new Error('Не авторизован')

    const res = await fetch(`${API_BASE}/images/id/${imageId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    if (!res.ok) {
      throw new Error('Не удалось удалить изображение')
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
    return {
      type: 'error',
      message: 'Не удалось удалить изображение',
    }
  }
}

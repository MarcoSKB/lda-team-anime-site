import * as yup from 'yup'

import {
  ANIME_VOICEOVER_TYPE,
  ERROR_MESSAGES,
  MAX_FILE_SIZE,
  MAX_VIDEO_SIZE,
} from '@/utils/global-vars'

export const createAnimeSchema = yup.object({
  title: yup
    .string()
    .min(5, ERROR_MESSAGES.min(5))
    .required(ERROR_MESSAGES.required),
  description: yup
    .string()
    .min(20, ERROR_MESSAGES.min(20))
    .required(ERROR_MESSAGES.required),
  tags: yup
    .array()
    .of(
      yup.object({
        id: yup.string().required('ID обязателен'),
        name: yup.string().required('Имя обязательно'),
      }),
    )
    .required(ERROR_MESSAGES.required),
  image: yup
    .mixed<File>()
    .required('Добавьте изображение')
    .test('file-or-url', 'Добавьте изображение', (value) => {
      if (value instanceof File) return value.size > 0
      return false
    })
    .test('is-valid-type', 'Недопустимый тип изображения', (value) => {
      if (!(value instanceof File)) return false
      return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
        value.type,
      )
    })
    .test(
      'is-valid-size',
      `Максимально допустимый размер - ${MAX_FILE_SIZE / (1024 * 1024)} МБ`,
      (value) => {
        if (!(value instanceof File)) return false
        return value.size <= MAX_FILE_SIZE
      },
    ),
  status: yup.string().required(ERROR_MESSAGES.required),
  voiceover: yup
    .mixed<(typeof ANIME_VOICEOVER_TYPE)[number]>()
    .oneOf(ANIME_VOICEOVER_TYPE, 'Недопустимый тип озвучки')
    .required('Выберите тип озвучки'),
  episodesQtty: yup
    .number()
    .typeError('Введите число')
    .min(1, ERROR_MESSAGES.minEpisode(1))
    .required(ERROR_MESSAGES.required),
  bannerDescription: yup
    .string()
    .min(20, ERROR_MESSAGES.min(20))
    .max(500, ERROR_MESSAGES.max(500))
    .required(ERROR_MESSAGES.required),
  banner: yup
    .mixed<File>()
    .required('Добавьте изображение')
    .test('file-or-url', 'Добавьте изображение', (value) => {
      if (value instanceof File) return value.size > 0
      return false
    })
    .test('is-valid-type', 'Недопустимый тип изображения', (value) => {
      if (!(value instanceof File)) return false
      return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
        value.type,
      )
    })
    .test(
      'is-valid-size',
      `Максимально допустимый размер - ${MAX_FILE_SIZE / (1024 * 1024)} МБ`,
      (value) => {
        if (!(value instanceof File)) return false
        return value.size <= MAX_FILE_SIZE
      },
    ),
})

export type CreateAnimeType = yup.InferType<typeof createAnimeSchema>

export const editAnimeSchema = yup.object({
  title: yup
    .string()
    .min(5, ERROR_MESSAGES.min(5))
    .required(ERROR_MESSAGES.required),
  description: yup
    .string()
    .min(20, ERROR_MESSAGES.min(20))
    .required(ERROR_MESSAGES.required),
  tags: yup
    .array()
    .of(
      yup.object({
        id: yup.string().required('ID обязателен'),
        name: yup.string().required('Имя обязательно'),
      }),
    )
    .required(ERROR_MESSAGES.required),
  image: yup
    .mixed<File | string>()
    .required('Добавьте изображение')
    .test('file-or-url', 'Добавьте изображение', (value) => {
      // если это строка (URL) — ок
      if (typeof value === 'string') return true
      // если это File — ок, если есть размер
      if (value instanceof File) return value.size > 0
      // если ничего нет
      return false
    })
    .test('is-valid-type', 'Недопустимый тип изображения', (value) => {
      if (typeof value === 'string') return true // URL — пропускаем
      if (!(value instanceof File)) return false
      return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
        value.type,
      )
    })
    .test(
      'is-valid-size',
      `Максимально допустимый размер - ${MAX_FILE_SIZE / (1024 * 1024)} МБ`,
      (value) => {
        if (typeof value === 'string') return true // URL — пропускаем
        if (!(value instanceof File)) return false
        return value.size <= MAX_FILE_SIZE
      },
    ),
  status: yup.string().required(ERROR_MESSAGES.required),
  voiceover: yup
    .number()
    .oneOf(
      ANIME_VOICEOVER_TYPE.map((_, i) => i),
      'Недопустимый тип озвучки',
    )
    .required('Выберите тип озвучки'),
  // releaseDate: yup.string(),
  episodesQtty: yup
    .number()
    .typeError('Введите число')
    .min(1, ERROR_MESSAGES.minEpisode(1))
    .required(ERROR_MESSAGES.required),
})

export type EditAnimeType = yup.InferType<typeof editAnimeSchema>

export const bannerAnimeSchema = yup.object({
  description: yup
    .string()
    .min(20, ERROR_MESSAGES.min(20))
    .max(500, ERROR_MESSAGES.max(500))
    .required(ERROR_MESSAGES.required),
  image: yup
    .mixed<FileList>()
    .test('is-valid-type', 'Недопустимый тип изображения', (fileList) => {
      if (!fileList || fileList.length === 0) return false
      return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
        fileList[0].type,
      )
    })
    .test(
      'is-valid-size',
      `Максимально допустимый размер - ${MAX_FILE_SIZE / (1024 * 1024)} МБ`,
      (fileList) => {
        if (!fileList || fileList.length === 0) return false
        return fileList[0].size <= MAX_FILE_SIZE
      },
    )
    .required(ERROR_MESSAGES.required),
})

export type BannerAnimeType = yup.InferType<typeof bannerAnimeSchema>

export const animeSeriesSchema = yup.object({
  title: yup.string().required(ERROR_MESSAGES.required),
  episodeNumber: yup
    .number()
    .typeError('Введите число')
    .min(1, ERROR_MESSAGES.minEpisode(1))
    .required(ERROR_MESSAGES.required),
  image: yup
    .mixed<FileList>()
    .test('is-valid-type', 'Недопустимый тип изображения', (fileList) => {
      if (!fileList) return false
      return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
        fileList[0].type,
      )
    })
    .test(
      'is-valid-size',
      `Максимально допустимый размер - ${MAX_FILE_SIZE / (1024 * 1024)} МБ`,
      (fileList) => {
        if (!fileList) return false
        return fileList[0].size <= MAX_FILE_SIZE
      },
    )
    .required(ERROR_MESSAGES.required),
  video: yup
    .mixed<FileList>()
    .test('is-valid-type', 'Недопустимый тип видео', (fileList) => {
      if (!fileList) return false
      return ['video/mp4', 'video/webm', 'video/ogg'].includes(fileList[0].type)
    })
    .test(
      'is-valid-size',
      `Максимально допустимый размер - ${(MAX_VIDEO_SIZE / 1024) * 1024} МБ`,
      (fileList) => {
        if (!fileList) return false
        return fileList[0].size <= MAX_VIDEO_SIZE
      },
    )
    .required(ERROR_MESSAGES.required),
})

export type AnimeSeriesType = yup.InferType<typeof animeSeriesSchema>

export const animeCommentSchema = yup.object({
  comment: yup.object().required(),
})

export type AnimeCommentType = yup.InferType<typeof animeCommentSchema>

export const editEpisodeAnimeSchema = yup.object({
  name: yup.string().required(ERROR_MESSAGES.required),
  number: yup
    .number()
    .typeError('Введите число')
    .min(1, ERROR_MESSAGES.minEpisode(1))
    .required(ERROR_MESSAGES.required),
  image: yup
    .mixed<File | string>()
    .required('Добавьте изображение')
    .test('file-or-url', 'Добавьте изображение', (value) => {
      // если это строка (URL) — ок
      if (typeof value === 'string') return true
      // если это File — ок, если есть размер
      if (value instanceof File) return value.size > 0
      // если ничего нет
      return false
    })
    .test('is-valid-type', 'Недопустимый тип изображения', (value) => {
      if (typeof value === 'string') return true // URL — пропускаем
      if (!(value instanceof File)) return false
      return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
        value.type,
      )
    })
    .test(
      'is-valid-size',
      `Максимально допустимый размер - ${MAX_FILE_SIZE / (1024 * 1024)} МБ`,
      (value) => {
        if (typeof value === 'string') return true // URL — пропускаем
        if (!(value instanceof File)) return false
        return value.size <= MAX_FILE_SIZE
      },
    ),
})

export type EditEpisodeAnimeType = yup.InferType<typeof editEpisodeAnimeSchema>

export const animeGenreSchema = yup.object({
  genres: yup
    .array()
    .of(yup.string().required('Имя жанра обязательно'))
    .min(1, 'Минимум 1 жанр')
    .required(ERROR_MESSAGES.required),
})

export type AnimeGenreType = yup.InferType<typeof animeGenreSchema>

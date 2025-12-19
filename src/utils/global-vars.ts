import { PostTypes } from '@/types/post.types'

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL
export const ASSET_BASE = process.env.NEXT_PUBLIC_ASSETS_URL
export const HERO_SLIDER_DURATION = 5000

// Error messages
export const ERROR_MESSAGES = {
  required: 'Это поле обязательно для заполнения',
  email: 'Введите корректный email-адрес',
  lowerCase: 'Должна содержать хотя бы одну строчную букву',
  upperCase: 'Должна содержать хотя бы одну заглавную букву',
  requireDigit: 'Пароль должен содержать хотя бы одну цифру',
  min: (n: number) => `Минимум ${n} символов`,
  max: (n: number) => `Максимум ${n} символов`,
  minNumber: (n: number) => `Допустимы только значения от ${n} и выше`,
  minEpisode: (n: number) => `Введите номер серии от ${n} и выше`,
  oneOf: 'Значения не совпадают',
  date: 'Заполните дату',
}

// Profile constants
export const BREADCRUMB_LABELS: Record<string, string> = {
  products: 'Каталог',
  posts: 'Посты',
  schedule: 'Расписание',
  catalog: 'Каталог',
  profile: 'Профиль',
  payments: 'Платежи',
  others: 'Прочее',
}

// Anime constants
export const ANIME_STATUS_TITLE = ['Онгоинг', 'Завершено', 'Анонс'] as const
export const ANIME_VOICEOVER_TYPE = ['Дубляж', 'Закадр'] as const

// Post constants
export const POST_TYPES = ['Новость', 'Обновление', 'Статья', 'Рекомендация']
export const POST_TYPE_LABELS: Record<PostTypes, string> = {
  0: 'Новость',
  1: 'Обновление',
  2: 'Статья',
  3: 'Рекомендация',
}

// Episode constants
export const EPISODE_STATUS_LABELS = [
  'Обработка',
  'В процессе',
  'Готов',
  'Ошибка',
] as const

// File upload constants
export const MAX_FILE_SIZE = 3 * 1024 * 1024 // 3MB
export const MAX_VIDEO_SIZE = 2000 * 1024 * 1024 // 2GB

export const VALID_FILE_EXTENSIONS = {
  image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'],
}

// User constants
export const AVAILABLE_ROLES = [
  'Actor',
  'Admin',
  'User',
  'Creator',
  'Donator',
  'Moderator',
  'SMM',
  'Sound-designer',
]

export const ROLE_LABELS: Record<string, string> = {
  Actor: 'Актер',
  Admin: 'Админ',
  User: 'Пользователь',
  Creator: 'Создатель',
  Donator: 'Донатер',
  Moderator: 'Модератор',
  SMM: 'SMM',
  'Sound-designer': 'Саунд-дизайнер',
}

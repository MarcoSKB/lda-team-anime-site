export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
export const HERO_SLIDER_DURATION = 5000

// Error messages
export const ERROR_MESSAGES = {
  required: 'Это поле обязательно для заполнения',
  email: 'Введите корректный email-адрес',
  lowerCase: 'Должна содержать хотя бы одну строчную букву',
  upperCase: 'Должна содержать хотя бы одну заглавную букву',
  requireDigit: 'Пароль должен содержать хотя бы одну цифру',
  min: (n: number) => `Минимум ${n} символов`,
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
export const ANIME_STATUS_TITLE = ['Анонс', 'Онгоинг', 'Завершено', 'Отменено']

// File upload constants
export const MAX_FILE_SIZE = 100 * 1024 // 100KB

export const VALID_FILE_EXTENSIONS = {
  image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'],
}

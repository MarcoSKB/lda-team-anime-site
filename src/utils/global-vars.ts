export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
export const HERO_SLIDER_DURATION = 5000

export const ERROR_MESSAGES = {
  required: 'Это поле обязательно для заполнения',
  email: 'Введите корректный email-адрес',
  min: (n: number) => `Минимум ${n} символов`,
  oneOf: 'Значения не совпадают',
}

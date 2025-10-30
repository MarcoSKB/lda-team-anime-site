import * as yup from 'yup'

import { ERROR_MESSAGES, MAX_FILE_SIZE } from '@/utils/global-vars'

export const profileInfoSchema = yup.object({
  username: yup
    .string()
    .min(4, ERROR_MESSAGES.min(4))
    .required(ERROR_MESSAGES.required),
  birthday: yup.string().optional(),
})

export type ProfileInfoFormData = yup.InferType<typeof profileInfoSchema>

export const profilePassSchema = yup.object({
  password: yup
    .string()
    .min(8, ERROR_MESSAGES.min(6))
    .required(ERROR_MESSAGES.required),
  newPassword: yup
    .string()
    .min(8, ERROR_MESSAGES.min(8))
    .matches(/[a-z]/, ERROR_MESSAGES.lowerCase)
    .matches(/[A-Z]/, ERROR_MESSAGES.upperCase)
    .matches(/\d/, ERROR_MESSAGES.requireDigit),
})

export type ProfilePassFormData = yup.InferType<typeof profilePassSchema>

export const changeAvatarSchema = yup.object({
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
})

export type ChangeAvatarFormData = yup.InferType<typeof changeAvatarSchema>

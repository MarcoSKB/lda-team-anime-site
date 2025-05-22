import * as yup from 'yup'

import { ERROR_MESSAGES } from '@/utils/global-vars'

export const profileInfoSchema = yup.object({
  email: yup
    .string()
    .email(ERROR_MESSAGES.email)
    .required(ERROR_MESSAGES.required),
  username: yup
    .string()
    .min(4, ERROR_MESSAGES.min(4))
    .required(ERROR_MESSAGES.required),
  birthday: yup.date().optional(),
})

export type ProfileInfoFormData = yup.InferType<typeof profileInfoSchema>

export const profilePassSchema = yup.object({
  password: yup
    .string()
    .min(6, ERROR_MESSAGES.min(6))
    .required(ERROR_MESSAGES.required),
  newPassword: yup
    .string()
    .min(6, ERROR_MESSAGES.min(6))
    .required(ERROR_MESSAGES.required),
})

export type ProfilePassFormData = yup.InferType<typeof profilePassSchema>

import * as yup from 'yup'

import { ERROR_MESSAGES } from '@/utils/global-vars'

export const signInSchema = yup.object({
  email: yup
    .string()
    .email(ERROR_MESSAGES.email)
    .required(ERROR_MESSAGES.required),
  password: yup
    .string()
    .min(6, ERROR_MESSAGES.min(6))
    .required(ERROR_MESSAGES.required),
})

export const registerSchema = yup.object({
  email: yup
    .string()
    .email(ERROR_MESSAGES.email)
    .required(ERROR_MESSAGES.required),
  password: yup
    .string()
    .min(6, ERROR_MESSAGES.min(6))
    .required(ERROR_MESSAGES.required),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], ERROR_MESSAGES.oneOf),
})

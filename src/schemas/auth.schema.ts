import * as yup from 'yup'

import { ERROR_MESSAGES } from '@/utils/global-vars'

export const signInSchema = yup.object({
  email: yup
    .string()
    .email(ERROR_MESSAGES.email)
    .required(ERROR_MESSAGES.required),
  password: yup
    .string()
    .min(8, ERROR_MESSAGES.min(8))
    .required(ERROR_MESSAGES.required),
})

export type SignInFormType = yup.InferType<typeof signInSchema>

export const registerSchema = yup.object({
  nickname: yup
    .string()
    .min(4, ERROR_MESSAGES.min(4))
    .required(ERROR_MESSAGES.required),
  email: yup
    .string()
    .email(ERROR_MESSAGES.email)
    .required(ERROR_MESSAGES.required),
  password: yup
    .string()
    .min(8, ERROR_MESSAGES.min(8))
    .matches(/[a-z]/, ERROR_MESSAGES.lowerCase)
    .matches(/[A-Z]/, ERROR_MESSAGES.upperCase)
    .matches(/\d/, ERROR_MESSAGES.requireDigit)
    .required(ERROR_MESSAGES.required),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], ERROR_MESSAGES.oneOf),
})

export type RegisterFormType = yup.InferType<typeof registerSchema>

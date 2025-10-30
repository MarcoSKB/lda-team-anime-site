import * as yup from 'yup'

import { ERROR_MESSAGES } from '@/utils/global-vars'

export const banFormSchema = yup.object({
  reason: yup
    .string()
    .min(4, ERROR_MESSAGES.min(4))
    .required(ERROR_MESSAGES.required),
  blockedUntil: yup.string().required(ERROR_MESSAGES.required),
  isPermanent: yup.boolean().required(ERROR_MESSAGES.required),
})

export type BanFormData = yup.InferType<typeof banFormSchema>

export const createPostSchema = yup.object({
  title: yup.string().min(6, ERROR_MESSAGES.min(6)).required(),
  type: yup
    .number()
    .oneOf([0, 1, 2, 3] as const)
    .required('Укажите тип поста'),
  description: yup.string().min(6, ERROR_MESSAGES.min(6)).required(),
  content: yup.object().required(),
})

export type CreatePostType = yup.InferType<typeof createPostSchema>

'use client'

import { redirect } from 'next/navigation'
import { useTransition } from 'react'
import {
  Controller,
  FieldErrors,
  Resolver,
  SubmitHandler,
  useForm,
} from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'sonner'

import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/ui'

import { CreatePostType, createPostSchema } from '@/schemas/dashboard.schema'
import { Post, PostTypes } from '@/types/post.types'
import { POST_TYPES } from '@/utils/global-vars'

import PostEditor from '../../../_module/create-post/post-editor'
import { useImageMap } from '../../../_module/create-post/providers/ImageUploadContext'
import { editPostWithImage } from './utils/editPostWithImage'

interface Props {
  initialValue: Post
}

const PostForm: React.FC<Props> = ({ initialValue }) => {
  const [isPending, startTransition] = useTransition()
  const imageMapRef = useImageMap()
  const {
    reset,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostType>({
    defaultValues: {
      ...initialValue,
      type: initialValue.postType,
      content: JSON.parse(initialValue.content),
    },
    resolver: yupResolver(
      createPostSchema,
    ) as unknown as Resolver<CreatePostType>,
  })

  const onSubmit: SubmitHandler<CreatePostType> = async (data) => {
    const promise = new Promise(async (resolve, reject) => {
      try {
        await editPostWithImage(imageMapRef, {
          ...data,
          id: initialValue.id,
          postType: data.type as PostTypes,
          content: JSON.stringify(data.content),
        })
        startTransition(() => redirect('/dashboard/posts'))
        resolve('ok')
      } catch (err) {
        if (err instanceof Error) {
          reject(err.message)
        }
        reject(err)
      }
    })

    toast.promise(promise, {
      loading: 'Редактирование поста...',
      success: 'Пост успешно отредактирован',
      error: (error) => {
        if (error instanceof Error) {
          return error.message
        }
        if (typeof error === 'string') {
          return error
        }
        return 'Не удалось отредактирован пост'
      },
    })

    try {
      await promise
      reset(initialValue)
    } catch {}
  }

  const onError = (errors: FieldErrors) => {
    const messages = Object.values(errors)
      .map((err) =>
        typeof err === 'object' && 'message' in err ? err.message : null,
      )
      .filter(Boolean)

    toast.error(String(messages[0] ?? 'Проверьте корректность формы'))

    console.log(errors)
  }

  return (
    <form
      method='post'
      onSubmit={handleSubmit(onSubmit, onError)}
      className='flex max-w-full flex-col gap-3 pt-4 pr-4'
    >
      <div className='grid gap-3'>
        <Label htmlFor='post-title'>Названия тайтла*</Label>
        {errors.title && (
          <span className='text-accent text-sm'>{errors.title.message}</span>
        )}
        <Input id='post-title' {...register('title', { required: true })} />
      </div>
      <div className='flex h-full w-full flex-col gap-2'>
        <Label htmlFor='post-type'>Тип поста*</Label>
        {errors.type && (
          <span className='text-accent text-sm'>
            {errors.type.message?.toString()}
          </span>
        )}
        <Controller
          name='type'
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={field.value.toString()}
            >
              <SelectTrigger
                id='post-type'
                className='mt-auto w-full border border-solid border-white/10 py-5'
              >
                <SelectValue placeholder='Выберите тип поста' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Тип поста</SelectLabel>
                  {POST_TYPES.map((postType, idx) => (
                    <SelectItem key={idx} value={idx.toString()}>
                      {postType}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className='flex w-full flex-col gap-3'>
        <Label htmlFor='post-decription'>Описание*</Label>
        {errors.description && (
          <span className='text-accent text-sm'>
            {errors.description.message}
          </span>
        )}
        <Textarea
          id='post-decription'
          className='h-40 resize-none'
          {...register('description', { required: true })}
        />
      </div>
      <PostEditor
        setValue={setValue}
        initialValue={JSON.parse(initialValue.content)}
      />
      <Button
        disabled={isPending}
        type='submit'
        intent='secondary'
        className='mb-8 self-start'
      >
        {isPending ? 'Сохраняем...' : 'Сохранить'}
      </Button>
    </form>
  )
}

export default PostForm

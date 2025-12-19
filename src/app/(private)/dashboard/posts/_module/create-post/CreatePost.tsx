'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import {
  Controller,
  FieldErrors,
  Resolver,
  SubmitHandler,
  useForm,
} from 'react-hook-form'

import { usePostImageStore } from '@/stores/usePostImageStore'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'sonner'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { PostTypes } from '@/types/post.types'
import { POST_TYPES } from '@/utils/global-vars'

import PostEditor from './post-editor'
import { publishPost } from './utils/publishPost'

const initialValue = {
  title: '',
  type: 0,
  description: '',
  content: '',
}

const CreatePost: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const [, startTransition] = useTransition()
  const { imageMap } = usePostImageStore()
  const {
    reset,
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreatePostType>({
    defaultValues: initialValue,
    resolver: yupResolver(
      createPostSchema,
    ) as unknown as Resolver<CreatePostType>,
  })

  const onSubmit: SubmitHandler<CreatePostType> = async (data) => {
    const promise = new Promise(async (resolve, reject) => {
      try {
        await publishPost(imageMap, {
          ...data,
          postType: data.type as PostTypes,
          content: JSON.stringify(data.content),
        })
        setIsOpen(false)
        startTransition(() => {
          router.refresh()
        })
        resolve('ok')
      } catch (err) {
        if (err instanceof Error) {
          reject(err.message)
        }
        reject(err)
      }
    })

    toast.promise(promise, {
      loading: 'Создания поста...',
      success: 'Пост успешно создан',
      error: (error) => {
        if (error instanceof Error) {
          return error.message
        }
        if (typeof error === 'string') {
          return error
        }
        return 'Не удалось создать пост'
      },
    })

    try {
      await promise
      reset(initialValue)
    } catch {}
  }

  const resetForm = () => {
    reset(initialValue)
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
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button intent='outline'>Создать пост</Button>
      </DialogTrigger>
      <DialogContent className='max-h-dvh overflow-y-scroll sm:max-w-none'>
        <form method='post' onSubmit={handleSubmit(onSubmit, onError)}>
          <DialogHeader>
            <DialogTitle>Добавить пост</DialogTitle>
            <DialogDescription>
              Заполните поля ниже, чтобы поделиться постом. После публикации его
              увидят другие пользователи.
            </DialogDescription>
          </DialogHeader>
          <div className='flex flex-col gap-3 py-4'>
            <div className='grid gap-3'>
              <Label htmlFor='post-title'>Названия поста*</Label>
              {errors.title && (
                <span className='text-accent text-sm'>
                  {errors.title.message}
                </span>
              )}
              <Input
                id='post-title'
                {...register('title', { required: true })}
              />
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
                    value={(field.value ?? '').toString()}
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
              initialValue={initialValue.content}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button intent='outline' onClick={resetForm}>
                Отмена
              </Button>
            </DialogClose>
            <Button type='submit'>Сохранить</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreatePost

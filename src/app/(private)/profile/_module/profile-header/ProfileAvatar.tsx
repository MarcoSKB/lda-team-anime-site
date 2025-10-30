'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { IconPlus } from '@tabler/icons-react'
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
  Skeleton,
} from '@/components/ui'

import { changeUserAvatar } from '@/actions/account'
import {
  ChangeAvatarFormData,
  changeAvatarSchema,
} from '@/schemas/account.schema'
import { MAX_FILE_SIZE } from '@/utils/global-vars'

const initialValue = {
  image: undefined,
}

const ProfileAvatar: React.FC = () => {
  const [open, setOpen] = useState(false)
  const { data: session, status, update } = useSession()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ChangeAvatarFormData>({
    defaultValues: initialValue,
    resolver: yupResolver(
      changeAvatarSchema,
    ) as unknown as Resolver<ChangeAvatarFormData>,
  })

  if (status == 'unauthenticated') redirect('/')

  const onSubmit: SubmitHandler<ChangeAvatarFormData> = async (data) => {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const res = await changeUserAvatar({
          image: data.image[0],
          altText: 'Аватарка',
        })
        if (res.type == 'error') {
          reject(res.message)
        } else {
          update({})
          setOpen(false)
          resolve(res.data)
        }
      } catch (err) {
        reject(err)
      }
    })

    toast.promise(promise, {
      loading: 'Добавление аватарки...',
      success: 'Аватарка успешно добавлено',
      error: (error) => {
        if (error instanceof Error) {
          return error.message
        }
        if (typeof error === 'string') {
          return error
        }
        return 'Не удалось добавить аватарку'
      },
    })

    try {
      await promise
      reset(initialValue)
    } catch {}
  }

  const resetForm = () => {
    setImagePreview(null)
    reset(initialValue)
  }

  const getImagePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError('image', {
          message: 'Размер изображения превышает допустимый лимит (3 MB).',
        })
        return
      }
      const url = URL.createObjectURL(file)

      setImagePreview(url)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type='button'
          className='relative rounded-full before:absolute before:top-0 before:left-0 before:h-full before:w-full before:rounded-full before:bg-black/0 before:transition-all before:ease-out before:content-[""] hover:before:cursor-pointer hover:before:bg-white/50 dark:hover:before:bg-black/50'
        >
          {status == 'loading' ? (
            <Skeleton className='h-[80px] w-[80px] rounded-full sm:h-[100px] sm:w-[100px] md:h-[160px] md:w-[160px]' />
          ) : (
            <Image
              width={160}
              height={160}
              src={session!.user.avatar}
              alt='Аватар профиля'
              className='outline-accent h-[80px] w-[80px] rounded-full bg-white object-cover outline-4 outline-offset-[-1px] sm:h-[100px] sm:w-[100px] md:h-[160px] md:w-[160px] dark:outline-white'
            />
          )}
          <div className='bg-accent absolute right-1 bottom-1 flex size-5 cursor-pointer items-center justify-center rounded-full sm:size-6 md:size-8 dark:bg-white'>
            <IconPlus className='text-white dark:text-black' />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form method='post' onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Изменить аватар</DialogTitle>
            <DialogDescription>
              Выберите новое изображение для профиля. Поддерживаются файлы в
              формате JPG или PNG.
            </DialogDescription>
          </DialogHeader>
          {errors.image && (
            <span className='text-accent text-sm'>
              {errors.image.message?.toString()}
            </span>
          )}
          <Label
            htmlFor='anime-image'
            className='border-secondary relative z-0 flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-full border-4 border-dotted text-center text-white/50'
          >
            <Input
              id='anime-image'
              accept='image/png, image/jpeg, image/jpg, image/webp'
              type='file'
              className='hidden'
              {...register('image', {
                required: true,
                onChange: getImagePreview,
              })}
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                className='absolute top-0 left-0 h-full w-full object-cover'
                alt='Превью изображения'
              />
            ) : (
              'Загрузить изображение'
            )}
          </Label>
          <DialogFooter>
            <DialogClose asChild>
              <Button intent='outline' onClick={resetForm}>
                Отмена
              </Button>
            </DialogClose>
            <Button type='submit' intent='secondary'>
              Изменить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ProfileAvatar

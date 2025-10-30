'use client'

import { useState } from 'react'
import { FieldErrors, Resolver, SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoaderCircle } from 'lucide-react'
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
  Input,
  Label,
} from '@/components/ui'

import { createAnimeBanner } from '@/actions/dashboard'
import { BannerAnimeType, bannerAnimeSchema } from '@/schemas/anime.schema'
import { AnimeTitle } from '@/types/anime.types'

interface Props {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  anime: AnimeTitle
  updateData: () => Promise<void>
}

const initialValue = {
  description: undefined,
  image: undefined,
}

const BannerDialog: React.FC<Props> = (props) => {
  const { isOpen, onOpenChange, anime, updateData } = props
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<BannerAnimeType>({
    defaultValues: initialValue,
    resolver: yupResolver(
      bannerAnimeSchema,
    ) as unknown as Resolver<BannerAnimeType>,
  })

  const onSubmit: SubmitHandler<BannerAnimeType> = async (data) => {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const res = await createAnimeBanner({
          image: data.image[0],
          description: data.description,
          titleId: anime.id,
        })
        if (res.type == 'error') {
          reject(res.message)
        }
        if (res.type == 'ok') {
          onOpenChange(false)
          resolve(res.data)
        }
      } catch (err) {
        reject(err)
      }
    })

    toast.promise(promise, {
      loading: 'Добавление баннера...',
      success: 'Баннер успешно добавлен',
      error: (error) => {
        if (error instanceof Error) {
          return error.message
        }
        if (typeof error === 'string') {
          return error
        }
        return 'Не удалось добавить баннер'
      },
    })

    try {
      await promise
      updateData()
      reset(initialValue)
    } catch {}
  }

  const onError = (errors: FieldErrors) => {
    console.log(errors)
  }

  const resetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    reset(initialValue)
    setImagePreview(null)
  }

  const getBannerImagePreview = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImagePreview(url)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] w-[50vw] min-w-[512px] overflow-y-auto sm:max-w-none'>
        <DialogHeader>
          <DialogTitle>Изменить данные аниме</DialogTitle>
          <DialogDescription className='text-balance'>
            Измени информацию о выбранном аниме-тайтле. После сохранения
            обновлённые данные будут отображаться в таблице.
          </DialogDescription>
        </DialogHeader>
        <form
          method='post'
          onSubmit={handleSubmit(onSubmit, onError)}
          className='grid gap-4 pb-4'
        >
          <div className='grid gap-3'>
            <Label htmlFor='anime-description'>Текст в баннере*</Label>
            {errors.description && (
              <span className='text-accent text-sm'>
                {errors.description.message}
              </span>
            )}
            <Input
              id='anime-description'
              {...register('description', { required: true })}
            />
          </div>
          <div className='flex w-full gap-3'>
            <div className='flex w-full flex-col gap-3'>
              <Label htmlFor='anime-image'>Баннер*</Label>
              {errors.image && (
                <span className='text-accent text-sm'>
                  {errors.image?.message?.toString()}
                </span>
              )}
              <Label
                htmlFor='anime-image'
                className='border-secondary relative z-0 flex aspect-16/9 w-full cursor-pointer items-center justify-center rounded-md border-4 border-dotted text-center text-white/50'
              >
                <Input
                  id='anime-image'
                  accept='image/png, image/jpeg, image/jpg, image/webp'
                  type='file'
                  className='hidden'
                  {...register('image', {
                    required: true,
                    onChange: getBannerImagePreview,
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
            </div>
          </div>

          <DialogFooter className='flex sm:justify-start'>
            <DialogClose asChild>
              <Button
                intent='ghost'
                className='mr-auto transition'
                disabled={!isDirty}
                onClick={(e) => resetForm(e)}
              >
                По умолчанию
              </Button>
            </DialogClose>
            <Button
              intent='primary'
              type='submit'
              disabled={isSubmitting || !isDirty}
              icon={
                isSubmitting && (
                  <LoaderCircle
                    width={22}
                    height={22}
                    className='animate-spin'
                  />
                )
              }
            >
              Добавить баннер
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default BannerDialog

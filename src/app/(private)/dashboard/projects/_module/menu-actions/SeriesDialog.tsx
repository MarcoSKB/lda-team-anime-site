'use client'

import { useState } from 'react'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'

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

import { addAnimeEpisode } from '@/actions/dashboard'
import { AnimeSeriesType, animeSeriesSchema } from '@/schemas/anime.schema'
import { AnimeEpisode } from '@/types/anime.types'

interface Props {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  titleId: string
  episodesList: AnimeEpisode[] | []
  episodesTotal: number
  updateData: () => Promise<void>
}

const SeriesDialog: React.FC<Props> = (props) => {
  const {
    isOpen,
    onOpenChange,
    titleId,
    episodesList,
    episodesTotal,
    updateData,
  } = props
  const nextMissing =
    Array.from({ length: episodesTotal }, (_, i) => i + 1).find(
      (n) => !episodesList.some((e) => e.number === n),
    ) ?? 0
  const initialValue = {
    title: '',
    episodeNumber: nextMissing,
    image: undefined,
    video: undefined,
  }
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const {
    reset,
    register,
    setError,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<AnimeSeriesType>({
    defaultValues: initialValue,
    resolver: yupResolver(
      animeSeriesSchema,
    ) as unknown as Resolver<AnimeSeriesType>,
  })

  const onSubmit: SubmitHandler<AnimeSeriesType> = async (data) => {
    if (episodesList.some((ep) => ep.number === data.episodeNumber)) {
      setError('episodeNumber', {
        type: 'manual',
        message: 'Серия с таким номером уже существует',
      })
      return
    }

    if (data.episodeNumber > episodesTotal) {
      setError('episodeNumber', {
        type: 'manual',
        message: `Номер серии не может быть больше ${episodesTotal}`,
      })
      return
    }

    const promise = new Promise(async (resolve, reject) => {
      try {
        const res = await addAnimeEpisode(
          data.video[0],
          titleId,
          data.episodeNumber,
          data.title,
          data.image[0],
        )
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
      loading: 'Добавление эпизода...',
      success: 'Эпизода успешно добавлено',
      error: (error) => {
        if (error instanceof Error) {
          return error.message
        }
        if (typeof error === 'string') {
          return error
        }
        return 'Не удалось добавить эпизод'
      },
    })

    try {
      await promise
      updateData()
      reset(initialValue)
    } catch {}
  }

  const resetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    reset(initialValue)
    setImagePreview(null)
  }

  const getImagePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          <DialogTitle>Добавить новый эпизод</DialogTitle>
          <DialogDescription>
            Заполните данные для добавления эпизода.
          </DialogDescription>
        </DialogHeader>
        <form
          method='post'
          onSubmit={handleSubmit(onSubmit)}
          className='grid w-full gap-4 pb-4'
        >
          <div className='flex w-full gap-3'>
            <div className='flex w-full flex-col gap-3 md:max-w-[35%]'>
              <Label htmlFor='anime-image'>Обложка Эпизода*</Label>
              {errors.image && (
                <span className='text-accent text-sm'>
                  {errors.image?.message?.toString()}
                </span>
              )}
              <Label
                htmlFor='anime-image'
                className='border-secondary relative z-0 flex aspect-16/9 cursor-pointer items-center justify-center rounded-md border-4 border-dotted text-center text-white/50'
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
            </div>
            <div className='flex w-full flex-col gap-5'>
              <div className='grid w-full gap-3'>
                <Label htmlFor='anime-title'>Названия эпизода*</Label>
                {errors.title && (
                  <span className='text-accent text-sm'>
                    {errors.title.message}
                  </span>
                )}
                <Input
                  id='anime-title'
                  {...register('title', { required: true })}
                />
              </div>
              <div className='grid w-full gap-3'>
                <Label htmlFor='anime-episode'>Какой эпизод?</Label>
                {errors.episodeNumber && (
                  <span className='text-accent text-sm'>
                    {errors.episodeNumber.message}
                  </span>
                )}
                <Input
                  id='anime-episode'
                  type='number'
                  {...register('episodeNumber', {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </div>
              <div className='flex w-full flex-col items-start gap-3'>
                <Label htmlFor='anime-video'>Загрузите эпизод*</Label>
                {errors.video?.message && (
                  <span className='text-accent text-sm'>
                    {errors.video.message?.toString()}
                  </span>
                )}
                <Input
                  id='anime-video'
                  type='file'
                  {...register('video', { required: true })}
                  accept='video/mp4,video/webm,video/ogg'
                />
              </div>
            </div>
          </div>
          <DialogFooter className='flex sm:justify-start'>
            <DialogClose asChild>
              <Button
                intent='ghost'
                className='mr-auto transition'
                onClick={(e) => resetForm(e)}
              >
                Очистить
              </Button>
            </DialogClose>
            <Button
              intent='primary'
              type='submit'
              disabled={isSubmitting}
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
              Добавить эпизод
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SeriesDialog

'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form'

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

import { editAnimeEpisode } from '@/actions/dashboard'
import {
  EditEpisodeAnimeType,
  editEpisodeAnimeSchema,
} from '@/schemas/anime.schema'
import { AnimeEpisode } from '@/types/anime.types'

interface Props {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  episodesList: AnimeEpisode[] | []
  episodesTotal: number
  initialValue: AnimeEpisode
}

const DeleteEpisodeDialog: React.FC<Props> = (props) => {
  const { isOpen, onOpenChange, initialValue, episodesTotal } = props
  const [, startTransition] = useTransition()
  const router = useRouter()
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialValue.previewUrl,
  )
  const {
    reset,
    register,
    setError,
    control,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<EditEpisodeAnimeType>({
    defaultValues: {
      name: initialValue.name,
      number: initialValue.number,
      image: initialValue.previewUrl ?? undefined,
    },
    resolver: yupResolver(
      editEpisodeAnimeSchema,
    ) as unknown as Resolver<EditEpisodeAnimeType>,
  })

  const onSubmit: SubmitHandler<EditEpisodeAnimeType> = async (data) => {
    if (data.number > episodesTotal) {
      setError('number', {
        type: 'manual',
        message: `Номер серии не может быть больше ${episodesTotal}`,
      })
      return
    }

    const promise = new Promise(async (resolve, reject) => {
      try {
        const res = await editAnimeEpisode({
          episodeId: initialValue.id,
          name: data.name,
          number: data.number.toString(),
          previewId: initialValue.previewId,
          image: data.image,
        })
        if (res.type == 'error') {
          reject(res.message)
        }
        if (res.type == 'ok') {
          startTransition(() => router.refresh())
          onOpenChange(false)
          resolve(res.data)
        }
      } catch (err) {
        reject(err)
      }
    })

    toast.promise(promise, {
      loading: 'Изменения эпизода...',
      success: 'Эпизода успешно изменен',
      error: (error) => {
        if (error instanceof Error) {
          return error.message
        }
        if (typeof error === 'string') {
          return error
        }
        return 'Не удалось изменить эпизод'
      },
    })
  }

  const getImagePreview = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File | null) => void,
  ) => {
    const file = event.target.files?.[0] ?? null
    onChange(file)
    if (file) {
      const url = URL.createObjectURL(file)
      setImagePreview(url)
    } else {
      setImagePreview('')
    }
  }

  const resetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    reset(initialValue)
    setImagePreview(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] w-[50vw] min-w-[512px] overflow-y-auto sm:max-w-none'>
        <DialogHeader>
          <DialogTitle>Редактирование эпизода</DialogTitle>
          <DialogDescription>
            Отредактируйте информацию об эпизоде и сохраните изменения.
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
              <Controller
                name='image'
                control={control}
                defaultValue={initialValue.previewUrl ?? undefined}
                render={({ field }) => (
                  <Label
                    htmlFor='anime-image'
                    className='border-secondary relative z-0 flex aspect-16/9 cursor-pointer items-center justify-center rounded-md border-4 border-dotted text-center text-white/50'
                  >
                    <Input
                      id='anime-image'
                      accept='image/png, image/jpeg, image/jpg, image/webp'
                      type='file'
                      className='hidden'
                      onChange={(e) => getImagePreview(e, field.onChange)}
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
                )}
              />
            </div>
            <div className='flex w-full flex-col gap-5'>
              <div className='grid w-full gap-3'>
                <Label htmlFor='anime-name'>Названия эпизода*</Label>
                {errors.name && (
                  <span className='text-accent text-sm'>
                    {errors.name.message}
                  </span>
                )}
                <Input
                  id='anime-name'
                  {...register('name', { required: true })}
                />
              </div>
              <div className='grid w-full gap-3'>
                <Label htmlFor='anime-number'>Какой эпизод?</Label>
                {errors.number && (
                  <span className='text-accent text-sm'>
                    {errors.number.message}
                  </span>
                )}
                <Input
                  id='anime-number'
                  type='number'
                  {...register('number', {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
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
              type='submit'
              intent='outline'
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
              Изменить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteEpisodeDialog

'use client'

import { useState } from 'react'
import {
  Controller,
  FieldErrors,
  Resolver,
  SubmitHandler,
  useForm,
} from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

import {
  Button,
  DialogClose,
  DialogFooter,
  Input,
  Label,
  MultiSelect,
  MultiSelectOption,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/ui'

import { createAnimeBanner, createAnimeTitle } from '@/actions/dashboard'
import { addGenreToTitle, getGenres } from '@/actions/genres'
import useServerAction from '@/hooks/useServerAction'
import { CreateAnimeType, createAnimeSchema } from '@/schemas/anime.schema'
import { AnimeTitleStatus, GenresList } from '@/types/anime.types'
import { ANIME_STATUS_TITLE, ANIME_VOICEOVER_TYPE } from '@/utils/global-vars'

interface Props {
  step: number
  toNextStep: () => void
  toPrevStep: () => void
  updateData: () => Promise<void>
}

const initialValue = {
  title: '',
  description: '',
  tags: [],
  image: undefined,
  status: '',
  episodesQtty: 1,
  voiceover: undefined,
  bannerDescription: undefined,
  banner: undefined,
}

const FIELD_STEP_MAP: Record<string, number> = {
  title: 1,
  description: 1,
  image: 1,
  status: 2,
  voiceover: 2,
  episodesQtty: 2,
  bannerDescription: 3,
  banner: 3,
}

const CreateTitleForm: React.FC<Props> = ({
  step,
  toNextStep,
  toPrevStep,
  updateData,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const { data: res, isLoading } = useServerAction(getGenres)
  const {
    reset,
    register,
    setError,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<CreateAnimeType>({
    defaultValues: initialValue,
    resolver: yupResolver(
      createAnimeSchema,
    ) as unknown as Resolver<CreateAnimeType>,
  })

  let tagsOption: GenresList[] = []
  if (res && res.type == 'ok') {
    tagsOption = Array.from(
      new Map(
        res.data.map((item) => [item.name.toLowerCase().trim(), item]),
      ).values(),
    )
  }

  const onSubmit: SubmitHandler<CreateAnimeType> = async (data) => {
    if (data.tags.length == 0) {
      setError('tags', {
        type: 'required',
        message: 'Это поле обязательно для заполнения',
      })
    }
    const genres = data.tags.filter((tag) => tag.id)

    const promise = new Promise(async (resolve, reject) => {
      try {
        const res = await createAnimeTitle({
          animeName: data.title,
          animeDescription: data.description,
          animeStatus: ANIME_STATUS_TITLE.findIndex(
            (status) => status === data.status,
          ) as AnimeTitleStatus,
          animeVoiceover: data.voiceover,
          imageFile: data.image,
          imageText: `Обложка аниме ${data.title}`,
          imageType: '4',
          episodesTotal: data.episodesQtty,
        })
        if (res.type == 'error') {
          reject(res.message)
        }
        if (res.type == 'ok') {
          const genreResponse = await addGenreToTitle({
            titleId: res.data.id,
            genres: genres,
          })
          if (genreResponse.type == 'error') {
            toast.error(genreResponse.message)
          }

          const bannerRes = await createAnimeBanner({
            image: data.image,
            description: data.bannerDescription,
            titleId: res.data.id,
          })

          if (bannerRes.type == 'error') {
            toast.error(bannerRes.message)
          }

          await updateData()
          resolve(res.data)
        }
      } catch (err) {
        reject(err)
      }
    })

    toast.promise(promise, {
      loading: 'Добавление аниме...',
      success: 'Аниме успешно добавлено',
      error: (error) => {
        if (error instanceof Error) {
          return error.message
        }
        if (typeof error === 'string') {
          return error
        }
        return 'Не удалось добавить аниме'
      },
    })

    try {
      await promise
      reset(initialValue)
    } catch {}
  }

  const onError = (errors: FieldErrors) => {
    const firstErrorField = Object.keys(errors).find(
      (fieldName) => FIELD_STEP_MAP[fieldName] !== undefined,
    )

    if (firstErrorField) {
      if (FIELD_STEP_MAP[firstErrorField] == 1) {
        toPrevStep()
        toPrevStep()
      } else if (FIELD_STEP_MAP[firstErrorField] == 2) {
        toPrevStep()
      } else {
        toNextStep()
      }
    }
  }

  const resetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    reset(initialValue)
    setImagePreview(null)
    setBannerPreview(null)
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
    }
  }

  const getBannerImagePreview = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File | null) => void,
  ) => {
    const file = event.target.files?.[0] ?? null
    onChange(file)
    if (file) {
      const url = URL.createObjectURL(file)
      setBannerPreview(url)
    }
  }

  return (
    <>
      <form
        method='post'
        onSubmit={handleSubmit(onSubmit, onError)}
        className='grid gap-4 pb-4'
      >
        {step == 0 && (
          <>
            <div className='grid gap-3'>
              <Label htmlFor='anime-title'>Названия тайтла*</Label>
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
            <div className='flex w-full gap-3'>
              <div className='flex w-full flex-col gap-3'>
                <Label htmlFor='anime-description'>Описание*</Label>
                {errors.description && (
                  <span className='text-accent text-sm'>
                    {errors.description.message}
                  </span>
                )}
                <Textarea
                  id='anime-description'
                  className='h-40 resize-none'
                  {...register('description', { required: true })}
                />
              </div>
              <div className='flex w-full flex-col gap-3 md:max-w-[30%]'>
                <Label htmlFor='anime-image'>Обложка аниме*</Label>
                {errors.image && (
                  <span className='text-accent text-sm'>
                    {errors.image?.message?.toString()}
                  </span>
                )}
                <Controller
                  name='image'
                  control={control}
                  render={({ field }) => (
                    <Label
                      htmlFor='anime-image'
                      className='border-secondary relative z-0 flex aspect-6/8 cursor-pointer items-center justify-center rounded-md border-4 border-dotted text-center text-white/50'
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
            </div>
          </>
        )}
        {step == 1 && (
          <>
            <div className='mb-4 flex w-full items-start gap-3'>
              <div className='flex h-full w-full flex-col gap-2'>
                <Label htmlFor='anime-tags'>Тэги*</Label>
                {errors.tags && (
                  <span className='text-accent text-sm'>
                    {errors.tags.message}
                  </span>
                )}
                <Controller
                  control={control}
                  name='tags'
                  render={({ field }) => (
                    <MultiSelect
                      placeholder='Ключевые слова для аниме'
                      options={
                        tagsOption.map(
                          (tag): MultiSelectOption => ({
                            label: tag.name,
                            value: tag.name,
                          }),
                        ) || []
                      }
                      onValueChange={(values) => {
                        field.onChange(
                          values.map((v) => ({
                            id: tagsOption.find((tag) => tag.name == v)?.id,
                            name: v,
                          })),
                        )
                      }}
                      defaultValue={
                        field.value?.map((genre) => genre.name) ?? []
                      }
                      disabled={isLoading}
                      className='mt-auto active:hover:scale-100'
                      animationConfig={{
                        badgeAnimation: 'none',
                        popoverAnimation: 'none',
                        optionHoverAnimation: 'none',
                      }}
                      modalPopover
                      responsive
                    />
                  )}
                />
              </div>
              <div className='flex h-full w-full flex-col gap-2'>
                <Label htmlFor='anime-voiceover'>Озвучка*</Label>
                {errors.voiceover && (
                  <span className='text-accent text-sm'>
                    {errors.voiceover.message?.toString()}
                  </span>
                )}
                <Controller
                  name='voiceover'
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        id='anime-voiceover'
                        className='mt-auto w-full border border-solid border-white/10 py-5'
                      >
                        <SelectValue placeholder='Выберите тип озвучки' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Озвучка</SelectLabel>
                          {ANIME_VOICEOVER_TYPE.map((voiceover) => (
                            <SelectItem key={voiceover} value={voiceover}>
                              {voiceover}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className='flex w-full items-start gap-3'>
              <div className='flex w-full flex-col gap-2'>
                <Label htmlFor='anime-status'>Статус*</Label>
                {errors.status && (
                  <span className='text-accent text-sm'>
                    {errors.status.message}
                  </span>
                )}
                <Controller
                  name='status'
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        id='anime-status'
                        className='mt-auto w-full border border-solid border-white/10 py-5'
                      >
                        <SelectValue placeholder='Выберите статус' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Статусы</SelectLabel>
                          {ANIME_STATUS_TITLE.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className='flex h-full w-full flex-col gap-2'>
                <Label htmlFor='anime-qtty-series'>Кол-во серий*</Label>
                {errors.episodesQtty && (
                  <span className='text-accent text-sm'>
                    {errors.episodesQtty.message}
                  </span>
                )}
                <Input
                  id='anime-qtty-series'
                  placeholder='Максимальное кол-во серий'
                  size='large'
                  className='mt-auto border border-solid border-white/10 bg-transparent placeholder:text-sm placeholder:font-normal'
                  {...register('episodesQtty', {
                    required: true,
                    min: 1,
                    valueAsNumber: true,
                  })}
                />
              </div>
            </div>
          </>
        )}
        {step == 2 && (
          <>
            <div className='grid gap-3'>
              <Label htmlFor='anime-banner-description'>Текст в баннере*</Label>
              {errors.bannerDescription && (
                <span className='text-accent text-sm'>
                  {errors.bannerDescription.message}
                </span>
              )}
              <Input
                id='anime-banner-description'
                {...register('bannerDescription', { required: true })}
              />
            </div>
            <div className='flex w-full gap-3'>
              <div className='flex w-full flex-col gap-3'>
                <Label htmlFor='anime-banner'>Баннер*</Label>
                {errors.banner && (
                  <span className='text-accent text-sm'>
                    {errors.banner?.message?.toString()}
                  </span>
                )}
                <Controller
                  name='banner'
                  control={control}
                  render={({ field }) => (
                    <Label
                      htmlFor='anime-banner'
                      className='border-secondary relative z-0 flex aspect-16/9 w-full cursor-pointer items-center justify-center rounded-md border-4 border-dotted text-center text-white/50'
                    >
                      <Input
                        id='anime-banner'
                        accept='image/png, image/jpeg, image/jpg, image/webp'
                        type='file'
                        className='hidden'
                        onChange={(e) =>
                          getBannerImagePreview(e, field.onChange)
                        }
                      />
                      {bannerPreview ? (
                        <img
                          src={bannerPreview}
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
            </div>
          </>
        )}
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
          {step == 2 ? (
            <>
              <Button intent='secondary' onClick={() => toPrevStep()}>
                Назад
              </Button>
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
                Создать аниме
              </Button>
            </>
          ) : (
            <>
              <Button
                intent='secondary'
                disabled={step == 0}
                onClick={() => toPrevStep()}
              >
                Назад
              </Button>
              <Button
                intent='secondary'
                onClick={(e) => {
                  e.preventDefault()
                  toNextStep()
                }}
              >
                Далее
              </Button>
            </>
          )}
        </DialogFooter>
      </form>
    </>
  )
}

export default CreateTitleForm

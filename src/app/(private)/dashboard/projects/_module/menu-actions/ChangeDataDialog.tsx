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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

import { updateAnimeTitle } from '@/actions/anime'
import { getGenres } from '@/actions/genres'
import useServerAction from '@/hooks/useServerAction'
import { EditAnimeType, editAnimeSchema } from '@/schemas/anime.schema'
import { AnimeTitle, GenresList } from '@/types/anime.types'
import { ANIME_STATUS_TITLE, ANIME_VOICEOVER_TYPE } from '@/utils/global-vars'

interface Props {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  anime: AnimeTitle
  updateData: () => Promise<void>
}

const ChangeDataDialog: React.FC<Props> = (props) => {
  const { isOpen, onOpenChange, anime, updateData } = props
  const initialValue = {
    title: anime.name,
    description: anime.description,
    episodesQtty: anime.episodesTotal,
    status: anime.currentTitleStatus.toString(),
    voiceover: anime.currentVoiceoverType,
    tags: anime.genres,
    image: anime.images[0].url,
  }
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialValue.image,
  )
  const { data: res, isLoading } = useServerAction(getGenres)
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<EditAnimeType>({
    defaultValues: initialValue,
    resolver: yupResolver(
      editAnimeSchema,
    ) as unknown as Resolver<EditAnimeType>,
  })

  let tagsOption: GenresList[] = []
  if (res && res.type == 'ok') {
    tagsOption = Array.from(
      new Map(
        res.data.map((item) => [item.name.toLowerCase().trim(), item]),
      ).values(),
    )
  }

  const onSubmit: SubmitHandler<EditAnimeType> = async (data) => {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const res = await updateAnimeTitle({
          id: anime.id,
          name: data.title,
          episodesTotal: data.episodesQtty,
          description: data.description,
          currentTitleStatus: +data.status,
          currentVoiceoverType: data.voiceover,
          currentGenres: anime.genres,
          newGenres: data.tags,
          posterId: anime.images.find((img) => img.imageType.toString() == '4')
            ?.id,
          poster: data.image,
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
      loading: 'Изменение данных...',
      success: 'Данные успешно изменены',
      error: (error) => {
        if (error instanceof Error) {
          return error.message
        }
        if (typeof error === 'string') {
          return error
        }
        return 'Не удалось изменить данные'
      },
    })

    try {
      await promise
      updateData()
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

  const resetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    reset(initialValue)
    setImagePreview(initialValue.image)
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
                      <Select
                        onValueChange={(value) => field.onChange(+value)}
                        value={field.value.toString()}
                      >
                        <SelectTrigger
                          id='anime-voiceover'
                          className='mt-auto w-full border border-solid border-white/10 py-5'
                        >
                          <SelectValue placeholder='Выберите тип озвучки' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Озвучка</SelectLabel>
                            {ANIME_VOICEOVER_TYPE.map((_, idx) => (
                              <SelectItem key={idx} value={idx.toString()}>
                                {ANIME_VOICEOVER_TYPE[idx]}
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          id='anime-status'
                          className='mt-auto w-full border border-solid border-white/10 py-5'
                        >
                          <SelectValue placeholder='Выберите статус' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Статусы</SelectLabel>
                            {ANIME_STATUS_TITLE.map((_, idx) => (
                              <SelectItem key={idx} value={idx.toString()}>
                                {ANIME_STATUS_TITLE[idx]}
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
                defaultValue={initialValue?.image ?? null}
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
              Изменить данные
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ChangeDataDialog

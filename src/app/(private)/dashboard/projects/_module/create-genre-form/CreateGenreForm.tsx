'use client'

import { memo, useMemo } from 'react'
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'sonner'

import { CreateTagInput } from '@/components/module'
import { Button, Form, FormControl, FormItem } from '@/components/ui'

import { createGenres } from '@/actions/genres'
import { AnimeGenreType, animeGenreSchema } from '@/schemas/anime.schema'

interface Props {
  updateData: () => Promise<void>
  autoTags: {
    id: string
    label: string
  }[]
}

const CreateGenreForm: React.FC<Props> = ({ updateData, autoTags }) => {
  const memoTags = useMemo(() => autoTags, [autoTags])
  const form = useForm<AnimeGenreType>({
    mode: 'onChange',
    shouldFocusError: false,
    resolver: yupResolver(
      animeGenreSchema,
    ) as unknown as Resolver<AnimeGenreType>,
  })

  const onSubmit: SubmitHandler<AnimeGenreType> = async (data) => {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const res = await createGenres(data.genres)
        if (res.type === 'error') {
          reject(res.message)
        }
        if (res.type === 'ok') {
          updateData()
          resolve(res.data)
        }
      } catch (error) {
        if (error instanceof Error) {
          reject(error.message)
        }
        reject(error)
      }
    })

    toast.promise(promise, {
      loading: 'Создание жанров...',
      success: 'Жанры успешно созданы',
      error: (err) => `Ошибка: ${err}`,
    })

    try {
      await promise
      form.reset()
    } catch {}
  }

  return (
    <div className='flex w-full flex-col gap-3'>
      <span className='text-md'>
        Добавьте новый жанр, чтобы расширить классификацию контента.
      </span>
      <Form {...form}>
        <form
          className='flex max-w-full items-end gap-5'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormItem className='flex w-full flex-col'>
            {form.formState.errors.genres && (
              <span className='text-accent text-sm'>
                {form.formState.errors.genres.message}
              </span>
            )}
            <FormControl>
              <Controller
                control={form.control}
                name='genres'
                render={({ field }) => (
                  <CreateTagInput
                    onChange={field.onChange}
                    value={field.value}
                    suggestions={memoTags}
                  />
                )}
              />
            </FormControl>
          </FormItem>
          <Button type='submit' intent='outline'>
            Создать
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default memo(CreateGenreForm)

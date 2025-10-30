'use client'

import { useSession } from 'next-auth/react'
import { use, useMemo } from 'react'
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { CircleUserRound, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

import { Button, Input } from '@/components/ui'

import { changeProfileInfo } from '@/actions/account'
import {
  ProfileInfoFormData,
  profileInfoSchema,
} from '@/schemas/account.schema'
import { GetUserInfo } from '@/types/account.types'
import { Result } from '@/types/fetch.types'

import { BirthdayPicker } from '../'

interface Props {
  fetchInitialValue: Promise<Result<GetUserInfo>>
}

const ProfileForm: React.FC<Props> = ({ fetchInitialValue }) => {
  const res = use(fetchInitialValue)
  const { update } = useSession()
  const defaultValues = useMemo(() => {
    if (res.type === 'ok') {
      const { username = '', email, birthday } = res.data
      return {
        username,
        email,
        birthday,
      }
    }
    return {
      username: '',
      email: '',
    }
  }, [res])

  const {
    reset,
    control,
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<ProfileInfoFormData>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(
      profileInfoSchema,
    ) as unknown as Resolver<ProfileInfoFormData>,
  })
  const birthday = watch('birthday')

  const onSubmit: SubmitHandler<ProfileInfoFormData> = async (data) => {
    const res = await changeProfileInfo({
      username: data.username,
      birthday,
    })
    if (res.type == 'error') {
      toast.error('Что-то произошло не так')
      reset(defaultValues)
    }
    if (res.type == 'ok') {
      update({})
      toast.success('Данные обновлены')
      reset({ ...data, birthday })
    }
  }

  return (
    <form
      method='post'
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col justify-between gap-3 md:flex-row md:items-end'
    >
      <div className='flex flex-col gap-6'>
        <label className='flex flex-col gap-1.5'>
          <span className='text-lg leading-[150%]'>Имя пользователя</span>
          {errors.username && (
            <span className='text-accent text-sm'>
              {errors.username.message}
            </span>
          )}
          <Input
            size='large'
            placeholder='Никнейм'
            disabled={isSubmitting}
            {...register('username')}
            icon={
              <CircleUserRound
                width={22}
                height={22}
                className='absolute top-1/2 left-[10px] -translate-y-1/2'
              />
            }
          />
        </label>
        <label className='flex flex-col gap-1.5'>
          <span className='text-lg leading-[150%]'>День рождение</span>
          {errors.birthday && (
            <span className='text-accent text-sm'>
              {errors.birthday.message}
            </span>
          )}
          <Controller
            name='birthday'
            control={control}
            disabled={isSubmitting}
            render={({ field }) => (
              <BirthdayPicker
                disabled={isSubmitting}
                onChange={(date) => {
                  field.onChange(date.toString())
                  field.onBlur()
                }}
                selected={field.value}
              />
            )}
          />
        </label>
      </div>
      <div className='flex justify-end gap-2'>
        {isDirty && (
          <Button
            size='large'
            intent='outline'
            disabled={isSubmitting}
            onClick={() => reset(defaultValues)}
            className='hover:bg-background border-secondary hover:border-secondary disabled:border-secondary group hover:text-foreground items-center justify-center gap-2 border-2 border-solid disabled:pointer-events-none'
          >
            <span className='group-disabled:opacity-70'>Сбросить</span>
          </Button>
        )}
        <Button
          type='submit'
          size='large'
          intent='primary'
          disabled={isSubmitting || !isDirty}
          icon={
            isSubmitting && (
              <LoaderCircle width={22} height={22} className='animate-spin' />
            )
          }
          className='bg-accent hover:bg-background border-accent hover:border-secondary disabled:border-secondary group items-center justify-center gap-2 border-2 border-solid'
        >
          <span className='group-disabled:opacity-70'>Изменить</span>
        </Button>
      </div>
    </form>
  )
}

export default ProfileForm

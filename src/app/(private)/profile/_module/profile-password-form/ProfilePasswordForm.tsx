'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { changePassword } from '@/actions/account'
import { ChangePasswordType } from '@/types/account.types'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

import { Button, Input } from '@/components/ui'

import { profilePassSchema } from '@/schemas/account.schema'

const initialValue = {
  password: '',
  newPassword: '',
}

const ProfilePasswordForm: React.FC = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(profilePassSchema),
  })

  const onSubmit: SubmitHandler<typeof profilePassSchema> = async (data) => {
    const typedData = data as unknown as ChangePasswordType

    const changePasswordPromise = new Promise(async (resolve, reject) => {
      try {
        const res = await changePassword(typedData)

        if (res.type === 'ok') {
          resolve(res)
        } else {
          reject(res)
        }
      } catch (err) {
        reject(err)
      }
    })

    toast.promise(changePasswordPromise, {
      loading: 'Смена пароля...',
      success: () => {
        reset(initialValue)
        return `Пароль успешно изменён`
      },
      error: (data) => {
        reset(initialValue)
        return data.message || 'Что-то пошло не так'
      },
    })

    try {
      await changePasswordPromise
    } catch {}
  }
  return (
    <form
      method='post'
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-3'
    >
      <label className='flex max-w-[300px] flex-col gap-1.5'>
        <span className='text-lg leading-[150%]'>Смена пароля</span>
        {errors.password && (
          <span className='text-accent text-sm'>{errors.password.message}</span>
        )}
        <Input
          size='large'
          placeholder='Текущий пароль'
          type='password'
          disabled={isSubmitting}
          {...register('password')}
        />
        {errors.newPassword && (
          <span className='text-accent text-sm'>
            {errors.newPassword.message}
          </span>
        )}
        <Input
          size='large'
          placeholder='Новый пароль'
          type='password'
          disabled={isSubmitting}
          {...register('newPassword')}
        />
      </label>
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
        className='bg-accent hover:bg-background border-accent hover:border-secondary disabled:border-secondary group items-center justify-center gap-2 self-start border-2 border-solid'
      >
        <span className='group-disabled:opacity-70'>Поменять пароль</span>
      </Button>
    </form>
  )
}

export default ProfilePasswordForm

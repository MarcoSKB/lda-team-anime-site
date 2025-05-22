'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoaderCircle } from 'lucide-react'

import { Button, Input } from '@/components/ui'

import { profilePassSchema } from '@/schemas/account.schema'
import { sleep } from '@/utils/system'

const initialValue = {
  password: '',
  newPassword: '',
}

const ProfilePasswordForm: React.FC = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(profilePassSchema),
  })

  const onSubmit: SubmitHandler<typeof profilePassSchema> = async (data) => {
    await sleep(3000)
    console.log(data)
    reset(initialValue)
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
          disabled={isSubmitting}
          {...register('newPassword')}
        />
      </label>
      <Button
        type='submit'
        size='large'
        intent='primary'
        disabled={isSubmitting}
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

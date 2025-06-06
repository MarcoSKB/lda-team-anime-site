'use client'

import { signIn } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoaderCircle } from 'lucide-react'

import { Button, Input } from '@/components/ui'

import { registerSchema } from '@/schemas/auth.schema'

const initialValue = {
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm: React.FC = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(registerSchema),
  })

  const onSubmit: SubmitHandler<typeof registerSchema> = async (data) => {
    await signIn('register', { ...data, redirectTo: '/' })
    reset(initialValue)
  }

  return (
    <form
      method='post'
      onSubmit={handleSubmit(onSubmit)}
      className='mx-auto mb-4 flex w-full max-w-[480px] flex-col gap-4'
    >
      <label className='flex flex-col gap-1'>
        {errors.email && (
          <span className='text-accent text-sm'>{errors.email.message}</span>
        )}
        <Input
          size='large'
          placeholder='Логин'
          {...register('email', { required: true })}
        />
      </label>
      <label className='-mb-2 flex flex-col gap-1'>
        {errors.password && (
          <span className='text-accent text-sm'>{errors.password.message}</span>
        )}
        <Input
          type='password'
          size='large'
          placeholder='Пароль'
          {...register('password', { required: true })}
        />
      </label>
      <label className='flex flex-col gap-1'>
        {errors.confirmPassword && (
          <span className='text-accent text-sm'>
            {errors.confirmPassword.message}
          </span>
        )}
        <Input
          type='password'
          size='large'
          placeholder='Повторите пароль'
          {...register('confirmPassword', { required: true })}
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
        className='bg-accent hover:bg-background border-accent hover:border-secondary disabled:border-secondary group items-center justify-center gap-2 border-2 border-solid'
      >
        <span className='group-disabled:opacity-70'>Регистрация</span>
      </Button>
    </form>
  )
}

export default SignUpForm

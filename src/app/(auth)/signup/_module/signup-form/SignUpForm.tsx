'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

import { Button, Input } from '@/components/ui'

import { RegisterFormType, registerSchema } from '@/schemas/auth.schema'

const initialValue = {
  nickname: '',
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
  } = useForm<RegisterFormType>({
    defaultValues: initialValue,
    resolver: yupResolver(
      registerSchema,
    ) as unknown as Resolver<RegisterFormType>,
  })
  const router = useRouter()

  const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
    await signIn('register', { ...data, redirect: false }).then(
      ({ ok, error, code }) => {
        if (!error && ok) router.push('/check-email')
        else if (code == 'RedirectToCheckEmail') router.replace('/check-email')
        else toast.error(code)
      },
    )
    reset(initialValue)
  }

  return (
    <form
      method='post'
      onSubmit={handleSubmit(onSubmit)}
      className='mx-auto mb-4 flex w-full max-w-[480px] flex-col gap-4'
    >
      <label className='flex flex-col gap-1'>
        {errors.nickname && (
          <span className='text-accent text-sm'>{errors.nickname.message}</span>
        )}
        <Input
          size='large'
          placeholder='Логин'
          {...register('nickname', { required: true })}
        />
      </label>
      <label className='flex flex-col gap-1'>
        {errors.email && (
          <span className='text-accent text-sm'>{errors.email.message}</span>
        )}
        <Input
          size='large'
          placeholder='Почта'
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

'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { LoaderCircle } from 'lucide-react'

import { LinkButton } from '@/components/ui'

import { verifyAccount } from '@/actions/account'

const StatusSection: React.FC = () => {
  const router = useRouter()
  const params = useSearchParams()
  const token = params.get('token')
  const email = params.get('email')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  )

  useEffect(() => {
    if (!token || !email) {
      setStatus('error')
      return
    }

    const verify = async () => {
      try {
        const res = await verifyAccount(email, decodeURIComponent(token))
        if (res.type == 'error') throw new Error('Верификация провалена')
        sessionStorage.setItem('verified', 'success')
        setStatus('success')
        router.replace('/signin')
      } catch {
        setStatus('error')
      }
    }

    verify()
  }, [token, email])

  if (status === 'loading') {
    return (
      <div className='flex flex-col items-center'>
        <h1 className='text-foreground mb-3 text-center font-["Roboto_flex"] text-3xl leading-[120%] md:text-4xl lg:text-5xl'>
          Проверка почты...
        </h1>
        <span className='text-md mb-4 max-w-[460px] text-center leading-[150%] font-thin text-pretty md:mb-8 lg:text-lg'>
          Пожалуйста, подождите несколько секунд, пока мы проверяем ссылку из
          письма.
        </span>
        <LoaderCircle width={42} height={42} className='animate-spin' />
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className='flex flex-col items-center'>
        <h1 className='text-foreground mb-3 text-center font-["Roboto_flex"] text-3xl leading-[120%] md:text-4xl lg:text-5xl'>
          Не удалось подтвердить почту
        </h1>
        <span className='text-md mb-4 max-w-[600px] text-center leading-[150%] font-thin text-pretty md:mb-8 lg:text-lg'>
          Ссылка для подтверждения недействительна, устарела или уже была
          использована. Попробуйте запросить новую ссылку для подтверждения или
          зарегистрируйтесь снова.
        </span>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-foreground mb-3 text-center font-["Roboto_flex"] text-3xl leading-[120%] md:text-4xl lg:text-5xl'>
        Почта успешно подтверждена 🎉
      </h1>
      <span className='text-md mb-4 max-w-[460px] text-center leading-[150%] font-thin text-pretty md:mb-8 lg:text-lg'>
        Спасибо! Ваш адрес электронной почты подтверждён. Теперь вы можете войти
        в свой аккаунт и пользоваться всеми возможностями сайта.
      </span>
      <LinkButton intent='primary' href='/signin'>
        На страницу авторизации
      </LinkButton>
    </div>
  )
}

export default StatusSection

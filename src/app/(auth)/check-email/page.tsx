import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

import { LinkButton } from '@/components/ui'

import { Notification } from './_module'

const page: React.FC = () => {
  return (
    <div className='flex min-h-screen'>
      <Suspense fallback={null}>
        <Notification />
      </Suspense>
      <div className='flex w-full flex-col justify-between gap-10 px-4 py-6 md:w-1/2 md:gap-4 md:px-12 lg:px-16'>
        <Link
          href='/'
          title='LDA Team | Главная страница'
          className='flex items-center gap-2 self-start'
        >
          <Image
            src='/images/logotype.jpg'
            width={40}
            height={40}
            alt='Иконка логотипа LDA Team'
            className='min-w-[40px] rounded-full'
          />
          <span className='dark:text-foreground font-["Roboto_flex"] text-sm font-bold text-[#D15150] uppercase'>
            LDA Team
          </span>
        </Link>
        <div className='flex flex-col items-center'>
          <h1 className='text-foreground mb-3 text-center font-["Roboto_flex"] text-3xl leading-[120%] md:text-4xl lg:text-5xl'>
            Почти готово! 🎉
          </h1>
          <span className='text-md mb-4 max-w-[460px] text-center leading-[150%] font-thin text-pretty md:mb-8 lg:text-lg'>
            Мы отправили вам письмо с подтверждением.
            <br className='mb-2' />
            Пожалуйста, проверьте почту и перейдите по ссылке в письме, чтобы
            активировать свой аккаунт.
          </span>
          <span className='inline-flex justify-center gap-1.5 text-base leading-[150%]'>
            <LinkButton intent='primary' href='/signin'>
              На страницу авторизации
            </LinkButton>
          </span>
        </div>
        <span className='text-sm leading-[150%]'>© 2025 LDA Voice Team</span>
      </div>
      <div className='relative z-0 hidden h-full min-h-screen w-full max-w-1/2 flex-1 object-cover md:flex'>
        <Image
          fill
          sizes='50vw'
          className='object-contain'
          src='/images/lda-mascot.jpg'
          alt='Маскот команды LDA'
        />
      </div>
    </div>
  )
}

export default page

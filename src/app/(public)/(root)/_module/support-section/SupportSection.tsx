import Image from 'next/image'

import { Heart } from 'lucide-react'

import { Container } from '@/components/ui'

const SupportSection: React.FC = () => {
  return (
    <Container>
      <section className='relative z-0 flex flex-col overflow-hidden rounded-2xl px-[16px] py-[24px] md:px-[42px] md:py-[40px]'>
        <h2 className='mb-3.5 font-[Roboto_Flex] text-[32px] leading-[80%] md:text-5xl md:leading-[100%]'>
          Поддержка команды
        </h2>
        <span className='mb-8 max-w-[800px] text-sm leading-[150%] font-light text-pretty sm:text-base'>
          Наша команда работает над тем, чтобы вы могли наслаждаться
          качественной озвучкой любимых аниме. Поддержка зрителей помогает нам
          развиваться, улучшать звук и выпускать серии быстрее. Присоединяйтесь
          — вместе мы делаем больше.
        </span>
        <a
          href='https://boosty.to/ldateam'
          target='_blank'
          rel='noopener noreferrer'
          className='bg-accent hover:text-accent flex items-center gap-3 self-start rounded-md px-6 py-2.5 text-base font-medium text-white transition-all ease-in-out hover:bg-white'
        >
          <Heart width={24} height={24} />
          Поддержать
        </a>
        <div className='absolute top-0 left-0 z-[-1] h-full w-full bg-[rgba(0,0,0,1)]'>
          <Image
            fill
            src='/images/support-banner.jpg'
            className='h-full w-full object-cover'
            alt='Фон для секций'
          />
        </div>
      </section>
    </Container>
  )
}

export default SupportSection

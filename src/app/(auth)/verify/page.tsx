import Image from 'next/image'
import Link from 'next/link'

import { StatusSection } from './_module'

const page: React.FC = () => {
  return (
    <div className='flex min-h-screen'>
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
        <StatusSection />
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

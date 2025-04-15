import Link from 'next/link'

import { Icon } from '@/components/ui'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='flex flex-col items-center px-4 py-6'>
      <ul className='mb-4 flex items-center gap-6 md:gap-3'>
        <li>
          <a
            href='https://vk.com'
            target='_blank'
            rel='noopener noreferrer'
            className='group'
            title='Перейти во вконтакте'
          >
            <Icon
              name='vk'
              className='h-[32px] w-[32px] fill-[rgba(0,2,13,0.5)] transition ease-in-out group-hover:fill-black dark:fill-[rgba(255,255,255,0.4)] dark:group-hover:fill-white'
            />
          </a>
        </li>
        <li>
          <a
            href='https://telegram.com'
            target='_blank'
            rel='noopener noreferrer'
            className='group'
            title='Перейти в телеграм канал'
          >
            <Icon
              name='telegram'
              className='h-8 w-8 fill-[rgba(0,2,13,0.5)] transition ease-in-out group-hover:fill-black dark:fill-[rgba(255,255,255,0.4)] dark:group-hover:fill-white'
            />
          </a>
        </li>
        <li>
          <a
            href='https://boosty.to/ldateam'
            target='_blank'
            rel='noopener noreferrer'
            className='group'
            title='Перейти к бусти'
          >
            <Icon
              name='boosty'
              className='h-[29px] w-[29px] fill-[rgba(0,2,13,0.5)] transition ease-in-out group-hover:fill-black dark:fill-[rgba(255,255,255,0.4)] dark:group-hover:fill-white'
            />
          </a>
        </li>
      </ul>

      <ul className='mb-2 flex flex-col md:flex-row'>
        <li className='flex'>
          <Link
            className='hover:text-foreground w-full px-1 py-2 text-center text-sm leading-[22px] text-[#565D6D] transition-colors ease-in-out md:px-3 md:py-1 dark:hover:text-white'
            href='/catalog'
          >
            Каталог
          </Link>
        </li>
        <li className='flex'>
          <Link
            className='hover:text-foreground w-full px-1 py-2 text-center text-sm leading-[22px] text-[#565D6D] transition-colors ease-in-out md:px-3 md:py-1 dark:hover:text-white'
            href='/schedule'
          >
            График
          </Link>
        </li>
        <li className='flex'>
          <Link
            className='hover:text-foreground w-full px-1 py-2 text-center text-sm leading-[22px] text-[#565D6D] transition-colors ease-in-out md:px-3 md:py-1 dark:hover:text-white'
            href='/order'
          >
            Заказать озвучку
          </Link>
        </li>
        <li className='flex'>
          <Link
            className='hover:text-foreground w-full px-1 py-2 text-center text-sm leading-[22px] text-[#565D6D] transition-colors ease-in-out md:px-3 md:py-1 dark:hover:text-white'
            href='/profile'
          >
            Профиль
          </Link>
        </li>
      </ul>
      <span className='text-center text-[12px] leading-[22pxx] text-balance text-[#9095A1] md:text-sm'>
        © {currentYear} LDA Voice Team. Все права защищены
      </span>
    </footer>
  )
}

export default Footer

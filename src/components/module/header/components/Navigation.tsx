import { AudioLines, Calendar, Library } from 'lucide-react'

import { LinkButton } from '@/components/ui'

const navLinks: {
  title: string
  href: string
  alt: string
  icon: React.ReactNode
}[] = [
  {
    title: 'Каталог',
    href: '/catalog',
    alt: 'Страница с полным списком аниме',
    icon: <Library className='h-[28px] w-[28px] md:h-[18px] md:w-[18px]' />,
  },
  {
    title: 'График',
    href: '/schedule',
    alt: 'Страница с расписанием выхода серий',
    icon: <Calendar className='h-[28px] w-[28px] md:h-[18px] md:w-[18px]' />,
  },
  {
    title: 'Заказать озвучку',
    href: '/order',
    alt: 'Страница с заказом озвучки — выберите аниме',
    icon: <AudioLines className='h-[32px] w-[32px] md:h-[18px] md:w-[18px]' />,
  },
]

const Navigation: React.FC = () => {
  return (
    <nav className='order-1 flex flex-1 md:order-none md:flex-none'>
      <ul className='flex flex-1 flex-row-reverse md:flex-none md:flex-row'>
        {navLinks.map((link) => (
          <LinkButton
            key={link.href}
            href={link.href}
            title={link.alt}
            intent='secondary'
            size='small'
            className={`flex flex-col items-center gap-1 px-2 text-center text-[12px] leading-3 text-white md:text-sm ${link.href == '/order' ? 'hidden max-w-[100px] md:flex md:max-w-none' : 'flex'}`}
          >
            <span className='flex md:hidden'>{link.icon}</span>
            {link.title}
          </LinkButton>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation

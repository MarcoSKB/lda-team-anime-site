'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { CircleUserRound } from 'lucide-react'

import { cn } from '@/utils/cn'

const profileNavigation: {
  href: string
  title: string
  icon: React.ReactNode
}[] = [
  {
    href: '/profile',
    title: 'Личные данные',
    icon: <CircleUserRound width={22} height={22} />,
  },
  // {
  //   href: '/profile/payments',
  //   title: 'Платежи',
  //   icon: <CreditCard width={22} height={22} />,
  // },
  // {
  //   href: '/profile/others',
  //   title: 'Прочее',
  //   icon: <Settings width={22} height={22} />,
  // },
]

const Navigation: React.FC = () => {
  const pathname = usePathname()

  return (
    <aside className='flex flex-col gap-6 border-solid border-[rgba(255,255,255,0.2)] py-2 pr-2 md:border-r-1 md:p-4 md:px-2 md:py-4'>
      <ul className='flex max-w-full gap-2 overflow-x-auto md:flex-col md:gap-0'>
        {profileNavigation.map((nav) => (
          <li key={nav.href}>
            <Link
              href={nav.href}
              className={cn(
                'text-foreground hover:text-accent flex items-center justify-center gap-3 rounded-md p-2 text-base leading-[150%] text-nowrap transition ease-in-out md:justify-start md:px-3 md:py-2.5',
                pathname === nav.href
                  ? 'bg-secondary hover:text-foreground pointer-events-none'
                  : '',
              )}
            >
              {nav.icon}
              {nav.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Navigation

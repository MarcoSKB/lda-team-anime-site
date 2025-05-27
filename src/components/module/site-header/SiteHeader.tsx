'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui'
import { Separator } from '@/components/ui'
import { SidebarTrigger } from '@/components/ui'

const dashboardTitle: Record<string, string> = {
  '/dashboard': 'Админ панель',
  '/dashboard/analytics': 'Аналитика',
  '/dashboard/team': 'Команда',
}

export const SiteHeader = () => {
  const pathname = usePathname()

  return (
    <header className='flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
      <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
        <SidebarTrigger className='-ml-1' />
        <Separator
          orientation='vertical'
          className='mx-2 data-[orientation=vertical]:h-4'
        />
        <h1 className='text-base font-medium'>{dashboardTitle[pathname]}</h1>
        <div className='ml-auto flex items-center gap-2'>
          <Button intent='default' size='small' className='hidden sm:flex'>
            <Link href='/' className='dark:text-foreground'>
              Главная страница
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

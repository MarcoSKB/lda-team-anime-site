'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import {
  IconChartBar,
  IconDashboard,
  IconEdit,
  IconUsers,
} from '@tabler/icons-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui'

import { NavMain, NavUser } from '..'

const data = {
  navMain: [
    {
      title: 'Админ панель',
      url: '/dashboard',
      icon: IconDashboard,
    },
    {
      title: 'Аналитика',
      url: '/dashboard/analytics',
      icon: IconChartBar,
    },
    {
      title: 'Пользователи',
      url: '/dashboard/users',
      icon: IconUsers,
    },
    {
      title: 'Проекты',
      url: '/dashboard/projects',
      icon: IconEdit,
    },
  ],
}

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { data: session, status } = useSession()

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip='На главную страницу'
              className='text-accent hover:text-foreground data-[slot=sidebar-menu-button]:py-5'
            >
              <Link href='/' title='На главную страницу'>
                <Image
                  src='/images/logotype.jpg'
                  width={30}
                  height={30}
                  alt='Иконка логотипа LDA Team'
                  className='rounded-full object-cover'
                />
                <span className='font-[Roboto_Flex] text-base font-semibold'>
                  LDA Team
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {status === 'authenticated' && <NavUser user={session.user} />}
      </SidebarFooter>
    </Sidebar>
  )
}

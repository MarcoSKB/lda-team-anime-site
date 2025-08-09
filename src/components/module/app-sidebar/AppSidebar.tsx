'use client'

import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import { IconChartBar, IconDashboard, IconUsers } from '@tabler/icons-react'

import { NavMain } from '@/components/module'
import { NavUser } from '@/components/module'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui'

const data = {
  user: {
    name: 'Админ',
    email: 'marcoexmaple@example.com',
    avatar: '/images/avatar-blank.jpg',
  },
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
  ],
}

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
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
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

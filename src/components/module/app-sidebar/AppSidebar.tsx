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
      title: 'Команда',
      url: '/dashboard/team',
      icon: IconUsers,
    },
  ],
}

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='text-accent hover:text-foreground data-[slot=sidebar-menu-button]:!p-2'
            >
              <Link href='/' title='На главную страницу'>
                <Image
                  src='/images/logotype.jpg'
                  width={30}
                  height={30}
                  alt='Иконка логотипа LDA Team'
                  className='min-w-[30px] rounded-full'
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

'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'

import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import { LogIn } from 'lucide-react'

import { Button, LinkButton, Skeleton } from '@/components/ui'

import { Dashboard, Logout, Settings, Theme, Username } from './components'

const ProfileButton: React.FC = () => {
  const { data: session, status } = useSession()

  if (status == 'loading') {
    return (
      <Button
        disabled={true}
        className='hover:bg-foreground dark:hover:bg-secondary hidden cursor-pointer items-center gap-2 rounded-lg bg-transparent px-1 py-1 transition-all ease-out md:flex'
      >
        <Skeleton className='bg-secondary h-[36px] w-[36px] rounded-full object-cover' />
      </Button>
    )
  }

  if (!session) {
    return (
      <LinkButton
        href='/signin'
        title='Войти в аккаунт'
        intent='default'
        size='small'
        className='dark:md:hover:bg-secondary md:hover:border-accent group md:hover:bg-accent hidden border border-[rgba(0,0,0,0.2)] text-inherit hover:bg-transparent md:flex md:bg-[rgba(255,255,255,10%)] md:hover:border-solid dark:border-transparent dark:md:hover:border-transparent'
      >
        <LogIn width={18} height={18} />
      </LinkButton>
    )
  }

  return (
    <Menu>
      <MenuButton className='hover:bg-foreground dark:hover:bg-secondary hidden cursor-pointer items-center gap-2 rounded-lg bg-transparent px-1 py-1 transition-all ease-out md:flex'>
        <Image
          src={session.user.avatar}
          alt='Аватар пользователя'
          className='h-[36px] w-[36px] rounded-full bg-white object-cover'
          width={36}
          height={36}
        />
      </MenuButton>
      <MenuItems
        transition
        anchor='bottom end'
        modal={false}
        className='dark:bg-secondary z-[55] mt-2 flex w-[152px] min-w-[152px] origin-top flex-col rounded-md bg-white px-0.5 py-1.5 shadow-lg transition ease-out data-[closed]:scale-95 data-[closed]:opacity-0'
      >
        <Username />
        <Dashboard />
        <Settings />
        <Theme />
        <Logout />
      </MenuItems>
    </Menu>
  )
}

export default ProfileButton

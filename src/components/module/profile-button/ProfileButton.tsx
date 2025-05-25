'use client'

import Image from 'next/image'

import { Menu, MenuButton, MenuItems } from '@headlessui/react'

import { Dashboard, Logout, Settings, Theme, Username } from './components'

const ProfileButton: React.FC = () => {
  return (
    <Menu>
      <MenuButton className='hover:bg-foreground dark:hover:bg-secondary hidden cursor-pointer items-center gap-2 rounded-lg bg-transparent px-1 py-1 transition-all ease-out md:flex'>
        <Image
          src='/images/avatar-blank.jpg'
          alt='Аватар пользователя'
          className='rounded-full'
          width={36}
          height={36}
        />
      </MenuButton>
      <MenuItems
        transition
        anchor='bottom end'
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

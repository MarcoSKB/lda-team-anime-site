'use client'

import Image from 'next/image'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { LogOut, Settings, SunMoon } from 'lucide-react'

import { Button, LinkButton } from '@/components/ui'

import useTheme from '@/hooks/useTheme'

const Profile: React.FC = () => {
  const { theme, changeTheme } = useTheme()
  return (
    <Menu>
      <MenuButton className='hover:bg-foreground dark:hover:bg-secondary hidden cursor-pointer items-center gap-2 rounded-lg bg-transparent px-1 py-1 transition-all ease-out md:flex'>
        <Image
          src='/images/placeholder-image.jpg'
          alt='Аватар пользователя'
          className='rounded-full'
          width={36}
          height={36}
        />
      </MenuButton>
      <MenuItems
        transition
        anchor='bottom end'
        className='bg-secondary z-[55] mt-2 flex w-[152px] min-w-[152px] origin-top flex-col rounded-md px-0.5 py-1.5 transition ease-out data-[closed]:scale-95 data-[closed]:opacity-0'
      >
        <MenuItem as='div'>
          <span className='block cursor-default px-3 py-1 text-sm'>
            Пользователь
          </span>
          <hr className='my-1 opacity-10' />
        </MenuItem>
        <MenuItem
          as={LinkButton}
          href='/profile'
          intent='secondary'
          size='small'
          title='Настройки аккаунта'
          icon={<Settings width={18} height={18} />}
        >
          Настройки
        </MenuItem>
        <MenuItem>
          <MenuItem
            as={Button}
            intent='default'
            size='default'
            title='Поменять тему на сайте'
            className='hover:text-accent px-2 active:hover:scale-100'
            icon={<SunMoon width={19} height={19} />}
            onClick={(e) => {
              e.preventDefault()
              changeTheme()
            }}
          >
            {theme == 'dark' ? 'Темная тема' : 'Светлая тема'}
          </MenuItem>
        </MenuItem>
        <MenuItem
          as={LinkButton}
          href='/profile/logout'
          intent='secondary'
          size='small'
          title='Выйти с аккаунта'
          icon={<LogOut width={18} height={18} />}
        >
          Выйти
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}

export default Profile

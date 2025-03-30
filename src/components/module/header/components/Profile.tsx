import Image from 'next/image'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { LogOut, Settings, SunMoon } from 'lucide-react'

import { LinkButton } from '@/components/ui'

const Profile: React.FC = () => {
  return (
    <Menu>
      <MenuButton className='hover:bg-secondary hidden cursor-pointer items-center gap-2 rounded-lg bg-transparent px-1 py-1 transition-all ease-out md:flex'>
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
        className='bg-secondary mt-2 flex origin-top flex-col rounded-md px-0.5 py-1.5 transition ease-out data-[closed]:scale-95 data-[closed]:opacity-0'
      >
        <MenuItem as='div'>
          <span className='block px-3 py-1 text-sm'>Пользователь</span>
          <hr className='my-1 opacity-10' />
        </MenuItem>
        <MenuItem>
          <LinkButton
            href='/profile/settings'
            intent='secondary'
            size='small'
            title='Настройки аккаунта'
            icon={<Settings width={18} height={18} />}
          >
            Настройки
          </LinkButton>
        </MenuItem>
        <MenuItem>
          <MenuItem>
            <LinkButton
              href='/profile/settings'
              intent='secondary'
              size='small'
              title='Поменять тему на сайте'
              icon={<SunMoon width={18} height={18} />}
            >
              Тема
            </LinkButton>
          </MenuItem>
        </MenuItem>
        <MenuItem>
          <LinkButton
            href='/profile/logout'
            intent='secondary'
            size='small'
            title='Выйти с аккаунта'
            icon={<LogOut width={18} height={18} />}
          >
            Выйти
          </LinkButton>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}

export default Profile

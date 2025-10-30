'use client'

import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useState } from 'react'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import {
  ArrowLeft,
  LogIn,
  Menu as MenuIcon,
  Settings,
  SunMoon,
} from 'lucide-react'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  LinkButton,
} from '@/components/ui'

const menuList: {
  title: string
  href: string
  alt: string
}[] = [
  {
    title: 'Главная страница',
    href: '/',
    alt: 'Главная страница',
  },
  {
    title: 'Каталог аниме',
    href: '/catalog',
    alt: 'Страница с каталогом аниме',
  },
  // {
  //   title: 'Расписание озвучки',
  //   href: '/schedule',
  //   alt: 'Страница с расписанием озвучек аниме',
  // },
  {
    title: 'Посты',
    href: '/posts',
    alt: 'Страница с новостями',
  },
  {
    title: 'Поддержать проект',
    href: 'https://boosty.to/ldateam',
    alt: 'Страница с донатом',
  },
  // {
  //   title: 'Заказать озвучку',
  //   href: '/order',
  //   alt: 'Страница с заказом озвучки — выберите аниме',
  // },
]

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { data: session, status } = useSession()

  return (
    <>
      <Button
        size='small'
        title='Открыть меню'
        onClick={() => setIsOpen(true)}
        className='hover:text-accent flex flex-col items-center px-2 py-2 text-[12px] hover:bg-transparent md:hidden'
      >
        <MenuIcon className='h-[30px] w-[32px]' />
        Меню
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='overflow-hidden'
      >
        <DialogBackdrop
          transition
          className='fixed inset-0 z-[60] bg-black/30 transition duration-300 ease-out data-[closed]:opacity-0'
        />
        <div className='fixed inset-0 z-[60] flex h-screen items-center justify-center p-4'>
          <DialogPanel
            transition
            className='dark:bg-secondary text-foreground absolute top-0 right-0 z-50 flex h-full max-h-dvh w-[70%] min-w-[320px] translate-x-[0%] flex-col overflow-y-auto bg-white px-4 pt-2 pb-4.5 transition duration-300 ease-out data-[closed]:translate-x-[50%] data-[closed]:opacity-0'
          >
            <Button
              intent='secondary'
              onClick={() => setIsOpen(false)}
              className='flex items-center gap-2 self-end p-2'
            >
              <ArrowLeft width={20} height={20} /> Закрыть
            </Button>
            <DialogTitle className='text-xl'>Навигация</DialogTitle>
            <hr className='my-2 opacity-30' />
            <div className='flex flex-col' onClick={() => setIsOpen(false)}>
              {menuList.map((link) => (
                <LinkButton
                  key={link.href}
                  intent='secondary'
                  className='text-md gap-2 px-0'
                  title={link.alt}
                  href={link.href}
                  target={
                    link.title == 'https://boosty.to/ldateam'
                      ? '_blank'
                      : undefined
                  }
                >
                  {link.title}
                </LinkButton>
              ))}
            </div>
            <div className='mt-auto flex flex-col'>
              <Button
                icon={<SunMoon width={24} height={24} />}
                className='text-md gap-2 px-0 active:hover:scale-100'
                onClick={(e) => {
                  e.preventDefault()
                  setTheme(theme == 'dark' ? 'light' : 'dark')
                }}
              >
                {theme == 'dark' ? 'Темная тема' : 'Светлая тема'}
              </Button>
              <LinkButton
                intent='primary'
                icon={<Settings width={24} height={24} />}
                className='text-md gap-2 bg-transparent px-0'
                href='/profile'
              >
                Настройки
              </LinkButton>
              <hr className='mt-2 mb-4 opacity-30' />
              {status == 'authenticated' ? (
                <div className='flex w-full items-center gap-3'>
                  <Avatar className='AvatarRoot h-[36px] w-[36px]'>
                    <AvatarImage
                      className='AvatarImage'
                      src={session?.user.avatar}
                      alt='Аватар пользователя'
                    />
                    <AvatarFallback className='AvatarFallback' delayMs={600}>
                      АВ
                    </AvatarFallback>
                  </Avatar>
                  <span>{session.user.username ?? session.user.email}</span>
                </div>
              ) : (
                <LinkButton
                  href='/signin'
                  title='Войти в аккаунт'
                  intent='default'
                  size='small'
                  className='dark:md:hover:bg-secondary md:hover:border-accent group md:hover:bg-accent hidden border border-[rgba(0,0,0,0.2)] text-inherit hover:bg-transparent md:flex md:bg-[rgba(255,255,255,10%)] md:hover:border-solid dark:border-transparent dark:md:hover:border-transparent'
                >
                  <LogIn width={18} height={18} />
                </LinkButton>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default Menu

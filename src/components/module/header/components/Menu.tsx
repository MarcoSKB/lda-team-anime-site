'use client'

import Image from 'next/image'
import { useState } from 'react'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { ArrowLeft, Menu as MenuIcon, Settings, SunMoon } from 'lucide-react'

import { Button, LinkButton } from '@/components/ui'

const menuList: {
  title: string
  href: string
  alt: string
}[] = [
  {
    title: 'Поддержать проект',
    href: '/donate',
    alt: 'Страница с донатом',
  },
  {
    title: 'Заказать озвучку',
    href: '/order',
    alt: 'Страница с заказом озвучки — выберите аниме',
  },
]

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

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
            className='bg-secondary text-foreground absolute top-0 right-0 z-50 flex h-full max-h-dvh w-[70%] min-w-[320px] translate-x-[0%] flex-col overflow-y-auto px-4 pt-2 pb-4.5 transition duration-300 ease-out data-[closed]:translate-x-[50%] data-[closed]:opacity-0'
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
            <div className='flex flex-col'>
              {menuList.map((link) => (
                <LinkButton
                  key={link.href}
                  intent='secondary'
                  className='text-md gap-2 px-0'
                  title={link.alt}
                  href={link.href}
                >
                  {link.title}
                </LinkButton>
              ))}
            </div>
            <div className='mt-auto flex flex-col'>
              <Button
                icon={<SunMoon width={24} height={24} />}
                className='text-md gap-2 px-0 active:hover:scale-100'
              >
                Тема
              </Button>
              <LinkButton
                intent='primary'
                icon={<Settings width={24} height={24} />}
                className='text-md gap-2 px-0'
                href='/profile/settings'
              >
                Настройки
              </LinkButton>
              <hr className='mt-2 mb-4 opacity-30' />
              <div className='flex items-center gap-2'>
                <Image
                  width={40}
                  height={40}
                  src='/images/placeholder-image.jpg'
                  className='rounded-full'
                  alt='Profile image'
                />
                <span>Пользователь</span>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default Menu

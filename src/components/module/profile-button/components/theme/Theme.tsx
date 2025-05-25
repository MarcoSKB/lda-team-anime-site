'use client'

import { useTheme } from 'next-themes'

import { MenuItem } from '@headlessui/react'
import { SunMoon } from 'lucide-react'

import { Button } from '@/components/ui'

const Theme: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <MenuItem
      as={Button}
      intent='default'
      size='default'
      title='Поменять тему на сайте'
      className='hover:text-accent px-2 active:hover:scale-100'
      icon={<SunMoon width={19} height={19} />}
      onClick={(e) => {
        setTheme(theme == 'dark' ? 'light' : 'dark')
        e.preventDefault()
      }}
    >
      {theme == 'dark' ? 'Темная тема' : 'Светлая тема'}
    </MenuItem>
  )
}

export default Theme

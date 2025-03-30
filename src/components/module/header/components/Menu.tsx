'use client'

import { useState } from 'react'

import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Menu as MenuIcon } from 'lucide-react'

import { Button } from '@/components/ui'

const Menu: React.FC = () => {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        size='small'
        title='Открыть меню'
        onClick={() => setIsOpen(true)}
        className='flex flex-col items-center px-2 py-2 text-[12px] md:hidden'
      >
        <MenuIcon className='h-[32px] w-[32px]' />
        Меню
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-50'
      >
        <DialogBackdrop className='fixed inset-0 bg-black/30' />
        <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
          <DialogPanel>
            <DialogTitle>Deactivate account</DialogTitle>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default Menu

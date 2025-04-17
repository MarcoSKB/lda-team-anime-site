'use client'

import { useState } from 'react'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Funnel } from 'lucide-react'

import { Button } from '@/components/ui'

const Filter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        intent='secondary'
        icon={<Funnel height={19} width={19} />}
      >
        Фильтр
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-50'
      >
        <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
          <DialogPanel
            transition
            className='bg-secondary absolute top-0 right-0 translate-x-[0%] transition duration-300 ease-out data-[closed]:translate-x-[50%] data-[closed]:opacity-0'
          >
            <DialogTitle className='font-bold'>Deactivate account</DialogTitle>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default Filter

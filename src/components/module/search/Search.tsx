'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Search as SearchIcon } from 'lucide-react'

import { Button } from '@/components/ui'

const Search: React.FC = () => {
  const [loadedInClient, setLoadedInClient] = useState(false)
  useEffect(() => {
    setLoadedInClient(true)
  }, [])

  return (
    <Popover>
      <PopoverButton
        as={Button}
        size='small'
        title='Поиск аниме тайтлов'
        onClick={() => console.log('Clicked')}
      >
        <div className='hover:text-accent md:hover:text-foreground flex flex-col items-center px-1 md:flex-row'>
          <SearchIcon className='mx-auto h-[29px] w-[29px] md:h-[18px] md:w-[18px]' />
          <span className='text-[12px] md:hidden'>Поиск</span>
        </div>
      </PopoverButton>
      {loadedInClient &&
        createPortal(
          <PopoverPanel
            transition
            className='absolute top-1/2 left-1/2 flex min-h-[400px] origin-top -translate-x-1/2 -translate-y-1/2 flex-col rounded-md bg-[rgba(255,255,255,10%)] px-3 py-2 transition duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0'
          >
            Popover
          </PopoverPanel>,
          document.body,
        )}
    </Popover>
  )
}

export default Search

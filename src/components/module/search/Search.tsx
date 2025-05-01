'use client'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Search as SearchIcon } from 'lucide-react'

import { Button, Portal } from '@/components/ui'

const Search: React.FC = () => {
  return (
    <Popover>
      <PopoverButton
        as={Button}
        size='small'
        title='Поиск аниме тайтлов'
        className='dark:md:hover:bg-secondary md:hover:border-accent group md:hover:bg-accent border border-[rgba(0,0,0,0.2)] text-inherit hover:bg-transparent md:bg-[rgba(255,255,255,10%)] md:hover:border-solid dark:border-transparent dark:md:hover:border-transparent'
      >
        <div className='hover:text-accent md:hover:text-foreground flex flex-col items-center px-0.5 transition-colors ease-out md:flex-row'>
          <SearchIcon className='mx-auto h-[29px] w-[29px] transition ease-in-out md:h-[18px] md:w-[18px] md:group-hover:text-white' />
          <span className='text-[12px] md:hidden'>Поиск</span>
        </div>
      </PopoverButton>
      <Portal>
        <PopoverPanel
          transition
          className='bg-secondary absolute top-1/2 left-1/2 flex min-h-[400px] origin-top -translate-x-1/2 -translate-y-1/2 flex-col rounded-md px-3 py-2 transition duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0'
        >
          Popover
        </PopoverPanel>
      </Portal>
    </Popover>
  )
}

export default Search

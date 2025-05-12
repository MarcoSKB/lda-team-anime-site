'use client'

import { useEffect, useRef, useState } from 'react'

import { Search as SearchIcon } from 'lucide-react'

import { Button } from '@/components/ui'

import { SearchBody } from './components'

const Search: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        buttonRef.current?.click()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleSearchState = (state: boolean) => {
    setIsOpen(state)
  }

  return (
    <>
      <Button
        ref={buttonRef}
        size='small'
        title='Поиск аниме тайтлов'
        onClick={() => handleSearchState(!isOpen)}
        className='dark:md:hover:bg-secondary md:hover:border-accent group md:hover:bg-accent border border-[rgba(0,0,0,0.2)] text-inherit hover:bg-transparent md:bg-[rgba(255,255,255,10%)] md:hover:border-solid dark:border-transparent dark:md:hover:border-transparent'
      >
        <div className='hover:text-accent md:hover:text-foreground flex flex-col items-center px-0.5 transition-colors ease-out md:flex-row'>
          <SearchIcon className='mx-auto h-[29px] w-[29px] transition ease-in-out md:h-[18px] md:w-[18px] md:group-hover:text-white' />
          <span className='text-[12px] md:sr-only'>Поиск</span>
        </div>
      </Button>
      <SearchBody isSearchOpen={isOpen} handleSearchState={handleSearchState} />
    </>
  )
}

export default Search

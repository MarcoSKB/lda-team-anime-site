'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { Search } from 'lucide-react'

import { Input } from '@/components/ui'

import useDebounce from '@/hooks/useDebounce'
import { updateQuery } from '@/utils/query'

interface Props {
  ref: React.RefObject<HTMLInputElement | null>
  setSearchValue: (value: string) => void
  searchValue: string
}

const SearchInput: React.FC<Props> = ({ ref, setSearchValue, searchValue }) => {
  const searchParams = useSearchParams()
  const debouncedValue = useDebounce(searchValue, 700)

  useEffect(() => {
    updateQuery('search', debouncedValue, searchParams)
  }, [debouncedValue])

  return (
    <Input
      ref={ref}
      autoFocus
      placeholder='Поиск аниме тайтлов'
      intent='secondary'
      maxLength={256}
      onChange={(e) => setSearchValue(e.target.value)}
      value={searchValue}
      icon={
        <Search
          width={20}
          height={20}
          className='absolute top-1/2 left-[10px] -translate-y-1/2'
        />
      }
    />
  )
}

export default SearchInput

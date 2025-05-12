'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Search } from 'lucide-react'

import { Input } from '@/components/ui'

import useDebounce from '@/hooks/useDebounce'
import { updateQuery } from '@/utils/query'

interface Props {
  ref: React.RefObject<HTMLInputElement | null>
}

const SearchInput: React.FC<Props> = ({ ref }) => {
  const searchParams = useSearchParams()
  const initialSearchValue =
    searchParams.get('search') == null
      ? ''
      : (searchParams.get('search') as string)
  const [searchValue, setSearchValue] = useState(initialSearchValue)
  const debouncedValue = useDebounce(searchValue, 700)

  useEffect(() => {
    updateQuery('search', debouncedValue, searchParams)
    // eslint-disable-next-line
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

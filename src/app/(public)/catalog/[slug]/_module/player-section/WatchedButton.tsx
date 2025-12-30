'use client'

import React from 'react'

import { useWatched } from '@/providers/WatchedProvider'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'

import { cn } from '@/utils/cn'

interface Props {
  titleId: string
}

const WatchedButton: React.FC<Props> = ({ titleId }) => {
  const { watched, toggleWatched, isLoading } = useWatched()
  const isWatched = watched.includes(titleId)
  return (
    <button
      type='button'
      onClick={() => toggleWatched(titleId)}
      className={cn(
        'flex items-center gap-1.5 px-2 py-2 text-sm md:text-base',
        !isLoading &&
          'hover:text-accent group cursor-pointer transition-colors ease-in-out',
      )}
    >
      {isLoading ? (
        <>
          <LoaderCircle width={24} height={24} className='animate-spin' />{' '}
          Обновляем статус
        </>
      ) : isWatched ? (
        <>
          <Eye
            width={24}
            height={24}
            className='group-hover:text-accent transition-colors ease-in-out'
          />{' '}
          Просмотрено
        </>
      ) : (
        <>
          <EyeOff
            width={24}
            height={24}
            className='text-foreground group-hover:text-accent transition-colors ease-in-out'
          />{' '}
          Не просмотрено
        </>
      )}
    </button>
  )
}

export default WatchedButton

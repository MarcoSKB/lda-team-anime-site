'use client'

import Link from 'next/link'

import { useFavorites } from '@/providers/FavoriteProvider'
import { Bookmark, BookmarkCheck, LoaderCircle, Play } from 'lucide-react'

import { Button } from '@/components/ui'

import { cn } from '@/utils/cn'

interface Props {
  id: string
  slug: string
}

const PosterCardAction: React.FC<Props> = ({ id, slug }) => {
  const { favorites, toggleFavorite, isLoading } = useFavorites()
  const isFavorite = favorites.includes(id)

  return (
    <div className='absolute bottom-4 flex w-full max-w-[256px] justify-between gap-1.5'>
      <Link
        href={`/catalog/${slug}`}
        className='hover:text-accent flex scroll-mt-10 items-center gap-1.5 leading-[20px] text-white transition ease-in-out'
      >
        <Play width={24} height={24} /> Смотреть
      </Link>
      <Button
        intent='default'
        onClick={() => toggleFavorite(id)}
        className={cn(
          'hover:text-accent flex cursor-pointer scroll-mt-10 items-center gap-1.5 leading-[20px] text-white transition ease-in-out',
          isFavorite
            ? 'bg-accent'
            : 'dark:bg-secondary dark:hover:bg-secondary hover:bg-transparent',
        )}
        icon={
          isLoading ? (
            <LoaderCircle width={24} height={24} className='animate-spin' />
          ) : isFavorite ? (
            <BookmarkCheck width={24} height={24} />
          ) : (
            <Bookmark width={24} height={24} />
          )
        }
        disabled={isLoading}
      >
        {isFavorite ? 'Сохранено' : 'Сохранить'}
      </Button>
    </div>
  )
}

export default PosterCardAction

'use client'

import { useFavorites } from '@/providers/FavoriteProvider'
import { Bookmark, BookmarkCheck, LoaderCircle } from 'lucide-react'

import { Button } from '@/components/ui'

import { cn } from '@/utils/cn'

interface Props {
  titleId: string
}

const FavoriteButton: React.FC<Props> = ({ titleId }) => {
  const { favorites, toggleFavorite, isLoading } = useFavorites()
  const isFavorite = favorites.includes(titleId)

  return (
    <Button
      intent='primary'
      className={cn(
        'group scroll-mt-10 px-2 py-2 disabled:opacity-90',
        isFavorite ? 'bg-accent' : 'bg-secondary',
      )}
      disabled={isLoading}
      onClick={() => toggleFavorite(titleId)}
      title={isFavorite ? 'Убрать из избранных' : 'Добавить в избранное'}
    >
      {isLoading ? (
        <LoaderCircle width={24} height={24} className='animate-spin' />
      ) : isFavorite ? (
        <BookmarkCheck width={24} height={24} />
      ) : (
        <Bookmark
          width={24}
          height={24}
          className='text-foreground group-hover:text-white'
        />
      )}
    </Button>
  )
}

export default FavoriteButton

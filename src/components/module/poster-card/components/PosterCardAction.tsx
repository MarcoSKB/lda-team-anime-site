'use client'

import Link from 'next/link'

import { Bookmark, Play } from 'lucide-react'

interface Props {
  id: number
  slug: string
}

const PosterCardAction: React.FC<Props> = ({ id, slug }) => {
  return (
    <div className='absolute bottom-4 flex w-full max-w-[256px] justify-between gap-1.5'>
      <Link
        href={`/catalog/${slug}`}
        className='hover:text-accent flex items-center gap-1.5 leading-[20px] text-white transition ease-in-out'
      >
        <Play width={24} height={24} /> Смотреть
      </Link>
      <button
        type='button'
        className='hover:text-accent flex cursor-pointer items-center gap-1.5 leading-[20px] text-white transition ease-in-out'
      >
        <Bookmark width={24} height={24} />
        Сохранить
      </button>
    </div>
  )
}

export default PosterCardAction
